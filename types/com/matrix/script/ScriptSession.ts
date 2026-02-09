/**
 * 현재 접속한 사용자의 세션에 대한 정보를 제공합니다.
 *
 * 세션에는 로그인 사용자의 인증 정보(`USER_CODE`, `USER_NAME`, `IS_ADMIN` 등)와
 * 사용자 정의 값이 저장되어 있습니다.
 *
 * @example
 * ```js
 * var session = Matrix.getSession();
 * var userCode = session.getAttribute("USER_CODE");
 * var userName = session.getAttribute("USER_NAME");
 * ```
 */
export interface ScriptSession{

  /**
   * 현재 세션의 특정 값을 문자열로 변환하여 반환합니다.
   *
   * 값이 `null`이면 빈 문자열(`""`)을 반환합니다.
   *
   * @param key 세션 키
   */
  getAttribute(key: string): string;

  /**
   * 현재 세션의 모든 키 목록을 반환합니다.
   */
  getAttributeNames(): string[];

  /**
   * 현재 세션의 특정 값을 원본 객체 그대로 반환합니다.
   *
   * `getAttribute()`와 달리 문자열 변환 없이 원래 타입을 유지합니다.
   *
   * @param key 세션 키
   */
  getObject(key: string): any;

  /**
   * 현재 세션에 사용자 정의 값을 설정합니다.
   *
   * 인증 관련 예약 키(`USER_CODE`, `USER_NAME`, `IS_ADMIN`, `LANG_CODE` 등)는
   * 보안을 위해 설정해도 무시됩니다.
   *
   * @param key 세션 키
   * @param value 설정할 값
   */
  setAttribute(key: string, value: any): void;

}
