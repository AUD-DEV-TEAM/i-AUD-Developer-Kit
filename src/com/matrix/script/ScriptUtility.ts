import { ScriptPdfDocument } from "../../../com/matrix/script/PDF/ScriptPdfDocument";
import { ScriptPPT } from "../../../com/matrix/script/ppt/ScriptPPT";
import { DataTableTextFileWriter } from "../../../com/matrix/script/data/DataTableTextFileWriter";
import { ScriptWorkBook } from "../../../com/matrix/script/excel/ScriptWorkBook";
import { enDateInterval } from "../../../com/matrix/data/enDateInterval";
import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
import { ScriptDataSet } from "../../../com/matrix/script/ScriptDataSet";
import { Size } from "../../../com/matrix/Excel/Drawing/Size";
import { ScriptDataRow } from "../../../com/matrix/script/ScriptDataRow";
/**
* 공통 유틸리티 객체로 문자열 제어, 날짜제어, 메일 발송 등 다양한 기능을 제공합니다.
*/
export interface ScriptUtility{

  /** 
   * 입력된 값의 절대값을 반환합니다(입력값은 수치형 데이터만 허용합니다).
   *
  * @param value 입력값
  */
  Abs(value: number): number;

  /** 
   * Base64로 Encoding 된 이미지 데이터로  이미지 파일을 생성합니다.
   *
  * @param base64Text base64로 encoding 된 이미지
  * @param filePath 이미지 저장 경로
  */
  ConvertBase64ToPngFile(base64Text: string, filePath: string): boolean;

  /** 
   * 해당 클래스를 생성합니다.
   *
  * @param className Class Name
  */
  CreateInstance(className: string): any;

  /** 
   * PDF 파일 작성을 위한 객체를 반환합니다.
   *
  */
  CreatePDFDocument(): ScriptPdfDocument;

  /** 
   * PPT 파일 작성을 위해 Presentation 객체를 생성합니다.
   *
  * @param templatePath PPT Template Path (reports 아래 경로만 사용)
  */
  CreatePPT(templatePath: string): ScriptPPT;

  /** 
   * ScriptDataTable의 결과를 텍스트 파일로 저장 합니다.
   *
   * @example
   * ```js
   * // 쿼리 결과를 CSV로 출력 하기 
   * var req = Matrix.getRequest();
   * var res = Matrix.getResponse();
   * var session  = Matrix.getSession();
   * var util = Matrix.getUtility();
   * 
   * var con = Matrix.getConnection();
   * var fso = Matrix.getFileSystemObject();
   * var sql; 
   * var stmt = null;
   * try{
   * 	//_TEMP_ 경로 하위에 random한 파일 생성
   * 	var FILE_NAME = util.getUniqueKey("CSV")+ ".csv";
   * 	var path = fso.getTemplatePath(FILE_NAME);
   * 	// csv writer 생성
   * 	var csvWriter = util.CreateTableTextWriter(path ,"\n" ,"," , null ,null);
   * 	con.Connect("Connection Code");
   * 	//쿼리 실행
   * 	stmt = con.PreparedStatement("SELECT * FROM TABLE", true);
   * 	stmt.executeQuery(csvWriter); //쿼리 실행 후 결과를 csv로 출력한다.
   * 	// 출력한 레코드 갯수
   * 	//csvWriter.getRowCount();
   * 	
   * 	csvWriter.Close(); //파일에 대한 출력 닫기
   *   	con.DisConnect();
   * 	con = null;
   * 	
   * 	//파일의 경로를 Client로 전달
   * 	var out = res.getJsonResponseWriter();
   * 	out.beginObject()
   * 		.addProperty("FILE_NAME" ,FILE_NAME)
   * 	    .endObject()
   * 		.close();
   * }catch(e){
   * 	Matrix.ThrowException("Server Script Error:" + e.message);
   * }finally{
   * 	// release here 
   * 	 if(stmt != null){ 
   * 	    stmt.Close(); 
   * 	    stmt = null; 
   * 	 } 
   * 	 if(con != null){ 
   * 	    con.DisConnect(); 
   * 	    con = null; 
   * 	 } 
   * }
   * ```
  * @param path file path
  * @param rowDelimiter Row Delimiter
  * @param colDelimiter Column Delimiter
  * @param columnNames column Name list
  * @param captions caption list
  */
  CreateTableTextWriter(path: string, rowDelimiter: string, colDelimiter: string, columnNames: string[], captions: string[]): DataTableTextFileWriter;

  /** 
   * 엑셀 파일 작성을 위해 WorkBook 객체를 생성합니다.
   *
  * @param fontName 기본 폰트명
  * @param fontSize 기본 폰트 크기
  */
  CreateWorkBook(fontName: string, fontSize: number): ScriptWorkBook;

  /** 
   * 엑셀 파일 작성을 위해 WorkBook 객체를 생성합니다.
   *
  */
  CreateWorkBook(): ScriptWorkBook;

  /** 
   * json 데이터 기준으로 WorkBook 객체를 생성합니다.
   *
  * @param jsonText json text
  */
  CreateWorkBookByJson(jsonText: string): ScriptWorkBook;

  /** 
   * 입력된 값을 Date 형식으로 변환하여 반환합니다.
   *
  * @param year 년
  * @param month 월 (월은 값은 0부터 시작합니다. e.g., 0 = 1월.)
  * @param day 일
  */
  Date(year: number, month: number, day: number): Date;

  /** 
   * 입력된 값을 Date 형식으로 생성하여 반환합니다.
   *
  * @param year 년
  * @param month 월 (월은 값은 0부터 시작합니다. e.g., 0 = 1월.)
  * @param day 일
  * @param hour 시
  * @param minute 분
  * @param second 초
  */
  Date(year: number, month: number, day: number, hour: number, minute: number, second: number): Date;

  /** 
   * 입력한 날짜에 날짜 또는 시간 간격을 더한 Date 값을 반환합니다.
   *
  * @param interval 단위
  * @param addValue 변경할 값
  * @param date 날짜
  */
  DateAdd(interval: enDateInterval, addValue: number, date: Date): Date;

  /** 
   * 지정된 두 날짜 및 시간 사이의 날짜 및 시간 차이 값을 반환합니다.
   *
  * @param interval 단위
  * @param dateA 날짜 및 시간 A
  * @param dateB 날짜 및 시간 B
  */
  DateDiff(interval: enDateInterval, dateA: Date, dateB: Date): number;

  /** 
   * 날짜 및 시간 값 중 지정된 부분의 날짜 및 시간 데이터를 정수로 반환합니다.
   *
  * @param interval 단위
  * @param date 날짜 및 시간
  */
  DatePart(interval: enDateInterval, date: Date): number;

  /** 
   * 입력된 날짜 및 시간의 일 값을 반환합니다.
   *
  * @param date 날짜
  */
  Day(date: Date): number;

  /** 
   * 파일의 DRM을 해제 합니다.
DRM 해제를 위해서는 사전에 서버에 DRM 해제 모듈의 설치가 필요하며,
시스템 옵션에 "DRM_DECRYPT_URL"의 값이 설정되어야 합니다.
DRM_DECRYPT_URL은  서버에서 접속 가능한 주소로 설정해야 합니다. 
e.g. http://127.0.0.1:8080/webquery/un_drm.jsp
   *
   * @example
   * ```js
   * var fso = Matrix.getFileSystemObject();
   * var util = Matrix.getUtility(); 
   * var XLS_PATH = fso.PathCombine("_TEMP_", "USER_UPLOAD.xlsx");
   * 
   * //파일의 DRM을 해제 합니다.
   * //DRM 해제를 위해서는 사전에 서버에 DRM 해제 모듈의 설치가 필요하며,
   * //시스템 옵션에 "DRM_DECRYPT_URL"의 값이 설정되어야 합니다.
   * //DRM_DECRYPT_URL은  서버에서 접속 가능한 주소로 설정해야 합니다. 
   * //e.g. http://127.0.0.1:8080/webquery/un_drm.jsp
   * util.DecryptDRM(XLS_PATH);
   * 
   * var table = util.ReadExcelFile(XLS_PATH ,CALL_BACK(function(row){
   *                        if(row.getData("CODE")){
   * 					   		return true;//행을 테이블에 추가
   * 					   }
   * 					   return null;// : 다음 row 읽기
   *                   }));
   * ```
  * @param encryptedFilePath  DRM 해제할 파일의 경로
  */
  DecryptDRM(encryptedFilePath: string): void;

  /** 
   * 대상 문자열이 전달된 문자열로 종료하는지를 반환합니다.
   *
  * @param source 대상 문자열
  * @param suffix 종료문자열
  */
  EndWith(source: string, suffix: string): boolean;

  /** 
   * 대상 문자열이 전달된 문자열로 종료하는지를 반환합니다.(대/소문자 구별않함)
   *
  * @param source 대상 문자열
  * @param suffix 종료문자열
  */
  EndWithIgnoreCase(source: string, suffix: string): boolean;

  /** 
   * 입력된 날짜 및 시간의 시간 값을 반환합니다.
   *
  * @param date 날짜
  */
  Hour(date: Date): number;

  /** 
   * 대상 문자열에서 검색 시작 위치 이후의 검색어의 위치를 반환합니다.
   *
  * @param text 대상 문자열
  * @param find 검색어
  * @param fromIndex 검색 시작 위치
  */
  IndexOf(text: string, find: string, fromIndex: number): number;

  /** 
   * 대상 문자열에서 검색어의 위치를 반환합니다.
   *
  * @param text 대상 문자열
  * @param find 검색어
  */
  IndexOf(text: string, find: string): number;

  /** 
   * 대상 문자열이 Null이거나 빈 문자열인지를 반환합니다.
   *
  * @param text 대상 문자열
  */
  IsNullOrEmpty(text: string): boolean;

  /** 
   * 대상 문자열이 숫자 데이터로 변환 가능한지를 반환합니다.
   *
  * @param text 대상 문자열
  */
  IsNumericString(text: string): boolean;

  /** 
   * Json parsing
   *
  * @param json json text
  */
  JsonParse(json: string): any;

  /** 
   * javascript 를 json object로 변환하여 반환합니다.
   *
  * @param jsObject javascript object
  */
  JsonToString(jsObject: any): string;

  /** 
   * 문자열에서 마지막으로 나오는 부분 문자열을 반환합니다.
   *
  * @param text 대상 문자열
  * @param findText 찾을 문자열
  */
  LastIndexOf(text: string, findText: string): number;

  /** 
   * 대상 문자열의 좌측부터 지정한 길이만큼의 문자열을 반환합니다.
   *
  * @param text 대상 문자열
  * @param length 길이
  */
  Left(text: string, length: number): string;

  /** 
   * 대상 문자열의 길이를 반환 합니다.
   *
  * @param text 대상 문자열
  */
  Length(text: string): number;

  /** 
   * 문자열을 소문자로 변환해줍니다.
   *
  * @param source 대상 문자열
  */
  LowerCase(source: string): boolean;

  /** 
   * 입력된 2개의 값 중 큰 값을 반환합니다(입력값은 수치형 데이터만 허용합니다).
   *
  * @param valueA 입력값 A
  * @param valueB 입력값 B
  */
  Max(valueA: any, valueB: any): any;

  /** 
   * 입력된 2개의 값 중 작은 값을 반환합니다(입력값은 수치형 데이터만 허용합니다).
   *
  * @param valueA 입력값 A
  * @param valueB 입력값 B
  */
  Min(valueA: any, valueB: any): any;

  /** 
   * 입력된 날짜 및 시간의 분 값을 반환합니다.
   *
  * @param date 날짜
  */
  Minute(date: Date): number;

  /** 
   * 입력된 날짜 및 시간의 월의 값을 반환합니다.
   *
  * @param date 날짜
  */
  Month(date: Date): number;

  /** 
   * 현재 날짜 및 시간을 반환합니다.
   *
  */
  Now(): Date;

  /** 
   * PPT Slide 를 이미지 파일로 변환합니다. (이미지 확장자 : png)
   *
  * @param pptPath PPT 경로 (reports 아래 경로만 사용)
  * @param saveFolder 이미지 저장 폴더 명 (reports 아래 경로만 사용)
  */
  PptToImages(pptPath: string, saveFolder: string): string[];

  /** 
   * PPT Slide 를 이미지 파일로 변환합니다.
   *
  * @param pptPath PPT 경로 (reports 아래 경로만 사용)
  * @param saveFolder 이미지 저장 폴더 명 (reports 아래 경로만 사용)
  * @param imgExt 이미지 확장자
  */
  PptToImages(pptPath: string, saveFolder: string, imgExt: string): string[];

  /** 
   * XML 문서의 내용을 포멧팅해 줍니다.
   *
  * @param sourcePath 원본 파일의 경로
  * @param targetPath 저장할 대상 경로
  * @param attrNewLine Attribute 개행 여부
  */
  PrettyXML(sourcePath: string, targetPath: string, attrNewLine: boolean): void;

  /** 
   * CSV 형태 파일의 내용을 데이터 테이블 형태로 반환합니다.
대용량의 데이터를 실행하면 서버에서 메모리 점유 문제가 발생할 수 있으니
callback을 지원하는 함수를 사용하시기 바랍니다.
   *
  * @param path 엑셀 파일의 경로
  */
  ReadCSVFile(path: string): ScriptDataTable;

  /** 
   * CSV 형태 파일의 내용을 데이터 테이블 형태로 반환합니다.
   *
  * @param path 엑셀 파일의 경로
  * @param firstLineIsColumnHeader 첫 행이 컬럼명인지 여부
  * @param colSeparator 행 분리자(기본값:,)
  * @param rowSeparator 열 분리자(기본값:개행)
  * @param defColumns 컬럼의 데이터 타입을 정의합니다.(STR1;S|NUM1;N|STR2;S|NUM2;N)
  * @param callbackRow 파일의 Row 단위 데이터 반환 함수
  * ```
  * 
  *       CALL_BACK(function(row){
  *       //row == com.matrix.script.ScriptDataRow
  *       //return true : 해당 row 를 데이터 테이블에 추가
  *       //      false : 엑셀 파일 읽기 종료
  *       //       null : 다음 row 읽기
  * })
  * ```
  */
  ReadCSVFile(path: string, firstLineIsColumnHeader: boolean, colSeparator: string, rowSeparator: string, defColumns: string, callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * CSV 형태 파일의 내용을 데이터 테이블 형태로 반환합니다.
대용량의 데이터를 실행하면 서버에서 메모리 점유 문제가 발생할 수 있으니
callback을 지원하는 함수를 사용하시기 바랍니다.
   *
  * @param path 엑셀 파일의 경로
  * @param firstLineIsColumnHeader 첫 행이 컬럼명인지 여부
  * @param colSeparator 행 분리자(기본값:,)
  * @param rowSeparator 열 분리자(기본값:개행)
  * @param defColumns 컬럼의 데이터 타입을 정의합니다.(STR1;S|NUM1;N|STR2;S|NUM2;N)
  */
  ReadCSVFile(path: string, firstLineIsColumnHeader: boolean, colSeparator: string, rowSeparator: string, defColumns: string): ScriptDataTable;

  /** 
   * CSV 형태 파일의 내용을 데이터 테이블 형태로 반환합니다.
대용량의 데이터를 실행하면 서버에서 메모리 점유 문제가 발생할 수 있으니
callback을 지원하는 함수를 사용하시기 바랍니다.
   *
  * @param path 엑셀 파일의 경로
  * @param firstLineIsColumnHeader 첫 행이 컬럼명인지 여부
  * @param colSeparator 행 분리자(기본값:,)
  * @param rowSeparator 열 분리자(기본값:개행)
  * @param callbackRow 파일의 Row 단위 데이터 반환 함수
  * ```
  * 
  *       CALL_BACK(function(row){
  *       //row == com.matrix.script.ScriptDataRow
  *       //return true : 해당 row 를 데이터 테이블에 추가
  *       //      false : 엑셀 파일 읽기 종료
  *       //       null : 다음 row 읽기
  * })
  * ```
  */
  ReadCSVFile(path: string, firstLineIsColumnHeader: boolean, colSeparator: string, rowSeparator: string, callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * CSV 형태 파일의 내용을 데이터 테이블 형태로 반환합니다.
대용량의 데이터를 실행하면 서버에서 메모리 점유 문제가 발생할 수 있으니
callback을 지원하는 함수를 사용하시기 바랍니다.
   *
  * @param path 엑셀 파일의 경로
  * @param firstLineIsColumnHeader 첫 행이 컬럼명인지 여부
  * @param colSeparator 행 분리자(기본값:,)
  * @param rowSeparator 열 분리자(기본값:개행)
  */
  ReadCSVFile(path: string, firstLineIsColumnHeader: boolean, colSeparator: string, rowSeparator: string): ScriptDataTable;

  /** 
   * CSV 형태 파일의 내용을 데이터 테이블 형태로 반환합니다.
   *
  * @param path 엑셀 파일의 경로
  * @param callbackRow 파일의 Row 단위 데이터 반환 함수
  * ```
  * 
  *       CALL_BACK(function(row){
  *       //row == com.matrix.script.ScriptDataRow
  *       //return true : 해당 row 를 데이터 테이블에 추가
  *       //      false : 엑셀 파일 읽기 종료
  *       //       null : 다음 row 읽기
  * })
  * ```
  */
  ReadCSVFile(path: string, callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * 엑셀파일의 내용을 데이터 테이블 형태로 반환합니다.
대용량의 데이터를 실행하면 서버에서 메모리 점유 문제가 발생할 수 있으니
ReadExcelFile(path, callbackRow)을 사용하십시요.
   *
  * @param path 엑셀 파일의 경로
  */
  ReadExcelFile(path: string): ScriptDataTable;

  /** 
   * 엑셀파일의 내용을 데이터 테이블 형태로 반환합니다.
   *
  * @param path 엑셀 파일의 경로
  * @param defColumns 컬럼의 데이터 타입을 정의합니다.(STR1;S|NUM1;N|STR2;S|NUM2;N)
  * @param callbackRow 파일의 Row 단위 데이터 반환 함수
  * ```
  * 
  *       CALL_BACK(function(row){
  *       //row == com.matrix.script.ScriptDataRow
  *       //return true : 해당 row 를 데이터 테이블에 추가
  *       //      false : 엑셀 파일 읽기 종료
  *       //       null : 다음 row 읽기
  * })
  * ```
  */
  ReadExcelFile(path: string, defColumns: string, callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * 엑셀파일의 내용을 데이터 테이블 형태로 반환합니다.
대용량의 데이터를 실행하면 서버에서 메모리 점유 문제가 발생할 수 있으니
ReadExcelFile(path, defColumns, callbackRow)을 사용하십시요.
   *
  * @param path 엑셀 파일의 경로
  * @param defColumns 컬럼의 데이터 타입을 정의합니다.(STR1;S|NUM1;N|STR2;S|NUM2;N)
  */
  ReadExcelFile(path: string, defColumns: string): ScriptDataTable;

  /** 
   * 엑셀파일의 내용을 데이터 테이블 형태로 반환합니다.
   *
  * @param path 엑셀 파일의 경로
  * @param callbackRow 파일의 Row 단위 데이터 반환 함수
  * ```
  * 
  *       CALL_BACK(function(row){
  *       //row == com.matrix.script.ScriptDataRow
  *       //return true : 해당 row 를 데이터 테이블에 추가
  *       //      false : 엑셀 파일 읽기 종료
  *       //       null : 다음 row 읽기
  * })
  * ```
  */
  ReadExcelFile(path: string, callbackRow: (row: ScriptDataRow )=>boolean|null): ScriptDataTable;

  /** 
   * 엑셀파일의 내용을 데이터 테이블 형태로 반환합니다.
   *
   * @example
   * ```js
   * var util = Matrix.getUtility();
   * var fso  = Matrix.getFileSystemObject();
   * 
   * //엑셀의 특정 영역을 테이블 형태로 반환 합니다.
   * var path = fso.PathCombine(["_TEMP_", "uploaded.xlsx"]);
   * //Sheet1의 A1 셀을 기준으로 데이터가 없을 때 까지 레코드를 읽습니다.
   * // 특정 영역을 지정하고자 하면 'Sheet1'!C1:D3 와 같이 엑셀의 영역 주소를 입력 합니다.
   * var range = "Sheet1'!A1"; 
   * var options = ["ColumnHeader=false"];//컬럼명이 첫번째 줄에 포함되지 않은 경우 자동으로 컬럼명을 생성합니다.
   * var table = util.ReadExcelToDataTable(path ,range ,options ,CALL_BACK(function(row){
   *                                                //row == com.matrix.script.ScriptDataRow
   *                                                //return true : 해당 row 를 데이터 테이블에 추가
   *                                                //      false : 엑셀 파일 읽기 종료
   *                                                //       null : 다음 row 읽기
   *                                          }));
   * 										 
   * ```
  * @param path 엑셀 파일의 경로
  * @param range 엑셀 내 영역(e.g.'Sheet1'!C1 or 'Sheet1'!C1:D3)
  * @param options 옵션(key=value), e.g. ['ColumnHeader=false'] 헤더가 포함되지 않은 데이터
  * @param callbackRow 파일의 Row 단위 데이터 반환 함수
  * ```
  * 
  *       CALL_BACK(function(row){
  *       //row == com.matrix.script.ScriptDataRow
  *       //return true : 해당 row 를 데이터 테이블에 추가
  *       //      false : 엑셀 파일 읽기 종료
  *       //       null : 다음 row 읽기
  * })
  * ```
  */
  ReadExcelToDataTable(path: string, range: string, options: string[], callbackRow: Function): ScriptDataTable;

  /** 
   * R DataSet 파일을 읽어  데이터 셋 형태로 반환합니다.
   *
  * @param path F DataSet 파일의 경로
  */
  ReadRFile(path: string): ScriptDataSet;

  /** 
   * 텍스트 파일을 읽고 그 내용을 반환 합니다.
   *
  * @param path 파일의 경로
  */
  ReadTextFile(path: string): string;

  /** 
   * 기존 문자열을 지정된 다른 문자열로 바꾼 새 문자열을 반환합니다.
   *
  * @param text 대상 문자열
  * @param oldText 기존 문자열
  * @param newText 새로운 문자열
  */
  Replace(text: string, oldText: string, newText: string): string;

  /** 
   * 대상 문자열의 우측부터 지정한 길이만큼의 문자열을 반환합니다.
   *
  * @param text 대상 문자열
  * @param length 길이
  */
  Right(text: string, length: number): string;

  /** 
   * 입력된 날짜 및 시간의 초 값을 반환합니다.
   *
  * @param date 날짜
  */
  Second(date: Date): number;

  /** 
   * 메일 전송하기.
   *
  * @param smtpUrl SMTP 서버 주소
  * @param smtpPort SMTP 서버 포트
  * @param useSSL SSL 사용 여부
  * @param userName SMTP 연결 계정
  * @param passWord SMTP 연결 비밀번호
  * @param fromMail 메일 발송인 주소
  * @param toMails 메일 수신자 주소(여러 명일 경우 ,로 분리)
  * @param ccMails 메일 수신 참조자 주소(여러 명일 경우 ,로 분리)
  * @param bccMails 메일 수신 비밀 참조자 주소(여러 명일 경우 ,로 분리)
  * @param subject 메일 제목
  * @param content 메일 본문
  * @param params 메일 옵션
  * @param attachFiles 첨부 파일(eg. [path@name, path2@name2])
  */
  SendMail(smtpUrl: string, smtpPort: string, useSSL: boolean, userName: string, passWord: string, fromMail: string, toMails: string, ccMails: string, bccMails: string, subject: string, content: string, params: Array<any>, attachFiles: string[]): boolean;

  /** 
   * 메일 전송하기.
   *
  * @param smtpUrl SMTP 서버 주소
  * @param smtpPort SMTP 서버 포트
  * @param useSSL SSL 사용 여부
  * @param userName SMTP 연결 계정
  * @param passWord SMTP 연결 비밀번호
  * @param fromMail 메일 발송인 주소
  * @param toMails 메일 수신자 주소(여러 명일 경우 ,로 분리)
  * @param ccMails 메일 수신 참조자 주소(여러 명일 경우 ,로 분리)
  * @param bccMails 메일 수신 비밀 참조자 주소(여러 명일 경우 ,로 분리)
  * @param subject 메일 제목
  * @param content 메일 본문
  * @param params 메일 옵션
  * @param attachFiles 첨부 파일(eg. [path@name, path2@name2])
  * @param charset 메일 encoding 타입
  * @param messageHeaders Message headers
  * @param inlineImages InLine Images(eg. [id@base64text, id2@base64text2])
  * @param attachFileEncoding 첨부파일 명 encoding 타입
  */
  SendMail(smtpUrl: string, smtpPort: string, useSSL: boolean, userName: string, passWord: string, fromMail: string, toMails: string, ccMails: string, bccMails: string, subject: string, content: string, params: Array<any>, attachFiles: string[], charset: string, messageHeaders: string[], inlineImages: string[], attachFileEncoding: string): boolean;

  /** 
   * 메일 전송하기.
   *
  * @param smtpUrl SMTP 서버 주소
  * @param smtpPort SMTP 서버 포트
  * @param useSSL SSL 사용 여부
  * @param userName SMTP 연결 계정
  * @param passWord SMTP 연결 비밀번호
  * @param fromMail 메일 발송인 주소
  * @param toMails 메일 수신자 주소(여러 명일 경우 ,로 분리)
  * @param ccMails 메일 수신 참조자 주소(여러 명일 경우 ,로 분리)
  * @param bccMails 메일 수신 비밀 참조자 주소(여러 명일 경우 ,로 분리)
  * @param subject 메일 제목
  * @param content 메일 본문
  * @param params 메일 옵션
  * @param attachFiles 첨부 파일(eg. [path@name, path2@name2])
  * @param charset 메일 encoding 타입
  * @param messageHeaders Message headers
  * @param inlineImages InLine Images(eg. [id@base64text, id2@base64text2])
  */
  SendMail(smtpUrl: string, smtpPort: string, useSSL: boolean, userName: string, passWord: string, fromMail: string, toMails: string, ccMails: string, bccMails: string, subject: string, content: string, params: Array<any>, attachFiles: string[], charset: string, messageHeaders: string[], inlineImages: string[]): boolean;

  /** 
   * 별도의 프로세스에서 지정된 문자열 명령을 실행합니다.
   *
   * @example
   * ```js
   * var util = Matrix.getUtility();
   * var PATH_BAT = "D:\\TEST\\build.bat";
   * var command = [];
   * // WINDOW ----   
   * 	command[0] = "cmd";
   * 	command[1] = "/c";
   * 	command[2] = PATH_BAT; 
   * util.ShellExecute(command ,false);
   * // LINUX ====   
   * //util.ShellExecute("cp -i " +source + " " +  target,false);
   * ```
  * @param shellCommand 명령어
  * @param waitForExit 명령어 종료 대기 여부
  */
  ShellExecute(shellCommand: string, waitForExit: boolean): string;

  /** 
   * 별도의 프로세스에서 지정된 문자열 명령을 실행합니다.
   *
   * @example
   * ```js
   * var util = Matrix.getUtility();  
   * 
   * //파이썬 스크립트 실행 하기
   * var PYTHON_PATH = "C:\\Program Files (x86)\\Microsoft Visual Studio\\Shared\\Python37_64\\python.exe";
   * var SORUCE_PATH = "d:\\temp\\AA.py";
   * var command = [];
   * // WINDOW ----   
   * command[0] = "cmd";
   * command[1] = "/c";
   * command[2] = PYTHON_PATH;
   * command[3] = SORUCE_PATH;
   * util.ShellExecute(command ,false);
   * // LINUX ====   
   * //util.ShellExecute("cp -i " +source + " " +  target,false);
   * ```
  * @param cmdarray 명령어
  * @param waitForExit 명령어 종료 대기 여부
  */
  ShellExecute(cmdarray: string[], waitForExit: boolean): string;

  /** 
   * 대상 문자열을 구분자 기준으로 분리한 문자열 배열을 반환합니다.
   *
  * @param text 대상 문자열
  * @param splitter 구분자
  */
  Split(text: string, splitter: string): string[];

  /** 
   * 대상 문자열이 전달된 문자열로 시작하는지를 반환합니다.
   *
  * @param source 대상 문자열
  * @param prefix 시작 문자열
  */
  StartWith(source: string, prefix: string): boolean;

  /** 
   * 대상 문자열이 전달된 문자열로 시작하는지를 반환합니다.(대/소문자 구별않함)
   *
  * @param source 대상 문자열
  * @param prefix 시작 문자열
  */
  StartWithIgnoreCase(source: string, prefix: string): boolean;

  /** 
   * 두 개의 문자열이 일치하는지를 반환합니다.
   *
  * @param textA 비교 대상 1
  * @param textB 비교 대상 2
  */
  StringEquals(textA: string, textB: string): boolean;

  /** 
   * 두 개의 문자열이 대/소문자를 구분하지 않고 일치하는지를 반환합니다.
   *
  * @param textA 비교 대상 1
  * @param textB 비교 대상 2
  */
  StringEqualsIgnoreCase(textA: string, textB: string): boolean;

  /** 
   * 지정된 형식에 따라 개체의 값을 문자열로 변환하여 다른 문자열에 삽입 합니다.
   *
  * @param text 문자열
  * @param value1 값1
  * @param value2 값2
  * @param valueN 값 ... n
  */
  StringFormat(text: string, value1: any, value2: any, valueN: any): number;

  /** 
   * 문자열의 길이를 반환 합니다.
   *
  * @param text 대상 문자열
  */
  StringLength(text: string): number;

  /** 
   * 대상 문자열 중 특정 시작 위치부터 특정 종료 위치까지의 부분 문자열을 반환합니다.
   *
  * @param text 대상 문자열
  * @param startindex 시작 위치
  * @param endindex 종료 위치
  */
  SubString(text: string, startindex: number, endindex: number): string;

  /** 
   * 입력된 값을 bool 형식으로 변환하여 반환합니다.
   *
  * @param value 변환 대상
  */
  ToBoolean(value: any): boolean;

  /** 
   * 날짜 형식을 기준으로 변환 대상 값을 Date 형식으로 변환하여 반환합니다.
   *
  * @param value 변환 대상
  * @param format 날짜 형식
  */
  ToDate(value: any, format?: string): Date;

  /** 
   * 현재 날짜를 반환합니다.
   *
  */
  ToDay(): Date;

  /** 
   * 입력된 값을 double 형식으로 변환하여 반환합니다.
   *
  * @param value 변환 대상
  */
  ToDouble(value: any): number;

  /** 
   * 입력된 값을 double 형식으로 변환하여 반환합니다.
   *
  * @param value 변환 대상
  * @param defValue 변환 실패 시 대체할 값
  */
  ToDouble(value: any, defValue: number): number;

  /** 
   * 입력된 값을 int 형식으로 변환하여 반환합니다.
   *
  * @param value 변환 대상
  */
  ToInteger(value: any): number;

  /** 
   * 입력된 값을 int 형식으로 변환하여 반환합니다.
   *
  * @param value 변환 대상
  * @param defValue 변환 실패 시 대체할 값
  */
  ToInteger(value: any, defValue: number): number;

  /** 
   * 입력된 값을 특정 양식으로 변환한 문자열을 반환합니다.
   *
  * @param value 변환 대상
  * @param format 변환 양식
  */
  ToString(value: any, format: string): string;

  /** 
   * 대상 문자열의 좌우 공백을 제거한 문자열을 반환합니다.
   *
  * @param text 대상 문자열
  */
  Trim(text: string): string;

  /** 
   * 문자열을 대문자로 변환해줍니다.
   *
  * @param source 대상 문자열
  */
  UpperCase(source: string): boolean;

  /** 
   * 입력된 날짜 및 시간의 요일 값을 반환합니다.
   *
  * @param date 날짜
  */
  Weekday(date: Date): number;

  /** 
   * XML parsing 한  org.w3c.dom.Document 객체를 반환 합니다.
   *
   * @example
   * ```js
   * //XML Parse
   * //org.w3c.dom.Document 객체를 반환 합니다.
   * //https://www.w3.org/2003/01/dom2-javadoc/org/w3c/dom/Document.html
   * var xDoc = Matrix.XmlParse(xml);
   * var nodes = xDoc.getChildNodes();
   * var node = nodes.item(0); //
   * var child;
   * var nodeName;
   * nodes = node.getChildNodes();
   * for(var i=0, len=nodes.getLength(); i<len; i++){
   * 	node = nodes.item(i);
   * 	nodeName = node.getNodeName();
   * 	if("MetaDocumentInfo" == nodeName){
   * 		//메타 문서 정보
   * 	}else if("ConnectionInfo" == nodeName){
   * 		//데이터 베이스 연결 정보
   * 	}else if("DiagramInfo" == nodeName){
   * 		//Diagram info
   * 	}else if("MetaFieldInfo" == nodeName){
   * 		//meta field info
   * 		child = node.getFirstChild();
   * 		while(child != null){
   * 			if(child.getNodeType() == 4){//Document.CDATA_SECTION_NODE
   * 				metaInfoXml =  child.getData();
   * 				break;
   * 			}
   * 			child = child.getNextSibling();
   * 		}
   * 	}	 
   * }
   * ```
  * @param xml xml text
  */
  XmlParse(xml: string): any;

  /** 
   * 입력된 날짜 및 시간의 연도 값을 반환합니다.
   *
  * @param date 날짜
  */
  Year(date: Date): number;

  /** 
   * 현재 요청의 암호화 키값의 소스를 반환 합니다.
   *
  */
  getAESKey(): string;

  /** 
   * 주어진 문자열을 Base64 Decoding 한 문자열을 반환 합니다.
   *
  * @param text 문자열
  */
  getBase64DecodingString(text: string): string;

  /** 
   * 주어진 문자열을 Base64 Encoding 한 문자열을 반환 합니다.
   *
  * @param text 문자열
  */
  getBase64EncodingString(text: string): string;

  /** 
   * 이미지 파일을 base64로 변환한 문자열을 반환 합니다.
   *
  * @param filePath 이미지 파일 경로
  */
  getBase64TextFromImage(filePath: string): string;

  /** 
   * 암호화된 문자열을 복호화 합니다.
   *
  * @param encText 문자열
  */
  getDecrypt(encText: string): string;

  /** 
   * 암호화(AES-128)된 문자열을 복호화 합니다.
   *
  * @param encText 문자열
  * @param key Encryption Key
  */
  getDecryptAES(encText: string, key: string): string;

  /** 
   * 주어진 문자열을 Encoding 한 문자열을 반환 합니다.
   *
  * @param text 문자열
  * @param charsetName 문자셋 명(eg.8859-1)
  */
  getEncodingString(text: string, charsetName: string): string;

  /** 
   * 문자열을 암호화 합니다.
   *
  * @param fureText 문자열
  */
  getEncrypt(fureText: string): string;

  /** 
   * 문자열을 암호화(AES-128) 합니다.
   *
  * @param fureText 문자열
  * @param key Encryption Key
  */
  getEncryptAES(fureText: string, key: string): string;

  /** 
   * 엑셀 파일 전체 시트의 이름 목록을 반환 합니다.
   *
  * @param xlsPath Excel 파일 경로
  */
  getExcelWorkSheets(xlsPath: string): string[];

  /** 
   * 주어진 파일에  대한 MD5 해시 코드를 반환 합니다.
   *
  * @param filePath File path
  */
  getFileMD5Hash(filePath: string): string;

  /** 
   * 이미지 파일의 사이즈를 반환 합니다.
   *
  * @param filePath 이미지 파일 경로
  */
  getImageSize(filePath: string): Size;

  /** 
   * 서버 옵션 값을 반환 합니다.
   *
  * @param name 옵션 코드
  * @param defaultValue 기본 값
  */
  getServerOption(name: string, defaultValue: string): string;

  /** 
   * 주어진 문자열에 대한 MD5 해시 코드를 반환 합니다..
   *
  * @param text original text
  */
  getStringMD5Hash(text: string): string;

  /** 
   * Unique한 키 값을 생성합니다.
   *
  * @param head 머리글
  */
  getUniqueKey(head: string): string;

}
