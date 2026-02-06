import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

let olapGrid: OlapGrid | null = null;
let tbxFieldNames: TextBox | null = null;
let tbxGroupName: TextBox | null = null;

const initControlVariables = function (): void {
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
const OnButtonClick = function (_sender: any, args: any): void {
  const flds = tbxFieldNames!.Text.split(",");
  let fld: any;
  for (let i = 0; i < flds.length; i++) {
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

export { OnButtonClick };
