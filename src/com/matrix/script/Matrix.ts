import { ScriptWorkBook } from "../../../com/matrix/script/excel/ScriptWorkBook";
import { Conflux } from "../../../cfx/control/Conflux";
import { ScriptConnection } from "../../../com/matrix/script/ScriptConnection";
import { ScriptFTP } from "../../../com/matrix/script/ScriptFTP";
import { ScriptFileSystemObject } from "../../../com/matrix/script/ScriptFileSystemObject";
import { ScriptHttpClient } from "../../../com/matrix/script/ScriptHttpClient";
import { ScriptWebConnector } from "../../../com/matrix/script/ScriptWebConnector";
import { JsonFileWriter } from "../../../com/matrix/script/io/JsonFileWriter";
import { ScriptMatrix } from "../../../com/matrix/script/excel/ScriptMatrix";
import { OlapScriptContext } from "../../../com/matrix/olap/OlapScriptContext";
import { ScriptQueryGenerator } from "../../../com/matrix/script/ScriptQueryGenerator";
import { ReportConflux } from "../../../cfx/rpt/ReportConflux";
import { ScriptRequestPacket } from "../../../com/matrix/script/ScriptRequestPacket";
import { ScriptResponsePacket } from "../../../com/matrix/script/ScriptResponsePacket";
import { ScriptSession } from "../../../com/matrix/script/ScriptSession";
import { ScriptTextFileReader } from "../../../com/matrix/script/io/ScriptTextFileReader";
import { ScriptTextFileWriter } from "../../../com/matrix/script/io/ScriptTextFileWriter";
import { ScriptUtility } from "../../../com/matrix/script/ScriptUtility";
import { ScriptXmlToJsonConverter } from "../../../com/matrix/Excel/io/xml/ScriptXmlToJsonConverter";
/**
 * 서버 스크립트에서 접근할 수 있는 메인 API 객체입니다.
 *
 * 데이터베이스 연결, 파일 I/O, Excel 처리, HTTP 통신 등
 * 서버 측 비즈니스 로직 수행에 필요한 핵심 기능을 제공합니다.
 *
 * @example
 * ```js
 * // 기본 서버 스크립트 구조
 * var req = Matrix.getRequest();
 * var res = Matrix.getResponse();
 * var con = Matrix.getConnection();
 *
 * try {
 *     con.Connect("AUD_SAMPLE_DB");
 *     var rs = con.ExecuteRecordSet("SELECT * FROM EMP WHERE DEPT_CODE = :VS_DEPT_CODE");
 *     var table = res.getDataSet().CreateTable("DATA");
 *     table.AddColumn("EMP_NAME", false);
 *     while (rs.next()) {
 *         var row = table.AppendRow();
 *         row.setData("EMP_NAME", rs.getString("EMP_NAME"));
 *     }
 * } catch(e) {
 *     Matrix.ThrowException(e.message);
 * } finally {
 *     if (con != null) { con.DisConnect(); con = null; }
 * }
 * ```
 */
export interface Matrix{

  /**
   * 사용자에 의해 현재 작업이 취소되었는지 여부를 점검합니다.
   *
   * @param throwexception `true`이면 취소 시 자동으로 오류를 발생시킵니다
   */
  CheckCancel(throwexception: boolean): boolean;

  /**
   * 기본 설정으로 {@link ScriptWorkBook} 객체를 생성합니다.
   */
  CreateWorkBook(): ScriptWorkBook;

  /**
   * 기본 폰트를 지정하여 {@link ScriptWorkBook} 객체를 생성합니다.
   *
   * @param fontName 기본 폰트명
   * @param fontSize 기본 폰트 크기
   */
  CreateWorkBook(fontName: string, fontSize: number): ScriptWorkBook;

  /**
   * JSON 데이터 또는 JSON 파일 경로를 기반으로 {@link ScriptWorkBook} 객체를 생성합니다.
   *
   * @param jsonPath JSON 텍스트 또는 JSON 파일 경로
   */
  CreateWorkBookByJson(jsonPath: string): ScriptWorkBook;

  /**
   * 엑셀 파일의 활성 시트 내용을 HTML Table 태그로 변환하여 파일로 저장합니다.
   *
   * 대용량 엑셀 파일의 OOM 방지를 위해 별도 프로세스에서 처리됩니다.
   *
   * @param xlsFilePath 엑셀 파일 경로
   * @param outFilePath HTML 출력 파일 경로
   * @param limitRows 최대 출력 행 수
   *
   * @example
   * ```js
   * var fso = Matrix.getFileSystemObject();
   * var util = Matrix.getUtility();
   *
   * if (!fso.Exists(xlsFilePath)) {
   *     Matrix.WriteLog("파일이 존재하지 않습니다. Path=" + xlsFilePath);
   *     return "";
   * }
   * var htmlPath = fso.getTemplatePath(util.getUniqueKey("T") + ".htm");
   * // 최대 1000행까지 HTML 테이블로 변환
   * Matrix.ExcelToHtmlTable(xlsFilePath, htmlPath, 1000);
   * var htmlContent = fso.ReadTextFile(htmlPath);
   * ```
   */
  ExcelToHtmlTable(xlsFilePath: string, outFilePath: string, limitRows: number): boolean;

  /**
   * 엑셀 파일을 이미지로 변환합니다.
   *
   * OOM 방지를 위해 별도 프로세스에서 처리됩니다.
   *
   * @param xlxFilePath 엑셀 파일 경로
   * @param workSheetName 이미지로 변환할 시트명 (빈 문자열이면 활성 시트)
   * @param onePagePerSheet 시트를 한 개의 이미지로 출력할지 여부
   * @returns 생성된 이미지 파일 경로 배열
   */
  ExcelToImage(xlxFilePath: string, workSheetName: string, onePagePerSheet: boolean): string[];

  /**
   * 엑셀 파일을 PDF로 변환합니다.
   *
   * OOM 방지를 위해 별도 프로세스에서 처리됩니다.
   *
   * @param xlxFilePath 엑셀 파일 경로
   * @param pdfPath PDF 파일 저장 경로
   */
  ExcelToPDF(xlxFilePath: string, pdfPath: string): boolean;

  /**
   * 엑셀 파일을 PowerPoint 파일로 변환합니다.
   *
   * @param xlxFilePath 엑셀 파일 경로
   * @param pptPath PPTX 파일 저장 경로
   */
  ExcelToPPTX(xlxFilePath: string, pptPath: string): boolean;

  /**
   * 클라이언트에서 전달받은 데이터셋의 변경 데이터를 데이터베이스에 저장합니다.
   *
   * @returns 실행 결과 메시지
   */
  ExecuteDML(): string;

  /**
   * 특정 MX-Grid의 {@link ScriptWorkBook} 객체를 반환합니다.
   *
   * @param reportCode 보고서 코드
   * @param mxGridCode MX-Grid에 연결된 i-MATRIX 코드
   *
   * @example
   * ```js
   * //──────────────────────────────────────────────────
   * // MX-Grid 모델(엑셀)을 열어서 특정 시트의 셀 값 읽기
   * //──────────────────────────────────────────────────
   * var req = Matrix.getRequest();
   * var res = Matrix.getResponse();
   *
   * // MX-Grid 모델 열기 (데이터셋 실행 포함)
   * var wb = Matrix.OpenWorkBook(req.getReportCode(), "MX_GRID_CODE", true);
   *
   * // 수식계산 후 수식 비활성화 (중복 수식 계산 방지)
   * wb.Calculate(true);
   *
   * //── 방법 1: WorkSheet → getRange → 셀 값 읽기 ──
   * var sheet = wb.getWorkSheet("V1");
   *
   * // 셀 주소로 접근
   * var cell = sheet.getRange("B2");
   * var textValue = cell.getText();    // 서식 적용된 텍스트
   * var numValue  = cell.getNumber();  // 수치 값
   * var anyValue  = cell.getValue();   // 원본 값 (any)
   *
   * // 행/열 번호로 접근 (1부터 시작)
   * var cell2 = sheet.getRange(3, 2);       // 3행 2열 = B3
   * var cellType = cell2.getCellType();     // 셀 타입 (String, Number, DateTime 등)
   * Matrix.WriteLog("B3 타입: " + cellType + ", 값: " + cell2.getText());
   *
   * //── 방법 2: WorkBook에서 시트명!셀주소로 직접 읽기 ──
   * // 이름정의(Named Range) 또는 "시트명!셀주소" 형식 사용
   * var val = wb.getNameRangeValue("V1!C5");  // 값 반환
   * var txt = wb.getNameRangeText("V1!C5");   // 서식 적용 텍스트 반환
   *
   * //── 특정 영역을 순회하며 읽기 ──
   * for (var r = 1; r <= 10; r++) {
   *     for (var c = 1; c <= 5; c++) {
   *         if (sheet.hasRange(r, c)) {
   *             var v = sheet.getRange(r, c).getText();
   *             Matrix.WriteLog("Cell[" + r + "," + c + "] = " + v);
   *         }
   *     }
   * }
   *
   * res.WriteResponseText(JSON.stringify({
   *     TEXT_VALUE: textValue,
   *     NUM_VALUE: numValue,
   *     DIRECT_VALUE: val
   * }));
   * ```
   */
  OpenWorkBook(reportCode: string, mxGridCode: string): ScriptWorkBook;

  /**
   * 특정 MX-Grid의 {@link ScriptWorkBook} 객체를 반환하며, 데이터셋 실행 여부를 지정합니다.
   *
   * @param reportCode 보고서 코드
   * @param mxGridCode MX-Grid에 연결된 i-MATRIX 코드
   * @param executeDataSet 데이터셋을 실행하여 데이터를 가져올지 여부
   */
  OpenWorkBook(reportCode: string, mxGridCode: string, executeDataSet: boolean): ScriptWorkBook;

  /**
   * 엑셀 파일을 MX-Grid용 문서(`.json2`)로 변환한 뒤 변환된 파일의 경로를 반환합니다.
   *
   * 변환된 파일은 원본 엑셀 파일과 동일한 경로에 `.json2` 확장자로 생성됩니다.
   *
   * @param xlsFilePath 엑셀 파일 경로
   * @param allSheets 모든 시트를 파싱할지 여부. `false`이면 `V`로 시작하는 시트, 활성 시트, 수식 참조 시트만 대상으로 합니다.
   * @returns 변환된 `.json2` 파일 경로
   *
   * @example
   * ```js
   * //──────────────────────────────────────────────────
   * // 패턴 1: 업로드된 엑셀 파일을 MX-Grid 문서로 변환
   * //──────────────────────────────────────────────────
   * var fso = Matrix.getFileSystemObject();
   *
   * // 업로드된 엑셀 파일 경로
   * var xlsPath = fso.getTemplatePath("upload_report.xlsx");
   *
   * // 전체 시트 파싱
   * var json2Path = Matrix.ParseExcel(xlsPath, true);
   * Matrix.WriteLog("변환 결과: " + json2Path);
   * // 결과: ..._TEMP_/upload_report.json2
   *
   * //──────────────────────────────────────────────────
   * // 패턴 2: V 시트만 선택적 파싱 후 클라이언트에 전달
   * //──────────────────────────────────────────────────
   * var res = Matrix.getResponse();
   * var fso = Matrix.getFileSystemObject();
   *
   * var xlsPath = fso.getTemplatePath("template.xlsx");
   *
   * // allSheets=false: V로 시작하는 시트 + 활성 시트 + 수식 참조 시트만 파싱
   * var json2Path = Matrix.ParseExcel(xlsPath, false);
   *
   * // 변환된 파일 내용을 클라이언트에 전달
   * res.WriteResponseTextFile(json2Path);
   * ```
   */
  ParseExcel(xlsFilePath: string, allSheets: boolean): string;

  /**
   * 사용자 정의 오류를 발생시킵니다.
   *
   * 서버 스크립트 실행을 중단하고 클라이언트에 오류 메시지를 전달합니다.
   *
   * @param message 오류 메시지
   */
  ThrowException(message: string): void;

  /**
   * 지정한 파일명으로 사용자 정의 로그를 작성합니다.
   *
   * @param fileName 로그 파일명 (파일 헤더로 사용)
   * @param log 로그 내용
   */
  WriteCustomLog(fileName: string, log: string): void;

  /**
   * 지정한 파일명으로 예외 정보를 포함한 사용자 정의 로그를 작성합니다.
   *
   * @param fileName 로그 파일명 (파일 헤더로 사용)
   * @param log 로그 내용
   * @param exception 예외 객체
   */
  WriteCustomLog(fileName: string, log: string, exception: any): void;

  /**
   * 시스템 로그를 작성합니다.
   *
   * @param log 로그 내용
   */
  WriteLog(log: string): void;

  /**
   * 로그 타입을 지정하여 시스템 로그를 작성합니다.
   *
   * @param log 로그 타입
   * @param message 로그 내용
   */
  WriteLog(log: string, message: any): void;

  /**
   * 로그 타입과 메시지를 지정하여 시스템 로그를 작성합니다.
   *
   * @param log 로그 타입
   * @param message 로그 메시지
   */
  WriteLog(log: string, message: string): void;

  /**
   * {@link Conflux} 객체를 반환합니다. AUD-Conflux Script Editor에서 접근 가능합니다.
   *
   * @example
   * ```js
   * var Conflux = Matrix.getConflux();
   * ```
   */
  getConflux(): Conflux;

  /**
   * 데이터베이스 연결을 위한 {@link ScriptConnection} 객체를 반환합니다.
   *
   * @example
   * ```js
   * var con = Matrix.getConnection();
   * try {
   *     con.Connect("AUD_SAMPLE_DB");
   *     var rs = con.ExecuteRecordSet("SELECT * FROM EMP");
   *     // 결과 처리
   * } finally {
   *     if (con != null) { con.DisConnect(); con = null; }
   * }
   * ```
   */
  getConnection(): ScriptConnection;

  /**
   * FTP 연결을 위한 {@link ScriptFTP} 객체를 반환합니다.
   *
   * @example
   * ```js
   * var res = Matrix.getResponse();
   * var ftp = Matrix.getFTPConnector();
   * ftp.Connect("127.0.0.1", 21, "userName", "password", false);
   * // 작업 경로 설정
   * ftp.setFolderPath(VS_WORK_FOLDER);
   * // 파일 목록 출력
   * var table = ftp.getListFiles();
   * // 클라이언트로 출력
   * res.getDataSet().AddTable(table, "LIST");
   * ftp.DisConnect();
   * ftp = null;
   * ```
   */
  getFTPConnector(): ScriptFTP;

  /**
   * 파일 I/O 관련 유틸리티 {@link ScriptFileSystemObject} 객체를 반환합니다.
   */
  getFileSystemObject(): ScriptFileSystemObject;

  /**
   * Multipart 방식의 HTTP 요청을 위한 {@link ScriptHttpClient} 객체를 반환합니다.
   *
   * 파일 업로드와 텍스트 파라미터를 함께 전송해야 하는 경우에 사용합니다.
   * 메서드 체이닝을 지원하여 요청을 간결하게 구성할 수 있습니다.
   *
   * @example
   * ```js
   * //──────────────────────────────────────────────────
   * // 패턴 1: 파일 업로드 + 텍스트 파라미터
   * //──────────────────────────────────────────────────
   * var http = Matrix.getHttpClient();
   * var fso = Matrix.getFileSystemObject();
   *
   * // 업로드할 파일 준비 (reports 하위 경로)
   * var filePath = fso.getTemplatePath("export_data.xlsx");
   *
   * // 요청 구성 및 실행
   * var result = http.Create("http://api.example.com/upload", "POST")
   *     .setHeader("Accept", "application/json")
   *     .addTextBody("userCode", "matrix")
   *     .addTextBody("description", "월별 매출 리포트")
   *     .addBinaryBody(filePath, "file", "매출리포트.xlsx")
   *     .execute();
   *
   * var json = JSON.parse(result);
   * Matrix.WriteLog("업로드 결과: " + json.status);
   *
   * //──────────────────────────────────────────────────
   * // 패턴 2: 다중 파일 업로드 (MIME 타입 지정)
   * //──────────────────────────────────────────────────
   * var http = Matrix.getHttpClient();
   * var fso = Matrix.getFileSystemObject();
   *
   * var result = http.Create("http://api.example.com/files", "POST")
   *     .setHeader("Authorization", "Bearer token123")
   *     .addTextBody("category", "report")
   *     .addBinaryBody(fso.getTemplatePath("data.csv"), "files", "데이터.csv",
   *         "text/csv", "UTF-8")
   *     .addBinaryBody(fso.getTemplatePath("image.png"), "files", "이미지.png",
   *         "image/png", "UTF-8")
   *     .execute();
   * ```
   */
  getHttpClient(): ScriptHttpClient;

  /**
   * HTTP/HTTPS 프로토콜을 통한 외부 서버 연결을 위한 {@link ScriptWebConnector} 객체를 반환합니다.
   *
   * REST API 호출, 파일 다운로드/업로드 등 서버 간 통신에 사용합니다.
   *
   * @example
   * ```js
   * //──────────────────────────────────────────────────
   * // 패턴 1: REST API 호출 (JSON POST)
   * //──────────────────────────────────────────────────
   * var web = Matrix.getHttpConnector();
   *
   * var targetUrl = "http://api.example.com/users";
   * var method = "POST";
   * var postData = JSON.stringify({
   *     "userName": "홍길동",
   *     "deptCode": "D001"
   * });
   * var headers = ["Content-Type=application/json",
   *                "Accept=application/json"];
   *
   * var result = web.SendRequest(targetUrl, method, postData, headers);
   * var json = JSON.parse(result);
   * Matrix.WriteLog("응답: " + json.status);
   *
   * //──────────────────────────────────────────────────
   * // 패턴 2: 파일 다운로드
   * //──────────────────────────────────────────────────
   * var web = Matrix.getHttpConnector();
   * var fso = Matrix.getFileSystemObject();
   *
   * var downloadUrl = "http://api.example.com/files/report.xlsx";
   * var savePath = fso.getTemplatePath("download_report.xlsx");
   *
   * web.DownLoadFile(downloadUrl, savePath, "GET", "", []);
   *
   * //──────────────────────────────────────────────────
   * // 패턴 3: 파일 업로드
   * //──────────────────────────────────────────────────
   * var web = Matrix.getHttpConnector();
   *
   * var uploadUrl = "http://api.example.com/upload";
   * // 단일 파일 업로드
   * var response = web.UploadFile(uploadUrl, "file",
   *     "_TEMP_/export.xlsx",
   *     ["userCode=matrix"],              // POST 데이터
   *     ["Accept=application/json"]);     // 헤더
   *
   * // 다중 파일 업로드 (파일경로@업로드명 형식)
   * var response2 = web.UploadFiles(uploadUrl,
   *     ["_TEMP_/data.csv@데이터.csv", "_TEMP_/image.png@이미지.png"],
   *     ["userCode=matrix"],
   *     ["Accept=application/json"]);
   *
   * ```
   */
  getHttpConnector(): ScriptWebConnector;

  /**
   * JSON 형식의 파일 작성을 위한 {@link JsonFileWriter} 객체를 반환합니다.
   *
   * @param filePath 파일 경로
   */
  getJsonFileWriter(filePath: string): JsonFileWriter;

  /**
   * i-MATRIX 또는 MX-Grid의 원본 엑셀 파일을 제어하기 위한 {@link ScriptMatrix} 객체를 반환합니다.
   *
   * @example
   * ```js
   * // i-MATRIX를 서버에서 열어 PDF로 변환
   * var MATRIX = Matrix.getMATRIX();
   * MATRIX.Open("REP6C7A539A46C74798B1A19434221851B0")
   *       .Refresh()                          // 데이터 실행
   *       .RemoveSheet("Sheet1")              // 특정 시트 삭제
   *       .UpdatePictures("Shape1,Shape2")    // 이미지 갱신
   *       .SavePDF("_TEMP_", "output.pdf")    // PDF 저장
   *       .Close()
   *       .Dispose();
   * ```
   */
  getMATRIX(): ScriptMatrix;

  /**
   * OLAP Write-Back 작업을 위한 {@link OlapScriptContext} 객체를 반환합니다.
   */
  getOlapScriptContext(): OlapScriptContext;

  /**
   * 쿼리를 자동으로 생성하는 {@link ScriptQueryGenerator} 객체를 반환합니다.
   *
   * 데이터 테이블의 행 상태(N/U/D)에 따라 INSERT/UPDATE/DELETE SQL을 자동 생성하거나,
   * MERGE(UPSERT) SQL을 생성할 수 있습니다. 또한 SQL 파라미터 바인딩, 파라미터 추출 등
   * 쿼리 관련 유틸리티 기능을 제공합니다.
   *
   * @example
   * ```js
   * //──────────────────────────────────────────────────
   * // 패턴 1: 그리드 데이터를 받아서 컬럼 타입을 동적 변경 후 DML 생성
   * //──────────────────────────────────────────────────
   * var req = Matrix.getRequest();
   * var res = Matrix.getResponse();
   * var con = Matrix.getConnection();
   * var qg  = Matrix.getQueryGenerator();
   *
   * // 클라이언트에서 전달받은 그리드 데이터
   * var table = req.getTable("Grid1");
   *
   * // 컬럼의 데이터 타입을 동적으로 변경
   * // (클라이언트에서 전달된 컬럼 타입이 DB 테이블과 다를 때 사용)
   * table.getColumn("USER_CODE").setKeyType(3);    // Primary (PK 지정)
   * table.getColumn("USER_CODE").setSaveMode(1);   // InsertOnly (INSERT 시에만 사용)
   * table.getColumn("AMOUNT").setDataType(0);      // Numeric (숫자형으로 변경)
   * table.getColumn("REG_DATE").setDataType(3);    // DateTimeNow (시스템 일시로 자동 설정)
   * table.getColumn("REG_USER").setDataType(4);    // UserCode (접속 사용자 코드로 자동 설정)
   *
   * try {
   *     con.Connect("AUD_SAMPLE_DB");
   *     con.BeginTransaction();
   *
   *     // 행 상태(N/U/D)에 따라 INSERT/UPDATE/DELETE SQL 자동 생성 및 실행
   *     for (var i = 0, len = table.getRowCount(); i < len; i++) {
   *         var row = table.getRow(i);
   *         var status = row.getRowStatus(); // "N", "U", "D"
   *         if (status == "") continue; // 변경 없는 행은 건너뜀
   *
   *         var sql = qg.getDMLCommand(table, row, "TB_USER_DATA", 1); // 1=DBOracle
   *         con.Execute(sql);
   *     }
   *     con.CommitTransaction();
   * } catch(e) {
   *     con.RollBackTransaction();
   *     Matrix.ThrowException(e.message);
   * } finally {
   *     if (con != null) { con.DisConnect(); con = null; }
   * }
   *
   * //──────────────────────────────────────────────────
   * // 패턴 2: MERGE(UPSERT) SQL 자동 생성
   * //──────────────────────────────────────────────────
   * // PK 기준으로 존재하면 UPDATE, 없으면 INSERT하는 MERGE SQL 생성
   * var mergeSQL = qg.getMergeCommand(table, table.getRow(0), "TB_USER_DATA", 1);
   * // Oracle: MERGE INTO TB_USER_DATA USING ... ON (...) WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...
   *
   * //──────────────────────────────────────────────────
   * // 패턴 3: SQL 파라미터 바인딩
   * //──────────────────────────────────────────────────
   * // 클라이언트 전달 파라미터 값으로 바인딩 변수를 치환
   * var rawSQL = "SELECT * FROM EMP WHERE DEPT_CODE = :VS_DEPT_CODE AND SALARY > :VN_MIN_SALARY";
   * var bindedSQL = qg.getParameterBindedSQL(rawSQL, "AUD_SAMPLE_DB"); // DBMS 코드 지정
   * // 결과: SELECT * FROM EMP WHERE DEPT_CODE = 'D001' AND SALARY > 50000
   *
   * //──────────────────────────────────────────────────
   * // 패턴 4: 유틸리티 함수
   * //──────────────────────────────────────────────────
   * // SQL에서 바인딩 변수 목록 추출
   * var params = qg.getQueryParameters("SELECT * FROM EMP WHERE CODE = :VS_CODE AND NAME LIKE %:VS_NAME%");
   * // params = ["VS_CODE", "VS_NAME"]
   *
   * // 데이터베이스별 시스템 일자 함수 반환
   * var oracleNow = qg.getDateTimeNowString(1);  // "SYSDATE"        (Oracle)
   * var mssqlNow  = qg.getDateTimeNowString(2);  // "GETDATE()"      (SQL Server)
   * var mysqlNow  = qg.getDateTimeNowString(14); // "NOW()"          (MySQL)
   *
   * // SQL 주석 제거
   * var cleanSQL = qg.removeSQLComments("SELECT *   FROM EMP -- 직원테이블");
   * // 결과: SELECT *  FROM EMP
   *
   * // 프로시저 여부 판단
   * var isProc = qg.isProcedure("{call SP_GET_EMP(?)}"); // true
   * ```
   */
  getQueryGenerator(): ScriptQueryGenerator;

  /**
   * {@link ReportConflux} 객체를 반환합니다.
   *
   * @example
   * ```js
   * var Conflux = Matrix.getReportConflux();
   * ```
   */
  getReportConflux(): ReportConflux;

  /**
   * 클라이언트 요청 정보를 담은 {@link ScriptRequestPacket} 객체를 반환합니다.
   *
   * 클라이언트에서 `RunScript`/`RunScriptEx` 호출 시 전달된 파라미터와
   * 그리드 데이터(DataTable)를 조회할 수 있습니다.
   *
   * @example
   * ```js
   * var req = Matrix.getRequest();
   *
   * // 1. 클라이언트에서 전달한 파라미터 조회
   * var keyword = req.getParam("VS_KEYWORD");
   * var deptCode = req.getParam("VS_DEPT_CODE");
   * Matrix.WriteLog("검색어: " + keyword + ", 부서: " + deptCode);
   *
   * // 2. 파라미터 추가/수정 (서버에서 동적으로 값 변경)
   * req.setParam("VS_USER_CODE", req.getUserCode());
   *
   * // 3. 클라이언트에서 전달한 그리드 데이터(DataTable) 조회
   * var tableCount = req.getTableCount();
   * if (tableCount > 0) {
   *     var dt = req.getTable("DataGrid");  // 컨트롤 이름으로 조회
   *     for (var i = 0; i < dt.getRowCount(); i++) {
   *         var row = dt.getRow(i);
   *         Matrix.WriteLog(row.getString("EMP_NAME"));
   *     }
   * }
   *
   * // 4. 현재 사용자 정보
   * var userCode = req.getUserCode();       // 로그인 사용자 ID
   * var ip = req.getRemoteAddr();           // 접속 IP
   * var reportCode = req.getReportCode();   // 현재 보고서 코드
   * ```
   */
  getRequest(): ScriptRequestPacket;

  /**
   * 클라이언트 응답 데이터를 구성하기 위한 {@link ScriptResponsePacket} 객체를 반환합니다.
   *
   * 응답 객체를 통해 DataTable을 생성하여 클라이언트에 DataSet으로 전달하거나,
   * JSON/텍스트를 직접 출력할 수 있습니다.
   *
   * @example
   * ```js
   * var res = Matrix.getResponse();
   *
   * // 1. DataSet으로 클라이언트에 전달 (가장 일반적인 패턴)
   * //    CreateTable로 빈 테이블을 만들고 데이터를 채워서 전달
   * var dt = res.CreateTable("Result");
   * dt.AddColumn("EMP_NAME");
   * dt.AddColumn("DEPT_CODE");
   * var row = dt.NewRow();
   * row.SetValue("EMP_NAME", "홍길동");
   * row.SetValue("DEPT_CODE", "D001");
   * dt.AddRow(row);
   * // 클라이언트에서: p.DataSet.getTable("Result")로 접근
   *
   * // 2. SQL 실행 결과를 바로 DataTable로 생성
   * var dt2 = res.CreateTable("EmpList", "AUD_SAMPLE_DB", "SELECT * FROM EMP");
   * // 클라이언트에서: p.DataSet.getTable("EmpList")로 접근
   *
   * // 3. JavaScript 객체를 JSON으로 출력
   * var result = {
   *     status: "OK",
   *     count: 10,
   *     items: [
   *         { code: "D001", name: "개발팀" },
   *         { code: "D002", name: "기획팀" }
   *     ]
   * };
   * res.WriteResponseText(JSON.stringify(result));
   *
   * // 4. JsonResponseWriter로 스트리밍 출력 (대용량 데이터에 적합)
   * var writer = res.getJsonResponseWriter();
   * writer.beginObject();
   * writer.addProperty("status", "OK");
   * writer.addProperty("count", "10");
   * writer.endObject();
   * writer.close();
   * ```
   */
  getResponse(): ScriptResponsePacket;

  /**
   * SFTP 연결을 위한 {@link ScriptFTP} 객체를 반환합니다.
   *
   * @example
   * ```js
   * var res = Matrix.getResponse();
   * var util = Matrix.getUtility();
   * var fso = Matrix.getFileSystemObject();
   * var ftp = Matrix.getSFTPConnector();
   * ftp.Connect("127.0.0.1", 22, "userName", "password", false);
   * // 작업 경로 설정
   * ftp.setFolderPath(VS_WORK_FOLDER);
   * // 파일 다운로드 (SFTP 서버 → AUD 서버)
   * var SAVE_FILE_PATH = "_TEMP_";
   * var SAVE_FILE_NAME = util.getUniqueKey("F");
   * ftp.Download(VS_FILE_NAME, fso.PathCombine(SAVE_FILE_PATH, SAVE_FILE_NAME));
   * // 클라이언트로 저장된 파일 경로 전달
   * var table = res.getDataSet().CreateTable("DATA");
   * table.AddColumn("FOLDER_NAME", false);
   * table.AddColumn("FILE_NAME", false);
   * var row = table.AppendRow();
   * row.setData("FOLDER_NAME", SAVE_FILE_PATH);
   * row.setData("FILE_NAME", SAVE_FILE_NAME);
   * ftp.DisConnect();
   * ftp = null;
   * ```
   */
  getSFTPConnector(): ScriptFTP;

  /**
   * 현재 세션 정보를 담은 {@link ScriptSession} 객체를 반환합니다.
   *
   * 세션에는 로그인 사용자 정보, 언어 설정 등 인증 관련 값이 저장되어 있습니다.
   *
   * @example
   * ```js
   * var session = Matrix.getSession();
   *
   * // 세션 값 조회
   * var userCode = session.getAttribute("USER_CODE");
   * var userName = session.getAttribute("USER_NAME");
   * var deptCode = session.getAttribute("DeptCode");
   * var langCode = session.getAttribute("LANG_CODE");
   * var isAdmin  = session.getAttribute("IS_ADMIN");
   *
   * Matrix.WriteLog("사용자: " + userName + " (" + userCode + ")");
   * Matrix.WriteLog("부서: " + deptCode + ", 언어: " + langCode);
   *
   * // 전체 세션 키 목록 조회
   * var keys = session.getAttributeNames();
   * for (var i = 0; i < keys.length; i++) {
   *     Matrix.WriteLog(keys[i] + " = " + session.getAttribute(keys[i]));
   * }
   *
   * // 사용자 정의 세션 값 설정 (인증 관련 예약 키는 설정해도 무시됩니다)
   * session.setAttribute("MY_CUSTOM_KEY", "custom_value");
   * ```
   */
  getSession(): ScriptSession;

  /**
   * 텍스트 파일 읽기를 위한 {@link ScriptTextFileReader} 객체를 반환합니다.
   *
   * `readLine()`으로 한 줄씩 읽으며, 파일 끝에 도달하면 `null`을 반환합니다.
   * 읽기가 완료되면 반드시 `close()`를 호출하여 리소스를 해제해야 합니다.
   *
   * @param filePath 파일 경로
   * @param encoding 파일 인코딩 (기본: `"UTF-8"`)
   *
   * @example
   * ```js
   * // CSV 파일을 읽어 DataTable에 적재
   * var fso = Matrix.getFileSystemObject();
   * var filePath = fso.PathCombine("_TEMP_", "import.csv");
   *
   * var reader = Matrix.getTextFileReader(filePath, "UTF-8");
   * var line = reader.readLine(); // 첫 줄(헤더) 읽기
   * var headers = line.split(",");
   *
   * var res = Matrix.getResponse();
   * var dt = res.CreateTable("Import");
   * for (var i = 0; i < headers.length; i++) {
   *     dt.AddColumn(headers[i]);
   * }
   *
   * while ((line = reader.readLine()) != null) {
   *     var cols = line.split(",");
   *     var row = dt.NewRow();
   *     for (var i = 0; i < cols.length; i++) {
   *         row.SetValue(headers[i], cols[i]);
   *     }
   *     dt.AddRow(row);
   * }
   * reader.close();
   *
   * Matrix.WriteLog("읽은 행 수: " + dt.getRowCount());
   * ```
   */
  getTextFileReader(filePath: string, encoding: string): ScriptTextFileReader;

  /**
   * 텍스트 파일 쓰기를 위한 {@link ScriptTextFileWriter} 객체를 반환합니다.
   *
   * 파일이 이미 존재하면 기존 내용 뒤에 이어서 작성합니다(Append 모드).
   * 새 파일로 작성하려면 먼저 파일을 삭제하거나 `writeBom()`을 호출하세요.
   *
   * @param filePath 파일 경로
   * @param encoding 파일 인코딩 (기본: `"UTF-8"`)
   *
   * @example
   * ```js
   * // CSV 파일 생성
   * var fso = Matrix.getFileSystemObject();
   * var filePath = fso.PathCombine("_TEMP_", "export.csv");
   * fso.RemoveFile(filePath); // 기존 파일 삭제 (새로 작성)
   *
   * var writer = Matrix.getTextFileWriter(filePath, "UTF-8");
   * writer.writeBom(); // Excel에서 한글 깨짐 방지용 BOM 추가
   *
   * // 헤더 작성
   * writer.println("사원번호,사원명,부서코드,급여");
   *
   * // 데이터 작성
   * var con = Matrix.getConnection();
   * con.Connect("");
   * var rs = con.ExecuteRecordSet("SELECT EMP_NO, EMP_NAME, DEPT_CODE, SALARY FROM EMP");
   * while (rs.next()) {
   *     var line = rs.getString("EMP_NO")
   *         + "," + rs.getString("EMP_NAME")
   *         + "," + rs.getString("DEPT_CODE")
   *         + "," + rs.getString("SALARY");
   *     writer.println(line);
   * }
   * writer.close();
   * con.DisConnect();
   *
   * // 로그 파일에 내용 추가 (Append 모드 활용)
   * var logPath = fso.PathCombine("_TEMP_", "batch.log");
   * var logWriter = Matrix.getTextFileWriter(logPath, "UTF-8");
   * var util = Matrix.getUtility();
   * logWriter.println("[" + util.getTimeStamp() + "] 작업 완료: 총 " + rs.getRowCount() + "건");
   * logWriter.close();
   * ```
   */
  getTextFileWriter(filePath: string, encoding: string): ScriptTextFileWriter;

  /**
   * 문자열, 날짜, 키 생성 등 공통 유틸리티를 제공하는 {@link ScriptUtility} 객체를 반환합니다.
   */
  getUtility(): ScriptUtility;

  /**
   * MX-Grid에서 생성한 {@link ScriptWorkBook} 객체를 반환합니다.
   *
   * 이 객체는 MX-Grid 서버 스크립트에서만 사용 가능하며, 직접 Dispose하지 않아야 합니다.
   *
   * @example
   * ```js
   * var wb = Matrix.getWorkBook();
   * // 수식 계산 (true를 전달하면 수식 삭제로 성능 향상)
   * wb.Calculate();
   * // WorkSheet 반환
   * var T1 = wb.getWorkSheet("T1");
   * var V1 = wb.getWorkSheet("V1");
   * // T1의 A1:D10 영역을 V1의 A1로 붙여넣기
   * var range = T1.Copy("A1", "D10");
   * range.Paste(V1
   *     , V1.Copy("A1").getRangeArea()
   *     , false  // updateData
   *     , true   // updateStyle
   *     , true   // updateHeight
   *     , false  // updateWidth
   *     , true   // updateMerge
   *     , true   // updateFormula
   * );
   * ```
   */
  getWorkBook(): ScriptWorkBook;

  /**
   * XML을 JSON으로 변환하는 {@link ScriptXmlToJsonConverter} 객체를 반환합니다.
   *
   * `xmlOrPath`에 `<`, `>` 문자가 포함되어 있으면 XML 문자열로, 그렇지 않으면 파일 경로로 인식합니다.
   *
   * @param xmlOrPath XML 파일 경로 또는 XML 문자열
   * @param jsonFilePath 변환 결과를 저장할 JSON 파일 경로
   *
   * @example
   * ```js
   * // XML 파일을 JSON으로 변환 (자동 규칙 생성)
   * var fso = Matrix.getFileSystemObject();
   * var jsonPath = fso.PathCombine("_TEMP_", "output.json");
   * var converter = Matrix.getXMLtoJSONConverter(xmlFilePath, jsonPath);
   * converter.BuildRule();           // XML 구조를 분석하여 변환 규칙 자동 생성
   * converter.setFormatPretty(true); // 들여쓰기 포맷팅
   * converter.Convert();             // 변환 실행 및 파일 저장
   *
   * // XML 문자열을 직접 변환 (수동 규칙 지정)
   * var xml = "<Root><Items><Item><Name>A</Name></Item><Item><Name>B</Name></Item></Items></Root>";
   * var converter2 = Matrix.getXMLtoJSONConverter(xml, jsonPath);
   * // 규칙: "{" = Object, "[" = Array, "," = Attribute, "!" = Ignore
   * converter2.addRule("Root", "{", "Root");
   * converter2.addRule("Root/Items/Item", "[", "Item");
   * converter2.Convert();
   *
   * // 파일 저장 없이 JSON 문자열로 반환
   * var jsonText = converter2.getJsonText();
   * Matrix.WriteLog(jsonText);
   * ```
   */
  getXMLtoJSONConverter(xmlOrPath: string, jsonFilePath: string): ScriptXmlToJsonConverter;

  /**
   * DataSource의 Dynamic SQL에서 반환할 SQL을 강제 설정합니다.
   *
   * DataSource의 DSType이 Dynamic SQL(2)인 경우, 서버 스크립트에서
   * 동적으로 생성한 SQL을 DataSource의 실행 쿼리로 지정할 때 사용합니다.
   *
   * Dynamic SQL 작성법에 대한 자세한 내용은 i-AUD SQL 작성 가이드를 참조하세요.
   *
   * @param sql 실행할 SQL 문 (파라미터 바인딩 포함 가능)
   *
   * @example
   * ```js
   * // DataSource 스크립트에서 조건에 따라 SQL을 동적으로 생성
   * var req = Matrix.getRequest();
   * var qg = Matrix.getQueryGenerator();
   *
   * var sqls = [];
   * sqls.push("SELECT T1.EMP_NAME, T1.DEPT_CODE, T1.SALARY");
   * sqls.push("FROM EMP T1");
   * sqls.push("WHERE 1 = 1");
   *
   * // 조건에 따라 SQL 동적 추가
   * var searchType = req.getParam("VS_SEARCH_TYPE");
   * if (searchType == "DEPT") {
   *     sqls.push("  AND T1.DEPT_CODE = :VS_DEPT_CODE");
   * } else if (searchType == "NAME") {
   *     sqls.push("  AND T1.EMP_NAME LIKE %:VS_KEYWORD%");
   * }
   * sqls.push("ORDER BY T1.EMP_NAME");
   *
   * // 파라미터 바인딩된 SQL을 DataSource 실행 쿼리로 설정
   * var sql = qg.getParameterBindedSQL(sqls.join("\n"), "AUD_SAMPLE_DB");
   * Matrix.setResultDynamicSQL(sql);
   * ```
   */
  setResultDynamicSQL(sql: string): void;

}
