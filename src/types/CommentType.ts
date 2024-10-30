/**
 * --------------------------------------------------
 * 특정 포트폴리오의 댓글 생성: POST
 * /api/comments/:portfolioId
 * --------------------------------------------------
 */
// ReqBody
export interface Comment {
  content: string; // 댓글 내용
}
// ResBody
export interface CommentRes extends Comment {
  _id: string;
  userID: string; // 작성자 ID
  portfolioID: string; // 포트폴리오 ID
  createdAt: string; // 생성 날짜
}

/**
 * --------------------------------------------------
 * 특정 포트폴리오의 댓글 조회: GET
 * --------------------------------------------------
 */
// ResBody
export interface CommentApiRes {
  success: boolean; // 성공여부
  pagination: {
    currentPage: number; // 현재 페이지
    totalPages: number; // 전체 페이지
    totalComments: number; // 전체 댓글 수
    hasNextPage: boolean; // 다음 페이지 유무
    hasPrevPage: boolean; // 이전 페이지 유무
    limit: number; // 한번에 가져올 데이터 수
  };
  data: CommentRes[]; // 댓글 배열
}
