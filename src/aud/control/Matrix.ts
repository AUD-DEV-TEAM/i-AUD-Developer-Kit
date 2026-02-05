import { enQueryParamType } from "../../aud/enums/comm/enQueryParamType";
import { Style } from "../../aud/drawing/Style";
import { ContextMenu } from "../../aud/control/ContextMenu";
import { ContextMenuItem } from "../../aud/control/ContextMenuItem";
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
import { TreeView } from "../../aud/control/TreeView";
import { TreeViewNode } from "../../aud/control/treeviews/TreeViewNode";
import { CheckBox } from "../../aud/control/CheckBox";
import { ColorPicker } from "../../aud/control/ColorPicker";
import { Color } from "../../aud/drawing/Color";
import { TableRow } from "../../aud/control/table/TableRow";
import { TableCell } from "../../aud/control/table/TableCell";
import { TableColumn } from "../../aud/control/table/TableColumn";
import { ComboBox } from "../../aud/control/ComboBox";
import { DataRow } from "../../aud/data/DataRow";
import { HighChart_C } from "../../aud/control/HighChart_C";
import { MetaTreeView } from "../../aud/control/MetaTreeView";
import { DataTable } from "../../aud/data/DataTable";
import { FileUploadButton } from "../../aud/control/FileUploadButton";
import { MetaItem } from "../../aud/meta/MetaItem";
import { FilterInfo } from "../../aud/control/metaTreeViews/FilterInfo";
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
* i-AUD 클라이언트 스크립트의 Main Class로 i-AUD 기능에 접근합니다.
* 
*/
export interface Matrix{

  /**
   * 활성 폼의 이름
   * 
  */
   readonly ActiveFormName: string;

  /**
   * 현재 사용자의 계정
   * 
  */
   readonly UserCode: string;

  /**
   * 컨텍스트 메뉴에 사용자 정의 컨텍스트 메뉴 아이템을 추가합니다.
   *
   *
   * @example
   * ```js
   * // 메뉴 아이템 생성 후 컨텍스트 메뉴에 추가
   * var menu1 = Matrix.CreateContextMenuItem("조회", function() {
   *     Matrix.doRefresh("DataGrid");
   * });
   * Matrix.AddContextMenu(menu1);
   *
   * // 구분선 추가
   * Matrix.AddContextMenuLine();
   *
   * // 하위 메뉴가 있는 구조
   * var parentMenu = Matrix.CreateContextMenuItem("내보내기", function() {});
   * Matrix.AddContextMenu(parentMenu);
   *
   * var childMenu1 = Matrix.CreateContextMenuChildItem(parentMenu.Id, "Excel", function() {
   *     Matrix.SaveExcel();
   * });
   * Matrix.AddContextMenu(childMenu1);
   *
   * var childMenu2 = Matrix.CreateContextMenuChildItem(parentMenu.Id, "PDF", function() {
   *     Matrix.ExportPopup();
   * });
   * Matrix.AddContextMenu(childMenu2);
   * ```
  * @param menuitem
  * 컨텍스트 메뉴에 추가할 사용자 정의 컨텍스트 메뉴 아이템
  *
  */
  AddContextMenu(menuitem: ContextMenuItem): void;

  /**
   * 컨텍스트 메뉴에 구분선(라인)을 추가합니다.
   *
   *
   * @example
   * ```js
   * var menu1 = Matrix.CreateContextMenuItem("메뉴1", function() {
   *     Matrix.Alert("메뉴1 클릭");
   * });
   * Matrix.AddContextMenu(menu1);
   *
   * // 메뉴 사이에 구분선 추가
   * Matrix.AddContextMenuLine();
   *
   * var menu2 = Matrix.CreateContextMenuItem("메뉴2", function() {
   *     Matrix.Alert("메뉴2 클릭");
   * });
   * Matrix.AddContextMenu(menu2);
   * ```
  */
  AddContextMenuLine(): void;

  /**
   * 전역 쿼리 파라미터 값 객체를 추가합니다.
   *
   *
   * @example
   * ```js
   * // 전역 파라미터 설정 후 서버 스크립트 호출
   * Matrix.AddGlobalParams("VS_DEPT_CODE", "D001", 1);  // 1: String
   * Matrix.AddGlobalParams("VN_YEAR", "2025", 0);       // 0: Numeric
   *
   * Matrix.RunScript("DataGrid", "SAVE_DATA", function(p) {
   *     if (p.Success == false) {
   *         Matrix.Alert(p.Message);
   *         return;
   *     }
   *     Matrix.Alert("저장 완료");
   *     Matrix.ClearGlobalParams();
   *     Matrix.doRefresh("DataGrid");
   * });
   * ```
  * @param name 파라미터 이름
  * @param value 파라미터 값
  * @param type 데이터 타입 (0: Numeric, 1: String)
  */
  AddGlobalParams(name: string, value: string, type: enQueryParamType): void;

  /** 
   * 사용자에게 브라우저 경고 대화 상자를 보여줍니다.
   * 
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
   * 여러 컨트롤의 스타일 및 크기를 일괄 변경하기 전에 호출합니다.
   *
   * 성능 향상을 위해 개별 변경 시마다 화면을 갱신하지 않고,
   * 모든 작업이 끝난 후 {@link EndUpdate}를 호출하여 한 번에 반영합니다.
   * 
   *
  */
  BeginUpdate(): void;

  /** 
   * 외부에 정의된 메서드를 호출합니다.
   * 
   *
  * @param name 호출할 메서드 이름
  * @param valuelist 파라미터 배열 (예: `[{KEY:"이름", VALUE:"값"}]`)
  * @hidden
  */
  CallExtentionFunc(name: string, valuelist: Array<{KEY: string, VALUE: string}>): void;

  /** 
   * RestAPI를 호출합니다.
   * 
   *
  * @param url REST API URL
  * @param req 요청 파라미터 객체
  * @param callback 실행 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, Result}`)
  */
  CallRestAPI(url: string, req: object, callback: (p: {"Success":boolean, "Message":string, "Result":any}) => void): void;

  /** 
   * 화면상의 모든 대화상자를 닫습니다.
   * 
   * @hidden
  */
  Clear(): void;

  /** 
   * 화면상의 모든 대화상자를 닫습니다.
   * 
  */
  CloseAllMessageBox(): void;

  /** 
   * 사용자 정의 컨텍스트 메뉴를 초기화합니다.
   * 
   *
  */
  ClearContextMenu(): void;

  /** 
   * 컨트롤의 데이터셋을 삭제합니다.
   *
  * @param names 대상 컨트롤 이름. 콤마 구분 문자열 또는 배열. `"*.*"`로 전체, `"Form1.*"`로 특정 폼 전체 선택 가능
  * 
  */
  ClearDataSet(names: string|string[]): void;

  /**
   * 전역 쿼리 파라미터 값 객체의 목록을 삭제합니다.
   *
   *
   * @example
   * ```js
   * // 전역 파라미터 설정 → 서버 스크립트 호출 → 파라미터 정리
   * Matrix.AddGlobalParams("VS_USER_ID", "admin", 1);
   * Matrix.AddGlobalParams("VS_ACTION", "EXPORT", 1);
   *
   * Matrix.RunScript("DataGrid", "EXPORT_REPORT", function(p) {
   *     // 서버 호출 후 전역 파라미터 정리
   *     Matrix.ClearGlobalParams();
   *
   *     if (p.Success == false) {
   *         Matrix.Alert(p.Message);
   *         return;
   *     }
   *     var row = p.DataSet.GetTable(0).GetRow(0);
   *     Matrix.DownloadFile(row.GetValue("FolderName"), row.GetValue("FileName"), "export.xlsx", true);
   * });
   * ```
  */
  ClearGlobalParams(): void;

  /**
   * 사용자에게 확인 대화 상자를 보여줍니다
   *
   *
   * @example
   * ```js
   * // 삭제 확인 (예/아니오)
   * Matrix.Confirm("선택한 데이터를 삭제하시겠습니까?", "삭제 확인", function(ok) {
   *     if (ok) {
   *         Matrix.RunScript("DataGrid", "DELETE_DATA", function(p) {
   *             if (p.Success == false) {
   *                 Matrix.Alert(p.Message);
   *                 return;
   *             }
   *             Matrix.Alert("삭제 완료");
   *             Matrix.doRefresh("DataGrid");
   *         });
   *     }
   * }, 0);  // 0: 예/아니오
   *
   * // 저장 확인 (확인/취소)
   * Matrix.Confirm("변경 사항을 저장하시겠습니까?", "저장", function(ok) {
   *     if (ok) {
   *         Matrix.RunScript("DataGrid", "SAVE_DATA", function(p) {
   *             if (p.Success) Matrix.Alert("저장 완료");
   *         });
   *     }
   * }, 1);  // 1: 확인/취소
   * ```
  * @param msg 메시지
  * @param title 대화 상자 제목
  * @param callback 확인/취소 버튼 클릭 후 호출되는 콜백 함수. `ok`가 `true`이면 확인/예 클릭
  * @param buttonType 버튼 유형 (0: 예/아니오, 1: 확인/취소). 생략 시 기본값 적용
  */
  Confirm(msg: string, title: string, callback: (ok: boolean) => void, buttonType: number): void;

  /** 
   * 사용자에게 확인 대화 상자를 보여줍니다.
   * 
   * close 동작 시에 callback 으로 null 을 전달합니다.
   * 
   *
   * @example
   * ```js
   * // 저장 여부 확인 (예/아니오/닫기 3가지 분기 처리)
   * Matrix.ConfirmWithClose("변경된 데이터를 저장하시겠습니까?", "저장 확인", function(ok) {
   *     if (ok === true) {
   *         // '예' 클릭 → 저장 후 데이터 조회
   *         Matrix.RunScript("DataGrid", "SAVE_DATA", function(p) {
   *             if (p.Success == false) {
   *                 Matrix.Alert(p.Message);
   *                 return;
   *             }
   *             Matrix.doRefresh("DataGrid");
   *         });
   *     } else if (ok === false) {
   *         // '아니오' 클릭 → 저장하지 않고 데이터 조회
   *         Matrix.doRefresh("DataGrid");
   *     } else if (ok === null) {
   *         // 닫기(X) 또는 Esc → 현재 화면 유지 (아무 동작 없음)
   *     }
   * }, 0);  // 0: 예/아니오
   * ```
  * @param msg 메시지
  * @param title 대화 상자 제목
  * @param callback 확인/취소/닫기 후 호출되는 콜백 함수. `true`: 확인(예), `false`: 취소(아니오), `null`: 닫기(Esc)
  * @param buttonType 버튼 유형 (0: 예/아니오, 1: 확인/취소). 생략 시 기본값 0
  */
  ConfirmWithClose(msg: string, title: string, callback: Function, buttonType?: number): void;

  /** 
   * Style 객체를 BackColor 객체로 변환합니다.
   * 
   *
  * @param style Style 객체
  * @hidden
  */
  ConvertToBackColor(style?: Style): any;

  /**
   * RichTextBox 컨트롤에 CodeMirror 에디터를 생성합니다.
   *
   *
   * @example
   * ```js
   * // JavaScript 모드 (기본)
   * Matrix.CreateCodeMirror("RichTextBox", function(editor) {
   *     editor.setValue("var x = 1;");
   *     // editor는 CodeMirror 인스턴스
   *     // editor.getValue()로 값 조회 가능
   * }, "javascript");
   *
   * // SQL 모드
   * Matrix.CreateCodeMirror("RichTextBox", function(editor) {
   *     editor.setValue("SELECT * FROM TABLE1");
   * }, "sql");
   *
   * // 옵션 객체로 상세 설정
   * Matrix.CreateCodeMirror("RichTextBox", function(editor) {
   *     editor.setValue("// 코드 입력");
   * }, {
   *     mode: "javascript",
   *     theme: "eclipse",
   *     lineNumbers: true,
   *     lineWrapping: true,
   *     keywords: ["Sum", "Average", "Count", "Max", "Min"]
   * });
   * ```
  * @param richTextBoxName RichTextBox 컨트롤 이름
  * @param callback CodeMirror 인스턴스 생성 완료 후 호출되는 콜백 함수
  * @param mode 에디터 모드. 문자열(`"javascript"`, `"sql"`) 또는 CodeMirror 옵션 객체
  * @hidden
  */
  CreateCodeMirror(richTextBoxName: string, callback: Function, mode: string | object): void;

  /**
   * 새로운 사용자 정의 컨텍스트 메뉴의 하위 아이템을 생성합니다.
   *
   *
   * @example
   * ```js
   * // 부모 메뉴 생성
   * var parentMenu = Matrix.CreateContextMenuItem("데이터 관리", function() {});
   * Matrix.AddContextMenu(parentMenu);
   *
   * // 부모 메뉴의 Id를 사용하여 하위 메뉴 생성
   * var child1 = Matrix.CreateContextMenuChildItem(parentMenu.Id, "행 추가", function() {
   *     var grid = Matrix.getObject("DataGrid");
   *     grid.AddRow();
   * });
   * Matrix.AddContextMenu(child1);
   *
   * var child2 = Matrix.CreateContextMenuChildItem(parentMenu.Id, "행 삭제", function() {
   *     var grid = Matrix.getObject("DataGrid");
   *     grid.DeleteRow();
   * });
   * Matrix.AddContextMenu(child2);
   * ```
  * @param parentId 부모 컨텍스트 메뉴 아이템의 ID
  * @param name 메뉴 아이템 표시 이름
  * @param callbackFunc 메뉴 클릭 시 실행되는 콜백 함수
  */
  CreateContextMenuChildItem(parentId: string, name: string, callbackFunc: Function): ContextMenuItem;

  /**
   * 새로운 사용자 정의 컨텍스트 메뉴 아이템을 생성합니다.
   *
   *
   * @example
   * ```js
   * // 기본 메뉴 아이템 생성 및 추가
   * var menuItem = Matrix.CreateContextMenuItem("조회", function() {
   *     Matrix.doRefresh("DataGrid");
   * });
   * Matrix.AddContextMenu(menuItem);
   *
   * // 비활성 상태의 메뉴 아이템
   * var disabledMenu = Matrix.CreateContextMenuItem("저장(권한 없음)", function() {});
   * disabledMenu.isDisabled = true;
   * Matrix.AddContextMenu(disabledMenu);
   * ```
  * @param name 메뉴 아이템 표시 이름
  * @param callbackFunc 메뉴 클릭 시 실행되는 콜백 함수
  */
  CreateContextMenuItem(name: string, callbackFunc: Function): ContextMenuItem;

  /** 
   * 데이터셋을 생성합니다.
   * 
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
  * @param columns 컬럼 이름 배열
  * @param rows 행 데이터. 단일 컬럼이면 1차원 배열, 다중 컬럼이면 2차원 배열
  */
  CreateDataSet(tableName?: string, columns?: string[], rows?: Array<any>|Array<Array<any>>): DataSet;

  /**
   * 컨트롤을 동적으로 생성합니다.
   *
   *
   * @example
   * ```js
   * // 버튼 생성
   * var btn = Matrix.CreateObject(4, "btnSave");  // 4: Button
   * btn.Text = "저장";
   * btn.OnClick = function(s, e) {
   *     Matrix.RunScript("DataGrid", "SAVE_DATA", function(p) {
   *         if (p.Success) Matrix.Alert("저장 완료");
   *     });
   * };
   *
   * // 텍스트박스 생성
   * var txt = Matrix.CreateObject(5, "txtSearch");  // 5: TextBox
   * txt.Text = "";
   *
   * // 데이터그리드 생성
   * var grid = Matrix.CreateObject(19, "DynamicGrid");  // 19: DataGrid
   *
   * // 라벨 생성
   * var lbl = Matrix.CreateObject(3, "lblTitle");  // 3: Label
   * lbl.Text = "제목";
   * ```
  * @param type 컨트롤 타입 (0:MultiComboBox, 1:ComboBox, 2:PickList, 3:Label, 4:Button, 5:TextBox, 6:MaskTextBox, 7:NumberBox, 8:RichTextBox, 9:RadioButton, 10:CheckBox, 11:Calendar, 19:DataGrid, 21:Chart 등)
  * @param controlName 컨트롤 이름 (생략 시 자동 생성)
  */
  CreateObject(type: enScriptControlType, controlName?: string): Control;

  /**
   * 두 컨트롤 사이에 Splitter를 생성합니다.
   *
   *
   * @example
   * ```js
   * // 좌우 분할: "LeftGrid"와 "RightGrid" 사이에 "SplitterCtrl"을 배치
   * Matrix.CreateSplitter("Col", "LeftGrid", "RightGrid", "SplitterCtrl");
   *
   * // 상하 분할: 여러 스플리터 컨트롤 지정
   * Matrix.CreateSplitter("Row", "TopGrid", "BottomGrid", ["Splitter1", "Splitter2"]);
   * ```
  * @param direction 방향 (`"Row"`: 상하 분할, `"Col"`: 좌우 분할)
  * @param firstControlName 첫 번째(상단/좌측) 컨트롤 이름
  * @param secondControlName 두 번째(하단/우측) 컨트롤 이름
  * @param splitterControlNames 스플리터로 사용할 컨트롤 이름 (문자열 또는 배열)
  * @param option 옵션
  * @hidden
  */
  CreateSplitter(direction: string, firstControlName: string, secondControlName: string, splitterControlNames: string | Array<string>, option?: object): Splitter;

  /**
   * 복수의 컨트롤을 좌우 또는 상하로 분할하는 Splitter를 생성합니다.
   *
   *
   * @example
   * ```js
   * // 좌우 분할: 좌측에 Grid, 우측에 Chart, "SplitterCtrl"로 분할
   * var splitter = Matrix.CreateSplitterEx("Col",
   *     ["DataGrid"],          // 좌측 컨트롤 목록
   *     ["Chart"],             // 우측 컨트롤 목록
   *     "SplitterCtrl"         // 스플리터 컨트롤
   * );
   *
   * // 상하 분할: 상단에 조건 영역, 하단에 그리드 영역
   * var splitter2 = Matrix.CreateSplitterEx("Row",
   *     ["Label1", "ComboBox1"],   // 상단 컨트롤 목록
   *     ["DataGrid"],              // 하단 컨트롤 목록
   *     "SplitterCtrl2"
   * );
   * ```
  * @param splitterType 방향 (`"Row"`: 상하 분할, `"Col"`: 좌우 분할)
  * @param leftControls 좌측(또는 상단)에 배치할 컨트롤 이름 배열
  * @param rightControls 우측(또는 하단)에 배치할 컨트롤 이름 배열
  * @param splitterControl 스플리터로 사용할 컨트롤 이름
  * @param option 옵션
  * @hidden
  */
  CreateSplitterEx(splitterType: string, leftControls: string[], rightControls: string[], splitterControl: string, option?: object): Splitter;

  /** 
   * portal 에서 다른 보고서를 탭 형식으로 열 수 있도록 하는 함수입니다. 
   * 
   * 두 번째 파라미터의 값이 true로 전달되면 기존에 열려 있는 탭을 재사용하고, 
   * 
   * false로 전달되면 새로운 탭에서 보고서를 열게 됩니다.
   * 
   *
   * @example
   * ```js
   * button.OnClick = function(s, e){
   * 	Matrix.CustomReportOpen(report_code, false);	// 새 탭으로 연다
   * };
   * ```
  * @param reportCode 보고서 코드
  * @param isRecycle `true`: 현재 탭 재사용, `false`: 새 탭에서 열기
  */
  CustomReportOpen(reportCode: string, isRecycle: boolean): void;

  /** 
   * Matrix Trace 창에 디버깅 메시지를 출력합니다.
   *
  * @param id 메시지 분류 구분자
  * @param msg 출력할 메시지
  * 
  */
  DebugWrite(id: string, msg: any): void;

  /**
   * 서버에 저장된 파일을 다운로드합니다.
   *
   *
   * @param folderName 서버의 폴더 경로
   * @param fileName 서버의 파일명
   * @param newFileName 사용자에게 저장될 파일명
   * @param isDelete 다운로드 후 서버 파일 삭제 여부
   *
   * @example
   * ```js
   * // 서버의 엑셀 파일을 다운로드 (다운로드 후 서버 파일 유지)
   * Matrix.DownloadFile("_TEMP_", "report_20240101.xlsx", "매출현황.xlsx", false);
   *
   * // 서버의 임시 파일을 다운로드 후 삭제
   * Matrix.DownloadFile("_TEMP_", "tmp_file_001.pdf", "출력결과.pdf", true);
   * ```
   */
  DownloadFile(folderName: string, fileName: string, newFileName: string, isDelete: boolean): void;

  /** 
   * OlapGrid의 DrillToDetail 정보를 대상 컨트롤에 전달하여 조회합니다.
   * 
   *
  * @param sender
  * OlapGrid
  * 
  * @param xml
  * DrillToDetail 정보
  * 
  * @param DataGridName
  * 대상 DataGrid 명
  * 
  * @param KeepOlapGridLayout
  * OlapGrid의 Layout을 유지할지 여부
  * 
   * @hidden
  */
  DrillToDetail(sender: OlapGrid, xml: string, DataGridName: string, KeepOlapGridLayout: boolean): void;

  /** 
   * {@link BeginUpdate}로 시작한 일괄 업데이트 작업을 종료하고, 변경 사항을 화면에 반영합니다.
   * 
   *
  */
  EndUpdate(): void;

  /** 
   * 사용자에게 오류 대화 상자를 표시합니다.
   *
  * @param msg 오류 메시지
  * @param detail 오류 상세 메시지
  * 
  */
  Error(msg: string, detail: string): void;

  /** 
   * 데이터 엑셀 내보내기 서비스를 호출합니다.(처리 완료 후 OnServiceCallBack 이벤트가 발생합니다.)
   * 
   *
  * @param json
  * 데이터 엑셀 내보내기 JSON 객체
  * 
  * @param params
  * parameters e.g.:[{'Key':'VS_CODE','Value':'100'},{'Key':'VS_NAME', 'Value':'JAMES'}]
  * 
  * @param tag
  * 구분자(tag)
  * 
   * @hidden
  */
  ExcelExportServiceCall(json: object, params: Array<{"Key":string,"Value":string}>, tag: any): void;

  /** 
   * 데이터 엑셀 내보내기 서비스를 호출합니다.
   * 
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
  * @param json WORKBOOK 구조의 내보내기 설정 객체
  * @param params 서버 조회 파라미터 배열. 불필요하면 `null`
  * @param callBack 내보내기 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, DataSet}`)
  */
  ExcelExportServiceCall(json: object, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 데이터소스를 실행합니다. 처리 완료 후 {@link OnExecuteCompleted} 이벤트가 발생합니다.
   *
  * @param dataSourceName 데이터소스 이름
  * @param tag 사용자 지정 구분자
  * 
   * @hidden
  */
  Execute(dataSourceName: string, tag: string): void;

  /**
   * 데이터소스를 실행합니다. 처리 완료 후 {@link OnExecuteCompleted} 이벤트가 발생합니다.
   *
   * @example
   * ```js
   * // 데이터소스 실행 후 결과를 그리드에 바인딩
   * Matrix.Execute("DS_EMPLOYEE", function(p) {
   *     if (p.Success == false) {
   *         Matrix.Alert(p.Message);
   *         return;
   *     }
   *     var dt = p.DataTable;
   *     Matrix.Alert("조회 건수: " + dt.GetRowCount() + "건");
   * });
   *
   * // 여러 데이터소스를 순차 실행
   * Matrix.Execute("DS_DEPT", function(p) {
   *     if (p.Success == false) {
   *         Matrix.Alert(p.Message);
   *         return;
   *     }
   *     // 부서 조회 완료 후 사원 조회
   *     Matrix.Execute("DS_EMPLOYEE", function(p2) {
   *         if (p2.Success) {
   *             Matrix.Alert("부서/사원 조회 완료");
   *         }
   *     });
   * });
   * ```
  * @param dataSourceName 데이터소스 이름
  * @param callBack 실행 완료 후 호출되는 콜백 함수. 인자 속성: `Success`, `Message`, `DataSet`, `DataTable`
  *
  */
  Execute(dataSourceName: string, callBack: Function): void;

  /** 
   * Prompt 조회조건이 있는 경우 MetaViewer Prompt 팝업창을 호출하고 없으면 조회합니다.
   * 
   *
  */
  ExecuteMetaViewPrompt(): void;

  /**
   * 실행 계획(Plan)을 실행합니다.(처리 완료 후 OnExecutCompleted 이벤트가 발생합니다.)
   *
   *
   * @example
   * ```js
   * // 실행 계획에 파라미터를 전달하여 실행
   * var params = [
   *     { 'Key': 'VS_DEPT_CODE', 'Value': 'D001' },
   *     { 'Key': 'VS_YEAR', 'Value': '2025' }
   * ];
   *
   * Matrix.ExecutePlan("PLAN_MONTHLY_REPORT", params, function(p) {
   *     if (p.Success == false) {
   *         Matrix.Alert(p.Message);
   *         return;
   *     }
   *     Matrix.Alert("정상적으로 처리하였습니다.");
   * });
   *
   * // 파라미터 없이 실행
   * Matrix.ExecutePlan("PLAN_REFRESH_ALL", null, function(p) {
   *     if (p.Success) {
   *         Matrix.doRefresh("DataGrid");
   *     }
   * });
   * ```
  * @param planName 실행 계획 이름
  * @param option 서버 파라미터 배열 (예: `[{Key:'VS_CODE',Value:'100'}]`). 불필요하면 `null`
  * @param callBack 실행 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, DataSet}`)
  */
  ExecutePlan(planName: string, option: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 데이터소스를 실행 합니다.(처리 완료 후 OnExecutCompleted 이벤트가 발생합니다.)
   * 
   *
  * @param planName 실행 계획 이름
  * @param option 서버 파라미터 배열
  * @param tag 사용자 지정 구분자
  * @hidden
  */
  ExecutePlan(planName: string, option: Array<{"Key":string,"Value":string}>, tag: any): void;

  /** 
   * 이미지 내보내기를 실행합니다.
   * 
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
  * @param controlNames 내보내기 대상 컨트롤 이름 배열. 빈 배열(`[]`)이면 전체 컨트롤
  * @param exportType 내보내기 파일 유형 (2:Excel, 3:HML, 4:PPT, 5:DOC, 6:PNG, 7:PDF)
  * @param option 내보내기 옵션 (`fileName`, `useDocHeaderTitle`, `useProgressBar`, `callbackFunc`)
  */
  ExportImageEx(controlNames: string[], exportType: enExportType, option: {fileName?: string, useDocHeaderTitle?: boolean, useProgressBar?: boolean, callbackFunc?: Function}): void;

  /** 
   * 팝업으로 내보내기 설정창을 표시합니다.
   * 
   *
  */
  ExportPopup(): void;

  /** 
   * 내보내기 서버를 통하여 특정 컨트롤의 데이터를 파일로 내보내기 합니다.
   * 
   * exportType가 없으면 기본값은 Excel로 출력됩니다.
   * 
   * ```
   * ※ 지원 가능 유형
   *  1) OlapGrid : Excel, CSV, Text
   *  2) DataGrid : Excel, CSV, Text, PPT
   *  3) Chart : Excel, PPT, HML, DOC
   *  4) MX-Grid : Excel, HTML, HML, DOC, PDF, PNG
   * ```
   * 
   *
  * @param controlName 컨트롤 이름
  * @param exportType 내보낼 파일 형식. 생략 시 Excel
  */
  ExportServiceCall(controlName: string, exportType: enExportType): void;

  /** 
   * AUD Base64 Image 정보를 반환합니다.
   * 
   *
  * @param key Base64 키
  * @hidden
  */
  GetAUDBase64ImageData(key?: string): string;

  /**
   * AUD 옵션의 값을 반환합니다.
   * 옵션 데이터 참조 페이지 : https://{AUD Server}/AUD/500/settingStudioConfig.jsp
   *
  * @param optionName 옵션 이름
  * @param defaultValue 옵션이 없을 경우 반환할 기본값
  */
  GetAUDOption(optionName: string, defaultValue: any): any;

  /** 
   * 보고서의 변수 목록(VS,VN,변수편집기,Global변수)을 모두 반환합니다.
   * 특정 파라미터의 이름을 찾는 경우 해당 목록에서 확인할 수 있습니다.
   *
  */
  GetAllVariables(): {[key: string]: any};

  /**
   * 해당 컨트롤의 PNG 타입 Base64 인코딩된 문자열을 반환합니다.
   *
   *
   * @param controlName Base64 Encoding 할 컨트롤 객체 이름
   * @param callback Encoding 완료 후 호출되는 콜백 함수. 인자 `value`에 Base64 문자열이 전달됩니다.
   *
   * @example
   * ```js
   * // Chart1 컨트롤을 Base64 이미지로 변환하여 Image 컨트롤에 표시
   * Matrix.GetBase64Encoding("Chart1", function(value) {
   *     var imgCtrl = Matrix.GetControl("Image1");
   *     imgCtrl.SetValue("data:image/png;base64," + value);
   * });
   *
   * // DataGrid1을 Base64로 변환하여 서버에 전송
   * Matrix.GetBase64Encoding("DataGrid1", function(value) {
   *     Matrix.CallRestAPI("/api/saveImage", { imageData: value }, function(res) {
   *         Matrix.Alert("이미지 저장 완료");
   *     });
   * });
   * ```
   */
  GetBase64Encoding(controlName: string, callback: (value:string) => void): string;

  /** 
   * 현재 BoxStyle의 목록을 반환합니다.
   * 
   *
  */
  GetBoxStyleList(): BoxStyleList;

  /** 
   * 현재 사용하는 브라우저 타입을 반환합니다.
   * 
   *
  */
  GetBrowserType(): enBrowserType;

  /** 
   * DataSet.maf 로 전달할 Packet 정보를 생성합니다.
   * 
   *
  * @param gridNames 데이터 전송 대상 그리드 이름. 콤마 구분 문자열 또는 배열
  * @hidden
  */
  GetDataSetMafPacket(gridNames: string|string[]): object;

  /**
   * 지정한 날짜와 시간으로 날짜 처리 객체를 반환합니다.
   *
  * @param year 년
  * @param month 월
  * @param day 일
  * @param hour 시
  * @param minutes 분
  * @param second 초
  */
  GetDate(year: number, month: number, day: number, hour: number, minutes: number, second: number): ScriptDateUtil;

  /**
   * 날짜 처리 객체를 반환합니다.(based time 00:00:00)
   *
   *
   * @example
   * ```js
   * // 오늘 날짜를 "yyyy-MM-dd" 형식으로 표시
   * var today = Matrix.GetDate();
   * Matrix.Alert(today.ToString("yyyy-MM-dd"));
   *
   * // 오늘 기준 7일 후 날짜 계산
   * var nextWeek = Matrix.GetDate().AddDays(7);
   * Matrix.Alert("7일 후: " + nextWeek.ToString("yyyy-MM-dd"));
   *
   * // 이번 달 1일 ~ 말일 구하기
   * var d = Matrix.GetDate();
   * var firstDay = Matrix.GetDate(d.Year, d.Month, 1);
   * var lastDay = Matrix.GetDate(d.Year, d.Month + 1, 1).AddDays(-1);
   * Matrix.Alert(firstDay.ToString("yyyy-MM-dd") + " ~ " + lastDay.ToString("yyyy-MM-dd"));
   *
   * // 두 날짜 비교
   * var date1 = Matrix.GetDate(2024, 6, 1);
   * var date2 = Matrix.GetDate(2024, 12, 31);
   * var result = date1.CompareTo(date2); // -1 (date1 < date2)
   * ```
   */
  GetDate(): ScriptDateUtil;

  /**
   * 지정한 연/월로 날짜 처리 객체를 반환합니다. (시간: 00:00:00)
   *
  * @param year 년
  * @param month 월
  */
  GetDate(year: number, month: number): ScriptDateUtil;

  /**
   * 지정한 날짜로 날짜 처리 객체를 반환합니다. (시간: 00:00:00)
   *
  * @param year 년
  * @param month 월
  * @param day 일
  */
  GetDate(year: number, month: number, day: number): ScriptDateUtil;

  /**
   * 지정한 날짜와 시간으로 날짜 처리 객체를 반환합니다.
   *
  * @param year 년
  * @param month 월
  * @param day 일
  * @param hour 시
  * @param minutes 분
  * @param second 초
  */
  GetDateTime(year: number, month: number, day: number, hour: number, minutes: number, second: number): ScriptDateUtil;

  /**
   * 날짜 처리 객체를 반환합니다. (현재 시각 포함)
   *
   *
   * @example
   * ```js
   * // 현재 날짜+시간을 "yyyy-MM-dd HH:mm:ss" 형식으로 표시
   * var now = Matrix.GetDateTime();
   * Matrix.Alert(now.ToString("yyyy-MM-dd HH:mm:ss"));
   *
   * // 현재 시각 기준 2시간 30분 후 계산
   * var later = Matrix.GetDateTime().AddHours(2).AddMinutes(30);
   * Matrix.Alert("2시간 30분 후: " + later.ToString("HH:mm:ss"));
   *
   * // GetDate()와의 차이: GetDate()는 00:00:00, GetDateTime()은 현재 시각 포함
   * var dateOnly = Matrix.GetDate();     // 2024-07-01 00:00:00
   * var dateTime = Matrix.GetDateTime(); // 2024-07-01 14:35:22
   * ```
   */
  GetDateTime(): ScriptDateUtil;

  /**
   * 지정한 연/월로 날짜 처리 객체를 반환합니다. (시간: 00:00:00)
   *
  * @param year 년
  * @param month 월
  */
  GetDateTime(year: number, month: number): ScriptDateUtil;

  /**
   * 지정한 날짜로 날짜 처리 객체를 반환합니다. (시간: 00:00:00)
   *
  * @param year 년
  * @param month 월
  * @param day 일
  */
  GetDateTime(year: number, month: number, day: number): ScriptDateUtil;

  /** 
   * ShowReportDialog로 호출된 팝업에서, 부모 보고서가 보내준 파라미터를 추출합니다.
   * 
   *
  */
  GetDialogRequestParams(): object | undefined;

  /**
   * i-AUD 내부에서 사용하는 enum 객체를 이름으로 가져옵니다.
   * 스크립트에서 매직넘버 대신 의미 있는 상수를 사용할 수 있습니다.
   *
   *
   * @param enumName enum 이름.
   * 사용 가능한 enum:
   * `enExportType`, `enKeyCodeType`, `enSortType`, `enReportType`,
   * `enProductMode`, `enDialogButtonType`, `enCheckBoxValueType`,
   * `enMetaMode`, `enMetaFieldCategory`, `enJoinType` 등
   *
   * @example
   * ```js
   * // 내보내기 타입 enum을 가져와서 Excel 내보내기 실행
   * var exportType = Matrix.GetEnum("enExportType");
   * if (exportType) {
   *     Matrix.Alert("Excel 값: " + exportType.Excel);  // 2
   *     Matrix.Alert("PDF 값: " + exportType.PDF);      // 7
   * }
   *
   * // 키코드 enum으로 특정 키 입력 판별
   * var keyCode = Matrix.GetEnum("enKeyCodeType");
   * // OnKeyDown 이벤트 등에서 활용
   * // if (args.KeyCode === keyCode.Enter) { ... }
   * ```
   */
  GetEnum(enumName: string): object | undefined;

  /**
   * 주어진 이름을 가진 폼 객체를 반환합니다.
   * 폼의 `Controls` 속성(NamedDictionary)을 통해 자식 컨트롤에 접근할 수 있습니다.
   *
   *
   * @param formName 폼 이름
   *
   * @example
   * ```js
   * // 폼의 모든 컨트롤 이름과 타입 출력
   * var form = Matrix.GetForm("Form1");
   * var controls = form.Controls;
   * for (var i = 0; i < controls.Count(); i++) {
   *     var ctrl = controls.GetByIndex(i);
   *     Matrix.DebugWrite("CTRL", ctrl.Name + " [" + ctrl.Type + "]");
   * }
   *
   * // Group 내부 컨트롤까지 재귀 순회
   * function traverseControls(controls, depth) {
   *     var indent = "";
   *     for (var d = 0; d < depth; d++) indent += "  ";
   *     for (var i = 0; i < controls.Count(); i++) {
   *         var ctrl = controls.GetByIndex(i);
   *         Matrix.DebugWrite("TREE", indent + ctrl.Name + " [" + ctrl.Type + "]");
   *         if (ctrl.Controls) {
   *             traverseControls(ctrl.Controls, depth + 1);
   *         }
   *     }
   * }
   * var form = Matrix.GetForm("Form1");
   * traverseControls(form.Controls, 0);
   * ```
   */
  GetForm(formName: string): Form;

  /**
   * GlobalConfig 정보를 반환합니다.
   * 서버 경로, 프로토콜 등 시스템 설정 값을 조회할 수 있습니다.
   *
   *
   * @example
   * ```js
   * var config = Matrix.GetGlobalConfig();
   *
   * // 컨텍스트 루트 경로
   * Matrix.DebugWrite("CTX", config.CONTEXT_PATH);          // 예: "server.com/iAUD"
   *
   * // 현재 프로토콜 (HTTP / HTTPS)
   * Matrix.DebugWrite("PROTOCOL", config.PROTOCOL);         // 예: "https"
   *
   * // REST API 호출 시 기본 URL 조합
   * var baseUrl = config.PROTOCOL + "://" + config.CONTEXT_PATH;
   * Matrix.DebugWrite("BASE", baseUrl);  // 예: "https://server.com/iAUD"
   * ```
   */
  GetGlobalConfig(): GlobalConfig;

  /** 
   * 지정한 이름의 전역 쿼리 파라미터 값을 반환합니다.
   *
  * @param name 파라미터 이름
  * 
  */
  GetGlobalParamValue(name: string): string;

  /** 
   * 전역 쿼리 파라미터 값 객체의 목록을 반환합니다.
   * 
   *
  */
  GetGlobalParams(): GlobalParam;

  /**
   * i-META Viewer의 조회 조건 정보를 조회합니다.
   *
   *
   * @param controlName 메타 데이터소스가 바인딩된 컨트롤명
   *
   */
  GetMetaConditions(controlName: string): Array<{"Name": string, "Operator": string, "Value": string[]}> | undefined;

  /** 
   * MetaDesigner의 Enum을 호출하는 함수
   * 
   *
   * @hidden
  */
  GetMetaDesignerEnum(): any;

  /** 
   * 컨트롤의 SQL Query를 조회합니다.
   * 
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
  * @param controlName 컨트롤 이름
  * @param callBack 실행 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, SQLText}`)
  */
  GetMetaExecuteQuery(controlName: string, callBack: (p: {"Success":boolean, "Message":string, "SQLText":string}) => void): void;

  /**
   * i-META Viewer의 조회 조건 정보를 조회합니다.
   * 실행 모드에 따라 반환 객체 구조가 다릅니다.
   * - 일반 모드: `{Label, Controls}` — Label 컨트롤명과 조건 컨트롤명 배열
   * - MetaFileView 모드: `{Name, Operator, Value}` — 조건명, 연산자, 값 배열
   *
   *
   * @param excludeConstCondition prompt 조회 조건 외의 조건 불포함 여부 (true: prompt 조건만 포함)\
   * 
   * @hidden
   *
   */
  GetMetaTemplateConditions(excludeConstCondition: boolean): Array<{Label: string, Controls: string[]} | {Name: string, Operator: string, Value: string[]}>;

  /** 
   * TableLayout이 없는 메타 템플릿의 layout 위치를 반환합니다.
   * 
   * @hidden
  */
  GetMetaTemplateLayoutTopValue(): number;

  /**
   * i-META 뷰어 매니저 객체를 반환합니다.
   * 반환된 MetaWizardManager를 통해 조회 조건 추가/삭제, 뷰 전환, 팝업 제어 등을 수행할 수 있습니다.
   *
   *
   * @example
   * ```js
   * var wizard = Matrix.GetMetaWizard();
   *
   * // 특정 뷰(V2) 활성화
   * wizard.Active("V2");
   *
   * // 조회 조건 값 설정 (V1 뷰의 "VS_DEPT_CD" 변수에 값 지정)
   * wizard.SetFilterValue("V1", "VS_DEPT_CD", "1000", "");
   *
   * // 현재 뷰의 모든 조회 조건 목록 조회
   * var filters = wizard.GetAllFilterItems("V1");
   * for (var i = 0; i < filters.length; i++) {
   *     Matrix.DebugWrite("FILTER", filters[i].Code + " = " + filters[i].Value);
   * }
   *
   * // 조회 조건 초기화 후 확인 버튼 트리거
   * wizard.ClearFilterItems("V1");
   * wizard.ExecuteButtonTrigger("OK");
   * ```
   */
  GetMetaWizard(): MetaWizardManager;

  /** 
   * 주어진 컨트롤의 선택값을 반환합니다.
   * 
   *
  * @param control 컨트롤 객체
  * @hidden
  */
  GetParamValue(control: Control): Array<any>;

  /**
   * 현재 보고서의 정보를 반환합니다.
   *
   *
   * @example
   * ```js
   * var info = Matrix.GetReportInfo();
   *
   * // 보고서 기본 정보 출력
   * Matrix.DebugWrite("RPT", "코드: " + info.CODE);    // 보고서 코드
   * Matrix.DebugWrite("RPT", "이름: " + info.NAME);    // 보고서 명
   * Matrix.DebugWrite("RPT", "설명: " + info.DESC);    // 보고서 설명
   * Matrix.DebugWrite("RPT", "폴더: " + info.PARENT);  // 상위 폴더 코드
   * Matrix.DebugWrite("RPT", "모듈: " + info.TYPE);    // 보고서 모듈코드
   *
   * // 보고서 코드를 파라미터로 활용
   * Matrix.AddGlobalParams("VS_RPT_CD", info.CODE, 1);
   * Matrix.RunScript("SubReport1", "doSearch");
   * Matrix.ClearGlobalParams();
   * ```
   */
  GetReportInfo(): ReportInfo;

  /** 
   * 스케줄 조회 조건을 조회합니다.
   * 
   *
  * @param isCondition 스케줄 예약 실행 여부 (`true`: 예약 실행)
  * @hidden
  */
  GetScheduleCondition(isCondition: boolean): any;

  /** 
   * 스케줄 실행 layout을 조회합니다.
   * 
   *
  * @param workbook 엑셀 내보내기 레이아웃
  * @param isCondition 스케줄 예약 실행 여부 (`true`: 예약 실행)
  * @hidden
  */
  GetScheduleParam(workbook: any, isCondition: boolean): any;

  /** 
   * 메타 템플릿 사용을 위해 메타 데이터소스 매니저의 TemplateMetaData를 반환합니다.
   * 
   * @hidden
   *
  */
  GetTemplateMetaData(): MetaDataSource;

  /**
   * 현재 접속한 사용자의 정보를 반환합니다.
   *
   * **주의:** 이 정보는 화면 표시 용도로만 사용하십시오.
   * 권한 검증이나 SQL 조회 조건 등 보안이 필요한 처리에서는
   * 클라이언트에서 전달된 사용자 정보를 신뢰하지 말고,
   * 반드시 서버 측 세션 변수(예: `USER_CODE`, `ORG_CODE`, 'USER_ROLE')를 사용해야 합니다.
   *
   *
   * @example
   * ```js
   * var user = Matrix.GetUserInfo();
   *
   * // 사용자 정보 표시 (화면 표시 용도)
   * Matrix.DebugWrite("USER", "코드: " + user.UserCode);
   * Matrix.DebugWrite("USER", "이름: " + user.UserName);
   * Matrix.DebugWrite("USER", "부서: " + user.DeptCode + " (" + user.DeptPath + ")");
   * Matrix.DebugWrite("USER", "권한: " + user.UserRole);
   * Matrix.DebugWrite("USER", "언어: " + user.LangCode);
   * Matrix.DebugWrite("USER", "IP: " + user.IPAddress);
   *
   * // 화면 제목에 사용자명 표시
   * var label = Matrix.GetControl("LabelTitle");
   * label.Text = user.UserName + "님의 업무 현황";
   *
   * // 권한별 UI 분기 (표시 용도)
   * if (user.UserRole === "ADMIN") {
   *     Matrix.GetControl("BtnDelete").Visible = true;
   * }
   * // ※ SQL 조건에는 세션 변수 VS_USER_ID를 사용할 것
   * ```
   */
  GetUserInfo(): UserInfo;

  /** 
   * 특정 변수의 값을 반환합니다.
   *
  * @param name 변수 이름
  * 
  */
  GetVariable(name: string): string;

  /** 
   * 변수편집기를 통해 등록한 변수 목록을 반환합니다.
   */
  GetVariables(): Variable[];

  /** 
   * 컨트롤 데이터를 한글(HML) 형식으로 내보내기합니다.
   * 
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
  * @param json WORKBOOK 구조의 내보내기 설정 객체
  * @param params 서버 조회 파라미터 배열. 불필요하면 `null`
  * @param callBack 내보내기 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, DataSet}`)
  */
  HMLExportServiceCall(json: object, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 컨트롤 데이터를 웹(HTML) 형식으로 내보내기합니다.
   * 
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
  * @param json WORKBOOK 구조의 내보내기 설정 객체
  * @param params 서버 조회 파라미터 배열. 불필요하면 `null`
  * @param callBack 내보내기 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, DataSet}`)
  */
  HTMLExportServiceCall(json: object, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /**
   * 현재 문서에 외부 CSS 파일을 동적으로 추가합니다.
   * 로드 완료 후 콜백 함수가 호출됩니다.
   *
   *
   * @param cssfiles 로드할 CSS 파일 경로 배열
   * @param callback CSS 로드 완료 후 호출되는 함수
   *
   * @example
   * ```js
   * // 단일 CSS 파일 로드
   * Matrix.ImportCSS(["/custom/styles/report.css"], function() {
   *     Matrix.DebugWrite("CSS", "스타일 로드 완료");
   * });
   *
   * // 복수 CSS 파일 로드
   * Matrix.ImportCSS([
   *     "/custom/styles/grid-theme.css",
   *     "/custom/styles/chart-theme.css"
   * ], function() {
   *     Matrix.DebugWrite("CSS", "테마 로드 완료");
   * });
   * ```
   */
  ImportCSS(cssfiles: string[], callback: Function): void;

  /**
   * 현재 문서에 외부 JavaScript 파일을 동적으로 추가합니다.
   * 로드 완료 후 콜백 함수가 호출되므로, 로드된 라이브러리는 콜백 내에서 사용해야 합니다.
   *
   *
   * @param scriptfiles 로드할 JS 파일 경로. 단일 문자열 또는 배열
   * @param callback 스크립트 로드 완료 후 호출되는 함수
   *
   * @example
   * ```js
   * // 단일 스크립트 로드 후 사용
   * Matrix.ImportScript("/custom/lib/utils.js", function() {
   *     // utils.js에 정의된 함수 사용 가능
   *     Matrix.DebugWrite("JS", "유틸 로드 완료");
   * });
   *
   * // 복수 스크립트 순차 로드
   * Matrix.ImportScript([
   *     "/custom/lib/chart-plugin.js",
   *     "/custom/lib/export-helper.js"
   * ], function() {
   *     // 모든 스크립트 로드 완료 후 실행
   *     Matrix.DebugWrite("JS", "플러그인 로드 완료");
   * });
   * ```
   */
  ImportScript(scriptfiles: string|string[], callback: Function): void;

  /** 
   * 사용자에게 정보 대화 상자를 표시합니다.
   *
  * @param msg 표시할 메시지
  * @param title 대화 상자 제목
  * @param callback 대화 상자가 닫힌 뒤 호출되는 함수
  * 
  */
  Information(msg: string, title?: string, callback?: Function): void;

  /**
   * 지정한 보고서를 현재 화면에 로드합니다.
   * 현재 보고서가 대상 보고서로 교체되며, 파라미터를 전달할 수 있습니다.
   * 대상 보고서에서는 `GetVariable`로 전달된 파라미터 값을 조회할 수 있습니다.
   *
   *
   * @param id 보고서 코드
   * @param params 대상 보고서로 전달할 파라미터 배열. 전달할 값이 없으면 `null`
   *
   * @example
   * ```js
   * // 파라미터 없이 보고서 이동
   * Matrix.LoadDocument("RPT_MAIN_DASHBOARD", null);
   *
   * // 파라미터를 전달하여 보고서 이동
   * Matrix.LoadDocument("RPT_ORDER_DETAIL", [
   *     { KEY: "VS_ORDER_NO", VALUE: "ORD-2024-001" },
   *     { KEY: "VS_DEPT_CD",  VALUE: "1000" }
   * ]);
   *
   * // 그리드 선택 행의 값을 파라미터로 전달
   * var grid = Matrix.GetControl("DataGrid1");
   * var row = grid.GetCurrentRow();
   * Matrix.LoadDocument("RPT_EMP_DETAIL", [
   *     { KEY: "VS_EMP_CD", VALUE: row.GetValue("EMP_CD") }
   * ]);
   * ```
   */
  LoadDocument(id: string, params: Array<{KEY: string, VALUE: string}> | null): void;

  /** 
   * 컨트롤의 데이터소스가 i-META일 경우 자동으로 i-META 조회 조건 컨트롤을 생성합니다.
   * 
   *
  * @param options 그룹 사용 여부, 조회 조건 컨트롤의 시작 위치, 라벨 스타일 등
  * @hidden
  */
  MakeMetaFilterControls(options: any): void;

  /**
   * 현재 화면의 컨트롤을 PDF 형식으로 서버에서 생성한 뒤, 콜백을 통해 다운로드합니다.
   *
   * WORKBOOK JSON으로 워크시트 구성(헤더 텍스트, 대상 컨트롤, 배치 위치 등)을 정의하고,
   * 콜백에서 `DownloadFile`을 호출하여 생성된 PDF를 다운로드합니다.
   *
   *
   * @param json WORKBOOK 구조의 내보내기 설정 객체 (FontName, FontSize, WorkSheets 등)
   * @param params 서버 조회 시 전달할 파라미터 배열. 불필요하면 `null`
   * @param callBack 서버 내보내기 완료 후 호출되는 콜백 함수.
   * 콜백 인자 속성:
   * - `p.Success` : 성공 여부
   * - `p.Message` : 실패 시 오류 메시지
   * - `p.DataSet` : 결과 DataSet (Table(0)에 FolderName, FileName 포함)
   *
   * @example
   * ```js
   * var gridName = "DataGrid1";
   * var WORKBOOK = {
   *     "FontName": "맑은 고딕",
   *     "FontSize": 11,
   *     "WorkSheets": [
   *         {
   *             "Name": gridName,
   *             "DisplayGridlines": "false",
   *             "Ranges": [
   *                 { "Range": "A1", "Value": "■ 보고서: " + Matrix.GetReportInfo().NAME, "ColSpan": 5 },
   *                 { "Range": "A2", "Value": "■ 출력자: " + Matrix.GetUserInfo().UserName, "ColSpan": 5 },
   *                 { "Range": "A3", "Value": "■ 출력일: " + Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss"), "ColSpan": 5 }
   *             ],
   *             "Controls": [
   *                 { "Name": gridName, "Range": "A5" }
   *             ]
   *         }
   *     ]
   * };
   *
   * var exportName = Matrix.GetReportInfo().NAME
   *     + "_" + Matrix.GetDateTime().ToString("yyyy-MM-dd_HHmmss") + ".pdf";
   *
   * Matrix.PDFExportServiceCall(WORKBOOK, null, function(e) {
   *     if (!e.Success) {
   *         Matrix.Alert("내보내기 실패: " + e.Message);
   *         return;
   *     }
   *     var row = e.DataSet.GetTable(0).GetRow(0);
   *     Matrix.DownloadFile(row.GetValue("FolderName"), row.GetValue("FileName"), exportName, true);
   * });
   * ```
   */
  PDFExportServiceCall(json: object, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 서버에 저장된 PDF 파일을 브라우저의 인쇄 기능을 이용하여 인쇄합니다.
   * `PDFExportServiceCall`로 생성된 PDF를 다운로드 대신 바로 인쇄할 때 사용합니다.
   *
   * **참고:** 보안상 `folderName`이 빈 값이면 서버의 `_TEMP_` 폴더로 고정됩니다.
   *
   *
   * @param folderName 서버의 PDF 파일 폴더 경로. 빈 값이면 `_TEMP_` 경로로 설정됩니다.
   * @param fileName 서버의 PDF 파일명
   * @param isDel 인쇄 후 서버 파일 삭제 여부 (`true`: 삭제(기본), `false`: 유지)
   * @param option 인쇄 미리보기 창의 window.open 옵션 문자열.
   * 빈 값이면 기본값 적용: `toolbar=no,scrollbars=yes,resizable=yes,top=10,left=10,width=780,height=800`
   *
   * @example
   * ```js
   * // PDFExportServiceCall로 생성한 PDF를 바로 인쇄
   * Matrix.PDFExportServiceCall(WORKBOOK, null, function(e) {
   *     if (!e.Success) {
   *         Matrix.Alert("PDF 생성 실패: " + e.Message);
   *         return;
   *     }
   *     var row = e.DataSet.GetTable(0).GetRow(0);
   *     var folderName = row.GetValue("FolderName");
   *     var fileName = row.GetValue("FileName");
   *
   *     // 인쇄 후 서버 파일 삭제, 기본 옵션 사용
   *     Matrix.PrintPDF(folderName, fileName, true, "");
   * });
   *
   * // 인쇄 미리보기 창 크기 지정
   * Matrix.PrintPDF(folderName, fileName, true,
   *     "toolbar=no,scrollbars=yes,resizable=yes,top=50,left=50,width=1024,height=768");
   * ```
   */
  PrintPDF(folderName: string, fileName: string, isDel: boolean, option: string): void;

  /**
   * `ShowReportDialog`로 열린 팝업 보고서에서, 닫히기 직전에 실행될 콜백 함수를 등록합니다.
   * 콜백 함수의 `return` 값이 부모 보고서의 `ShowReportDialog` 콜백(`ReportDialogResult`)으로 전달됩니다.
   *
   * 팝업 보고서의 초기화 동작에서 등록하며, 사용자가 확인/취소/닫기 버튼을 클릭하면 등록된 함수가 호출됩니다.
   *
   *
   * @param callbackFunction 팝업이 닫힐 때 호출되는 함수.
   * - `sender` : Dialog 객체
   * - `args.Cancel` : 취소 버튼 클릭 여부 (boolean)
   * - `args.Close` : 닫기 버튼 클릭 여부 (boolean)
   * - `args.Type` : 클릭된 버튼 유형 (string)
   * - `return` : 부모 보고서로 전달할 결과 객체. `{IsCancel: true}`를 반환하면 결과가 전달되지 않음
   *
   * @example
   * ```js
   * // [팝업 보고서] 초기화 시 콜백 핸들러 등록
   * Matrix.RegisterDialogCallbackHandler(function(sender, args) {
   *     if (args.Cancel || args.Close) {
   *         // 취소 또는 닫기 → 부모에 결과 전달하지 않음
   *         return { IsCancel: true };
   *     }
   *     // 확인 또는 적용 → 부모에 결과 전달
   *     var grid = Matrix.GetControl("DataGrid1");
   *     var row = grid.GetCurrentRow();
   *     return {
   *         IsCancel: false,
   *         EmpCode: row.GetValue("EMP_CD"),
   *         EmpName: row.GetValue("EMP_NM")
   *     };
   * });
   *
   * // [부모 보고서] ShowReportDialog에서 결과 수신
   * // Matrix.ShowReportDialog("POPUP_RPT", ..., function(result) {
   * //     if (!result.IsCancel) {
   * //         Matrix.GetControl("TextBox1").SetValue(result.EmpCode);
   * //     }
   * // });
   * ```
   */
  RegisterDialogCallbackHandler(callbackFunction: Function): void;

  /**
   * `AddGlobalParams`로 추가한 전역 파라미터를 이름으로 개별 삭제합니다.
   * 전체 삭제는 `ClearGlobalParams`를 사용하십시오.
   *
   *
   * @param name 삭제할 전역 파라미터명 (예: `"VS_DEPT_CD"`)
   *
   * @example
   * ```js
   * // 특정 파라미터만 선택 삭제
   * Matrix.AddGlobalParams("VS_DEPT_CD", "1000", 1);
   * Matrix.AddGlobalParams("VS_EMP_CD", "E001", 1);
   * Matrix.RunScript("SubReport1", "doSearch");
   *
   * // VS_DEPT_CD만 제거하고 VS_EMP_CD는 유지
   * Matrix.RemoveGlobalParams("VS_DEPT_CD");
   * ```
   */
  RemoveGlobalParams(name: string): void;

  /** 
   * 컨트롤을 삭제합니다.
   * 
   *
  * @param arrNames 삭제할 컨트롤 이름 배열
  */
  RemoveObject(arrNames: string[]): void;

  /** 
   * `ShowReportDialog`로 열린 팝업 보고서에서, 부모 보고서로 결과 데이터를 전달합니다.
   * 전달된 데이터는 부모의 `ShowReportDialog` 콜백 함수(`callBack`)의 인자로 수신됩니다.
   *
   * `RegisterDialogCallbackHandler`와 달리, 팝업이 닫히기 전 원하는 시점에
   * 직접 호출하여 결과를 전달할 수 있습니다.
   *
   *
   * @param params 부모 보고서로 전달할 결과 객체
   * @param close 결과 전달 후 팝업 닫힘 여부 (`true`: 닫기, `false`: 유지)
   * @param type 결과 유형 (생략 시 `"OK"` 기본값)
   *
   * @example
   * ```js
   * // [팝업 보고서] 선택한 데이터를 부모에 전달하고 팝업 닫기
   * var grid = Matrix.GetControl("DataGrid1");
   * var row = grid.GetCurrentRow();
   * Matrix.ReportDialogResult({
   *     EmpCode: row.GetValue("EMP_CD"),
   *     EmpName: row.GetValue("EMP_NM")
   * }, true, "OK");
   *
   * // [팝업 보고서] 결과 전달 후 팝업을 닫지 않고 유지
   * Matrix.ReportDialogResult({ Status: "APPLIED" }, false, "Apply");
   *
   * // [부모 보고서] ShowReportDialog 콜백에서 결과 수신
   * // Matrix.ShowReportDialog("POPUP_RPT", null, options, function(result) {
   * //     Matrix.GetControl("TextBox1").SetValue(result.EmpCode);
   * // });
   * ```
   */
  ReportDialogResult(params: any, close: boolean, type: string): void;

  /** 
   * 데이터 내보내기 서비스를 호출합니다.(처리 완료 후 OnServiceCallBack 이벤트가 발생합니다.)
   * 
   *
  * @param json 내보내기 설정 JSON 객체
  * @param params 서버 조회 파라미터 배열. 불필요하면 `null`
  * @param tag 사용자 지정 구분자
  * @param type 내보낼 파일 형식
  * @hidden
  */
  ReportExport(json: object, params: Array<{"Key":string,"Value":string}> | null, tag: any, type: enExportType): void;

  /** 
   * 데이터 내보내기 서비스를 호출합니다.
   *
  * @param json 내보내기 설정 JSON 객체
  * @param params 서버 조회 파라미터 배열. 불필요하면 `null`
  * @param callBack 내보내기 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, DataSet}`)
  * @param type 내보낼 파일 형식
  * 
  */
  ReportExport(json: object, params: Array<{"Key":string,"Value":string}> | null, callBack: Function, type: enExportType): void;

  /** 
   * 문서 전체를 크기를 재계산합니다.
   * 
   *
  */
  Resize(): void;

  /** 
   * 서버 측 js Business 서비스를 호출합니다. (처리 완료 후 OnServiceCallBack 이벤트가 실행됩니다.)
   * 
   *
  * @param gridNames 데이터 전송 대상 그리드 이름. 콤마 구분 문자열 또는 배열
  * @param scriptName 서버 스크립트 이름
  * @param tag 사용자 지정 구분자
  * @hidden
  */
  RunScript(gridNames: string|string[], scriptName: string, tag: any): void;

  /**
   * 서버 측 JavaScript 서비스를 호출합니다.
   * 그리드의 입력/수정/삭제 데이터를 서버로 전송하고, 서버 스크립트 실행 후 결과를 콜백으로 수신합니다.
   *
   *
   * @param gridNames 서버로 전송할 그리드 이름. 전송할 데이터가 없으면 `""`.
   * 복수 그리드는 콤마 구분 문자열(`"Grid1,Grid2"`) 또는 배열(`["Grid1","Grid2"]`)
   * @param scriptName 서버 스크립트 이름.
   * - 현재 보고서의 스크립트: `"doSave"`
   * - 서버 공용 스크립트: `"@COMMON_UTIL"` (SERVER_SCRIPT 폴더 탐색)
   * - 다른 보고서의 스크립트: `"@보고서코드@스크립트코드"`
   * @param callBack 서버 처리 완료 후 호출되는 콜백 함수.
   * 콜백 인자 속성:
   * - `p.Success` : 성공 여부
   * - `p.Message` : 실패 시 오류 메시지
   * - `p.DataSet` : 서버에서 반환한 DataSet
   *
   * @example
   * ```js
   * // 현재 보고서의 서버 스크립트 호출 (그리드 데이터 전송)
   * Matrix.RunScript("DataGrid1", "doSave", function(p) {
   *     if (!p.Success) {
   *         Matrix.Alert("저장 실패: " + p.Message);
   *         return;
   *     }
   *     Matrix.Alert("저장 완료");
   *     Matrix.Execute("DS_LIST");
   * });
   *
   * // 그리드 데이터 없이 서버 스크립트 호출
   * Matrix.RunScript("", "doSearch", function(p) {
   *     if (!p.Success) { return; }
   *     var ds = p.DataSet;
   *     var table = ds.GetTable(0);
   *     Matrix.DebugWrite("CNT", "조회 건수: " + table.GetRowCount());
   * });
   *
   * // 다른 보고서의 서버 스크립트 호출
   * Matrix.RunScript("", "@RPT_COMMON@SEND_MAIL", function(p) {
   *     if (!p.Success) {
   *         Matrix.Alert(p.Message);
   *         return;
   *     }
   *     Matrix.Alert("메일 발송 완료");
   * });
   * ```
   */
  RunScript(gridNames: string|string[], scriptName: string, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 서버 측 js Business 서비스를 호출합니다.
   * 
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
  * @param gridNames 데이터 전송 대상 그리드 이름. 전송할 데이터가 없으면 `""`. 콤마 구분 문자열 또는 배열
  * @param scriptName 서버 스크립트 이름.
  * - 현재 보고서: `"doSave"` / 서버 공용: `"@COMMON_UTIL"` / 다른 보고서: `"@보고서코드@스크립트코드"`
  * @param params 서버로 전달할 파라미터 객체 (예: `{VS_CODE:'100', VS_NAME:'PC'}`)
  * @param callBack 실행 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, DataSet}`)
  */
  RunScriptEx(gridNames: string|string[], scriptName: string, params: {[key:string]:any}, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 뷰어의 Excel Export 대화 상자를 표시합니다.
   * 
   *
  */
  SaveExcel(): void;

  /**
   * 보고서를 저장합니다.
   *
  * @param reportCode 보고서 코드
  * @param reportName 보고서 이름
  * @param folderCode 보고서를 저장할 폴더 코드
  * @param reportDesc 보고서 설명
  */
  SaveReport(reportCode: string, reportName: string, folderCode: string, reportDesc: string): void;

  /** 
   * 서버측 서비스를 호출합니다.(처리 완료 후 OnServiceCallBack 이벤트가 발생합니다.)
   * 
   *
  * @param gridNames 데이터 전송 대상 그리드 이름. 콤마 구분 문자열 또는 배열
  * @param className 서버 서비스 클래스 이름
  * @param params 서버 조회 파라미터 배열
  * @param tag 사용자 지정 구분자
  * @hidden
  */
  ServiceCall(gridNames: string|string[], className: string, params: Array<{"Key":string,"Value":string}>, tag: any): void;

  /** 
   * 서버측 서비스를 호출합니다.
   * 
   *
   * @example
   * ```js
   * //서버에 업로드된 파일을 읽어서 데이터 테이블로 반환합니다.
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
  * @param gridNames 데이터 전송 대상 그리드 이름. 콤마 구분 문자열 또는 배열
  * @param className 서버 서비스 클래스 이름 (예: `com.matrix.Data.BizExecuteDML`)
  * @param params 서버 조회 파라미터 배열 (예: `[{Key:'VS_CODE',Value:'100'}]`)
  * @param callBack 실행 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, DataSet}`)
  */
  ServiceCall(gridNames: string|string[], className: string, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 내보내기 및 디자인 속성 컨텍스트 메뉴의 표시 여부를 설정합니다.
   *
  * @param name 메뉴 항목 이름 (`"Excel"`, `"HML"`, `"PPT"`, `"DOC"`, `"CSV"`, `"Text"`, `"Design"`)
  * @param flag 표시 여부
  * 
  */
  SetContextMenuOption(name: string, flag: boolean): void;

  /** 
   * 전역 쿼리 파라미터를 추가합니다. 타입 지정이 필요하면 {@link AddGlobalParams}를 사용하십시오.
   *
  * @param name 파라미터 이름
  * @param value 파라미터 값
  */
  SetGlobalParams(name: string, value: string): void;

  /** 
   * 스케줄 등록 화면에서 사용할 정보를 설정합니다.
   * 
   *
  * @param method 스케줄 정보 반환 메서드
  * @hidden
  */
  SetScheduleParam(method: Function): void;

  /** 
   * 지정한 폼을 활성화합니다.
   *
  * @param idx 활성화할 폼의 이름 또는 인덱스
  * 
  */
  SetSheetActive(idx: string | number): void;

  /** 
   * 프로그레스 바 표시 여부를 설정합니다.
   *
  * @param flag `true`: 표시, `false`: 비표시
  * 
  */
  SetUseProgressBar(flag: boolean): void;

  /** 
   * 특정 변수의 값을 설정합니다.
   *
  * @param name 변수 이름
  * @param value 설정할 값
  * 
  */
  SetVariable(name: string, value: string | object): void;

  /**
   * 공통 팝업을 표시합니다.
   *
   * 공통 데이터소스에 등록된 팝업을 호출하고, 사용자가 선택한 행 목록을 콜백으로 반환합니다.
   *
   * @example
   * ```ts
   * Matrix.ShowCommonPopup("DS_DEPT", function(rows) {
   *     rows.forEach(function(row) {
   *         let code = row.GetValue("DEPT_CODE");
   *         let name = row.GetValue("DEPT_NAME");
   *     });
   * });
   * ```
  * @param code 공통 데이터소스 코드
  * @param callBack 선택 완료 후 호출되는 콜백 함수. 선택된 행 배열이 전달됨
  */
  ShowCommonPopup(code: string, callBack: (rows: Array<DataRow>) => void): void;

 

  /**
   * 이미지 에디터를 팝업으로 표시합니다.
   * 사용자가 이미지를 편집/업로드하면 콜백 함수를 통해 저장된 이미지 정보를 반환합니다.
   *
   * @param callBack 이미지 편집 완료 시 호출되는 콜백 함수.
   * 콜백 인자 속성:
   * - `p.FolderName` : 서버에 저장된 이미지 경로 (reports 폴더 하위)
   * - `p.ImageName` : 이미지 파일명
   * - `p.ImageWidth` : 이미지 너비 (px)
   * - `p.ImageHeight` : 이미지 높이 (px)
   *
   * @example
   * ```js
   * // 이미지 에디터를 열고, 편집 완료 후 이미지 정보를 Image 컨트롤에 반영
   * Matrix.ShowImageEditor(function(p) {
   *     var imgCtrl = Matrix.GetControl("Image1");
   *     imgCtrl.SetValue(p.FolderName + "/" + p.ImageName);
   *
   *     Matrix.Alert("이미지 저장 완료\n크기: " + p.ImageWidth + " x " + p.ImageHeight);
   * });
   * ```
   */
  ShowImageEditor(callBack: (p: {"FolderName":string, "ImageName":string, "ImageWidth":number, "ImageHeight":number}) => void): void;

  /** 
   * 메타 팝업을 호출합니다.
   * 
   *
  */
  ShowMeta(): void;

  /**
   * 지정한 보고서를 팝업으로 표시합니다.
   *
   *
   * @example
   * ```js
   * // ── 부모 보고서 스크립트 ──
   * // 팝업 보고서에 파라미터를 전달하고, 팝업에서 반환한 결과를 처리
   * Matrix.getObject("btnOpenPopup").OnClick = function(s, e) {
   *     var param = {
   *         DEPT_CODE: "D001",
   *         DEPT_NAME: "개발팀",
   *         ITEMS: ["A", "B", "C"]
   *     };
   *
   *     Matrix.ShowReportDialog("POP_SELECT_USER", param, {
   *         Width: 600,
   *         Height: 400,
   *         Center: true,
   *         IsModal: true,
   *         Title: "사용자 선택",
   *         Resizable: true,
   *         Buttons: 0
   *     }, function(result) {
   *         if (result) {
   *             // 팝업에서 ReportDialogResult로 전달한 값
   *             Matrix.getObject("txtUserCode").Text = result.USER_CODE;
   *             Matrix.getObject("txtUserName").Text = result.USER_NAME;
   *         }
   *     });
   * };
   *
   * // ── 팝업 보고서(POP_SELECT_USER) 스크립트 ──
   * // 부모 보고서가 전달한 파라미터 수신
   * var params = Matrix.GetDialogRequestParams();
   * if (params) {
   *     Matrix.getObject("lblDept").Text = params.DEPT_NAME;
   *     // params.ITEMS → ["A", "B", "C"]
   * }
   *
   * // 사용자가 선택 완료 후 부모에게 결과 반환
   * Matrix.getObject("btnConfirm").OnClick = function(s, e) {
   *     var grid = Matrix.getObject("DataGrid");
   *     var row = grid.GetRow(grid.GetCurrentRowIndex());
   *     var resultParam = {
   *         USER_CODE: row.GetValue("USER_CODE"),
   *         USER_NAME: row.GetValue("USER_NAME")
   *     };
   *     Matrix.ReportDialogResult(resultParam, true, "OK");
   * };
   * ```
  * @param reportCode 팝업으로 표시할 보고서 코드
  * @param parameter 팝업에 전달할 파라미터 (팝업에서 `Matrix.GetDialogRequestParams()`로 수신)
  * @param options 팝업 표시 옵션 (Width, Height, Center, IsModal, Title 등)
  * @param callBack 팝업에서 `Matrix.ReportDialogResult(param, true)`로 전달한 값을 수신하는 콜백 함수
  */
  ShowReportDialog(reportCode: string, parameter: any, options: {Width?: number, Height?: number, MinWidth?: number, MinHeight?: number, Left?: number, Top?: number, Center?: boolean, IsModal?: boolean, Title?: string, Maximize?: boolean, Resizable?: boolean, Buttons?: number, Minimizable?: boolean}, callBack: (resultData:any) => void): DialogBox;

  /** 
   * 스케줄 옵션 보고서를 팝업으로 표시합니다.
   * 
   * @hidden
   *
  */
  ShowScheduleOptionDialog(): DialogBox;

  /** 
   * 현재 보고서의 특정 Form을 팝업으로 표시합니다.
   * 
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
   * 	POP_DATASET.Close(); 
   * };
   * ```
  * @param formName 표시할 폼 이름
  * @param left 팝업 X 좌표
  * @param top 팝업 Y 좌표
  * @param width 팝업 너비
  * @param height 팝업 높이
  * @param isModal 모달 창 여부
  * @param resizable 사용자 크기 조정 허용 여부
  * @param header 팝업 상단 헤더 텍스트
  * @param isAutoClose 프로그레스 바 표시 시 자동 닫힘 여부
  * @param backColor 모달 배경 색상
  * @param buttons 버튼 유형 (0: 없음, 1: 닫기, 2: 확인+취소)
  * @param absCoord 절대 좌표 기준 위치 표시 여부
  * @param maximize 최대화/최소화 버튼 표시 여부
  */
  ShowWindow(formName: string, left: number, top: number, width: number, height: number, isModal: boolean, resizable: boolean, header: string, isAutoClose: boolean, backColor: string, buttons: number, absCoord?: boolean, maximize?: boolean): FormDialog;

  /** 
   * 라벨 컨트롤의 글자를 수직 방향으로 변경합니다
   * 
   *
  * @param labelControl
  * 라벨 컨트롤
  * 
   * @hidden
  */
  StyleVerticalText(labelControl: Label): void;

  /**
   * 보고서 마법사를 사용하여 선택한 i-META를 특정 컨트롤에 바인딩합니다.
   *
  * @param name 컨트롤 이름
  */
  TemplateLoadedSetting(name: string): void;

  /** 
   *  제품 다국어 번역하는 함수
   * 
   *
  * @param key
  * 다국어 코드
  * 
  * @param options
  * i18n 옵션
  * 
   * @hidden
  */
  Trans(key: string, options?: any): string;

  /** 
   * 현재 뷰어의 모든 컨트롤에 스타일과 크기를 업데이트합니다.
   * 
   *
  */
  Update(): void;

  /**
   * 박스 스타일 목록을 서버에 업로드합니다.
   *
  * @param list 업로드할 박스 스타일 목록
  * @param callback 업로드 완료 후 호출되는 콜백 함수
  */
  UploadBoxStyleList(list: BoxStyleList, callback: Function): BoxStyleList;

  /**
   * 사용자의 로컬 파일을 서버로 업로드합니다.
   *
  * @param folderName 업로드 파일 저장 경로 (권장: `_TEMP_`, 영구 저장: `UPLOAD`)
  * @param filter 파일 필터 (예: `".jpg,.png"`, `"*.*"`)
  * @param tag 사용자 태그
   * @hidden
  */
  UploadLocalFile(folderName: string, filter: string, tag: any): void;

  /**
   * 사용자의 로컬 파일을 서버로 업로드합니다.
   *
  * @param folderName 업로드 파일 저장 경로 (권장: `_TEMP_`, 영구 저장: `UPLOAD`)
  * @param saveName 저장할 파일 이름 (한글 및 특수문자 금지)
  * @param filter 파일 필터 (예: `".jpg,.png"`, `"*.*"`)
  * @param callBack 업로드 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, FolderName, SaveFileName, FileName, FileSize, FileExtention}`)
  */
  UploadLocalFile(folderName: string, saveName: string, filter: string, callBack: (p: {"Success":boolean, "Message":string, "FolderName":string, "SaveFileName" : string, "FileName" : string, "FileSize":number, "FileExtention":string, "Tag":any}) => void): void;

  /**
   * 사용자의 로컬 파일을 서버로 업로드합니다.
   *
  * @param folderName 업로드 파일 저장 경로 (권장: `_TEMP_`, 영구 저장: `UPLOAD`)
  * @param saveName 저장할 파일 이름 (한글 및 특수문자 금지)
  * @param filter 파일 필터 (예: `".jpg,.png"`, `"*.*"`)
  * @param limitsize 업로드 제한 크기 (bytes)
  * @param callBack 업로드 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, FolderName, SaveFileName, FileName, FileSize, FileExtention}`)
  */
  UploadLocalFile(folderName: string, saveName: string, filter: string, limitsize: number, callBack: (p: {"Success":boolean, "Message":string, "FolderName":string, "SaveFileName" : string, "FileName" : string, "FileSize":number, "FileExtention":string, "Tag":any}) => void): void;

  /**
   * 사용자의 로컬 파일을 서버로 업로드합니다.
   *
  * @param folderName 업로드 파일 저장 경로 (권장: `_TEMP_`, 영구 저장: `UPLOAD`)
  * @param saveName 저장할 파일 이름 (한글 및 특수문자 금지)
  * @param filter 파일 필터 (예: `".jpg,.png"`, `"*.*"`)
  * @param limitsize 업로드 제한 크기 (bytes)
  * @param tag 사용자 태그
   * @hidden
  */
  UploadLocalFile(folderName: string, saveName: string, filter: string, limitsize: number, tag: any): void;

  /**
   * 사용자의 로컬 파일을 서버로 업로드합니다.
   *
  * @param folderName 업로드 파일 저장 경로 (권장: `_TEMP_`, 영구 저장: `UPLOAD`)
  * @param saveName 저장할 파일 이름 (한글 및 특수문자 금지)
  * @param filter 파일 필터 (예: `".jpg,.png"`, `"*.*"`)
  * @param tag 사용자 태그
   * @hidden
  */
  UploadLocalFile(folderName: string, saveName: string, filter: string, tag: any): void;

  /**
   * 사용자의 로컬 파일을 서버로 업로드합니다.
   *
   * @example
   * ```ts
   * Matrix.UploadLocalFile("_TEMP_", ".xlsx,.csv", function(p) {
   *     if (p.Success == false) {
   *         Matrix.Alert(p.Message);
   *         return;
   *     }
   *     // p.FolderName  - 저장 폴더 경로
   *     // p.SaveFileName - 서버에 저장된 파일 이름
   *     // p.FileName     - 원본 파일 이름
   *     // p.FileSize     - 파일 크기 (bytes)
   *     // p.FileExtention - 파일 확장자
   * });
   * ```
  * @param folderName 업로드 파일 저장 경로 (권장: `_TEMP_`, 영구 저장: `UPLOAD`)
  * @param filter 파일 필터 (예: `".jpg,.png"`, `"*.*"`)
  * @param callBack 업로드 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, FolderName, SaveFileName, FileName, FileSize, FileExtention}`)
  */
  UploadLocalFile(folderName: string, filter: string, callBack: (p: {"Success":boolean, "Message":string, "FolderName":string, "SaveFileName" : string, "FileName" : string, "FileSize":number, "FileExtention":string, "Tag":any}) => void): void;

  /**
   * i-META를 데이터소스로 사용하는 컨트롤의 필수 입력 유효성 검사를 수행하고, 값이 없는 항목의 이름을 반환합니다.
   *
  * @param controlName 컨트롤 이름
  */
  ValidateMetaFilterValues(controlName: string): string;

  /** 
   * 사용자에게 경고 대화 상자를 표시합니다.
   *
  * @param msg 경고 메시지
  * @param title 대화 상자 제목
  * 
  */
  Warning(msg: string, title: string): void;

  /** 
   * 사용자에게 확인 버튼이 있는 경고 대화 상자를 표시합니다.
   *
  * @param msg 경고 메시지
  * @param title 대화 상자 제목
  * @param callback 확인/취소 버튼 클릭 후 호출되는 콜백 함수. `ok`가 `true`이면 확인/예 클릭
  * @param buttonType 버튼 유형 (0: 예/아니오, 1: 확인/취소). 생략 시 기본값 적용
  * 
  */
  WarningConfirm(msg: string, title: string, callback: (ok: boolean) => void, buttonType: number): void;

  /** 
   * 사용자에게 확인 버튼이 있는 경고 대화 상자를 표시합니다.
   *
   * 닫기(X) 또는 Esc 동작 시 콜백에 `null`이 전달됩니다.
   * 
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
  * @param msg 경고 메시지
  * @param title 대화 상자 제목
  * @param callback 확인/취소/닫기 후 호출되는 콜백 함수. `true`: 확인(예), `false`: 취소(아니오), `null`: 닫기(Esc)
  * @param buttonType 버튼 유형 (0: 예/아니오, 1: 확인/취소). 생략 시 기본값 0
  */
  WarningConfirmWithClose(msg: string, title: string, callback: Function, buttonType?: number): void;

  /** 
   * 컨트롤 데이터를 Word 형식으로 내보내기합니다.
   * 
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
  * @param json WORKBOOK 구조의 내보내기 설정 객체
  * @param params 서버 조회 파라미터 배열. 불필요하면 `null`
  * @param callBack 내보내기 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, DataSet}`)
  */
  WordExportServiceCall(json: object, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 컨트롤 데이터를 Excel 2003(XLS) 형식으로 내보내기합니다.
   *
  * @param json WORKBOOK 구조의 내보내기 설정 객체
  * @param params 서버 조회 파라미터 배열. 불필요하면 `null`
  * @param callBack 내보내기 완료 후 호출되는 콜백 함수 (인자: `{Success, Message, DataSet}`)
  */
  XLSExportServiceCall(json: object, params: Array<{"Key":string,"Value":string}>, callBack: (p: {"Success":boolean, "Message":string, "DataSet":DataSet}) => void): void;

  /** 
   * 지정한 컨트롤의 데이터를 다시 조회합니다.
   *
   * @example
   * ```js
   * // 1. 콤마 구분 문자열
   * Matrix.doRefresh("Grid1,Grid2");
   *
   * // 2. 배열
   * Matrix.doRefresh(["Grid1","Grid2"]);
   *
   * // 3. DoRefresh가 true인 전체 컨트롤 실행
   * Matrix.doRefresh("");
   * Matrix.doRefresh("*.*");
   *
   * // 4. 특정 폼의 전체 컨트롤 실행
   * Matrix.doRefresh("Form1.*");
   * ```
  * @param names 대상 컨트롤 이름. 콤마 구분 문자열 또는 배열
  * 
  */
  doRefresh(names: string|string[]): void;

  /** 
   * 현재 보고서의 전체 컨트롤 목록을 반환합니다.
   */
  getAllObjects(): Control[];

  /** 
   * 지정한 이름의 BoxStyle 객체를 반환합니다.
   *
  * @param name BoxStyle 이름
  * 
  */
  getBoxStyle(name: string): BoxStyle;

  /** 
   * 컨트롤에 바인딩된 데이터소스 객체를 반환합니다.
   *
   * @example
   * ```js
   *  
   * //특정 컨트롤의 데이터소스를 반환합니다.
   *  var ds = Matrix.getControlDataSource("Grid");
   *  if(!ds){
   *  	//데이터소스가 없음.
   *  }else{
   *  	//컨트롤의 데이터소스 접근
   *  	//ds.Code <= 코드
   * 	//ds.Name <= 이름
   * 	//ds.ConnectionCode <= 데이터 베이스 연결 정보	
   *  }
   * ```
  * @param controlName 컨트롤 이름
  */
  getControlDataSource(controlName: string): DataSource;

  /** 
   * 지정한 이름의 데이터소스 객체를 반환합니다.
   *
  * @param datasourceName 데이터소스 이름
  * 
  */
  getDataSource(datasourceName: string): DataSource;

  /**
   * 지정한 날짜와 시간으로 날짜 처리 객체를 반환합니다.
   *
  * @param year 년
  * @param month 월
  * @param day 일
  * @param hour 시
  * @param minutes 분
  * @param second 초
  */
  getDate(year: number, month: number, day: number, hour: number, minutes: number, second: number): ScriptDateUtil;

  /**
   * 현재 날짜의 날짜 처리 객체를 반환합니다. (시간: 00:00:00)
   */
  getDate(): ScriptDateUtil;

  /**
   * 날짜 문자열을 파싱하여 날짜 처리 객체를 반환합니다. (시간: 00:00:00)
   *
  * @param dateText 날짜 문자열 (예: `"2020-01-01 08:50:10"`)
  * @param format 날짜 형식 (예: `"yyyy-MM-dd HH:mm:ss"`)
  */
  getDate(dateText: string, format: string): ScriptDateUtil;

  /**
   * 지정한 날짜로 날짜 처리 객체를 반환합니다. (시간: 00:00:00)
   *
  * @param year 년
  * @param month 월
  * @param day 일
  */
  getDate(year: number, month: number, day: number): ScriptDateUtil;

  /**
   * 지정한 날짜와 시간으로 날짜 처리 객체를 반환합니다.
   *
  * @param year 년
  * @param month 월
  * @param day 일
  * @param hour 시
  * @param minutes 분
  * @param second 초
  */
  getDateTime(year: number, month: number, day: number, hour: number, minutes: number, second: number): ScriptDateUtil;

  /**
   * 현재 날짜/시간의 날짜 처리 객체를 반환합니다.
   */
  getDateTime(): ScriptDateUtil;

  /**
   * 현재 날짜/시간을 지정한 형식의 문자열로 반환합니다.
   *
  * @param format 출력 형식 (예: `"yyyy-MM-dd HH:mm:ss"`)
  */
  getDateTime(format: string): string;

  /**
   * 지정한 날짜로 날짜 처리 객체를 반환합니다. (시간: 00:00:00)
   *
  * @param year 년
  * @param month 월
  * @param day 일
  */
  getDateTime(year: number, month: number, day: number): ScriptDateUtil;

  /**
   * 서식 변환 객체를 반환합니다.
   *
  * @param format 서식 형식 (예: `"{0:N0}"`)
  */
  getFormatConverter(format: string): FormatConverter;

  /**
   * 다국어 문자열의 값을 반환합니다.
   *
  * @param name 문자열 키
  * @param defaultValue 해당 키가 없을 경우 반환할 기본값
  */
  getLanguage(name: string, defaultValue: string): string;

  /** 
   * 지정한 이름의 컨트롤 객체를 반환합니다.
   *
  * @param name 컨트롤 이름
  * 
  */
  getObject(name: string): Control;

  /** 
   * 보고서 내 파라미터 목록을 반환합니다. 이름을 전달하면 해당 파라미터의 값을 반환합니다.
   *
  * @param name 파라미터 이름 (생략 가능)
  * 
  */
  getParamList(name: string): {[key: string]: any};

  /** 
   * 컨트롤의 특정 속성 값을 반환합니다.
   *
  * @param controlName 컨트롤 이름
  * @param propertieName 속성 이름
  * 
  */
  getProperty(controlName: string, propertieName: string): any;

  /** 
   * 문자열 처리 유틸리티 객체를 반환합니다.
   */
  getScriptUtil(): StringUtility;

  /** 
   * 고유 키를 생성하여 반환합니다.
   *
  * @param prefix 키 접두사
  * 
  */
  getUniqueKey(prefix: string): string;

  /** 
   * Viewer 를 반환합니다.
   * 
   *
   * @hidden
  */
  getViewer(): any;

  /** 
   * 현재 뷰어 모드를 반환합니다.
   */
  getViewerMode(): enViewerMode;

  /** 
   * {@link LoadDocument}로 전달된 파라미터를 반환합니다. 전달된 파라미터가 없으면 `undefined`를 반환합니다.
   */
  getViewerParams(): object | undefined;

  /** 
   * 화면 하단에 간편 메시지(토스트)를 표시합니다.
   *
  * @param message 표시할 메시지
  * 
  */
  iMessage(message: string): void;

  /** 
   * 컨트롤의 특정 속성을 설정합니다.
   *
  * @param controlName 컨트롤 이름
  * @param propName 속성 이름
  * @param value 설정할 값
  * 
  */
  setProperty(controlName: string, propName: string, value: any): boolean;

  /**
   * @event 
   *
   * 뷰어의 활성화 폼이 바뀔 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnActiveSheetChange : (sender : Matrix
  , args : { 
    /**
     * 폼 ID
     * 
    */
    Id: string
    /**
     * 폼 이름
     * 
    */
    Name: string
  }
  ) => void;


  /**
   * @event 
   *
   * View 모드에서 Addin의 로드된 라이브러리의 Component 객체가 생성된 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link AddIn}
  */
  OnAddInComponentClassLoaded : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 내보내기 파일을 다운로드 받기 직전에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnBeforeDownloadExportFile : (sender : Matrix
  , args : { 
    /**
     * 다운받을 파일 이름(확장자 제외)
     * 
    */
    fileName: string
    /**
     * 파일을 다운받은 후, 파일 삭제 여부
     * 
    */
    IsDelete: boolean
    /**
     * 파일을 다운받은 후, 바로 열기 여부
     * 
    */
    DirectOpen: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 버튼 컨트롤이 클릭될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Button}
  */
  OnButtonClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 표시 텍스트
     * 
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 날짜 FromTo 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarFromTo}
  */
  OnCalendarFromToValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 From 날짜
     * 
    */
    Text: string
    /**
     * String 형식의 To 날짜
     * 
    */
    Text2: string
    /**
     * Date 형식의 From 날짜
     * 
    */
    Date: Date
    /**
     * Date 형식의 To 날짜
     * 
    */
    Date2: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 날짜 From 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarFromTo}
  */
  OnCalendarFromValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 From 날짜
     * 
    */
    Text: string
    /**
     * Date 형식의 From 날짜
     * 
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 날짜 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Calendar}
  */
  OnCalendarValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 날짜
     * 
    */
    Text: string
    /**
     * Date 형식의 날짜
     * 
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 주간 FromTo 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarWeeklyFromTo}
  */
  OnCalendarWeeklyFromToValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 From 날짜
     * 
    */
    Text: string
    /**
     * String 형식의 To 날짜
     * 
    */
    Text2: string
    /**
     * Date 형식의 From 날짜
     * 
    */
    Date: Date
    /**
     * Date 형식의 To 날짜
     * 
    */
    Date2: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 주간 From 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarWeeklyFromTo}
  */
  OnCalendarWeeklyFromValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 From 날짜
     * 
    */
    Text: string
    /**
     * Date 형식의 From 날짜
     * 
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 주간 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarWeekly}
  */
  OnCalendarWeeklyValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 날짜
     * 
    */
    Text: string
    /**
     * Date 형식의 날짜
     * 
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년월 FromTo 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYMFromTo}
  */
  OnCalendarYMFromToValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 From 날짜
     * 
    */
    Text: string
    /**
     * String 형식의 To 날짜
     * 
    */
    Text2: string
    /**
     * Date 형식의 From 날짜
     * 
    */
    Date: Date
    /**
     * Date 형식의 To 날짜
     * 
    */
    Date2: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년월 From 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYMFromTo}
  */
  OnCalendarYMFromValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 From 날짜
     * 
    */
    Text: string
    /**
     * Date 형식의 From 날짜
     * 
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년월 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYM}
  */
  OnCalendarYMValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 날짜
     * 
    */
    Text: string
    /**
     * Date 형식의 날짜
     * 
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년 FromTo 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYearFromTo}
  */
  OnCalendarYearFromToValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 From 날짜
     * 
    */
    Text: string
    /**
     * String 형식의 To 날짜
     * 
    */
    Text2: string
    /**
     * Date 형식의 From 날짜
     * 
    */
    Date: Date
    /**
     * Date 형식의 To 날짜
     * 
    */
    Date2: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년 From 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYearFromTo}
  */
  OnCalendarYearFromValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 From 날짜
     * 
    */
    Text: string
    /**
     * Date 형식의 From 날짜
     * 
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 년 선택 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYear}
  */
  OnCalendarYearValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * String 형식의 날짜
     * 
    */
    Text: string
    /**
     * Date 형식의 날짜
     * 
    */
    Date: Date
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnCellClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 레코드 정보
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
    /**
     * cell selection 정보 유지 여부
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 더블 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnCellDoubleClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 레코드 정보
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 더블 터치할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnCellDoubleTouch : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 레코드 정보
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 셀이 Load될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnCellLoaded : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 레코드 정보
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
    /**
     * 셀의 배경색을 변경하실 경우 이값을 넣어 줍니다.(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
     * 
    */
    BackColor: string
    /**
     * 셀의 텍스트 색상을 변경하실 경우 이값을 넣어 줍니다.(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
     * 
    */
    FontColor: string
    /**
     * 셀의 텍스트를 Bold처리하여 표현할지 여부. true일 경우 Bold처리가 됩니다.
     * 
    */
    FontBold: boolean
    /**
     * 셀의 텍스트를 Italic처리하여 표현할지 여부. true일 경우 Italic처리가 됩니다.
     * 
    */
    FontItalic: boolean
    /**
     * 셀의 텍스트 아래 밑줄을 표현할지 여부. true일 경우 밑줄이 표시됩니다.
     * 
    */
    FontUnderline: boolean
    /**
     * 이 값을 true로 설정 하게되면 값을 그리지 않습니다.
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 터치할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnCellTouch : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 레코드 정보
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Chart}
  */
  OnChartDataPointClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 계열 유형
     * 
    */
    Type: number
    /**
     * 시리즈 명
     * 
    */
    Series: string
    /**
     * 시리즈 레이블
     * 
    */
    Label: string
    /**
     * 포인트 명
     * 
    */
    Point: string
    /**
     * 포인트 값
     * 
    */
    Value: number
    /**
     * 포인트 인덱스
     * 
    */
    PointIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * Tree의 체크박스를 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
  */
  OnCheckBoxClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 체크 여부
     * 
    */
    Checked: boolean
    /**
     * 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
     * 
    */
    Cancel: boolean
    /**
     * 레코드 노드
     * 
    */
    Row: TreeViewNode
    /**
     * 체크한 항목을 메타에 바로 추가할 지 여부
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 체크박스 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link CheckBox}
  */
  OnCheckValueChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 체크 상태
     * 
    */
    IsChecked: boolean
    /**
     * 그룹 이름
     * 
    */
    GroupName: string
    /**
     * 텍스트
     * 
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 컬러픽커 컨트롤의 색상이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link ColorPicker}
  */
  OnColorPickerValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 컬러 객체
     * 
    */
    Color: Color
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수직선을 드래그 완료할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
   * @hidden
  */
  OnColumnLineDragEnd : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
     * 
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
     * 
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
     * 
    */
    Column: TableColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수직선을 드래그 시작할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
   * @hidden
  */
  OnColumnLineDragStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
     * 
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
     * 
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
     * 
    */
    Column: TableColumn
    /**
     * 드래그 취소 여부. true이면 드래그가 시작되지 않습니다.
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수직선위에 마우스가 올라갈 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
   * @hidden
  */
  OnColumnLineMouseOver : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 마우스가 올라간 라인의 셀의 행 정보
     * 
    */
    Row: TableRow
    /**
     * 마우스가 올라간 라인의 셀 정보
     * 
    */
    Cell: TableCell
    /**
     * 마우스가 올라간 라인의 셀의 열 정보
     * 
    */
    Column: TableColumn
    /**
     * 마우스가 올라간 라인의 인덱스
     * 
    */
    LineIndex: number
    /**
     * 마우스 오버 이벤트 취소 여부. true이면 마우스 오버 이벤트가 발생하지 않습니다.
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 콤보박스 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link ComboBox}
  */
  OnComboBoxValueChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 컨트롤 값
     * 
    */
    Value: string
    /**
     * 선택된 값의 인덱스
     * 
    */
    SelectedIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 레코드가 추가될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnCreateNewRow : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 이 값을 TRUE로 설정하면 Row 추가가 취소됩니다.
     * 
    */
    Cancel: boolean
    /**
     * 데이터 레코드 객체
     * 
    */
    Record: DataRow
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 셀이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnCurrentCellChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 행 객체
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
     * 
    */
    Handled: boolean
    /**
     * 이전 셀
     * 
    */
    OldCell: DataGridCell
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 행이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnCurrentRowChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 행 객체
     * 
    */
    Row: DataGridRow
    /**
     * 셀 데이터 정보
     *
    */
    Record: DataRow
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
     * 
    */
    Handled: boolean
    /**
     * 이전 행 객체
     * 
    */
    OldRow: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * Chart-EX의 데이터가 바인딩 될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link HighChart_C}
  */
  OnCustomHighChartBeforeBind : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터셋 객체
     * 
    */
    DataSet: DataSet
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnDataBindEnd : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터셋의 레코드 수량
     * 
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 행이 키입력으로 인하여 삭제될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnDeletingRow : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 이 값을 true로 설정하시면 셀의 데이터 수정이 취소됩니다.
     * 
    */
    Cancel: boolean
    /**
     * 행 객체
     * 
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 문서가 닫힐 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnDestroy : (sender : Matrix
  , args : { 
    /**
     * 뷰어ID
     * 
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
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
   * 항목을 드롭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MetaTreeView}
  */
  OnDrop : (sender : Matrix
  , args : { 
    /**
     * Id
     * 
    */
    Id: string
    /**
     * Row들
     * 
    */
    Rows: TreeViewNode[]
    /**
     * Row: 1, Column:2, Filter: 3, Data 4
     * 
    */
    Area: number
    /**
     * 취소 여부
     * 
    */
    Cancel: boolean
    /**
     * Handled
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * [Ctrl + V] 키를 이용해 클립보드에 데이터를 붙여넣기 종료 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnEndClipBoardPaste : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 행 객체
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 셀 데이터 정보
     *
    */
    Record: DataRow
    /**
     * 수정되거나 추가된 레코드 목록을 반환합니다.
     * 
    */
    UpdatedRows: DataGridRow[]
    /**
     * 클립보드 텍스트 입니다.
     * 
    */
    ClipBoardText: string
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀의 값이 수정된 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnEndEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 이 값을 true로 설정 하게되면 수정작업이 취소됩니다.
     * 
    */
    Cancel: boolean
    /**
     * 셀의 필드 정보
     * 
    */
    Field: DataGridColumn
    /**
     * 수정 되기 전 값
     * 
    */
    BeforeValue: any
    /**
     * 수정된 값
     * 
    */
    AfterValue: any
    /**
     * 행 객체
     * 
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터소스 실행 작업 (Execute, ExecuteDML)이 종료된 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnExecuteCompleted : (sender : Matrix
  , args : { 
    /**
     * 사용자 지정 태그
     * 
    */
    Tag: string
    /**
     * 성공 여부
     * 
    */
    Success: boolean
    /**
     * 오류 메시지
     * 
    */
    Message: string
    /**
     * Execute인 경우 결과 데이터셋
     * 
    */
    DataSet: DataSet
    /**
     * 결과 데이터셋의 기본 테이블
     * 
    */
    DataTable: DataTable
  }
  ) => void;


  /**
   * @event 
   *
   * Refresh가 실행될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnExecuteStart : (sender : Matrix
  , args : { 
    /**
     * true일 경우 AutoRefresh 동작 입니다.
     * 
    */
    IsAutoRefresh: boolean
    /**
     * 현재 Refresh 대상(들)의 이름
     * 
    */
    Target: string
    /**
     * 현재 Refresh 대상(들)의 이름
     * 
    */
    TargetNames: string[]
    /**
     * 이 값을 true로 설정 시 실행이 취소됩니다.
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 파일 업로드 버튼 컨트롤이 클릭될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link FileUploadButton}
  */
  OnFileClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 표시 텍스트
     * 
    */
    Text: string
    /**
     * true로 지정 시 이벤트가 취소됩니다.
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 메타 큐브 또는 메타뷰 파일을 연 후에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnFileOpened : (sender : Matrix
  , args : { 
    /**
     * 메타 보고서 코드
     * 
    */
    Code: string
    /**
     * 메타 이름
     * 
    */
    Name: string
    /**
     * DB 코드
     * 
    */
    ConnectionCode: string
    /**
     * 설명
     * 
    */
    Description: string
    /**
     * 폴더 코드
     * 
    */
    FolderCode: string
    /**
     * 모듈 코드
     * 
    */
    ModuleCode: string
    /**
     * 만든 계정
     * 
    */
    Owner: string
    /**
     * 메타 항목 배열
     * 
    */
    AllMetaItems: MetaItem[]
    /**
     * 성공 여부
     * 
    */
    IsSuccess: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 조회 조건이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MetaTreeView}
  */
  OnFilterChanged : (sender : Matrix
  , args : { 
    /**
     * Id
     * 
    */
    Id: string
    /**
     * 데이터
     * 
    */
    Data: DataRow
    /**
     * 필터 정보
     * 
    */
    FilterInfo: FilterInfo[]
    /**
     * 연결된 grid refresh할지 여부
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 체크박스를 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridCheckBoxClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 체크 여부
     * 
    */
    Checked: boolean
    /**
     * 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
     * 
    */
    Cancel: boolean
    /**
     * 레코드 노드
     * 
    */
    Row: DataGridRow
    /**
     * 클릭한 셀의 데이터
     *
    */
    Record: DataRow
  }
  ) => void;


  /**
   * @event
   *
   * 그리드 계열(DataGrid, OlapGrid..) 컨트롤 클릭 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnGridClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 컬럼 헤더를 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridColumnHeaderClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 필드
     * 
    */
    Field: DataGridColumn
    /**
     * 처리완료 여부
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 컬럼 헤더를 더블 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridColumnHeaderDoubleClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 필드
     * 
    */
    Field: DataGridColumn
    /**
     * 처리완료 여부
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 ComboBox 값이 바뀔 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridComboBoxChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 행 객체
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 셀 데이터 정보
     *
    */
    Record: DataRow
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
    /**
     * 변경된 값
     * 
    */
    ChangeValue: string
    /**
     * 이 값을 true로 설정하시면 셀의 데이터 수정이 취소됩니다.
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 컨텍스트 메뉴가 열리기 전에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridContextMenuOpening : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 컨텍스트 메뉴 객체
     * 
    */
    Menu: ContextMenu
    /**
     * 데이터 레코드 정보
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
    /**
     * 컨텍스트 메뉴를 열지 여부
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 엑셀 내보내기 전에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridExportStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 다운로드 시 저장할 파일명
     * 
    */
    FileName: string
    /**
     * 글자 유형, 기본값 iStudioConfig.CanvasDefaultFont
     * 
    */
    DefaultFontName: string
    /**
     * 글자 크기, 기본값 11
     * 
    */
    DefaultFontSize: number
    /**
     * Excel로 내보내기 할 경우 상단 Row에 데이터를 추가할 수 있습니다.(string array 또는 {"Range":"A1","ColSpan":10,"Value":"■ 보고서 명 : ","Style":{"Border":"border:Thin,#000000;","Font":"font-color:#000000"}}형태로 지정)
     * 
    */
    ExportRows: any
    /**
     * DataGrid의 엑셀 위치 (default : A1)
     * 
    */
    ExportGridCell: string
    /**
     * 서버 조회 데이터 사용 여부
     * 
    */
    ExportServerData: boolean
    /**
     * 이 값을 true 로 설정 할 경우 내보내기가 취소됩니다.
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 필터가 변경된 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridFilterChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 멀티헤더 셀이 로드될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridMultiHeaderCellLoaded : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 멀티헤더셀 객체
     * 
    */
    HeaderCell: MultiHeaderCell
    /**
     * 내부 컨트롤
     * 
    */
    Control: Control
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 멀티 헤더 체크박스를 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridMultiHeaderCheckBoxClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 멀티헤더셀 객체
     * 
    */
    HeaderCell: MultiHeaderCell
    /**
     * 체크 여부
     * 
    */
    Checked: boolean
    /**
     * 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 멀티헤더 셀을 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridMultiHeaderClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 멀티헤더셀 객체
     * 
    */
    HeaderCell: MultiHeaderCell
    /**
     * 처리완료 여부
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 멀티헤더 셀을 더블클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGridMultiHeaderDoubleClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 멀티헤더셀 객체
     * 
    */
    HeaderCell: MultiHeaderCell
    /**
     * 처리완료 여부
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드 및 피벗그리드의 데이터소스 파라미터가 변경되었을 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnGridParamChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 실행 요청 여부(true 이면 요청을 하지 않는다.)
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 Grouping 데이터셋이 바인딩된 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnGroupDataBindEnd : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터셋의 레코드 수량
     * 
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event 
   *
   * 이미지 컨트롤이 클릭될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Image}
  */
  OnImageClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 표시 텍스트
     * 
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 사용자가 ShowImageEditor 명령을 통해 이미지 파일 업로드 실행 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
   * @hidden
  */
  OnImageEditCompleted : (sender : Matrix
  , args : { 
    /**
     * 사용자 지정 태크
     * 
    */
    Tag: any
    /**
     * 이미지 이름
     * 
    */
    ImageName: string
    /**
     * 이미지 너비
     * 
    */
    ImageWidth: number
    /**
     * 이미지 높이
     * 
    */
    ImageHeight: number
    /**
     * 서버에 저장된 이미지 경로(reports 폴더 하위)
     * 
    */
    FolderName: string
  }
  ) => void;


  /**
   * @event 
   *
   * 문서가 로드되고 AutoRefresh가 완료될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnLoadComplete : (sender : Matrix
  , args : { 
    /**
     * 성공 여부
     * 
    */
    Success: boolean
    /**
     * 에러 메시지
     * 
    */
    Message: string
  }
  ) => void;


  /**
   * @event 
   *
   * Local에 메타뷰 파일을 연 후에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnLocalFileOpened : (sender : Matrix
  , args : { 
    /**
     * 메타뷰 파일 이름
     * 
    */
    FileName: string
  }
  ) => void;


  /**
   * @event 
   *
   * 마스크 텍스트박스 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MaskTextBox}
  */
  OnMaskTextChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 기존 값
     * 
    */
    OldValue: string
    /**
     * 현재 값
     * 
    */
    NewValue: string
    /**
     * 컨트롤 값
     * 
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 마스크 텍스트박스 컨트롤의 key 입력 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MaskTextBox}
  */
  OnMaskTextKeydown : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 마스크 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 마스크 텍스트박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MaskTextBox}
  */
  OnMaskTextKeypress : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 마스크 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 마스크 텍스트박스 컨트롤의 key 입력 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MaskTextBox}
  */
  OnMaskTextKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 마스크 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 메타뷰어 데이터소스를 적용완료한 후에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnMetaViewerBindClosed : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 메타 위자드 객체
     * 
    */
    Wizard: MetaWizardManager
  }
  ) => void;


  /**
   * @event 
   *
   * 메타 뷰어를 연 후에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnMetaViewerOpened : (sender : Matrix
  , args : { 
    /**
     * 메타 위자드 객체
     * 
    */
    Wizard: MetaWizardManager
  }
  ) => void;


  /**
   * @event 
   *
   * Execute 실행될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MultiComboBox}
  */
  OnMultiComboBoxExecuteStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 이 값을 true로 설정 시 실행이 취소됩니다.
     * 
    */
    Cancel: boolean
    /**
     * 0:일반 조회, 1:검색 텍스트박스 조회, 2:전체검색 버튼 조회
     * 
    */
    FilterType: number
    /**
     * 검색 텍스트박스에 입력된 검색어
     * 
    */
    FilterText: string
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 콤보박스의 트리 노드 객체를 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MultiComboBox}
  */
  OnMultiComboBoxNodeClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 멀티 콤보박스의 리스트 형식
     * 
    */
    Type: string
    /**
     * 노드 객체
     * 
    */
    Node: TreeComboNode
  }
  ) => void;


  /**
   * @event 
   *
   * MultiComboBox의 텍스트박스에 key 입력 후 발생합니다.(단, EditableValueText==true일 경우만)
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MultiComboBox}
  */
  OnMultiComboBoxTextKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 콤보박스의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link MultiComboBox}
  */
  OnMultiComboBoxValueChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 변경 전 컨트롤 값
     * 
    */
    OldValue: string
    /**
     * 현재 컨트롤 값(구분자 ,)
     * 
    */
    Value: string
  }
  ) => void;


  /**
   * @event 
   *
   * 디자이너에서 메타뷰어의 배치가 변경되면 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
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
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
  */
  OnNodeAfterCollapsed : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 선택된 노드
     * 
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 펼친 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
  */
  OnNodeAfterExpand : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 선택된 노드
     * 
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 접기 전에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
  */
  OnNodeBeforeCollapsed : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 선택된 노드
     * 
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 펼치기 전에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
  */
  OnNodeBeforeExpand : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 선택된 노드
     * 
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 key 입력 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link NumberBox}
  */
  OnNumberBoxKeydown : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 넘버 박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link NumberBox}
  */
  OnNumberBoxKeypress : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 넘버 박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 key 입력 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link NumberBox}
  */
  OnNumberBoxKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 넘버 박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 넘버 박스 컨트롤의 숫자가 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link NumberBox}
  */
  OnNumberTextChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 기존 값
     * 
    */
    OldValue: string
    /**
     * 현재 값
     * 
    */
    NewValue: string
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 셀을 수정 후에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapDataCellEndEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 명
     * 
    */
    Id: string
    /**
     * 데이터 셀 객체
     * 
    */
    Cell: ScriptDataCell
    /**
     * 수정 전 값
     * 
    */
    BeforeValue: number
    /**
     * 수정 후 값
     * 
    */
    AfterValue: number
    /**
     * 잠긴 레코드의 값
     * 
    */
    LockedValue: number
    /**
     * 이 값을 true 로 설정 할 경우 수정 작업이 취소됩니다.
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 셀 수정 모드로 진입할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapDataCellStartEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 명
     * 
    */
    Id: string
    /**
     * 데이터 셀 객체
     * 
    */
    Cell: ScriptDataCell
    /**
     * 이 값을 true 로 설정 할 경우 수정 모드로 진입이 취소됩니다.
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * Export 직전에 호출합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapExportStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 내보내기 유형
     * 
    */
    ExportType: enOlapExportsType
    /**
     * 파일명, 기본값 : 보고서명_yyyyMMddHHmmss(일시는 실제 다운로드 시점에 설정)
     * 
    */
    ExportFileName: string
    /**
     * 글자 유형, 기본값 iStudioConfig.CanvasDefaultFont
     * 
    */
    DefaultFontName: string
    /**
     * 글자 크기, 기본값 11
     * 
    */
    DefaultFontSize: number
    /**
     * Excel로 내보내기 할 경우 상단 Row에 데이터를 추가할 수 있습니다.(string array 형태로 지정)
     * 
    */
    ExportRows: string[]
    /**
     * Text 내보내기 시 Column 단위별 구분자.  eg.\\t (탭 문자)
     * 
    */
    TextExportColSeparator: string
    /**
     * Text 내보내기 시 Column 단위별 구분자.  eg.\\n (개행 문자)
     * 
    */
    TextExportRowSeparator: string
    /**
     * 이 값을 true 로 설정 할 경우 내보내기가 취소됩니다.
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * i-OLAP의 데이터 셀을 더블 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewDataCellDoubleClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 명
     * 
    */
    Id: string
    /**
     * 데이터 셀 객체
     * 
    */
    DataCell: ScriptDataCell
  }
  ) => void;


  /**
   * @event 
   *
   * 헤더셀을 클릭 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewHeaderClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 헤더 셀 객체
     * 
    */
    HeaderCell: ScriptHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 헤더셀을 더블 클릭 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewHeaderDoubleClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 헤더 셀 객체
     * 
    */
    HeaderCell: ScriptHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 헤더셀을 클릭 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewMultiHeaderClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 헤더 셀 객체
     * 
    */
    HeaderCell: IMultiHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 헤더셀을 더블 클릭 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewMultiHeaderDoubleClicked : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 헤더 셀 객체
     * 
    */
    HeaderCell: IMultiHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 피벗 그리드의 선택 영역이 변경된 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapViewSelectionChanged : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 명
     * 
    */
    Id: string
    /**
     * 선택 영역이 컨트롤러
     * 
    */
    Selection: ScriptSelection
  }
  ) => void;


  /**
   * @event 
   *
   * 픽리스트의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link PickList}
  */
  OnPickListValueChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 변경 전 컨트롤 값
     * 
    */
    OldValue: string
    /**
     * 현재 컨트롤 string값(구분자 ;)
     * 
    */
    Value: string
  }
  ) => void;


  /**
   * @event 
   *
   * 원형 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Chart}
  */
  OnPieChartDataPointClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 시리즈 명
     * 
    */
    Series: string
    /**
     * 포인트 명
     * 
    */
    Point: string
    /**
     * 포인트 값
     * 
    */
    Value: number
    /**
     * 포인트 인덱스
     * 
    */
    PointIndex: number
    /**
     * 포인트 영역 색상
     * 
    */
    PointColor: string
  }
  ) => void;


  /**
   * @event 
   *
   * 방사형 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Chart}
  */
  OnPolygonChartDataPointClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 계열 유형
     * 
    */
    Type: number
    /**
     * 시리즈 명
     * 
    */
    Series: string
    /**
     * 시리즈 레이블
     * 
    */
    Label: string
    /**
     * 포인트 명
     * 
    */
    Point: string
    /**
     * 포인트 값
     * 
    */
    Value: number
    /**
     * 포인트 인덱스
     * 
    */
    PointIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * 라디오 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link RadioButton}
  */
  OnRadioValueChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 그룹명
     * 
    */
    GroupName: string
    /**
     * 표시 텍스트
     * 
    */
    Text: string
    /**
     * 체크 상태
     * 
    */
    IsChecked: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 모든 종류의 서버 요청(doRefresh, Execute, RunScript 등)이 완료되면 발생합니다. 여러 요청이 동시에 진행된 경우, 마지막 요청이 완료됐을 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnRefreshComplete : (sender : Matrix
  , args : { 
    /**
     * 성공 여부
     * 
    */
    Success: boolean
    /**
     * 에러 메시지
     * 
    */
    Message: string
  }
  ) => void;


  /**
   * @event 
   *
   * 조건 개인화가 적용된 후에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
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
   * 리치 텍스트박스 컨트롤의 key 입력 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link RichTextBox}
  */
  OnRichTextBoxKeydown : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 리치 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link RichTextBox}
  */
  OnRichTextBoxKeypress : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 리치 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트박스 컨트롤의 key 입력 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link RichTextBox}
  */
  OnRichTextBoxKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 리치 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 리치 텍스트박스 컨트롤의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link RichTextBox}
  */
  OnRichTextChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 기존 값
     * 
    */
    OldValue: string
    /**
     * 현재 값
     * 
    */
    NewValue: string
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수평선을 드래그 완료할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
   * @hidden
  */
  OnRowLineDragEnd : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
     * 
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
     * 
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
     * 
    */
    Column: TableColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수평선을 드래그 시작할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
   * @hidden
  */
  OnRowLineDragStart : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
     * 
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
     * 
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
     * 
    */
    Column: TableColumn
    /**
     * 드래그 취소 여부. true이면 드래그가 시작되지 않습니다.
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수평선위에 마우스가 올라갈 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
   * @hidden
  */
  OnRowLineMouseOver : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 마우스가 올라간 라인의 셀의 행 정보
     * 
    */
    Row: TableRow
    /**
     * 마우스가 올라간 라인의 셀 정보
     * 
    */
    Cell: TableCell
    /**
     * 마우스가 올라간 라인의 셀의 열 정보
     * 
    */
    Column: TableColumn
    /**
     * 마우스가 올라간 라인의 인덱스
     * 
    */
    LineIndex: number
    /**
     * 마우스 오버 이벤트 취소 여부. true이면 마우스 오버 이벤트가 발생하지 않습니다.
     * 
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 분산형/거품형 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Chart}
  */
  OnScatterChartDataPointClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 차트 종류
     * 
    */
    Type: number
    /**
     * 시리즈 명
     * 
    */
    Series: string
    /**
     * X값 필드 명
     * 
    */
    PointX: string
    /**
     * Y값 필드 명
     * 
    */
    PointY: string
    /**
     * Z값 필드 명(거품형의 경우)
     * 
    */
    PointZ: string
    /**
     * Label값 필드 명
     * 
    */
    PointLabel: string
    /**
     * X 값
     * 
    */
    ValueX: number
    /**
     * Y 값
     * 
    */
    ValueY: number
    /**
     * Z 값(거품형의 경우)
     * 
    */
    ValueZ: number
    /**
     * Label 값
     * 
    */
    ValueLabel: number
    /**
     * 포인트 인덱스
     * 
    */
    PointIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * ServiceCall 작업이 종료된 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnServiceCallBack : (sender : Matrix
  , args : { 
    /**
     * 사용자 지정 태그
     * 
    */
    Tag: string
    /**
     * ServiceCall 성공 여부
     * 
    */
    Success: boolean
    /**
     * 오류 메세지
     * 
    */
    Message: string
    /**
     * 결과 데이터셋
     * 
    */
    DataSet: DataSet
  }
  ) => void;


  /**
   * @event 
   *
   * 슬라이더 컨트롤의 핸들을 드래그하는 동안 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Slider}
  */
  OnSliderChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 최소값
     * 
    */
    Min: number
    /**
     * 최대값
     * 
    */
    Max: number
    /**
     * 핸들의 시작 위치값
     * 
    */
    From: number
    /**
     * 핸들의 종료 위치값
     * 
    */
    To: number
  }
  ) => void;


  /**
   * @event 
   *
   * 슬라이더 컨트롤의 핸들 드래그를 완료할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Slider}
  */
  OnSliderFinish : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 최소값
     * 
    */
    Min: number
    /**
     * 최대값
     * 
    */
    Max: number
    /**
     * 핸들의 시작 위치값
     * 
    */
    From: number
    /**
     * 핸들의 종료 위치값
     * 
    */
    To: number
  }
  ) => void;


  /**
   * @event 
   *
   * [Ctrl + V] 키를 이용해 클립보드에 데이터를 붙여넣기 실행 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnStartClipBoardPaste : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 행 객체
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 셀 데이터 정보
     *
    */
    Record: DataRow
    /**
     * 클립보드 텍스트로, 작업을 취소하려면 이 값을 제거하십시오.
     * 
    */
    ClipBoardText: string
  }
  ) => void;


  /**
   * @event 
   *
   * 드래그를 시작할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link TreeView}
  */
  OnStartDrag : (sender : Matrix
  , args : { 
    /**
     * Id
     * 
    */
    Id: string
    /**
     * 타입
     * 
    */
    Type: number
    /**
     * 대상
     * 
    */
    Target: TreeViewNode
    /**
     * 선택된 Row들
     *
    */
    SelectedRows: DataGridRow[]
    /**
     * 취소 여부
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀이 수정모드로 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnStartEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 이 값을 true로 설정하시면 셀의 데이터 수정이 취소됩니다.
     * 
    */
    Cancel: boolean
    /**
     * 셀의 필드 정보. 단, Paste(붙여넣기) 동작 시에는 셀의 필드 정보 중 Name 값만 반환됩니다.
     * 
    */
    Field: DataGridColumn
    /**
     * 셀의 값
     * 
    */
    Value: any
    /**
     * 행 객체
     * 
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 현재 활성화된 탭이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tab}
  */
  OnTabControlActiveTabChanged : (sender : Matrix
  , args : { 
    /**
     * 탭 컨트롤의 Id
     * 
    */
    Id: string
    /**
     * 활성화된 탭의 이름
     * 
    */
    TabName: string
    /**
     * 활성화된 탭의 Index
     * 
    */
    TabIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트블럭이 클릭될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Label}
  */
  OnTextBlockClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 표시 텍스트
     * 
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트블럭에 마우스를 아웃할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Label}
  */
  OnTextBlockMouseOut : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 표시 텍스트
     * 
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트블럭에 마우스를 오버할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Label}
  */
  OnTextBlockMouseOver : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 표시 텍스트
     * 
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트박스 컨트롤의 텍스트가 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link TextBox}
  */
  OnTextChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트박스 컨트롤의 key 입력 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link TextBox}
  */
  OnTextKeydown : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트박스 컨트롤의 key 입력 누르는 동안 발생합니다.
   * 
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
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link TextBox}
  */
  OnTextKeypress : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 텍스트박스 컨트롤의 key 입력 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link TextBox}
  */
  OnTextKeyup : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 현재 텍스트
     * 
    */
    Text: string
    /**
     * 텍스트박스 key event 객체
     * 
    */
    Event: Event
  }
  ) => void;


  /**
   * @event 
   *
   * 트리 그리드의 트리형태 셀을 클릭할 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnTreeCellClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 레코드 정보
     * 
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
     * 
    */
    Cell: DataGridCell
    /**
     * 선택한 영역
     * 
    */
    Area: enTreeCellArea
  }
  ) => void;


  /**
   * @event 
   *
   * 컨텍스트 메뉴가 열리기 전에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
  */
  OnTreeContextMenuOpening : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * Selected node
     * 
    */
    Node: MTXTreeNode
    /**
     * 컨텍스트 메뉴 객체
     * 
    */
    Menu: ContextMenu
    /**
     * 컨텍스트 메뉴를 열지 여부
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤 노드의 채크박스를 클릭했을때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
  */
  OnTreeNodeCheckboxClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 선택된 노드
     * 
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 클릭했을때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
  */
  OnTreeNodeClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 선택된 노드
     * 
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드를 더블클릭했을때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
  */
  OnTreeNodeDbClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 선택된 노드
     * 
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * 트리컨트롤의 노드에서 마우스 우클릭 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Tree}
  */
  OnTreeNodeRightClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 선택된 노드
     * 
    */
    Node: MTXTreeNode
  }
  ) => void;


  /**
   * @event 
   *
   * UserComponent가 로딩 완료된 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnUserComponentLoaded : (sender : Matrix
  , args : { 
    /**
     * 유저 컴포넌트 이름
     * 
    */
    Id: string
    /**
     * 보고서 스크립트 객체
     * 
    */
    ScriptObject: any
  }
  ) => void;


  /**
   * @event 
   *
   * 사용자가 UploadLocalFile 명령을 통해 파일을 업로드 실행 후 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnUserFileUploadCompleted : (sender : Matrix
  , args : { 
    /**
     * 성공 여부
     * 
    */
    Success: boolean
    /**
     * 에러 메시지
     * 
    */
    Message: string
    /**
     * 서버에 저장된 파일의 경로
     * 
    */
    FolderName: string
    /**
     * 서버에 저장된 파일의 이름
     * 
    */
    SaveFileName: string
    /**
     * 사용자가 선택한 파일 이름
     * 
    */
    FileName: string
    /**
     * 파일 크기
     * 
    */
    FileSize: number
    /**
     * 파일의 확장자
     * 
    */
    FileExtention: string
    /**
     * 사용자 지정 태크
     * 
    */
    Tag: any
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 셀의 값이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : Grid
  */
  OnValidate : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 이 값을 true로 설정 시 컨트롤 내부 Validate 동작은 취소되고 스크립트에서 정의한 내용만 반영됩니다.
     * 
    */
    Handled: boolean
    /**
     * Validate error메시지를 지정하실 수 있습니다.
     * 
    */
    Message: string
    /**
     * 필드 정보
     * 
    */
    Field: DataGridColumn
    /**
     * 행 객체
     * 
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 뷰어의 크기가 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link Matrix}
  */
  OnViewerSizeChanged : (sender : Matrix
  , args : { 
    /**
     * 뷰어의 너비
     * 
    */
    Width: number
    /**
     * 뷰어의 높이
     * 
    */
    Height: number
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid 셀 데이터 수정 시작 이벤트
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OniGridCellBeginEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 대상 셀
     * 
    */
    Cell: Cell
    /**
     * 편집 취소 여부
     * 
    */
    Cancel: boolean
    /**
     * 텍스트 편집기의 너비를 여러 셀에 걸쳐 병합한 크기로 표현합니다. (병합 셀 개수 입력)
     * 
    */
    MergeColumn: number
    /**
     * 콤보 상자의 목록을 설정합니다.
     * 
    */
    LOVList: string[]
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid Cell Click 이벤트
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OniGridCellClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 셀 정보
     * 
    */
    Cell: Cell
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid Cell Double Click 이벤트
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OniGridCellDoubleClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 셀 정보
     * 
    */
    Cell: Cell
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid 셀 데이터 수정 완료 이벤트
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OniGridCellEndEdit : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 수정된 데이터 셀 목록
     * 
    */
    getCells(): Cell[]
    /**
     * 서버로 계산 실행 취소 여부
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤 클릭 시 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OniGridClick : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 컨텍스트 메뉴가 열리기 전에 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OniGridContextMenuOpening : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 선택된 셀
     * 
    */
    Cell: Cell
    /**
     * 컨텍스트 메뉴 객체
     * 
    */
    Menu: ContextMenu
    /**
     * 컨텍스트 메뉴를 열지 여부
     * 
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 스크롤이 움직일 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OniGridScroll : (sender : Matrix
  , args : { 
    /**
     * offset left
     * 
    */
    ScrollLeft: number
    /**
     * offset top
     * 
    */
    ScrollTop: number
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid의 선택 영역이 변경될 때 발생합니다.
   * 
   *
   * @param sender 이벤트가 발생한 Matrix 객체
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OniGridSelectionChange : (sender : Matrix
  , args : { 
    /**
     * 컨트롤 이름
     * 
    */
    Id: string
    /**
     * 데이터 셀 목록 정보
     * 
    */
    Cells: Cell[]
  }
  ) => void;


}
