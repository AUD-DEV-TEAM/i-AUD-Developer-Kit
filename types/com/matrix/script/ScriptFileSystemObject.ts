import { ScriptFileInfo } from "../../../com/matrix/script/io/ScriptFileInfo";
/**
* 파일의 읽기/쓰기에 대한 기능을 제공합니다.
*/
export interface ScriptFileSystemObject{

  /** 
   * 파일을 복사합니다.
   *
  * @param source 원본 경로
  * @param copyTo 사본 경로
  */
  CopyFile(source: string, copyTo: string): boolean;

  /** 
   * 파일을 복사합니다.
   *
  * @param source 원본 경로
  * @param copyTo 사본 경로
  */
  CopyFileEx(source: string, copyTo: string): boolean;

  /** 
   * 폴더를 생성합니다.
   *
  * @param path 파일 경로
  */
  CreateFolder(path: string): boolean;

  /** 
   * 파일을 삭제합니다.
   *
  * @param path 파일 경로
  */
  DeleteFile(path: string): boolean;

  /** 
   * 폴더를 삭제합니다.
   *
  * @param path 폴더 경로
  */
  DeleteFolder(path: string): boolean;

  /** 
   * 폴더를 삭제합니다.
   *
  * @param path 폴더 경로
  * @param recurcive 하위 폴더 삭제 여부
  */
  DeleteFolder(path: string, recurcive: boolean): boolean;

  /** 
   * 파일 또는 폴더가 존재하는지 점검합니다.
   *
  * @param path 경로
  */
  Exists(path: string): boolean;

  /** 
   * 해당 경로가 폴더인지 점검합니다.
   *
  * @param path 경로
  */
  IsDirectory(path: string): boolean;

  /** 
   * 해당 경로가 파일인지 점검합니다.
   *
  * @param path 경로
  */
  IsFile(path: string): boolean;

  /** 
   * 폴더를 이동합니다.
   *
  * @param sourceFolderPath 원본 폴더의 경로
  * @param targetFolderpath  대상 폴더의 경로
  */
  MoveFolder(sourceFolderPath: string, targetFolderpath: string): void;

  /** 
   * 파일 경로를 반환합니다.
   *
   * @example
   * ```js
   *   var fso = Matrix.getFileSystemObject();
   *   //주어진 경로를 조합한 경로를 반환합니다.
   *   //경로 문자열은 OS에 따라 자동으로 치환 됩니다.
   *   var path = fso.PathCombine("DATA/TEMP" ,"FILENAME.xlsx");
   *   // WINDOW : path = DATA\TEMP\FILENAME.xlsx
   *   // LINUX  : path = DATA/TEMP/FILENAME.xlsx
   * ```
  * @param path1 경로1
  * @param path2 경로2
  */
  PathCombine(path1: string, path2: string): string;

  /** 
   * 파일 경로를 반환합니다.
   *
   * @example
   * ```js
   *   
   *   var fso = Matrix.getFileSystemObject();
   *   //주어진 경로를 조합한 경로를 반환합니다.
   *   //경로 문자열은 OS에 따라 자동으로 치환 됩니다.
   *   var path = fso.PathCombine(["DATA","TEMP","FILENAME.xlsx"]);
   *   // WINDOW : path = DATA\TEMP\FILENAME.xlsx
   *   // LINUX  : path = DATA/TEMP/FILENAME.xlsx
   * ```
  * @param pathList 경로 목록
  */
  PathCombine(pathList: string[]): string;

  /** 
   * 텍스트 파일의 내용을 반환합니다.
   *
  * @param path 텍스트 파일 경로
  */
  ReadTextFile(path: string): string;

  /** 
   * 폴더 하위에 특정 시간(분)이 지난 파일/폴더들을 삭제합니다.
   *
  * @param folderPath 폴더 경로
  * @param minutes 분
  */
  RemoveOldFiles(folderPath: string, minutes: number): void;

  /** 
   * 파일의 이름을 변경합니다.
   *
  * @param source 원본 경로
  * @param newname 변경할 파일명
  */
  RenameFile(source: string, newname: string): boolean;

  /** 
   * 압축파일을 압축해제합니다.
   *
  * @param zipPath 압축 파일 경로
  * @param unzipFolder 압축해제할 폴더명
  */
  UnZipFile(zipPath: string, unzipFolder: string): string[];

  /** 
   * 폴더를 포함한 압축 파일의 압축을 해제합니다.
   *
  * @param zipPath 압축 파일 경로
  * @param folderPath 출력 대상 폴더명
  */
  UnZipFolder(zipPath: string, folderPath: string): boolean;

  /** 
   * 텍스트 파일을 작성합니다.
   *
  * @param path 텍스트 파일 경로
  * @param text 텍스트
  */
  WriteTextFile(path: string, text: string): boolean;

  /** 
   * 여러개의 파일을 압축합니다.
   *
  * @param fileList 압축 대상 파일 목록
  * @param zipPath 압축 생성할 파일 경로
  */
  ZipFiles(fileList: string[], zipPath: string): boolean;

  /** 
   * 여러개의 파일을 압축합니다.
   *
  * @param fileList 압축 대상 파일 목록
  * @param fileNames 압축 파일 이름 목록
  * @param zipPath 압축 생성할 파일 경로
  */
  ZipFiles(fileList: string[], fileNames: string[], zipPath: string): boolean;

  /** 
   * 폴더를 압축합니다.
   *
  * @param folderPath 압축 대상 폴더명
  * @param zipPath 압축 생성할 파일 경로
  * @param containFolderName 폴더 이름을 포함할 지 여부
  */
  ZipFolder(folderPath: string, zipPath: string, containFolderName: boolean): boolean;

  /** 
   * 폴더를 압축합니다.
   *
  * @param folderPath 압축 대상 폴더명
  * @param zipPath 압축 생성할 파일 경로
  */
  ZipFolder(folderPath: string, zipPath: string): boolean;

  /** 
   * 파일 정보를 반환합니다.
   *
  * @param path 파일 경로
  */
  getFileInfo(path: string): ScriptFileInfo;

  /** 
   * 디렉토리 구분 문자를 반환합니다.
   *
  */
  getFileSeparator(): string;

  /** 
   * 폴더의 하위 파일 목록을 반환합니다.
   *
  * @param folder 폴더경로
  */
  getFiles(folder: string): string[];

  /** 
   * 폴더의 하위 폴더 목록을 반환합니다.
   *
  * @param folder 폴더경로
  */
  getFolders(folder: string): string[];

  /** 
   * 임시 저장 경로의 폴더 이름을  반환합니다.
   *
  */
  getTemplateFolderName(): string;

  /** 
   * 임시 저장 경로 상의 파일의 경로를 반환합니다.
   *
  * @param filaNeme 파일이름
  */
  getTemplatePath(filaNeme: string): string;

}
