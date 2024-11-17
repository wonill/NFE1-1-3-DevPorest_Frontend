import ky from "ky";
import { JobGroupApiResType } from "../types/api-types/JobGroup";
const apiUrl = import.meta.env.VITE_SERVER_URL;

export const getJobGroup = async () => {
  try {
    const response = await ky.get(`${apiUrl}/job-group`, { credentials: "include" });
    const result: JobGroupApiResType = await response.json();

    if (result.success) return result.data;
    else return result.error;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
