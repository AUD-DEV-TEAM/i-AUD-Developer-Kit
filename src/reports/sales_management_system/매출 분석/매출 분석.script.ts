import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";
import { Chart } from "@AUD_CLIENT/control/Chart";

let Matrix : Matrix;

let popup: any = null;


/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
 	Matrix.SetVariable('VN_RANK_CST',1);
 	Matrix.SetVariable('VN_RANK_PRD',1);
 };


/**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 number	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
**************************************/
 var OnDataBindEnd  = function(sender, args){
 	if(['CHT_2','CHT_3','CHT_5'].includes(args.Id)){
		(Matrix.getObject(args.Id) as Chart).PlotOptions.DataLabelsDistance = 0;

	}else if(args.Id == 'GRD_TOTAL'){
		if(!args.RecordCount){
			['1','2','3','4'].forEach(function(i){
				(Matrix.getObject('LBL_TOTAL_VAL_' + i) as Label).Text = '';
			});
		}

		['1','2','3','4'].forEach(function(i){
			let lbl = Matrix.getObject('LBL_RATE_' + i) as Label;
			let val = Number(lbl.Value);
			let displayVal = Math.abs(val).toFixed(1);

			if (isNaN(val)) {
				lbl.Text = '';
				lbl.Update();
				return;
			}

			if(val > 0){
				lbl.Text = '▲ ' + displayVal + '% 전년 대비';
				lbl.Style.Font.Color.SetColor('#10b981'); // 초록

			}else if (val < 0) {
				lbl.Text = '▼ ' + displayVal + '% 전년 대비';
				lbl.Style.Font.Color.SetColor('#ef4444'); // 빨강

			}else {
				lbl.Text = '– 전년 대비';   // 0일 때
				lbl.Style.Font.Color.SetColor('#64748b'); // 회색
			}

			lbl.Update();
		});

	}
 };


/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 string	Text (Readonly:False) : 라벨 값
**************************************/
 var OnButtonClick  = function(sender, args){
 	switch(args.Id){
		case 'BTN_REF': // 조회
			Matrix.doRefresh();
			break;

		case 'BTN_EXP_PDF': // PDF 내보내기

			break;

		case 'BTN_EXP_EXCEL': // Excel 내보내기

			break;

		case 'BTN_DETAIL_CST':
			Matrix.SetVariable('VN_RANK_CST',10);
			Matrix.doRefresh('GRD_3_DTL');

			popup = Matrix.ShowWindow("고객별 매출 상세",0,0,590,573,true,false,"고객별 매출 TOP 10",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;

		case 'BTN_DETAIL_PRD':
			Matrix.SetVariable('VN_RANK_PRD',10);
			Matrix.doRefresh('GRD_4_DTL');

			popup = Matrix.ShowWindow("제품별 매출 상세",0,0,680,573,true,false,"제품별 매출 TOP 10",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;

	}

 };


/**************************************
 * 텍스트블럭이 클릭되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 string	Text (Readonly:False) : 라벨 값
**************************************/
 var OnTextBlockClick  = function(sender, args){
 	let tabArr = ['LBL_TAB_AMT','LBL_TAB_QTY','LBL_TAB_CNT'];

 	if(tabArr.includes(args.Id)){
		tabArr.forEach(function(id){
			let grd = Matrix.getObject('GRD_1_'+id.substr(-3)) as DataGrid;
			let cht = Matrix.getObject('CHT_1_'+id.substr(-3)) as Chart;
			let tab = Matrix.getObject(id) as Label;

			grd.Visible = id === args.Id ? true : false;
			cht.Visible = id === args.Id ? true : false;
			tab.Style.Background.Color.SetColor(id === args.Id ? '#ffffff' : '#f1f5f9');
			tab.Update();
		});
	}
 };


/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 * * arguments :
 *		 number	Width (Readonly:False) : 뷰어의 넓이
 *		 number	Height (Readonly:False) : 뷰어의 높이
**************************************/
 var OnViewerSizeChanged  = function(sender, args){
	let gap = 20;
	let start = 20;

	let setTotalWidth = (args.Width - 100) / 4;
	let setBodyWidth  = (args.Width - 80)  / 3;

	/*  TOTAL  */
	['1','2','3','4'].forEach(function(i, idx){
		let grp  = Matrix.getObject('GRP_TOTAL_' + i) as Group;
		let icon = Matrix.getObject('LBL_ICON_' + i) as Label;

		grp.Left  = (setTotalWidth + gap) * idx + start;
		grp.Width = setTotalWidth;

		icon.Left = (setTotalWidth - 50) / 2;
	});

	/*  BODY  */
	let body = {};
	['1','2','3','4','5','6','7'].forEach(function(i){
		body[i] = Matrix.getObject('GRP_BODY_' + i) as Group;
	});

	body[1].Width = setBodyWidth * 2 + gap;
	body[2].Left  = setBodyWidth * 2 + gap * 3;

	['5','6','7'].forEach(function(i, idx){
		body[i].Width = setBodyWidth;
		body[i].Left  = (setBodyWidth + gap) * idx + start;
	});

	body[3].Width = setTotalWidth * 2 + gap;
	body[4].Left  = setTotalWidth * 2 + gap * 3;
 };
