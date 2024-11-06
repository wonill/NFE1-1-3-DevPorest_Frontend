import { ITechStackType } from "./TechStackType";

/**
 * --------------------------------------------------
 * 프로필 생성: POST
 * /api/users
 * --------------------------------------------------
 */
// ReqBody
export interface UserProfileType {
  email: string; // 이메일
  intro: string; // 소개
  phoneNumber: string; // 전화번호
  links: string[]; // 관련 링크
  techStack: ITechStackType[]; // 기술 스택
  jobGroup: string; // 직군
  profileImage: string; // 프로필 이미지 URL
}

/**
 * --------------------------------------------------
 * 프로필 조회: GET
 * /api/users/user/:userid
 * --------------------------------------------------
 */
export interface UserProfileResType extends UserProfileType {
  userID: string; // 사용자 ID
  name: string; // 이름
  totalLikes?: number; // 좋아요 수
  createdAt?: string; // 생성날짜
  newUser?: boolean;
}

/**
 * --------------------------------------------------
 * 프로필 수정: PUT
 * /api/users
 * --------------------------------------------------
 */
// ReqBody
export interface UpdateUserProfileType extends Partial<UserProfileType> {}

/**
 * --------------------------------------------------
 * 인기 유저 TOP 5 조회: GET
 * /api/users/popular
 * --------------------------------------------------
 */
export interface PopularUserProfileResType
  extends Pick<
    UserProfileResType,
    "userID" | "name" | "jobGroup" | "profileImage" | "intro" | "techStack" | "totalLikes"
  > {}

/**
 * --------------------------------------------------
 * API 응답
 * T에 UserProfileResType 또는 PopularUserProfileResType[]를 넣어 사용
 * --------------------------------------------------
 */
// ResBody
export interface UserApiResType<T> {
  success: boolean; // 성공 여부
  data?: T; // 성공 시 데이터
  error?: string; // 실패 시 오류 메시지
}
