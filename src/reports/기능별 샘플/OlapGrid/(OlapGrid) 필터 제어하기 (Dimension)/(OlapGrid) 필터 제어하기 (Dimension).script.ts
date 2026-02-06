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
 * OlapGrid 디멘젼 필드의 필터 제어 하기
 *****************************/

let tbxDebug: RichTextBox = Matrix.getObject("tbxDebug") as RichTextBox;
let OlapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
let cboOperator: ComboBox = Matrix.getObject("cboOperator") as ComboBox;
let cboFields: ComboBox = Matrix.getObject("cboFields") as ComboBox;
let tbxValues: TextBox = Matrix.getObject("tbxValues") as TextBox;
let btnExecute: Button = Matrix.getObject("btnExecute") as Button;

/**
 * Olap의 디멘젼 필드 목록을 추출하여 ComboBox에 출력 합니다.
 */
const bindOlapFields = function () {
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
/** 
 * OlapGrid의 필드의 필터 정보를 컨트롤에 출력 합니다.
 * */
const bindOlapFieldFilter = function (name) {
	let fld = OlapGrid.getField(name);
	if (fld.FilterInfo && fld.FilterInfo.HasFilter()) {
		// Operator 및 값 설정
		let filter = fld.FilterInfo;
		if (filter.FilterType == 0) {  /*In*/
			cboOperator.Value = "In";
			tbxValues.Text = (filter.Values) ? filter.Values.join(",") : "";
		} else if (filter.FilterType == 1) {  /*NotIn*/
			cboOperator.Value = "NotIn";
			tbxValues.Text = (filter.Values) ? filter.Values.join(",") : "";
		} else {// if(filter.FilterType == 4){ /*BetWeen*/
			cboOperator.Value = "Between";
			tbxValues.Text = (filter.Values) ? filter.Values.join(",") : "";
		}
	} else {
		//초기화
		cboOperator.Value = "In";
		tbxValues.Text = "";
	}
}

/**
 * OlapGrid 필드의 필터 정보를 설정 내용으로 업데이트 합니다.
 */
const setOlapFieldFilter = function () {

	let fld = OlapGrid.getField(cboFields.Value);
	if (fld) {
		let values = tbxValues.Text.split(",");
		let filter = cboOperator.Value;
		switch (filter) {
			case "In":
				OlapGrid.setDimensionFilterIn(fld.Name, values); //  IN
				tbxDebug.Text = "OlapGrid.setDimensionFilterIn('" + fld.Name + "',['" + values.join("','") + "']);";
				break;
			case "NotIn":
				OlapGrid.setDimensionFilterNotIn(fld.Name, values); //NOT IN
				tbxDebug.Text = "OlapGrid.setDimensionFilterNotIn('" + fld.Name + "',['" + values.join("','") + "']);";
				break;
			case "Between":
				if (values.length >= 2) {
					OlapGrid.setDimensionFilterBetWeen(fld.Name, values[0], values[1]); //between
					tbxDebug.Text = "OlapGrid.setDimensionFilterBetWeen('" + fld.Name + "','" + values[0] + "','" + values[1] + "');";
				}
				break;

		}
		OlapGrid.Refresh();
	}

}
/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :  
*****************************************/
let OnDocumentLoadComplete = function (sender, args) {
	bindOlapFields();
};



/*****************************************
 * 필드 값 변경 시 필터 정보 업데이트
*****************************************/
cboFields.OnValueChanged = function (sender, args) {
	bindOlapFieldFilter(args.Value);
};

/**
 * 실행 버튼 클릭 이벤트 핸들러
 * @param sender 
 * @param args 
 */
btnExecute.OnClick = function (sender, args) {
	setOlapFieldFilter();
};












