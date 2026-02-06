import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix: Matrix;


let DataGrid1: DataGrid = Matrix.getObject("DataGrid1") as DataGrid;
let DataGrid: DataGrid = Matrix.getObject("DataGrid") as DataGrid;
let btnRUN: Button = Matrix.getObject("btnRUN") as Button;
let VS_EXT_TYPE: ComboBox = Matrix.getObject("VS_EXT_TYPE") as ComboBox;

/**
 * 파일 내보내기 버튼 클릭 이벤트
 * @param sender 
 * @param args 
 */
btnRUN.OnClick = function (sender, args) {
	exportFile();
};

/**
 * 엑셀 내보내기 템플릿 생성하기
 */

const exportFile = function () {

	let nowText = Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss");
	//엑셀 내보내기 모델
	let WORKBOOK = {
		"FontName": "맑은 고딕"
		, "FontSize": 11
		, "WorkSheets": [
			{
				"Name": "Sheet1"
				, "DisplayGridlines": "false"
				, "Controls": [DataGrid.GetExcelExportJSON("A2"), DataGrid1.GetExcelExportJSON("A9")]
				, "Ranges": [
				]
			}
		]
	};
	//템플릿 모델 문자열로 변경
	Matrix.AddGlobalParams("VS_TEMPLATE", JSON.stringify(WORKBOOK), 1);
	// 서버 스크립트 실행
	Matrix.RunScript("", "EXPORT", function (p) {
		if (p.Success == false) {
			Matrix.Alert(p.Message);
			return;
		}
		// download file
		let fileInfo = p.DataSet as any;
		let folderName = fileInfo["FOLDER_NAME"];
		let fileName = fileInfo["FILE_NAME"];
		// download.maf 주소
		Matrix.DownloadFile(folderName + "/"
			, fileName
			, Matrix.GetReportInfo().NAME + "_" + nowText + "." + VS_EXT_TYPE.Value
			, true);
	});
};
