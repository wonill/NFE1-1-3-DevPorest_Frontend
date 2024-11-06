import api from "./index";
import { PortfolioThumbnailResType } from "../types/api-types/PortfolioType";

// 현재 사용하지 않는 함수, create-portfolio.ts에서 자체적으로 이미지 업로드를 처리함
export const uploadMultipleImages = async (
  images: File[],
  portfolioId?: string,
): Promise<string[]> => {
  const formData = new FormData();
  images.forEach(image => {
    formData.append("images", image);
  });

  try {
    const response = await api
      .post(`portfolios/uploads/${portfolioId}?usage=content`, {
        body: formData,
      })
      .json<PortfolioThumbnailResType>();

    if (response.success && response.data) {
      return [response.data.url];
    }
    throw new Error(response.error || "이미지 업로드 실패");
  } catch (error) {
    console.error("다중 이미지 업로드 오류:", error);
    throw error;
  }
};
