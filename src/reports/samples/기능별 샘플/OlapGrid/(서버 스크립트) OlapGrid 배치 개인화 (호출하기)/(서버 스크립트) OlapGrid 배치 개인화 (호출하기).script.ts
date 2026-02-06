import { Matrix } from "@AUD_CLIENT/control/Matrix";

declare let Matrix: Matrix;

/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
const OnButtonClick = function (_sender: any, args: any): void {
  if (args.Id == "btnSaveLayout") {
    ShowLayoutWindow("CREATE", "OlapGrid");
  } else if (args.Id == "btnLoadLayout") {
    ShowLayoutWindow("SELECT", "OlapGrid");
  }
};

const ShowLayoutWindow = function (jobType: string, olapName: string): void {
  if (!Matrix.GetReportInfo().CODE) {
    Matrix.Information(
      "배치 저장/복원 기능은 현재 보고서를 저장 후 사용 가능합니다.",
      "저장 확인"
    );
    return;
  }
  // 팝업창으로 넘길 파라미터 설정.
  const olapGrid = Matrix.getObject(olapName) as any;
  const param = {
    VS_LAYOUT_REPORT_CODE: Matrix.GetReportInfo().CODE,
    VS_LAYOUT_INFO: jobType == "CREATE" ? getLayoutInfo(olapName) : "",
    VS_CONTROL_CODE: olapName,
    JOB_TYPE: jobType,
    CONTROL_NAME: olapGrid.Caption ? olapGrid.Caption : olapGrid.Name,
    REPORT_NAME: Matrix.GetReportInfo().NAME,
  };
  // 팝업창에 표시할 보고서 코드.
  const reportCode = "REPA57EA3E7DDBB4576841598FC91055FE9";
  // 팝업창 옵션 설정.
  const opt = {
    Width: 500,
    Height: 400,
    Left: 30,
    Top: 30,
    Center: true,
    Modal: true,
    Title: "",
    Maximize: true,
    Resizable: true,
    Buttons: 0, // Button  0 : 없음, 1:닫기, 2:확인/취소
  };

  Matrix.ShowReportDialog(reportCode, param, opt, function (result: any): void {
    if (result) {
      if (jobType == "SELECT") {
        setLayoutInfo(result);
      }
    }
  });
};

const getLayoutInfo = function (id: string): string {
  const ctl = Matrix.getObject(id) as any;
  const fields = ctl.getFields();
  const RESULT: any[] = [];
  for (let i = 0; i < fields.length; i++) {
    const fld = fields[i];
    const item = {
      Name: fld.Name,
      Area: fld.Area,
      AreaIndex: fld.AreaIndex,
      Caption: fld.Caption,
      Format: fld.Format,
      Formula: fld.Formula,
      Formula2: fld.Formula2,
      SortType: fld.SortType,
      SortBaseField: fld.SortBaseField,
      SummaryType: fld.SummaryType,
      SummaryVariation: fld.SummaryVariation,
      SummaryBaseFieldKey: fld.SummaryBaseFieldKey,
      TextAlignment: fld.TextAlignment,
      ToolTipField: fld.ToolTipField,
      ToolTipText: fld.ToolTipText,
      TotalSummaryType: fld.TotalSummaryType,
      Width: fld.Width,
      Visible: fld.Visible,
      VisibleSubTotal: fld.VisibleSubTotal,
      Unit: fld.Unit,
      FilterInfo: fld.FilterInfo.Serialize(),
    };
    RESULT.push(item);
  }
  return JSON.stringify(RESULT);
};

const setLayoutInfo = function (result: any): void {
  const ctl = Matrix.getObject(result.CONTROL) as any;
  const fields = result.MODEL;
  for (let i = 0; i < fields.length; i++) {
    const fld = fields[i];
    const oldFld = ctl.getField(fld.Name);
    if (oldFld != null) {
      oldFld.Name = fld.Name;
      oldFld.Area = fld.Area;
      oldFld.AreaIndex = fld.AreaIndex;
      oldFld.Caption = fld.Caption;
      oldFld.Format = fld.Format;
      oldFld.Formula = fld.Formula;
      oldFld.Formula2 = fld.Formula2;
      oldFld.SortType = fld.SortType;
      oldFld.SortBaseField = fld.SortBaseField;
      oldFld.SummaryType = fld.SummaryType;
      oldFld.SummaryVariation = fld.SummaryVariation;
      oldFld.SummaryBaseFieldKey = fld.SummaryBaseFieldKey;
      oldFld.TextAlignment = fld.TextAlignment;
      oldFld.ToolTipField = fld.ToolTipField;
      oldFld.ToolTipText = fld.ToolTipText;
      oldFld.TotalSummaryType = fld.TotalSummaryType;
      oldFld.Width = fld.Width;
      oldFld.Visible = fld.Visible;
      oldFld.VisibleSubTotal = fld.VisibleSubTotal;
      oldFld.Unit = fld.Unit;
      oldFld.FilterInfo.DeSerialize(fld.FilterInfo);
    }
  }
  ctl.Refresh();
};

export { OnButtonClick };
