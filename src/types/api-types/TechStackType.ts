export interface ITechStackType {
  skill: string; // 기술명
  bgColor: string; // 배경색
  textColor: string; // 텍스트색
  jobCode: string; // 연관 직무
}

/**
 * --------------------------------------------------
 * 기술스택 추가: POST
 * /api/techstacks
 * --------------------------------------------------
 */
// ReqBody
export interface AddTechStackType extends ITechStackType {
  useNum: number; // 사용횟수
  adminCode: string; // 관리자 코드
}

/**
 * --------------------------------------------------
 * 기술스택 사용 통계: GET
 * /api/techstacks/statistic
 * --------------------------------------------------
 */
export interface TechStackStatType extends ITechStackType {
  total_count: number; // 사용횟수
}

/**
 * --------------------------------------------------
 * API 응답
 * T에 ITechStackType 또는 AddTechStackType을 넣어 사용
 * --------------------------------------------------
 */
// ResBody
export interface TechStackApiResType<T> {
  success: boolean; // 성공시
  data?: T[]; // 성공시 기술스택사용횟수 배열
  error?: string; // 실패시 에러 메세지
}
