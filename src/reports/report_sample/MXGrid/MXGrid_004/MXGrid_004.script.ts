import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { iGrid } from "@AUD_CLIENT/control/iGrid";

declare const Matrix: Matrix;

const MX_CHANGE: iGrid = Matrix.getObject("MX_CHANGE") as iGrid;

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
const OnButtonClick = function(_sender: any, args: any): void {
	switch (args.Id) {
		case "BTN_V1":
			MX_CHANGE.ChangeSheet("V1");
			break;

		case "BTN_V2":
			MX_CHANGE.ChangeSheet("V2");
			break;

		case "BTN_V3":
			MX_CHANGE.ChangeSheet("V3");
			break;

		case "BTN_V4":
			MX_CHANGE.ChangeSheet("V4");
			break;
	}
};

export {
	OnButtonClick
};
