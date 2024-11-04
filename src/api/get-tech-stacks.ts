import ky from "ky";
import { ITechStackType, TechStackApiResType } from "../types/api-types/TechStackType";
const apiUrl = import.meta.env.VITE_SERVER_URL;

export const getTechStacks = async () => {
  try {
    const response = await ky.get(`${apiUrl}/api/techstacks`, { credentials: "include" });
    const result: TechStackApiResType<ITechStackType> = await response.json();

    if (result.success) return result.data;
    else return result.error;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
