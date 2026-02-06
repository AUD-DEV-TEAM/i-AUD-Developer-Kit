import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
import { OlapField } from "@AUD_CLIENT/control/olap/OlapField";

declare let Matrix: Matrix;
/*****************************
 * OLAP 필드 그룹, 계층 그룹 제어하기
 *****************************/

const tbxGroupName: TextBox = Matrix.getObject("tbxGroupName") as TextBox;
const tbxFieldNames: TextBox = Matrix.getObject("tbxFieldNames") as TextBox;
const olapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;


olapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
olapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거
/*****************************************
* 버튼 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :
*		 string	Id (Readonly:False) : 컨트롤이름
*		 string	Text (Readonly:False) : 라벨 값
*****************************************/
const OnButtonClick = function (sender: any, args: any): void {

	const flds = tbxFieldNames.Text.split(",");
	let fld: OlapField;

	const ALL_FIELDS: { [key: string]: OlapField } = {};
	for (let f = 0, f2 = olapGrid.Fields.length; f < f2; f++) {
		ALL_FIELDS[olapGrid.Fields[f].Caption] = olapGrid.Fields[f];
	}
	const fieldKeys: string[] = [];

	for (let i = 0; i < flds.length; i++) {
		fld = olapGrid.getField(flds[i]);
		if (!fld) {
			fld = ALL_FIELDS[flds[i]];
		}
		if (fld) {
			fieldKeys.push(fld.Name);
		}
	}

	if (args.Id == "btnExecute") {
		//초기화
		olapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
		olapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거

		olapGrid.AddFieldGroup("GRP_FIELDS_01", fieldKeys);
		olapGrid.Refresh();


	} else if (args.Id == "btnCreateHierarchy") {
		//초기화
		olapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
		olapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거
		olapGrid.AddHierarchyGroupInfo("HIERARCHY_01", tbxGroupName.Text, fieldKeys);
		olapGrid.Refresh();


	}
};

export { OnButtonClick };
