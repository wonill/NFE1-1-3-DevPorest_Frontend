import api from "./index";
import { uploadTumbnailImg } from "./upload-single-img";
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
 * CKEditor 컨텐츠에서 이미지 URL 추출 및 base64 이미지 필터링
 */
const extractImagesFromContent = (
  content: string,
): {
  base64Images: { element: HTMLImageElement; src: string }[];
  otherImages: string[];
} => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const images = Array.from(doc.querySelectorAll("img"));

  const base64Images = images
    .filter(img => img.src.startsWith("data:image"))
    .map(img => ({ element: img, src: img.src }));

  const otherImages = images.filter(img => !img.src.startsWith("data:image")).map(img => img.src);

  return { base64Images, otherImages };
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
  const { base64Images, otherImages } = extractImagesFromContent(content);

  if (base64Images.length === 0) {
    return {
      updatedContent: content,
      uploadedUrls: otherImages,
    };
  }

  // base64 이미지들을 File 객체로 변환
  const imageFiles = await Promise.all(
    base64Images.map((img, index) => base64ToFile(img.src, `content-image-${index}.png`)),
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
    uploadedUrls: [...uploadedUrls, ...otherImages],
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
  console.log("포트폴리오 데이터:", portfolioData);
  let _id = portfolioId;
  console.log("포트폴리오 아이디:", _id);
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
    console.log("있어야 하는 포트폴리오 아이디:", _id);
    console.log("포트폴리오 데이터:", portfolioData);
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
    console.log("서버형식으로 변환된 데이터:", serverData);
    // 수정 api 이용하여 변환된 이미지 src 집어넣기
    const response = await api
      .put(`portfolios/${_id}`, {
        json: serverData,
      })
      .json<PortfolioEditResType>();
    return response;
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
