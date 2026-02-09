import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { iGrid } from "@AUD_CLIENT/control/iGrid";

let Matrix: Matrix;

const MX_HIDE: iGrid = Matrix.getObject("MX_HIDE") as iGrid;

/**************************************
 * 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 boolean	IsChecked (Readonly:False) : 체크 상태
 *		 string	GroupName (Readonly:False) : 그룹이름
 *		 string	Text (Readonly:False) : 텍스트
 **************************************/
const OnCheckValueChange = function(_sender: any, args: any): void {
	if (args.Id == "VS_HIDE") {
		MX_HIDE.Calculate(true);
	}
};
