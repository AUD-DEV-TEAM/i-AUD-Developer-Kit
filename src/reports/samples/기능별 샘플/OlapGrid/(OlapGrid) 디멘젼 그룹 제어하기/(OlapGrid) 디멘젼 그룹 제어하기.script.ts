import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;
/*****************************
 * i-AUD Client Sample
 *****************************/
const btnExecute: Button = Matrix.getObject("btnExecute") as Button;
const btnClear: Button = Matrix.getObject("btnClear") as Button;
const olapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;


btnClear.OnClick = function (sender: any, args: any): void {
	//Field Group 제거
	olapGrid.ClearDimensionGroups();
	olapGrid.Refresh();
}
btnExecute.OnClick = function (sender: any, args: any): void {

	//그룹 필드 추가
	const targetField = "PRODUCT";
	const newField = olapGrid.addDimensionGroup(targetField, "상품 그룹");
	const group = newField.DimensionGroupInfo; //디멘젼 그룹 정보

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
	olapGrid.MoveField(newField.Name, 0, false);
	//olapGrid.getField("창고코드").Area = 1  /*Row*/;
	//olapGrid.MoveField("창고코드" ,1, true);
	olapGrid.Refresh();

};
