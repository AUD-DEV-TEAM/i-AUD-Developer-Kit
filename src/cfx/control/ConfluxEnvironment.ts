/**
* Conflux 환경 변수 객체
*/
export interface ConfluxEnvironment{

  /** 
   * 특정 옵션의 값을 반환합니다.
   *
  * @param key Key
  */
  getOption(key: string): string;

  /** 
   * Work Folder 경로를 반환합니다.
   *
  */
  getWorkFolder(): string;

}
