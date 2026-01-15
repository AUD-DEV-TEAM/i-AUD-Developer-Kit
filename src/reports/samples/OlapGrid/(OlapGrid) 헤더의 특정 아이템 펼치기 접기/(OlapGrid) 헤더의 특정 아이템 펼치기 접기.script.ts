import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/
var olapGrid: OlapGrid | null = null;
var rdoCollapsed: RadioButton | null = null;
var rdoExpand: RadioButton | null = null;
var tbxField: TextBox | null = null;
var tbxItems: TextBox | null = null;

var initControlVariables = function () {
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  rdoCollapsed = Matrix.getObject("rdoCollapsed") as RadioButton;
  rdoExpand = Matrix.getObject("rdoExpand") as RadioButton;
  tbxField = Matrix.getObject("tbxField") as TextBox;
  tbxItems = Matrix.getObject("tbxItems") as TextBox;
};
/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
var OnDocumentLoadComplete = function (sender: any, args: any) {
  initControlVariables();
};
/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
var OnButtonClick = function (sender: any, args: any) {
  if (rdoExpand!.Checked) {
    olapGrid!.ExpandAll();
  } else {
    olapGrid!.CollapsedAll();
  }
};

/*****************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 int	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
 *****************************************/
var OnDataBindEnd = function (sender: any, args: any) {
  if (args.Id == olapGrid!.Name) {
    olapGrid!.Expand(tbxField!.Text, tbxItems!.Text, rdoExpand!.Checked);
    olapGrid!.Calculate();
  }
};
