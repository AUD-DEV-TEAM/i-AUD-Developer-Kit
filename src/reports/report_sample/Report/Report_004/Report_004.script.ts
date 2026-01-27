import { Matrix } from "@AUD_CLIENT/control/Matrix";

declare const Matrix: Matrix;
declare const parent: any;
declare const top: any;

const ctrls = ["TextBox", "NumberBox", "Calendar", "CalendarYMFromTo"];

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
const OnButtonClick = function(_sender: any, args: any): void {
	if (args.Id == "BTN_SHOW") {
		top.fnCustomReportOpen(
			"REP55AB49987E304E338C5E5E84B0BC8E63",
			false,
			false,
			getParameterList(ctrls)
		);
	}
};

/**
 * 컨트롤 목록을 파라미터용 key/value 배열로 반환
 */
const getParameterList = function(ctrlNames: string[]): any[] {
	const params: any[] = [];

	for (let i = 0; i < ctrlNames.length; i++) {
		const ctrl: any = Matrix.getObject(ctrlNames[i]);

		if (!ctrl || ctrl.Value === undefined) {
			continue;
		}

		let value: any;

		if (["TextBox", "RichTextBox"].includes(ctrl.Type)) {
			value = ctrl.Text;
		} else if (ctrl.Type && ctrl.Type.includes("From")) {
			value = [ctrl.Value, ctrl.Value2].join(';');
		} else {
			value = ctrl.Value;
		}

		let key: string;
		if (ctrl.Type == "NumberBox") {
			key = ctrl.Name.includes("VN_") ? ctrl.Name : "VN_" + ctrl.Name;
		} else {
			key = ctrl.Name.includes("VS_") ? ctrl.Name : "VS_" + ctrl.Name;
		}

		params.push({
			"KEY": key,
			"VALUE": parent.btoa(encodeURI(value))
		});
	}

	return params;
};

export {
	OnButtonClick
};
