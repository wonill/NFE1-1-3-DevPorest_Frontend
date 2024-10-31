import { ITechStackType } from "./TechStackType";
import { JobGroupType } from "./JobGroup";

/**
 * --------------------------------------------------
 * todo
 * 포트폴리오 반환 필드가 변경 예정
 * => 전체적으로 수정 필요
 * --------------------------------------------------
 */

/**
 * --------------------------------------------------
 * 포트폴리오 생성: POST, 포트폴리오 수정: PUT
 * /api/portfolios,      /api/portfolios/:id
 * --------------------------------------------------
 */
// ReqBody
export interface PortfolioType {
  title: string; // 제목
  contents: string; // 내용
  images: string[]; // 이미지들
  tags: string[]; // 태그들
  techStack: ITechStackType[]; // 기술스택
  jobGroup: JobGroupType; // 직군
  thumbnailImage: string; // 썸네일 이미지
  userID: string; // 유저 ID
}

// ResBody
export interface AddPortfolioResType {
  success: boolean; // 성공 여부
  data: PortfolioType; // 성공시 데이터
}

/**
 * --------------------------------------------------
 * 전체 포트폴리오 조회: GET
 * /api/portfolios
 * --------------------------------------------------
 */
// ResBody
export interface WholePortfolioResType {
  success: boolean; // 성공 부
  count: number; // 전체 수
  data: PortfolioType[]; // 성공시 데이터
}

/**
 * --------------------------------------------------
 * 포트폴리오 상세 조회: GET
 * /api/portfolios/:id
 * --------------------------------------------------
 */
export interface DetailPortfolioType extends PortfolioType {
  _id: string;
  view: number; // 조회수
  createdAt: string; // 생성날짜
  updatedAt?: string; // 수정날짜
}

// ResBody
export interface DetailPortfolioResType {
  success: boolean; // 성공 여부
  data: DetailPortfolioResType; // 성공시 데이터
}

/**
 * --------------------------------------------------
 * 유저 포트폴리오 조회: GET
 * /api/portfolios/user/:userid
 * --------------------------------------------------
 */
// ResBody
export interface UserPortfolioResType {
  success: boolean; // 성공 여부
  pagination: {
    currentPage: number; // 현재 페이지
    totalPages: number; // 전체 페이지
    totalCount: number; // 전체 수
    hasNextPage: boolean; // 다음 페이지 유무
    hasPrevPage: boolean; // 이전 페이지 유무
    limit: number; // 가져올 포트폴리오 수
  };
  data: DetailPortfolioResType[];
}

/**
 * --------------------------------------------------
 * 유저가 좋아요 누른 포트폴리오 조회: GET
 * /api/portfolios/like/:userid
 * --------------------------------------------------
 */
// ResBody
export interface UserLikePortfolioResType {
  success: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
  data?: PortfolioType[];
  error?: string;
}

/**
 * --------------------------------------------------
 * 포트폴리오 삭제: DELETE
 * /api/portfolios/:id
 * --------------------------------------------------
 */
// ResBody
export interface DeletePortfolioResType {
  success: boolean;
  message: string;
}

/**
 * --------------------------------------------------
 * 포트폴리오 검색: GET
 * /api/portfolios/search/:type/:keyword
 * --------------------------------------------------
 */
// ResBody
export interface SearchPortfolioResType extends Omit<DetailPortfolioType, "updatedAt"> {
  likeCount: number;
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
