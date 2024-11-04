import { ITechStackType } from "./TechStackType";
import { UserProfileResType } from "./UserType";

export interface PortfolioType {
  title: string; // 제목
  contents: string; // 내용
  images: string[]; // 이미지들
  tags: string[]; // 태그들
  techStack?: ITechStackType[]; // 기술스택
  thumbnailImage: string; // 썸네일 이미지
  userInfo: Pick<UserProfileResType, "userID" | "name" | "profileImage">;
  jobGroup?: string; // 직군
  links?: string[];
}

export interface DetailPortfolioType extends PortfolioType {
  _id: string;
  view: number; // 조회수
  createdAt: string; // 생성날짜
  likeCount: number; // 좋아요 수
}

/**
 * --------------------------------------------------
 * 포트폴리오 생성: POST, /api/portfolios,
 * 포트폴리오 수정: PUT, /api/portfolios/:id
 * 포트폴리오 삭제: DELETE, /api/portfolios/:id
 * 포트폴리오 상세 조회: GET, /api/portfolios/:id
 * --------------------------------------------------
 */
// ResBody
export interface PortfolioResType {
  success: boolean; // 성공 여부
  message: string;
  data?: DetailPortfolioType;
}

/**
 * --------------------------------------------------
 * API 응답
 * 포트폴리오 전체 조회
 * 유저 포트폴리오 조회
 * 유저가 좋아요 누른 포트폴리오 조회
 * 포트폴리오 검색
 * --------------------------------------------------
 */
// ResBody
export interface PortfolioApiResType {
  success: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
  data: DetailPortfolioType[];
}

/**
 * --------------------------------------------------
 * 단일 이미지 업로드: POST
 * /api/portfolios/upload
 * --------------------------------------------------
 */
// ReqBody
export interface PortfolioThumbnailType {
  image: File;
}

// ResBody
export interface PortfolioThumbnailResType {
  success: boolean;
  data?: {
    url: string;
  };
  error?: string;
}

/**
 * --------------------------------------------------
 * 다중 이미지 업로드: POST
 * /api/portfolios/uploads
 * --------------------------------------------------
 */
// ReqBody
export interface PortfolioImagesType {
  image: File[];
}

// ResBody
export interface PortfolioImagesResType {
  success: boolean;
  data?: {
    url: string[];
  };
  error?: string;
}
