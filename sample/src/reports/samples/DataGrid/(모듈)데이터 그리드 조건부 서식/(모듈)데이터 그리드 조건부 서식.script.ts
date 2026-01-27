import { Matrix as MatrixType } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Image } from "@AUD_CLIENT/control/Image";
import { TableLayout } from "@AUD_CLIENT/control/table/TableLayout";
import { Group } from "@AUD_CLIENT/control/Group";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { Control } from "@AUD_CLIENT/control/Control";

declare const Matrix: MatrixType;
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

let chartToggle = false; // 차트보임
let chartCellHeight = 250;
let firstLoading = false;

// controls
let ChartCtrl: Chart | null = null;
let DataGridCtrl: DataGrid | null = null;
let GRP_CONDITION: Group | null = null;
let imgchart: Image | null = null;
let imgMeta: Image | null = null;
let rdoCSV: RadioButton | null = null;
let rdoHTML: RadioButton | null = null;
let rdoHWP: RadioButton | null = null;
let rdoText: RadioButton | null = null;
let rdoWord: RadioButton | null = null;
let rdoXlsx: RadioButton | null = null;
let TableLayoutCtrl: TableLayout | null = null;
let tbxReportName: Label | null = null;

let grpSeperate: Group | null = null;
let ColumnSeperator: TextBox | null = null;
let RowSeperator: TextBox | null = null;

let WIN_EXPORT: any = null; // export window

// 다국어 리스트
const LANGUAGE_VALIDATE = Matrix.getLanguage(
  "TEMPLATE.VALIDATE_CHECK_NULL",
  "{0} 은/는 필수 입력입니다."
);
const LANGUAGE_EXPORT_REPORT_TITLE = Matrix.getLanguage(
  "TEMPLATE.EXPORT_REPORT_NAME",
  "■ 보고서 명 :"
);
const LANGUAGE_EXPORT_USER_NAME = Matrix.getLanguage(
  "TEMPLATE.EXPORT_USER_NAME",
  "■ 작성자 :"
);
const LANGUAGE_EXPORT_FILTER_TITLE = Matrix.getLanguage(
  "TEMPLATE.EXPORT_FILTER_NAME",
  "■ 필터 조건 :"
);
const LANGUAGE_EXPORT_CREATE_DATE = Matrix.getLanguage(
  "TEMPLATE.EXPORT_CREATE_DATE",
  "■ 생성 일자 :"
);
const LANGUAGE_EXPORT_FONT_NAME = Matrix.getLanguage(
  "TEMPLATE.EXPORT_FONT_NAME",
  "맑은 고딕"
);
const LANGUAGE_EXPORT_TITLE = Matrix.getLanguage(
  "TEMPLATE.EXPORT_TITLE",
  "내보내기"
);

const initControlVariables = function (): void {
  const allElements = Matrix.getAllObjects();
  allElements.forEach(function (ele: Control) {
    switch (ele.Name) {
      case "Chart":
        ChartCtrl = ele as Chart;
        break;
      case "DataGrid":
        DataGridCtrl = ele as DataGrid;
        break;
      case "GRP_CONDITION":
        GRP_CONDITION = ele as Group;
        break;
      case "imgchart":
        imgchart = ele as Image;
        break;
      case "imgMeta":
        imgMeta = ele as Image;
        break;
      case "rdoCSV":
        rdoCSV = ele as RadioButton;
        break;
      case "rdoHTML":
        rdoHTML = ele as RadioButton;
        break;
      case "rdoHWP":
        rdoHWP = ele as RadioButton;
        break;
      case "rdoText":
        rdoText = ele as RadioButton;
        break;
      case "rdoWord":
        rdoWord = ele as RadioButton;
        break;
      case "rdoXlsx":
        rdoXlsx = ele as RadioButton;
        break;
      case "TableLayout":
        TableLayoutCtrl = ele as TableLayout;
        break;
      case "tbxReportName":
        tbxReportName = ele as Label;
        break;
      case "grpSeperate":
        grpSeperate = ele as Group;
        break;
      case "ColumnSeperator":
        ColumnSeperator = ele as TextBox;
        break;
      case "RowSeperator":
        RowSeperator = ele as TextBox;
        break;
    }
  });
};

/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
const OnDocumentLoadComplete = function (sender: any, args: any): void {
  initControlVariables();
  const chartCell = TableLayoutCtrl!.GetCell(0, 0);
  if (chartCell.Row.Height > 0) {
    chartToggle = true;
  }
  // 구분자 세팅
  ColumnSeperator!.Text = parent.iStudioConfig.DataGridTextExportColSeparator;
  RowSeperator!.Text = parent.iStudioConfig.DataGridTextExportRowSeparator;
};

/*****************************************
 * 문서가 로드되고 AutoRefresh가 완료되는 시점에 발생합니다.
 * * arguments :
 *		 bool	Success (Readonly:False) : 성공여부
 *		 string	Message (Readonly:False) : 에러 메시지
 *****************************************/
const OnLoadComplete = function (sender: any, args: any): void {
  Matrix.Alert("aa");
  try {
    if (Matrix.getControlDataSource(DataGridCtrl!.Name) == null) {
      // Meta를 GRID_NAME 컨트롤에 바인딩
      Matrix.TemplateLoadedSetting(DataGridCtrl!.Name);
      makeMetaFilters(true);
      const ds = Matrix.getControlDataSource(DataGridCtrl!.Name);
      if (ds != null) {
        if (tbxReportName!.Text == "") {
          tbxReportName!.Text = "  " + ds.Name;
        }
      }
    } else {
      Execute(true);
    }
  } catch (e) {
    // error handling
  }
};

const OnNewReportWizardChanged = function (sender: any, args: any): void {
  Matrix.TemplateLoadedSetting(DataGridCtrl!.Name);
  makeMetaFilters(true);
  args.Handled = true;
};

const makeMetaFilters = function (isLoading: boolean): void {
  const option = {
    UseGroup: false,
    GRP_CONDITION_NAME: "GRP_CONDITION",
    Top: 34, // 조회조건 시작위치 Top
    Left: 2, // 조회조건 시작위치 Left
    Height: 23, // 조회조건 컨트롤의 높이
    LabelStyle: {
      BackgroundColor: "212,232,242,1", // RGBA
      BorderColor: "191,191,191,1", // RGBA
    },
  };
  Matrix.MakeMetaFilterControls(option);

  Matrix.Update();
  Execute(isLoading);
};

const Execute = function (isLoading: boolean): void {
  firstLoading = isLoading;
  Matrix.doRefresh(DataGridCtrl!.Name);
};

/*****************************************
 * Refresh가 실행되는 시점에 발생합니다.
 * * arguments :
 *		 bool	IsAutoRefresh (Readonly:False) : true일 경우 AutoRefresh 동작 입니다.
 *		 string	Target (Readonly:False) : 현대 Refresh 대상(들)의 이름
 *		 bool	Cancel (Readonly:False) : 이 값을 true로 설정 시 실행이 취소됩니다.
 *****************************************/
const OnExecuteStart = function (sender: any, args: any): void {
  if (args.IsAutoRefresh) return;
  try {
    const result = Matrix.ValidateMetaFilterValues(DataGridCtrl!.Name);
    if (result != "") {
      args.Cancel = true;
      if (!firstLoading)
        Matrix.Information(LANGUAGE_VALIDATE.replace("{0}", result), result);
    }
    firstLoading = false;
  } catch (e) {
    // error handling
  }
};

/*****************************************
 * 컨트롤의 메타 소스가 변경되면 발생합니다.
 * * arguments :
 *		 bool	Handled (Readonly:False) : 스크립트 수동 핸들링 여부
 *****************************************/
const OnMetaLayoutChange = function (sender: any, args: any): void {
  args.Handled = true;
  Execute(false);
};

/*****************************************
 * 이미지 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
const OnImageClick = function (sender: any, args: any): void {
  if (args.Id == "imgMeta") {
    const meta = (Matrix as any).getMetaController(DataGridCtrl!.Name);
    meta.ShowModal();
  } else if (args.Id == "imgchart") {
    const chartCell = TableLayoutCtrl!.GetCell(0, 0);
    if (chartToggle) {
      chartCellHeight = chartCell.Row.Height;
      chartCell.Row.Height = 0;
      chartToggle = false;
    } else {
      chartCell.Row.Height = chartCellHeight;
      chartToggle = true;
    }
    TableLayoutCtrl!.Update();
  }
};

/*****************************************
 * i-PORTAL에서 엑셀 다운로드 버튼 클릭 시 작동.(정의되어있지 않으면 기본 엑셀 다운로드 팝업창이 출력)
 * * arguments :
 *****************************************/
const OnExcelExportStart = function (sender: any, args: any): void {
  if (WIN_EXPORT != null) WIN_EXPORT.Close();

  WIN_EXPORT = Matrix.ShowWindow(
    "EXPORT",
    0,
    0,
    400,
    340,
    true,
    false,
    LANGUAGE_EXPORT_TITLE,
    false,
    "#ffffff",
    2
  );
  WIN_EXPORT.OnDialogResult = function (type: string): void {
    if (type == "OK") {
      if (rdoXlsx!.Checked) exportFile("xlsx");
      else if (rdoHTML!.Checked) exportFile("htm");
      else if (rdoWord!.Checked) exportFile("docx");
      else if (rdoHWP!.Checked) exportFile("hwp");
      else if (rdoCSV!.Checked) Matrix.ExportServiceCall("DataGrid", 0); //csv
      else if (rdoText!.Checked) {
        // 구분자 세팅
        parent.iStudioConfig.DataGridTextExportColSeparator =
          ColumnSeperator!.Text;
        parent.iStudioConfig.DataGridTextExportRowSeparator =
          RowSeperator!.Text;
        Matrix.ExportServiceCall("DataGrid", 1); //text
      }
      WIN_EXPORT.Close();
      WIN_EXPORT = null;
    }
  };
  WIN_EXPORT.OnClosed = function (s: any, e: any): void {
    WIN_EXPORT = null;
  };
  WIN_EXPORT.MoveToCenter();
};

const exportFile = function (type: string): void {
  const nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
  //그리드 컬럼 갯수
  const columnCount = DataGridCtrl!.GetColumnCount();
  let colspan = columnCount;
  if (type == "xlsx") colspan = Math.min(columnCount, 13);

  const WORKBOOK: any = {
    FontName: LANGUAGE_EXPORT_FONT_NAME,
    FontSize: 11,
    WorkSheets: [
      {
        Name: "Sheet1",
        DisplayGridlines: "false",
        Controls: [] as any[],
        Ranges: [
          {
            Range: "A1",
            ColSpan: colspan,
            Value:
              LANGUAGE_EXPORT_REPORT_TITLE + " " + Matrix.GetReportInfo().NAME,
          },
          {
            Range: "A2",
            ColSpan: colspan,
            Value:
              LANGUAGE_EXPORT_USER_NAME + " " + Matrix.GetUserInfo().UserName,
          },
          {
            Range: "A3",
            ColSpan: colspan,
            Value: LANGUAGE_EXPORT_CREATE_DATE + " " + nowText,
          },
          {
            Range: "A4",
            ColSpan: colspan,
            Value: LANGUAGE_EXPORT_FILTER_TITLE,
          },
        ],
      },
    ],
  };
  // excel column name
  const getColumnName = function (num: number): string {
    let ret = "";
    for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
      ret = String.fromCharCode(Math.floor((num % b) / a) + 65) + ret;
    }
    return ret;
  };
  const filterRows = getFilterCondition();
  for (let r = 0; r < filterRows.length; r++) {
    const filterValue = filterRows[r].Values.join(",");
    WORKBOOK.WorkSheets[0].Ranges.push({
      Range: "A" + (5 + r),
      ColSpan: colspan,
      Value:
        "        [" +
        filterRows[r].Name +
        "] " +
        filterRows[r].Operator +
        "  : " +
        filterValue,
    });
  }
  const startRow = filterRows.length + 5;

  //chart show/hide
  if (chartToggle) {
    try {
      // 차트에 데이터가 바인딩 되었는지 여부를 판단 합니다.
      chartToggle = ChartCtrl!.GetDataSet().GetTableCount() > 0;
    } catch (e) {
      chartToggle = false;
    }
  }
  if (chartToggle) {
    WORKBOOK.WorkSheets[0].Controls.push({
      Name: ChartCtrl!.Name,
      Range: "A" + startRow + ":" + getColumnName(colspan) + (startRow + 10),
      ImageExport: true,
    });
    WORKBOOK.WorkSheets[0].Ranges.push({
      Range: "A" + startRow,
      ColSpan: colspan,
      RowSpan: 11,
    });
    WORKBOOK.WorkSheets[0].Controls.push({
      Name: DataGridCtrl!.Name,
      Range: "A" + (startRow + 12),
    });
  } else {
    WORKBOOK.WorkSheets[0].Controls.push({
      Name: DataGridCtrl!.Name,
      Range: "A" + startRow,
    });
  }

  if ("xlsx" == type) {
    Matrix.ExcelExportServiceCall(WORKBOOK, null, function (e: any): void {
      if (e.Success == false) {
        alert("export fail" + e.Message);
        return;
      }
      // download file
      const row = e.DataSet.GetTable(0).GetRow(0);
      const folderName = row.GetValue("FolderName");
      const fileName = row.GetValue("FileName");
      // download.maf 주소
      Matrix.DownloadFile(
        folderName + "/",
        fileName,
        Matrix.GetReportInfo().NAME + "_" + nowText + ".xlsx",
        true
      );
    });
  } else if ("docx" == type) {
    //word
    Matrix.WordExportServiceCall(WORKBOOK, null, function (e: any): void {
      if (e.Success == false) {
        alert("export fail" + e.Message);
        return;
      }
      // download file
      const row = e.DataSet.GetTable(0).GetRow(0);
      const folderName = row.GetValue("FolderName");
      const fileName = row.GetValue("FileName");
      Matrix.DownloadFile(
        folderName + "/",
        fileName,
        Matrix.GetReportInfo().NAME + "_" + nowText + ".docx",
        true
      );
    });
  } else if (type == "htm") {
    /* HTML Export */
    Matrix.HTMLExportServiceCall(WORKBOOK, null, function (e: any): void {
      if (e.Success == false) {
        alert("export fail" + e.Message);
        return;
      }
      // download file
      const row = e.DataSet.GetTable(0).GetRow(0);
      const folderName = row.GetValue("FolderName");
      const fileName = row.GetValue("FileName");
      Matrix.DownloadFile(
        folderName + "/",
        fileName,
        Matrix.GetReportInfo().NAME + "_" + nowText + ".htm",
        true
      );
    });
  } else if (type == "hwp") {
    /* HWP Export */
    Matrix.HMLExportServiceCall(WORKBOOK, null, function (e: any): void {
      if (e.Success == false) {
        alert("export fail" + e.Message);
        return;
      }
      // download file
      const row = e.DataSet.GetTable(0).GetRow(0);
      const folderName = row.GetValue("FolderName");
      const fileName = row.GetValue("FileName");
      Matrix.DownloadFile(
        folderName + "/",
        fileName,
        Matrix.GetReportInfo().NAME + "_" + nowText + ".hwp",
        true
      );
    });
  }
};

interface FilterRow {
  Name: string;
  Operator: string;
  Values: string[];
}

const getFilterCondition = function (): FilterRow[] {
  const conditions = Matrix.GetMetaTemplateConditions(false);
  const rows: FilterRow[] = [];
  for (const i in conditions) {
    const row: FilterRow = { Name: "", Operator: "", Values: [] };
    const condition = conditions[i];
    // Label 분리
    const labelCtl = Matrix.getObject(condition.Label) as Label;
    row["Name"] = labelCtl.Text;
    row["Operator"] = labelCtl.Description;

    // Control 분리
    const controls = condition.Controls;
    const controlLength = controls.length;

    if (controlLength == 1) {
      const value1 = Matrix.GetParamValue(Matrix.getObject(controls[0])); // array
      for (const idx in value1) {
        row.Values.push(value1[idx]);
      }
    } else {
      const ctrl1 = Matrix.getObject(controls[0]) as any;
      const ctrl2 = Matrix.getObject(controls[1]) as any;
      let value1: any;
      let value2: any;
      if (
        ctrl1.__type__ == "istudio.control.CalendarFromTo" ||
        ctrl1.__type__ == "istudio.control.CalendarYMFromTo" ||
        ctrl1.__type__ == "istudio.control.CalendarWeeklyFromTo"
      ) {
        value1 = ctrl1.GetValue();
        value2 = ctrl2.GetValue2();
      } else {
        value1 = Matrix.GetParamValue(ctrl1); // array
        value2 = Matrix.GetParamValue(ctrl2); // array
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
const OnRadioValueChange = function (sender: any, args: any): void {
  switch (args.Id) {
    case "rdoText":
      grpSeperate!.Visible = true;
      break;
    default:
      grpSeperate!.Visible = false;
  }
};
