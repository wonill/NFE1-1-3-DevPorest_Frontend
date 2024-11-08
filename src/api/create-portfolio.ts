import api from "./index";
import { uploadTumbnailImg } from "./upload-single-img";
import { deletePortfolio } from "./delete-portfolio";
import {
  PortfolioType,
  PortfolioResType,
  PortfolioImagesResType,
  PostPortfolioType,
  PortfolioEditResType,
} from "../types/api-types/PortfolioType";

/**
 * Base64 이미지 데이터를 File 객체로 변환
 */
const base64ToFile = async (base64Data: string, fileName: string = "image.png"): Promise<File> => {
  const base64WithoutHeader = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const byteString = atob(base64WithoutHeader);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([int8Array], { type: "image/png" });
  return new File([blob], fileName, { type: "image/png" });
};

/**
 * URL로부터 이미지를 가져와 base64로 변환
 */
const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert to base64"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting URL to base64:", error);
    throw error;
  }
};

/**
 * CKEditor 컨텐츠에서 이미지 URL 추출 및 base64 이미지 필터링
 */
const extractImagesFromContent = async (
  content: string,
): Promise<{
  base64Images: { src: string; index: number }[];
}> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const images = Array.from(doc.querySelectorAll("img"));

  console.log(images);
  // 기존 base64 이미지 수집
  const existingBase64Images = images
    .map((img, idx) => ({ src: img.src, index: idx + 1 }))
    .filter(img => img.src.startsWith("data:image"));

  // S3 URL 이미지들을 base64로 변환
  const urlImages = images.filter(img => !img.src.startsWith("data:image"));
  const convertedBase64Images = await Promise.all(
    urlImages.map(async (img, idx) => {
      const base64Data = await urlToBase64(img.src);
      return {
        src: base64Data,
        index: existingBase64Images.length + idx + 1,
      };
    }),
  );

  // 모든 base64 이미지를 합침
  const allBase64Images = [...existingBase64Images, ...convertedBase64Images];

  return { base64Images: allBase64Images };
};

/**
 * 다중 이미지 업로드 처리
 */
const uploadMultipleImages = async (files: File[], portfolioId: string): Promise<string[]> => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append("images", file);
  });

  try {
    const response = await api
      .post(`portfolios/uploads/${portfolioId}?usage=content`, {
        body: formData,
      })
      .json<PortfolioImagesResType>();

    if (!response.success || !response.data?.urls) {
      throw new Error("다중 이미지 업로드 실패");
    }

    return response.data.urls;
  } catch (error) {
    console.error("다중 이미지 업로드 오류:", error);
    throw error;
  }
};

/**
 * 에디터 컨텐츠 내의 이미지 처리
 */
const processEditorContent = async (
  content: string,
  portfolioId: string,
): Promise<{
  updatedContent: string;
  uploadedUrls: string[];
}> => {
  const { base64Images } = await extractImagesFromContent(content);

  if (base64Images.length === 0) {
    return {
      updatedContent: content,
      uploadedUrls: [],
    };
  }

  // base64 이미지들을 File 객체로 변환
  const imageFiles = await Promise.all(
    base64Images.map(img => base64ToFile(img.src, `${img.index}.png`)),
  );

  // 다중 이미지 업로드
  const uploadedUrls = await uploadMultipleImages(imageFiles, portfolioId);

  // 컨텐츠 내 이미지 URL 교체
  let updatedContent = content;
  base64Images.forEach((img, index) => {
    updatedContent = updatedContent.replace(img.src, uploadedUrls[index]);
  });

  return {
    updatedContent,
    uploadedUrls: uploadedUrls,
  };
};

/**
 * 클라이언트 데이터를 서버(POST requestbody) 형식으로 변환
 */
const transformToServerFormat = (
  clientData: PortfolioType,
  uploadedImages?: string[],
): PostPortfolioType => {
  return {
    ...clientData,
    techStack: clientData.techStack?.map(tech => tech.skill) || [],
    jobGroup: clientData.jobGroup || "",
    images: uploadedImages || [],
  };
};

// 포트폴리오 데이터 처리 및 변환 공통 함수
const processPortfolioData = async (
  portfolioData: PortfolioType,
  portfolioId?: string,
): Promise<PortfolioEditResType> => {
  // 0. 생성 api 호출
  let _id = portfolioId;

  if (!_id) {
    const response = await api
      .post("portfolios", {
        json: transformToServerFormat({ ...portfolioData, thumbnailImage: " ", contents: " " }), // base64 제외 하고 보냄
      })
      .json<PortfolioResType>();
    _id = response.data?._id;
  }

  // _id가 있는 상태

  if (_id) {
    try {
      // 1. 썸네일 이미지 처리
      let thumbnailUrl = portfolioData.thumbnailImage; // base64 이미지
      if (thumbnailUrl?.startsWith("data:image")) {
        const thumbnailFile = await base64ToFile(thumbnailUrl, "thumbnail.png");
        const uploadedThumbnailUrl = await uploadTumbnailImg(thumbnailFile, _id);
        if (!uploadedThumbnailUrl) {
          throw new Error("썸네일 이미지 업로드 실패");
        }
        thumbnailUrl = uploadedThumbnailUrl;
      }

      // 2. 에디터 컨텐츠 내 이미지 처리
      const { updatedContent, uploadedUrls } = await processEditorContent(
        portfolioData.contents,
        _id,
      );

      // 3. 서버 형식으로 데이터 변환
      const serverData = transformToServerFormat(
        {
          ...portfolioData,
          thumbnailImage: thumbnailUrl,
          contents: updatedContent,
        },
        uploadedUrls,
      );

      // 수정 api 이용하여 변환된 이미지 src 집어넣기
      const response = await api
        .put(`portfolios/${_id}`, {
          json: serverData,
        })
        .json<PortfolioEditResType>();

      return response;
    } catch (error) {
      console.error("포트폴리오 이미지 처리 중 오류:", error);
      const deleteResponse = await deletePortfolio(_id);
      if (deleteResponse.success) {
        console.log("포트폴리오가 성공적으로 삭제되었습니다.");
      } else {
        console.error("포트폴리오 삭제 실패:", deleteResponse.message);
      }
      throw error;
    }
  }
  return {} as PortfolioEditResType;
};

// 포트폴리오 생성/수정 통합 함수
export const handlePortfolio = async (
  portfolioData: PortfolioType,
  portfolioId?: string,
): Promise<PortfolioEditResType> => {
  try {
    const processedData = await processPortfolioData(portfolioData, portfolioId);

    console.log("포트폴리오 처리 데이터:", processedData);

    return { success: true, message: "포트폴리오 처리 성공", _id: processedData._id };
  } catch (error) {
    console.error("포트폴리오 처리 오류:", error);
    throw error;
  }
};
