import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Image } from "@AUD_CLIENT/control/Image";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { TableLayout } from "@AUD_CLIENT/control/table/TableLayout";

declare const Matrix: Matrix;
declare const parent: any;

/*****************************
 *
 *****************************/

/*
 * script name    : DataList Template
 * script version : 1.4
 * modified date  : 2021-02-10
 */
const TEMPLATE_VERSION = "2.1";
const TEMPLATE_NAME = "LIST";

let chartToggle = false;
let chartCellHeight = 250;
let firstLoading = false;

// controls
let Chart: Chart | null = null;
let DataGrid: DataGrid | null = null;
let GRP_CONDITION: Group | null = null;
let imgchart: Image | null = null;
let imgMeta: Image | null = null;
let rdoCSV: RadioButton | null = null;
let rdoHTML: RadioButton | null = null;
let rdoHWP: RadioButton | null = null;
let rdoText: RadioButton | null = null;
let rdoWord: RadioButton | null = null;
let rdoXlsx: RadioButton | null = null;
let TableLayout: TableLayout | null = null;
let tbxReportName: Label | null = null;

let grpSeperate: Group | null = null;
let ColumnSeperator: TextBox | null = null;
let RowSeperator: TextBox | null = null;

let WIN_EXPORT: any = null;

// 다국어 리스트
const LANGUAGE_VALIDATE = Matrix.getLanguage("TEMPLATE.VALIDATE_CHECK_NULL", "{0} 은/는 필수 입력입니다.");
const LANGUAGE_EXPORT_REPORT_TITLE = Matrix.getLanguage("TEMPLATE.EXPORT_REPORT_NAME", "■ 보고서 명 :");
const LANGUAGE_EXPORT_USER_NAME = Matrix.getLanguage("TEMPLATE.EXPORT_USER_NAME", "■ 작성자 :");
const LANGUAGE_EXPORT_FILTER_TITLE = Matrix.getLanguage("TEMPLATE.EXPORT_FILTER_NAME", "■ 필터 조건 :");
const LANGUAGE_EXPORT_CREATE_DATE = Matrix.getLanguage("TEMPLATE.EXPORT_CREATE_DATE", "■ 생성 일자 :");
const LANGUAGE_EXPORT_FONT_NAME = Matrix.getLanguage("TEMPLATE.EXPORT_FONT_NAME", "맑은 고딕");
const LANGUAGE_EXPORT_TITLE = Matrix.getLanguage("TEMPLATE.EXPORT_TITLE", "내보내기");

const initControlVariables = function(): void {
	const allElements = Matrix.getAllObjects();
	allElements.forEach(function(ele: any, _idx: number): void {
		switch (ele.Name) {
			case "Chart": Chart = ele; break;
			case "DataGrid": DataGrid = ele; break;
			case "GRP_CONDITION": GRP_CONDITION = ele; break;
			case "imgchart": imgchart = ele; break;
			case "imgMeta": imgMeta = ele; break;
			case "rdoCSV": rdoCSV = ele; break;
			case "rdoHTML": rdoHTML = ele; break;
			case "rdoHWP": rdoHWP = ele; break;
			case "rdoText": rdoText = ele; break;
			case "rdoWord": rdoWord = ele; break;
			case "rdoXlsx": rdoXlsx = ele; break;
			case "TableLayout": TableLayout = ele; break;
			case "tbxReportName": tbxReportName = ele; break;
			case "grpSeperate": grpSeperate = ele; break;
			case "ColumnSeperator": ColumnSeperator = ele; break;
			case "RowSeperator": RowSeperator = ele; break;
		}
	});
};

/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :
*****************************************/
const OnDocumentLoadComplete = function(_sender: any, _args: any): void {
	initControlVariables();
	const chartCell = TableLayout!.GetCell(0, 0);
	if (chartCell.Row.Height > 0) {
		chartToggle = true;
	}
	// 구분자 세팅
	if (parent?.iStudioConfig) {
		(ColumnSeperator as TextBox).Text = parent.iStudioConfig.DataGridTextExportColSeparator;
		(RowSeperator as TextBox).Text = parent.iStudioConfig.DataGridTextExportRowSeparator;
	}
};

/*****************************************
* 문서가 로드되고 AutoRefresh가 완료되는 시점에 발생합니다.
* * arguments :
*		 bool	Success (Readonly:False) : 성공여부
*		 string	Message (Readonly:False) : 에러 메시지
*****************************************/
const OnLoadComplete = function(_sender: any, _args: any): void {
	try {
		if (Matrix.getControlDataSource(DataGrid!.Name) == null) {
			// Meta를 GRID_NAME 컨트롤에 바인딩
			Matrix.TemplateLoadedSetting(DataGrid!.Name);
			makeMetaFilters(true);
			const ds = Matrix.getControlDataSource(DataGrid!.Name);
			if (ds != null) {
				if ((tbxReportName as Label).Text == "") {
					(tbxReportName as Label).Text = "  " + (ds as any).name;
				}
			}
		} else {
			Execute(true);
		}
	} catch (e) { }
};

const OnNewReportWizardChanged = function(_sender: any, args: any): void {
	Matrix.TemplateLoadedSetting(DataGrid!.Name);
	makeMetaFilters(true);
	args.Handled = true;
};

const makeMetaFilters = function(isLoading: boolean): void {
	const option = {
		'UseGroup': false,
		'GRP_CONDITION_NAME': "GRP_CONDITION",
		'Top': 34,
		'Left': 2,
		'Height': 23,
		'LabelStyle': {
			'BackgroundColor': '212,232,242,1',
			'BorderColor': '191,191,191,1'
		}
	};
	Matrix.MakeMetaFilterControls(option);

	Matrix.Update();
	Execute(isLoading);
};

const Execute = function(isLoading: boolean): void {
	firstLoading = isLoading;
	Matrix.doRefresh(DataGrid!.Name);
};

/*****************************************
* Refresh가 실행되는 시점에 발생합니다.
* * arguments :
*		 bool	IsAutoRefresh (Readonly:False) : true일 경우 AutoRefresh 동작 입니다.
*		 string	Target (Readonly:False) : 현대 Refresh 대상(들)의 이름
*		 bool	Cancel (Readonly:False) : 이 값을 true로 설정 시 실행이 취소됩니다.
*****************************************/
const OnExecuteStart = function(_sender: any, args: any): void {
	if (args.IsAutoRefresh) return;
	try {
		const result = Matrix.ValidateMetaFilterValues(DataGrid!.Name);
		if (result != "") {
			args.Cancel = true;
			if (!firstLoading)
				Matrix.Information(LANGUAGE_VALIDATE.replace("{0}", result), result);
		}
		firstLoading = false;
	} catch (e) { }
};

/*****************************************
* 컨트롤의 메타 소스가 변경되면 발생합니다.
* * arguments :
*		 bool	Handled (Readonly:False) : 스크립트 수동 핸들링 여부
*****************************************/
const OnMetaLayoutChange = function(_sender: any, args: any): void {
	args.Handled = true;
	Execute(false);
};

/*****************************************
* 이미지 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :
*		 string	Id (Readonly:False) : 컨트롤이름
*		 string	Text (Readonly:False) : 라벨 값
*****************************************/
const OnImageClick = function(_sender: any, args: any): void {
	if (args.Id == "imgMeta") {
		const meta = (Matrix as any).getMetaController(DataGrid!.Name);
		meta.ShowModal();
	} else if (args.Id == "imgchart") {
		const chartCell = TableLayout!.GetCell(0, 0);
		if (chartToggle) {
			chartCellHeight = chartCell.Row.Height;
			chartCell.Row.Height = 0;
			chartToggle = false;
		} else {
			chartCell.Row.Height = chartCellHeight;
			chartToggle = true;
		}
		TableLayout!.Update();
	}
};

/*****************************************
* i-PORTAL에서 엑셀 다운로드 버튼 클릭 시 작동.(정의되어있지 않으면 기본 엑셀 다운로드 팝업창이 출력)
* * arguments :
*****************************************/
const OnExcelExportStart = function(_sender: any, _args: any): void {
	if (WIN_EXPORT != null)
		WIN_EXPORT.Close();

	WIN_EXPORT = Matrix.ShowWindow("EXPORT", 0, 0, 400, 340, true, false, LANGUAGE_EXPORT_TITLE, false, "#ffffff", 2);
	WIN_EXPORT.OnDialogResult = function(type: string): void {
		if (type == 'OK') {
			if (rdoXlsx!.Checked) exportFile("xlsx");
			else if (rdoHTML!.Checked) exportFile("htm");
			else if (rdoWord!.Checked) exportFile("docx");
			else if (rdoHWP!.Checked) exportFile("hwp");
			else if (rdoCSV!.Checked) Matrix.ExportServiceCall("DataGrid", 0);
			else if (rdoText!.Checked) {
				// 구분자 세팅
				parent.iStudioConfig.DataGridTextExportColSeparator = (ColumnSeperator as TextBox).Text;
				parent.iStudioConfig.DataGridTextExportRowSeparator = (RowSeperator as TextBox).Text;
				Matrix.ExportServiceCall("DataGrid", 1);
			}
			WIN_EXPORT.Close();
			WIN_EXPORT = null;
		}
	};
	WIN_EXPORT.OnClosed = function(_s: any, _e: any): void {
		WIN_EXPORT = null;
	};
	WIN_EXPORT.MoveToCenter();
};

const exportFile = function(type: string): void {
	const nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
	const columnCount = DataGrid!.GetColumnCount();
	let colspan = columnCount;
	if (type == "xlsx") colspan = Math.min(columnCount, 13);

	const WORKBOOK: any = {
		"FontName": LANGUAGE_EXPORT_FONT_NAME,
		"FontSize": 11,
		"WorkSheets": [
			{
				"Name": "Sheet1",
				"DisplayGridlines": "false",
				"Controls": [],
				"Ranges": [
					{ "Range": "A1", "ColSpan": colspan, "Value": LANGUAGE_EXPORT_REPORT_TITLE + " " + Matrix.GetReportInfo().NAME },
					{ "Range": "A2", "ColSpan": colspan, "Value": LANGUAGE_EXPORT_USER_NAME + " " + Matrix.GetUserInfo().UserName },
					{ "Range": "A3", "ColSpan": colspan, "Value": LANGUAGE_EXPORT_CREATE_DATE + " " + nowText },
					{ "Range": "A4", "ColSpan": colspan, "Value": LANGUAGE_EXPORT_FILTER_TITLE }
				]
			}
		]
	};

	const getColumnName = function(num: number): string {
		let ret = '';
		for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
			ret = String.fromCharCode(Math.floor((num % b) / a) + 65) + ret;
		}
		return ret;
	};

	const filterRows = getFilterCondition();
	for (let r = 0; r < filterRows.length; r++) {
		const filterValue = filterRows[r].Values.join(",");
		WORKBOOK.WorkSheets[0].Ranges.push({ "Range": "A" + (5 + r), "ColSpan": colspan, "Value": "        [" + filterRows[r].Name + "] " + filterRows[r].Operator + "  : " + filterValue });
	}
	const startRow = filterRows.length + 5;

	if (chartToggle) {
		try {
			chartToggle = Chart!.GetDataSet().GetTableCount() > 0;
		} catch (e) { chartToggle = false; }
	}
	if (chartToggle) {
		WORKBOOK.WorkSheets[0].Controls.push({ "Name": Chart!.Name, "Range": "A" + startRow + ":" + getColumnName(colspan) + (startRow + 10), "ImageExport": true });
		WORKBOOK.WorkSheets[0].Ranges.push({ "Range": "A" + startRow, "ColSpan": colspan, "RowSpan": 11 });
		WORKBOOK.WorkSheets[0].Controls.push({ "Name": DataGrid!.Name, "Range": "A" + (startRow + 12) });
	} else {
		WORKBOOK.WorkSheets[0].Controls.push({ "Name": DataGrid!.Name, "Range": "A" + (startRow) });
	}

	if ("xlsx" == type) {
		Matrix.ExcelExportServiceCall(WORKBOOK, null, function(e: any): void {
			if (e.Success == false) {
				alert("export fail" + e.Message);
				return;
			}
			const row = e.DataSet.GetTable(0).GetRow(0);
			const folderName = row.GetValue("FolderName");
			const fileName = row.GetValue("FileName");
			Matrix.DownloadFile(folderName + "/", fileName, Matrix.GetReportInfo().NAME + "_" + nowText + ".xlsx", true);
		});
	} else if ("docx" == type) {
		Matrix.WordExportServiceCall(WORKBOOK, null, function(e: any): void {
			if (e.Success == false) {
				alert("export fail" + e.Message);
				return;
			}
			const row = e.DataSet.GetTable(0).GetRow(0);
			const folderName = row.GetValue("FolderName");
			const fileName = row.GetValue("FileName");
			Matrix.DownloadFile(folderName + "/", fileName, Matrix.GetReportInfo().NAME + "_" + nowText + ".docx", true);
		});
	} else if (type == "htm") {
		Matrix.HTMLExportServiceCall(WORKBOOK, null, function(e: any): void {
			if (e.Success == false) {
				alert("export fail" + e.Message);
				return;
			}
			const row = e.DataSet.GetTable(0).GetRow(0);
			const folderName = row.GetValue("FolderName");
			const fileName = row.GetValue("FileName");
			Matrix.DownloadFile(folderName + "/", fileName, Matrix.GetReportInfo().NAME + "_" + nowText + ".htm", true);
		});
	} else if (type == "hwp") {
		Matrix.HMLExportServiceCall(WORKBOOK, null, function(e: any): void {
			if (e.Success == false) {
				alert("export fail" + e.Message);
				return;
			}
			const row = e.DataSet.GetTable(0).GetRow(0);
			const folderName = row.GetValue("FolderName");
			const fileName = row.GetValue("FileName");
			Matrix.DownloadFile(folderName + "/", fileName, Matrix.GetReportInfo().NAME + "_" + nowText + ".hwp", true);
		});
	}
};

const getFilterCondition = function(): any[] {
	const conditions = (Matrix as any).GetMetaTemplateConditions();
	const rows: any[] = [];
	for (const i in conditions) {
		const row: any = { "Name": "", "Operator": "", "Values": [] };
		const condition = conditions[i];
		const labelCtl: any = Matrix.getObject(condition.Label);
		row["Name"] = labelCtl.Text;
		row["Operator"] = labelCtl.Description;

		const controls = condition.Controls;
		const controlLength = controls.length;

		if (controlLength == 1) {
			const value1 = Matrix.GetParamValue(Matrix.getObject(controls[0]));
			for (const idx in value1) {
				row.Values.push(value1[idx]);
			}
		} else {
			const ctrl1: any = Matrix.getObject(controls[0]);
			const ctrl2: any = Matrix.getObject(controls[1]);
			let value1: any;
			let value2: any;
			if (ctrl1.__type__ == 'istudio.control.CalendarFromTo'
				|| ctrl1.__type__ == 'istudio.control.CalendarYMFromTo'
				|| ctrl1.__type__ == 'istudio.control.CalendarWeeklyFromTo') {
				value1 = ctrl1.GetValue();
				value2 = ctrl2.GetValue2();
			} else {
				value1 = Matrix.GetParamValue(ctrl1);
				value2 = Matrix.GetParamValue(ctrl2);
			}
			row.Values.push(value1 + " ~ " + value2);
		}
		rows.push(row);
	}
	return rows;
};

/*****************************************
* 라디오 컨트롤의 값이 변경될 경우 발생합니다.
* * arguments :
*		 string	Id (Readonly:False) : 컨트롤이름
*		 string	GroupName (Readonly:False) : 그룹명
*		 string	Text (Readonly:False) : 라벨 값
*		 bool	IsChecked (Readonly:False) : 체크 상태
*****************************************/
const OnRadioValueChange = function(_sender: any, args: any): void {
	switch (args.Id) {
		case 'rdoText':
			grpSeperate!.Visible = true;
			break;
		default:
			grpSeperate!.Visible = false;
	}
};

export {
	OnDocumentLoadComplete,
	OnLoadComplete,
	OnNewReportWizardChanged,
	OnExecuteStart,
	OnMetaLayoutChange,
	OnImageClick,
	OnExcelExportStart,
	OnRadioValueChange
};