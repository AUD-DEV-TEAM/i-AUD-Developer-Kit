import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { iGrid } from "@AUD_CLIENT/control/iGrid";

declare const Matrix: Matrix;

const MX_EXPORT: iGrid = Matrix.getObject("MX_EXPORT") as iGrid;

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
const OnButtonClick = function(_sender: any, args: any): void {
	switch (args.Id) {
		case "BTN_EXP_XLSX":
			MX_EXPORT.ExportServiceCall(2, function(p: any): void {
				const newName = Matrix.GetReportInfo().NAME + "_" + Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss") + ".xlsx";
				Matrix.DownloadFile(p.FolderName, p.FileName, newName, true);
			});
			break;

		case "BTN_EXP_HTM":
			MX_EXPORT.ExportServiceCall(8, function(p: any): void {
				const newName = Matrix.GetReportInfo().NAME + "_" + Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss") + ".htm";
				Matrix.DownloadFile(p.FolderName, p.FileName, newName, true);
			});
			break;

		case "BTN_EXP_DOCX":
			MX_EXPORT.ExportServiceCall(5, function(p: any): void {
				const newName = Matrix.GetReportInfo().NAME + "_" + Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss") + ".docx";
				Matrix.DownloadFile(p.FolderName, p.FileName, newName, true);
			});
			break;

		case "BTN_EXP_HWP":
			MX_EXPORT.ExportServiceCall(3, function(p: any): void {
				const newName = Matrix.GetReportInfo().NAME + "_" + Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss") + ".hwp";
				Matrix.DownloadFile(p.FolderName, p.FileName, newName, true);
			});
			break;

		case "BTN_EXP_PDF":
			MX_EXPORT.ExportServiceCall(7, function(p: any): void {
				const newName = Matrix.GetReportInfo().NAME + "_" + Matrix.GetDateTime().ToString("yyyyMMdd_HHmmss") + ".pdf";
				Matrix.DownloadFile(p.FolderName, p.FileName, newName, true);
			});
			break;
	}
};

export {
	OnButtonClick
};
