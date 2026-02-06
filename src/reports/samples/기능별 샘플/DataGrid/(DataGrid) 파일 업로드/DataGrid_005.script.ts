import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

declare const Matrix: Matrix;

const DG_IMPORT: DataGrid = Matrix.getObject("DG_IMPORT") as DataGrid;

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
const OnButtonClick = function(_sender: any, args: any): void {
	if (args.Id == "BTN_UPL") {
		const readFile = function(fileName: string): void {
			Matrix.ServiceCall(
				"",
				"com.matrix.services.FileToTableService",
				[{ 'Key': '#FILE_PATH#', 'Value': "_TEMP_/" + fileName }],
				function(p: any): void {
					if (p.Success == false) {
						Matrix.Alert(p.Message);
						return;
					}
					const ds = p.DataSet;
					DG_IMPORT.ClearFields();
					DG_IMPORT.SetDataSet(ds);
				}
			);
		};

		Matrix.UploadLocalFile(
			"_TEMP_",
			".xlsx, .xls, .csv, .txt",
			function(p: any): void {
				if (p.Success == false) {
					Matrix.Alert(p.Message);
					return;
				}
				readFile(p.SaveFileName);
			}
		);
	}
};

export {
	OnButtonClick
};
