/**
* 파일(폴더) 객체의 정보를 반환 합니다.
*/
export interface ScriptFileInfo{

  /** 
   * 파일을 삭제합니다.
   *
  */
  Delete(): boolean;

  /** 
   * 파일의 이름을 변경합니다.
   *
  * @param newName 새이름
  */
  Rename(newName: string): boolean;

  /** 
   * 파일의 정대 경로를 반환합니다.
   *
  */
  getAbsolutePath(): string;

  /** 
   * 파일의 확장자를 반환 합니다.
   *
  */
  getExtention(): string;

  /** 
   * 파일의 최종 수정일을 반환 합니다.
   *
  */
  getLastModified(): Date;

  /** 
   * 파일의 사이즈를 반환 합니다.
   *
  */
  getLength(): number;

  /** 
   * 파일의 이름을 반환 합니다.
   *
  */
  getName(): string;

  /** 
   * 파일의 경로를 반환합니다.
   *
  */
  getPath(): string;

  /** 
   * 하위의 파일 목록을 반환 합니다.
   *
  */
  getSubFiles(): ScriptFileInfo[];

  /** 
   * 하위의 폴더 목록을 반환 합니다.
   *
  */
  getSubFolders(): ScriptFileInfo[];

  /** 
   * 폴더인지 여부를 반환 합니다.
   *
  */
  isDirectory(): boolean;

  /** 
   * 파일인지 여부를 반환 합니다.
   *
  */
  isFile(): boolean;

}
