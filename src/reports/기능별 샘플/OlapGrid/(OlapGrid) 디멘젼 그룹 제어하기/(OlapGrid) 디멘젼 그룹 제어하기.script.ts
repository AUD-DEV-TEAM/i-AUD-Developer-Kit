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

let Matrix: Matrix;
/*****************************
 * i-AUD Client Sample
 *****************************/
let btnExecute: Button = Matrix.getObject("btnExecute") as Button;
let btnClear: Button = Matrix.getObject("btnClear") as Button;
let OlapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;


btnClear.OnClick = function (sender, args) {
	//Field Group 제거
	OlapGrid.ClearDimensionGroups();
	OlapGrid.Refresh();
}
btnExecute.OnClick = function (sender, args) {

	//그룹 필드 추가
	let targetField = "PRODUCT";
	let newField = OlapGrid.addDimensionGroup(targetField, "상품 그룹");
	let group = newField.DimensionGroupInfo; //디멘젼 그룹 정보

	let item = group.AddItem("1.전체");
	item.ItemType = 2; /*All*/

	item = group.AddItem("2.라떼");
	item.ItemType = 0; /*Normal*/
	item.Entries = ['그린티라떼', '카페라떼'];

	item = group.AddItem("3.카푸치노");
	item.ItemType = 0; /*Normal*/
	item.Entries = ['카푸치노', '그린티프라푸치노'];

	item = group.AddItem("4.아메리카노");
	item.ItemType = 0; /*Normal*/
	item.Entries = ['아메리카노', '콜드브루'];

	item = group.AddItem("5.Others");
	item.ItemType = 1; /*Others*/

	newField.Area = 1; /*Row*/
	OlapGrid.MoveField(newField.Name, 0, false);
	//OlapGrid.getField("창고코드").Area = 1  /*Row*/;
	//OlapGrid.MoveField("창고코드" ,1, true);
	OlapGrid.Refresh();

};






