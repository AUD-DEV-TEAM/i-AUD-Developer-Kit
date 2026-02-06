import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/
var olapGrid: OlapGrid | null = null;
var richTextBox: RichTextBox | null = null;

var initControlVariables = function () {
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  richTextBox = Matrix.getObject("RichTextBox") as RichTextBox;
  olapGrid.OnDataCellDoubleClick = function (s, e) {
    richTextBox!.Text +=
      "품목코드:" +
      e.DataCell.getHeaderCell("CB9B03EAE").Value2 +
      ",창고코드:" +
      e.DataCell.getHeaderCell("C1482C520").Value2 +
      "\n";
  };
};
initControlVariables();
