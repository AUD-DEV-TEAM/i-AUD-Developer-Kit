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
 * OlapGrid 셀 더블 클릭 시 해당 셀의 헤더 정보 읽기
 *****************************/

let box: RichTextBox = Matrix.getObject("DEBUG_BOX") as RichTextBox;
let OlapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;

OlapGrid.OnDataCellDoubleClick = function (sender, args) {
	box.Text ="Text = " + args.DataCell.Text
			+ "\nValue = " + args.DataCell.Value
			+ "\nDataField = " + args.DataCell.Field.Name
			+ "\nIsTotal = " + (args.DataCell.IsTotal === true)
			+ "\nIsGrandTotal = " + (args.DataCell.IsGrandTotal === true);

	// header 셀 읽기
	let readHeaderPath = function (head) {
		let array = [];
		while (head) {
			if (head.IsTotal) {
				array.push("[" + head.Field.Name + "](Total)=" + head.Text);
			}
			else if (head.IsGrandTotal) {
				array.push("[" + head.Field.Name + "](Grand Total)=" + head.Text);
			} else if (head.IsMeasure) {
				array.push("[" + head.Field.Name + "]=" + head.Text);
			} else if (head.IsCustom) {
				array.push("[" + head.Field.Name + "]=" + head.Text);
			} else {
				array.push("[" + head.Field.Name + "]=" + head.Text);
			}

			head = head.Parent;
		}
		array = array.reverse();
		return array.join(",");
	}
	// row header 읽기
	box.Text += "\nRowHeader Path = " + readHeaderPath(args.DataCell.RowHeader);
	// colum header
	box.Text += "\nColumnHeader Path = " + readHeaderPath(args.DataCell.ColumnHeader);
};
 

