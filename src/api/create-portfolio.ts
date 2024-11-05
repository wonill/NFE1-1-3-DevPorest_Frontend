import api from "./index";
import { uploadSingleImg } from "./upload-single-img";
import {
  PortfolioType,
  PortfolioResType,
  PortfolioImagesResType,
  PostPortfolioType,
} from "../types/api-types/PortfolioType";

/**
 * Base64 이미지 데이터를 File 객체로 변환
 */
const base64ToFile = async (
  base64Data: string,
  fileName: string = "image.png"
): Promise<File> => {
  const base64WithoutHeader = base64Data.replace(
    /^data:image\/\w+;base64,/,
    ""
  );
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
  content: string
): {
  base64Images: { element: HTMLImageElement; src: string }[];
  otherImages: string[];
} => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const images = Array.from(doc.querySelectorAll("img"));

  const base64Images = images
    .filter((img) => img.src.startsWith("data:image"))
    .map((img) => ({ element: img, src: img.src }));

  const otherImages = images
    .filter((img) => !img.src.startsWith("data:image"))
    .map((img) => img.src);

  return { base64Images, otherImages };
};

/**
 * 다중 이미지 업로드 처리
 */
const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const response = await api
      .post("portfolios/uploads", {
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
  content: string
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
    base64Images.map((img, index) =>
      base64ToFile(img.src, `content-image-${index}.png`)
    )
  );

  // 다중 이미지 업로드
  const uploadedUrls = await uploadMultipleImages(imageFiles);

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
  uploadedImages: string[]
): PostPortfolioType => {
  return {
    ...clientData,
    techStack: clientData.techStack?.map((tech) => tech.skill) || [],
    jobGroup: clientData.jobGroup || "",
    images: uploadedImages,
  };
};

/**
 * 포트폴리오 생성 (이미지 업로드 포함)
 */
export const createPortfolio = async (
  portfolioData: PortfolioType
): Promise<PortfolioResType> => {
  try {
    // 1. 썸네일 이미지 처리
    let thumbnailUrl = portfolioData.thumbnailImage;
    if (thumbnailUrl?.startsWith("data:image")) {
      const thumbnailFile = await base64ToFile(thumbnailUrl, "thumbnail.png");
      const uploadedThumbnailUrl = await uploadSingleImg(thumbnailFile);
      if (!uploadedThumbnailUrl) {
        throw new Error("썸네일 이미지 업로드 실패");
      }
      thumbnailUrl = uploadedThumbnailUrl;
    }

    // 2. 에디터 컨텐츠 내 이미지 처리
    const { updatedContent, uploadedUrls } = await processEditorContent(
      portfolioData.contents
    );

    // 3. 서버 형식으로 데이터 변환
    const serverData = transformToServerFormat(
      {
        ...portfolioData,
        thumbnailImage: thumbnailUrl,
        contents: updatedContent,
      },
      uploadedUrls
    );

    // 4. 포트폴리오 생성 API 호출
    const response = await api
      .post("portfolios", {
        json: serverData,
      })
      .json<PortfolioResType>();

    return response;
  } catch (error) {
    console.error("포트폴리오 생성 오류:", error);
    throw error;
  }
};
