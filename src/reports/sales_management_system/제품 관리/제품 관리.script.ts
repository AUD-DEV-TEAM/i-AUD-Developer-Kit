import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { NumberBox } from "@AUD_CLIENT/control/NumberBox";
import { Label } from "@AUD_CLIENT/control/Label";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { Button } from "@AUD_CLIENT/control/Button";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix : Matrix;

/*****************************
 * Typed control declarations
 *****************************/
const VS_KEYWORD : TextBox =   Matrix.getObject("VS_KEYWORD") as TextBox;
const VS_CAT : MultiComboBox =   Matrix.getObject("VS_CAT") as MultiComboBox;
const GRD_PRODUCT : DataGrid =   Matrix.getObject("GRD_PRODUCT") as DataGrid;
const VS_INP_PROD : TextBox =   Matrix.getObject("VS_INP_PROD") as TextBox;
const VS_INP_CAT : ComboBox =   Matrix.getObject("VS_INP_CAT") as ComboBox;
const BTN_SAV : Button =   Matrix.getObject("BTN_SAV") as Button;
const VS_INP_PRICE : NumberBox =   Matrix.getObject("VS_INP_PRICE") as NumberBox;
const VS_INP_COST : NumberBox =   Matrix.getObject("VS_INP_COST") as NumberBox;
const VS_INP_UNIT : ComboBox =   Matrix.getObject("VS_INP_UNIT") as ComboBox;

let popup: any = null;


/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
	VS_KEYWORD.UsePlaceholder = true;
	VS_KEYWORD.SetPlaceholder(' 제품명, 제품코드으로 검색');

	GRD_PRODUCT.GetField('PROD_ID').KeyType = 3; // KeyType: Primary
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
 	if(args.Id == 'VS_CAT'){
		VS_CAT.CheckAll();
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
		case 'BTN_ADD':	// 제품 등록 (Form: 제품 관리)
			setInputValue(null); // Input 컨트롤 초기화
			Matrix.SetGlobalParams('PROD_ID',false);
			BTN_SAV.Text = '추가';

			popup = Matrix.ShowWindow("제품 등록",0,0,460,415,true,false,"제품 등록",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;

		case 'BTN_REF': // 검색 (Form: 제품 관리)
			Matrix.doRefresh('GRD_PRODUCT');
			break;

		case 'BTN_RESET': // 초기화 (Form: 제품 관리)
			(Matrix.getObject('VS_CAT') as ComboBox).CheckAll();
			VS_KEYWORD.Text = '';
			break;

		case 'BTN_DEL': // 삭제 (Form: 제품 관리)
			let checkCount = 0;
			for(let i=0; i<GRD_PRODUCT.GetRowCount(); i++){
				if(GRD_PRODUCT.getRowValue(i,'CHK') == 'Y'){
					GRD_PRODUCT.ChangeRowStateAt(i,'D');
					checkCount++;
				}
			}

			if(!checkCount){
				Matrix.Information('삭제할 항목을 선택하세요','안내');
				return;
			}

			Matrix.Confirm('선택한 항목을 삭제하시겠습니까?','안내' ,function(ok){
               	if(ok){
					Matrix.RunScript('GRD_PRODUCT','GRD_DELETE' ,function(p){
						if(p.Success == false){
						Matrix.Alert(p.Message);
						return;
					}
						Matrix.doRefresh('GRD_PRODUCT');
						Matrix.Information('삭제 완료되었습니다.','안내');
					});
             	}else GRD_PRODUCT.ClearRowState(false);
            } ,0);

			break;

		case 'BTN_CNC': // 취소 (Form: 제품 등록)
			popup.Close();
			break;

		case 'BTN_SAV': // 저장 (Form: 제품 등록)
			let fields = [VS_INP_PROD.Text,VS_INP_CAT.Value,VS_INP_PRICE.Value,VS_INP_COST.Value,VS_INP_UNIT.Value];
			if(isInvalidInput(fields)){
				Matrix.Information('필수 입력 항목을 확인해주세요','안내');
				return;
			}

			let scriptName = Matrix.GetGlobalParamValue('VS_PROD_ID') ? 'GRD_UPDATE' : 'GRD_INSERT';
			Matrix.RunScript('',scriptName ,function(p){
            	if(p.Success == false){
           		Matrix.Alert(p.Message);
           		return;
           	}
				Matrix.doRefresh('GRD_PRODUCT');
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
 	if(args.Id == 'GRD_PRODUCT'){
		(Matrix.getObject('LBL_TTL_2') as Label).Text = '   제품 목록 (' + args.RecordCount + '종)';
	}
 };


/**************************************
 * 텍스트 박스 컨트롤의 key 입력 시 발생합니다.
 * * arguments :
 *		 string	Id (Readonly:False) : 컨트롤 이름
 *		 string	Text (Readonly:False) : 현재 텍스트
 *		 aud.data.Event	Event (Readonly:False) : 텍스트박스 key event 객체
**************************************/
 var OnTextKeydown  = function(sender, args){
 	if(args.Id == 'VS_KEYWORD' && args.Event.isEnter()){
		Matrix.doRefresh('GRD_PRODUCT');
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
 	if(args.Id == 'GRD_PRODUCT'){
		let checkValue = args.Checked ? 'Y' : 'N';

		for (let i=0; i<GRD_PRODUCT.GetRowCount(); i++) {
			GRD_PRODUCT.setRowValue(i, 'CHK', checkValue);
		}
		GRD_PRODUCT.Update();
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
 	if(args.Id == 'GRD_PRODUCT'){
		setInputValue(args.Row);
		Matrix.SetGlobalParams('VS_PROD_ID',args.Row.GetValue('PROD_ID'));
		BTN_SAV.Text = '저장';

		popup = Matrix.ShowWindow("제품 등록",0,0,460,415,true,false,"제품 등록",true,'#ffffff',0,false,false);
		popup.MoveToCenter();
	}
 };


 const setInputValue = function(row){
 	if(typeof row === 'object' && row !== null){
		VS_INP_PROD.Text	  = row.GetValue('PROD_NAME');
		VS_INP_CAT.Value	  = row.GetValue('CATEGORY_CODE');
		VS_INP_PRICE.Text 	  = row.GetValue('STD_PRICE');
		VS_INP_COST.Text	  = row.GetValue('COST_PRICE');
		VS_INP_UNIT.Value	  = row.GetValue('STD_UNIT');

	}else{
		VS_INP_PROD.Text	  = '';
		VS_INP_CAT.Value	  = '';
		VS_INP_PRICE.Text 	  = '';
		VS_INP_COST.Text	  = '';
		VS_INP_UNIT.Value	  = '';
	}
 };


const isInvalidInput = function(fields) {
	return fields.some(function(v) {
		return v === null || v === undefined || v === '';
	});
};
