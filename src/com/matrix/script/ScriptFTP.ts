import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
/**
* FTP(SFTP) 연결을 지원합니다.
*/
export interface ScriptFTP{

  /** 
   * 연결하기
   *
  * @param address FTP 주소
  * @param port port 번호
  * @param userID 사용자 계정
  * @param password 비밀번호
  * @param passiveMode passive mode
  */
  Connect(address: string, port: number, userID: string, password: string, passiveMode: boolean): void;

  /** 
   * 연결 해제
   *
  */
  DisConnect(): void;

  /** 
   * FTP(SFTP) 연결을 통해 파일을 다운로드 합니다.
   *
   * @example
   * ```js
   *    	var res = Matrix.getResponse();
   *   	// FTP 서버 연결하기
   * 	var ftp = Matrix.getSFTPConnector();
   *     ftp.Connect("127.0.0.1" ,21 ,"userName" ,"password" ,false);
   * 	//작업 경로 설정
   * 	ftp.setFolderPath(VS_WORK_FOLDER);
   * 	//파일 다운로드 (ftp server -> aud server)
   * 	var SAVE_FILE_PATH = "_TEMP_";
   * 	var SAVE_FILE_NAME = util.getUniqueKey("F");
   * 	
   * 	ftp.Download(VS_FILE_NAME ,fso.PathCombine(SAVE_FILE_PATH ,SAVE_FILE_NAME));
   * 	
   * 	//client로 저장된 파일 경로 전달
   * 	var table = res.getDataSet().CreateTable("DATA");
   * 	table.AddColumn("FOLDER_NAME", false);
   * 	table.AddColumn("FILE_NAME", false);
   * 	var row = table.AppendRow();
   * 	row.setData("FOLDER_NAME" ,SAVE_FILE_PATH);
   * 	row.setData("FILE_NAME" ,SAVE_FILE_NAME);
   * 	
   * 	ftp.DisConnect();
   * 	ftp = null;
   * ```
  * @param filePath FTP 서버의 파일명
  * @param saveFileNnme 다운로드 할 파일 경로(reports 아래 경로 사용)
  */
  Download(filePath: string, saveFileNnme: string): void;

  /** 
   * FTP(SFTP) 연결을 통해 파일을 업로드 합니다.
   *
   * @example
   * ```js
   * 	var ftp = Matrix.getSFTPConnector(); //보안 연결  
   *   	//연결하기
   *     ftp.Connect("127.0.0.1" ,21 ,"userName" ,"password" ,false);	
   * 	//작업 경로 설정
   * 	ftp.setFolderPath(VS_WORK_FOLDER);	
   * 	//파일 업로드
   * 	ftp.Upload(fso.PathCombine("folderName" ,"fileName") ,"UPLOAD FILE NAME");
   * 	
   * 	//파일 목록 Client로 출력
   * 	var table = ftp.getListFiles();
   * 	
   * 	//client로 출력
   * 	res.getDataSet().AddTable(table ,"LIST");
   * 	
   * 	ftp.DisConnect();
   * 	ftp = null;
   * ```
  * @param filePath FTP 내 업로드할 파일 경로(reports 아래 경로 사용)
  * @param saveFileNnme 서버에 저장 할 파일명
  */
  Upload(filePath: string, saveFileNnme: string): void;

  /** 
   * FTP 서버의 작업 폴더 내 파일 리스트를 반환 합니다.
   *
  */
  getListFiles(): ScriptDataTable;

  /** 
   * FTP 서버에 폴더를 생성합니다.
   *
  * @param path FTP 서버의 폴더 경로
  */
  mkDir(path: string): void;

  /** 
   * FTP 서버에 폴더를 생성합니다.
   *
  * @param path FTP 서버의 폴더 경로
  */
  mkDirs(path: string): void;

  /** 
   * FTP 서버에 폴더를 삭제합니다.
   *
  * @param path FTP 서버의 폴더 경로
  */
  rmDir(path: string): void;

  /** 
   * FTP 서버에 파일을 삭제합니다.
   *
  * @param path FTP 서버의 파일 경로
  */
  rmFile(path: string): void;

  /** 
   * FTP 서버의 작업 폴더 경로를 변경합니다.
   *
  * @param path FTP 서버의 폴더명
  */
  setFolderPath(path: string): void;

}
