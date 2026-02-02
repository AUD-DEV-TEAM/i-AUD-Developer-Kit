import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Control } from "@AUD_CLIENT/control/Control";

declare let Matrix: Matrix;

const VS_DEPT: Label = Matrix.getObject("VS_DEPT") as Label;

/*****************************
 *
 *****************************/

/**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 number	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
 **************************************/
var OnDataBindEnd = function (sender, args) {
  if (args.Id == "GRD_CUST") {
    var lbl = Matrix.getObject("LBL_CUST_3") as Label;
    var val = Number(lbl.Value);
    var displayVal = Math.abs(val).toFixed(1);

    if (isNaN(val)) {
      lbl.Text = "";
      lbl.Update();
      return;
    }

    if (val > 0) {
      lbl.Text = "▲ " + displayVal + " 전년 대비";
      lbl.Style.Font.Color.SetColor("#10b981"); // 초록
    } else if (val < 0) {
      lbl.Text = "▼ " + displayVal + " 전년 대비";
      lbl.Style.Font.Color.SetColor("#ef4444"); // 빨강
    } else {
      lbl.Text = "– 전년 대비"; // 0일 때
      lbl.Style.Font.Color.SetColor("#64748b"); // 회색
    }
    lbl.Update();
  }
};

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
var OnButtonClick = function (sender, args) {
  switch (args.Id) {
    case "BTN_REF": // 검색
      Matrix.doRefresh("");
      break;
  }
};

/**************************************
 * 텍스트블럭이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
var OnTextBlockClick = function (sender, args) {
  var tabArr = ["LBL_TAB_ALL", "LBL_TAB_TEAM1", "LBL_TAB_TEAM2"];

  if (tabArr.indexOf(args.Id) !== -1) {
    tabArr.forEach(function (id) {
      var obj = Matrix.getObject(id);
      obj.Style.Background.Color.SetColor(
        id === args.Id ? "#ffffff" : "#f1f5f9",
      );
      obj.Update();
    });
  }

  switch (args.Id) {
    case "LBL_TAB_ALL":
      VS_DEPT.Text = "";
      break;
    case "LBL_TAB_TEAM1":
      VS_DEPT.Text = "DEPT011";
      break;

    case "LBL_TAB_TEAM2":
      VS_DEPT.Text = "DEPT012";
      break;
  }
};

/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 * * arguments :
 *		 number	Width (Readonly:False) : 뷰어의 넓이
 *		 number	Height (Readonly:False) : 뷰어의 높이
 **************************************/
var OnViewerSizeChanged = function (sender, args) {
  var GAP = 20;
  var START = 20;

  var setTotalWidth = (args.Width - 100) / 4;
  var setBodyWidth = (args.Width - 80) / 3;

  /*  TOTAL  */
  ["1", "2", "3", "4"].forEach(function (i, idx) {
    var grp = Matrix.getObject("GRP_TOTAL_" + i);
    var icon = Matrix.getObject("LBL_ICON_" + i);

    grp.Left = (setTotalWidth + GAP) * idx + START;
    grp.Width = setTotalWidth;

    icon.Left = (setTotalWidth - 50) / 2;
  });

  /*  BODY  */
  var body: { [key: string]: Control } = {};
  ["1", "2", "3", "4", "5", "6", "7"].forEach(function (i) {
    body[i] = Matrix.getObject("GRP_BODY_" + i);
  });

  body[1].Width = setTotalWidth * 2 + GAP;
  body[2].Left = setTotalWidth * 2 + GAP * 3;

  ["5", "6", "7"].forEach(function (i, idx) {
    body[i].Width = setBodyWidth;
    body[i].Left = (setBodyWidth + GAP) * idx + START;
  });

  body[3].Width = setBodyWidth * 2 + GAP;
  body[4].Left = setBodyWidth * 2 + GAP * 3;
};
