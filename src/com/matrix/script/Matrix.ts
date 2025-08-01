import { ScriptWorkBook } from "../../../com/matrix/script/excel/ScriptWorkBook";
import { ScriptConnection } from "../../../com/matrix/script/ScriptConnection";
import { ScriptFTP } from "../../../com/matrix/script/ScriptFTP";
import { ScriptFileSystemObject } from "../../../com/matrix/script/ScriptFileSystemObject";
import { ScriptHttpClient } from "../../../com/matrix/script/ScriptHttpClient";
import { ScriptWebConnector } from "../../../com/matrix/script/ScriptWebConnector";
import { JsonFileWriter } from "../../../com/matrix/script/io/JsonFileWriter";
import { ScriptMatrix } from "../../../com/matrix/script/excel/ScriptMatrix";
import { OlapScriptContext } from "../../../com/matrix/olap/OlapScriptContext";
import { ScriptQueryGenerator } from "../../../com/matrix/script/ScriptQueryGenerator";
import { ScriptRequestPacket } from "../../../com/matrix/script/ScriptRequestPacket";
import { ScriptResponsePacket } from "../../../com/matrix/script/ScriptResponsePacket";
import { ScriptSession } from "../../../com/matrix/script/ScriptSession";
import { ScriptTextFileReader } from "../../../com/matrix/script/io/ScriptTextFileReader";
import { ScriptTextFileWriter } from "../../../com/matrix/script/io/ScriptTextFileWriter";
import { ScriptUtility } from "../../../com/matrix/script/ScriptUtility";
import { ScriptXmlToJsonConverter } from "../../../com/matrix/Excel/io/xml/ScriptXmlToJsonConverter";
/**
* Server Script에서 접근할 수 있는 메인 API 모델입니다.
*/
export interface Matrix{

  /** 
   * 사용자에 의해 현재 작업이 취소 되었는지 여부를 점검한다.
   *
  * @param throwexception 오류를 자동 생성할지 여부
  */
  CheckCancel(throwexception: boolean): boolean;

  /** 
   * 엑셀 파일 작성을 위해 WorkBook 객체를 생성합니다.
   *
  */
  CreateWorkBook(): ScriptWorkBook;

  /** 
   * 엑셀 파일 작성을 위해 WorkBook 객체를 생성합니다.
   *
  * @param fontName 기본 폰트명
  * @param fontSize 기본 폰트 크기
  */
  CreateWorkBook(fontName: string, fontSize: number): ScriptWorkBook;

  /** 
   * json 데이터 기준으로 WorkBook 객체를 생성합니다.
   *
  * @param jsonPath json text or Path
  */
  CreateWorkBookByJson(jsonPath: string): ScriptWorkBook;

  /** 
   * 엑셀 파일을 이미지로 출력합니다.
   *
  * @param xlxFilePath  Excel의 파일 경로
  * @param workSheetName 이미지로 출력할 시트명 (생략 시 Active 시트)
  * @param onePagePerSheet 시트를 한개의 이미지로 출력할지 여부
  */
  ExcelToImage(xlxFilePath: string, workSheetName: string, onePagePerSheet: boolean): string[];

  /** 
   * Excel 파일을 PDF로 출력합니다.
   *
  * @param xlxFilePath  Excel의 파일 경로
  * @param pdfPath PDF 파일 저장 경로
  */
  ExcelToPDF(xlxFilePath: string, pdfPath: string): boolean;

  /** 
   * 엑셀 파일을 파워 포인트 파일로 변환 합니다.
   *
  * @param xlxFilePath  Excel의 파일 경로
  * @param pptPath PPT 파일 저장 경로
  */
  ExcelToPPTX(xlxFilePath: string, pptPath: string): boolean;

  /** 
   * Request가 전달 받은 데이터셋의 데이터를 데이터베이스에 저장합니다.
   *
  */
  ExecuteDML(): string;

  /** 
   * 특정 MX-Grid의 엑셀 개체를 반환합니다.
   *
  * @param reportCode 보고서 코드
  * @param mxGridCode MX-Grid에 연결된 i-MATRIX 코드
  */
  OpenWorkBook(reportCode: string, mxGridCode: string): ScriptWorkBook;

  /** 
   * 특정 MX-Grid의 엑셀 개체를 반환합니다.
   *
  * @param reportCode 보고서 코드
  * @param mxGridCode MX-Grid에 연결된 i-MATRIX 코드
  * @param executeDataSet dataset을 실행해서 데이터를 가져올지 여부
  */
  OpenWorkBook(reportCode: string, mxGridCode: string, executeDataSet: boolean): ScriptWorkBook;

  /** 
   * 주어진 엑셀파일을 MX-GRID용 문서로 변환한 뒤 해당 파일의 경로를 반환 합니다.
   *
  * @param xlsFilePath 
  * @param allSheets 모든 시트를 파싱할지 여부, 기본값은 V로 시작하는 시트와 Active 시트, 수식 참조된 시트만을 대상으로 합니다.
  */
  ParseExcel(xlsFilePath: string, allSheets: boolean): string;

  /** 
   * 오류를 생성합니다.
   *
  * @param message 오류 메시지
  */
  ThrowException(message: string): void;

  /** 
   * 시스템 로그를 작성합니다.
   *
  * @param fileName 로그파일의 헤더
  * @param log 로그 데이터
  */
  WriteCustomLog(fileName: string, log: string): void;

  /** 
   * 시스템 로그를 작성합니다.
   *
  * @param fileName 로그파일의 헤더
  * @param log 로그 데이터
  * @param exception exception
  */
  WriteCustomLog(fileName: string, log: string, exception: any): void;

  /** 
   * 시스템 로그를 작성합니다.
   *
  * @param log 로그 데이터
  */
  WriteLog(log: string): void;

  /** 
   * 시스템 로그를 작성합니다.
   *
  * @param log 로그 타입
  * @param message 로그 내용
  */
  WriteLog(log: string, message: any): void;

  /** 
   * 시스템 로그를 작성합니다.
   *
  * @param log 
  * @param message 
  */
  WriteLog(log: string, message: string): void;

  /** 
   * Conflux 객체를 반환합니다.
   *
  */
  getConflux(): any;

  /** 
   * 데이터베이스 연결 객체를 반환합니다.
   *
  */
  getConnection(): ScriptConnection;

  /** 
   * FTP 연결 객체를 반환합니다.
   *
   * @example
   * ```js
   *     var res = Matrix.getResponse();
   *   	// FTP 서버 연결하기
   * 	var ftp = Matrix.getFTPConnector();
   *     ftp.Connect("127.0.0.1" ,21 ,"userName" ,"password" ,false);
   * 	//작업 경로 설정
   * 	ftp.setFolderPath(VS_WORK_FOLDER);
   * 	//파일 목록 출력
   * 	var table = ftp.getListFiles();
   * 	//client로 출력
   * 	res.getDataSet().AddTable(table ,"LIST");
   * 	ftp.DisConnect();
   * 	ftp = null;
   * ```
  */
  getFTPConnector(): ScriptFTP;

  /** 
   * I/O관련 유틸리티 객체를 반환합니다.
   *
  */
  getFileSystemObject(): ScriptFileSystemObject;

  /** 
   * http 요청(request)객체를 반환합니다.(Multipart 사용)
   *
  */
  getHttpClient(): ScriptHttpClient;

  /** 
   * http 연결 객체를 반환합니다.
   *
  */
  getHttpConnector(): ScriptWebConnector;

  /** 
   * Json 형식의 파일 작성기를 반환 합니다.
   *
  * @param filePath 파일의 경로
  */
  getJsonFileWriter(filePath: string): JsonFileWriter;

  /** 
   * i-MATRIX 또는 MX_GRID의 원본 엑셀 파일을 제어합니다.
   *
   * @example
   * ```js
   *   //i-MATRIX를 서버에서 열어서 PDF로 변환 합니다.
   *   var MATRIX = Matrix.getMATRIX();
   * 	MATRIX.Open("REP6C7A539A46C74798B1A19434221851B0") //특정 i-MATRIX 보고서를 OPEN 합니다.
   * 		  .Refresh()   //데이터 실행
   * 		  .RemoveSheet("Sheet1") //특정 시트 삭제
   * 		  .UpdatePictures("Shape1,Shape2") //Client에 전송된 이미지(BASE-64)로 기존 엑셀에 있는 이미지를 갱신합니다.
   * 		  .SavePDF("_TEMP_", "AAAA.pdf") //PDF 저장
   * 		  .Close()    //close excel
   * 		  .Dispose(); //dispose
   * ```
  */
  getMATRIX(): ScriptMatrix;

  /** 
   * OLAP Write-Back 작업을 할 수 있는 객체를 반환 합니다.
   *
  */
  getOlapScriptContext(): OlapScriptContext;

  /** 
   * 쿼리를 자동으로 생성해주는 객체를 생성합니다.
   *
  */
  getQueryGenerator(): ScriptQueryGenerator;

  /** 
   * Request 객체를 반환합니다.
   *
  */
  getRequest(): ScriptRequestPacket;

  /** 
   * Response 객체를 반환합니다.
   *
  */
  getResponse(): ScriptResponsePacket;

  /** 
   * SFTP 연결 객체를 반환합니다.
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
  */
  getSFTPConnector(): ScriptFTP;

  /** 
   * Session 객체를 반환합니다.
   *
  */
  getSession(): ScriptSession;

  /** 
   * Text File 읽기를 지원하는 객체를 반환 합니다.
   *
  * @param filePath 파일의 경로
  * @param encoding 파일 Encoding(기본:UTF-8)
  */
  getTextFileReader(filePath: string, encoding: string): ScriptTextFileReader;

  /** 
   * Text File 쓰기를 지원하는 객체를 반환 합니다.
   *
  * @param filePath 파일의 경로
  * @param encoding 파일 Encoding(기본:UTF-8)
  */
  getTextFileWriter(filePath: string, encoding: string): ScriptTextFileWriter;

  /** 
   * 공통 유틸리티 객체를 반환합니다.
   *
  */
  getUtility(): ScriptUtility;

  /** 
   * MX-Grid 에서 생성한 WorkBook 개체를 반환합니다.
   *
   * @example
   * ```js
   * //MX-Grid의 WorkBook 모델에 접근합니다. 
   * var wb = Matrix.getWorkBook();
   * // workbook의 수식을 계산 합니다. 
   * // Calculate에 파라미터로 수식을 삭제하도록 하면, 추가적인 연산이 되지않아 성능을 향상 시킬 수 있습니다.
   * // wb.Calculate(true) 
   * wb.Calculate();
   * //WorkSheet 반환 하기
   * var T1 = wb.getWorkSheet("T1");
   * var V1 = wb.getWorkSheet("V1");
   * 
   * var range = T1.Copy("A1", "D10");
   * range.Paste(V1 
   * 			,V1.Copy("A1").getRangeArea() 
   * 			,false //updateData 
   * 			,true //updateStyle 
   * 			,true //updateHeight 
   * 			,false//updateWidth 
   * 			,true //updateMerge 
   * 			,true //updateFormula
   * 			);
   * ```
  */
  getWorkBook(): ScriptWorkBook;

  /** 
   * XML 파일을 JSON 파일로 변환 합니다.
   *
  * @param xmlOrPath XML 파일의 경로 또는 XML
  * @param jsonFilePath JSON 파일의 경로
  */
  getXMLtoJSONConverter(xmlOrPath: string, jsonFilePath: string): ScriptXmlToJsonConverter;

  /** 
   * 데이터 소스에서  Dynamic SQL 사용 시 반환 SQL을 강제 설정 합니다.
   *
  * @param sql 
  */
  setResultDynamicSQL(sql: string): void;

}
