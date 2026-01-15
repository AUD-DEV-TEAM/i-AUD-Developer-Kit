import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { RichTextBox } from "@AUD_CLIENT/control/RichTextBox";
import { OlapGrid } from "@AUD_CLIENT/control/OlapGrid";

declare let Matrix: Matrix;

/*****************************
 *
 *****************************/
var btnClear: Button | null = null;
var btnExecute: Button | null = null;
var cboFields: any = null;
var label: any = null;
var label3: any = null;
var olapGrid: OlapGrid | null = null;
var tbxDebug: RichTextBox | null = null;
var tbxInput: any = null;

var initControlVariables = function () {
  btnClear = Matrix.getObject("btnClear") as Button;
  btnExecute = Matrix.getObject("btnExecute") as Button;
  cboFields = Matrix.getObject("cboFields");
  label = Matrix.getObject("Label");
  label3 = Matrix.getObject("Label3");
  olapGrid = Matrix.getObject("OlapGrid") as OlapGrid;
  tbxDebug = Matrix.getObject("tbxDebug") as RichTextBox;
  tbxInput = Matrix.getObject("tbxInput");
};
initControlVariables();

/*****************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 *****************************************/
var OnButtonClick = function (sender: any, args: any) {
  if (args.Id == "btnExecute") {
    //그룹 필드 추가
    var targetField = "창고코드";
    var newField = olapGrid!.addDimensionGroup(
      targetField,
      "그룹(" + targetField + ")"
    );
    var group = newField.DimensionGroupInfo; //디멘젼 그룹 정보

    var item = group.AddItem("1.ALL");
    item.ItemType = 2; /*All*/

    item = group.AddItem("2.SE");
    item.ItemType = 0; /*Normal*/
    item.Entries = [
      "SE01",
      "SE03",
      "SE04",
      "SE05",
      "SE06",
      "SE09",
      "SE10",
      "SE12",
      "SE20",
      "SE30",
      "SE40",
      "SE50",
      "SE90",
    ];

    item = group.AddItem("3.CS");
    item.ItemType = 0; /*Normal*/
    item.Entries = ["CS01", "CS10", "CS30", "CS40", "CS99"];

    item = group.AddItem("4.SC");
    item.ItemType = 0; /*Normal*/
    item.Entries = ["SC01", "SC02", "SC03", "SC04"];

    item = group.AddItem("5.Others");
    item.ItemType = 1; /*Others*/

    newField.Area = 1; /*Row*/
    olapGrid!.MoveField(newField.Name, 0, false);
    olapGrid!.getField("창고코드").Area = 1 /*Row*/;
    olapGrid!.MoveField("창고코드", 1, true);
    olapGrid!.Refresh();
  } else if (args.Id == "btnClear") {
    //Field Group 제거
    olapGrid!.ClearDimensionGroups();
    olapGrid!.Refresh();
  }
};
