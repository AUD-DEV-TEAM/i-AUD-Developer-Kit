/**
* 파일 또는 폴더의 정보를 제공합니다.
* `fso.getFileInfo(path)`로 획득합니다.
*
* @example
* ```js
* var fso = Matrix.getFileSystemObject();
* var res = Matrix.getResponse();
*
* //----------------------------------------------
* // 패턴1: 파일 정보 조회
* //----------------------------------------------
* var file = fso.getFileInfo("_TEMP_/report.xlsx");
* Matrix.WriteLog("파일명: " + file.getName());           // "report.xlsx"
* Matrix.WriteLog("확장자: " + file.getExtention());      // ".xlsx"
* Matrix.WriteLog("경로: " + file.getPath());             // 상대 경로
* Matrix.WriteLog("절대경로: " + file.getAbsolutePath()); // 절대 경로
* Matrix.WriteLog("크기: " + file.getLength() + " bytes");
* Matrix.WriteLog("수정일: " + file.getLastModified());
* Matrix.WriteLog("폴더여부: " + file.isDirectory());     // false
* Matrix.WriteLog("파일여부: " + file.isFile());           // true
*
* // 파일 이름 변경
* file.Rename("report_backup.xlsx");
*
* // 파일 삭제
* file.Delete();
*
* //----------------------------------------------
* // 패턴2: 폴더 내 파일/폴더 탐색
* //----------------------------------------------
* var folder = fso.getFileInfo("_TEMP_");
* if (folder.isDirectory()) {
*     // 하위 파일 목록
*     var files = folder.getSubFiles();
*     for (var i = 0; i < files.length; i++) {
*         Matrix.WriteLog(files[i].getName() + " (" + files[i].getLength() + " bytes)");
*     }
*     // 하위 폴더 목록
*     var subFolders = folder.getSubFolders();
*     for (var i = 0; i < subFolders.length; i++) {
*         Matrix.WriteLog("[DIR] " + subFolders[i].getName());
*     }
*     // 상위 폴더
*     var parent = folder.getParent();
*     Matrix.WriteLog("상위 폴더: " + parent.getName());
* }
*
* //----------------------------------------------
* // 패턴3: 폴더 내 파일을 순회하며 DB에 저장
* //----------------------------------------------
* var con = Matrix.getConnection();
* con.Connect("AUD_SAMPLE_DB");
* var sql = "INSERT INTO FILE_DATA(ID, NAME, FILE_DATA) VALUES(?, ?, ?)";
* var stmt = con.PrepareCall(sql, true);
*
* var fileList = fso.getFiles("WEB_IMAGES");
* for (var i = 0; i < fileList.length; i++) {
*     var file = fso.getFileInfo(fileList[i]);
*     stmt.setString(1, file.getName());
*     stmt.setString(2, file.getName());
*     stmt.setBLOBFile(3, fso.PathCombine("WEB_IMAGES", file.getPath()));
*     stmt.executeUpdate();
* }
* stmt.close();
* con.DisConnect();
* ```
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
  * @param newName 새 파일명
  */
  Rename(newName: string): boolean;

  /**
   * 파일의 절대 경로를 반환합니다.
   *
  */
  getAbsolutePath(): string;

  /**
   * 파일의 확장자를 반환합니다.
   *
  */
  getExtention(): string;

  /**
   * 파일의 최종 수정일을 반환합니다.
   *
  */
  getLastModified(): Date;

  /**
   * 파일의 크기(byte)를 반환합니다.
   *
  */
  getLength(): number;

  /**
   * 파일의 이름을 반환합니다.
   *
  */
  getName(): string;

  /**
   * 현재 파일의 상위 폴더를 반환합니다.
   *
  */
  getParent(): ScriptFileInfo;

  /**
   * 파일의 경로를 반환합니다.
   *
  */
  getPath(): string;

  /**
   * 하위의 파일 목록을 반환합니다.
   *
  */
  getSubFiles(): ScriptFileInfo[];

  /**
   * 하위의 폴더 목록을 반환합니다.
   *
  */
  getSubFolders(): ScriptFileInfo[];

  /**
   * 폴더인지 여부를 반환합니다.
   *
  */
  isDirectory(): boolean;

  /**
   * 파일인지 여부를 반환합니다.
   *
  */
  isFile(): boolean;

}
