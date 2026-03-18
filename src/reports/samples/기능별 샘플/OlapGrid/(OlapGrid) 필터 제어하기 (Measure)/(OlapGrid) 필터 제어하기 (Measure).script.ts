import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;
/*****************************
 * OlapGrid 메져 필드의 필터 제어 하기
 *****************************/

const tbxDebug: RichTextBox = Matrix.getObject("tbxDebug") as RichTextBox;
const cboOperatorA: ComboBox = Matrix.getObject("cboOperatorA") as ComboBox;
const cboFields: ComboBox = Matrix.getObject("cboFields") as ComboBox;
const btnExecute: Button = Matrix.getObject("btnExecute") as Button;
const tbxValueA: NumberBox = Matrix.getObject("tbxValueA") as NumberBox;
const tbxValueB: NumberBox = Matrix.getObject("tbxValueB") as NumberBox;
const cboOperatorB: ComboBox = Matrix.getObject("cboOperatorB") as ComboBox;
const cboAndOrOperator: ComboBox = Matrix.getObject("cboAndOrOperator") as ComboBox;
const olapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;


/**
 * Olap의 디멘젼 필드 목록을 추출하여 ComboBox에 출력 합니다.
 */
const bindOlapFields = function (): void {
	const ds = Matrix.CreateDataSet();
	const dt = ds.CreateTable("DATA");
	dt.AddColumn("NAME", false);
	dt.AddColumn("DESCRIPTION", false);
	const fields = olapGrid.getFields();
	for (let i = 0; i < fields.length; i++) {
		if (fields[i].Category == 2 && fields[i].CreateType == 0  /*Default*/) {  /*Measure가 아닌 것들...*/
			dt.AppendRow([
				fields[i].Name
				, fields[i].Caption
			]);
		}
	}
	cboFields.SetDataSet(ds);
}
/** Olap의 필드 정보를 읽어서 설정합니다. */
const bindOlapFieldFilter = function (name: any): void {
	const fld = olapGrid.getField(name);
	if (fld.FilterInfo && fld.FilterInfo.HasMeasureFilter) {
		// Operator 및 값 설정
		const filter = fld.FilterInfo;
		switch (filter.MeasureAndOrOperator) {
			case 0: //none
				cboAndOrOperator.SelectedIndex = 0;
				break;
			case 1: //Or
				cboAndOrOperator.SelectedIndex = 2;
				break;
			case 2: //and
				cboAndOrOperator.SelectedIndex = 1;
				break;
		}

		cboOperatorA.SelectedIndex = filter.MeasureFilterTypeA;  /*Equals*/

		cboOperatorB.SelectedIndex = filter.MeasureFilterTypeB;
		tbxValueA.Value = filter.MeasureFilterValueA;
		tbxValueB.Value = filter.MeasureFilterValueB;

	} else {
		//초기화
		cboOperatorA.Value = "=";
		cboOperatorB.Value = "=";
		tbxValueA.Value = 0;
		tbxValueB.Value = 0;
		cboAndOrOperator.SelectedIndex = 0;
	}
}

/** Filter 설정하기 */
const setOlapFieldFilter = function (): void {

	const fld = olapGrid.getField(cboFields.Value);
	if (fld) {

		if (cboAndOrOperator.SelectedIndex > 0) {
			const isAnd = (cboAndOrOperator.Value == "AND");
			olapGrid.setMeasureFilter(fld.Name, cboOperatorA.Value, tbxValueA.Value
				, cboOperatorB.Value, tbxValueB.Value
				, isAnd);
			tbxDebug.Text = "OlapGrid.setMeasureFilter('" + fld.Name + "', '" + cboOperatorA.Value + "'," + tbxValueA.Value
				+ " ,'" + cboOperatorB.Value + "'," + tbxValueB.Value + "," + isAnd + ");"
		} else {
			olapGrid.setMeasureFilter(fld.Name, cboOperatorA.Value, tbxValueA.Value);
			tbxDebug.Text = "OlapGrid.setMeasureFilter('" + fld.Name + "', '" + cboOperatorA.Value + "'," + tbxValueA.Value + ");"
		}
		olapGrid.Refresh();
	}

}
/*****************************************
* 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
* * arguments :
*****************************************/
Matrix.OnDocumentLoadComplete = function (sender: any, args: any): void {
	bindOlapFields();
};



/*****************************************
* 콤보박스 컨트롤의 값이 변경될때 발생합니다.
* * arguments :
*		 string	Id (Readonly:False) : 컨트롤이름
*		 string	Value (Readonly:False) : 컨트롤 값
*****************************************/
Matrix.OnComboBoxValueChanged = function (sender: any, args: any): void {
	switch (args.Id) {
		case "cboFields":
			bindOlapFieldFilter(args.Value);
			break;
		case "cboAndOrOperator":
			if (args.Value == "AND" || args.Value == "OR") {
				tbxValueB.IsEnabled = true;

				cboOperatorB.IsEnabled = true;
			} else {
				tbxValueB.IsEnabled = false;
				tbxValueB.Value = 0;
				cboOperatorB.IsEnabled = false;
			}
			break;
	}
};
btnExecute.OnClick = function (sender: any, args: any): void {

	setOlapFieldFilter();
};
