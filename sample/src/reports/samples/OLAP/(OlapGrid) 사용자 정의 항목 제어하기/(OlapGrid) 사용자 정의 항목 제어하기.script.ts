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

 *****************************/

let tbxDebug: RichTextBox = Matrix.getObject("tbxDebug") as RichTextBox;
let OlapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
let Label: Label = Matrix.getObject("Label") as Label;
let btnExecute: Button = Matrix.getObject("btnExecute") as Button;
let Label3: Label = Matrix.getObject("Label3") as Label;
let tbxGroupName: TextBox = Matrix.getObject("tbxGroupName") as TextBox;
let Label1: Label = Matrix.getObject("Label1") as Label;
let tbxValues: TextBox = Matrix.getObject("tbxValues") as TextBox;
let btnClear: Button = Matrix.getObject("btnClear") as Button;

/**
 * 초기화 버튼 클릭
 * @param sender 
 * @param args 
 */
btnClear.OnClick = function (sender, args) {
	OlapGrid.ClearCustomDimensions();
	OlapGrid.Refresh();
}
/**
 * 사용자 정의 항목 추가 하기
 * @param sender 
 * @param args 
 */
btnExecute.OnClick = function (sender, args) {
	var nDim = OlapGrid.addCustomDimension("PRODUCT", tbxGroupName.Text);
	nDim.Caption = tbxGroupName.Text;
	var arr = tbxValues.Text.split(",");
	var text = '"' + arr.join("\",\"") + '"';
	nDim.Formula = ' InList([PRODUCT], ' + text + ')'; 
	OlapGrid.Refresh();
};