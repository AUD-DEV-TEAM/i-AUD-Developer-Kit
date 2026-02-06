import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;
/*****************************
 * OlapGrid 셀 더블 클릭 시 해당 셀의 헤더 정보 읽기
 *****************************/

const box: RichTextBox = Matrix.getObject("DEBUG_BOX") as RichTextBox;
const olapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;

olapGrid.OnDataCellDoubleClick = function (sender: any, args: any): void {
	box.Text ="Text = " + args.DataCell.Text
			+ "\nValue = " + args.DataCell.Value
			+ "\nDataField = " + args.DataCell.Field.Name
			+ "\nIsTotal = " + (args.DataCell.IsTotal === true)
			+ "\nIsGrandTotal = " + (args.DataCell.IsGrandTotal === true);

	// header 셀 읽기
	const readHeaderPath = function (head: any): string {
		let array: string[] = [];
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
