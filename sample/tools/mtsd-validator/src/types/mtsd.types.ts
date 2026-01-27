/**
 * MTSD 파일 Validation을 위한 타입 정의
 * i-AUD Developer Kit - MTSD File Validator
 */

// ============================================
// 기본 타입 정의
// ============================================

/** 색상 정보 */
export interface Color {
  R: number;
  G: number;
  B: number;
  A: number;
}

/** 색상 정보 (문자열 버전) */
export interface ColorString {
  ColorR: string | number;
  ColorG: string | number;
  ColorB: string | number;
  ColorA: string | number;
}

/** 테두리 정보 */
export interface Border {
  Color?: Color;
  ColorR?: string | number;
  ColorG?: string | number;
  ColorB?: string | number;
  ColorA?: string | number;
  LineType: string;
  Thickness: string;
  CornerRadius: string;
}

/** 배경 정보 */
export interface Background {
  Color?: Color;
  ColorR?: string | number;
  ColorG?: string | number;
  ColorB?: string | number;
  ColorA?: string | number;
}

/** 폰트 정보 */
export interface Font {
  Color: Color;
  Size: number | string;
  Family: string;
  Bold: boolean;
  Italic: boolean;
  UnderLine: boolean;
  HorizontalAlignment: string;
  VerticalAlignment: string;
  TempFontFamily?: string;
}

/** 스타일 정보 */
export interface Style {
  Type?: number;
  BoxStyle?: string;
  Background?: Background;
  Border?: Border;
  Font?: Font;
  VerticalBorder?: any;
  HorizontalBorder?: any;
}

/** 위치 및 도킹 정보 */
export interface Docking {
  Left?: boolean;
  Right?: boolean;
  Top?: boolean;
  Bottom?: boolean;
  Margin: string;
  HoldSize?: boolean;
  MinWidth: number;
  MinHeight: number;
}

/** 위치 정보 */
export interface Position {
  Left: number;
  Top: number;
  Width: number;
  Height: number;
  ZIndex: number;
  TabIndex: number;
  Docking: Docking;
}

// ============================================
// 데이터소스 관련 타입
// ============================================

/** 데이터소스 컬럼 */
export interface DataSourceColumn {
  Name: string;
  Type: 'String' | 'Numeric' | 'DateTime' | string;
}

/** 데이터소스 파라미터 */
export interface DataSourceParam {
  Name: string;
  Value?: string;
  Type?: string;
}

/** 데이터소스 */
export interface DataSource {
  Id: string;
  Name: string;
  UseMeta: string;
  UseCache: string;
  ConnectionCode: string;
  Encrypted: string;
  DSType: number;
  SQL: string;
  Params: DataSourceParam[];
  Columns: DataSourceColumn[];
}

/** 데이터소스 컨테이너 */
export interface DataSources {
  Datas: DataSource[];
}

// ============================================
// 컨트롤 관련 타입
// ============================================

/** 컨트롤 타입 열거형 */
export type ControlType =
  | 'Label'
  | 'Button'
  | 'TextBox'
  | 'RichTextBox'
  | 'ComboBox'
  | 'MultiComboBox'
  | 'ListBox'
  | 'CheckBox'
  | 'RadioButton'
  | 'Calendar'
  | 'CalendarFromTo'
  | 'CalendarYM'
  | 'CalendarYMFromTo'
  | 'CalendarYear'
  | 'CalendarYearFromTo'
  | 'CalendarWeekly'
  | 'CalendarWeeklyFromTo'
  | 'DataGrid'
  | 'GroupGrid'
  | 'TreeGrid'
  | 'OlapGrid'
  | 'Chart'
  | 'PieChart'
  | 'PolygonChart'
  | 'ScatterChart'
  | 'Image'
  | 'Tab'
  | 'Group'
  | 'Tree'
  | 'TreeView'
  | 'MetaTreeView'
  | 'Slicer'
  | 'Slider'
  | 'ColorPicker'
  | 'NumberBox'
  | 'MaskTextBox'
  | 'FileUploadButton'
  | 'WebContainer'
  | 'UserComponent'
  | 'ContextMenu'
  | 'DialogBox'
  | 'PickList'
  | 'iGrid'
  | 'AddIn'
  | string;

/** 기본 컨트롤 요소 */
export interface BaseElement {
  Type: ControlType;
  Id: string;
  Name: string;
  Visible?: boolean;
  Position: Position;
  Style: Style;
  LanguageCode?: string;
  DataSource?: string;
  AutoRefresh?: boolean;
  DoRefresh?: boolean;
  DoExport?: boolean;
}

/** Label 컨트롤 */
export interface LabelElement extends BaseElement {
  Type: 'Label';
  Text: string;
  Formula?: string;
  Cursor?: string;
  MxBinding?: string;
  MxBindingUseStyle?: boolean;
  UseTooltip?: boolean;
  Margin?: {
    Left: number;
    Top: number;
    Right: number;
    Bottom: number;
    Text: string;
  };
}

/** Button 컨트롤 */
export interface ButtonElement extends BaseElement {
  Type: 'Button';
  Text: string;
  Cursor?: string;
}

/** TextBox 컨트롤 */
export interface TextBoxElement extends BaseElement {
  Type: 'TextBox';
  Text?: string;
  Value?: string;
  Formula?: string;
  IsReadOnly?: boolean;
  MaxLength?: number;
  MxBinding?: string;
  InputType?: number;
}

/** RichTextBox 컨트롤 */
export interface RichTextBoxElement extends BaseElement {
  Type: 'RichTextBox';
  Text?: string;
  Value?: string;
  Formula?: string;
  IsReadOnly?: boolean;
  MaxLength?: number;
  MxBinding?: string;
}

/** ComboBox 컨트롤 */
export interface ComboBoxElement extends BaseElement {
  Type: 'ComboBox';
  InitType?: number;
  InitValue?: string;
  IsReadOnly?: boolean;
  UseAllItems?: boolean;
  UseAllItemsText?: string;
}

/** CheckBox 컨트롤 */
export interface CheckBoxElement extends BaseElement {
  Type: 'CheckBox';
  Text?: string;
  Checked?: boolean;
  CheckedValue?: string;
  UncheckedValue?: string;
}

/** Validator 설정 */
export interface Validator {
  ValidateType: string | number;
  Value1?: string;
  Value2?: string;
  UseGuideMessage?: boolean;
  GuideLanguageCode?: string;
  UseErrorMessage?: boolean;
  ErrorLanguageCode?: string;
  IMEMode?: number;
}

/** DataGrid 컬럼 */
export interface DataGridColumn {
  Name: string;
  Caption: string;
  Width: number;
  Validator?: Validator;
  ColumnType?: number;
  Format?: string;
  InitValue?: string;
  KeyType?: number;
  DataType?: number;
  HeaderPosition?: string;
  TextPosition?: string;
  DisplaySubTotalType?: string;
  CalcSubTotalType?: string;
  Visible?: boolean;
  Editable?: boolean;
}

/** DataGrid 컨트롤 */
export interface DataGridElement extends BaseElement {
  Type: 'DataGrid';
  Columns: DataGridColumn[];
  CellMargin?: string;
  ShowHeader?: number;
  ColumnHeaderHeight?: number;
  RowHeight?: number;
  Editable?: boolean;
  FontSize?: number;
  UsePPTExport?: boolean;
  FrozenLineBrush?: any;
}

/** OlapGrid Field */
export interface OlapField {
  Key: string;
  Caption: string;
  ToolTipField?: string;
  ToolTipText?: string;
  Category: number;
  Area: number;
  SummaryType: number;
  TotalSummaryType?: number;
  SummaryVariation?: number;
  GroupByType?: number;
  Format?: string;
  Formula?: string;
  Formula2?: string;
  RefFormula?: string;
  Width: number;
  Unit?: number;
  CreateType?: number;
  SortType?: number;
  MoveAble?: boolean;
  SortAble?: boolean;
  FilterAble?: boolean;
  AllowFilter?: boolean;
  AllowRow?: boolean;
  AllowColumn?: boolean;
  AllowData?: boolean;
  KeyType?: number;
  DataType?: number;
  SaveMode?: number;
  Visible?: boolean;
  Expanded?: boolean;
  FilterInfo?: any;
  RelationFields?: any[];
}

/** OlapGrid Options */
export interface OlapOptions {
  ViewType?: number;
  IsExpandAll?: boolean;
  ShowExpandButtons?: boolean;
  EmptyCellText?: string;
  NotAvaliableCellText?: string;
  ZeroDivisioinCellText?: string;
  ErrorCellText?: string;
  RowGrandTotalText?: string;
  ColumnGrandTotalText?: string;
  RowTotalText?: string;
  ColumnTotalText?: string;
  RowTotalLocation?: number;
  ColumnTotalLocation?: number;
  DisplayColumnSubTotal?: boolean;
  DisplayRowSubTotal?: boolean;
  DisplayColumnGrandTotal?: boolean;
  DisplayRowGrandTotal?: boolean;
  ShowFilterArea?: boolean;
  ShowColumnrArea?: boolean;
  ShowRowArea?: boolean;
  ShowDataArea?: boolean;
  UseMultiHeader?: boolean;
  CellHeight?: number;
  HeaderCellHeight?: number;
  TreeHeaderWidth?: number;
  Style?: any;
  CacheOption?: any;
  PagerInfo?: any;
  ExportOption?: any;
}

/** OlapGrid iOLAPView */
export interface IOLAPView {
  Options: OlapOptions;
  TopFilter?: any;
  PreFilters?: any[];
  Fields: OlapField[];
  MultiHeaderCells?: any[];
}

/** OlapGrid 컨트롤 */
export interface OlapGridElement extends BaseElement {
  Type: 'OlapGrid';
  iOLAPView: IOLAPView;
  ExtraOption?: any;
}

/** Chart 컨트롤 */
export interface ChartElement extends BaseElement {
  Type: 'Chart';
  ChartType?: number;
  Title?: any;
  Legend?: any;
  XAxis?: any;
  YAxis?: any;
  Series?: any[];
  PlotOptions?: any;
}

/** Image 컨트롤 */
export interface ImageElement extends BaseElement {
  Type: 'Image';
  ImagePath?: string;
  ImageUrl?: string;
  Stretch?: number;
}

/** Tab 컨트롤 */
export interface TabElement extends BaseElement {
  Type: 'Tab';
  TabItems?: any[];
  SelectedIndex?: number;
  TabPosition?: number;
}

/** Group 컨트롤 */
export interface GroupElement extends BaseElement {
  Type: 'Group';
  Elements?: Element[];
  Text?: string;
  ShowHeader?: boolean;
}

/** 모든 컨트롤 요소 타입 */
export type Element =
  | LabelElement
  | ButtonElement
  | TextBoxElement
  | RichTextBoxElement
  | ComboBoxElement
  | CheckBoxElement
  | DataGridElement
  | OlapGridElement
  | ChartElement
  | ImageElement
  | TabElement
  | GroupElement
  | BaseElement;

// ============================================
// Form 관련 타입
// ============================================

/** Form 정보 */
export interface Form {
  Id: string;
  Name: string;
  Activated: boolean;
  Visible: boolean;
  LanguageCode?: string;
  Style: Style;
  Elements: Element[];
}

// ============================================
// Report 관련 타입
// ============================================

/** 보고서 정보 */
export interface ReportInfo {
  ReportCode: string;
  FolderCode: string;
  SavePath: string;
  ReportName: string;
  Writer: string;
  WriteDate: string;
  Editor: string;
  EditDate: string;
  TabPosition: number;
  UseLayout: boolean;
  DocumentVersion: string;
  RefreshType?: number;
}

/** 변수 정보 */
export interface Variable {
  Name: string;
  Value: string;
  Desc?: string;
  Formula?: string;
}

/** 메타 데이터소스 */
export interface MetaDataSources {
  MetaDataSources: any[];
}

// ============================================
// MTSD 파일 전체 구조
// ============================================

/** MTSD 파일 구조 */
export interface MtsdFile {
  ReportInfo: ReportInfo;
  DataSources: DataSources;
  ScriptText: string;
  ServerScriptText: any[];
  Forms: Form[];
  MetaDataSources: MetaDataSources;
  EXECUTION_PLANS: any[];
  Variables: Variable[];
  Modules: any[];
  ResponsiveLayout: any[];
  Langs: any[];
  WorkFlowModules?: any[];
  WorkFlowInfo?: string;
  schModel?: any;
}
