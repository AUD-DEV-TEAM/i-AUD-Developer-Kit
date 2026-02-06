import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { WebContainer } from "@AUD_CLIENT/control/WebContainer";
let Matrix: Matrix;

const Browser: WebContainer = Matrix.getObject("Browser") as WebContainer;

const ctrls = ["TextBox", "NumberBox", "Calendar", "CalendarYMFromTo"];

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
const OnButtonClick = function(_sender: any, args: any): void {
	if (args.Id == "BTN_SHOW") {
		const baseUrl = 'https://rnd.bimatrix.co.kr/aud7/AUD/main.jsp?id=REP55AB49987E304E338C5E5E84B0BC8E63';

		const setparams = getParameterList(ctrls);
		const urlParam = buildUrlParams(setparams);

		Browser.URL = baseUrl + urlParam;
		Matrix.doRefresh("Browser");
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

/**
 * key/value 배열을 URL 파라미터 문자열로 반환
 */
const buildUrlParams = function(params: any[]): string {
	let query = "";

	for (let i = 0; i < params.length; i++) {
		query += "&" + params[i].KEY + "=" + params[i].VALUE;
	}

	return query;
};
 