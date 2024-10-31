/**
 * --------------------------------------------------
 * 좋아요 추가/취소: POST
 * /api/portfolios/:id/like
 * --------------------------------------------------
 */
// ResBody
export interface LikeType {
  like?: boolean; // 성공시 좋아요 여부
  likeCount?: number; // 성공시 좋아요 수
  message?: string; // 실패시 에러 메세지
}
