import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;

const OLAP_EXPORT: OlapGrid = Matrix.getObject("OLAP_EXPORT") as OlapGrid;

const WORKBOOK: any = {
	"FontName": "맑은 고딕",
	"FontSize": 11,
	"WorkSheets": [
		{
			"Name": OLAP_EXPORT.Name,
			"DisplayGridlines": "false",
			"Rows": [
				{ "Index": 1, "Height": 9.95 },
				{ "Index": 2, "Height": 16.5 },
				{ "Index": 3, "Height": 16.5 },
				{ "Index": 4, "Height": 16.5 }
			],
			"Columns": [
				{ "Index": 1, "Width": 1.0, "PixelWidth": 13 },
				{ "Index": 2, "Width": 8.375, "PixelWidth": 72 },
				{ "Index": 3, "Width": 8.375, "PixelWidth": 72 }
			],
			"Ranges": [
				{ "Range": "B2", "Type": 0, "Value": "보고서명 : " + Matrix.GetReportInfo().NAME },
				{ "Range": "B3", "Type": 0, "Value": "사용자명 : " + Matrix.GetUserInfo().UserName },
				{ "Range": "B4", "Type": 0, "Value": "다운로드 시간" + Matrix.GetDateTime().ToString("yyyy-MM-dd HH:mm:ss") }
			],
			"Controls": [
				{ "Name": OLAP_EXPORT.Name, "Range": "B6" }
			]
		}
	]
};

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
const OnButtonClick = function(_sender: any, args: any): void {
	switch (args.Id) {
		case "BTN_EXP_XLSX":
			Matrix.ExcelExportServiceCall(WORKBOOK, null, function(e: any): void {
				if (e.Success == false) {
					alert("export fail" + e.Message);
					return;
				}

				const row = e.DataSet.GetTable(0).GetRow(0);
				const folderName = row.GetValue("FolderName");
				const fileName = row.GetValue("FileName");
				const nowText = Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss");
				const newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".xlsx";

				Matrix.DownloadFile(folderName + "/", fileName, newFileName, true);
			});
			break;

		case "BTN_EXP_HTM":
			Matrix.HTMLExportServiceCall(WORKBOOK, null, function(e: any): void {
				if (e.Success == false) {
					alert("export fail" + e.Message);
					return;
				}

				const row = e.DataSet.GetTable(0).GetRow(0);
				const folderName = row.GetValue("FolderName");
				const fileName = row.GetValue("FileName");
				const nowText = Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss");
				const newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".htm";

				Matrix.DownloadFile(folderName + "/", fileName, newFileName, true);
			});
			break;

		case "BTN_EXP_DOCX":
			Matrix.WordExportServiceCall(WORKBOOK, null, function(e: any): void {
				if (e.Success == false) {
					alert("export fail" + e.Message);
					return;
				}

				const row = e.DataSet.GetTable(0).GetRow(0);
				const folderName = row.GetValue("FolderName");
				const fileName = row.GetValue("FileName");
				const nowText = Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss");
				const newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".docx";

				Matrix.DownloadFile(folderName + "/", fileName, newFileName, true);
			});
			break;

		case "BTN_EXP_HWP":
			Matrix.HMLExportServiceCall(WORKBOOK, null, function(e: any): void {
				if (e.Success == false) {
					alert("export fail" + e.Message);
					return;
				}

				const row = e.DataSet.GetTable(0).GetRow(0);
				const folderName = row.GetValue("FolderName");
				const fileName = row.GetValue("FileName");
				const nowText = Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss");
				const newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".hwp";

				Matrix.DownloadFile(folderName + "/", fileName, newFileName, true);
			});
			break;

		case "BTN_EXP_PDF":
			Matrix.PDFExportServiceCall(WORKBOOK, null, function(e: any): void {
				if (e.Success == false) {
					alert("export fail" + e.Message);
					return;
				}

				const row = e.DataSet.GetTable(0).GetRow(0);
				const folderName = row.GetValue("FolderName");
				const fileName = row.GetValue("FileName");
				const nowText = Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss");
				const newFileName = Matrix.GetReportInfo().NAME + "_" + nowText + ".pdf";

				Matrix.DownloadFile(folderName + "/", fileName, newFileName, true);
			});
			break;

		case "BTN_EXP_CSV":
			// OlapGrid does not support CSV export
			break;

		case "BTN_EXP_TXT":
			// OlapGrid does not support TXT export
			break;
	}
};

/**************************************
 * 트리컨트롤의 노드를 클릭했을때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 aud.control.matrixTree.MTXTreeNode	Node (Readonly:False) : 선택된 노드
 **************************************/
const OnTreeNodeClick = function(_sender: any, args: any): void {
	if (args.Id == "Tree" && args.Node.Childs.length > 0) {
		if (args.Node.IsExpand) {
			args.Node.Collapsed(true);
		} else {
			args.Node.ExpandCollapsed();
		}
	}
};
