import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { iGrid } from "@AUD_CLIENT/control/iGrid";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Image } from "@AUD_CLIENT/control/Image";
import { ColorPicker } from "@AUD_CLIENT/control/ColorPicker";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { RadioButton } from "@AUD_CLIENT/control/RadioButton";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { Chart } from "@AUD_CLIENT/control/Chart";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

let Matrix: Matrix;
/*****************************
 * OlapGrid의 Context Menu  API 샘플
 *****************************/

let tbxDebug: RichTextBox = Matrix.getObject("tbxDebug") as RichTextBox;
let OlapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;

/*****************************************
* 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
* * arguments :  
*		 string	Id (Readonly:False) : 컨트롤이름 
*		 bool	IsChecked (Readonly:False) : 체크 상태 
*****************************************/
const OnCheckValueChange = function (sender, args) {
	switch (args.Id) {
		case "DisplayRowSubTotal":
		case "DisplayRowGrandTotal":
		case "DisplayColumnSubTotal":
		case "DisplayColumnGrandTotal":
			let option = OlapGrid.Options;
			option[args.Id] = args.IsChecked;
			tbxDebug.Text = "//Script 사용 예제 "
				+ "\n// " + (Matrix.getObject(args.Id) as CheckBox).Text
				+ "\n var option = OlapGrid.Options;"
				+ "\n  option." + args.Id + " = " + args.IsChecked + ";";

			OlapGrid.Refresh();
			break;

		default:
			let menuOption = OlapGrid.getMenuOption();
			menuOption[args.Id] = args.IsChecked;
			tbxDebug.Text = "//Script 사용 예제 "
				+ "\n// " + (Matrix.getObject(args.Id) as CheckBox).Text
				+ "\n var option = OlapGrid.getMenuOption();"
				+ "\n  option." + args.Id + " = " + args.IsChecked + ";";
			break;

	}
};
