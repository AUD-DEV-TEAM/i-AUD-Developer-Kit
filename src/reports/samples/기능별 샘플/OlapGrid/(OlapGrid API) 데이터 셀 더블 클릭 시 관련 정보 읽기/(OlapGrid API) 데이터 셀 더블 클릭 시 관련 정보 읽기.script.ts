import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
import { ScriptDataCell } from "@AUD_CLIENT/control/olap/ScriptDataCell";
import { ScriptHeaderCell } from "@AUD_CLIENT/control/olap/ScriptHeaderCell";

let Matrix: Matrix;


/*****************************
 * 컨트롤 변수 선언
 *****************************/
let debugBox: RichTextBox;
let olapGrid: OlapGrid;


/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 *****************************************/
Matrix.OnDocumentLoadComplete = function (sender, args) {
    // 컨트롤 바인딩
    debugBox = Matrix.getObject("DEBUG_BOX") as RichTextBox;
    olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
 
  
    debugBox.Text = "";

    // OlapGrid 데이터 셀 더블 클릭 이벤트
    olapGrid.OnDataCellDoubleClick = function (
        sender: OlapGrid,
        args: { Id: string; DataCell: ScriptDataCell }
    ) {
        const dataCell = args.DataCell;

        debugBox.Text =
            "<OnDataCellDoubleClick>" +
            "\nText = " + dataCell.Text +
            "\nValue = " + dataCell.Value +
            "\nDataField = " + dataCell.Field.Name +
            "\nIsTotal = " + dataCell.IsTotal +
            "\nIsGrandTotal = " + dataCell.IsGrandTotal;

        // header 셀 읽기
        const readHeaderPath = function (head: ScriptHeaderCell | null): string {
            const array: string[] = [];
            while (head) {
                if (head.IsTotal) {
                    array.push("[" + head.Field.Name + "](Total)=" + head.Text);
                } else if (head.IsGrandTotal) {
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
            return array.reverse().join(",");
        };

		

        // row header 읽기
        debugBox.Text += "\nRowHeader Path = " + readHeaderPath(dataCell.RowHeader);

        // column header
        debugBox.Text += "\nColumnHeader Path = " + readHeaderPath(dataCell.ColumnHeader);
    };
};
