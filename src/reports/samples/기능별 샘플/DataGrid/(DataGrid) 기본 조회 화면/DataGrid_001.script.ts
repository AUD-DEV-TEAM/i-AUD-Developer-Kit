import { Matrix } from "@AUD_CLIENT/control/Matrix";

declare let Matrix: Matrix;

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
var OnButtonClick = function (sender, args) {
  if (args.Id == "BTN_REF") {
    Matrix.doRefresh("GRD, CHT");
    Matrix.Alert("11");
  }
};
