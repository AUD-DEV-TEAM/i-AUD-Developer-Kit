import { enQueryParamType } from "../../aud/enums/comm/enQueryParamType";
import { Style } from "../../aud/drawing/Style";
import { ContextMenu } from "../../aud/control/ContextMenu";
import { DataSet } from "../../aud/data/DataSet";
import { Control } from "../../aud/control/Control";
import { enScriptControlType } from "../../aud/enums/comm/enScriptControlType";
import { Splitter } from "../../aud/util/Splitter";
import { OlapGrid } from "../../aud/control/OlapGrid";
import { enExportType } from "../../aud/enums/comm/enExportType";
import { BoxStyleList } from "../../aud/drawing/BoxStyleList";
import { enBrowserType } from "../../aud/enums/comm/enBrowserType";
import { ScriptDateUtil } from "../../aud/util/ScriptDateUtil";
import { Form } from "../../aud/control/Form";
import { GlobalConfig } from "../../aud/data/GlobalConfig";
import { GlobalParam } from "../../aud/common/GlobalParam";
import { MetaWizardManager } from "../../aud/meta/MetaWizardManager";
import { ReportInfo } from "../../aud/common/ReportInfo";
import { MetaDataSource } from "../../aud/meta/MetaDataSource";
import { UserInfo } from "../../aud/common/UserInfo";
import { Variable } from "../../aud/data/Variable";
import { DialogBox } from "../../aud/control/DialogBox";
import { FormDialog } from "../../aud/common/FormDialog";
import { Label } from "../../aud/control/Label";
import { BoxStyle } from "../../aud/drawing/BoxStyle";
import { DataSource } from "../../aud/data/DataSource";
import { FormatConverter } from "../../aud/util/FormatConverter";
import { StringUtility } from "../../aud/util/StringUtility";
import { enViewerMode } from "../../aud/enums/comm/enViewerMode";
import { AddIn } from "../../aud/control/AddIn";
import { Button } from "../../aud/control/Button";
import { CalendarFromTo } from "../../aud/control/CalendarFromTo";
import { Calendar } from "../../aud/control/Calendar";
import { CalendarWeeklyFromTo } from "../../aud/control/CalendarWeeklyFromTo";
import { CalendarWeekly } from "../../aud/control/CalendarWeekly";
import { CalendarYMFromTo } from "../../aud/control/CalendarYMFromTo";
import { CalendarYM } from "../../aud/control/CalendarYM";
import { CalendarYearFromTo } from "../../aud/control/CalendarYearFromTo";
import { CalendarYear } from "../../aud/control/CalendarYear";
import { Grid } from "../../aud/control/Grid";
import { DataGridRow } from "../../aud/control/grids/DataGridRow";
import { DataGridCell } from "../../aud/control/grids/DataGridCell";
import { DataGridColumn } from "../../aud/control/grids/DataGridColumn";
import { Chart } from "../../aud/control/Chart";
import { CheckBox } from "../../aud/control/CheckBox";
import { ColorPicker } from "../../aud/control/ColorPicker";
import { Color } from "../../aud/drawing/Color";
import { TableRow } from "../../aud/control/table/TableRow";
import { TableCell } from "../../aud/control/table/TableCell";
import { TableColumn } from "../../aud/control/table/TableColumn";
import { ComboBox } from "../../aud/control/ComboBox";
import { DataRow } from "../../aud/data/DataRow";
import { HighChart_C } from "../../aud/control/HighChart_C";
import { DataTable } from "../../aud/data/DataTable";
import { FileUploadButton } from "../../aud/control/FileUploadButton";
import { MetaItem } from "../../aud/meta/MetaItem";
import { MultiHeaderCell } from "../../aud/control/grids/MultiHeaderCell";
import { Image } from "../../aud/control/Image";
import { MaskTextBox } from "../../aud/control/MaskTextBox";
import { Event } from "../../aud/data/Event";
import { MultiComboBox } from "../../aud/control/MultiComboBox";
import { TreeComboNode } from "../../aud/control/TreeComboNode";
import { Tree } from "../../aud/control/Tree";
import { MTXTreeNode } from "../../aud/control/matrixTree/MTXTreeNode";
import { NumberBox } from "../../aud/control/NumberBox";
import { ScriptDataCell } from "../../aud/control/olap/ScriptDataCell";
import { enOlapExportsType } from "../../aud/enums/olap/enOlapExportsType";
import { ScriptHeaderCell } from "../../aud/control/olap/ScriptHeaderCell";
import { IMultiHeaderCell } from "../../aud/control/olap/IMultiHeaderCell";
import { ScriptSelection } from "../../aud/control/olap/ScriptSelection";
import { PickList } from "../../aud/control/PickList";
import { RadioButton } from "../../aud/control/RadioButton";
import { RichTextBox } from "../../aud/control/RichTextBox";
import { Slider } from "../../aud/control/Slider";
import { Tab } from "../../aud/control/Tab";
import { TextBox } from "../../aud/control/TextBox";
import { enTreeCellArea } from "../../aud/enums/comm/enTreeCellArea";
import { iGrid } from "../../aud/control/iGrid";
import { Cell } from "../../aud/control/igrids/Cell";
/**
* 뷰어 객체입니다.
*/
export interface Matrix{

  /**
   * 활성 폼의 이름
  */
   readonly ActiveFormName: string;

  /**
   * 현재 사용자의 계정
  */
   readonly UserCode: string;

  /** 
   * 컨텍스트 메뉴에 사용자 정의 컨텍스트 메뉴 아이템을 추가합니다.
   *
  * @param menuitem 컨텍스트 메뉴에 추가할 사용자 정의 컨텍스트 메뉴 아이템
  */
  AddContextMenu(menuitem: any): void;

  /** 
   * 컨텍스트 메뉴에 라인을 추가합니다.
   *
  */
  AddContextMenuLine(): void;

  /** 
   * 전역 쿼리 파라미터 값 객체를 추가합니다.
   *
  * @param name 파라미터 명
  * @param value 파라미터의 값
  * @param type 데이터 타입
  */
  AddGlobalParams(name: string, value: string, type: enQueryParamType): void;

  /** 
   * 사용자에게 브라우저 경고 대화 상자를 보여줍니다.
   *
   * @example
   * ```js
   * // 알림창
   * Matrix.Alert("Test");
   * ```
  * @param msg 메시지
  */
  Alert(msg: string): void;

  /** 
   * 여러개의 컨트롤들의 스타일 및 사이즈를 수정하기 전 성능 향상을 위해
일괄 업데이트 하도록 유도 합니다.
모든 작업이 끝난 후 Matrix.EndUpdate()를 호출 해서 실제 화면을 업데이트 합니다.
   *
  */
  BeginUpdate(): void;

  /** 
   * 외부에 정의된 메소드를 호출합니다.
   *
  * @param name 호출하고자 하는 메소드의 이름
  * @param valuelist [ {"KEY":"parameter name", "VALUE":"값"},{...} ]
  */
  CallExtentionFunc(name: string, valuelist: any): void;

  /** 
   * RestAPI를 호출합니다.
   *
  * @param url RestAPI 주소
  * @param req RestAPI에 전달할 파라미터
  * @param callback RestAPI 실행 결과를 전달받을 callback 함수
  */
  CallRestAPI(url: string, req: any, callback: (p: {"Success":boolean, "Message":string, "Result":any}) => void): void;

  /** 
   * 화면상의 모든 대화상자를 삭제 합니다.
   *
  */
  Clear(): void;

  /** 
   * 사용자 정의 컨텍스트 메뉴를 초기화 합니다.
   *
  */
  ClearContextMenu(): void;

  /** 
   * 컨트롤의 데이터셋을 삭제합니다.
   *
  * @param names 대상 컨트롤 목록(string 타입으로 입력하는 경우 컴마(,)로 분리하여 입력, *.* 로 모든 컨트롤 선택가능, Form이름.* 로 특정 Form의 전체 컨트롤 선택가능)
  */
  ClearDataSet(names: string|string[]): void;

  /** 
   * 전역 쿼리 파라미터 값 객체의 목록을 삭제합니다.
   *
  */
  ClearGlobalParams(): void;

  /** 
   * 사용자에게 확인 대화 상자를 보여줍니다
   *
  * @param msg 메시지
  * @param title 제목
  * @param callback 확인 버튼 클릭 후 callback 실행 Func.
  * ```
  * 
  *               function(ok){
  *                  if(ok){ // click ok or yes
  *                    // do something ...
  *                   
  *                 }
  *               }
  * ```
  * @param buttonType 버튼 유형(0:예/아니오, 1:확인/취소), 값이 없거나 전달하지 않을 경우 기본 유형으로 설정.
  */
  Confirm(msg: string, title: string, callback: (ok: boolean) => void, buttonType: number): void;

  /** 
   * 사용자에게 확인 대화 상자를 보여줍니다.
close 동작 시에 callback 으로 null 을 전달합니다.
   *
   * @example
   * ```js
   * Matrix.ConfirmWithClose(msg, title, function (ok) {
   * 	var text = '';
   * 	if (ok === true) {
   * 		text = 'ok';
   * 	} else if (ok === false) {
   * 		text = 'no';
   * 	} else if (ok === null) {
   * 		text = '️close';
   * 	}
   * 	TextBox.Text = text;
   * }, 0);
   * ```
  * @param msg 메시지
  * @param title 제목
  * @param callback 확인(예)/취소(아니오)/닫기(Esc) 후 callback 실행 Function
  * ```
  * function (ok) {
  * 	if (ok === true) {
  * 		// '예' 또는 '확인' 버튼이 클릭된 경우의 동작
  * 	} else if (ok === false) {
  * 		// '아니오' 또는 '취소' 버튼이 클릭된 경우의 동작
  * 	} else if (ok === null) {
  * 		// 창이 '닫기' 버튼 또는 'Esc' 키로 닫힌 경우의 동작
  * 	}
  * }
  * ```
  * @param buttonType 버튼 유형
0: 예/아니오(기본값)
1: 확인/취소
값이 없거나 전달하지 않을 경우 기본값으로 설정
  */
  ConfirmWithClose(msg: string, title: string, callback: Function, buttonType: number): void;

  /** 
   * Style 객체를 BackColor 객체로 변환합니다.
   *
  * @param style style 객체
   * @hidden
  */
  ConvertToBackColor(style?: Style): any;

  /** 
   * CodeMirror를 사용하는 함수 재품 내부에서 사용
   *
  * @param richTextBoxName 
  * @param callback 
  * @param mode 
   * @hidden
  */
  CreateCodeMirror(richTextBoxName: string, callback: Function, mode: string | object): void;

  /** 
   * 새로운 사용자 정의 컨텍스트 메뉴의 하위 아이템을 생성합니다.
   *
  * @param parentId 부모 컨텍스트 메뉴 아이템의 ID
  * @param name 생성할 컨텍스트 메뉴 아이템의 캡션명
  * @param callbackFunc 컨텍스트 메뉴 아이템을 클릭시 작동하는 콜백 함수
  * ```
  * 
  * function(){
  * }
  * ```
  */
  CreateContextMenuChildItem(parentId: string, name: string, callbackFunc: Function): ContextMenu;

  /** 
   * 새로운 사용자 정의 컨텍스트 메뉴 아이템을 생성합니다.
   *
  * @param name 생성할 컨텍스트 메뉴 아이템의 캡션명
  * @param callbackFunc 컨텍스트 메뉴 아이템을 클릭시 작동하는 콜백 함수
  * ```
  * 
  * function(){
  * }
  * ```
  */
  CreateContextMenuItem(name: string, callbackFunc: Function): ContextMenu;

  /** 
   * 데이터 셋을 생성합니다.
   *
   * @example
   * ```js
   *        //----------- 단일 컬럼 샘플
   *         var columns = ["CODE"];
   *         var rows = ["Hair","Thin","Dotted","DashDotDot","DashDot","Dashed","MediumDashDotDot","SlantDashDot"
   *                     ,"Medium","MediumDashDot","MediumDashed","Double","Thick"];
   *         var ds  = Matrix.CreateDataSet("T1", columns, rows);         
   *         Matrix.getObject("comboBox").SetDataSet(ds);
   *         
   *         //----------- 다중 컬럼 샘플        
   *         var columns = ["CODE", "NAME"];
   *         var rows    = [["Kr","Korea"], ["En","USA"],["Ca","Canada"]];
   *         var ds  = Matrix.CreateDataSet("T1", columns, rows);
   *         Matrix.getObject("comboBox").SetDataSet(ds);
   * ```
  * @param tableName 테이블 이름 (생략 가능)
  * @param columns 컬럼이름 목록
  * @param rows Row 데이터 (컬럼 수에 따라 1차원 배열 또는 2차원 배열 사용 가능)
  */
  CreateDataSet(tableName?: string, columns?: string[], rows?: Array<any>|Array<Array<any>>): DataSet;

  /** 
   * 컨트롤을 생성합니다.
   *
  * @param type 컨트롤 타입
  * @param controlName 컨트롤 이름
  */
  CreateObject(type: enScriptControlType, controlName?: string): Control;

  /** 
   * Splitter를 생성하는 함수
   *
  * @param direction 
  * @param firstControlName 
  * @param secondControlName 
  * @param splitterControlNames 
  * @param option 
   * @hidden
  */
  CreateSplitter(direction: string, firstControlName: string, secondControlName: string, splitterControlNames: string | Array<string>, option?: any): any;

  /** 
   * Splitter를 생성하는 함수2 제품 내부에서 사용
   *
  * @param splitterType Splitter의 방향 ( Row or Col 중 선택)
  * @param leftControls 좌측에 배치할 컨트롤 목록
  * @param rightControls 우측에 배치할 컨트롤 목록
  * @param splitterControl Splitter를 수행할 컨트롤
  * @param option 옵션
   * @hidden
  */
  CreateSplitterEx(splitterType: string, leftControls: string[], rightControls: string[], splitterControl: string, option?: any): Splitter;

  /** 
   * portal 에서 다른 보고서를 탭 형식으로 열 수 있도록 하는 함수입니다. 
두 번째 파라미터의 값이 true로 전달되면 기존에 열려 있는 탭을 재사용하고, 
false로 전달되면 새로운 탭에서 보고서를 열게 됩니다.
   *
   * @example
   * ```js
   * button.OnClick = function(s, e){
   * 	Matrix.CustomReportOpen(report_code, false);	// 새 탭으로 연다
   * };
   * ```
  * @param reportCode 보고서 코드
  * @param isRecycle 현재 탭 재사용 여부
  */
  CustomReportOpen(reportCode: string, isRecycle: boolean): void;

  /** 
   * Matrix Trace에 디버깅 메시지를 출력합니다.
   *
  * @param id 구분자
  * @param msg 메시지
  */
  DebugWrite(id: string, msg: any): void;

  /** 
   * 파일 다운로드
   *
  * @param path 다운로드 파일 경로
  * @param fileName 다운로드 파일명
  * @param newFileName 새로운 파일명
  * @param isDelete 파일 삭제 여부
  */
  DownloadFile(path: string, fileName: string, newFileName: string, isDelete: boolean): void;

  /** 
   * OlapGrid의 DrillToDetail 정보를 대상 컨트롤에 전달하여 조회한다.
   *
  * @param sender OlapGrid
  * @param xml DrillToDetail 정보
  * @param DataGridName 대상 DataGrid 명
  * @param KeepOlapGridLayout OlapGrid의 Layout을 유지할지 여부
  */
  DrillToDetail(sender: OlapGrid, xml: string, DataGridName: string, KeepOlapGridLayout: boolean): void;

  /** 
   * 일괄 업데이트 작업을 종료 하고 현재 화면의 컨트롤들을 업데이트 합니다.
   *
  */
  EndUpdate(): void;

  /** 
   * 사용자에게 에러 대화 상자를 보여줍니다
   *
  * @param msg 메시지
  * @param detail 오류 상세 메세지
  */
  Error(msg: string, detail: string): void;

  /** 
   * 데이터 엑셀 내보내기 서비스를 호출합니다.(처리 완료 후 OnServiceCallBack 이벤트가 발생합니다.)
   *
  * @param json 데이터 엑셀 내보내기 JSON 객체
  * @param params parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param tag 구분자(tag)
   * @hidden
  */
  ExcelExportServiceCall(json: any, params: Array<{"Key":string,"Value":string}>, tag: any): void;

  /** 
   * 데이터 엑셀 내보내기 서비스를 호출합니다.
   *
   * @example
   * ```js
   * var grid_name = "DataGrid"; //내보내기 대상 컨트롤 이름.
   * var WORKBOOK = {
   *          "FontName": "맑은 고딕",
   *          "FontSize": 11,
   *          "WorkSheets": [
   *              {
   *                  "Name": grid_name,
   *                  "DisplayGridlines": "false",
   *                  "Ranges": [
   *                      {
   *                          "Range": "A1", "Value": "■ Report Name : " + Matrix.GetReportInfo().NAME,
   *                          "ColSpan": 5
   *                      },
   *                      {
   *                          "Range": "A2", "Value": "■ Printer : " + Matrix.GetUserInfo().UserName,
   *                          "ColSpan": 5
   *                      },
   *                      {
   *                          "Range": "A3", "Value": "■ Print Time : " + Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss"),
   *                          "ColSpan": 5
   *                      }
   *                  ],
   *                  "Controls": [
   *                      { "Name": grid_name, "Range": "A5" }
   *                  ]
   *              }
   *          ]
   *      }; 
   * 
   *     var EXPORT_NAME =  Matrix.GetReportInfo().NAME
   *             + "_" +Matrix.GetDateTime().ToString("yyyy-MM-dd_HHmmss")
   *             + ".xlsx";
   *                     
   *     Matrix.ExcelExportServiceCall(WORKBOOK, null, function (e) {
   *         if (e.Success == false) {
   *             alert("export fail" + e.Message);
   *             return;
   *         }
   *         // download file
   *         var row = e.DataSet.GetTable(0).GetRow(0);
   *         var folderName = row.GetValue("FolderName");
   *         var fileName = row.GetValue("FileName");
   *         Matrix.DownloadFile(folderName, fileName, EXPORT_NAME, true);
   *         
   *     });
   * ```
  * @param json 데이터 엑셀 내보내기 JSON 객체
  * @param params parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param callBack CallBack함수
  * ```
  * 
  * function(e){
  * 	if(e.Success == false){
  * 		alert("export fail" + e.Message);
  * 		return;
  * 	}
  * 
  * 	// download file
  * 	var row = e.DataSet.GetTable(0).GetRow(0);
  * 	var folderName = row.GetValue("FolderName");
  * 	var fileName = row.GetValue("FileName");
  * 	var nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
  * 	var newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".xlsx";
  * 
  * 	Matrix.DownloadFile(folderName + "/" ,fileName ,newFileName ,true);
  * 
  * }
  * ```
  */
  ExcelExportServiceCall(json: any, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 데이터소스를 실행 합니다.(처리 완료 후 OnExecutCompleted 이벤트가 발생합니다.)
   *
  * @param dataSourceName 데이터 소스명
  * @param tag 구분자(tag)
   * @hidden
  */
  Execute(dataSourceName: string, tag: string): void;

  /** 
   * 데이터소스를 실행 합니다.(처리 완료 후 OnExecutCompleted 이벤트가 발생합니다.)
   *
  * @param dataSourceName 데이터 소스명
  * @param callBack callback 함수
  * ```
  *  
  * function(p){
  *   if(p.Success == false){
  * 		Matrix.Alert(p.Message);
  * 		return;
  * 	}
  * 	var  ds = p.DataSet;
  * 	var  dt = p.DataTable;	
  *  }	
  * ```
  */
  Execute(dataSourceName: string, callBack: Function): void;

  /** 
   * Prompt 조회조건이 있는 경우 MetaViewer Prompt 팝업창을 호출하고 없으면 조회합니다.
   *
  */
  ExecuteMetaViewPrompt(): void;

  /** 
   * 데이터소스를 실행 합니다.(처리 완료 후 OnExecutCompleted 이벤트가 발생합니다.)
   *
  * @param planName 실행 계획 명
  * @param option 옵션(예약)
  * @param callBack CallBack함수
  * ```
  * 
  * function(p){
  *  	if(p.Success == false){
  * 		Matrix.Alert(p.Message);
  * 		return;
  * 	}
  * 	var  ds = p.DataSet;
  * 	// do something...
  * }
  * ```
  */
  ExecutePlan(planName: string, option: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 데이터소스를 실행 합니다.(처리 완료 후 OnExecutCompleted 이벤트가 발생합니다.)
   *
  * @param planName 실행 계획 명
  * @param option 옵션(예약)
  * @param tag 구분자(tag)
   * @hidden
  */
  ExecutePlan(planName: string, option: Array<{"Key":string,"Value":string}>, tag: any): void;

  /** 
   * 이미지 내보내기를 실행합니다.
   *
   * @example
   * ```js
   * Matrix.getObject('Button').OnClick = function(s, e){
   * 
   *     var exportControl = ['Chart'];
   *     var exportType = 6  // image
   *     var callbackFunc = function(){
   *         Matrix.Information('이미지 내보내기가 완료되었습니다.', '이미지 내보내기 완료');
   *     }
   * 
   * 	Matrix.ExportImageEx(exportControl, exportType, {
   *         'fileName' : Matrix.GetReportInfo().NAME,   // file 명
   *         'useDocHeaderTitle': false,                 // 문서 타이틀 사용 여부
   *         'useProgressBar': true,                     // ProgressBar 사용 여부
   *         'callbackFunc' : callbackFunc               // Callback 함수
   *     });
   * };
   * ```
  * @param controlNames 내보내기 할 컨트롤 객체 이름 목록([] : All Controls)
  * @param exportType 내보내기 할 파일 유형(2: Excel, 3:HML, 4:PPT, 5:DOC, 6:PNG(Default), 7:PDF)
  * @param option {'fileName' : [File 명], 'useDocHeaderTitle' : [문서 타이틀 사용 여부], 'useProgressBar': [ProgressBar 사용 여부], callbackFunc' : [Callback 함수]}
  * ```
  * {
  *   'fileName' : Matrix.GetReportInfo().NAME,
  *   'useDocHeaderTitle': true,
  *   'useProgressBar': true,
  *   'callbackFunc' : null
  * }
  * ```
  */
  ExportImageEx(controlNames: string[], exportType: enExportType, option: any): void;

  /** 
   * 팝업으로 내보내기 설정창을 표시합니다.
   *
  */
  ExportPopup(): void;

  /** 
   * 내보내기 서버를 통하여 특정 컨트롤의 데이터를 파일로 내보내기 합니다.
exportType가 없으면 기본값은 Excel로 출력됩니다.
※ 지원 가능 유형 
 1) OlapGrid : Excel, CSV, Text
 2) DataGrid : Excel, CSV, Text, PPT
 3) Chart : Excel, PPT, HML, DOC
 4) MX-Grid : Excel, HTML, HML, DOC, PDF, PNG
   *
  * @param controlName 컨트롤 이름
  * @param exportType 내보낼 파일 형식
  */
  ExportServiceCall(controlName: string, exportType: enExportType): void;

  /** 
   * AUD Base64 Image 정보를 반환합니다.
   *
  * @param key Base64 Key
   * @hidden
  */
  GetAUDBase64ImageData(key?: string): string;

  /** 
   * AUD 옵션을 가져옵니다.
   *
  * @param optionName 옵션명
  * @param defaultValue 옵션이 없을 경우의 기본값
  */
  GetAUDOption(optionName: string, defaultValue: any): any;

  /** 
   * 보고서의 변수 목록(VS,VN,변수편집기,Global변수)을 모두 반환합니다.
   *
  */
  GetAllVariables(): any;

  /** 
   * 해당 컨트롤의 PNG 타입 Base64 인코딩된 문자열을 반환합니다.
   *
  * @param controlName Base64 Encoding 할 컨트롤 객체 이름
  * @param callback Encoding 완료 후 호출 할, callback 함수
  * ```
  * 
  * function(result){
  * 
  * }
  * ```
  */
  GetBase64Encoding(controlName: string, callback: (value:string) => void): string;

  /** 
   * 현재 BoxStyle의 목록을 반환합니다.
   *
  */
  GetBoxStyleList(): BoxStyleList;

  /** 
   * 현재 사용하는 브라우저 타입을 반환합니다.
   *
  */
  GetBrowserType(): enBrowserType;

  /** 
   * DataSet.maf 로 전달할 Packet 정보를 생성합니다.
   *
  * @param gridNames 데이터 입력/수정/삭제 정보를 전송할 그리드 목록(string 타입인 경우 콤마(,)로 분리
  */
  GetDataSetMafPacket(gridNames: string|string[]): any;

  /** 
   * 날짜 처리 객체를 반환합니다.
   *
  * @param year 년
  * @param month 월
  * @param day 일
  * @param hour 시간
  * @param minutes 분
  * @param second 초
  */
  GetDate(year: number, month: number, day: number, hour: number, minutes: number, second: number): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
  */
  GetDate(): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
  * @param year 년
  * @param month 월
  */
  GetDate(year: number, month: number): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
  * @param year 년
  * @param month 월
  * @param day 일
  */
  GetDate(year: number, month: number, day: number): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.
   *
  * @param year 년
  * @param month 월
  * @param day 일
  * @param hour 시간
  * @param minutes 분
  * @param second 초
  */
  GetDateTime(year: number, month: number, day: number, hour: number, minutes: number, second: number): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.
   *
  */
  GetDateTime(): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
  * @param year 년
  * @param month 월
  */
  GetDateTime(year: number, month: number): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
  * @param year 년
  * @param month 월
  * @param day 일
  */
  GetDateTime(year: number, month: number, day: number): ScriptDateUtil;

  /** 
   * ShowReportDialog로 호출된 팝업에서, 부모 보고서가 보내준 파라미터를 추출합니다.
   *
  */
  GetDialogRequestParams(): any;

  /** 
   * 제품에서 사용하는 enum 타입을 가져옵니다.
   *
  * @param enumName enum 이름
  */
  GetEnum(enumName: string): object | undefined;

  /** 
   * 주어진 이름을 가진  폼 객체를 반환 합니다.
   *
  * @param formName 폼 이름
  */
  GetForm(formName: string): Form;

  /** 
   * GlobalConfig 정보를 반환합니다.
   *
  */
  GetGlobalConfig(): GlobalConfig;

  /** 
   * 특정 이름을 가진 전역 쿼리 파라미터 값을 반환 합니다.
   *
  * @param name 파라미터 명
  */
  GetGlobalParamValue(name: string): string;

  /** 
   * 전역 쿼리 파라미터 값 객체의 목록을 반환합니다.
   *
  */
  GetGlobalParams(): GlobalParam;

  /** 
   * i-META Viewer의 조회 조건 정보를 조회합니다.
   *
  * @param controlName 컨트롤명
  */
  GetMetaConditions(controlName: string): any;

  /** 
   * MetaDesigner의 Enum을 호출하는 함수
   *
   * @hidden
  */
  GetMetaDesignerEnum(): any;

  /** 
   * 컨트롤의 SQL Query를 조회합니다.
   *
   * @example
   * ```js
   * Matrix.GetMetaExecuteQuery("DataGrid" ,function(e){
   * 									if(e.Success == false){
   * 										alert(e.Message);
   * 										return;
   * 									}
   *                                    alert(e.SQLText);
   *                                
   *                                });
   * ```
  * @param controlName 컨트롤명
  * @param callBack CallBack함수
  * ```
  * 
  * function(e){
  * 	if(e.Success == false){
  * 		alert(e.Message);
  * 		return;
  * 	}
  *     alert(e.SQLText);
  * 
  * }
  * ```
  */
  GetMetaExecuteQuery(controlName: string, callBack: (p: {"Success":boolean, "Message":string, "SQLText":string}) => void): void;

  /** 
   * i-META Viewer의 조회 조건 정보를 조회합니다.
   *
  * @param excludeConstCondition prompt 조회 조건 외의 조건 불포함 여부
  */
  GetMetaTemplateConditions(excludeConstCondition: boolean): any;

  /** 
   * TableLayout이 없는 메타 템플릿의 layout 위치를 반환합니다.
   *
  */
  GetMetaTemplateLayoutTopValue(): number;

  /** 
   * i-META 뷰어 매니저 객체를 반환합니다.
   *
  */
  GetMetaWizard(): MetaWizardManager;

  /** 
   * 보고서 정보를 반환합니다.
   *
  */
  GetReportInfo(): ReportInfo;

  /** 
   * 스케줄 조회 조건을 조회합니다.
   *
  * @param isCondition 스케줄 예약 실행 여부(true:예약 실행)
  */
  GetScheduleCondition(isCondition: boolean): any;

  /** 
   * 스케줄 실행 layout을 조회합니다.
   *
  * @param workbook 엑셀 내보내기 layout
  * @param isCondition 스케줄 예약 실행 여부(true:예약 실행)
  */
  GetScheduleParam(workbook: any, isCondition: boolean): any;

  /** 
   * 메타 템플릿 사용을 위해 메타 데이터소스 매니저의 TemplateMetaData를 반환합니다.
   *
  */
  GetTemplateMetaData(): MetaDataSource;

  /** 
   * 현재 접속한 사용자의 정보를 반환합니다.
   *
  */
  GetUserInfo(): UserInfo;

  /** 
   * 특정 변수의 값을 반환합니다.
   *
  * @param name 변수명
  */
  GetVariable(name: string): string;

  /** 
   * 변수편집기 통해 등록한 객체의 목록을 반환합니다.
   *
  */
  GetVariables(): Variable[];

  /** 
   * 한글(HML) 형식으로 다운로드합니다.
   *
   * @example
   * ```js
   *    var grid_name = "DataGrid"; //내보내기 대상 컨트롤 이름.
   *    var WORKBOOK = {
   *             "FontName": "맑은 고딕",
   *             "FontSize": 11,
   *             "WorkSheets": [
   *                 {
   *                     "Name": grid_name,
   *                     "DisplayGridlines": "false",
   *                     "Ranges": [
   *                         {
   *                             "Range": "A1", "Value": "■ Report Name : " + Matrix.GetReportInfo().NAME,
   *                             "ColSpan": 5
   *                         },
   *                         {
   *                             "Range": "A2", "Value": "■ Printer : " + Matrix.GetUserInfo().UserName,
   *                             "ColSpan": 5
   *                         },
   *                         {
   *                             "Range": "A3", "Value": "■ Print Time : " + Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss"),
   *                             "ColSpan": 5
   *                         }
   *                     ],
   *                     "Controls": [
   *                         { "Name": grid_name, "Range": "A5" }
   *                     ]
   *                 }
   *             ]
   *         };   
   * 	//파일 명
   * 	 var EXPORT_NAME =  Matrix.GetReportInfo().NAME
   *  				+ "_" +Matrix.GetDateTime().ToString("yyyy-MM-dd_HHmmss")
   * 				+ ".hml";
   *     Matrix.HMLExportServiceCall(WORKBOOK, null, function (e) {
   *         if (e.Success == false) {
   *             alert("export fail" + e.Message);
   *             return;
   *         }
   *         // download file
   *         var row = e.DataSet.GetTable(0).GetRow(0);
   *         var folderName = row.GetValue("FolderName");
   *         var fileName = row.GetValue("FileName");
   *         Matrix.DownloadFile(folderName, fileName, EXPORT_NAME, true);
   *        
   *     });
   * ```
  * @param json json 형식의 보고서 정보
  * @param params parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param callBack CallBack함수
  * ```
  * 
  * function(e){
  * 	if(e.Success == false){
  * 		alert("export fail" + e.Message);
  * 		return;
  * 	}
  * 
  * 	// download file
  * 	var row = e.DataSet.GetTable(0).GetRow(0);
  * 	var folderName = row.GetValue("FolderName");
  * 	var fileName = row.GetValue("FileName");
  * 	var nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
  * 	var newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".hwp";
  * 
  * 	Matrix.DownloadFile(folderName + "/" ,fileName ,newFileName ,true);
  * 
  * }
  * ```
  */
  HMLExportServiceCall(json: any, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 웹(HTML) 형식으로 다운로드합니다.
   *
   * @example
   * ```js
   *    var grid_name = "DataGrid"; //내보내기 대상 컨트롤 이름.
   *    var WORKBOOK = {
   *             "FontName": "맑은 고딕",
   *             "FontSize": 11,
   *             "WorkSheets": [
   *                 {
   *                     "Name": grid_name,
   *                     "DisplayGridlines": "false",
   *                     "Ranges": [
   *                         {
   *                             "Range": "A1", "Value": "■ Report Name : " + Matrix.GetReportInfo().NAME,
   *                             "ColSpan": 5
   *                         },
   *                         {
   *                             "Range": "A2", "Value": "■ Printer : " + Matrix.GetUserInfo().UserName,
   *                             "ColSpan": 5
   *                         },
   *                         {
   *                             "Range": "A3", "Value": "■ Print Time : " + Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss"),
   *                             "ColSpan": 5
   *                         }
   *                     ],
   *                     "Controls": [
   *                         { "Name": grid_name, "Range": "A5" }
   *                     ]
   *                 }
   *             ]
   *         };   
   *     Matrix.HTMLExportServiceCall(WORKBOOK, null, function (e) {
   *         if (e.Success == false) {
   *             alert("export fail" + e.Message);
   *             return;
   *         }
   *         // download file
   *         var row = e.DataSet.GetTable(0).GetRow(0);
   *         var folderName = row.GetValue("FolderName");
   *         var fileName = row.GetValue("FileName");
   *         Matrix.DownloadFile(folderName, fileName, EXPORT_NAME, true);
   *          
   *     });
   * ```
  * @param json json 형식의 보고서 정보
  * @param params parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param callBack CallBack함수
  * ```
  * 
  * function(e){
  * 	if(e.Success == false){
  * 		alert("export fail" + e.Message);
  * 		return;
  * 	}
  * 
  * 	// download file
  * 	var row = e.DataSet.GetTable(0).GetRow(0);
  * 	var folderName = row.GetValue("FolderName");
  * 	var fileName = row.GetValue("FileName");
  * 	var nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
  * 	var newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".htm";
  * 
  * 	Matrix.DownloadFile(folderName + "/" ,fileName ,newFileName ,true);
  * 
  * }
  * ```
  */
  HTMLExportServiceCall(json: any, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 현재 문서에 css 파일을 추가합니다.
   *
  * @param cssfiles css file or files
  * @param callback script load complete 이후 동작 할 함수
  */
  ImportCSS(cssfiles: string[], callback: Function): void;

  /** 
   * 현재 문서에 js 파일을 추가합니다.
   *
  * @param scriptfiles javascript file or files
  * @param callback script load complete 이후 동작 할 함수
  */
  ImportScript(scriptfiles: string[], callback: Function): void;

  /** 
   * 사용자에게 정보 대화 상자를 보여줍니다.
   *
  * @param msg 메시지
  * @param title 제목
  * @param callback 메시지 박스가 닫힌 뒤 호출될 함수
  */
  Information(msg: string, title?: string, callback?: Function): void;

  /** 
   * 보고서를 open 합니다.
   *
  * @param id 보고서 코드
  * @param params 타겟 보고서로 넘길 parameters(Array[object{KEY,VALUE}]) 또는 null
  */
  LoadDocument(id: string, params: any): void;

  /** 
   * 컨트롤의 데이터소스가 i-META일 경우 자동으로 i-META 조회 조건 컨트롤을 생성합니다.
   *
  * @param options 그룹 사용여부, 조회 조건 컨트롤의 시작위치, 라벨 스타일 등을 지정
  */
  MakeMetaFilterControls(options: any): void;

  /** 
   * PDF3 형식으로 다운로드합니다.
   *
   * @example
   * ```js
   * var grid_name = "DataGrid"; //내보내기 대상 컨트롤 이름.
   * var WORKBOOK = {
   *          "FontName": "맑은 고딕",
   *          "FontSize": 11,
   *          "WorkSheets": [
   *              {
   *                  "Name": grid_name,
   *                  "DisplayGridlines": "false",
   *                  "Ranges": [
   *                      {
   *                          "Range": "A1", "Value": "■ Report Name : " + Matrix.GetReportInfo().NAME,
   *                          "ColSpan": 5
   *                      },
   *                      {
   *                          "Range": "A2", "Value": "■ Printer : " + Matrix.GetUserInfo().UserName,
   *                          "ColSpan": 5
   *                      },
   *                      {
   *                          "Range": "A3", "Value": "■ Print Time : " + Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss"),
   *                          "ColSpan": 5
   *                      }
   *                  ],
   *                  "Controls": [
   *                      { "Name": grid_name, "Range": "A5" }
   *                  ]
   *              }
   *          ]
   *      }; 
   * 
   *     var EXPORT_NAME =  Matrix.GetReportInfo().NAME
   *             + "_" +Matrix.GetDateTime().ToString("yyyy-MM-dd_HHmmss")
   *             + ".pdf";
   *                     
   *     Matrix.PDFExportServiceCall(WORKBOOK, null, function (e) {
   *         if (e.Success == false) {
   *             alert("export fail" + e.Message);
   *             return;
   *         }
   *         // download file
   *         var row = e.DataSet.GetTable(0).GetRow(0);
   *         var folderName = row.GetValue("FolderName");
   *         var fileName = row.GetValue("FileName");
   *         Matrix.DownloadFile(folderName, fileName, EXPORT_NAME, true);
   *         
   *     });
   * ```
  * @param json json 형식의 보고서 정보
  * @param params parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param callBack CallBack함수
  * ```
  * 
  * function(e){
  * 	if(e.Success == false){
  * 		alert("export fail" + e.Message);
  * 		return;
  * 	}
  * 
  * 	// download file
  * 	var row = e.DataSet.GetTable(0).GetRow(0);
  * 	var folderName = row.GetValue("FolderName");
  * 	var fileName = row.GetValue("FileName");
  * 	var nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
  * 	var newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".pdf";
  * 
  * 	Matrix.DownloadFile(folderName + "/" ,fileName ,newFileName ,true);
  * 
  * }
  * ```
  */
  PDFExportServiceCall(json: any, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 다운로드 받은 PDF 파일을 브라우저 인쇄 기능을 이용하여 인쇄합니다. (웹 취약 보안 상의 이유로 folderName 이 없을 경우 무조건 _TEMP_ 폴더로 고정 됨)
   *
  * @param folderName 다운로드 받은 파일 폴더명(빈 값일 경우 _TEMP_ 경로로 설정됩니다.)
  * @param fileName 다운로드 받은 파일 명
  * @param isDel 인쇄 완료 후 파일 삭제 여부(true:삭제-기본값, flase:삭제 안함)
  * @param option isPriew 옵션이 false일 경우 해당합니다. 빈값일 경우 기본값으로 자동 설정됩니다.기본값:toolbar=no,scrollbars=yes,resizable=yes,top=10,left=10,width=780,height=(메인화면높이-150)
  */
  PrintPDF(folderName: string, fileName: string, isDel: boolean, option: string): void;

  /** 
   * 팝업으로 오픈한 보고서의 경우, 마지막에 동작하는 함수를 등록합니다. (닫히기 직전에 동작 및 부모로 값을 전달하는 기능)
   *
   * @example
   * ```js
   * Matrix.RegisterDialogCallbackHandler(function(sender, args){    
   *     if(args.Cancel || args.Close){
   *         //취소나 닫기 일 경우
   *         return {"IsCancel":true}
   *     }else{      
   *         //확인 이나 적용일 경우
   *         return {"IsCancel":false, "Formula" : editor.getFormulaText()};
   *     }
   * });
   *    
   * ```
  * @param callbackFunction 동작할 함수 (return 에 해당하는 값이 부모 팝업으로 전달되는 값)
파라미터 
1.sender : Dialog 객체
2. args : {
   Cancel : bool //취소 버튼 클릭
  , Close : bool //닫기 버튼 클릭
  , Type : string// 버튼 유형
}
  */
  RegisterDialogCallbackHandler(callbackFunction: Function): void;

  /** 
   * 특정 이름을 가진 전역 쿼리 파라미터 값 객체를 제거합니다.
   *
  * @param name 삭제할 전역 변수명
  */
  RemoveGlobalParams(name: string): void;

  /** 
   * 컨트롤을 삭제합니다.
   *
  * @param arrNames 컨트롤 이름
  */
  RemoveObject(arrNames: string[]): void;

  /** 
   * ShowReportDialog로 호출된 팝업에서, 부모 보고서로 파라미터를 반환합니다.
   *
  * @param params 부모 보고서로 보내줄 파라미터
  * @param close 파라미터를 전달한 후, 팝업창 닫힘 설정(true:팝업닫힘)
  * @param type 결과 유형
  */
  ReportDialogResult(params: any, close: boolean, type: string): void;

  /** 
   * 데이터 내보내기 서비스를 호출합니다.(처리 완료 후 OnServiceCallBack 이벤트가 발생합니다.)
   *
  * @param json 데이터 내보내기 JSON 객체
  * @param params parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param tag 구분자(tag)
  * @param type 내보낼 파일 형식
   * @hidden
  */
  ReportExport(json: any, params: any, tag: any, type: enExportType): void;

  /** 
   * 데이터 내보내기 서비스를 호출합니다.(처리 완료 후 OnServiceCallBack 이벤트가 발생합니다.)
   *
  * @param json 데이터 내보내기 JSON 객체
  * @param params parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param callBack CallBack함수
  * ```
  * 
  * function(e){
  * 	if(e.Success == false){
  * 		alert("export fail" + e.Message);
  * 		return;
  * 	}
  * 
  * 	// download file
  * 	var row = e.DataSet.GetTable(0).GetRow(0);
  * 	var folderName = row.GetValue("FolderName");
  * 	var fileName = row.GetValue("FileName");
  * 	var nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
  * 	var newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".xlsx";
  * 
  * 	Matrix.DownloadFile(folderName + "/" ,fileName ,newFileName ,true);
  * 
  * }
  * ```
  * @param type 내보낼 파일 형식
  */
  ReportExport(json: any, params: any, callBack: Function, type: enExportType): void;

  /** 
   * 문서 전체를 리사이즈합니다.
   *
  */
  Resize(): void;

  /** 
   * 서버 측 js Business 서비스를 호출합니다. (처리 완료 후 OnServiceCallBack 이벤트가 실행됩니다.)
   *
  * @param gridNames 데이터 입력/수정/삭제 정보를 전송할 그리드 이름 (string 타입인 경우 콤마(,)로 분리)
  * @param scriptName 서버 스트립트 이름(@로 시작하는 경우 서버의 SERVER_SCRIPT 아래 파일 탐색, @보고서코드@스크립트코드 는 특정 보고서의 @로 시작하는 스크립트 탐색)
  * @param tag 구분자(tag) 또는 CallBack함수
   * @hidden
  */
  RunScript(gridNames: string|string[], scriptName: string, tag: any): void;

  /** 
   * 서버 측 js Business 서비스를 호출합니다.
   *
   * @example
   * ```js
   * //특정 보고서의 스크립트 호출 하기
   * //현재 실행중인 보고서가 아닌 다른 경로에 있는 스크립트를 호출하고자 하면
   * //보고서 코드와 스크립트 코드를 @로 구분하여 입력 합니다.
   * //e.g. @보고서코드@스크립트코드
   * Matrix.RunScript("" ,"@REP123213@SEND_MAIL" 
   * 					,function(p){
   *                     	if(p.Success == false){
   * 							Matrix.Alert(p.Message);
   * 							return;
   * 						}
   * 						var  ds = p.DataSet; 
   * 						
   *                        });
   * ```
  * @param gridNames 데이터 입력/수정/삭제 정보를 전송할 그리드 이름 (string 타입인 경우 콤마(,)로 분리)
  * @param scriptName 서버 스트립트 이름(@로 시작하는 경우 서버의 SERVER_SCRIPT 아래 파일 탐색, @보고서코드@스크립트코드 는 특정 보고서의 @로 시작하는 스크립트 탐색)
  * @param callBack CallBack함수
  * ```
  * 
  * function(p){
  *  	if(p.Success == false){
  * 		Matrix.Alert(p.Message);
  * 		return;
  * 	}
  * 	var  ds = p.DataSet; 
  * }
  * ```
  */
  RunScript(gridNames: string|string[], scriptName: string, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 서버 측 js Business 서비스를 호출합니다.
   *
   * @example
   * ```js
   * //특정 보고서의 스크립트 호출 하기
   * //현재 실행중인 보고서가 아닌 다른 경로에 있는 스크립트를 호출하고자 하면
   * //보고서 코드와 스크립트 코드를 @로 구분하여 입력 합니다.
   * //e.g. @보고서코드@스크립트코드
   * Matrix.RunScriptEx("" ,"@REP123213@SEND_MAIL" 
   * 					, {"VS_CODE":"codevalue"
   * 						,"VS_NAME":"name value"
   * 					  }
   * 					,function(p){
   *                     	if(p.Success == false){
   * 							Matrix.Alert(p.Message);
   * 							return;
   * 						}
   * 						var  ds = p.DataSet; 
   * 						
   *                        });
   * ```
  * @param gridNames 데이터 입력/수정/삭제 정보를 전송할 그리드 이름 배열 또는 그리드 이름을 , 분리해서 입력
  * @param scriptName 서버 스트립트 이름(@로 시작하는 경우 서버의 SERVER_SCRIPT 아래 파일 탐색, @보고서코드@스크립트코드 는 특정 보고서의 @로 시작하는 스크립트 탐색)
  * @param params 서버로 전달할 파라미터 목록 (e.g. {'VS_CODE':'100', 'VS_NAME':'PC'} )
  * @param callBack CallBack함수
  * ```
  * 
  * function(p){
  *  	if(p.Success == false){
  * 		Matrix.Alert(p.Message);
  * 		return;
  * 	}
  * 	var  ds = p.DataSet; 
  * }
  * ```
  */
  RunScriptEx(gridNames: string|string[], scriptName: string, params?: {[key:string]:string|number}, callBack?: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 뷰어의 Excel Export 대화 상자를 표시합니다.
   *
  */
  SaveExcel(): void;

  /** 
   * 보고서를 저장합니다.
   *
  * @param reportCode 보고서 코드
  * @param reportName 보고서 명
  * @param folderCode 보고서를 저장할 폴더 코드
  * @param reportDesc 보고서에 대한 설명
  */
  SaveReport(reportCode: string, reportName: string, folderCode: string, reportDesc: string): void;

  /** 
   * 서버측 서비스를 호출합니다.(처리 완료 후 OnServiceCallBack 이벤트가 발생합니다.)
   *
  * @param gridNames 데이터 입력/수정/삭제 정보를 전송할 그리드 목록(string 타입인 경우 콤마(,)로 분리
  * @param className 클래스 이름(ex:com.matrix.Data.BizExecuteDML)
  * @param params 파라미터 리스트 e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param tag 구분자(tag)
   * @hidden
  */
  ServiceCall(gridNames: string|string[], className: string, params: Array<{"Key":string,"Value":string}>, tag: any): void;

  /** 
   * 서버측 서비스를 호출합니다.
   *
   * @example
   * ```js
   * //서버에 업로드된 파일을 읽어서 데이터 테이블로 반환 합니다.
   * var filToDataSet = function(fileName, callback){
   * 
   * 	var params = [{'Key':'#FILE_PATH#','Value':'_TEMP_/'+fileName}];
   * 	Matrix.ServiceCall("" ,"com.matrix.services.FileToTableService" ,params
   * 											,function(p){
   * 												if(p.Success == false){
   * 													Matrix.Alert(p.Message);
   * 													return;
   * 												}
   * 												callback(p.DataSet); 
   * 											}); 
   * }
   * 
   * 
   * //Button click시 파일 업로드 한다. 
   * Matrix.getObject("Button").OnClick = function(s, e){
   * 	//Upload user file to server	
   * 	Matrix.UploadLocalFile("_TEMP_" ,".xlsx, .xls, .csv, .txt" 
   * 			,function(p){
   * 				if(p.Success == false){
   * 					Matrix.Alert(p.Message);
   * 					return;
   * 				}
   * 				
   * 				filToDataSet(p.SaveFileName, function(ds){
   * 						var	grid = Matrix.getObject("DataGrid"); 
   * 						grid.ClearFields(); //필드 모두 제거
   * 						grid.SetDataSet(ds);//데이터 출력
   * 					});
   * 			});
   * 		 
   * };
   * ```
  * @param gridNames 데이터 입력/수정/삭제 정보를 전송할 그리드 목록(string 타입인 경우 콤마(,)로 분리
  * @param className 클래스 이름(e.g.:com.matrix.Data.BizExecuteDML)
  * @param params 파라미터 리스트 e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param callBack CallBack함수
  * ```
  * 
  * function(p){
  *  	if(p.Success == false){
  * 		Matrix.Alert(p.Message);
  * 		return;
  * 	}
  * 	var  ds = p.DataSet; 
  * }
  * ```
  */
  ServiceCall(gridNames: string|string[], className: string, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 내보내기 및 디자인 속성 ContextMenu 표시 여부를 설정합니다.
   *
  * @param name Excel, HML, PPT, DOC, CSV, Text, Design
  * @param flag 표시여부
  */
  SetContextMenuOption(name: string, flag: boolean): void;

  /** 
   * 전역 쿼리 파라미터 값 객체를 추가합니다.
   *
  * @param name 파라미터 명
  * @param value 파라미터의 값
  */
  SetGlobalParams(name: string, value: string): void;

  /** 
   * 스케줄 등록 화면에서 사용할 정보를 셋팅합니다.
   *
  * @param method 스케줄 정보 반환 메소드
  */
  SetScheduleParam(method: Function): void;

  /** 
   * 특정 폼을 활성화 시킵니다.
   *
  * @param idx 활성화 시킬 폼의 이름 또는 인덱스
  */
  SetSheetActive(idx: string | number): void;

  /** 
   * 프로그레스 바 표시 여부를 셋팅합니다.
   *
  * @param flag true:표시, false:비표시
  */
  SetUseProgressBar(flag: boolean): void;

  /** 
   * 특정 변수의 값을 셋팅합니다.
   *
  * @param name 변수명
  * @param value 변수값
  */
  SetVariable(name: string, value: string | object): void;

  /** 
   * 공통 팝업을 생성합니다.
   *
  * @param code 공통데이터소스 코드
  * @param callBack CallBack함수
  * ```
  * 
  * function(rows){
  * // Array rows
  * rows.forEach(function(row){
  * });
  * }
  * ```
  */
  ShowCommonPopup(code: string, callBack: (rows: Array<DataRow>) => void): void;

  /** 
   * 이미지 에디터를 팝업으로 표시합니다.
   *
  * @param tag 사용자 태그
   * @hidden
  */
  ShowImageEditor(tag: any): void;

  /** 
   * 이미지 에디터를 팝업으로 표시합니다.
   *
  * @param callBack CallBack 함수
  * ```
  * 
  *               function(p){
  * //                
  * //                p.FolderName; // 서버에 저장된 이미지 경로(reports 폴더 하위)
  * //                p.ImageName;  // 이미지 이름
  * //                p.ImageWidth; // 이미지 너비
  * //                p.ImageHeight;  // 이미지 높이
  * //                
  *             }
  * ```
  */
  ShowImageEditor(callBack: (p: {"FolderName":string, "ImageName":string, "ImageWidth":number, "ImageHeight":number}) => void): void;

  /** 
   * 메타 팝업을 호출합니다.
   *
  */
  ShowMeta(): void;

  /** 
   * 지정한 보고서를 팝업으로 표시합니다.
   *
  * @param reportCode 팝업으로 표시할 보고서코드
  * @param parameter 팝업으로 넘길 파라미터
  * @param options 팝업 표시 옵션
  * @param callBack 팝업창에서 보내준 파라미터를 받아서 처리할 callback function
  * ```
  * 
  * function(result) {
  * //      *******************************************************************************************************
  * //      **  ShowReportDialog 파라미터 상세 설명
  * //      **  reportCode : 보고서 코드
  * //      **  parameter  :  팝업 창으로 전달 할 인자 값(객체 타입으로 배열,문자, 객체 모두 사용가능)
  * //                        팝업 창에서는 해당 인자를  Matrix.GetDialogRequestParams() 함수를 사용하여 접근
  * //      **  options    : 창 생성 옵션으로 창의 사이즈 및 위치 등의 정보
  * //                        {
  * //                          Width : 600,	   //너비
  * //                          Height : 500,	   //높이
  * //                          MinWidth : 200,	  //최소 너비
  * //                          MinHeight : 200,  //최소 높이
  * //                          Left : 30,	     //창의 위치(Left)
  * //                          Top : 30,	     //창의 위치(Top)
  * //                          Center : true,	 //창의 위치를 화면의 가운데로 배치할 지 여부
  * //                          IsModal  : false,	 //모달창 여부
  * //                          Title : "title",	//팝업창의 타이틀
  * //                          Maximize : false,	//최대화 버튼 활성화 여부
  * //                          Resizable : false,	//창 사이즈 조정 기능 활성화 여부
  * //                          Buttons : 0,	       // 버튼 타입 ( 0 : 없음, 1:닫기, 2:확인/취소)
  * //                          Minimizable : false // 접기/펼치기 버튼 활성화 여부
  * //                       };
  * //      **  callback   : 팝업 창에서 현재 보고서로 반환값을 전달 받을 수 있는 callback 함수
  * //                       - 팝업 창에서 부모창으로 반환값을 넘기려면 Matrix.ReportDialogResult(param, true)를
  * //                         사용하며, 첫 번째 인자 param의 값은 callback 함수의 첫번 째 인자 result로 전달 됩니다.
  * //      *************************************************************************************************************
  *      if(result){
  *         // do something...
  *      }
  * }
  * ```
  */
  ShowReportDialog(reportCode: string, parameter: any, options: any, callBack: (resultData:any) => void): DialogBox;

  /** 
   * 스케줄 옵션 보고서를 팝업으로 표시합니다.
   *
  */
  ShowScheduleOptionDialog(): DialogBox;

  /** 
   * 현재 보고서의 특정 Form을 팝업으로 표시합니다.
   *
   * @example
   * ```js
   * var POP_DATASET = Matrix.ShowWindow("POP_DATASET",0,0,350, 180, false, true, "데이터 집계 설정",false, null, 2, null);
   * POP_DATASET.OnClosed = function(sender, args){
   * 	POP_DATASET = null;
   * 
   * };
   * POP_DATASET.OnDialogResult = function(result){
   * 	//확인에 대한 작업
   * 	_this.POP_DATASET.Close(); 
   * };
   * ```
  * @param formName 폼이름
  * @param left 팝업 창위치(Left)
  * @param top 팝업 창위치(Top)
  * @param width 팝업창 넓이
  * @param height 팝업창 높이
  * @param isModal 모달 창 여부
  * @param resizable 사용자가 사이즈를 임의 조정 가능한지 여부
  * @param header 창 상단 헤더 텍스트
  * @param isAutoClose 프로그레스바가 올라올때 자동으로 닫힐 지 여부
  * @param backColor 모달 창일 경우 배경 색상
  * @param buttons 0:버튼없음,1:닫기,2:확인+취소
  * @param absCoord 팝업창을 절대좌표 기준 위치에 표시한다.
  * @param maximize 최대/최소 버튼 사용 여부
  */
  ShowWindow(formName: string, left: number, top: number, width: number, height: number, isModal: boolean, resizable: boolean, header: string, isAutoClose: boolean, backColor: string, buttons: number, absCoord?: boolean, maximize?: boolean): FormDialog;

  /** 
   * 라벨 컨트롤의 글자를 수직 방향으로 변경합니다
   *
  * @param labelControl 
   * @hidden
  */
  StyleVerticalText(labelControl: Label): void;

  /** 
   * 보고서 마법사를 사용하여 선택한 i-META를 특정 컨트롤에 바인딩 합니다.
   *
  * @param name 컨트롤 명
  */
  TemplateLoadedSetting(name: string): void;

  /** 
   *  제품 다국어 번역하는 함수
   *
  * @param key 다국어 코드
  * @param options i18n 옵션
   * @hidden
  */
  Trans(key: string, options?: any): string;

  /** 
   * 현재 뷰어의 모든 컨트롤에 스타일과 사이즈를 업데이트 합니다.
   *
  */
  Update(): void;

  /** 
   * 박스 스타일 목록을 Update 합니다.
   *
  */
  UploadBoxStyleList(): BoxStyleList;

  /** 
   * 사용자의 로컬의 파일을 서버로 업로드 합니다.
   *
  * @param folderName 업로드할 위치(reports 폴더 하위 폴더 명을 입력합니다.)
  * @param filter 파일 필터(Image files(*.jpg,*.png) : '.jpg,.png' 또는 All files(*.*) : '*.*')
  * @param tag 사용자 태그
   * @hidden
  */
  UploadLocalFile(folderName: string, filter: string, tag: any): void;

  /** 
   * 사용자의 로컬의 파일을 서버로 업로드 합니다.
   *
  * @param folderName 업로드할 위치(reports 폴더 하위 폴더 명을 입력합니다.)
  * @param saveName 저장할 파일 명 (한글 및 특수문자 금지)
  * @param filter 파일 필터(Image files(*.jpg,*.png) : '.jpg,.png' 또는 All files(*.*) : '*.*')
  * @param callBack CallBack 함수
  * ```
  * 
  * function(p){
  *  	if(p.Success == false){
  * 		Matrix.Alert(p.Message);
  * 		return;
  * 	}
  * 	p.FolderName;
  * 	p.SaveFileName;
  * 	p.FileName;
  * 	p.FileSize;
  * 	p.FileExtention;
  * }
  * ```
  */
  UploadLocalFile(folderName: string, saveName: string, filter: string, callBack: (p: {"Success":boolean, "Message":string, "FolderName":string, "SaveFileName" : string, "FileName" : string, "FileSize":number, "FileExtention":string, "Tag":any}) => void): void;

  /** 
   * 사용자의 로컬의 파일을 서버로 업로드 합니다.
   *
  * @param folderName 업로드할 위치(reports 폴더 하위 폴더 명을 입력합니다.)
  * @param saveName 저장할 파일 명 (한글 및 특수문자 금지)
  * @param filter 파일 필터(Image files(*.jpg,*.png) : '.jpg,.png' 또는 All files(*.*) : '*.*')
  * @param limitsize 업로드 제한 사이즈(bytes)
  * @param callBack CallBack 함수
  * ```
  * 
  * function(p){
  *  	if(p.Success == false){
  * 		Matrix.Alert(p.Message);
  * 		return;
  * 	}
  * 	p.FolderName;
  * 	p.SaveFileName;
  * 	p.FileName;
  * 	p.FileSize;
  * 	p.FileExtention;
  * }
  * ```
  */
  UploadLocalFile(folderName: string, saveName: string, filter: string, limitsize: number, callBack: (p: {"Success":boolean, "Message":string, "FolderName":string, "SaveFileName" : string, "FileName" : string, "FileSize":number, "FileExtention":string, "Tag":any}) => void): void;

  /** 
   * 사용자의 로컬의 파일을 서버로 업로드 합니다.
   *
  * @param folderName 업로드할 위치(reports 폴더 하위 폴더 명을 입력합니다.)
  * @param saveName 저장할 파일 명 (한글 및 특수문자 금지)
  * @param filter 파일 필터(Image files(*.jpg,*.png) : '.jpg,.png' 또는 All files(*.*) : '*.*')
  * @param limitsize 업로드 제한 사이즈(bytes)
  * @param tag 사용자 태그
   * @hidden
  */
  UploadLocalFile(folderName: string, saveName: string, filter: string, limitsize: number, tag: any): void;

  /** 
   * 사용자의 로컬의 파일을 서버로 업로드 합니다.
   *
  * @param folderName 업로드할 위치(reports 폴더 하위 폴더 명을 입력합니다.)
  * @param saveName 저장할 파일 명 (한글 및 특수문자 금지)
  * @param filter 파일 필터(Image files(*.jpg,*.png) : '.jpg,.png' 또는 All files(*.*) : '*.*')
  * @param tag 사용자 태그
   * @hidden
  */
  UploadLocalFile(folderName: string, saveName: string, filter: string, tag: any): void;

  /** 
   * 사용자의 로컬의 파일을 서버로 업로드 합니다.
   *
  * @param folderName 업로드할 위치(reports 폴더 하위 폴더 명을 입력합니다.)
  * @param filter 파일 필터(Image files(*.jpg,*.png) : '.jpg,.png' 또는 All files(*.*) : '*.*')
  * @param callBack CallBack 함수
  * ```
  * 
  * function(p){
  *  	if(p.Success == false){
  * 		Matrix.Alert(p.Message);
  * 		return;
  * 	}
  * 	p.FolderName;
  * 	p.SaveFileName;
  * 	p.FileName;
  * 	p.FileSize;
  * 	p.FileExtention;
  * }
  * ```
  */
  UploadLocalFile(folderName: string, filter: string, callBack: (p: {"Success":boolean, "Message":string, "FolderName":string, "SaveFileName" : string, "FileName" : string, "FileSize":number, "FileExtention":string, "Tag":any}) => void): void;

  /** 
   * i-META를 데이터소스로 사용하는 컨트롤의 필수 입력 유효성 검사를 수행하고, 값이 없는 항목의 이름을 반환합니다.
   *
  * @param controlName 컨트롤 명
  */
  ValidateMetaFilterValues(controlName: string): string;

  /** 
   * 사용자에게 위험 대화 상자를 보여줍니다
   *
  * @param msg 메시지
  * @param title 제목
  */
  Warning(msg: string, title: string): void;

  /** 
   * 사용자에게 버튼이 있는 위험 대화 상자를 보여줍니다
   *
  * @param msg 메시지
  * @param title 제목
  * @param callback 확인 버튼 클릭 후 callback 실행 Func.
  * ```
  * 
  *               function(ok){
  *                  if(ok){ // click ok or yes
  *                    // do something ...
  *                   
  *                 }
  *               }
  * ```
  * @param buttonType 버튼 유형(0:예/아니오, 1:확인/취소), 값이 없거나 전달하지 않을 경우 기본 유형으로 설정.
  */
  WarningConfirm(msg: string, title: string, callback: (ok: boolean) => void, buttonType: number): void;

  /** 
   * 사용자에게 버튼이 있는 위험 대화 상자를 보여줍니다.
close 동작 시에 callback 으로 null 을 전달합니다.
   *
   * @example
   * ```js
   * Matrix.WarningConfirmWithClose(msg, title, function (ok) {
   * 	var text = '';
   * 	if (ok === true) {
   * 		text = 'ok';
   * 	} else if (ok === false) {
   * 		text = 'no';
   * 	} else if (ok === null) {
   * 		text = '️close';
   * 	}
   * 	TextBox.Text = text;
   * }, 0);
   * ```
  * @param msg 메시지
  * @param title 제목
  * @param callback 확인(예)/취소(아니오)/닫기(Esc) 후 callback 실행 Function
  * ```
  * function (ok) {
  * 	if (ok === true) {
  * 		// '예' 또는 '확인' 버튼이 클릭된 경우의 동작
  * 	} else if (ok === false) {
  * 		// '아니오' 또는 '취소' 버튼이 클릭된 경우의 동작
  * 	} else if (ok === null) {
  * 		// 창이 '닫기' 버튼 또는 'Esc' 키로 닫힌 경우의 동작
  * 	}
  * }
  * ```
  * @param buttonType 버튼 유형
0: 예/아니오(기본값)
1: 확인/취소
값이 없거나 전달하지 않을 경우 기본값으로 설정
  */
  WarningConfirmWithClose(msg: string, title: string, callback: Function, buttonType: number): void;

  /** 
   * Word 형식으로 다운로드합니다.
   *
   * @example
   * ```js
   * 	
   * 	var grid_name = "DataGrid"; //내보내기 대상 컨트롤 이름.
   *    	var WORKBOOK = {
   *             "FontName": "맑은 고딕",
   *             "FontSize": 11,
   *             "WorkSheets": [
   *                 {
   *                     "Name": grid_name,
   *                     "DisplayGridlines": "false",
   *                     "Ranges": [
   *                         {
   *                             "Range": "A1", "Value": "■ Report Name : " + Matrix.GetReportInfo().NAME,
   *                             "ColSpan": 5
   *                         },
   *                         {
   *                             "Range": "A2", "Value": "■ Printer : " + Matrix.GetUserInfo().UserName,
   *                             "ColSpan": 5
   *                         },
   *                         {
   *                             "Range": "A3", "Value": "■ Print Time : " + Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss"),
   *                             "ColSpan": 5
   *                         }
   *                     ],
   *                     "Controls": [
   *                         { "Name": grid_name, "Range": "A5" }
   *                     ]
   *                 }
   *             ]
   *         }; 
   * 		
   *  var EXPORT_NAME =  Matrix.GetReportInfo().NAME
   * 			+ "_" +Matrix.GetDateTime().ToString("yyyy-MM-dd_HHmmss")
   * 			+ ".docx";
   *     Matrix.WordExportServiceCall(WORKBOOK, null, function (e) {
   *         if (e.Success == false) {
   *             alert("export fail" + e.Message);
   *             return;
   *         }
   *         // download file
   *         var row = e.DataSet.GetTable(0).GetRow(0);
   *         var folderName = row.GetValue("FolderName");
   *         var fileName = row.GetValue("FileName");
   *         Matrix.DownloadFile(folderName, fileName, EXPORT_NAME, true);
   *     });
   * ```
  * @param json json 형식의 보고서 정보
  * @param params parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param callBack CallBack함수
  * ```
  * 
  * function(e){
  * 	if(e.Success == false){
  * 		alert("export fail" + e.Message);
  * 		return;
  * 	}
  * 
  * 	// download file
  * 	var row = e.DataSet.GetTable(0).GetRow(0);
  * 	var folderName = row.GetValue("FolderName");
  * 	var fileName = row.GetValue("FileName");
  * 	var nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
  * 	var newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".docx";
  * 
  * 	Matrix.DownloadFile(folderName + "/" ,fileName ,newFileName ,true);
  * 
  * }
  * ```
  */
  WordExportServiceCall(json: any, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * Excel 2003 형식으로 다운로드합니다.
   *
  * @param json json 형식의 보고서 정보
  * @param params parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * @param callBack CallBack함수
  * ```
  * 
  * function(e){
  * 	if(e.Success == false){
  * 		alert("export fail" + e.Message);
  * 		return;
  * 	}
  * 
  * 	// download file
  * 	var row = e.DataSet.GetTable(0).GetRow(0);
  * 	var folderName = row.GetValue("FolderName");
  * 	var fileName = row.GetValue("FileName");
  * 	var nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
  * 	var newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".xls";
  * 
  * 	Matrix.DownloadFile(folderName + "/" ,fileName ,newFileName ,true);
  * 
  * }
  * ```
  */
  XLSExportServiceCall(json: any, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 특정 컨트롤들의 데이터를 Refresh 합니다.
   *
   * @example
   * ```js
   *  //1. 여러개의 컨트롤 이름을 "," 분리자로 연결
   *  Matrix.doRefresh("Grid1,Grid2");
   *  
   *  //2. 여러개의 컨트롤 이름을 []로 전달 
   *  Matrix.doRefresh(["Grid1","Grid2"]);
   *  
   *  //3. DoRefresh가  true인 전체 컨트롤 실행
   *  Matrix.doRefresh("");
   *  Matrix.doRefresh();
   *  Matrix.doRefresh("*.*");
   *  
   *  //4. 특정 폼하위 DoRefresh가 true인 전체 컨트롤 실행 
   *  Matrix.doRefresh("Form1.*");
   * ```
  * @param names 컨트롤 이름(string타입으로 입력하는 경우 컴마(,)를 분리자로 여러개 입력)
  */
  doRefresh(names: string|string[]): void;

  /** 
   * 전체 컨트롤 목록을 반환합니다.
   *
  */
  getAllObjects(): Control[];

  /** 
   * 해당 이름을 가진 박스스타일을 반환합니다
   *
  * @param name 박스스타일 이름
  */
  getBoxStyle(name: string): BoxStyle;

  /** 
   * 컨트롤이 가지는 데이터 소스 객체를 반환합니다.
   *
   * @example
   * ```js
   *  
   * //특정 컨트롤의 데이터 소스를 반환 합니다.
   *  var ds = Matrix.getControlDataSource("Grid");
   *  if(!ds){
   *  	//데이터 소스가 없음.
   *  }else{
   *  	//컨트롤의 데이터 소스 접근
   *  	//ds.Code <= 코드
   * 	//ds.Name <= 이름
   * 	//ds.ConnectionCode <= 데이터 베이스 연결 정보	
   *  }
   * ```
  * @param controlName 컨트롤 이름
  */
  getControlDataSource(controlName: string): DataSource;

  /** 
   * 특정 데이터 소스 객체를 반환합니다.
   *
  * @param datasourceName 데이터 소스명
  */
  getDataSource(datasourceName: string): DataSource;

  /** 
   * 날짜 처리 객체를 반환합니다.
   *
  * @param year 년
  * @param month 월
  * @param day 일
  * @param hour 시간
  * @param minutes 분
  * @param second 초
  */
  getDate(year: number, month: number, day: number, hour: number, minutes: number, second: number): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
  */
  getDate(): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
  * @param dateText 날짜 문자열(eg. 2020-01-01 08:50:10 )
  * @param format 포멧 (eg.yyyy-MM-dd HH:mm:ss)
  */
  getDate(dateText: string, format: string): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
  * @param year 년
  * @param month 월
  * @param day 일
  */
  getDate(year: number, month: number, day: number): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.
   *
  * @param year 년
  * @param month 월
  * @param day 일
  * @param hour 시간
  * @param minutes 분
  * @param second 초
  */
  getDateTime(year: number, month: number, day: number, hour: number, minutes: number, second: number): ScriptDateUtil;

  /** 
   * 날짜 처리 객체를 반환합니다.
   *
  */
  getDateTime(): ScriptDateUtil;

  /** 
   * 현재 시간을 특정 포멧으로 출력 합니다.
   *
  * @param format 출력 포멧(eg.yyyy-MM-dd HH:mm:ss)
  */
  getDateTime(format: string): string;

  /** 
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
  * @param year 년
  * @param month 월
  * @param day 일
  */
  getDateTime(year: number, month: number, day: number): ScriptDateUtil;

  /** 
   * 서식 Converter를 불러옵니다.
   *
  * @param format 서식 포맷(ex. {0:N0})
  */
  getFormatConverter(format: string): FormatConverter;

  /** 
   * 다국어 문자열의 값을 반환합니다.
   *
  * @param name 문자열 키
  * @param defaultValue 기본 값
  */
  getLanguage(name: string, defaultValue: string): string;

  /** 
   * 해당 이름을 가진 컨트롤을 반환합니다.
   *
  * @param name 컨트롤 이름
  */
  getObject(name: string): Control;

  /** 
   * 보고서 내 파라미터 리스트를 생성하여 객체를 반환 합니다.(이름을 전달 시 해당 파라미터의 값을 반환 합니다.)
   *
  * @param name 파라미터 이름(optional)
  */
  getParamList(name: string): any;

  /** 
   * 컨트롤의 특정 속성을 반환합니다.
   *
  * @param controlName 컨트롤 명
  * @param propertieName 속성 명
  */
  getProperty(controlName: string, propertieName: string): any;

  /** 
   * 문자열 처리 객체를 반환합니다.
   *
  */
  getScriptUtil(): StringUtility;

  /** 
   * 유일 키를 생성합니다.
   *
  * @param prefix prefix
  */
  getUniqueKey(prefix: string): string;

  /** 
   * Viewer 를 반환합니다.
   *
   * @hidden
  */
  getViewer(): any;

  /** 
   * 뷰어 모드를 반환합니다.
   *
  */
  getViewerMode(): enViewerMode;

  /** 
   * LoadDocument의 매개변수로 보낸 params가 있을 경우 그 params를 반환합니다.
   *
  */
  getViewerParams(): object | undefined;

  /** 
   * 간편 메세지를 표시합니다.
   *
  * @param message 간편 메세지에 표시할 Text.
  */
  iMessage(message: string): void;

  /** 
   * 컨트롤의 특정 속성을 설정합니다.
   *
  * @param controlName 컨트롤 명
  * @param propName 속성 명
  * @param value 속성 값
  */
  setProperty(controlName: string, propName: string, value: any): boolean;

  /**
   * @event 
   *
   * 뷰어의 활성화 폼이 바뀔때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnActiveSheetChange : (sender : Matrix
  , args : { 
    /**
     * 폼 아이디
    */
    Id: string
    /**
     * 폼 이름
    */
    Name: string
  }
  ) => void;


  /**
   * @event 
   *
   * View 모드에서 Addin의 로드된 라이브러리의 Component 객체가 생성된 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link AddIn}
  */
  OnAddInComponentClassLoaded : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 내보내기 파일을 다운로드 받기 직전에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnBeforeDownloadExportFile : (sender : Matrix
  , args : { 
    /**
     * 다운받을 파일 이름(확장자 제외)
    */
    fileName: string
    /**
     * 파일을 다운받은 후, 파일 삭제 여부
    */
    IsDelete: boolean
    /**
     * 파일을 다운받은 후, 바로 열기 여부
    */
    DirectOpen: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Button}
  */
  OnButtonClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 날짜 FromTo 선택 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarFromTo}
  */
  OnCalendarFromToValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * String 형식의 To 날짜
    */
    Text2: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
    /**
     * Date 형식의 To 날짜
    */
    Date2: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 날짜 From 선택 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarFromTo}
  */
  OnCalendarFromValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 날짜 선택 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Calendar}
  */
  OnCalendarValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * String 형식의 날짜
    */
    Text: string
    /**
     * Date 형식의 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 주간 FromTo 선택 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarWeeklyFromTo}
  */
  OnCalendarWeeklyFromToValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * String 형식의 To 날짜
    */
    Text2: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
    /**
     * Date 형식의 To 날짜
    */
    Date2: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 주간 From 선택 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarWeeklyFromTo}
  */
  OnCalendarWeeklyFromValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 주간 선택 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarWeekly}
  */
  OnCalendarWeeklyValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * String 형식의 날짜
    */
    Text: string
    /**
     * Date 형식의 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년월 FromTo 선택 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarYMFromTo}
  */
  OnCalendarYMFromToValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * String 형식의 To 날짜
    */
    Text2: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
    /**
     * Date 형식의 To 날짜
    */
    Date2: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년월 From 선택 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarYMFromTo}
  */
  OnCalendarYMFromValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년월 선택 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarYM}
  */
  OnCalendarYMValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * String 형식의 날짜
    */
    Text: string
    /**
     * Date 형식의 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년 FromTo 선택 컨트롤의 값이 변결될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarYearFromTo}
  */
  OnCalendarYearFromToValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * String 형식의 To 날짜
    */
    Text2: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
    /**
     * Date 형식의 To 날짜
    */
    Date2: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년 From 선택 컨트롤의 값이 변결될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarYearFromTo}
  */
  OnCalendarYearFromValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * String 형식의 From 날짜
    */
    Text: string
    /**
     * Date 형식의 From 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년 선택 컨트롤의 값이 변결될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link CalendarYear}
  */
  OnCalendarYearValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * String 형식의 날짜
    */
    Text: string
    /**
     * Date 형식의 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 클릭할 떄 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * cell selection 정보 유지 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 더블 클릭할 떄 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellDoubleClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 더블 터치할 떄 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellDoubleTouch : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 셀이 Load될때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellLoaded : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 셀의 배경색을 변경하실 경우 이값을 넣어 줍니다.(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
    */
    BackColor: string
    /**
     * 셀의 텍스트 색상을 변경하실 경우 이값을 넣어 줍니다.(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
    */
    FontColor: string
    /**
     * 셀의 텍스트를 Bold처리하여 표현할지 유무. true일 경우 Bold처리가 됩니다.
    */
    FontBold: boolean
    /**
     * 셀의 텍스트를 Italic처리하여 표현할지 유무. true일 경우 Italic처리가 됩니다.
    */
    FontItalic: boolean
    /**
     * 이 값을 true로 설정 하게되면 값을 그리지 않습니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 터치할 떄 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellTouch : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Chart}
  */
  OnChartDataPointClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 계열 유형
    */
    Type: number
    /**
     * 시리즈 명
    */
    Series: string
    /**
     * 시리즈 레이블
    */
    Label: string
    /**
     * 포인트 명
    */
    Point: string
    /**
     * 포인트 값
    */
    Value: number
    /**
     * 포인트 인덱스
    */
    PointIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
   *
   * @param args
   *
   * Target : {@link CheckBox}
  */
  OnCheckValueChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 체크 상태
    */
    IsChecked: boolean
    /**
     * 그룹이름
    */
    GroupName: string
    /**
     * 텍스트
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 컬러픽커 컨트롤의 색상이 변경될 경우 발생합니다.
   *
   * @param args
   *
   * Target : {@link ColorPicker}
  */
  OnColorPickerValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 컬러 객체
    */
    Color: Color
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수직선을 드래그 완료할때 발생합니다.
   *
   * @param args
   *
   * @hidden
  */
  OnColumnLineDragEnd : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
    */
    Column: TableColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수직선을 드래그 시작할때 발생합니다.
   *
   * @param args
   *
   * @hidden
  */
  OnColumnLineDragStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
    */
    Column: TableColumn
    /**
     * 드래그를 시작하지 않을지 유무. True이면 드래그 동작이 발생하지 않는다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수직선위에 마우스가 올라갈 경우 발생합니다.
   *
   * @param args
   *
   * @hidden
  */
  OnColumnLineMouseOver : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 마우스가 올라간 라인의 셀의 행 정보
    */
    Row: TableRow
    /**
     * 마우스가 올라간 라인의 셀 정보
    */
    Cell: TableCell
    /**
     * 마우스가 올라간 라인의 셀의 열 정보
    */
    Column: TableColumn
    /**
     * 마우스가 올라간 라인의 인덱스
    */
    LineIndex: number
    /**
     * 마우스 오버 이벤트가 발생하지 않을지 설정 유무. True이면 마우스 오버 이벤트가 발생하지 않는다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 콤보박스 컨트롤의 값이 변경될때 발생합니다.
   *
   * @param args
   *
   * Target : {@link ComboBox}
  */
  OnComboBoxValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 컨트롤 값
    */
    Value: string
    /**
     * 선택된 값의 인덱스
    */
    SelectedIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 레코드가 추가되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCreateNewRow : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 TRUE로 설정하면 Row 추가가 취소됩니다.
    */
    Cancel: boolean
    /**
     * 데이터 레코드 객체
    */
    Record: DataRow
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 셀이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCurrentCellChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
    /**
     * 이전 셀
    */
    OldCell: DataGridCell
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 행이 변경될 때 발생합니다/
   *
   * @param args
   *
   * Target : Grid
  */
  OnCurrentRowChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 셀 데이타 정보
    */
    Record: any
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
    /**
     * 이전 행 객체
    */
    OldRow: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * Chart-EX의 데이터가 바인딩 되는 시점해 발생합니다.
   *
   * @param args
   *
   * Target : {@link HighChart_C}
  */
  OnCustomHighChartBeforeBind : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터셋 객체
    */
    DataSet: DataSet
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnDataBindEnd : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 데이터셋의 레코드 수량
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 행이 키입력으로 인하여 삭제될때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnDeletingRow : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정하시면 셀의 데이터 수정이 취소됩니다.
    */
    Cancel: boolean
    /**
     * 행 객체
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 문서가 닫힐 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnDestroy : (sender : Matrix
  , args : { 
    /**
     * 뷰어ID
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnDocumentLoadComplete : (sender : Matrix
  , args : { 
  }
  ) => void;


  /**
   * @event 
   *
   * [Ctrl + V] 키를 이용해 클립보드에 데이터를 붙여넣기 종료 시 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnEndClipBoardPaste : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 셀 데이타 정보
    */
    Record: any
    /**
     * 수정되거나 추가된 레코드 목록을 반환합니다.
    */
    UpdatedRows: DataGridRow[]
    /**
     * 클립보드 텍스트 입니다.
    */
    ClipBoardText: string
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀의 값이 수정된 후 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnEndEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정 하게되면 수정작업이 취소됩니다.
    */
    Cancel: boolean
    /**
     * 셀의 필드 정보
    */
    Field: DataGridColumn
    /**
     * 수정 되기 전 값
    */
    BeforeValue: any
    /**
     * 수정된 값
    */
    AfterValue: any
    /**
     * 행 객체
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터소스 실행 작업 (Execute, ExecuteDML)이 종료된 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnExecuteCompleted : (sender : Matrix
  , args : { 
    /**
     * 사용자 지정 태그
    */
    Tag: string
    /**
     * 성공 여부
    */
    Success: boolean
    /**
     * 오류 메시지
    */
    Message: string
    /**
     * Execute인 경우 결과 데이터셋
    */
    DataSet: DataSet
    /**
     * 결과 데이터셋의 기본 테이블
    */
    DataTable: DataTable
  }
  ) => void;


  /**
   * @event 
   *
   * Refresh가 실행되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnExecuteStart : (sender : Matrix
  , args : { 
    /**
     * true일 경우 AutoRefresh 동작 입니다.
    */
    IsAutoRefresh: boolean
    /**
     * 현재 Refresh 대상(들)의 이름
    */
    Target: string
    /**
     * 현재 Refresh 대상(들)의 이름
    */
    TargetNames: string[]
    /**
     * 이 값을 true로 설정 시 실행이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 파일 업로드 버튼 컨트롤이 클릭되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link FileUploadButton}
  */
  OnFileClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
    /**
     * true로 지정 시 이벤트가 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 메타 큐브 또는 메타뷰 파일을 연 후에 발생합니다.
   *
   * @param args
   *
  */
  OnFileOpened : (sender : Matrix
  , args : { 
    /**
     * 메타 보고서 코드
    */
    Code: string
    /**
     * 메타 이름
    */
    Name: string
    /**
     * DB 코드
    */
    ConnectionCode: string
    /**
     * 설명
    */
    Description: string
    /**
     * 폴더 코드
    */
    FolderCode: string
    /**
     * 모듈 코드
    */
    ModuleCode: string
    /**
     * 만든 계정
    */
    Owner: string
    /**
     * 메타 항목 배열
    */
    AllMetaItems: MetaItem[]
    /**
     * 성공 여부
    */
    IsSuccess: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 체크 박스를 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridCheckBoxClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 체크 유무
    */
    Checked: boolean
    /**
     * 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
    */
    Cancel: boolean
    /**
     * 레코드 노드
    */
    Row: DataGridRow
    /**
     * 클릭한 셀의 데이터
    */
    Record: any
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드 계열(DataGrid, OlapGrid..) 컨트롤 클릭 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnGridClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 컬럼 헤더를 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridColumnHeaderClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 필드
    */
    Field: DataGridColumn
    /**
     * 처리완료 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 컬럼 헤더를 더블 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridColumnHeaderDoubleClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 필드
    */
    Field: DataGridColumn
    /**
     * 처리완료 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 ComboBox 값이 바뀔 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridComboBoxChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 셀 데이타 정보
    */
    Record: any
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 변경된 값
    */
    ChangeValue: string
    /**
     * 이 값을 true로 설정하시면 셀의 데이터 수정이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 컨텍스트 메뉴가 열리기 전에 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridContextMenuOpening : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 컨텍스트 메뉴 객체
    */
    Menu: ContextMenu
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 컨텍스트 메뉴를 열지 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 엑셀 내보내기 전에 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridExportStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 다운로드 시 저장할 파일명
    */
    FileName: string
    /**
     * 글자 유형, 기본값 iStudioConfig.CanvasDefaultFont
    */
    DefaultFontName: string
    /**
     * 글자 크기, 기본값 11
    */
    DefaultFontSize: number
    /**
     * Excel로 내보내기 할 경우 상단 Row에 데이터를 추가할 수 있습니다.(string array 또는 {"Range":"A1","ColSpan":10,"Value":"■ 보고서 명 : ","Style":{"Border":"border:Thin,#000000;","Font":"font-color:#000000"}}형태로 지정)
    */
    ExportRows: any
    /**
     * DataGrid의 엑셀 위치 (default : A1)
    */
    ExportGridCell: string
    /**
     * 서버 조회 데이타 사용 여부
    */
    ExportServerData: boolean
    /**
     * 이 값을 true 로 설정 할 경우 내보내기가 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 필터가 변경된 시점에 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridFilterChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 필드 정보
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 멀티헤더 셀이 로드될때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridMultiHeaderCellLoaded : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 멀티헤더셀 객체
    */
    HeaderCell: MultiHeaderCell
    /**
     * 내부 컨트롤
    */
    Control: Control
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 멀티 헤더 체크 박스를 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridMultiHeaderCheckBoxClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 멀티헤더셀 객체
    */
    HeaderCell: MultiHeaderCell
    /**
     * 체크 유무
    */
    Checked: boolean
    /**
     * 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 멀티헤더 셀을 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridMultiHeaderClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 멀티헤더셀 객체
    */
    HeaderCell: MultiHeaderCell
    /**
     * 처리완료 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 멀티헤더 셀을 더블클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridMultiHeaderDoubleClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 멀티헤더셀 객체
    */
    HeaderCell: MultiHeaderCell
    /**
     * 처리완료 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드 및 피벗그리드의 데이터소스 파라미터가 변경되었을 경우 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnGridParamChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 실행 요청 여부(true 이면 요청을 하지 않는다.)
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 Grouping 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGroupDataBindEnd : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 데이터셋의 레코드 수량
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event 
   *
   * 이미지 컨트롤이 클릭되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Image}
  */
  OnImageClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 사용자가 ShowImageEditor 명령을 통해 이미지 파일 업로드 실행 후 발생합니다.
   *
   * @param args
   *
   * @hidden
  */
  OnImageEditCompleted : (sender : Matrix
  , args : { 
    /**
     * 사용자 지정 태크
    */
    Tag: any
    /**
     * 이미지 이름
    */
    ImageName: string
    /**
     * 이미지 너비
    */
    ImageWidth: number
    /**
     * 이미지 높이
    */
    ImageHeight: number
    /**
     * 서버에 저장된 이미지 경로(reports 폴더 하위)
    */
    FolderName: string
  }
  ) => void;


  /**
   * @event 
   *
   * 문서가 로드되고 AutoRefresh가 완료되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnLoadComplete : (sender : Matrix
  , args : { 
    /**
     * 성공여부
    */
    Success: boolean
    /**
     * 에러 메시지
    */
    Message: string
  }
  ) => void;


  /**
   * @event 
   *
   * Local에 메타뷰 파일을 연 후에 발생합니다.
   *
   * @param args
   *
  */
  OnLocalFileOpened : (sender : Matrix
  , args : { 
    /**
     * 메타뷰 파일 이름
    */
    FileName: string
  }
  ) => void;


  /**
   * @event 
   *
   * 마스크 텍스트 박스 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link MaskTextBox}
  */
  OnMaskTextChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 기존 값
    */
    OldValue: string
    /**
     * 현재 값
    */
    NewValue: string
    /**
     * 컨트롤 값
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 마스크 텍스트 박스 컨트롤의 key 입력 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link MaskTextBox}
  */
  OnMaskTextKeydown : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 마스크 텍스트 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 마스크 텍스트 박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   *
   * @param args
   *
   * Target : {@link MaskTextBox}
  */
  OnMaskTextKeypress : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 마스크 텍스트 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 마스크 텍스트 박스 컨트롤의 key 입력 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link MaskTextBox}
  */
  OnMaskTextKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 마스크 텍스트 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 메타뷰어 데이터소스를 적용완료한 후에 발생합니다.
   *
   * @param args
   *
  */
  OnMetaViewerBindClosed : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 메타 위자드 객체
    */
    Wizard: MetaWizardManager
  }
  ) => void;


  /**
   * @event 
   *
   * 메타 뷰어를 연 후에 발생합니다.
   *
   * @param args
   *
  */
  OnMetaViewerOpened : (sender : Matrix
  , args : { 
    /**
     * 메타 위자드 객체
    */
    Wizard: MetaWizardManager
  }
  ) => void;


  /**
   * @event 
   *
   * Execute 실행되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link MultiComboBox}
  */
  OnMultiComboBoxExecuteStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정 시 실행이 취소됩니다.
    */
    Cancel: boolean
    /**
     * 0:일반 조회, 1:검색 텍스트박스 조회, 2:전체검색 버튼 조회
    */
    FilterType: number
    /**
     * 검색 텍스트박스에 입력된 검색어
    */
    FilterText: string
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 콤보 박스의 트리 노드 객체를 클릭할 경우 발생합니다.
   *
   * @param args
   *
   * Target : {@link MultiComboBox}
  */
  OnMultiComboBoxNodeClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 현재 멀티 콤보 박스의 리스트 형식
    */
    Type: string
    /**
     * 노드 객체
    */
    Node: TreeComboNode
  }
  ) => void;


  /**
   * @event 
   *
   * MultiComboBox의 텍스트 박스에 key 입력 후 발생합니다.(단, EditableValueText==true일 경우만)
   *
   * @param args
   *
   * Target : {@link MultiComboBox}
  */
  OnMultiComboBoxTextKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 콤보 박스의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link MultiComboBox}
  */
  OnMultiComboBoxValueChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 변경 전 컨트롤 값
    */
    OldValue: string
    /**
     * 현재 컨트롤 값(구분자 ,)
    */
    Value: string
  }
  ) => void;


  /**
   * @event 
   *
   * 디자이너에서 메타뷰어의 배치가 변경되면 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnNewReportWizardChanged : (sender : Matrix
  , args : { 
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 접은 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeAfterCollapsed : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 노드
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 펼친 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeAfterExpand : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 노드
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 접기 전에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeBeforeCollapsed : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 노드
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 펼치기 전에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnNodeBeforeExpand : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 노드
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 key 입력 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link NumberBox}
  */
  OnNumberBoxKeydown : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 넘버 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   *
   * @param args
   *
   * Target : {@link NumberBox}
  */
  OnNumberBoxKeypress : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 넘버 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 key 입력 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link NumberBox}
  */
  OnNumberBoxKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 넘버 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 숫자가 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link NumberBox}
  */
  OnNumberTextChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 기존 값
    */
    OldValue: string
    /**
     * 현재 값
    */
    NewValue: string
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 셀을 수정 후에 발생합니다.
   *
   * @param args
   *
   * Target : {@link OlapGrid}
  */
  OnOlapDataCellEndEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 명
    */
    Id: string
    /**
     * 데이터 셀 객체
    */
    Cell: ScriptDataCell
    /**
     * 수정 전 값
    */
    BeforeValue: number
    /**
     * 수정 후 값
    */
    AfterValue: number
    /**
     * 잠긴 레코드의 값
    */
    LockedValue: number
    /**
     * 이 값을 true 로 설정 할 경우 수정 작업이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 셀 수정 모드로 진입할 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link OlapGrid}
  */
  OnOlapDataCellStartEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 명
    */
    Id: string
    /**
     * 데이터 셀 객체
    */
    Cell: ScriptDataCell
    /**
     * 이 값을 true 로 설정 할 경우 수정 모드로 진입이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * Export 직전에 호출합니다.
   *
   * @param args
   *
   * Target : {@link OlapGrid}
  */
  OnOlapExportStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 내보내기 유형
    */
    ExportType: enOlapExportsType
    /**
     * 파일명, 기본값 : 보고서명_yyyyMMddHHmmss(일시는 실제 다운로드 시점에 설정)
    */
    ExportFileName: string
    /**
     * 글자 유형, 기본값 iStudioConfig.CanvasDefaultFont
    */
    DefaultFontName: string
    /**
     * 글자 크기, 기본값 11
    */
    DefaultFontSize: number
    /**
     * Excel로 내보내기 할 경우 상단 Row에 데이터를 추가할 수 있습니다.(string array 형태로 지정)
    */
    ExportRows: string[]
    /**
     * Text 내보내기 시 Column 단위별 구분자.  eg.\\t (탭 문자)
    */
    TextExportColSeparator: string
    /**
     * Text 내보내기 시 Column 단위별 구분자.  eg.\\n (개행 문자)
    */
    TextExportRowSeparator: string
    /**
     * 이 값을 true 로 설정 할 경우 내보내기가 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * i-OLAP의 데이터 셀을 더블 클릭하는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewDataCellDoubleClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 명
    */
    Id: string
    /**
     * 데이터 셀 객체
    */
    DataCell: ScriptDataCell
  }
  ) => void;


  /**
   * @event 
   *
   * 헤더셀을 클릭 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewHeaderClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 헤더 셀 객체
    */
    HeaderCell: ScriptHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 헤더셀을 더블 클릭 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewHeaderDoubleClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 헤더 셀 객체
    */
    HeaderCell: ScriptHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 헤더셀을 클릭 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewMultiHeaderClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 헤더 셀 객체
    */
    HeaderCell: IMultiHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 헤더셀을 더블 클릭 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewMultiHeaderDoubleClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 헤더 셀 객체
    */
    HeaderCell: IMultiHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 피벗 그리드의 선택 영역이 변경된 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewSelectionChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 명
    */
    Id: string
    /**
     * 선택 영역이 컨트롤러
    */
    Selection: ScriptSelection
  }
  ) => void;


  /**
   * @event 
   *
   * 픽리스트의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link PickList}
  */
  OnPickListValueChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 변경 전 컨트롤 값
    */
    OldValue: string
    /**
     * 현재 컨트롤 string값(구분자 ;)
    */
    Value: string
  }
  ) => void;


  /**
   * @event 
   *
   * 원형 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Chart}
  */
  OnPieChartDataPointClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 시리즈 명
    */
    Series: string
    /**
     * 포인트 명
    */
    Point: string
    /**
     * 포인트 값
    */
    Value: number
    /**
     * 포인트 인덱스
    */
    PointIndex: number
    /**
     * 포인트 영역 색상
    */
    PointColor: string
  }
  ) => void;


  /**
   * @event 
   *
   * 방사형 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Chart}
  */
  OnPolygonChartDataPointClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 계열 유형
    */
    Type: number
    /**
     * 시리즈 명
    */
    Series: string
    /**
     * 시리즈 레이블
    */
    Label: string
    /**
     * 포인트 명
    */
    Point: string
    /**
     * 포인트 값
    */
    Value: number
    /**
     * 포인트 인덱스
    */
    PointIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * 라디오 컨트롤의 값이 변경될 경우 발생합니다.
   *
   * @param args
   *
   * Target : {@link RadioButton}
  */
  OnRadioValueChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 그룹명
    */
    GroupName: string
    /**
     * 라벨 값
    */
    Text: string
    /**
     * 체크 상태
    */
    IsChecked: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 모든 종류의 서버 요청(doRefresh, Execute, RunScript 등)이 완료(응답을 받은 상태)되면 발생하는 이벤트입니다. 여러 개의 요청이 동시에 진행된 경우, 마지막 요청이 완료됐을 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnRefreshComplete : (sender : Matrix
  , args : { 
    /**
     * 성공여부
    */
    Success: boolean
    /**
     * 에러 메시지
    */
    Message: string
  }
  ) => void;


  /**
   * @event 
   *
   * 조건 개인화가 적용된 후에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnReportFilterLoadComplete : (sender : Matrix
  , args : { 
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트 박스 컨트롤의 key 입력 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link RichTextBox}
  */
  OnRichTextBoxKeydown : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 리치 텍스트 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트 박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   *
   * @param args
   *
   * Target : {@link RichTextBox}
  */
  OnRichTextBoxKeypress : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 리치 텍스트 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트 박스 컨트롤의 key 입력 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link RichTextBox}
  */
  OnRichTextBoxKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 리치 텍스트 박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트 박스 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link RichTextBox}
  */
  OnRichTextChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 기존 값
    */
    OldValue: string
    /**
     * 현재 값
    */
    NewValue: string
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수평선을 드래그 완료할때 발생합니다.
   *
   * @param args
   *
   * @hidden
  */
  OnRowLineDragEnd : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
    */
    Column: TableColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수평선을 드래그 시작할때 발생합니다.
   *
   * @param args
   *
   * @hidden
  */
  OnRowLineDragStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
    */
    Column: TableColumn
    /**
     * 드래그를 시작하지 않을지 유무. True이면 드래그 동작이 발생하지 않는다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수평선위에 마우스가 올라갈 경우 발생합니다.
   *
   * @param args
   *
   * @hidden
  */
  OnRowLineMouseOver : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 마우스가 올라간 라인의 셀의 행 정보
    */
    Row: TableRow
    /**
     * 마우스가 올라간 라인의 셀 정보
    */
    Cell: TableCell
    /**
     * 마우스가 올라간 라인의 셀의 열 정보
    */
    Column: TableColumn
    /**
     * 마우스가 올라간 라인의 인덱스
    */
    LineIndex: number
    /**
     * 마우스 오버 이벤트가 발생하지 않을지 설정 유무. True이면 마우스 오버 이벤트가 발생하지 않는다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 분산형/거품형 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Chart}
  */
  OnScatterChartDataPointClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 차트 종류
    */
    Type: number
    /**
     * 시리즈 명
    */
    Series: string
    /**
     * X값 필드 명
    */
    PointX: string
    /**
     * Y값 필드 명
    */
    PointY: string
    /**
     * Z값 필드 명(거품형의 경우)
    */
    PointZ: string
    /**
     * Label값 필드 명
    */
    PointLabel: string
    /**
     * X 값
    */
    ValueX: number
    /**
     * Y 값
    */
    ValueY: number
    /**
     * Z 값(거품형의 경우)
    */
    ValueZ: number
    /**
     * Label 값
    */
    ValueLabel: number
    /**
     * 포인트 인덱스
    */
    PointIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * ServiceCall 작업이 종료된 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnServiceCallBack : (sender : Matrix
  , args : { 
    /**
     * 사용자 지정 태그
    */
    Tag: string
    /**
     * ServiceCall 성공 여부
    */
    Success: boolean
    /**
     * 오류 메세지
    */
    Message: string
    /**
     * 결과 데이터셋
    */
    DataSet: DataSet
  }
  ) => void;


  /**
   * @event 
   *
   * 슬라이더 컨트롤의 핸들을 드래그하는 동안 발생합니다.
   *
   * @param args
   *
   * Target : {@link Slider}
  */
  OnSliderChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 최소값
    */
    Min: number
    /**
     * 최대값
    */
    Max: number
    /**
     * 핸들의 시작 위치값
    */
    From: number
    /**
     * 핸들의 종료 위치값
    */
    To: number
  }
  ) => void;


  /**
   * @event 
   *
   * 슬라이더 컨트롤의 핸들 드래그를 완료할때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Slider}
  */
  OnSliderFinish : (sender : Matrix
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 최소값
    */
    Min: number
    /**
     * 최대값
    */
    Max: number
    /**
     * 핸들의 시작 위치값
    */
    From: number
    /**
     * 핸들의 종료 위치값
    */
    To: number
  }
  ) => void;


  /**
   * @event 
   *
   * [Ctrl + V] 키를 이용해 클립보드에 데이터를 붙여넣기 실행 시 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnStartClipBoardPaste : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 셀 데이타 정보
    */
    Record: any
    /**
     * 클립보드 텍스트로, 작업을 취소하려면 이 값을 제거하십시오.
    */
    ClipBoardText: string
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀이 수정모드로 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnStartEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정하시면 셀의 데이터 수정이 취소됩니다.
    */
    Cancel: boolean
    /**
     * 셀의 필드 정보. 단, Paste(붙여넣기) 동작 시에는 셀의 필드 정보 중 Name 값만 반환됩니다.
    */
    Field: DataGridColumn
    /**
     * 셀의 값
    */
    Value: any
    /**
     * 행 객체
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 현재 활성화된 탭이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tab}
  */
  OnTabControlActiveTabChanged : (sender : Matrix
  , args : { 
    /**
     * 탭 컨트롤의 Id
    */
    Id: string
    /**
     * 활성화된 탭의 이름
    */
    TabName: string
    /**
     * 활성화된 탭의 Index
    */
    TabIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트블럭이 클릭되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Label}
  */
  OnTextBlockClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트블럭에 마우스를 아웃하는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Label}
  */
  OnTextBlockMouseOut : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트블럭에 마우스를 오버하는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Label}
  */
  OnTextBlockMouseOver : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 라벨 값
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트 박스 컨트롤의 텍스트가 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link TextBox}
  */
  OnTextChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트 박스 컨트롤의 key 입력 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link TextBox}
  */
  OnTextKeydown : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트 박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   *
   * @param args
   *
   * @example
   * ```js
   *     //텍스트 박스에 Enter 입력 시 조회 하기
   *     var tbxFilter = Matrix.getObject("tbxFilter");
   *     tbxFilter.OnTextKeypress = function (s, e) {
   *         if (e.Event.isEnter()) { //Enter 키 클릭 시
   * 			Matrix.doRefresh("Grid");
   *         }
   *     };
   * ```
   * Target : {@link TextBox}
  */
  OnTextKeypress : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트 박스 컨트롤의 key 입력 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link TextBox}
  */
  OnTextKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 텍스트
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 트리 그리드의 트리형태 셀을 클릭할 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnTreeCellClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 선택한 영역
    */
    Area: enTreeCellArea
  }
  ) => void;


  /**
   * @event 
   *
   * 컨텍스트 메뉴가 열리기 전에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnTreeContextMenuOpening : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * Selected node
    */
    Node: MTXTreeNode
    /**
     * 컨텍스트 메뉴 객체
    */
    Menu: ContextMenu
    /**
     * 컨텍스트 메뉴를 열지 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤 노드의 채크박스를 클릭했을때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnTreeNodeCheckboxClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 노드
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 클릭했을때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnTreeNodeClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 노드
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 더블클릭했을때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnTreeNodeDbClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 노드
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드에서 마우스 우클릭 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link Tree}
  */
  OnTreeNodeRightClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 노드
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * UserComponent가 로딩 완료된 후 발생한다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnUserComponentLoaded : (sender : Matrix
  , args : { 
    /**
     * 유저 컴포넌트 이름
    */
    Id: string
    /**
     * 보고서 스크립트 객체
    */
    ScriptObject: any
  }
  ) => void;


  /**
   * @event 
   *
   * 사용자가 UploadLocalFile 명령을 통해 파일을 업로드 실행 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnUserFileUploadCompleted : (sender : Matrix
  , args : { 
    /**
     * 성공여부
    */
    Success: boolean
    /**
     * 에러 메시지
    */
    Message: string
    /**
     * 서버에 저장된 파일의 경로
    */
    FolderName: string
    /**
     * 서버에 저장된 파일의 이름
    */
    SaveFileName: string
    /**
     * 사용자가 선택한 파일 이름
    */
    FileName: string
    /**
     * 파일 사이즈
    */
    FileSize: number
    /**
     * 파일의 확장자
    */
    FileExtention: string
    /**
     * 사용자 지정 태크
    */
    Tag: any
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 셀의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnValidate : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정 시 컨트롤 내부 Validate 동작은 취소되고 스크립트에서 정의한 내용만 반영됩니다.
    */
    Handled: boolean
    /**
     * Validate error메시지를 지정하실 수 있습니다.
    */
    Message: string
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 행 객체
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 뷰어의 사이즈가 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Matrix}
  */
  OnViewerSizeChanged : (sender : Matrix
  , args : { 
    /**
     * 뷰어의 넓이
    */
    Width: number
    /**
     * 뷰어의 높이
    */
    Height: number
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid 셀 데이터 수정 시작 이벤트
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OniGridCellBeginEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 대상 셀
    */
    Cell: Cell
    /**
     * 편집 취소 여부
    */
    Cancel: boolean
    /**
     * 텍스트 편집기의 너비를 여러 셀에 걸처 병합한 사이즈로 표현합니다.(병합 셀 갯수 입력)
    */
    MergeColumn: number
    /**
     * 콤보 상자의 목록을 설정 합니다.
    */
    LOVList: string[]
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid Cell Click 이벤트
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OniGridCellClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 셀 정보
    */
    Cell: Cell
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid Cell Double Click 이벤트
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OniGridCellDoubleClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 셀 정보
    */
    Cell: Cell
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid 셀 데이터 수정 완료 이벤트
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OniGridCellEndEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 수정된 데이터 셀 목록
    */
    getCells(): Cell[]
    /**
     * 서버로 계산 실행 취소 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤 클릭 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OniGridClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 컨텍스트 메뉴가 열리기 전에 발생합니다.
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OniGridContextMenuOpening : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 셀
    */
    Cell: Cell
    /**
     * 컨텍스트 메뉴 객체
    */
    Menu: ContextMenu
    /**
     * 컨텍스트 메뉴를 열지 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 스크롤이 움직일 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OniGridScroll : (sender : Matrix
  , args : { 
    /**
     * offset left
    */
    ScrollLeft: number
    /**
     * offset top
    */
    ScrollTop: number
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid Selection Change 이벤트
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OniGridSelectionChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 셀 목록 정보
    */
    Cells: Cell[]
  }
  ) => void;


}
