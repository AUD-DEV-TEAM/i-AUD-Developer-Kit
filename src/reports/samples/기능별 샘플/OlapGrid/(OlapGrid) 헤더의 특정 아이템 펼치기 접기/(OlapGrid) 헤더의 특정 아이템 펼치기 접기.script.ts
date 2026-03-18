import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;
/*****************************
 * i-AUD Client Sample
 *****************************/

const btnExpandCollapsed: Button = Matrix.getObject("btnExpandCollapsed") as Button;
const tbxItems: TextBox = Matrix.getObject("tbxItems") as TextBox;
const rdoExpand: RadioButton = Matrix.getObject("rdoExpand") as RadioButton;
const rdoCollapsed: RadioButton = Matrix.getObject("rdoCollapsed") as RadioButton;
const olapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;

const cboFields: ComboBox = Matrix.getObject("cboFields") as ComboBox;


/*****************************************
* 전체 확장/축소 실행하기
*****************************************/
btnExpandCollapsed.OnClick = function (sender: any, args: any): void {
	if (!rdoExpand.IsChecked) {
		olapGrid.ExpandAll();
	} else {
		olapGrid.CollapsedAll();
	}
};

/*****************************************
* 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
* * arguments :
*		 string	Id (Readonly:False) : 컨트롤이름
*		 int	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
*****************************************/
olapGrid.OnDataBindEnd = function (sender: any, args: any): void {
	olapGrid.Expand(cboFields.Value, tbxItems.Text, rdoExpand.IsChecked);
	olapGrid.Calculate();
};


/**
 * Olap의 디멘젼 필드 목록을 추출하여 ComboBox에 출력 합니다.
 */
Matrix.OnDocumentLoadComplete = function (sender: any, args: any): void {
	const ds = Matrix.CreateDataSet();
	const dt = ds.CreateTable("DATA");
	dt.AddColumn("NAME", false);
	dt.AddColumn("DESCRIPTION", false);
	const fields = olapGrid.getFields();
	for (let i = 0; i < fields.length; i++) {
		if (fields[i].Category != 2) {  /*Measure가 아닌 것들...*/
			dt.AppendRow([
				fields[i].Name
				, fields[i].Caption
			]);
		}
	}
	cboFields.SetDataSet(ds);
}
