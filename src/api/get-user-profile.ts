import api from ".";
import { UserProfileResType, UserApiResType } from "../types/api-types/UserType";

export const getUserProfile = async (userId: string) => {
  try {
    const response = await api
      .get<UserApiResType<UserProfileResType>>(`users/user/${userId}`)
      .json();

    if (response.success) return response.data;
    else return response.error;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getPopularUserProfile = async () => {
  try {
    const response = await api.get<UserApiResType<UserProfileResType>>(`users/popular`).json();

    return response.data;
  } catch (error) {
    console.error("인기 개발자 프로필을 가져오던 중 오류 발생", error);
    throw error;
  }
};
