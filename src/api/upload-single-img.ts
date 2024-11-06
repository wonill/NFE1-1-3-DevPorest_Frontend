import { PortfolioThumbnailResType } from "../types/api-types/PortfolioType";
import api from ".";

export const uploadSingleImg = async (img: File) => {
  const formData = new FormData();
  formData.append("image", img);

  try {
    const response = await api.post(`portfolios/upload`, {
      body: formData,
    });

    const result: PortfolioThumbnailResType = await response.json();

    if (result.success) return result.data?.url;
    else return result.error;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
