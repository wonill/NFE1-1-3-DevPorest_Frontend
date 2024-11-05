import ky from "ky";
import { ITechStackType, TechStackApiResType, TechStackStatType } from "../types/api-types/TechStackType";
const apiUrl = import.meta.env.VITE_SERVER_URL;

export const getTechStacks = async () => {
  try {
    const response = await ky.get(`${apiUrl}/techstacks`, { credentials: "include" });
    const result: TechStackApiResType<ITechStackType> = await response.json();

    if (result.success) return result.data;
    else return result.error;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getTechStackStatistic = async () => {
  try {
    const response = await ky.get(`${apiUrl}/techstacks/statistic`, { credentials: "include" });
    const result: TechStackApiResType<TechStackStatType> = await response.json();

    if (result.success) return result.data;
    else return result.error;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

