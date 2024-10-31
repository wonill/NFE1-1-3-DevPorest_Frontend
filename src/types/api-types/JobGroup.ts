/**
 * --------------------------------------------------
 * 모든 직군 조회: GET
 * /api/job-group
 * --------------------------------------------------
 */
export interface JobGroupType {
  _id: string;
  job: string; // 직군명
}

/**
 * --------------------------------------------------
 * API 응답
 * --------------------------------------------------
 */
// ResBody
export interface JobGroupApiResType {
  success: boolean; // 성공시
  data?: JobGroupType | JobGroupType[]; // 성공시
  error?: string; // 실패시 에러 메세지
}
