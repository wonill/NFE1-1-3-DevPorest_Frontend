import ky from "ky";
import { UserProfileType, UserProfileResType, UserApiResType } from "../types/api-types/UserType";
const apiUrl = import.meta.env.SERVER_URL;

export const createProfile = async (userData: UserProfileType) => {
  try {
    const response = await ky.post(`${apiUrl}/users`, {
      json: userData,
      credentials: "include",
    });

    const result: UserApiResType<UserProfileResType> = await response.json();

    if (result.success) return result.data;
    else return result.error;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
