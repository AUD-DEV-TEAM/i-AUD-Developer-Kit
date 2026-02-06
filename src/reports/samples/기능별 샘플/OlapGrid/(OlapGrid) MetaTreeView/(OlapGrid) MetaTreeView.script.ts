import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Image } from "@AUD_CLIENT/control/Image";
import { Group } from "@AUD_CLIENT/control/Group";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { enArea } from "@AUD_CLIENT/enums/olap/enArea";

// i-AUD 런타임에서 제공하는 전역 Matrix 객체
let Matrix: Matrix;

/*
 * script name    : ANALYSIS Template
 * script version : 7.4
 * modified date  : 2023-07-14
 */

let WIN_EXPORT: any = null; // export window
const GRP_CONDITION_NAME = "GRP_CONDITION";

const AUTO_SELECT_RANGE = 10;

let chartToggle = false; // 차트보임
let chartCellHeight = 250;
const gapChartGrid = 2;
let firstLoading = false;

let USERDEFINED_LAYOUT_MGR: any = null; //@USERDEFINED_LAYOUT_MGR

// controls
let chartCtrl: Chart | null = null;
let drillToDetailCtrl: DataGrid | null = null;
let grpConditionCtrl: Group | null = null;
let imgchartCtrl: Image | null = null;
let imgMetaCtrl: Image | null = null;
let olapGridCtrl: OlapGrid | null = null;
let tbxReportNameCtrl: Label | null = null;
let grpChartCtrl: Group | null = null;
let lblSplitterCtrl: Label | null = null;

let rdoCSVCtrl: RadioButton | null = null;
let rdoHTMLCtrl: RadioButton | null = null;
let rdoTextCtrl: RadioButton | null = null;
let rdoWordCtrl: RadioButton | null = null;
let rdoXlsxCtrl: RadioButton | null = null;
let rdoHWPCtrl: RadioButton | null = null;

let grpSeperateCtrl: Group | null = null;
let columnSeperatorCtrl: TextBox | null = null;
let rowSeperatorCtrl: TextBox | null = null;

let WIN_OPTION: any = null;
let isViewerMode = false;

// 2022-09-14 (BCRM#C2708) 툴바('GDP&GNI')에서 제공되는 옵션 기능('그래프 표시', '설정')에 대한 툴팁이 제공되지 않아 해당 기능을 알 수 없음
const langNS = "iStudioExtra:META:";

// 다국어 리스트
const LANGUAGE_VALIDATE = Matrix.Trans(
  langNS + "TEMPLATE.VALIDATE_CHECK_NULL",
  "{0} 은/는 필수 입력입니다."
);
const LANGUAGE_DETAIL_TITLE = Matrix.Trans(
  langNS + "TEMPLATE.DETAIL_TITLE",
  "상세 보기"
);
const LANGUAGE_EXPORT_REPORT_TITLE = Matrix.Trans(
  langNS + "TEMPLATE.EXPORT_REPORT_NAME",
  "■ 보고서 명 :"
);
const LANGUAGE_EXPORT_USER_NAME = Matrix.Trans(
  langNS + "TEMPLATE.EXPORT_USER_NAME",
  "■ 작성자 :"
);
const LANGUAGE_EXPORT_FILTER_TITLE = Matrix.Trans(
  langNS + "TEMPLATE.EXPORT_FILTER_NAME",
  "■ 필터 조건 :"
);
const LANGUAGE_EXPORT_CREATE_DATE = Matrix.Trans(
  langNS + "TEMPLATE.EXPORT_CREATE_DATE",
  "■ 생성 일자 :"
);
const LANGUAGE_EXPORT_FONT_NAME = Matrix.Trans(
  langNS + "TEMPLATE.EXPORT_FONT_NAME",
  "맑은 고딕"
);
const LANGUAGE_EXPORT_TITLE = Matrix.Trans(
  langNS + "TEMPLATE.EXPORT_TITLE",
  "내보내기"
);
const LANGUAGE_OPTION_TITLE = Matrix.Trans(langNS + "TEMPLATE.OPTION", "설정");

const initControlVariables = function (): void {
  const allElements = Matrix.getAllObjects();
  allElements.forEach(function (ele: any, idx: number) {
    //(BCRM#C3563) 일본어폰트/번역 적용 안됨
    if (
      typeof ele.LanguageCode !== "undefined" &&
      ele.LanguageCode !== "" &&
      typeof ele.Text !== "undefined"
    ) {
      const transText = Matrix.Trans(langNS + ele.LanguageCode, "");
      ele.Text = transText !== "" ? transText : ele.Text;
    }

    switch (ele.Name) {
      case "Chart":
        chartCtrl = ele;
        break;
      case "DrillToDetail":
        drillToDetailCtrl = ele;
        break;
      case "GRP_CONDITION":
        grpConditionCtrl = ele;
        break;
      case "imgchart":
        imgchartCtrl = ele;
        break;
      case "imgMeta":
        imgMetaCtrl = ele;
        break;
      case "OlapGrid":
        olapGridCtrl = ele;
        break;
      case "tbxReportName":
        tbxReportNameCtrl = ele;
        break;
      case "rdoCSV":
        rdoCSVCtrl = ele;
        break;
      case "rdoHTML":
        rdoHTMLCtrl = ele;
        break;
      case "rdoText":
        rdoTextCtrl = ele;
        break;
      case "rdoWord":
        rdoWordCtrl = ele;
        break;
      case "rdoXlsx":
        rdoXlsxCtrl = ele;
        break;
      case "rdoHWP":
        rdoHWPCtrl = ele;
        break;
      case "grpSeperate":
        grpSeperateCtrl = ele;
        break;
      case "ColumnSeperator":
        columnSeperatorCtrl = ele;
        break;
      case "RowSeperator":
        rowSeperatorCtrl = ele;
        break;
      case "GRP_CHART":
        grpChartCtrl = ele;
        break;
      case "LBL_SPLITTER":
        lblSplitterCtrl = ele;
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
  if (grpChartCtrl!.Height > 2) {
    chartToggle = true;
  }
  // 2022-04-28 디자인 변경
  tbxReportNameCtrl!.Style.Font.Size = "14"; // 원활한 박스 스타일 사용을 위해 폰트 사이즈만 따로 변경

  imgchartCtrl!.Tooltip = Matrix.Trans(langNS + "TEMPLATE.CHART", "Show/Hide Chart");
  imgMetaCtrl!.Tooltip = Matrix.Trans(
    langNS + "TEMPLATE.META",
    "Analysis Items Setting"
  );
};

/*****************************************
 * 문서가 로드되고 AutoRefresh가 완료되는 시점에 발생합니다.
 * * arguments :
 *		 bool	Success (Readonly:False) : 성공여부
 *		 string	Message (Readonly:False) : 에러 메시지
 *****************************************/
const OnLoadComplete = function (sender: any, args: any): void {
  try {
    SetSplitters();
    if (Matrix.getControlDataSource(olapGridCtrl!.Name) == null) {
      // Meta를 컨트롤에 바인딩
      Matrix.TemplateLoadedSetting(olapGridCtrl!.Name);
      makeMetaFilters(true);

      const ds = Matrix.getControlDataSource(olapGridCtrl!.Name);
      if (ds != null) {
        if (tbxReportNameCtrl!.Text == "") {
          tbxReportNameCtrl!.Text = "  " + ds.Name;
        }
      }
    } else {
      modifyGridTopAndHeight();
      if (isViewerMode) {
        USERDEFINED_LAYOUT_MGR.CheckDefaultLayout(function () {
          Execute(true);
        });
      } else {
        Execute(true);
      }
    }
  } catch (e: any) {
    Matrix.DebugWrite("Err OnLoadComplete", e.message);
  }
};

const SetSplitters = function (): void {
  Matrix.CreateSplitterEx(
    "Col",
    ["MetaTreeView"],
    ["GRP_CHART", "LBL_SPLITTER", "OlapGrid"],
    "GRP_SPLITTER"
  );
  Matrix.CreateSplitterEx("Row", ["GRP_CHART"], ["OlapGrid"], "LBL_SPLITTER");
};

const OnNewReportWizardChanged = function (sender: any, args: any): void {
  Matrix.TemplateLoadedSetting(olapGridCtrl!.Name);
  makeMetaFilters(true);
  args.Handled = true;
};

const makeMetaFilters = function (isLoading: boolean): void {
  const option = {
    UseGroup: false, // 그룹 사용 여부
    GRP_CONDITION_NAME: GRP_CONDITION_NAME, // 사용할 그룹 이름
    Top: 34, // 조회조건 시작위치 Top
    Left: 2, // 조회조건 시작위치 Left
    Height: 23, // 조회조건 컨트롤의 높이
    LabelStyle: "META_TEMPLATE_LABEL_CONTROL", // boxStyle 이름
  };
  Matrix.MakeMetaFilterControls(option);

  changeLayout();
  Execute(isLoading);
};

const Execute = function (isLoading: boolean): void {
  firstLoading = isLoading;
  Matrix.doRefresh(olapGridCtrl!.Name);
};

const changeLayout = function (): void {
  let layoutTop = Matrix.GetMetaTemplateLayoutTopValue();

  if (typeof layoutTop === "undefined" || layoutTop === null) {
    layoutTop = tbxReportNameCtrl!.Top + tbxReportNameCtrl!.Height + 1;
  }

  olapGridCtrl!.Top =
    layoutTop +
    (grpChartCtrl!.Height > 2
      ? grpChartCtrl!.Height + gapChartGrid + lblSplitterCtrl!.Height + gapChartGrid
      : 0);
  grpChartCtrl!.Top = layoutTop + 1;
  lblSplitterCtrl!.Top = chartToggle
    ? olapGridCtrl!.Top - (lblSplitterCtrl!.Height + gapChartGrid)
    : olapGridCtrl!.Top;
  setSelectRange();
  grpChartCtrl!.Update();
  Matrix.Update();
};

const modifyGridTopAndHeight = function (): void {
  if (grpChartCtrl!.Height <= 2) {
    olapGridCtrl!.Top -= lblSplitterCtrl!.Height + 2;
  }
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
    const result = Matrix.ValidateMetaFilterValues(olapGridCtrl!.Name);
    if (result != "") {
      args.Cancel = true;
      if (!firstLoading)
        Matrix.Information(LANGUAGE_VALIDATE.replace("{0}", result), result);
    }
    firstLoading = false;
  } catch (e: any) {
    Matrix.DebugWrite("Err OnExecuteStart", e.message);
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
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 int	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
 *****************************************/
const OnDataBindEnd = function (sender: any, args: any): void {
  if (args.Id == olapGridCtrl!.Name) {
    if (chartToggle) {
      setSelectRange();
    }
  }
};

// Chart 영역 toggle 시 선택 영역 표시
const setSelectRange = function (): void {
  // OlapGrid 일 때
  if (chartToggle && !(olapGridCtrl!.Options as any).AutoSelection) {
    const curSelection = olapGridCtrl!.getSelection().getSelectedArea();
    if (
      curSelection.getRight() != AUTO_SELECT_RANGE ||
      curSelection.getBottom() != AUTO_SELECT_RANGE
    ) {
      olapGridCtrl!.getSelection().SelectDataArea(
        0,
        0,
        AUTO_SELECT_RANGE,
        AUTO_SELECT_RANGE
      );
      olapGridCtrl!.Update();
    }
  }
};

/*****************************************
 * 파일 내보내기 동작이 시작될 때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 파일명
 *		 bool	IsMulti (Readonly:False) : 여러개의 컨트롤이 선택되었는지 여부
 *		 bool	Cancel (Readonly:False) : 이 값을 true로 설정하면 작업이 취소됩니다.
 *		 bool	IsServerUpload (Readonly:False) : 서버로 업로드인지 여부
 *		 BIMatrix.Common.enExportType	ExportType (Readonly:False) : Export Type
 *****************************************/
const OnStartExport = function (sender: any, args: any): void {
  if (args.Id == "DrillToDetail") {
    args.Cancel = true;
    window.setTimeout(function () {
      /* call server export function */
      (Matrix as any).ExportServiceCall(args.Id);
    }, 100);
  }
};

/*****************************************
 * 이미지 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
const OnImageClick = function (sender: any, args: any): void {
  if (args.Id == "imgMeta") {
    const meta = (Matrix as any).getMetaController(olapGridCtrl!.Name);
    meta.ShowModal();
  } else if (args.Id == "imgchart") {
    if (chartToggle) {
      // 열려있을때
      chartCellHeight = grpChartCtrl!.Height;
      grpChartCtrl!.Height = 0;
      olapGridCtrl!.Top -=
        chartCellHeight + gapChartGrid + lblSplitterCtrl!.Height + gapChartGrid;
      lblSplitterCtrl!.Top = olapGridCtrl!.Top;
      lblSplitterCtrl!.Visible = false;
      chartToggle = false;
    } else {
      // 닫혀있을때
      grpChartCtrl!.Height = chartCellHeight;
      olapGridCtrl!.Top +=
        chartCellHeight + gapChartGrid + lblSplitterCtrl!.Height + gapChartGrid;
      lblSplitterCtrl!.Top = olapGridCtrl!.Top - (lblSplitterCtrl!.Height + gapChartGrid);
      lblSplitterCtrl!.Visible = true;
      chartToggle = true;
    }
    setSelectRange();
    olapGridCtrl!.Update();
    grpChartCtrl!.Update();
    if (isViewerMode) {
      USERDEFINED_LAYOUT_MGR.UpdateDefaultLayout();
    }
  } else if (args.Id == "imgOption") {
    if (WIN_OPTION != null) {
      WIN_OPTION.Close();
    }
    WIN_OPTION = Matrix.ShowWindow(
      "Option",
      0,
      0,
      300,
      120,
      true,
      false,
      LANGUAGE_OPTION_TITLE,
      false,
      "#ffffff",
      2
    );
    //Maximize 방지 start - 2022-04-25
    const WIN_OPTION_Header =
      WIN_OPTION.uiElement.getElementsByClassName("dvDialogHeaderArea")[0];
    WIN_OPTION_Header.getElementsByClassName(
      "dvDialogHeaderAreaButton"
    )[0].style.display = "none";
    //Maximize 방지 end - 2022-04-25
    WIN_OPTION.OnDialogResult = function (type: string) {
      WIN_OPTION.Close();
      WIN_OPTION = null;
    };
    WIN_OPTION.OnClosed = function (s: any, e: any) {
      WIN_OPTION = null;
    };
    WIN_OPTION.MoveToCenter();
  }
};

/*****************************************
 * 데이터 셀을 더블 클릭시 발생합니다.
 * * arguments :
 *****************************************/
const OnOlapViewDataCellDoubleClick = function (sender: any, args: any): void {
  const xml = sender.getDrillToDetailXml(args.DataCell);
  let text = LANGUAGE_DETAIL_TITLE;
  try {
    let parser: DOMParser | null = null;
    let xmlDoc: Document | null = null;
    if (window.DOMParser) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xml, "text/xml");
    } else {
      xmlDoc = new (window as any).ActiveXObject("Microsoft.XMLDOM");
      (xmlDoc as any).async = false;
      (xmlDoc as any).loadXML(xml);
    }
    const nodes = xmlDoc!.getElementsByTagName("SummaryInfo");
    let node: Element;
    let infoNode: ChildNode;
    let fldNode: ChildNode;
    text = "";
    for (let i = 0, len = nodes.length; i < len; i++) {
      node = nodes[0]; //SummaryInfo
      for (let c = 0, items = node.childNodes; c < items.length; c++) {
        infoNode = items[c];
        if (infoNode.nodeName == "FieldInfo") {
          //Field
          for (
            let c2 = 0, subItems = infoNode.childNodes;
            c2 < subItems.length;
            c2++
          ) {
            fldNode = subItems[c2];
            if (fldNode.nodeName == "Field") {
              const fldElement = fldNode as Element;
              if (
                fldElement.attributes.getNamedItem("IsNull") &&
                fldElement.attributes.getNamedItem("IsNull")!.nodeValue == "True"
              )
                continue;
              if (text != "") text += ", ";
              text +=
                fldElement.attributes.getNamedItem("Name")!.nodeValue +
                "=" +
                fldElement.attributes.getNamedItem("Value")!.nodeValue;
            }
          }
        }
      }
    }
    if (text.length > 100) {
      text = text.substring(0, 100) + "...";
    }
  } catch (e) {
    text = "Drill To Detail";
  }
  /*
   * Parameters
   * i-Meta가 적용된 컨트롤, DrillToDetail XML, Target 컨트롤 이름
   */
  (Matrix as any).DrillToDetail(sender, xml, "DrillToDetail");

  const win = Matrix.ShowWindow(
    "DETAIL",
    0,
    0,
    1024,
    768,
    true,
    true,
    text,
    false,
    "",
    1
  );
  win.MoveToCenter();
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
  WIN_EXPORT.OnDialogResult = function (type: string) {
    if (type == "OK") {
      if (rdoXlsxCtrl!.Checked) exportFile("xlsx");
      else if (rdoHTMLCtrl!.Checked) exportFile("htm");
      else if (rdoWordCtrl!.Checked) exportFile("docx");
      else if (rdoHWPCtrl!.Checked) exportFile("hwp");
      else if (rdoCSVCtrl!.Checked) olapGridCtrl!.ExportCSV();
      else if (rdoTextCtrl!.Checked) {
        // 구분자 세팅
        olapGridCtrl!.ExportText();
      }
      WIN_EXPORT.Close();
      WIN_EXPORT = null;
    }
  };
  WIN_EXPORT.OnClosed = function (s: any, e: any) {
    WIN_EXPORT = null;
  };
  WIN_EXPORT.MoveToCenter();
};

const exportFile = function (type: string): void {
  const nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
  //olap의 컬럼 전체 사이즈
  const columnCount = olapGridCtrl!.ColumnCount + olapGridCtrl!.getFieldNames(enArea.Row).length;
  let colspan = columnCount;
  if (type == "xlsx") colspan = Math.min(columnCount, 13);

  interface WorkBookRange {
    Range: string;
    ColSpan?: number;
    RowSpan?: number;
    Value?: string;
  }

  interface WorkBookControl {
    Name: string;
    Range: string;
    ImageExport?: boolean;
  }

  interface WorkSheet {
    Name: string;
    DisplayGridlines: string;
    Controls: WorkBookControl[];
    Ranges: WorkBookRange[];
  }

  interface WorkBook {
    FontName: string;
    FontSize: number;
    WorkSheets: WorkSheet[];
  }

  const WORKBOOK: WorkBook = {
    FontName: "맑은 고딕",
    FontSize: 11,
    WorkSheets: [
      {
        Name: "Sheet1",
        DisplayGridlines: "false",
        Controls: [],
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
  let startRow = filterRows.length + 5;

  //chart show/hide
  let chartVisible = chartToggle;
  if (chartVisible) {
    try {
      // 차트에 데이터가 바인딩 되었는지 여부를 판단 합니다.
      chartVisible = chartCtrl!.GetDataSet().GetTableCount() > 0;
    } catch (e) {
      chartVisible = false;
    }
  }
  if (chartVisible) {
    WORKBOOK.WorkSheets[0].Controls.push({
      Name: chartCtrl!.Name,
      Range: "A" + startRow + ":" + getColumnName(colspan) + (startRow + 10),
      ImageExport: true,
    });
    WORKBOOK.WorkSheets[0].Ranges.push({
      Range: "A" + startRow,
      ColSpan: colspan,
      RowSpan: 11,
    });
    WORKBOOK.WorkSheets[0].Controls.push({
      Name: olapGridCtrl!.Name,
      Range: "A" + (startRow + 12),
    });
  } else {
    WORKBOOK.WorkSheets[0].Controls.push({
      Name: olapGridCtrl!.Name,
      Range: "A" + startRow,
    });
  }

  if ("xlsx" == type) {
    Matrix.ExcelExportServiceCall(WORKBOOK, null, function (e: any) {
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
    Matrix.WordExportServiceCall(WORKBOOK, null, function (e: any) {
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
    Matrix.HTMLExportServiceCall(WORKBOOK, null, function (e: any) {
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
    Matrix.HMLExportServiceCall(WORKBOOK, null, function (e: any) {
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
  const conditions = (Matrix as any).GetMetaTemplateConditions();
  const rows: FilterRow[] = [];
  for (const i in conditions) {
    const row: FilterRow = { Name: "", Operator: "", Values: [] };
    const condition = conditions[i];
    // Label 분리
    const labelCtl = Matrix.getObject(condition.Label) as any;
    row["Name"] = labelCtl.Text;
    row["Operator"] = labelCtl.Description;

    // Control 분리
    const controls = condition.Controls;
    const controlLength = controls.length;

    if (controlLength == 1) {
      const value1 = (Matrix as any).GetParamValue(Matrix.getObject(controls[0])); // array
      for (const idx in value1) {
        row.Values.push(value1[idx]);
      }
    } else {
      const ctrl1 = Matrix.getObject(controls[0]) as any;
      const ctrl2 = Matrix.getObject(controls[1]) as any;
      let value1: any;
      let value2: any;
      if (
        ctrl1.Type == "CalendarFromTo" ||
        ctrl1.Type == "CalendarYMFromTo" ||
        ctrl1.Type == "CalendarWeeklyFromTo"
      ) {
        value1 = ctrl1.GetValue();
        value2 = ctrl1.GetValue2();
      } else {
        value1 = (Matrix as any).GetParamValue(ctrl1); // array
        value2 = (Matrix as any).GetParamValue(ctrl2); // array
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
      grpSeperateCtrl!.Visible = true;
      break;
    default:
      grpSeperateCtrl!.Visible = false;
  }
};

// Export event handlers for i-AUD runtime
export {
  OnDocumentLoadComplete,
  OnLoadComplete,
  OnNewReportWizardChanged,
  OnExecuteStart,
  OnMetaLayoutChange,
  OnDataBindEnd,
  OnStartExport,
  OnImageClick,
  OnOlapViewDataCellDoubleClick,
  OnExcelExportStart,
  OnRadioValueChange,
};
