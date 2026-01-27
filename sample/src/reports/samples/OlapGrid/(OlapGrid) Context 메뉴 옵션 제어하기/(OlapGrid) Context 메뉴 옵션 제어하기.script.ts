import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { CheckBox } from "@AUD_CLIENT/control/CheckBox";

declare const Matrix: Matrix;

/*****************************
 * 컨트롤 변수 선언
 *****************************/
const olapGrid: OlapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
const tbxDebug: RichTextBox = Matrix.getObject("tbxDebug") as RichTextBox;

/*****************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 *****************************************/
const OnDocumentLoadComplete = function (_sender: object, _args: object): void {
  // 초기화 로직이 필요한 경우 여기에 작성
};

/*****************************************
 * 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 bool	IsChecked (Readonly:False) : 체크 상태
 *****************************************/
const OnCheckValueChange = function (_sender: object, args: { Id: string; IsChecked: boolean }): void {
  switch (args.Id) {
    case "DisplayRowSubTotal":
    case "DisplayRowGrandTotal":
    case "DisplayColumnSubTotal":
    case "DisplayColumnGrandTotal": {
      const option = (olapGrid as any).getGlobalOption();
      option[args.Id] = args.IsChecked;
      const checkBox = Matrix.getObject(args.Id) as CheckBox;
      tbxDebug.Text =
        "//Script 사용 예제 " +
        "\n// " + checkBox.Text +
        "\n var option = OlapGrid.getMenuOption();" +
        "\n  option." + args.Id + " = " + args.IsChecked + ";";

      olapGrid.Refresh();
      break;
    }

    default: {
      const option = olapGrid.getMenuOption();
      option[args.Id] = args.IsChecked;
      const checkBox = Matrix.getObject(args.Id) as CheckBox;
      tbxDebug.Text =
        "//Script 사용 예제 " +
        "\n// " + checkBox.Text +
        "\n var option = OlapGrid.getMenuOption();" +
        "\n  option." + args.Id + " = " + args.IsChecked + ";";
      break;
    }
  }
};

// Export event handlers for i-AUD runtime
export { OnDocumentLoadComplete, OnCheckValueChange };
