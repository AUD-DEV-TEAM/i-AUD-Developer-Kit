import { Matrix as MatrixType } from "@AUD_CLIENT/control/Matrix";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Chart } from "@AUD_CLIENT/control/Chart";

declare const Matrix: MatrixType;

/*****************************
 *
 *****************************/
let ChartCtrl: Chart | null = null;
let Chart1Ctrl: Chart | null = null;
let DataGridCtrl: DataGrid | null = null;

const initControlVariables = function (): void {
  ChartCtrl = Matrix.getObject("Chart") as Chart;
  Chart1Ctrl = Matrix.getObject("Chart1") as Chart;
  DataGridCtrl = Matrix.getObject("DataGrid") as DataGrid;
};
initControlVariables();

/*****************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 int	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
 *****************************************/
const OnDataBindEnd = function (sender: any, args: any): void {
  // 	if(args.Id == "DataGrid"){
  //		var dataSet = DataGridCtrl!.GetDataSet();
  //		ChartCtrl!.SetDataSet(dataSet);
  //		Chart1Ctrl!.SetDataSet(dataSet);
  //	}
};

const bind = function (): void {
  const grid = Matrix.getObject("DataGrid") as DataGrid;
  const chart1 = Matrix.getObject("Chart") as Chart;
  const chart2 = Matrix.getObject("Chart1") as Chart;

  grid.OnDataBindEnd = function (s: any, e: any): void {
    const dataSet = grid.GetDataSet();
    chart1.SetDataSet(dataSet);
    chart2.SetDataSet(dataSet);
  };
};

bind();
