export interface JobGroup {
  _id: string;
  job: string; // 직군명
}

/**
 * --------------------------------------------------
 * API 응답
 * --------------------------------------------------
 */
export interface JobGroupApiRes {
  success: boolean; // 성공시
  data?: JobGroup | JobGroup[]; // 성공시
  error?: string; // 실패시 에러 메세지
}
