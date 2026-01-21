import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { iGrid } from "@AUD_CLIENT/control/iGrid";

declare const Matrix: Matrix;

const MX_PROPERTY: iGrid = Matrix.getObject("MX_PROPERTY") as iGrid;

/**************************************
 * MX-Grid Cell Double Click 이벤트
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 aud.control.igrids.Cell	Cell (Readonly:False) : 데이터 셀 정보
 **************************************/
const OniGridCellDoubleClick = function(_sender: any, args: any): void {
	if (args.Id == "MX_PROPERTY") {
		if (args.Cell.getProperty("IS_CLICK")) {
			alert("IS_CLICK : true");
		} else {
			alert("IS_CLICK : false");
		}
	}
};

export {
	OniGridCellDoubleClick
};
