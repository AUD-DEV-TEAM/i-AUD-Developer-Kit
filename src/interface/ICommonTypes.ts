import {
	enDataSourceParamType,
// 	enExcelExportControlType,
// 	enInitType,
// 	enInputType,
// 	enRefreshType,
// 	enSortType,
// 	enTreeViewType,
// 	enSelectBoxDisplayType,
// 	enSaveMode,
// 	enSizeType,
// 	enKeyType,
// 	enTextAlign,
// 	enDialogButtonType
} from "./enum/CommonEnum";
// import {
// 	enMetaFieldArea,
// 	enMetaFieldCategory,
// 	enMetaFieldSummaryType,
// 	enMetaFieldSummaryVariation,
// 	enMetaFieldSortType,
// 	enMetaFieldMetaRollupType,
// 	enMetaFieldGroupFunction,
// 	enMetaFieldAfterRollUpType,
// 	enMetaConditionOperator,
// 	enMetaConditionFilterType,
// 	enMetaConditionPromptValidate,
// 	enMetaConditionDefaultPromptType,
// } from "@enum/MetaEnum";
// import {
// 	enPropCursor,
// 	enPropFontFamily,
// 	enPropFontAlignH,
// 	enPropFontAlignV,
// 	enPropAction_SelectRowType,
// 	enMultiLineType
// } from "@enum/PropertiesEnum";
// import { iGrid } from "@control/igrid/iGrid";
// import { OlapGrid } from "@control/olapgrid/iOLAP.OlapGrid";
// import { IonRangeSliderOptions } from "ion-rangeslider";
// import { enCalcSubTotalType, enDisplaySubTotalType, enGridIMEType, enGridValidateType } from "@enum/GridEnum";
// import { DataGridColumn } from "@control/grid/DataGridColumn";
// import { Point } from "@drawing/Point";
// import { IndexCollection } from "@data/IndexCollection";
// import { Style } from "@drawing/style/Style";
// import { IViewer } from "@interfacemodel/document/IViewer";
// import { INamedObject } from "@interfacedata/INamedDictionary";
// import { IColor } from "@interfacedrawing/IColor";

type NullOrUndefined = undefined | null;
interface JQuery {
    //mask(format: string): void;
    //unmask(): void;
    i18n();
    inputmask(format: string): void;
}

// control event arguments Type
export interface IEventArgs {
	Id: string;
	Text: string;
	Name: string;
}

// Style Option Type
export interface IStyleOption {
	backgroundEle: HTMLDivElement;
	borderEle: HTMLDivElement;
	fontEle: HTMLDivElement;
}

// Workflow Event Type
// export interface IWorkFlowMouseEventObject {
// 	OnClick: Function | NullOrUndefined;
// 	OnMouseOut: Function | NullOrUndefined;
// 	OnMouseOver: Function | NullOrUndefined;
// }

// export interface IWorkFlowKeyboardEventObject {
// 	OnTextChange: Function | NullOrUndefined;
// 	OnTextKeydown: Function | NullOrUndefined;
// 	OnTextKeypress: Function | NullOrUndefined;
// 	OnTextKeyup: Function | NullOrUndefined;
// }

// datasource types start
export interface IDataSourceParam {
	// Name: string | NullOrUndefined;
	Name: string;
	Name2?: string | NullOrUndefined;
	ParamType: enDataSourceParamType | NullOrUndefined;
	Value: Array<any> | NullOrUndefined;
}

export interface IDataSourceColumn {
	Name: string | NullOrUndefined;
	Type: enDataSourceParamType | NullOrUndefined;
	Caption: string | NullOrUndefined;
}
// datasource types end

// metadatasource types start
// export interface IMetaField {
// 	Id: string;
// 	Name: string | NullOrUndefined;
// 	Area: enMetaFieldArea;
// 	Category: enMetaFieldCategory;
// 	SummaryType: enMetaFieldSummaryType;
// 	SummaryVariation: enMetaFieldSummaryVariation;
// 	SummaryBaseFieldKey: string | NullOrUndefined;
// 	SortType: enMetaFieldSortType;
// 	SortOrder: number | NullOrUndefined;
// 	Formula: string | NullOrUndefined;
// 	Format: string | NullOrUndefined;
// 	ToolTipText: string | NullOrUndefined;
// 	MetaItemCode: string | NullOrUndefined;
// 	MetaRollupType: enMetaFieldMetaRollupType;
// 	GroupFunction: enMetaFieldGroupFunction;
// 	AfterRollUpType: enMetaFieldAfterRollUpType;
// 	Caption: string | NullOrUndefined;
// 	LanguageCode: string | NullOrUndefined;
// 	IsMetaField: boolean;
// 	SortBaseField: string | NullOrUndefined;
// 	RelationFields: Array<string> | NullOrUndefined;
// 	Childrens: Array<IMetaField>;
// }

// export interface IFilterInfo {
// 	Key: string | NullOrUndefined;
// 	Caption: string | NullOrUndefined;
// 	ServiceID: string | NullOrUndefined;
// 	SQL: string | NullOrUndefined;
// 	MetaViewInfo: string | NullOrUndefined;
// 	AfterRefreshFilter: string | NullOrUndefined;
// 	Name?: string | NullOrUndefined;
// }

// export interface ICondition {
// 	Code: string;
// 	Name: string;
// 	Description: string | NullOrUndefined;
// 	MetaitemCode: string | NullOrUndefined;
// 	VariableName: string | NullOrUndefined;
// 	DefaultFormat: string | NullOrUndefined;
// 	Operator: enMetaConditionOperator;
// 	FilterType: enMetaConditionFilterType;
// 	PromptValidate: enMetaConditionPromptValidate;
// 	PromptType: enMetaConditionDefaultPromptType;
// 	DefaultPromptValue: string | NullOrUndefined;
// 	Category: enMetaFieldCategory;
// 	LanguageCode: string | NullOrUndefined;
// 	UseAllItems: boolean;
// 	ToolTipText?: string;
// 	OpGroup?: number;
// 	LOVCacheExpireDate?: number;
// 	InitValue1?: string | NullOrUndefined;
// 	InitValue2?: string | NullOrUndefined;
// }

// export interface IConditionSetItem {
// 	Name: string;
// 	Condition: ICondition;
// 	LabelName: string;
// 	ControlNames: Array<string>;
// }

// metadatasource types end

// context menu types start
/*
 * option :
 * 	string id - 구분자
 *	string name - 표시할 이름
 *	string img - 아이콘(url)
 *	object record - 데이터
 *	boolean disable - 사용 유무
 *	function event - 체크박스 클릭시 이벤트
 *	string type - 'none', 'checkbox', etc...
 */
export interface IContextMenuItemArgs {
	id: string | NullOrUndefined;
	name: string | NullOrUndefined;
	img?: string | NullOrUndefined;
	record?: object | NullOrUndefined | boolean;
	record2?: object | NullOrUndefined | boolean;
	disable?: boolean;
	event?: Function | NullOrUndefined;
	type?: string | NullOrUndefined;
	imgClass?: string | NullOrUndefined;
	parentTableId?: string | NullOrUndefined;
	parentId?: string | NullOrUndefined;
	element?: HTMLElement | NullOrUndefined;
	icon?: string | NullOrUndefined;
	param?: any | NullOrUndefined;
	clickEvent?: Function;
	active?: boolean | NullOrUndefined;
}

export interface IContextMenuItem {
	Id: string | NullOrUndefined; // menu id {분리자의 경우 '|' 를 아이디로 지정}
	Name: string | NullOrUndefined; // menu disp name
	ICon: string | NullOrUndefined; // icon
	IConClass: string | NullOrUndefined; // icon Class's Name
	Record: any; // data
	Record2?: any; // data
	Type: string | NullOrUndefined;
	isDisabled: boolean | NullOrUndefined;
	ParentId: string | NullOrUndefined; //default:DEFAULT, DEFAULT이면 무조건 첫레벨. 부모 없음, Id 넣어 주세요.
	ParentTableId: string | NullOrUndefined;
	Img: string | NullOrUndefined;
	Event: any;
	Element: any;
	Param: string | NullOrUndefined;
	ClickEvent: Function | NullOrUndefined;
	Active: boolean | NullOrUndefined;
}
// context menu types end

// group control types start
export interface IDocumentSize {
	//Status: number; // 0:초기상태, 1:PageSize 설정 후
	Width: number;
	Height: number;
}

export interface IGroupControlElement {
	ChildElements: Array<any> | NullOrUndefined;
}

export interface IGroupControlPosition {
	Top: number;
	Left: number;
	Height?: number | NullOrUndefined;
	Width?: number | NullOrUndefined;
	GroupPosition?: string;
	LabelStyle?: any;
}

export interface IGroupControlBorderThickness {
	borderTop: number;
	borderLeft: number;
	borderRight: number;
	borderBottom: number;
}
// group control types end

// image control types start
// export interface IExcelExportFormat {
// 	Type: enExcelExportControlType;
// 	FileName: string;
// 	Width: number;
// 	Height: number;
// 	Range: any;
// 	Value: string;
// }
// image control types end
// export interface ILabelElement {
// 	LanguageCode: string;
// 	UseTooltip: boolean;
// 	Text: string;
// 	Cursor: enPropCursor;
// 	Formula: string;
// 	UseTextOverflow: boolean;
// 	BindingInfo: IBindingInfo_Ele;
// 	MxBinding: any;
// }

// TextBox control types start
export interface IMaskTextBoxElement extends IControlElement {
	Text: string;
	Value: string;
	Format: string;
	IsReadOnly: boolean;
	Formula: string;
	BindingInfo: IBindingInfo_Ele;
	MxBinding: any;
}

export interface INumberBoxElement extends IControlElement {
	Format: string;
	Formula: string;
	Value: string | number;
	Text: string | number | NullOrUndefined;
	Maximum: string;
	Minimum: string;
	IsReadOnly: boolean;
	BindingInfo: IBindingInfo_Ele;
	MxBinding: any;
	NotNull: boolean;
}


export interface IRichTextBoxElement extends IControlElement {
	Formula: string;
	IsReadOnly: boolean;
	MaxLength: number;
	BindingInfo: IBindingInfo_Ele;
	MxBinding: any;
	Value: string;
	Text: string;
}

// export interface ITextBoxElement extends IControlElement {
// 	LanguageCode: string;
// 	Text: string;
// 	Value: string;
// 	IsReadOnly: boolean;
// 	MaxLength: number;
// 	InputType: enInputType;
// 	Formula: string;
// 	BindingInfo: IBindingInfo_Ele;
// 	MxBinding: any;
// }

// TextBox control types end

// MultiComboBox control types start
export interface IMultiComboBoxWorkFlowEvents {
	OnExecuteStart: Function | NullOrUndefined;
	OnNodeClick: Function | NullOrUndefined;
	OnTextKeyup: Function | NullOrUndefined;
	OnValueChange: Function | NullOrUndefined;
	OnPopUpOpenStart: Function | NullOrUndefined; //lg구매에서만 사용하도록, 오픈하지 않습니다.
	OnDataBindEnd: Function | NullOrUndefined;
}

export interface IDataTableInfos {
	ParentKeyName: string | NullOrUndefined;
	KeyName: string | NullOrUndefined;
	CaptionName: string | NullOrUndefined;
	ValueName: string | NullOrUndefined;
	ImageName: string | NullOrUndefined;
	TooltipName: string | NullOrUndefined;
}

export interface IMultiCheckItem {
	IsChecked: boolean;
	Value: string;
	Caption: string;
	ToolTip: string;
	ImageIcon: string;
	Data: any;
	VALUE: string;
	LABEL: string;
}

export interface ITreeComboNodeItem {
	HasChildrens?: boolean | NullOrUndefined | number;
	IsChecked?: boolean | NullOrUndefined;
	IsExpanded?: boolean | NullOrUndefined;
	ParentNode?: ITreeComboNodeItem | NullOrUndefined;
	Value?: string | NullOrUndefined;
	getData?: Function;
	getChildrens?: Function;
	Expand?: Function;
	Collapsed?: Function;
	setChecked?: Function;
}
// MultiComboBox control types end

export interface IWorkFlowOlapGridEventObject {
	OnExportStart: Function | NullOrUndefined;
	OnDataCellDoubleClick: Function | NullOrUndefined;
	OnSelectionChanged: Function | NullOrUndefined;
	OnHeaderClicked: Function | NullOrUndefined;
	OnHeaderDoubleClicked: Function | NullOrUndefined;
	OnMultiHeaderClicked: Function | NullOrUndefined;
	OnMultiHeaderDoubleClicked: null;
	OnDataBindEnd: Function | NullOrUndefined;
}

export interface ISplitterOffSetInfo {
	split: {
		x: number;
		w: number;
		r: number;
	};
	prop: {
		w: number;
	};
	view: {
		r: number;
	};
	design: {
		r: number;
	};
}

export interface IPosition {
	Left: number;
	Top: number;
	Bottom: number;
	Right: number;
}



// export interface IExecuteObj {
// 	Execute(): void;
// 	xhr: JQuery.jqXHR<any> | null;
// 	Name: string;
// 	Cancel(): void;
// 	ExecuteArgs: IExecuteArg;
// }

// export interface IPoolObject extends INamedObject  {
//     Cancel(): void;
//     ExecuteArgs: IExecuteArg;
// }

export interface IExecuteArg {
	Success: boolean;
	Message: string;
}
export interface IBindingInfo {
	GridID: string;
	GridName: string;
	GridColumn: string;
	GridColumnID: string;
	GridDefinedRow: number | undefined;
}

export interface IBindingInfo_Ele {
	BindingGId: string;
	BindingGName: string;
	BindingGColumn: string;
	BindingGColumnId: string;
	BindingGRowIdx: number | undefined;
}

export interface ITreeComboInfo extends IBindingInfo {
	GridColumnCaption: string;
}

export interface IControlEvent {
	Name: string;
	Handler: any;
}

export interface IColorRGBA {
	ColorR: number;
	ColorG: number;
	ColorB: number;
	ColorA: number;
}

export interface IControlElement {
}

// export interface IControlProperty {
// 	Group: string;
// 	Name: string;
// 	Type: string;
// 	DisplayType: string;
// 	Caption?: string;
// 	Disable?: boolean;
// 	Hide?: boolean;
// 	MaxLength?: number;
// 	Align?: string;
// 	Placeholder?: string;
// 	List?: Array<string>;		// Radio
// 	ComboList?: Map<string, string>;
// 	DsCode?: string;
// 	TargetDsCode?: string;
// 	UseCommonSource?: boolean;
// 	SelectedColumnName?: Function;
// 	ColumnList?: Array<any>;
// 	Option?: any;				// min, max ..
// 	CheckBoxOption? : any;
// 	ControlType: enMultiLineType;
// 	getTreeData?: Function;
// 	getMXGrid?: Function;
// 	AddDisableStyle?: Boolean;
// 	Width?: number;														// [Popup] 타입에서 사용
// 	Height?: number;													// [Popup] 타입에서 사용
// 	MinWidth?: number;													// [Popup] 타입에서 사용
// 	MinHeight?: number;													// [Popup] 타입에서 사용
// 	Title?: string;														// [Popup] 타입에서 사용
// 	Resizable?: boolean;												// [Popup] 타입에서 사용
// 	Editable?: boolean;													// [Popup] 타입에서 사용
// 	ReportCode?: string;												// [Popup] 타입에서 사용
// 	RequestParam?: any;													// [Popup] 타입에서 사용
// 	ButtonType?: number;												// [Popup] 타입에서 사용
// 	SystemView?: boolean;												// [Popup] 타입에서 사용		
// 	onDialogResult: (type: enDialogButtonType, args: any) => {};		// [Popup] 타입에서 사용
// 	onBeforeLoad: () => {};												// [Popup] 타입에서 사용
// 	onAfterClear: () => {};												// [Popup] 타입에서 사용
// 	getValue: IControlPropertyGetValueCallback;
// 	setValue: IControlPropertySetValueCallback;
// 	setValueByKey?: IControlPropertySetValueByKeyCallback;


// 	Content?: any;			// PropertyGrid 에서 생성한 Content 객체(DOM or Object)
// }
export interface IControlPropertySetValueCallback {
	(value1: any);
}
export interface IControlPropertySetValueByKeyCallback {
	(value1: any, value2: any);
}
export interface IControlPropertyGetValueCallback {
	(): any;
}

export interface ITreeDataSourceInfo {
	LabelField: string;
	ValueField: string;
	HasChildField: string;
	ImageField: string;
	OnImageField: string;
	KeyField: string;
	ParentKeyField: string;
	ToolTipField : string;
}

// export interface ITreeElement {
// 	DataSource: string;
// 	DataSource_child: string;
// 	AutoRefresh: boolean;
// 	DoRefresh: boolean;
// 	ShowCheckBox: boolean;
// 	DataSourceInfo: ITreeDataSourceInfo;
// 	HoverBackgroundColor: IColor;
// 	HoverFontColor: IColor;
// }

export interface ISliderInfo {
	IsReadOnly: boolean;
	Grid: boolean;
	Step: number;
	GridNum: number;
	Format: string;
	UseFormat: boolean;
	Type: string;
}

export interface IDataSourceInfo {
	Min: number;
	Max: number;
	From: number;
	To: string;
	UseToPoint: boolean;
}

// export interface ISliderStyle {
// 	ShowMinMax: boolean;
// 	ShowFromTo: boolean;
// 	Skin: IonRangeSliderOptions["skin"];
// }

// export interface ISliderElement extends IControlElement {
// 	DataSource: string;
// 	SliderInfo: ISliderInfo;
// 	DataSourceInfo: IDataSourceInfo;
// 	SliderStyle: ISliderStyle;
// };

export interface IRadioButtonElement extends IControlElement {
	LanguageCode: string;
	Text: string;
	TextPosition: string;
	GroupName: string;
	CheckedValue: string;
	Checked: boolean;
	BindingInfo: IBindingInfo_Ele;
}

export interface IMouseOverElement {
	UseYn: boolean;
	BoxStyle: string;
}

export interface IMouseDownElement {
	UseYn: boolean;
	BoxStyle: string;
}

export interface IShadowElement {
	UseYn: boolean;
	ColorR: number;
	ColorG: number;
	ColorB: number;
	ColorA: number;
	HLeng: number;
	VLeng: number;
	BlurRadius: number;
	SpreadRadius: number;
	Inset: boolean;
}

// export interface IFileUploadButtonElement extends IControlElement {
// 	LanguageCode: string;
// 	SaveFolderName: string;
// 	Value: string;
// 	Cursor: enPropCursor;
// 	SaveLimitSize: number;
// 	MouseOver?: IMouseOverElement;
// 	MouseDown?: IMouseDownElement;
// 	Shadow?: IShadowElement;
// }

export interface ICheckBoxElement extends IControlElement {
	LanguageCode: string;
	Text: string;
	TextPosition: string;
	GroupName: string;
	CheckedValue: string;
	UnCheckedValue: string;
	Checked: boolean;
	BindingInfo: IBindingInfo_Ele;
}

export interface ICalendarFromToElement extends IControlElement {
	Name2: string;
	InitDate: string;
	DataFormat: string;
	FormatLanguageCode: string;
	IsReadOnly: boolean;
	FromText: string;
	ToText: string;
	MinDate: string;
	MaxDate: string;
	UseValidationFN: boolean;
	UseValidation: boolean;
	ValidationMsg: string;
	UseValidateDate: boolean;
	ViewFormat: string;
	FromDate?: number;
	ToDate?: number;
	BindingInfo?: IBindingInfo_Ele;
	BindingInfo2?: IBindingInfo_Ele;
}

export interface ICalendarElement extends IControlElement {
	InitDate: string;
	DataFormat: string;
	FormatLanguageCode: string;
	IsReadOnly: boolean;
	Text: string;
	MinDate: string;
	MaxDate: string;
	BindingInfo: IBindingInfo_Ele;
	MxBinding: any;
	ViewFormat?: string;
	Date?: number;
}

export interface IWorkFlowEvents {
	OnValueChanged?: Function | null;
	OnFromValueChanged?: Function | null;
	OnValueChange?: Function | null;
	OnClick?: Function | null;
	OnUploadCompleted?: Function | null;
	OnTextChange?: Function | null;
	OnTextKeydown?: Function | null;
	OnTextKeypress?: Function | null;
	OnTextKeyup?: Function | null;
	OnStart?: Function | null;
	OnFinish?: Function | null;
	OnChange?: Function | null;
	OnDataBindEnd?: Function | null;
	OnNodeClick?: Function | null;
	OnNodeDbClick?: Function | null;
	OnNodeCheckboxClick?: Function | null;
	OnNodeBeforeExpand?: Function | null;
	OnNodeBeforeCollapsed?: Function | null;
	OnNodeAfterExpand?: Function | null;
	OnNodeAfterCollapsed?: Function | null;
	OnRowLineDragStart?: Function | null;
	OnRowLineDragEnd?: Function | null;
	OnRowLineMouseOver?: Function | null;
	OnColumnLineDragStart?: Function | null;
	OnColumnLineDragEnd?: Function | null;
	OnColumnLineMouseOver?: Function | null;
	OnCellClick?: Function | null;
	OnCellDoubleClick?: Function | null;
	OnCellTouch?: Function | null;
	OnCellDoubleTouch?: Function | null;
	OnScroll?: Function | null;
	OnStartEdit?: Function | null;
	OnEndEdit?: Function | null;
	OnDeletingRow?: Function | null;
	OnGridColumnHeaderClicked?: Function | null;
	OnGridColumnHeaderDoubleClicked?: Function | null;
	OnGridMultiHeaderClicked?: Function | null;
	OnGridMultiHeaderDoubleClicked?: Function | null;
	OnGridCheckBoxClicked?: Function | null;
	OnGridMultiHeaderCheckBoxClicked?: Function | null;
	OnCellLoaded?: Function | null;
	OnGridMultiHeaderCellLoaded?: Function | null;
	OnCurrentCellChanged?: Function | null;
	OnCurrentRowChanged?: Function | null;
	OnValidate?: Function | null;
	OnGridContextMenuOpening?: Function | null;
	OnGridExportStart?: Function | null;
	OnGridComboBoxChanged?: Function | null;
	OnMouseMove?: Function | null;
	OnStartClipBoardPaste?: Function | null;
	OnEndClipBoardPaste?: Function | null;
	OnGridFilterChanged?: Function | null;
	OnCreateNewRow?: Function | null;
	OnGridClick?: Function | null;
	OnDataPointClick?: Function | null;
	OnSelectedItemChanged?: Function | null;
	OnDoubleClick?: Function | null;
}

export interface IWebContainerElement {
	TargetURL: string;
	AutoRefresh: boolean;
	DoRefresh: boolean;
}

export interface IBoxStyleBackground {
	ColorR?: number;
	ColorG?: number;
	ColorB?: number;
	ColorA?: number;
}

export interface IBoxStyleBorder {
	ColorR?: number;
	ColorG?: number;
	ColorB?: number;
	ColorA?: number;
	CornerRadius?: string;
	LineType?: string;
	Thickness?: string;
}

// export interface IBoxStyleFont {
// 	Bold?: boolean;
// 	ColorR?: number;
// 	ColorG?: number;
// 	ColorB?: number;
// 	ColorA?: number;
// 	Family?: enPropFontFamily;
// 	HorizontalAlignment?: enPropFontAlignH;
// 	Italic?: boolean;
// 	Size?: number;
// 	UnderLine?: boolean;
// 	VerticalAlignment?: enPropFontAlignV;
// }

// export interface IBoxStyleElement {
// 	Name: string;
// 	StyleName: string;
// 	Limit: boolean;
// 	Background: IBoxStyleBackground;
// 	Border: IBoxStyleBorder;
// 	Font: IBoxStyleFont;
// 	CreateUser: string;
// }

// export interface IButtonElement {
// 	LanguageCode: string;
// 	UseTooltip: boolean;
// 	Value: string;
// 	Cursor: enPropCursor;
// 	MouseOver?: IMouseOverElement;
// 	MouseDown?: IMouseDownElement;
// 	Shadow?: IShadowElement;
// }

export interface IPropertiesDetailOptionMessageConfirm {
	Text: string;
	LanguageCode: string;
	UseFlag: boolean;
}

export interface IPropertiesDetailOptionMessage {
	Confirm: IPropertiesDetailOptionMessageConfirm;
	CallbackFunc?: any;
	Update?: IPropertiesDetailOptionMessageConfirm;
	Validation?: IPropertiesDetailOptionMessageConfirm;
}

// export interface IPropertiesDetailOption {
// 	GridName?: string;
// 	SelectType?: enPropAction_SelectRowType;
// 	MultiRowFlag?: boolean | string;
// 	AddType?: any;
// 	CallbackFunc?: string;
// 	Message?: IPropertiesDetailOptionMessage;
// 	CheckColumnName?: string;
// 	UploadPath?: string;
// 	FileType?: string;
// }

// export interface IPropertiesDetail {
// 	Option: IPropertiesDetailOption;
// 	Action: Function;
// 	Drawing: Function;
// }

// export interface IProperties {
// 	None: IPropertiesDetail;
// 	Add: IPropertiesDetail;
// 	Delete: IPropertiesDetail;
// 	Save: IPropertiesDetail;
// 	Refresh: IPropertiesDetail;
// 	Upload: IPropertiesDetail;
// }

export interface IOnExecuteStartArgs {
	Id: string;
	Cancel: boolean;
};

export interface IComboBoxDataSourceInfo {
	LabelField: string;
	ValueField: string;
}

export interface IMultiComboBoxDataSourceInfo {
	LabelField: string;
	ValueField: string;
	ImageField: string;
	CaptionField: string;
	ChildField: string;
	ParentField: string;
	TooltipField: string;
}

export interface IMultiComboBoxPivotBindingInfo {
	PivotBindingPId: string;
	PivotBindingPName: string;
	PivotBindingPColumn: string;
	PivotBindingPColumnId: string;
}

// export interface IComboBoxElement {
// 	UseTooltip: boolean;
// 	DataSource: string;
// 	Value: string;
// 	Text: string;
// 	InitType: enInitType;
// 	InitValue?: string;
// 	RefreshType: enRefreshType;
// 	IsReadOnly: boolean;
// 	SortType: enSortType;
// 	AutoRefresh: boolean;
// 	AfterRefresh: string;
// 	UseAllItems: boolean;
// 	UseAllItemsText: string,
// 	DisplayType: enSelectBoxDisplayType;
// 	DataSourceInfo: IComboBoxDataSourceInfo;
// 	BindingInfo: IBindingInfo_Ele;
// }

// export interface IMultiComboBoxElement {
// 	UseTooltip: boolean;
// 	DataSource: string;
// 	EditValue: string;
// 	CaptionText: string;
// 	InitType: enInitType;
// 	InitValue: string;
// 	RefreshType: enRefreshType;
// 	IsReadOnly: boolean;
// 	SortType: enSortType;
// 	AfterRefresh: string;
// 	ClearTargetData: boolean;
// 	AutoRefresh: boolean;
// 	CheckedAll: boolean;
// 	UsedSelectAllQueryParamValue: boolean;
// 	EditableValueText: boolean;
// 	CacheExpiryTime: number;
// 	IsMultiSelect: boolean;
// 	AutoChildSelect: boolean;
// 	LeafNodeOnly: boolean;
// 	HideCheckBox: boolean;
// 	AutoExpandLevel: number;
// 	IndentSize: number;
// 	EmptyValue: string;
// 	TreeViewType: enTreeViewType;
// 	DialogWidth: number;
// 	DialogHeight: number;
// 	MetaItemExecuteCode: string;
// 	UseSelectedAllText: boolean;
// 	SelectedAllText: string;
// 	UseAllItems: boolean;
// 	FilterVariableName: string;
// 	DataSourceInfo: IMultiComboBoxDataSourceInfo;
// 	PivotBindingInfo: IMultiComboBoxPivotBindingInfo;
// 	BindingInfo: IBindingInfo_Ele;
// }

export interface ILanguageResourceItem {
	Name: string;
	Code: string;
	Value: string;
	Desc: string;
}

export interface IPivotUpdateBindingInfo {
	PivotId: string,
	PivotName: string,
	FieldName: string,
	Values: Array<any>,
	IsAll: boolean
}

//MX-Grid 용  WorkFlowEvents 목록
export interface IMXGridWorkFlowEvents {
	OnDataBindEnd: Function | null;
	OnCellDoubleClick: Function | null;
	OnSelectionChange: Function | null;
}
export interface IMXGridElement {
	ServerScript?: string,
	AutoRefresh: boolean,
	DoRefresh: boolean,
	DoExport: boolean,
	TemplateCode?: string,
	ActiveSheet?: string,
	UseMultiSheet?: boolean,
	FreezeLineThickness: number,
	ParentGridName?: string,
	DisableScrollBar:boolean,
	LimitOfBinding: number,
	SelectedColor: ISimpleColor,
	FreezeLineColor: ISimpleColor
}
export interface ISimpleColor {
	R: number,
	G: number,
	B: number,
	A: number,
}
export interface IFormatValue {
	Value: string;
	Color: string | undefined;
}

export interface IOlapGridWorkFlowEvents {
	OnExportStart: Function | null;
	OnDataCellDoubleClick: Function | null;
	OnSelectionChanged: Function | null;
	OnHeaderClicked: Function | null;
	OnHeaderDoubleClicked: Function | null;
	OnMultiHeaderClicked: Function | null;
	OnMultiHeaderDoubleClicked: Function | null;
	OnDataBindEnd: Function | null;
}

export interface IRectangle {
	top: number;
	bottom: number;
	left: number;
	right: number;
	width: number;
	height: number;
}

export interface IStudioEvent {
	Type: string;
	key: string;
	keyCode: number;
	isEnter(): boolean;
	isSpace(): boolean;
	keyEvent: KeyboardEvent;
}

export interface ISaveImageInfo {
	ImageWidth: string;
	ImageHeight: string;
	retCode?: string;
}

// export interface IEventSender {
// 	viewerId: string;
// 	self: iGrid | OlapGrid;
// }

export interface IBoxStyleOption {
	width: number;
	height: number;
	confirmFunc: ((currentBoxStyleKey: string) => void) | null;
	cancelFunc: (() => void) | null;
}

// export interface IDataGridColumn {
// 	mViewer: IViewer;
// 	basicStroke: string;
// 	basicFill: string;
// 	basicMinFill: string;
// 	basicMaxFill: string;
// 	basicChartBackColor: string;
// 	Caption: string;
// 	mWidth: number;
// 	Visible: boolean;
// 	Editable: boolean;
// 	Sortable: boolean;
// 	Filterable: boolean;
// 	Mergeable: boolean;
// 	Resizable: boolean;
// 	UseExport: boolean;
// 	DataType: number;
// 	ColumnType: number;
// 	CursorType: string;	
// 	OriginFormat: string | undefined;
// 	Unit: number | undefined;
// 	Formula: string | undefined;
// 	InitValue: string | number | boolean | undefined;
// 	KeyType: enKeyType;
// 	HeaderPosition: enTextAlign;
// 	TextPosition: enTextAlign;
// 	DataStyle: Style | undefined;
// 	FieldForTooltip: string | undefined;
// 	FieldForMerge: string | undefined;
// 	Filter: IndexCollection | undefined;
// 	IsSubTotalColumn: boolean;
// 	DisplaySubTotalType: enDisplaySubTotalType;
// 	CalcSubTotalType: enCalcSubTotalType;
// 	SortType: enSortType;					// 정렬 유형	
// 	MinWidth: number;					// 최소 넓이
// 	ActualWidth: number;					// 실제 널이
// 	GridColumnWidthType: enSizeType;			// 컬럼 넓이 유형(Pixel, Star)
// 	SaveMode: enSaveMode;					// CRUD 저장 모드
// 	LanguageCode: string | undefined;	// 언어코드
// 	FormatLanguageCode: string | undefined;	// DateTime, Number type일 때 다국어 포맷코드
// 	ToolTipText: string | undefined;			// 툴팁 텍스트
// 	LineHeight: number;                          // font size * line height 가 실제 text 높이 (0 : 한줄로 표시)
// 	CheckedValue: string | undefined;			// 체크값
// 	UnCheckedValue: string | undefined;			// 언체크값
// 	ImageWidth: number;							// 이미지 넓이
// 	ImageHeight: number;							// 이미지 높이
// 	DataSource: string | undefined;				// 콤보 데이터소스
// 	ValuePath: string | undefined;				// 값 경로(컬럼)
// 	LabelPath: string | undefined;				// 라벨 경로(컬럼)
// 	ParentValuePath: string | undefined;			// 부모 값 경로(컬럼)
// 	DefinedItems: string | undefined;			// 사용자 정의된 항목
// 	ColorField: string | undefined;				// 색상 참조 필드
// 	ChartHeight: string | undefined;				// 차트 높이
// 	ChartBackgroundColor: string | undefined;    // 차트 배경색
// 	SourceFields: string | undefined;				// 트렌드라인 포인트 값 목록
// 	StrokeThickness: number;						// 라인 굵기
// 	Stroke: string | undefined;				// 포인트 라인 색상
// 	Fill: string | undefined;				// 포인트 내부 색상
// 	MinFill: string | undefined;				// 최소값 포인트 내부 색상
// 	MaxFill: string | undefined;				// 최대값 포인트 내부 샋ㅇ
// 	PointSize: number | undefined;			// 포인트 사이즈
// 	PointType: number;						// 포인트 유형	
// 	StartMergePoint: Point | undefined;		// 병합 셀 시작 지점(셀 세로 병합 시 사용)
// 	DesignatedSortType: number;
// 	DesignatedSortOrder: number;		// 정렬 순서 지정안된 컬럼인 경우 -1
// 	ShowSubTotalVal: boolean;		// 소계 컬럼값 보일지 유무
// 	tempAutoFitWidth: number;
// 	BasicMaxLength: number;
// 	LocaleFormat: string | undefined;
// 	Validator:IGridValidate;
// }

// export interface IGridValidate {
// 	ValidateType: enGridValidateType,
// 	Value1: number | undefined,
// 	Value2: number | undefined,
// 	UseGuideMessage: boolean,
// 	GuideLanguageCode: string,
// 	UseErrorMessage: boolean,
// 	ErrorLanguageCode: string,
// 	IMEMode: enGridIMEType
// }

// 조건 개인화 관련 필터 정보
export interface IFilterItem {
	NAME: string,
	CAPTION: string,
	VALUES: Array<any>,
	DISPVALUE: string,
	FROMTO?: boolean,
	AFTERREFRESH?: string
}

export interface ISearchInfo {
	DataSource: { [Key:string] : any },
	Popup: { TitleText: string,
			 TitleLanguage: string,
			 Width: number,
			 Height: number },
	SettingColumns: { [Key:string] : any },
	SettingFields: { [Key:string] : any }
}

export interface IRecommendInfo {
	ColumnName: string,
	GridDataSource: string,
	RecommendFunction: Function
}

export interface IDatasourceEditorParams {
	ViewerId: string,
	DataSource?: object, //IDataSource 아님
	DataSourceCode?: string,
	DataSourceName?: string,
	RecommendObject?: IRecommendInfo
}

export interface ICommonDataSource {
    SQL_NAME: string;
    SQL_ID: string;
    DBMS_CODE: string;
    SQL_TEXT: string;
    VARIABLE_INFO: Array<{ Name: string, Type: string, VALUE: any }>;
    COLUMN_INFO: Array<{ Name: string, Type: string, Desc: string }>
}