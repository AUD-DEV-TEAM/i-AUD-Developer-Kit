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
 * i-AUD Client Sample
 *****************************/

let btnExpandCollapsed : Button =   Matrix.getObject("btnExpandCollapsed") as Button;
let tbxItems : TextBox =   Matrix.getObject("tbxItems") as TextBox;
let rdoExpand : RadioButton =   Matrix.getObject("rdoExpand") as RadioButton;
let rdoCollapsed : RadioButton =   Matrix.getObject("rdoCollapsed") as RadioButton;
let OlapGrid : OlapGrid =   Matrix.getObject("OlapGrid") as OlapGrid;

let cboFields : ComboBox =   Matrix.getObject("cboFields") as ComboBox;


/*****************************************
* 전체 확장/축소 실행하기
*****************************************/
btnExpandCollapsed.OnClick  = function (sender, args) {
	if (!rdoExpand.IsChecked) {
		OlapGrid.ExpandAll();
	} else {
		OlapGrid.CollapsedAll();
	}
};

/*****************************************
* 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 int	RecordCount (Readonly:False) : 데이터셋의 레코드 수량 
*****************************************/
OlapGrid.OnDataBindEnd = function (sender, args) {
	OlapGrid.Expand(cboFields.Value, tbxItems.Text, rdoExpand.IsChecked);
	OlapGrid.Calculate();
}; 


/**
 * Olap의 디멘젼 필드 목록을 추출하여 ComboBox에 출력 합니다.
 */
Matrix.OnDocumentLoadComplete = function(){
	let ds = Matrix.CreateDataSet();
	let dt = ds.CreateTable("DATA");
	dt.AddColumn("NAME", false);
	dt.AddColumn("DESCRIPTION", false);
	let fields = OlapGrid.getFields();
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