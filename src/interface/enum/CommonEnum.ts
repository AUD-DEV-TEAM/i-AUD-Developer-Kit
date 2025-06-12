import { UnionEnum } from "../BaseEnum";

export const enObjectType = {
  Object: "object",
  Number: "number",
  Undefined: "undefined",
  String: "string",
  Float: "float",
  Null: "null",
  Function: "function",
  Array: "object",
  Boolean: "boolean",
} as const;
export type enObjectType = UnionEnum<typeof enObjectType>;

export const enXmlType = {
  Boolean: "boolean",
  String: "string",
  Number: "number",
  Object: "object",
  CDATA: "cdata",
} as const;
export type enXmlType = UnionEnum<typeof enXmlType>;

export const enDbType = {
  None: 0,
  Oracle: 1,
  SQLServer: 2,
  DB2: 4,
  MatrixNet: 5,
  Teradata: 7,
  UniSQL: 8,
  SybaseIQ: 9,
  SOHA: 10,
  TIBERO: 11,
  SAP: 12,
  Altibase: 13,
  MySQL: 14,
  MariaDB: 15,
  SQLServer2005: 21,
  SQLAS2005: 22,
  SQLServer2008: 23,
  PostgreSQL: 31,
  Vertica: 32,
  CISCO: 33,
  Greenplum: 34,
  InfiniFlux: 35,
  EDB: 36,
  RedShift: 37,
  Netezza: 40,
  Informix: 41,
  AS400DB2: 42,
  ISAS: 43,
  Hive: 50,
  MonetDB: 51,
  Vectorwise: 52,
  Splunk: 53,
  Drill: 54,
  Impala: 55,
  Hive2: 56,
  IRIS: 57,
  SybaseASE: 91,
  Hana: 92,
  SapBW: 93,
  GoldiRocks: 94,
  SQream: 96,
  TeraONE: 97,
} as const;
export type enDbType = UnionEnum<typeof enDbType>;

export const enExceptionType = {
  InvalidCastException: "InvalidCastException",
} as const;
export type enExceptionType = UnionEnum<typeof enExceptionType>;

export const enKeyType = {
  None: 0,
  NotNull: 1,
  Nullable: 2,
  Primary: 3,
} as const;
export type enKeyType = UnionEnum<typeof enKeyType>;

export const enDataType = {
  Numeric: 0,
  String: 1,
  DateTime8: 2,
  DateTimeNow: 3,
  UserCode: 4,
  CLOB: 5,
} as const;
export type enDataType = UnionEnum<typeof enDataType>;

export const enSortType = {
  None: 0,
  Asc: 2,
  Desc: 1,
} as const;
export type enSortType = UnionEnum<typeof enSortType>;

export const enHorizontalPositionType = {
  Stretch: 0,
  Left: 1,
  Center: 2,
  Right: 3,
} as const;
export type enHorizontalPositionType = UnionEnum<
  typeof enHorizontalPositionType
>;

export const enVerticalPositionType = {
  Stretch: 0,
  Top: 1,
  Bottom: 2,
  Center: 3,
} as const;
export type enVerticalPositionType = UnionEnum<typeof enVerticalPositionType>;

export const enScrollBarVisibilityType = {
  Auto: 0,
  Visible: 1,
  Hidden: 2,
} as const;
export type enScrollBarVisibilityType = UnionEnum<
  typeof enScrollBarVisibilityType
>;

export const enOrientationType = {
  Horizontal: 0,
  Vertical: 1,
} as const;
export type enOrientationType = UnionEnum<typeof enOrientationType>;

export const enRowState = {
  None: "",
  Inserted: "N",
  Updated: "U",
  Deleted: "D",
} as const;
export type enRowState = UnionEnum<typeof enRowState>;

export const enSaveMode = {
  All: 0,
  InsertOnly: 1,
  UpdateOnly: 2,
} as const;
export type enSaveMode = UnionEnum<typeof enSaveMode>;

export const enDirectionType = {
  Left: 0,
  Right: 1,
  Top: 2,
  Bottom: 3,
} as const;
export type enDirectionType = UnionEnum<typeof enDirectionType>;

export const enBrushType = {
  Solid: 0,
  Linear: 1,
} as const;
export type enBrushType = UnionEnum<typeof enBrushType>;

/*
 * Viewer Mode
 */
export const enViewerMode = {
  Edit: 0,
  Preview: 1,
  View: 2,
  New: 3
  // , Dialog: 4,
  // SystemView: 5
} as const;
export type enViewerMode = UnionEnum<typeof enViewerMode>;

/*
 * Document Mode
 */
export const enDocumentMode = {
  Normal: 2,    // 일반 보고서(권한 체크 O)
  Dialog: 4,    // 사용자가 Matrix API로 오픈한 보고서(권한 체크 O)
  System: 5     // 제품 기본 제공 보고서(권한 체크 X)
} as const;
export type enDocumentMode = UnionEnum<typeof enDocumentMode>;


/*
 * combobox
 */
export const enInitType = {
  CurrentValue: 0,
  InitValue: 1,
  None: 2,
} as const;
export type enInitType = UnionEnum<typeof enInitType>;

export const enRefreshType = {
  None: 0,
  FirstTime: 1,
  EveryTime: 2,
} as const;
export type enRefreshType = UnionEnum<typeof enRefreshType>;

export const enSelectBoxDisplayType = {
  Select: 1,
  List: 2,
} as const;
export type enSelectBoxDisplayType = UnionEnum<typeof enSelectBoxDisplayType>;

/*
 * Multi ComboBox
 */
export const enDisplayType = {
  PopUpview: 0,
  ListView: 1,
} as const;
export type enDisplayType = UnionEnum<typeof enDisplayType>;

export const enTreeViewType = {
  MultiCheckBoxList: 1,
  TreeViewList: 2,
} as const;
export type enTreeViewType = UnionEnum<typeof enTreeViewType>;

export const enTreeSortType = {
  Asc: 0,
  Desc: 1,
  None: 2,
} as const;
export type enTreeSortType = UnionEnum<typeof enTreeSortType>;

export const enQueryType = {
  Default: 0,
  InSQL: 1,
  ColumnSQL: 2,
} as const;
export type enQueryType = UnionEnum<typeof enQueryType>;

//textbox type
export const enInputType = {
  Text: 0,
  Password: 1,
} as const;
export type enInputType = UnionEnum<typeof enInputType>;

export const enFormulaType = {
  None: 0,
  Number: 1,
  Currency: 2,
  Percent: 3,
  Exponential: 4,
  DateTime: 5,
} as const;
export type enFormulaType = UnionEnum<typeof enFormulaType>;

// table cell type
export const enCellType = {
  None: 0,
  // TextBlock(Label)
  Label: 1,
  // Textbox
  TextBox: 2,
  NumberBox: 21,
  MaskTextBox: 22,
  RichTextBox: 23,
  // ToggleButton
  CheckBox: 3,
  RadioButton: 31,
  // Button
  Button: 4,
  // Combobox
  ComboBox: 5,
  MultiComboBox: 51,
  // Calendar
  Daily: 6,
  DFromTo: 61,
  Month: 62,
  MFromTo: 63,
  Weekly: 64, // 주달력
  WFromTo: 65,
  Yearly: 66, // 연달력
  YFromTo: 67,
  // Image
  Image: 7,
  // Chart
  Chart: 8,
  PieChart: 81,
  // Grid
  ListGrid: 9,
  TreeGrid: 91,
  PivotGrid: 92,      // 2019-12-27 Pivot그리드 TableLayout에서 cell 선택 못하도록 삭제
  Tree: 93,
  OlapGrid: 94,
} as const;
export type enCellType = UnionEnum<typeof enCellType>;

// multiheader cell type
export const enMHCellType = {
  None: 0,
  Label: 1,
  TextBox: 2,
  NumberBox: 21,
  CheckBox: 3,
  Button: 4,
  ComboBox: 5,
  Daily: 6,
  DFromTo: 61,
  Month: 62,
  MFromTo: 63,
  Image: 7,
} as const;
export type enMHCellType = UnionEnum<typeof enMHCellType>;

export const enSizeType = {
  Pixel: 0,
  Star: 1,
} as const;
export type enSizeType = UnionEnum<typeof enSizeType>;

export const enTextAlign = {
  Left: "start",
  Center: "center",
  Right: "end",
} as const;
export type enTextAlign = UnionEnum<typeof enTextAlign>;

export const enTextAlignValue = {
  start: "Left",
  center: "Center",
  end: "Right",
} as const;
export type enTextAlignValue = UnionEnum<typeof enTextAlignValue>;

export const enTableMode = {
  View: 2,
  Design: 1,
  Main: 0,
} as const;
export type enTableMode = UnionEnum<typeof enTableMode>;

export const enExportType = {
  CSV: 0,
  Text: 1,
  Excel: 2,
  HML: 3,
  PPT: 4,
  DOC: 5,
  PNG: 6,
  PDF: 7,
  HTML: 8,
  XLS: 9, //EXCEL 2003
} as const;
export type enExportType = UnionEnum<typeof enExportType>;

export const enExportControlType = {
  Grid: 0,
  Pivot: 1,
  Chart: 2,
} as const;
export type enExportControlType = UnionEnum<typeof enExportControlType>;

export const enBrowserType = {
  IE: 0, // Internet Explorer
  Chrome: 1, // Chrome
  Firefox: 2, // FireFox
  Safari: 3, // Safari
  Opera: 4, // Opera
  Android: 5, // Android Chrome
  AndroidF: 51, // Anroid Firefox
  iPhone: 6, // iPhone Safari
  iPhoneF: 61, // iPhone Firefox
  iPhoneC: 62, // iPhone Chrome
  iPad: 7, // iPad Safari
  iPadF: 71, // iPad Firefox
  iPadC: 72, // iPad Chrome
  Edge: 8, // Edge
  iMac: 9, // iMac Safari
  iMacF: 91, // iMac Firefox
  iMacC: 92, // iMac Chrome
} as const;
export type enBrowserType = UnionEnum<typeof enBrowserType>;

export const enDialogButtonType = {
  OK: "OK",
  Apply: "Apply",
  Close: "Close",
  Cancel: "Cancel",
  Initialization: "Initialization",
  Delete: "Delete",
  Query: "Query",
  Save: "Save",
  TotalSearch: "TotalSearch",
  FileLoad: "FileLoad",
  Istream: "Istream", // 2018-09-14, ysh 추가, POSCO EUC project (istream)
  CloseEx: "CloseEx", // 2018-11-30, ysh 추가, i-MATRIX 6.1 데이터가져오기 "닫기" 버튼 타입 추가 ("닫힘" 동작 하면 안 함, site : SKI)
  Import: "Import", // 2019-07-25 mkkim 추가, TTA BMT 데이터 가져오기 버튼
  LocalOpen: "LocalOpen", // 2020-01-17, ysh 추가
  Refresh: "Refresh" //20230824 choe
} as const;
export type enDialogButtonType = UnionEnum<typeof enDialogButtonType>;

export const enDialogButtonAtributeType = {
  Button: "data-button-type",
  Disabled: "data-button-disabled",
} as const;
export type enDialogButtonAtributeType = UnionEnum<
  typeof enDialogButtonAtributeType
>;

export const enDialogDisplayButtonType = {
  None: 0,
  Close: 1,
  OKAndCancle: 2,
} as const;
export type enDialogDisplayButtonType = UnionEnum<
  typeof enDialogDisplayButtonType
>;

export const enMessageBoxType = {
  Confirm: 'Confirm',
  Warning: 'Warning',
  WarningConfirm: 'WarningConfirm',
  Error: 'Error',
  Information: 'Information',
  ConfirmWithClose: 'ConfirmWithClose',
  WarningConfirmWithClose: 'WarningConfirmWithClose',
} as const;
export type enMessageBoxType = UnionEnum<
  typeof enMessageBoxType
>;

export const enMessageBoxButtonType = {
  YesAndNo: 0,
  OKAndCancle: 1,
} as const;
export type enMessageBoxButtonType = UnionEnum<
  typeof enMessageBoxButtonType
>;

export const enControlPosition = {
  Top: 0,
  Bottom: 1,
  Left: 2,
  Right: 3,
} as const;
export type enControlPosition = UnionEnum<
  typeof enControlPosition
>;

export const enKeyCodeType = {
  None: 0,
  Alt: 2,
  Tab: 9,
  Enter: 13,
  Shift: 16,
  Ctrl: 17,
  LeftAlt: 18,
  RightAlt: 21,
  RightCtrl: 25,
  Esc: 27,
  Space: 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Del: 46,
  A: 65,
  C: 67,
  V: 86,
  X: 88,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
} as const;
export type enKeyCodeType = UnionEnum<typeof enKeyCodeType>;

export const enMessageType = {
  Default: 0,
  Information: 1,
  Warining: 2,
  Confirm: 3,
  Error: 4,
  Clear: 5,
  WarningConfirm: 6 // (BCRM#C3802) [AUD7] 메세지 박스 Warning 종류도 버튼과 그에 따른 콜백함수 가능하도록 신규 기능 추가
} as const;
export type enMessageType = UnionEnum<typeof enMessageType>;

export const enDMLType = {
  Default: 0,
  Batch: 1,
  Merge: 2,
} as const;
export type enDMLType = UnionEnum<typeof enDMLType>;

export const enLangSearchType = {
  Code: 0,
  Comment: 1,
} as const;
export type enLangSearchType = UnionEnum<typeof enLangSearchType>;

export const enTableContextMenuID = {
  CellDesignStart: "CellDesignStart",
  Row: "Row",
  AddRow: "AddRow",
  InsertRow: "InserRow",
  DeleteRow: "DeleteRow",
  Column: "Column",
  AddColumn: "AddColumn",
  InsertColumn: "InsertColumn",
  DeleteColumn: "DeleteColumn",
  Merge: "Merge",
  CopyCell: "CopyCell",
  PasteCell: "PasteCell",
  CellDesignEnd: "CellDesignEnd",
  CopyClipboard: "CopyClipboard",
  PasteClipboard: "PasteClipboard",
  CRUD: "CRUD",
  ExecutionPlan: "ExecutionPlan",
  CreateInputForm: "CreateInputForm",
} as const;
export type enTableContextMenuID = UnionEnum<typeof enTableContextMenuID>;

export const enMouseCursorType = {
  Auto: "auto",
  Pointer: "pointer",
  AllScroll: "all-scroll",
  E_Resize: "e-resize",
} as const;
export type enMouseCursorType = UnionEnum<typeof enMouseCursorType>;

export const enDSType = {
  Template: 0,
  MetaData: 1,
  DataSource: 2,
  DrillToDetail: 3,
  ServerDataSource: 4,
  MetaFilter: 5, // 2018-10-29 sclee 추가 : Template으로 만든 경우, Filter의 Datasource type 추가
} as const;
export type enDSType = UnionEnum<typeof enDSType>;

export const enTabPosition = {
  None: 0,
  Top: 1,
  Bottom: 2,
} as const;
export type enTabPosition = UnionEnum<typeof enTabPosition>;

export const enListItemCRUDType = {
  Name: 0,
  Combo: 1,
} as const;
export type enListItemCRUDType = UnionEnum<typeof enListItemCRUDType>;

/**
 * 다이얼로그 종류
 * @type {{DimensionFilter: number, MeasureFilter: number, Format: number, Formula: number, MultiHeader: number, Formatting: number, ChartDesign: number, GridDesign: number, GridCRUD: number, TreeDesign: number, PivotDesign: number, PivotLayoutManager: number, PivotFormula: number, PivotCustomDimension: number, PivotCustomSort: number, PivotArrangeByValue: number, PivotDimensionGroup: number, PivotFilterManager: number, PivotFilterEditor: number, PivotFieldFilter: number, ExecutionDesign: number, ExecutionTable: number, ExecutionPlan: number, ExecutionItem: number, ExecutionCustomScript: number, ExecutionConditionSQL: number, PivotDimensionFieldFilter: number, PivotMeasureFieldFilter: number}}
 */
export const enDialogType = {
  // Common Dialog
  DimensionFilter: 0, // Dimension 필터
  MeasureFilter: 1, // Measure 필터
  Format: 2, // Format 에디터
  Formula: 3, // Formula 에디터
  MultiHeader: 4, // 멀티 헤더
  Formatting: 5, // 서식 설정

  ChartDesign: 11, // 디자인 속성(Chart)

  GridDesign: 21, // 디자인 속성(Grid)
  GridCRUD: 22, // CRUD
  TreeDesign: 23, // 디자인 속성(Tree)

  // PivotGrid Dialog
  PivotDesign: 31, // 디자인 속성(Pivot)
  PivotLayoutManager: 32, // 레이아웃 관리자
  PivotFormula: 33, // Formula 에디터
  PivotCustomDimension: 34, // 사용자 정의 항목
  PivotCustomSort: 35, // 사용자 지정 정렬
  PivotArrangeByValue: 36, // 값 기준 정렬
  PivotDimensionGroup: 37, // 그룹 설정
  PivotFilterManager: 38, // 필터 디자인
  PivotFilterEditor: 39, // 필터 편집
  PivotFieldFilter: 40, // 필드 필터	// TODO

  ExecutionDesign: 41, // 실행 계획
  ExecutionTable: 42, // 테이블 검색
  ExecutionPlan: 43, // 실행 계획
  ExecutionItem: 44, // 실행 목록
  ExecutionCustomScript: 45, // 사용자 지정
  ExecutionConditionSQL: 46, // SQL 선택창

  PivotDimensionFieldFilter: 47, // DimensionFilter
  PivotMeasureFieldFilter: 48, // MeasureFilter

  iPivotLayoutManager: 49, // 레이아웃 관리자
  iPivotDesign: 50, // 레이아웃 관리자
  iPivotFormula: 51, // Formula 에디터
  iPivotDimensionGroup: 52, //그룹
  iPivotFilterManager: 53, //필터관리자
  iPivotCustomDimension: 54, // 사용자정의항목
  iPivotTopFilter: 55, //  TopFilter

  DataSourceEditor: 56, // 데이터소스 편집창
  SettingSearchFields: 57, //Search 필드 설정창
  SearchFields: 58  // Search 사용자 팝업창
} as const;
export type enDialogType = UnionEnum<typeof enDialogType>;
/**
 * 다이얼로그 종류
 * @type {{DimensionFilter: number, MeasureFilter: number, Format: number, Formula: number, MultiHeader: number, Formatting: number, ChartDesign: number, GridDesign: number, GridCRUD: number, TreeDesign: number, PivotDesign: number, PivotLayoutManager: number, PivotFormula: number, PivotCustomDimension: number, PivotCustomSort: number, PivotArrangeByValue: number, PivotDimensionGroup: number, PivotFilterManager: number, PivotFilterEditor: number, PivotFieldFilter: number, ExecutionDesign: number, ExecutionTable: number, ExecutionPlan: number, ExecutionItem: number, ExecutionCustomScript: number, ExecutionConditionSQL: number, PivotDimensionFieldFilter: number, PivotMeasureFieldFilter: number}}
 */
export const enDialogReportType = {
  // Common Dialog
  //DimensionFilter: 0, // Dimension 필터
  MeasureFilter: "aud7.datagridMeasureFilter", // Measure 필터
  Format: "aud7.formatEditor", // Format 에디터
  // Formula: 3, // Formula 에디터
  // MultiHeader: 4, // 멀티 헤더
  Formatting: "aud7.formatSetting", // 서식 설정
  ExcelExport: 'aud7.excelExportList',     // 내보내기

  ChartDesign: 'aud7.chartDesign',                 // 디자인 속성(Chart)
  PieChartDesign: 'aud7.pieChartDesign',           // 디자인 속성(Pie Chart)
  PolygonChartDesign: 'aud7.polygonChartDesign',   // 디자인 속성(Polygon Chart)
  ScatterChartDesign: 'aud7.scatterChartDesign',   // 디자인 속성(Scatter Chart)

  // GridDesign: 21, // 디자인 속성(Grid)
  // GridCRUD: 22, // CRUD
  // TreeDesign: 23, // 디자인 속성(Tree)

  // ExecutionDesign: 41, // 실행 계획
  // ExecutionTable: 42, // 테이블 검색
  // ExecutionPlan: 43, // 실행 계획
  // ExecutionItem: 44, // 실행 목록
  // ExecutionCustomScript: 45, // 사용자 지정
  // ExecutionConditionSQL: 46, // SQL 선택창

  // iPivotLayoutManager: 49, // 레이아웃 관리자
  iPivotDesign: "aud7.olapgridDesign", // olap design
  // iPivotFormula: 51, // Formula 에디터
  // iPivotDimensionGroup: 52, //그룹
  iPivotFilterManager: "aud7.olapGridFilterManager", //필터관리자
  iPivotCustomDimension: "aud7.olapGridCustomDimensionItem", // 사용자정의항목
  PivotDimensionFieldFilter : "aud7.olapgridDimensionFilter", //olapgrid dimension filter
  iPivotTopFilter : "aud7.olapgridTopFilter",

  Option: "aud7.option", //디자이너 옵션창
  LanguageCodeList: "aud7.languageCodeList", //언어 설정 창
  VariableEditor: "aud7.variableEditor",  // 변수 설정창
  CommonSQL: "aud7.AUD7_SCP_100",               // 공통 데이터 소스(Common SQL)
  ModuleManager: "aud7.AUD7_AUD_MODULE",            // 모듈 에디터
  CrudSetting: "aud7.crudSetting", // CRUD 설정
  ImageSelector: "aud7.imageSelector", //이미지 셀렉터
  ImageEditor: "aud7.imageEditor", //이미지 에디터
  FormulaEditor: "aud7.formulaEditor", // 수식편집기
  DataGridDesign: "aud7.dataGridDesign", // DataGrid 디자인 창
  TreeGridDesign: "aud7.treeGridDesign", // TreeGrid 디자인 창
  GridValidate: "aud7.gridValidate", // 유효성 검사 설정 창
  DimensionFilter: 'aud7.datagridDimensionFilter',   // Dimension 필터
  OlapGridArrangeByValueEditor: 'aud7.olapGridArrangeByValueEditor', // 값 기준 정렬 창
  OlapGridDimensionGroupEditor: 'aud7.olapGridDimensionGroupEditor', // 그룹 설정
  OlapGridCustomEditor: 'aud7.olapGridCustomEditor', // 사용자 지정
  OlapGridLayoutManager: 'aud7.olapGridLayoutManager', // 레이아웃 관리자(iPivot)
  MultiHeader: 'aud7.datagridMultiheader',    // 멀티헤더 설정
  BoxStyleEditor: 'aud7.boxStyleEditor',      // 박스스타일 설정
  Export: 'aud7.AUD7_EPT_100',    // 내보내기 창
  CommonDataSource: 'aud7.AUD7_SCP_200', // 공통소스 팝업
  ScheduleControl: 'aud7.SCH_POP_200',     // 스케줄 control 설정창
  MetaDataImport: "MEX_USER_FILE_DATA", // 메타뷰 데이터 가져오기 팝업 - TODO: common 으로 설정할 것!
  LogViewer: "aud7.logViewer",  // Log viewer
  InputFormSetting: "aud7.inputFormSetting",
  processBot: 'aud7.processBot',
  moduleParameter: 'aud7.moduleParameter',
  switchConditionList: 'aud7.switchConditionList',
  DataSourceEditor : 'aud7.dataSourceEditor', //데이터소스 편집창
  SettingSearchFields : 'aud7.settingSearchFields', // Search 필드 설정창
  SearchFields : 'aud7.searchFields', // Search 사용자 팝업창
  HyperlinkSetting: 'aud7.hyperlinkSetting', // hyperlinkSetting 보고서
  TabDesign: "aud7.tabDesign", // TreeGrid 디자인 창
} as const;
export type enDialogReportType = UnionEnum<typeof enDialogReportType>;

/**
 * 다이얼로그 종류
 * @type {string}
 */
export const enMETADialogReportType = {
  DetailView: "meta.view.metaDetailView", // 메타 상세 정보 팝업
  FilterItemSetting: "meta.view.metaFilterItemSetting", // 메타 조회 조건 설정 팝업
  HavingSetting: "meta.view.metaHavingSetting", // 메타 Having 설정 팝업
  LOV: "meta.view.metaLOVSetting", // 메타 LOV 목록 조회 팝업
  MergeOption: "meta.view.metaMergeOption", // 메타 병합 폴더 생성 시 이름 설정을 위한 팝업
  MergeType: "meta.view.metaMergeTypeSetting", // 메타 병합 유형 설정을 위한 팝업
  Option: "meta.view.metaOption", // 메타 뷰 옵션 팝업
  PicklistValueSetting: "meta.view.metaPicklistValueSetting", // 메타 분석항목 조회 조건의 PickList 값 설정 팝업
  Prompt: "meta.view.metaPromptSetting", // 메타 Viewer에서 Prompt로 설정된 filter item 값 설정 팝업
  SortSetting: "meta.view.metaSortSetting", // 메타 정렬 설정 팝업
  UserDefine: "meta.view.metaUserDefineSetting", // 메타 사용자 정의 항목 팝업
  UserDefineHelp: "metaUserDefineSettingHelp" // 메타 사용자 정의 항목 함수 도움말 팝업(사용 안함)
} as const;
export type enMETADialogReportType = UnionEnum<typeof enMETADialogReportType>;

/**
 * 테마 오브젝트 타입
 * @type {number}
 */
export const enThemeObjectType = {
  Array: 0,
  Object: 1,
  NamedDictionary: 2,
} as const;
export type enThemeObjectType = UnionEnum<typeof enThemeObjectType>;

/**
 * 데이터 로드 타입
 * - 초기 데이터 로딩이 끝난 후에 데이터 요청을 가능하게 할 것인지 여부.
 * - 대상: Filter, Sort, 디자인, 레이아웃 관리자, 그룹 추가, 계산필드추가
 * 1: 언제든지 데이터 요청가능 (Filter, Sort)
 * 2: 초기 데이터가 없으면 요청 불가
 * @type {{None: number, Used: number, NotUsed: number}}
 */
export const enDataLoadType = {
  None: 0,
  Used: 1,
  NotUsed: 2,
} as const;
export type enDataLoadType = UnionEnum<typeof enDataLoadType>;

/**
 * 이미지 내보내기 추가 사용 가능한 외부 API
 * @type {{fileType: string, fileName: string, controlNames: string, usedClipSize: string, usedDownload: string, debug: string, debugMillisecond: string, callbackFunc: string}}
 */
export const enExportImageObject = {
  fileType: enObjectType.Number,
  fileName: enObjectType.String,
  controlNames: enObjectType.Array,
  usedClipSize: enObjectType.Boolean,
  usedDownload: enObjectType.Boolean,
  usedDownloadServer: enObjectType.Boolean,
  usedUpload: enObjectType.Boolean,
  debug: enObjectType.Boolean,
  debugMillisecond: enObjectType.Number,
  callbackFunc: enObjectType.Function,
  usedTimeStamp: enObjectType.Boolean,
} as const;
export type enExportImageObject = UnionEnum<typeof enExportImageObject>;

/**
 * ExportImageEx 함수에서 사용
 * 이미지 내보내기 추가 사용 가능한 외부 API
 * @type {{fileName: string, callbackFunc: string}}
 */
export const enExportImageExObject = {
  fileName: enObjectType.String,
  callbackFunc: enObjectType.Function,
  useDocHeaderTitle: enObjectType.Boolean
} as const;
export type enExportImageExObject = UnionEnum<typeof enExportImageExObject>;

/**
 * 컨텍스트 하위 메뉴 작동 방식
 * @type {{Click: number, ClickOrMouseOver: number, MouseOver: number}}
 */
export const enContentMenuMode = {
  Click: 0,
  ClickOrMouseOver: 1,
  MouseOver: 2,
} as const;
export type enContentMenuMode = UnionEnum<typeof enContentMenuMode>;

/**
 * 테이블레이아웃 이벤트 코드
 */
export const enTableLayoutMatrixEventCode = {
  OnRowLineDragStart: "TableLayout::OnRowLineDragStart",
  OnRowLineDragEnd: "TableLayout::OnRowLineDragEnd",
  OnColumnLineDragStart: "TableLayout::OnColumnLineDragStart",
  OnColumnLineDragEnd: "TableLayout::OnColumnLineDragEnd",
  OnRowLineMouseOver: "TableLayout::OnRowLineMouseOver",
  OnColumnLineMouseOver: "TableLayout::OnColumnLineMouseOver",
} as const;
export type enTableLayoutMatrixEventCode = UnionEnum<
  typeof enTableLayoutMatrixEventCode
>;

/**
 *
 */
export const enAgentLogMode = {
  OpenReport: {
    Start: 40,
    End: 41,
    Error: 42,
  },
  DataRefresh: {
    Start: 80,
    End: 81,
    Error: 82,
  },
  ExportReport: {
    Start: 90,
  },
} as const;
export type enAgentLogMode = UnionEnum<typeof enAgentLogMode>;

/**
 * 데이터 내보내기용 글자 정렬 열거형 코드
 */
export const enExportTextAlign = {
  Left: 0,
  Right: 1,
  Center: 2,
} as const;
export type enExportTextAlign = UnionEnum<typeof enExportTextAlign>;

/**
 * 데이터 내보내기용 컨트롤 유형
 */
export const enExcelExportControlType = {
  MultiComboBox: 0,
  ComboBox: 1,
  PickList: 2,
  Label: 3,
  Button: 4,
  TextBox: 5,
  MaskTextBox: 6,
  NumberBox: 7,
  RichTextBox: 8,
  RadioButton: 9,
  CheckBox: 10,
  Calendar: 11,
  CalendarFromTo: 12,
  CalendarYM: 13,
  CalendarYMFromTo: 14,
  Image: 15,
  TableLayout: 16,
  Group: 17,
  PivotGrid: 18,
  DataGrid: 19,
  TreeGrid: 20,
  Chart: 21,
  PieChart: 22,
  Panel: 23,
  Thumbnail: 24,
  ScatterChart: 25,
  PolygonChart: 26,
  SvrDataGrid: -19, // client 에서 데이타를 주지 않고 서버에서 직접 쿼리한 결과를 엑셀로 내보내기
  iGrid: 27, //서버에서 내려주는 html(CANVAS) GRID
  SvrGroupGrid: -28, // client 에서 데이타를 주지 않고 서버에서 직접 쿼리한 결과를 엑셀로 내보내기(그룹그리드)
} as const;
export type enExcelExportControlType = UnionEnum<
  typeof enExcelExportControlType
>;

export const enNodeName = {
  DIV: "DIV",
} as const;
export type enNodeName = UnionEnum<typeof enNodeName>;

/**
 * 컨트롤 타입별 메모리 점유도(임의의 값: 메모리 점유도 조사 후 확정 예정...)
 */
export const enControlMemoryRate = {
  Limit: 300,
  "Button": 2,
  "FileUploadButton": 2,
  "CheckBox": 1,
  "ComboBox": 2,
  "Calendar": 3,
  "CalendarFromTo": 3,
  "CalendarWeekly": 3,
  "CalendarWeeklyFromTo": 3,
  "CalendarYM": 3,
  "CalendarYMFromTo": 3,
  "Image": 6,
  "Tree": 11,
  "RadioButton": 1,
  "Label": 2,
  "MultiComboBox": 7,
  "Chart": 12,
  "TextBox": 2,
  "MaskTextBox": 3,
  "NumberBox": 3,
  "RichTextBox": 4,
  "PivotGrid": 17,
  "grid.DataGrid": 10,
  "grid.TreeGrid": 10,
  "iGrid": 6,
  "PieChart": 8,
  "HighChart_C": 13,
  "StarChart": 13,
  "table.TableLayout": 1,
  "Group": 1,
  "PickList": 2,
  "ScatterChart": 12,
  "PolygonChart": 10,
  "WebContainer": 13,
  "Board": 20,
  "Slider": 4,
} as const;
export type enControlMemoryRate = UnionEnum<typeof enControlMemoryRate>;

export const enModuleCode = {
  SD: "SD",
  M0: "M0",
  MV: "MV",
  SX: "SX",
  SC: "SC"
} as const;
export type enModuleCode = UnionEnum<typeof enModuleCode>;

export const enReportExtType = {
  MTSD: ".mtsd",
  MTV: ".mtv",
  MTVX: ".mtvx",
  SC: ".sc",
  MTSZ: ".mtsz",
  XLSX: ".xlsx" //mx-grid
} as const;
export type enReportExtType = UnionEnum<typeof enReportExtType>;

export const enStudioCacheRefreshType = {
  Refresh: "Refresh",
  RefreshBeforeClear: "RefreshBeforeClear"
} as const;
export type enStudioCacheRefreshType = UnionEnum<typeof enStudioCacheRefreshType>;

export const enQueryParamType = {
  Numeric: 0,
  String: 1,
} as const;
export type enQueryParamType = UnionEnum<typeof enQueryParamType>;

export const enDataSourceParamType = {
  Numeric: "Numeric",
  String: "String",
} as const;
export type enDataSourceParamType = UnionEnum<typeof enDataSourceParamType>;

export const enControlChangeGroupList = {
  "Icon.Tooltip.ComboBox": {
    controlType: "ComboBox",
    Img: "ComboBox.png",
  },
  "Icon.Tooltip.TextBox": {
    controlType: "TextBox",
    Img: "TextBox.png",
  },
  "Icon.Tooltip.Calendar": {
    controlType: "Calendar",
    Img: "Calendar.png",
  },
} as const;
export type enControlChangeGroupList = UnionEnum<
  typeof enControlChangeGroupList
>;

// Control의 Support 타입 정의
export const enControlSupport = {
  HasAutoRefresh: 1,        // AutoRefresh 속성 유무
  HasDataSource: 2,         // DataSource 속성 유무
  HasDoRefresh: 4,          // DoRefresh 속성 유무
  HasAfterRefresh: 8,       // AfterRefresh 속성 유무
  IsCondition: 16,           // 조회조건으로 사용하는 컨트롤인지.GetValue 함수를 가진 컨트롤(VS, VN)
  IsAnalysisControl: 32,    // 분석용 컨트롤인지(Grid, Chart 등)
  IsCommonControl: 64,      // 단순표시/기능성 컨트롤(Button, Slide, Label 등)
  HasExport: 128,            // Export 속성 유무 - Export type은 별도 지정(enExportType)
  MetaAvailable: 256,       // Meta 사용가능 컨트롤인지
  HasName2: 512,            // Name2 속성이 있는 컨트롤
  HasWorkFlowEvents: 1024   // WorkFlowEvents 가 있는 컨트롤
  , HasContextMenu: 2048    // ContextMenu 를 가진 컨트롤
  , HasGroupName: 4096      // GroupName을 가진 컨트롤(ex: Radio/Check)
  , IsTableCell: 8192      // TableCell 여부
  , IsEditable: 16384       // Designer 모드 상에서 Text 를 수정 가능한 Contrl 여부 (ex: Button)
  , EnableTabKey: 32768     // TabIndexManager에서 tab key로 이동 가능한 Control 여부


} as const;
export type enControlSupport = UnionEnum<typeof enControlSupport>;


export const enControlChangeList = {
  "ComboBox": {
    // Key 값은 다국어 코드 사용.
    "Icon.Tooltip.MultiCombo": {
      // Combo -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mInitType",
        "mInitValue",
        "mValue",
        "Text",
        "mText",
        "LabelField",
        "comboBox",
        "SelectedIndex",
        "mSelectedIndex",
        "DisplayType",
        "mDisplayType",
        "isEnabled",
        "InTableLayout",
        "mIsReadOnly",
        "mSortType",
        "running",
        "exeObjName",
      ],
    },
    "Icon.Tooltip.TextBox": {
      // Combo -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // Combo -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // Combo -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // Combo -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.Calendar": {
      // Combo -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // Combo -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarYM": {
      // Combo -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarYear": {
      // Combo -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Year",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // Combo -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // Combo -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // Combo -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // Combo -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "MultiComboBox": {
    "Icon.Tooltip.ComboBox": {
      // MultiCombo -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "EditValue",
        "CaptionText",
        "SortFieldType",
        "ParentField",
        "ChildField",
        "CaptionField",
        "ImageField",
        "TooltipField",
        "ImageRootPath",
        "EditableValueText",
        "mEditableValueText",
        "UsedSelectAllQueryParamValue",
        "IsMultiSelect",
        "mIsMultiSelect",
        "AutoChildSelect",
        "LeafNodeOnly",
        "HideCheckBox",
        "AutoExpandLevel",
        "IndentSize",
        "EmptyValue",
        "TreeViewType",
        "PivotBindingPId",
        "PivotBindingPName",
        "PivotBindingPColumn",
        "PivotBindingPColumnId",
        "ClearTargetData",
        "OnDataBindEnd",
        "RootNode",
        "AllNodes",
        "PopUpCtl",
        "DialogWidth",
        "DialogHeight",
        "Content",
        "UITextBox",
        "LoadingBar",
        "UITable",
        "cell",
        "PageSize",
        "LastBindIndex",
        "RecordCount",
        "DataTable",
        "NextPageCtl",
        "CheckedAll",
        "IsSelectedAll",
        "Childrens",
        "OriginalModels",
        "Models",
        "Selected_Models",
        "FilterText",
        "isFilterRefreshed",
        "SortKeyIndex",
        "FilterType",
        "MetaAllSearch",
        "MustShow",
        "originalDataCount",
        "FilterTextUpperCase",
        "FilterTextUseAnd",
        "FilterTextUseOr",
        "UseSelectedAllText",
        "IsSetFocused",
        "SelectedAllText",
        "isEditValueChanging",
        "OnMultiComboBoxNodeClick",
        "OnMultiComboBoxValueChange",
        "ContentSel",
        "ElementText",
        "mTabIndex",
        "InTableLayout",
        "mIsReadOnly",
        "mSortType",
        "running",
        "exeObjName",
      ],
    },
    "Icon.Tooltip.TextBox": {
      // MultiCombo -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // MultiCombo -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // MultiCombo -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // MultiCombo -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.Calendar": {
      // MultiCombo -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // MultiCombo -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarYM": {
      // MultiCombo -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarYear": {
      // MultiCombo -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // MultiCombo -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // MultiCombo -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // MultiCombo -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // MultiCombo -> CalendarYearFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "TextBox": {
    "Icon.Tooltip.MaskTextBox": {
      // TextBox -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "InputType",
        "mInputType",
        "LanguageCode",
        "mLanguageCode",
        "MaxLength",
        "mMaxLength",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mText",
        "mFormula",
        "mIsReadOnly",
      ],
    },
    "Icon.Tooltip.NumberBox": {
      // TextBox -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "InputType",
        "mInputType",
        "LanguageCode",
        "mLanguageCode",
        "MaxLength",
        "mMaxLength",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mText",
        "mFormula",
        "mIsReadOnly",
      ],
    },
    "Icon.Tooltip.RichTextBox": {
      // TextBox -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "InputType",
        "mInputType",
        "LanguageCode",
        "mLanguageCode",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mText",
        "mFormula",
        "mIsReadOnly",
      ],
    },
    "Icon.Tooltip.ComboBox": {
      // TextBox -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // TextBox -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.Calendar": {
      // TextBox -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // TextBox -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYM": {
      // TextBox -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYear": {
      // TextBox -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // TextBox -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // TextBox -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // TextBox -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // TextBox -> CalendarYearFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
  },

  "MaskTextBox": {
    "Icon.Tooltip.TextBox": {
      // MaskTextBox -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "Format",
        "mFormat",
        "_textboxUI",
        "FormatConverter",
        "IsSetFocused",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mText",
        "mFormula",
        "mIsReadOnly",
      ],
    },
    "Icon.Tooltip.NumberBox": {
      // MaskTextBox -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "FormatConverter",
        "IsSetFocused",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mText",
        "mFormat",
        "mFormula",
        "mIsReadOnly",
        "_textboxUI",
      ],
    },
    "Icon.Tooltip.RichTextBox": {
      // MaskTextBox -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "Format",
        "mFormat",
        "FormatConverter",
        "IsSetFocused",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mText",
        "mFormula",
        "mIsReadOnly",
        "_textboxUI",
      ],
    },
    "Icon.Tooltip.ComboBox": {
      // MaskTextBox -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // MaskTextBox -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.Calendar": {
      // MaskTextBox -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // MaskTextBox -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYM": {
      // MaskTextBox -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYear": {
      // MaskTextBox -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // MaskTextBox -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // MaskTextBox -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // MaskTextBox -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // MaskTextBox -> CalendarYearFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
  },

  "NumberBox": {
    "Icon.Tooltip.TextBox": {
      // NumberBox -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "Format",
        "mFormat",
        "InputFormFormat",
        "_numberBox",
        "_textboxUI",
        "NotNull",
        "Maximum",
        "mMaximum",
        "Minimum",
        "mMinimum",
        "Formatter",
        "mValue",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mText",
        "mFormula",
        "mIsReadOnly",
      ],
    },
    "Icon.Tooltip.MaskTextBox": {
      // NumberBox -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "InputFormFormat",
        "_numberBox",
        "NotNull",
        "Maximum",
        "mMaximum",
        "Minimum",
        "mMinimum",
        "Formatter",
        "mValue",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mText",
        "mFormat",
        "mFormula",
        "mIsReadOnly",
        "_textboxUI",
      ],
    },
    "Icon.Tooltip.RichTextBox": {
      // NumberBox -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "Format",
        "mFormat",
        "InputFormFormat",
        "_numberBox",
        "NotNull",
        "Maximum",
        "mMaximum",
        "Minimum",
        "mMinimum",
        "Formatter",
        "mValue",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mText",
        "mFormula",
        "mIsReadOnly",
        "_textboxUI",
      ],
    },
    "Icon.Tooltip.ComboBox": {
      // NumberBox -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // NumberBox -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.Calendar": {
      // NumberBox -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // NumberBox -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYM": {
      // NumberBox -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYear": {
      // NumberBox -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // NumberBox -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // NumberBox -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // NumberBox -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // NumberBox -> CalendarYearFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
  },

  "RichTextBox": {
    "Icon.Tooltip.TextBox": {
      // RichTextBox -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "_textboxUI",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mMaxLength",
        "mIsReadOnly",
        "mText",
        "mFormula",
      ],
    },
    "Icon.Tooltip.MaskTextBox": {
      // RichTextBox -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "MaxLength",
        "mMaxLength",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mIsReadOnly",
        "mText",
        "mFormula",
        "_textboxUI",
      ],
    },
    "Icon.Tooltip.NumberBox": {
      // RichTextBox -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "MaxLength",
        "mMaxLength",
        "visible",
        "isEnabled",
        "mTabIndex",
        "InTableLayout",
        "mIsReadOnly",
        "mText",
        "mFormula",
        "_textboxUI",
      ],
    },
    "Icon.Tooltip.ComboBox": {
      // RichTextBox -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // RichTextBox -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.Calendar": {
      // RichTextBox -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // RichTextBox -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYM": {
      // RichTextBox -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYear": {
      // RichTextBox -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // RichTextBox -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // RichTextBox -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // RichTextBox -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // RichTextBox -> CalendarYearFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
  },

  "Calendar": {
    "Icon.Tooltip.WeeklyCalendar": {
      // Calendar -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "FormatLanguageCode",
        "mOriginViewFormat",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement"
      ],
    },
    "Icon.Tooltip.CalendarYM": {
      // Calendar -> 'CalendarYM'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      name: "Month",
      controlType: "CalendarYM",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mUtilFormatConverter",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement"
      ],
    },
    "Icon.Tooltip.CalendarYear": {
      // Calendar -> 'CalendarYear'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      name: "Year",
      controlType: "CalendarYear",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mUtilFormatConverter",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement"
      ],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // Calendar -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // Calendar -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // Calendar -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // Calendar -> CalendarYearFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Year FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.ComboBox": {
      // Calendar -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // Calendar -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.TextBox": {
      // Calendar -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // Calendar -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // Calendar -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // Calendar -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "CalendarWeekly": {
    "Icon.Tooltip.Calendar": {
      // WeeklyCalendar -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement",
      ],
    },
    "Icon.Tooltip.CalendarYM": {
      // WeeklyCalendar -> 'CalendarYM'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mUtilFormatConverter",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement",
      ],
    },
    "Icon.Tooltip.CalendarYear": {
      // WeeklyCalendar -> 'CalendarYear'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mUtilFormatConverter",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement"
      ],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // WeeklyCalendar -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // WeeklyCalendar -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // WeeklyCalendar -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // WeeklyCalendar -> CalendarYearFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.ComboBox": {
      // WeeklyCalendar -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // WeeklyCalendar -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.TextBox": {
      // WeeklyCalendar -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // WeeklyCalendar -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // WeeklyCalendar -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // WeeklyCalendar -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "CalendarYM": {
    "Icon.Tooltip.Calendar": {
      // CalendarYM -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "FormatLanguageCode",
        "mIsReadOnly",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement",
      ],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // CalendarYM -> 'WeeklyCalendar'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "FormatLanguageCode",
        "mIsReadOnly",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement",
      ],
    },
    "Icon.Tooltip.CalendarYear": {
      // CalendarYM -> 'CalendarYear'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "FormatLanguageCode",
        "mIsReadOnly",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement",
      ],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // CalendarYM -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // CalendarYM -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // CalendarYM -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // CalendarYM -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.ComboBox": {
      // CalendarYM -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // CalendarYM -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.TextBox": {
      // CalendarYM -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // CalendarYM -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // CalendarYM -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // CalendarYM -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "CalendarYear": {
    "Icon.Tooltip.Calendar": {
      // CalendarYear -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "FormatLanguageCode",
        "mIsReadOnly",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement",
      ],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // CalendarYear -> 'WeeklyCalendar'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "FormatLanguageCode",
        "mIsReadOnly",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement"
      ],
    },
    "Icon.Tooltip.CalendarYM": {
      // CalendarYear -> 'CalendarYM'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "mUtilFormatConverter",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mText",
        "mDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxElement",
        "mCalendarComponent",
        "mCalendarComponentTableRowElement",
        "mTextBoxElement"
      ],
    },
    "Icon.Tooltip.CalendarFromTo": {
      // CalendarYear -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // CalendarYear -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // CalendarYear -> CalendarYMFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // CalendarYear -> CalendarYearFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.ComboBox": {
      // CalendarYear -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // CalendarYear -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.TextBox": {
      // CalendarYear -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // CalendarYear -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // CalendarYear -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // CalendarYear -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "CalendarFromTo": {
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // CalendarFromTo -> WeeklyCalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mOriginViewFormat",
        "FormatLanguageCode",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mToDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // CalendarFromTo -> 'CalendarYMFromTo'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "InTableLayout",
        "mName2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // CalendarFromTo -> 'CalendarYearFromTo'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent"
      ],
    },
    "Icon.Tooltip.Calendar": {
      // CalendarFromTo -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // CalendarFromTo -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYM": {
      // CalendarFromTo -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYear": {
      // CalendarFromTo -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.ComboBox": {
      // CalendarFromTo -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // CalendarFromTo -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.TextBox": {
      // CalendarFromTo -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // CalendarFromTo -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // CalendarFromTo -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // CalendarFromTo -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "CalendarWeeklyFromTo": {
    "Icon.Tooltip.CalendarFromTo": {
      // WeeklyCalendarFromTo -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // WeeklyCalendarFromTo -> 'CalendarYMFromTo'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // WeeklyCalendarFromTo -> 'CalendarYearFromTo'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.Calendar": {
      // WeeklyCalendarFromTo -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // WeeklyCalendarFromTo -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYM": {
      // WeeklyCalendarFromTo -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYear": {
      // WeeklyCalendarFromTo -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.ComboBox": {
      // WeeklyCalendarFromTo -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // WeeklyCalendarFromTo -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.TextBox": {
      // WeeklyCalendarFromTo -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // WeeklyCalendarFromTo -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // WeeklyCalendarFromTo -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // WeeklyCalendarFromTo -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "CalendarYearFromTo": {
    "Icon.Tooltip.CalendarFromTo": {
      // CalendarYearFromTo -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // CalendarYearFromTo -> 'WeeklyCalendarFromTo'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.CalendarYMFromTo": {
      // CalendarYearFromTo -> 'CalendarYMFromTo'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYMFromTo",
      name: "M FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.Calendar": {
      // CalendarYearFromTo -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // CalendarYearFromTo -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYM": {
      // CalendarYearFromTo -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYear": {
      // CalendarYearFromTo -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.ComboBox": {
      // CalendarYearFromTo -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // CalendarYearFromTo -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.TextBox": {
      // CalendarYearFromTo -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // CalendarYearFromTo -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // CalendarYearFromTo -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // CalendarYearFromTo -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "CalendarYMFromTo": {
    "Icon.Tooltip.CalendarFromTo": {
      // CalendarYMFromTo -> CalendarFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarFromTo",
      name: "D FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.WeeklyCalendarFromTo": {
      // CalendarYMFromTo -> 'WeeklyCalendarFromTo'
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeeklyFromTo",
      name: "Wk FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.CalendarYearFromTo": {
      // CalendarYMFromTo -> CalendarYearFromTo
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYearFromTo",
      name: "Y FromTo",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: [
        "visible",
        "mTabIndex",
        "Name2",
        "mInitDate",
        "mDataFormat",
        "mViewFormat",
        "mIsReadOnly",
        "mFromText",
        "mToText",
        "mFromDate",
        "mFromDate",
        "mMinDate",
        "mMaxDate",
        "mCalendarType",
        "mCreateComponent",
        "mCalendarControlTableElement",
        "mCalendarComponentTableElement",
        "mTextBoxFromElement",
        "mTextBoxToElement",
        "mCalendarFromComponent",
        "mCalendarToComponent",
      ],
    },
    "Icon.Tooltip.Calendar": {
      // CalendarYMFromTo -> Calendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "Calendar",
      name: "Daily",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.WeeklyCalendar": {
      // CalendarYMFromTo -> WeeklyCalendar
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarWeekly",
      name: "Weekly",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYM": {
      // CalendarYMFromTo -> CalendarYM
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYM",
      name: "Month",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.CalendarYear": {
      // CalendarYMFromTo -> CalendarYear
      parentId: enControlChangeGroupList["Icon.Tooltip.Calendar"].controlType,
      controlType: "CalendarYear",
      name: "Year",
      Img: "Calendar.png",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mCalendarType", "mCreateComponent", "mIsReadOnly"],
    },
    "Icon.Tooltip.ComboBox": {
      // CalendarYMFromTo -> Combo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "ComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.MultiCombo": {
      // CalendarYMFromTo -> MultiCombo
      parentId: enControlChangeGroupList["Icon.Tooltip.ComboBox"].controlType,
      controlType: "MultiComboBox",
      addProps: [{ Visible: "Visible" }, { TabIndex: "TabIndex" }],
      ignoreProps: ["visible", "mTabIndex", "mIsReadOnly"],
    },
    "Icon.Tooltip.TextBox": {
      // CalendarYMFromTo -> TextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "TextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.MaskTextBox": {
      // CalendarYMFromTo -> MaskTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "MaskTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.NumberBox": {
      // CalendarYMFromTo -> NumberBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "NumberBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
    "Icon.Tooltip.RichTextBox": {
      // CalendarYMFromTo -> RichTextBox
      parentId: enControlChangeGroupList["Icon.Tooltip.TextBox"].controlType,
      controlType: "RichTextBox",
      addProps: [
        // 강제로 저장할 property 를 지정한다. {'FromPropertyName': 'ToPropertyName'}
        { Visible: "Visible" },
        { TabIndex: "TabIndex" },
      ],
      // 저장하지 않을 property를 지정한다.
      ignoreProps: ["visible", "mTabIndex"],
    },
  },

  "DataGrid": {
    "Icon.Tooltip.Olap-Grid": {
      // DataGrid -> OlapGrid
      controlType: "OlapGrid",
      addProps: [],
      ignoreProps: [],//"DataSet"
    }
  },

  "OlapGrid": {
    "Icon.Tooltip.Data-Grid": {
      // OlapGrid -> DataGrid
      controlType: "DataGrid",
      addProps: [],
      ignoreProps: [],
    },
  },
} as const;
export type enControlChangeList = UnionEnum<typeof enControlChangeList>;

export const enFormulaCalendarType = {
  YEAR: 1,
  MONTH: 2,
  DAY: 5,
  HOUR: 11,
  MINUTE: 12,
  SECOND: 13
} as const;
export type enFormulaCalendarType = UnionEnum<typeof enFormulaCalendarType>;

// Control의 Support 타입 정의
export const enCalendarType = {
  DailyCalendar: 1,         //일 달력
  MonthlyCalendar: 2,       //월 달력
  YearCalendar: 3,          //년 달력
  WeeklyCalendar: 4         //주 달력
} as const;
export type enCalendarType = UnionEnum<typeof enCalendarType>;

// Service 요청 완료 mode 정의(실행완료, 취소 등등) : ProgressManager.Remove() 시 사용.
export const enServiceRemoveMode = {
  Exe: 'exec',
  Cancel: 'cancel',
  Abort: 'abort',
  GetPortletCardList: 'portlet GetCardList',   // TODO : 이거는 확인 후 삭제해도 될 듯.
  Export: 'Export'
}
export type enServiceRemoveMode = UnionEnum<typeof enServiceRemoveMode>;

// Control의 Support 타입 정의
export const enBoxStyleViewType = {
  ListView: 1,         //ListView Mode
  ComboBox: 2          //ComboBox Mode
} as const;
export type enBoxStyleViewType = UnionEnum<typeof enBoxStyleViewType>;

export const enCalendarTextArea = {
  FromTextBox: 0,
  ToTextBox: 1
} as const;
export type enCalendarTextArea = UnionEnum<typeof enCalendarTextArea>;

export const enExportSortOrder = {
  PivotGrid: '0',
  DataGrid: '1',
  Others: '2'
}
export type enExportSortOrder = UnionEnum<typeof enExportSortOrder>;


export const enFormulaDialogType = {
  OlapGrid: 'olapgrid',
  DataGrid: 'grid',
  Text: 'text'
}
export type enFormulaDialogType = UnionEnum<typeof enFormulaDialogType>;

export const enAUDStatus = {
  Idle: 0,
  Busy: 1
}
export type enAUDStatus = UnionEnum<typeof enAUDStatus>;

export const enShellModuleType = {
  M0ADM : "M0_ADM", //i-canvas6.0 META 디자이너
  MT : "MT", // MATRIX
  M0 : "M0", //META 6
  MV : "MV", //modiMETAView6
  ST : "ST",	//modiSTREAM
  SH : "SH",	//modiSTREAMOTHER
  SX : "SX",	//modiMETAViewEx
  SC : "SC",	//AUD Framework에서 생긴 신규 Component
  MEET : "SDMT", // 회의체
  AUDAll : "SDC", // SD + SC -> SDC
  MVIEWAll : "MVSX", // (BCRM#C1795) META Viewer > 조회조건 속성 설정 창 > 입력 유형이 데이터셋인 경우 파일 다이얼로그 오픈 시 파일 유형에 .mtvx 추가
  SXD : "SXD", //SD + SX + D0 : i-AUD + i-META View  + i-MATRIX(메타뷰의 경우 포탈 트리에 노출되는 보고서 메타뷰 입니다.)
  AUD : "SD"
}
export type enShellModuleType = UnionEnum<typeof enShellModuleType>;
export const enShellOpenType = {
  OPEN : 1,
  SAVE : 2,
  SAVEAS : 3
}
export type enShellOpenType = UnionEnum<typeof enShellOpenType>;

export type enClientLogType = UnionEnum<typeof enClientLogType>;
export const enClientLogType = {
  Info: 'Info',
  Error: 'Error',
  Debug: 'Debug',
  Sql: 'Sql',
  SqlInfo: 'SqlInfo'
}