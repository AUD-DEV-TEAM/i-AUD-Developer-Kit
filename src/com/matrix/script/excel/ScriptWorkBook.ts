import { ScriptWorkSheet } from "../../../../com/matrix/script/excel/ScriptWorkSheet";
import { ScriptCellStyle } from "../../../../com/matrix/script/excel/ScriptCellStyle";
import { enHorizontal } from "../../../../com/matrix/script/excel/enHorizontal";
import { enVertical } from "../../../../com/matrix/script/excel/enVertical";
import { ScriptName } from "../../../../com/matrix/script/excel/ScriptName";
import { ScriptBinderInfo } from "../../../../com/matrix/script/excel/ScriptBinderInfo";
import { ScriptDataSet } from "../../../../com/matrix/script/ScriptDataSet";
import { HTMLTableConverter } from "../../../../com/matrix/Excel/Convertor/HTMLTableConverter";
import { JsonTableConverter } from "../../../../com/matrix/Excel/Convertor/JsonTableConverter";
import { ScriptCellRange } from "../../../../com/matrix/script/excel/ScriptCellRange";
import { WorkSheetDataReader } from "../../../../com/matrix/script/excel/WorkSheetDataReader";
/**
* 엑셀의 WorkBook 모델을 제공합니다.
*/
export interface ScriptWorkBook{

  /** 
   * worsheet를 추가합니다.
   *
  * @param worksheet work sheet
  * @param name work sheet name
  */
  AddWorkSheet(worksheet: ScriptWorkSheet, name: string): ScriptWorkSheet;

  /** 
   * 엑셀 문서 내 모든 수식을 계산합니다.
   *
  * @param removeFormula 계산 후 모든 수식을 삭제합니다.
  * @param sheetNames 계산할 시트 이름 목록을 전달합니다.
  */
  Calculate(removeFormula: boolean, sheetNames: string[]): void;

  /** 
   * 엑셀 문서 내 모든 수식을 계산합니다.
   *
  * @param removeFormula 계산 후 모든 수식을 삭제합니다.
  */
  Calculate(removeFormula: boolean): void;

  /** 
   * 엑셀 문서 내 모든 수식을 계산합니다.
   *
  */
  Calculate(): void;

  /** 
   * 현재 엑셀에서 실행한 데이터 셋의 바인딩 영역을 모두 찾아서 해당 셀들의 값을 삭제합니다.
   *
   * @example
   * ```js
   * //////////////////////////////////////////
   * // MX GRID 파라미터를 변경해가면서 여러개의 PDF 파일 생성 후
   * // 생성된 PDF 파일 병합하기
   * //----------------------------------------------------
   * // CLIENT SCRIPT 호출
   * //----------------------------------------------------
   * // 	Matrix.RunScript("" ,"Service" ,function(p){
   * //                                	if(p.Success == false){
   * //                               		Matrix.Alert(p.Message);
   * //                               		return;
   * //                               	}
   * //                               	var  ds = p.DataSet;
   * //								Matrix.DownloadFile("_TEMP_" ,ds.FILE_NAME ,ds.FILE_NAME, true);
   * //                          });
   * //////////////////////////////////////////
   * var req = Matrix.getRequest(); 
   * var res = Matrix.getResponse();
   * var session  = Matrix.getSession();
   * var util = Matrix.getUtility();
   * var fso = Matrix.getFileSystemObject();
   * 
   * var params = req.getParam("VS_CODE").split(",");
   * //work book open
   * var wb = Matrix.OpenWorkBook(req.getReportCode() ,"2D5953A1900848B6A4050A3ADFBCC33E");
   * var PDF_FILES = [];
   * var pdfPath;
   * for(var i=0;i<params.length; i++){
   * 	//조회 조건 값 변경
   * 	req.setParam("VS_CODE" ,params[i]);
   * 	//기존 실행된 데이터 삭제
   * 	wb.ClearDataSet();
   * 	//데이터 실행
   * 	wb.ExecuteDataSet();
   * 	//수식 활성화 (파일 저장 시 자동으로 수식이 비활성화 됩니다.)
   * 	wb.DisableFormula(false); 
   * 	//수식 계산하기
   * 	wb.Calculate();
   * 	// PDF 저장
   * 	pdfPath = fso.getTemplatePath(util.getUniqueKey("PDF")+".pdf");
   * 	wb.SaveAsPDF(pdfPath ,"V1");
   * 	PDF_FILES.push(pdfPath);
   * }
   * 
   * 
   * pdfPath = util.getUniqueKey("PDF")+".pdf";
   * // PDF Merge
   * var PDFDocument = util.CreatePDFDocument();
   * PDFDocument.MergeFiles(PDF_FILES ,fso.getTemplatePath(pdfPath));
   * 
   * res.WriteResponseText(
   * 	JSON.stringify({"FILE_NAME": pdfPath})
   * );
   * ```
  */
  ClearDataSet(): void;

  /** 
   * 스타일을 생성합니다.
   *
  * @param fontStyle font style (eg.font-family:Tahoma;font-size:10;font-weight:bold;font-style:italic,underline;font-color:#000000;)
  * @param borderStyle border style (eg. border-left:solid,#000000;border-top:solid,#000000;border-right:solid,#000000;border-bottom:solid,#000000;border-DiagonalUp:solid,#000000;border-DiagonalDown:solid,#000000;)
  * @param fillStyle fill style (eg. #00FFFF)
  * @param format format (eg.#,##0.00)
  * @param horizonAlgn 가로 정렬
  * @param verticalAlgn 세로 정렬
  */
  CreateCellStyle(fontStyle: string, borderStyle: string, fillStyle: string, format: string, horizonAlgn: enHorizontal, verticalAlgn: enVertical): ScriptCellStyle;

  /** 
   * worsheet를 생성합니다.
   *
  * @param name worksheet 이름
  */
  CreateWorkSheet(name: string): ScriptWorkSheet;

  /** 
   * WorkBook 내 모든  worksheet의 셀 내 수식을 비활성화 상태를 설정합니다.
(비활성화 된 경우 수식이 동작하지 않습니다.)
   *
   * @example
   * ```js
   * //work book open
   * var wb = Matrix.OpenWorkBook(req.getReportCode() ,"2D5953A1900848B6A4050A3ADFBCC33E");
   * var PDF_FILES = [];
   * var pdfPath;
   * for(var i=0;i<params.length; i++){
   * 	//조회 조건 값 변경
   * 	req.setParam("VS_CODE" ,params[i]);
   * 	//기존 실행된 데이터 삭제
   * 	wb.ClearDataSet();
   * 	//데이터 실행
   * 	wb.ExecuteDataSet();
   * 	//수식 활성화 (파일 저장 시 자동으로 수식이 비활성화 됩니다.)
   * 	wb.DisableFormula(false); 
   * 	//수식 계산하기
   * 	wb.Calculate();
   * 	// PDF 저장
   * 	pdfPath = fso.getTemplatePath(util.getUniqueKey("PDF")+".pdf");
   * 	wb.SaveAsPDF(pdfPath ,"V1");
   * 	PDF_FILES.push(pdfPath);
   * }
   * ```
  * @param disable 비활성화 여부
  */
  DisableFormula(disable: boolean): void;

  /** 
   * 현재 엑셀 내 정의된 데이터 셋을 실행합니다.
   *
   * @example
   * ```js
   * //////////////////////////////////////////
   * // MX GRID 파라미터를 변경해가면서 여러개의 PDF 파일 생성 후
   * // 생성된 PDF 파일 병합하기
   * //----------------------------------------------------
   * // CLIENT SCRIPT 호출
   * //----------------------------------------------------
   * // 	Matrix.RunScript("" ,"Service" ,function(p){
   * //                                	if(p.Success == false){
   * //                               		Matrix.Alert(p.Message);
   * //                               		return;
   * //                               	}
   * //                               	var  ds = p.DataSet;
   * //								Matrix.DownloadFile("_TEMP_" ,ds.FILE_NAME ,ds.FILE_NAME, true);
   * //                          });
   * //////////////////////////////////////////
   * var req = Matrix.getRequest(); 
   * var res = Matrix.getResponse();
   * var session  = Matrix.getSession();
   * var util = Matrix.getUtility();
   * var fso = Matrix.getFileSystemObject();
   * 
   * var params = req.getParam("VS_CODE").split(",");
   * //work book open
   * var wb = Matrix.OpenWorkBook(req.getReportCode() ,"2D5953A1900848B6A4050A3ADFBCC33E");
   * var PDF_FILES = [];
   * var pdfPath;
   * for(var i=0;i<params.length; i++){
   * 	//조회 조건 값 변경
   * 	req.setParam("VS_CODE" ,params[i]);
   * 	//기존 실행된 데이터 삭제
   * 	wb.ClearDataSet();
   * 	//데이터 실행
   * 	wb.ExecuteDataSet();
   * 	//수식 활성화 (파일 저장 시 자동으로 수식이 비활성화 됩니다.)
   * 	wb.DisableFormula(false); 
   * 	//수식 계산하기
   * 	wb.Calculate();
   * 	// PDF 저장
   * 	pdfPath = fso.getTemplatePath(util.getUniqueKey("PDF")+".pdf");
   * 	wb.SaveAsPDF(pdfPath ,"V1");
   * 	PDF_FILES.push(pdfPath);
   * }
   * 
   * 
   * pdfPath = util.getUniqueKey("PDF")+".pdf";
   * // PDF Merge
   * var PDFDocument = util.CreatePDFDocument();
   * PDFDocument.MergeFiles(PDF_FILES ,fso.getTemplatePath(pdfPath));
   * 
   * res.WriteResponseText(
   * 	JSON.stringify({"FILE_NAME": pdfPath})
   * );
   * ```
  */
  ExecuteDataSet(): void;

  /** 
   * 여러개의 worksheet를 첫번째 시트에 통합하여 단일 시트로 만듭니다.
   *
  */
  MergeSheets(): void;

  /** 
   * worksheet 객체를 삭제합니다.
   *
  * @param key name or index
  */
  RemoveWorkSheet(key: string|number): void;

  /** 
   * 엑셀 파일을 생성합니다.
   *
  * @param path 저장 경로(reports 아래 경로만 사용)
  */
  Save(path: string): void;

  /** 
   * 엑셀 파일을 생성합니다.
   *
  * @param path 저장 경로(reports 아래 경로만 사용)
  * @param targetSheets 출력 대상 시트이름 목록
  */
  Save(path: string, targetSheets: string[]): void;

  /** 
   * 엑셀 파일을 생성합니다.
   *
  * @param path 저장 경로(reports 아래 경로만 사용)
  * @param targetSheets 출력 대상 시트명 (,로 분리 입력)
  */
  Save(path: string, targetSheets: string): void;

  /** 
   * HTM 파일을 생성합니다.
   *
  * @param path File path
  * @param targetsheets List of target sheet names(Enter with , separated)
  */
  SaveAsHML(path: string, targetsheets: string): void;

  /** 
   * 현재 엑셀을 아래한글(HWPX)로 변환합니다.
   *
  * @param path File path
  * @param targetsheets List of target sheet names
  */
  SaveAsHML(path: string, targetsheets: string[]): void;

  /** 
   * 현재 엑셀을 아래한글(HWPX)로 변환합니다.
   *
  * @param path File path
  * @param targetsheets List of target sheet names(Enter with , separated)
  */
  SaveAsHML(path: string, targetsheets: string): void;

  /** 
   * HTM 파일을 생성합니다.
   *
  * @param path File path
  * @param targetsheets List of target sheet names
  */
  SaveAsHML(path: string, targetsheets: string[]): void;

  /** 
   * MS-Word 파일을 생성합니다.
   *
  * @param path File path
  * @param targetsheets List of target sheet names(Enter with , separated)
  */
  SaveAsMSWord(path: string, targetsheets: string): void;

  /** 
   * MS-Word 파일을 생성합니다.
   *
  * @param path File path
  * @param targetsheets List of target sheet names
  */
  SaveAsMSWord(path: string, targetsheets: string[]): void;

  /** 
   * PDF 파일을 생성합니다.
   *
  * @param path File path
  * @param targetsheets List of target sheet names(Enter with , separated)
  */
  SaveAsPDF(path: string, targetsheets: string): void;

  /** 
   * PDF 파일을 생성합니다.
   *
  * @param path File path
  * @param targetsheets List of target sheet names
  */
  SaveAsPDF(path: string, targetsheets: string[]): void;

  /** 
   * 엑셀의 특정 Range 영역을 CSV 파일로 출력합니다.
   *
   * @example
   * ```js
   * var req = Matrix.getRequest();
   * var util = Matrix.getUtility();
   * var fso = Matrix.getFileSystemObject();
   * 
   * var wb = Matrix.OpenWorkBook(req.getReportCode() ,"I_MATRIX_CODE" , true);
   * wb.Calculate(true);
   * var path = fso.getTemplatePath(util.getUniqueKey("CSV")) + ".csv";
   * //V1 시트의 B2셀 부터 CSV로 출력합니다.
   * wb.SaveRangeToCSV(path,"V1!B2");
   * ```
  * @param outPath CSV 파일의 경로
  * @param range 엑셀 내 출력 시작 위치 또는 영역 (e.g. Sheet1!A1 , Sheet1!A1:Z256)
  */
  SaveRangeToCSV(outPath: string, range: string): void;

  /** 
   * @Deprecated
엑셀 파일을 생성합니다.(.xls파일 생성)
   *
  * @param path 저장 경로(reports 아래 경로만 사용)
   * @hidden
  */
  SaveXLS(path: string): void;

  /** 
   * @Deprecated
엑셀 파일을 생성합니다.(.xls파일 생성)
   *
  * @param path 저장 경로(reports 아래 경로만 사용)
  * @param targetSheets 출력 대상 시트명 (,로 분리 입력)
   * @hidden
  */
  SaveXLS(path: string, targetSheets: string): void;

  /** 
   * 현재 엑셀 모델의 수식 참조 관계를 업데이트합니다.
   *
  */
  UpdateFormulaReference(): void;

  /** 
   * worsheet의 수량을 반환합니다.
   *
  */
  WorkSheetCount(): number;

  /** 
   * 현재 엑셀 모델을 MX-GRID 템플릿 파일로 저장합니다.
   *
  * @param filePath 파일 경로
  */
  WriteTemplate(filePath?: string): void;

  /** 
   * 엑셀의 이름정의 영역을 추가합니다.
   *
  * @param name 이름
  * @param workSheetName 대상 시트명
  * @param rangeArea 영역명(e.g. A1:B1) 또는 영역에 대한 수식 (=OFFSET('T1'!$A$1, 0, 0, COUNTA('T1'!$A:$A), 17))
  */
  addName(name: string, workSheetName: string, rangeArea: string): ScriptName;

  /** 
   * 엑셀 파일의 활성화된 시트를 반환합니다.
   *
  */
  getActiveSheet(): ScriptWorkSheet;

  /** 
   * MX-Grid의 데이터셋이 실행된 영역 정보를 반환합니다.
   *
  * @param name MX-Grid의 데이터셋 이름
  */
  getDataBindingRange(name: string): ScriptBinderInfo;

  /** 
   * 데이터 셋 객체.
   *
  */
  getDataSet(): ScriptDataSet;

  /** 
   * HTML Table형태로 출력하는 객체 생성
   *
  */
  getHtmlTableConverter(): HTMLTableConverter;

  /** 
   *  내보내기 시 전체 시트를 내보내기 하는지 여부를 반환합니다.
   *
  */
  getIsAllSheetExport(): boolean;

  /** 
   * 디자인 모드로 동작하는지 여부를 반환합니다.
   *
  */
  getIsDesignMode(): boolean;

  /** 
   * json 출력을 지원하는 객체를 생성합니다.
   *
  */
  getJsonConverter(): JsonTableConverter;

  /** 
   * 엑셀의 이름 정의 정보를 반환합니다.
   *
  * @param name 이름정의 명
  */
  getName(name: string): ScriptName;

  /** 
   * 엑셀 파일의 이름 정의 목록을 제공합니다.
   *
  */
  getNameList(): string[];

  /** 
   * 엑셀 이름정의 또는 셀주소로 셀 정보를 반환합니다.
(이름정의 객체는 단일셀을 참조해야 합니다.
셀 이름은 시트명을 포함해야 합니다.)
   *
  * @param name 엑셀 이름정의 명
  */
  getNameRange(name: string): ScriptCellRange;

  /** 
   * 엑셀 이름정의 또는 셀의 텍스트를 반환합니다.
(이름정의 객체는 단일셀을 참조해야 합니다.
셀 이름은 시트명을 포함해야 합니다.)
   *
  * @param name 엑셀 이름정의 명
  */
  getNameRangeText(name: string): string;

  /** 
   * 엑셀 이름정의 또는 셀의 값을 반환합니다.
(이름정의 객체는 단일셀을 참조해야 합니다.
셀 이름은 시트명을 포함해야 합니다.)
   *
  * @param name 엑셀 이름정의 명
  */
  getNameRangeValue(name: string): any;

  /** 
   * 엑셀 저장 시 시트명의 예약 헤더 문자 "V_"를 자동 제거하는 옵션의 활성화 여부를 반환합니다.
   *
  */
  getUseExportSheetName(): boolean;

  /** 
   * 이름 또는 순번에 해당하는 시트를 반환합니다.
   *
  * @param key 이름 또는 Index
  */
  getWorkSheet(key: string|number): ScriptWorkSheet;

  /** 
   * 엑셀 내 특정 영역을 순차적으로 읽기 위한 객체를 반환합니다.
   *
   * @example
   * ```js
   * var req = Matrix.getRequest(); 
   * // mx-grid 실행 및 계산
   * var wb = Matrix.OpenWorkBook(req.getReportCode() ,"I_MATRIX_CODE" , true);
   * wb.Calculate(true);
   * // 특정 영역을 읽기 위한 reader 반환
   * // 영역의 위치는 시작 영역의 주소 또는 읽고자 하는 영역을 지정할 수 있습니다.
   * // 영역의 위치는 이름정의를 사용할 수도 있습니다.
   * var reader = wb.getWorkSheetDataReader("V1!B2");
   * var table = reader.ReadSchema();
   * while(reader.hasNext()){
   * 	var row = reader.next();
   * 		
   * }
   * ```
  * @param targetRange 데이터의 시작셀(또는 범위) 주소
  */
  getWorkSheetDataReader(targetRange: string): WorkSheetDataReader;

  /** 
   * 엑셀의 이름정의를 삭제합니다.
   *
  * @param name  삭제할 시트명
  */
  removeName(name: string): void;

  /** 
   * 내보내기 시 모든 시트를 내보내기 할 지 여부를 설정합니다.
모든 시트를 내보내기 할 경우 수식을 포함하여 내보내기가 됩니다.
   *
  * @param value 값
  */
  setIsAllSheetExport(value: boolean): void;

  /** 
   * 디자인 모드로 동작할지 여부를 설정합니다.
디자인 모드는 클라이언트로 출력 시 디자인에 필요한 모든 정보를 출력합니다.
   *
  * @param value 콜백 함수
  */
  setIsDesignMode(value: boolean): void;

  /** 
   * 엑셀 이름정의 또는 셀의 값을 수정합니다.
(이름정의 객체는 단일셀을 참조해야 합니다.
셀 이름은 시트명을 포함해야 합니다.)
   *
   * @example
   * ```js
   * ///// PDF 만들기
   * 	var makePDF = function(datas, pdfPath){
   * 		var path = fso.PathCombine(["iGRID_DESIGN", req.getReportCode(),  VS_MX_GRID_CODE]) + ".json2";
   * 		var wb = Matrix.CreateWorkBookByJson(path);
   * 		wb.ExecuteDataSet();
   * 		for(var i=0;i<datas.length; i++){
   * 			wb.setNameRangeValue(datas[i].Name, datas[i].Value);
   * 		}
   * 		//wb.Calculate(true);	
   * 		wb.SaveAsPDF(pdfPath, ["V1"]);
   * 		
   * 		//중간 중간 실행 취소를 점검 합니다.
   * 		Matrix.CheckCancel(true);
   * 		Matrix.WriteLog("PDF 개별 생성 " +  pdfPath);
   * 	}
   * ```
  * @param name 엑셀 이름정의 명
  * @param value 수정 값
  */
  setNameRangeValue(name: string, value: any): void;

  /** 
   * 엑셀 저장 시 시트명의 예약 헤더 문자 "V_"를 자동 제거하는 옵션의 활성화 여부를 설정합니다.
   *
  * @param updated 옵션 사용 여부
  */
  setUseExportSheetName(updated: boolean): void;

}
