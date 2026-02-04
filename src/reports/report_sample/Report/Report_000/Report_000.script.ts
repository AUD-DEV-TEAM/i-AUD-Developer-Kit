import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";

declare const Matrix: Matrix;

const RichTextBox: RichTextBox = Matrix.getObject("RichTextBox") as RichTextBox;

let getParam: any[] | null = null;

/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 **************************************/
const OnDocumentLoadComplete = function(_sender: any, _args: any): void {
	getParam = Matrix.GetDialogRequestParams() ?
		Matrix.GetDialogRequestParams() as any[] : Matrix.GetGlobalParams().GetParams() as any[] ; 

	for (let i = 0; i < getParam.length; i++) {
		RichTextBox.Text += getParam[i].Name + " : " + getParam[i].Value + "\n";
	}
};

export {
	OnDocumentLoadComplete
};
