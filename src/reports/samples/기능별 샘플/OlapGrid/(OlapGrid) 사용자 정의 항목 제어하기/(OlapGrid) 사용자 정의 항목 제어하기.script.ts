import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;

const olapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
const btnExecute: Button = Matrix.getObject("btnExecute") as Button;
const tbxGroupName: TextBox = Matrix.getObject("tbxGroupName") as TextBox;
const tbxValues: TextBox = Matrix.getObject("tbxValues") as TextBox;
const btnClear: Button = Matrix.getObject("btnClear") as Button;

/**
 * 초기화 버튼 클릭
 * @param sender
 * @param args
 */
btnClear.OnClick = function (sender: any, args: any): void {
	olapGrid.ClearCustomDimensions();
	olapGrid.Refresh();
}
/**
 * 사용자 정의 항목 추가 하기
 * @param sender
 * @param args
 */
btnExecute.OnClick = function (sender: any, args: any): void {
	const nDim = olapGrid.addCustomDimension("PRODUCT", tbxGroupName.Text);
	nDim.Caption = tbxGroupName.Text;
	const arr = tbxValues.Text.split(",");
	const text = '"' + arr.join("\",\"") + '"';
	nDim.Formula = ' InList([PRODUCT], ' + text + ')';
	olapGrid.Refresh();
};
