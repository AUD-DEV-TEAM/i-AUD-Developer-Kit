import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { Group } from "@AUD_CLIENT/control/Group";

let Matrix : Matrix;


/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
 **************************************/
var OnDocumentLoadComplete = function(sender, args) {
	Matrix.SetVariable('VS_DEPT', null);
};


/**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 number	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
 **************************************/
var OnDataBindEnd = function(sender, args) {
	if (args.Id == "GRD_CUST") {
		let lbl = Matrix.getObject("LBL_CUST_3") as Label;
		let val = Number(lbl.Value);
		let displayVal = Math.abs(val).toFixed(1);
		if (isNaN(val)) {
			lbl.Text = "";
			lbl.Update();
			return;
		}
		if (val > 0) {
			lbl.Text = "▲ " + displayVal + " 전년 대비";
			lbl.Style.Font.Color.SetColor("#10b981"); // 초록
		}
		else if (val < 0) {
			lbl.Text = "▼ " + displayVal + " 전년 대비";
			lbl.Style.Font.Color.SetColor("#ef4444"); // 빨강
		}
		else {
			lbl.Text = "– 전년 대비"; // 0일 때
			lbl.Style.Font.Color.SetColor("#64748b"); // 회색
		}
		lbl.Update();

	} else if (args.Id == 'GRD_TOTAL') {
		if (!args.RecordCount) {
			['1', '2', '3', '4'].forEach(function(i) {
				(Matrix.getObject('LBL_TOTAL_VAL_' + i) as Label).Text = '';
			});
		}
	}
};


/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
 **************************************/
var OnButtonClick = function(sender, args) {
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
var OnTextBlockClick = function(sender, args) {
	let tabArr = ["LBL_TAB_ALL", "LBL_TAB_TEAM1", "LBL_TAB_TEAM2"];
	if (tabArr.indexOf(args.Id) !== -1) {
		tabArr.forEach(function(id) {
			let obj = Matrix.getObject(id) as Label;
			obj.Style.Background.Color.SetColor(id === args.Id ? "#ffffff" : "#f1f5f9");
			obj.Update();
		});
	}
	switch (args.Id) {
		case "LBL_TAB_ALL":
			Matrix.SetVariable('VS_DEPT', null);
			break;
		case "LBL_TAB_TEAM1":
			Matrix.SetVariable('VS_DEPT', 'DEPT011');
			break;
		case "LBL_TAB_TEAM2":
			Matrix.SetVariable('VS_DEPT', 'DEPT012');
			break;
	}
	Matrix.doRefresh('CHT_2');
};


/**************************************
 * 데이터 그리드의 셀이 Load될때 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 aud.control.grids.DataGridRow	Row (Readonly:False) : 데이터 레코드 정보
 *		 aud.control.grids.DataGridCell	Cell (Readonly:False) : 데이터셀 정보
 *		 aud.control.grids.DataGridColumn	Field (Readonly:False) : 필드 정보
 *		 string	BackColor (Readonly:False) : 셀의 배경색을 변경하실 경우 이값을 넣어 줍니다.(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
 *		 string	FontColor (Readonly:False) : 셀의 텍스트 색상을 변경하실 경우 이값을 넣어 줍니다.(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
 *		 boolean	FontBold (Readonly:False) : 셀의 텍스트를 Bold처리하여 표현할지 유무. true일 경우 Bold처리가 됩니다.
 *		 boolean	FontItalic (Readonly:False) : 셀의 텍스트를 Italic처리하여 표현할지 유무. true일 경우 Italic처리가 됩니다.
 *		 boolean	FontUnderline (Readonly:False) : 셀의 텍스트 아래 밑줄을 표현할지 유무. true일 경우 밑줄이 표시됩니다.
 *		 boolean	Cancel (Readonly:False) : 이 값을 true로 설정 하게되면 값을 그리지 않습니다.
 **************************************/
var OnCellLoaded = function(sender, args) {
	if (args.Id == 'GRD_4' && args.Field.Name == 'DIFF') {
		if (args.Cell.Value > 0) args.FontColor = "#10b981"; 		// 초록
		else if (args.Cell.Value < 0) args.FontColor = "#ef4444"; 	// 빨강
		else args.FontColor = "#1e293b"; 							// 검정
	}
};


/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 * * arguments :
 *		 number	Width (Readonly:False) : 뷰어의 넓이
 *		 number	Height (Readonly:False) : 뷰어의 높이
 **************************************/
var OnViewerSizeChanged = function(sender, args) {
	const GAP = 20;
	const START = 20;
	let setTotalWidth = (args.Width - 100) / 4;
	let setBodyWidth = (args.Width - 80) / 3;

	/*  TOTAL  */
	["1", "2", "3", "4"].forEach(function(i, idx) {
		let grp = Matrix.getObject("GRP_TOTAL_" + i) as Group;
		let icon = Matrix.getObject("LBL_ICON_" + i) as Label;
		grp.Left = (setTotalWidth + GAP) * idx + START;
		grp.Width = setTotalWidth;
		icon.Left = (setTotalWidth - 50) / 2;
	});

	/*  BODY  */
	let body: { [key: string]: Group } = {};
	["1", "2", "3", "4", "5", "6", "7"].forEach(function(i) {
		body[i] = Matrix.getObject("GRP_BODY_" + i) as Group;
	});
	body["1"].Width = setTotalWidth * 2 + GAP;
	body["2"].Left = setTotalWidth * 2 + GAP * 3;
	["5", "6", "7"].forEach(function(i, idx) {
		body[i].Width = setBodyWidth;
		body[i].Left = (setBodyWidth + GAP) * idx + START;
	});
	body["3"].Width = setBodyWidth * 2 + GAP;
	body["4"].Left = setBodyWidth * 2 + GAP * 3;
};
