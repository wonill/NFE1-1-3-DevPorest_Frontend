import ky from "ky";
import { UserProfileResType, UserApiResType } from "../types/api-types/UserType";
const apiUrl = import.meta.env.VITE_SERVER_URL;

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

export const getPopularUserProfile = async () => {
  try {
    const response = await ky.get(`${apiUrl}/users/popular`, {credentials:'include'});
    const result: UserApiResType<UserProfileResType> = await response.json();
    return result.data;

  } catch (error) {
    console.error('인기 개발자 프로필을 가져오던 중 오류 발생', error);
    throw error;
  }
}
