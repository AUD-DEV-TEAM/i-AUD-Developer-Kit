import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";

let Matrix: Matrix;

const VS_ORD_STS: ComboBox = Matrix.getObject("VS_ORD_STS") as ComboBox;

/**************************************
 * 문서가 로드되고 AutoRefresh가 완료되는 시점에 발생합니다.
 * * arguments :
 *		 boolean	Success (Readonly:False) : 성공여부
 *		 string	Message (Readonly:False) : 에러 메시지
 **************************************/
const OnLoadComplete = function (sender, args) {
  VS_ORD_STS.InitValue = "delivered";
  Matrix.doRefresh("MX");
};

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
const OnButtonClick = function (sender, args) {
  if (args.Id == "BTN_REF") {
    // '조회' 버튼 클릭 시
    Matrix.doRefresh("MX"); // MXGrid 조회
  }
};
