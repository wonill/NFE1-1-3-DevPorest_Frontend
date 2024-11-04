import ky from "ky";
import { PortfolioThumbnailResType } from "../types/api-types/PortfolioType";
const apiUrl = import.meta.env.VITE_SERVER_URL;

export const uploadSingleImg = async (img: File) => {
  const formData = new FormData();
  formData.append("image", img);

  try {
    const response = await ky.post(`${apiUrl}/api/portfolios/upload`, {
      body: formData,
      credentials: "include",
    });

    const result: PortfolioThumbnailResType = await response.json();

    if (result.success) return result.data?.url;
    else return result.error;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
