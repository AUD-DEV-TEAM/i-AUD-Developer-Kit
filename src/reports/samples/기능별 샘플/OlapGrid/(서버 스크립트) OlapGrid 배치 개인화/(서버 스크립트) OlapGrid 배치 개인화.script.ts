import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

declare let Matrix: Matrix;


let VS_LAYOUT_REPORT_CODE: string | null = null; //대상 보고서 (사용자 화면 보고서 코드)
let VS_LAYOUT_INFO: string | null = null;
let JOB_TYPE = "SELECT"; //SELECT or CREATE
let CONTROL_NAME: string | null = null;
let REPORT_NAME: string | null = null;
let VS_CONTROL_CODE: string | null = null;
/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
const OnDocumentLoadComplete = function (_sender: any, _args: any): void {
  const params = Matrix.GetDialogRequestParams();
  VS_LAYOUT_REPORT_CODE = params["VS_LAYOUT_REPORT_CODE"];
  VS_LAYOUT_INFO = params["VS_LAYOUT_INFO"];
  JOB_TYPE = params["JOB_TYPE"];
  CONTROL_NAME = params["CONTROL_NAME"];
  REPORT_NAME = params["REPORT_NAME"];
  VS_CONTROL_CODE = params["VS_CONTROL_CODE"];
  Matrix.AddGlobalParams("VS_LAYOUT_REPORT_CODE", VS_LAYOUT_REPORT_CODE, 1);
  Matrix.AddGlobalParams("VS_LAYOUT_INFO", VS_LAYOUT_INFO, 1);
  Matrix.AddGlobalParams("VS_CONTROL_CODE", VS_CONTROL_CODE, 1);
  if (JOB_TYPE == "SELECT") {
    Matrix.doRefresh("GRD_LAYOUT");
    Matrix.SetSheetActive("FORM_SELECT");
  } else {
    Matrix.SetSheetActive("FORM_INPUT");
    (Matrix.getObject("LBL_REPORT_NAME") as any).Text =
      "대상 보고서 : " + REPORT_NAME;
    (Matrix.getObject("LBL_CONTROL_NAME") as any).Text =
      "대상 컨트롤  : " + CONTROL_NAME;
  }
};
/*****************************************
 * 그리드의 셀을 더블 클릭할 떄 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 istudio.control.grid.DataGridRow	Row (Readonly:False) : 데이터 레코드 정보
 *		 istudio.control.grid.DataGridCell	Cell (Readonly:False) : 데이터셀 정보
 *		 istudio.control.grid.column.DataGridColumn	Field (Readonly:False) : 필드 정보
 *****************************************/
const OnCellDoubleClick = function (_sender: any, args: any): void {
  if (args.Id == "GRD_LAYOUT") {
    if (args.Field.Name == "DEL_BTN") {
      //삭제 기능
      Matrix.AddGlobalParams(
        ":VS_LAYOUT_CODE",
        args.Row.GetValue("LAYOUT_CODE"),
        1
      );

      Matrix.Confirm(
        "선택하신 항목을 삭제하시겠습니까?",
        "삭제 확인",
        function (ok: boolean): void {
          if (ok) {
            DELETE_LAYOUT();
          }
        },
        0
      );
    } else {
      SELECT_LAYOUT();
    }
  }
};

const DELETE_LAYOUT = function (): void {
  Matrix.RunScript("", "DELETE_LAYOUT", function (p: any): void {
    if (p.Success == false) {
      Matrix.Alert(p.Message);
      return;
    }
    Matrix.doRefresh("GRD_LAYOUT");
  });
};

const SELECT_LAYOUT = function (): void {
  const grdLayout = Matrix.getObject("GRD_LAYOUT") as DataGrid;
  if (grdLayout.GetRowCount() == 0) {
    return;
  }
  const data = grdLayout.getRowValue("LAYOUT_INFO");
  const ctlCode = grdLayout.getRowValue("CONTROL_CODE");
  if (data) {
    Matrix.ReportDialogResult(
      { CONTROL: ctlCode, MODEL: JSON.parse(data as string) },
      true,
      ""
    );
  }
};
const SAVE_LAYOUT = function (): void {
  Matrix.RunScript("", "SAVE_LAYOUT", function (p: any): void {
    if (p.Success == false) {
      Matrix.Alert(p.Message);
      return;
    }
    Matrix.ReportDialogResult(null, true, "");
  });
};
/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
const OnButtonClick = function (_sender: any, args: any): void {
  if (args.Id == "btnLayoutSelectOK") {
    SELECT_LAYOUT();
  } else if (args.Id == "btnLayoutSelectCancel") {
    Matrix.ReportDialogResult(null, true, "");
  } else if (args.Id == "btnSave") {
    if (!(Matrix.getObject("VS_LAYOUT_NAME") as any).Text) {
      Matrix.Information("저장 이름을 입력해 주세요", "입력 확인");
      (Matrix.getObject("VS_LAYOUT_NAME") as any).Focus();
      return;
    }
    SAVE_LAYOUT();
  } else if (args.Id == "btnCancel") {
    Matrix.ReportDialogResult(null, true, "");
  }
};

export { OnDocumentLoadComplete, OnCellDoubleClick, OnButtonClick };
