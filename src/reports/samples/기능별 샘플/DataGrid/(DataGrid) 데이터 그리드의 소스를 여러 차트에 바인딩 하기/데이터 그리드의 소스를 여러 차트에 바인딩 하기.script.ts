import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Chart } from "@AUD_CLIENT/control/Chart";

declare const Matrix: Matrix;

const DataGrid: DataGrid = Matrix.getObject("DataGrid") as DataGrid;
const Chart: Chart = Matrix.getObject("Chart") as Chart;
const Chart1: Chart = Matrix.getObject("Chart1") as Chart;

const bind = function(): void {
	DataGrid.OnDataBindEnd = function(_s: any, _e: any): void {
		const dataSet = DataGrid.GetDataSet();
		Chart.SetDataSet(dataSet);
		Chart1.SetDataSet(dataSet);
	};
};

bind();

export {};