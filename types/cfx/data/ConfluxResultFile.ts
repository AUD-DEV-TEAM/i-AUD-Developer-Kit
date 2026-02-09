/**
* Conflux Result File
*/
export interface ConfluxResultFile{

  /** 
   * 파일 경로를 반환합니다.
   *
  */
  getFilePath(): string;

  /** 
   * 파일명을 반환합니다.
   *
  */
  getName(): string;

  /** 
   * 파일 타입을 반환합니다.
   *
  */
  getType(): string;

  /** 
   * 파일명을 지정합니다.
   *
  * @param name 지정할 파일명
  */
  setName(name: string): void;

}
