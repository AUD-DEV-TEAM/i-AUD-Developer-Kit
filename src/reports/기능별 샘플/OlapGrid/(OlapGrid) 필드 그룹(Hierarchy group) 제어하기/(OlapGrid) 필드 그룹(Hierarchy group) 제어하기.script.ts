import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/
var olapGrid: OlapGrid | null = null;
var tbxFieldNames: TextBox | null = null;
var tbxGroupName: TextBox | null = null;

var initControlVariables = function () {
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  tbxFieldNames = Matrix.getObject("tbxFieldNames") as TextBox;
  tbxGroupName = Matrix.getObject("tbxGroupName") as TextBox;
};
initControlVariables();

/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
var OnButtonClick = function (sender: any, args: any) {
  var flds = tbxFieldNames!.Text.split(",");
  var fld: any;
  for (var i = 0; i < flds.length; i++) {
    fld = olapGrid!.getField(flds[i]);
    if (fld) {
      fld.Area = 1; /*Row*/
    }
  }
  if (args.Id == "btnExecute") {
    //초기화
    olapGrid!.ClearFieldGroup(); //필드 그룹 모두 제거
    olapGrid!.ClearHierarchyGroup(); //hierarchy필드 모두 제거

    olapGrid!.AddFieldGroup("GRP_FIELDS_01", flds);
    olapGrid!.Refresh();
  } else if (args.Id == "btnCreateHierarchy") {
    //초기화
    olapGrid!.ClearFieldGroup(); //필드 그룹 모두 제거
    olapGrid!.ClearHierarchyGroup(); //hierarchy필드 모두 제거
    olapGrid!.AddHierarchyGroupInfo("HIERARCHY_01", tbxGroupName!.Text, flds);
    olapGrid!.Refresh();
  }
};
