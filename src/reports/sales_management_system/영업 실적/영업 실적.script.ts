import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Group } from "@AUD_CLIENT/control/Group";

let Matrix : Matrix;

/*****************************
 * Typed control declarations
 *****************************/
const GRD_PERF : DataGrid =   Matrix.getObject("GRD_PERF") as DataGrid;
const GRP_TOTAL_1 : Group =   Matrix.getObject("GRP_TOTAL_1") as Group;
const GRP_TOTAL_4 : Group =   Matrix.getObject("GRP_TOTAL_4") as Group;
const GRP_TOTAL_2 : Group =   Matrix.getObject("GRP_TOTAL_2") as Group;
const GRP_TOTAL_3 : Group =   Matrix.getObject("GRP_TOTAL_3") as Group;
const VS_INP_PIC : ComboBox =   Matrix.getObject("VS_INP_PIC") as ComboBox;
const BTN_SAV : Button =   Matrix.getObject("BTN_SAV") as Button;
const VS_INP_CUST : ComboBox =   Matrix.getObject("VS_INP_CUST") as ComboBox;
const VS_INP_ID : TextBox =   Matrix.getObject("VS_INP_ID") as TextBox;
const VS_INP_STATUS : ComboBox =   Matrix.getObject("VS_INP_STATUS") as ComboBox;
const VS_INP_YMD : Calendar =   Matrix.getObject("VS_INP_YMD") as Calendar;
const VS_INP_PROD : ComboBox =   Matrix.getObject("VS_INP_PROD") as ComboBox;
const VN_INP_PRICE : NumberBox =   Matrix.getObject("VN_INP_PRICE") as NumberBox;
const VN_INP_COST : NumberBox =   Matrix.getObject("VN_INP_COST") as NumberBox;
const VN_INP_QTY : NumberBox =   Matrix.getObject("VN_INP_QTY") as NumberBox;

let popup: any = null;

/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
	VS_INP_ID.IsReadOnly= true;
	GRD_PERF.GetField('SALES_ID').KeyType = 3; // KeyType: Primary
 };


/**************************************
 * Execute 실행되는 시점에 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 boolean	Cancel (Readonly:False) : 이 값을 true로 설정 시 실행이 취소됩니다.
 *		 number	FilterType (Readonly:False) : 0:일반 조회, 1:검색 텍스트박스 조회, 2:전체검색 버튼 조회
 *		 string	FilterText (Readonly:False) : 검색 텍스트박스에 입력된 검색어
**************************************/
 var OnMultiComboBoxExecuteStart  = function(sender, args){
 	if(['VS_PIC', 'VS_CUST', 'VS_STATUS'].includes(args.Id)){
		Matrix.getObject(args.Id).CheckAll();
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
		case 'BTN_ADD':	// 실적 등록 (Form: 영업 실적)
			setInputValue(null); // Input 컨트롤 초기화
			Matrix.SetGlobalParams('SALES_ID',false);
			BTN_SAV.Text = '추가';

			popup = Matrix.ShowWindow("실적 등록",0,0,460,500,true,false,"실적 등록",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;

		case 'BTN_REF': // 검색 (Form: 영업 실적)
			Matrix.doRefresh('GRD_PERF');
			break;

		case 'BTN_RESET': // 초기화 (Form: 영업 실적)
			['VS_PIC', 'VS_CUST', 'VS_STATUS'].forEach(function(i){
				Matrix.getObject(i).CheckAll();
			});
			break;

		case 'BTN_DEL': // 삭제 (Form: 영업 관리)
			let checkCount = 0;
			for(let i=0; i<GRD_PERF.GetRowCount(); i++){
				if(GRD_PERF.getRowValue(i,'CHK') == 'Y'){
					GRD_PERF.ChangeRowStateAt(i,'D');
					checkCount++;
				}
			}

			if(!checkCount){
				Matrix.Information('삭제할 항목을 선택하세요','안내');
				return;
			}

			Matrix.Confirm('선택한 항목을 삭제하시겠습니까?','안내' ,function(ok){
               	if(ok){
					Matrix.RunScript('GRD_PERF','GRD_DELETE' ,function(p){
						if(p.Success == false){
						Matrix.Alert(p.Message);
						return;
					}
						Matrix.doRefresh('GRD_PERF');
						Matrix.Information('삭제 완료되었습니다.','안내');
					});
             	}else GRD_PERF.ClearRowState(false);
            } ,0);

			break;

		case 'BTN_CNC': // 취소 (Form: 영업 실적)
			popup.Close();
			break;

		case 'BTN_SAV': // 저장 (Form: 영업 등록)
			let fields = [VS_INP_ID.Text,VS_INP_YMD.Value,VS_INP_PIC.Value,VS_INP_CUST.Value,VS_INP_PROD.Value
						 ,VN_INP_QTY.Value,VN_INP_PRICE.Value,VN_INP_COST.Value,VS_INP_STATUS.Value];
			if(isInvalidInput(fields)){
				Matrix.Information('필수 입력 항목을 확인해주세요','안내');
				return;
			}

			let scriptName = Matrix.GetGlobalParamValue('VS_SALES_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
			Matrix.RunScript('',scriptName ,function(p){
            	if(p.Success == false){
           		Matrix.Alert(p.Message);
           		return;
           	}
				Matrix.doRefresh('GRD_PERF');
				Matrix.Information(BTN_SAV.Text+' 완료되었습니다.','안내');
				popup.Close();
            });
			break;
	}
 };

 /**************************************
 * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤이름
 *		 number	RecordCount (Readonly:False) : 데이터셋의 레코드 수량
**************************************/
 var OnDataBindEnd  = function(sender, args){
 	if(args.Id == 'GRD_PERF'){
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   영업 실적 목록 (' + args.RecordCount + '건)';

	}else if(args.Id == 'GRD_TOTAL'){
		if(!args.RecordCount){
			['1','2','3','4'].forEach(function(i){
				(Matrix.getObject('LBL_TOTAL_VAL_' + i) as Label).Text = '';
			});
		}

		let val = (Matrix.getObject(args.Id) as DataGrid).getRowValue(0,'TOTAL_COMP_PERF_VAL');

		let setColor: string;
		if(val<0) setColor = '#ef4444'; // 빨강
		else if(val>0) setColor = '#10b981'; // 초록
		else setColor = '#1e293b'; // 검정

		(Matrix.getObject('LBL_TOTAL_VAL_2') as Label).Style.Font.Color.SetColor(setColor);
		(Matrix.getObject('LBL_TOTAL_VAL_2') as Label).Update();
	}
 };


/**************************************
 * 그리드의 멀티 헤더 체크 박스를 클릭하는 순간 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 aud.control.grids.MultiHeaderCell	HeaderCell (Readonly:False) : 멀티헤더셀 객체
 *		 boolean	Checked (Readonly:False) : 체크 유무
 *		 boolean	Cancel (Readonly:False) : 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
**************************************/
 var OnGridMultiHeaderCheckBoxClicked  = function(sender, args){
 	if(args.Id == 'GRD_PERF'){
		let checkValue = args.Checked ? "Y" : "N";

		for (let i=0; i<GRD_PERF.GetRowCount(); i++) {
			GRD_PERF.setRowValue(i, "CHK", checkValue);
		}
		GRD_PERF.Update();
	}
 };


  /**************************************
 * 그리드의 셀을 더블 클릭할 떄 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 aud.control.grids.DataGridRow	Row (Readonly:False) : 데이터 레코드 정보
 *		 aud.control.grids.DataGridCell	Cell (Readonly:False) : 데이터셀 정보
 *		 aud.control.grids.DataGridColumn	Field (Readonly:False) : 필드 정보
**************************************/
 var OnCellDoubleClick  = function(sender, args){
 	if(args.Id == 'GRD_PERF'){
		setInputValue(args.Row);
		Matrix.SetGlobalParams('VS_SALES_ID',args.Row.GetValue('SALES_ID'));
		BTN_SAV.Text = '저장';

		popup = Matrix.ShowWindow("실적 등록",0,0,460,500,true,false,"실적 등록",true,'#ffffff',0,false,false);
		popup.MoveToCenter();
	}
 };


/**************************************
 * 뷰어의 사이즈가 변경될 때 발생합니다.
 * * arguments :
 *		 number	Width (Readonly:False) : 뷰어의 넓이
 *		 number	Height (Readonly:False) : 뷰어의 높이
**************************************/
 var OnViewerSizeChanged  = function(sender, args){
	let setWidth = (args.Width-100) / 4;

	GRP_TOTAL_1.Width = setWidth;
	GRP_TOTAL_2.Width = setWidth;
	GRP_TOTAL_3.Width = setWidth;
	GRP_TOTAL_4.Width = setWidth;

	GRP_TOTAL_2.Left = setWidth+40;
	GRP_TOTAL_3.Left = setWidth*2+60;
	GRP_TOTAL_4.Left = setWidth*3+80;
 };


 const setInputValue = function(row){
 	if(typeof row === 'object' && row !== null){
		VS_INP_ID.Text	  	= row.GetValue('SALES_ID');
		VS_INP_YMD.Value	= row.GetValue('SALES_DATE');
		VS_INP_PIC.Value 	= row.GetValue('EMP_ID');
		VS_INP_CUST.Value	= row.GetValue('CUST_ID');
		VS_INP_PROD.Value	= row.GetValue('PROD_ID');
		VN_INP_QTY.Value	= row.GetValue('QTY');
		VN_INP_PRICE.Value	= row.GetValue('UNIT_PRICE');
		VN_INP_COST.Value	= row.GetValue('COST_AMOUNT');
		VS_INP_STATUS.Value	= row.GetValue('STATUS_CODE');

	}else{
		Matrix.Execute('SET_SALES_ID' ,function(p){
			if(p.Success == false){
				Matrix.Alert(p.Message);
				return;
			}
			let dt = p.DataTable;
			VS_INP_ID.Text = dt.getRowValue(0,'SALES_ID');
       	});
		VS_INP_ID.Text	  	= '';
		VS_INP_YMD.Value	= '';
		VS_INP_PIC.Value 	= '';
		VS_INP_CUST.Value	= '';
		VS_INP_PROD.Value	= '';
		VN_INP_QTY.Value	= 0;
		VN_INP_PRICE.Value	= 0;
		VN_INP_COST.Value	= 0;
		VS_INP_STATUS.Value	= '';
	}
 };


const isInvalidInput = function(fields) {
	return fields.some(function(v) {
		return v === null || v === undefined || v === '';
	});
};
