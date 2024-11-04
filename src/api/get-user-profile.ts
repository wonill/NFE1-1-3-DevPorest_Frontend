import ky from "ky";
import { UserProfileResType, UserApiResType } from "../types/api-types/UserType";
const apiUrl = import.meta.env.SERVER_URL;

export const getUserProfile = async (userId: string) => {
  try {
    const response = await ky.get(`${apiUrl}/users/user/${userId}`, { credentials: "include" });
    const result: UserApiResType<UserProfileResType> = await response.json();

    if (result.success) return result.data;
    else return result.error;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
