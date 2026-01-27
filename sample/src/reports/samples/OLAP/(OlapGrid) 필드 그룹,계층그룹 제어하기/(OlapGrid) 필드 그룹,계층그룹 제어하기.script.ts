import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { iGrid } from "@AUD_CLIENT/control/iGrid";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Image } from "@AUD_CLIENT/control/Image";
import { ColorPicker } from "@AUD_CLIENT/control/ColorPicker";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
import { OlapField } from "@AUD_CLIENT/control/olap/OlapField";

let Matrix: Matrix;
/*****************************
 * OLAP 필드 그룹, 계층 그룹 제어하기
 *****************************/

const tbxGroupName: TextBox = Matrix.getObject("tbxGroupName") as TextBox;
const tbxFieldNames: TextBox = Matrix.getObject("tbxFieldNames") as TextBox;
const OlapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;


OlapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
OlapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거
/*****************************************
* 버튼 컨트롤이 클릭되는 시점에 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 string	Text (Readonly:False) : 라벨 값 
*****************************************/
const OnButtonClick = function (sender, args) {

	let flds = tbxFieldNames.Text.split(",");
	let fld: OlapField;

	let ALL_FIELDS: { [key: string]: OlapField } = {};
	for (let f = 0, f2 = OlapGrid.Fields.length; f < f2; f++) {
		ALL_FIELDS[OlapGrid.Fields[f].Caption] = OlapGrid.Fields[f];
	}
	let fieldKeys = [];

	for (let i = 0; i < flds.length; i++) {
		fld = OlapGrid.getField(flds[i]);
		if (!fld) {
			fld = ALL_FIELDS[flds[i]];
		}
		if (fld) {
			fieldKeys.push(fld.Name);
		}
	}

	if (args.Id == "btnExecute") {
		//초기화
		OlapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
		OlapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거		

		OlapGrid.AddFieldGroup("GRP_FIELDS_01", fieldKeys);
		OlapGrid.Refresh();


	} else if (args.Id == "btnCreateHierarchy") {
		//초기화
		OlapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
		OlapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거
		OlapGrid.AddHierarchyGroupInfo("HIERARCHY_01", tbxGroupName.Text, fieldKeys);
		OlapGrid.Refresh();


	}
};








