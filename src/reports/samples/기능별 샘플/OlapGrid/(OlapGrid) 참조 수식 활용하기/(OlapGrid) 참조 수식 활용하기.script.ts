import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

let olapGrid: OlapGrid | null = null;
let richTextBox: RichTextBox | null = null;

const initControlVariables = function (): void {
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  richTextBox = Matrix.getObject("RichTextBox") as RichTextBox;
  olapGrid.OnDataCellDoubleClick = function (s: any, e: any): void {
    richTextBox!.Text +=
      "품목코드:" +
      e.DataCell.getHeaderCell("CB9B03EAE").Value2 +
      ",창고코드:" +
      e.DataCell.getHeaderCell("C1482C520").Value2 +
      "\n";
  };
};
initControlVariables();
