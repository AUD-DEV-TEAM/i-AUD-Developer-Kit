import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;
/*****************************
 * OlapGrid의 Context Menu  API 샘플
 *****************************/

const tbxDebug: RichTextBox = Matrix.getObject("tbxDebug") as RichTextBox;
const olapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;

/*****************************************
* 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
* * arguments :
*		 string	Id (Readonly:False) : 컨트롤이름
*		 bool	IsChecked (Readonly:False) : 체크 상태
*****************************************/
const OnCheckValueChange = function (sender: any, args: any): void {
	switch (args.Id) {
		case "DisplayRowSubTotal":
		case "DisplayRowGrandTotal":
		case "DisplayColumnSubTotal":
		case "DisplayColumnGrandTotal": {
			const option = olapGrid.Options;
			option[args.Id] = args.IsChecked;
			tbxDebug.Text = "//Script 사용 예제 "
				+ "\n// " + (Matrix.getObject(args.Id) as CheckBox).Text
				+ "\n var option = OlapGrid.Options;"
				+ "\n  option." + args.Id + " = " + args.IsChecked + ";";

			olapGrid.Refresh();
			break;
		}
		default: {
			const menuOption = olapGrid.getMenuOption();
			menuOption[args.Id] = args.IsChecked;
			tbxDebug.Text = "//Script 사용 예제 "
				+ "\n// " + (Matrix.getObject(args.Id) as CheckBox).Text
				+ "\n var option = OlapGrid.getMenuOption();"
				+ "\n  option." + args.Id + " = " + args.IsChecked + ";";
			break;
		}
	}
};
