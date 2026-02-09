import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { AddIn } from "@AUD_CLIENT/control/AddIn";
import { SmartEditor } from "@AUD_CLIENT/ext/SmartEditor";

let Matrix: Matrix;
/**
 * SmartEditor Addin 컴포넌트 샘플
 */

const sampleHtml = '<p class="lyrics"><span style="font-size: 12pt;">Sample Text Line 1</span></p><p class="lyrics"><b>Sample Text Line 2</b></p>';
const TXT_HTML: RichTextBox = Matrix.getObject("TXT_HTML") as RichTextBox;
let webEditor: SmartEditor = null;
let articleViewer: any = null;

TXT_HTML.Text = "";

/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 **************************************/
const OnLoadComplete = function(_sender: any, _args: any): void {
	const getValue = Matrix.getObject("ADD_EDITOR") as AddIn;
	webEditor = getValue.getScriptClass("SmartEditor") as SmartEditor;
	webEditor.SetValue(sampleHtml);

	const setValue = Matrix.getObject("ADD_VIEWER") as AddIn;
	articleViewer = setValue.getScriptClass("SmartEditor") as SmartEditor;
	articleViewer.SetViewerMode();
	articleViewer.SetValue('');
};

/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
const OnButtonClick = function(_sender: any, args: any): void {
	if (args.Id == "BTN_GET_VAL") {
		TXT_HTML.Text = webEditor.GetValue();
	} else if (args.Id == "BTN_SET_VAL") {
		articleViewer.SetValue(TXT_HTML.Text);
	}
};
