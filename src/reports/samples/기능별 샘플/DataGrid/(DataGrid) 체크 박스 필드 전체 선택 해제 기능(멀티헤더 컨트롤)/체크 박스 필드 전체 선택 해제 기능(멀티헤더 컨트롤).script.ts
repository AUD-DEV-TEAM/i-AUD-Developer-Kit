import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

declare const Matrix: Matrix;

const DataGrid: DataGrid = Matrix.getObject("DataGrid") as DataGrid;

/*****************************
 *
 *****************************/

/*****************************************
* Occurs when the value of the checkbox control changes.
* * arguments :
*		 string	Id (Readonly:False) : Control Name
*		 bool	IsChecked (Readonly:False) : Check status
*****************************************/
const OnCheckValueChange = function(_sender: any, args: any): void {
	if (args.Id == "CHK_SELECT_ALL") {
		const grid = DataGrid;

		if (args.IsChecked) {
			for (let r = 0; r < grid.GetRowCount(); r++) {
				grid.setRowValue(r, "CHK", "Y");
			}
		} else {
			for (let r = 0; r < grid.GetRowCount(); r++) {
				grid.setRowValue(r, "CHK", "N");
			}
		}
		grid.Update();
	}
};

export { OnCheckValueChange };