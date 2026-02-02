/* init controls */
var GRD_MASTER 		  = Matrix.getObject('GRD_MASTER');
var GRD_DETAIL 		  = Matrix.getObject('GRD_DETAIL');
var LBL_TTL_3 		  = Matrix.getObject('LBL_TTL_3');
var LBL_INIT 		  = Matrix.getObject('LBL_INIT');
var BTN_CD_SAV		  = Matrix.getObject('BTN_CD_SAV');		  // 저장 버튼 (Form: 코드 추가)
var popup 			  = null; // '그룹 추가', '코드 추가' Form을 오픈할 팝업

/* '그룹 추가' Form의 입력 컨트롤 */
var VS_INP_GROUP_CODE = Matrix.getObject('VS_INP_GROUP_CODE'); // 그룹코드
var VS_INP_GROUP_NAME = Matrix.getObject('VS_INP_GROUP_NAME'); // 그룹명
var VS_INP_CODE_DESC  = Matrix.getObject('VS_INP_CODE_DESC');  // 설명

/* '코드 추가' Form의 입력 컨트롤 */
var VS_GROUP_CODE	  = Matrix.getObject('VS_GROUP_CODE');	  // 사업자번호
var VS_INP_CODE		  = Matrix.getObject('VS_INP_CODE');	  // 연락처
var VS_CODE_NAME	  = Matrix.getObject('VS_CODE_NAME');	  // 이메일
var VN_SORT 		  = Matrix.getObject('VN_SORT');		  // 이메일
var VS_USE_YN 		  = Matrix.getObject('VS_USE_YN');		  // 사업장주소

/**************************************
 * 문서 로드 된 후 AutoRefresh 수행 전에 발생합니다.
 * * arguments :  
**************************************/
 var OnDocumentLoadComplete  = function(sender, args){
 	/* Primary 세팅 */
	GRD_MASTER.GetField('GROUP_CD').KeyType = 3;
	GRD_DETAIL.GetField('CODE').KeyType = 3;
 
 	/* 초기 세팅 */
 	Matrix.getObject('LBL_DTL_CNT').Text = '0';
	Matrix.SetGlobalParams('VS_GROUP_CD',null);
	LBL_TTL_3.Text = '  상세 코드 – 그룹을 선택하세요';
	LBL_INIT.Visible = true;
	VS_GROUP_CODE.IsReadOnly = true;
 	
	/* Placeholder 설정 */
	VS_INP_GROUP_CODE.UsePlaceholder = true;
	VS_INP_GROUP_NAME.UsePlaceholder = true;
	VS_INP_CODE_DESC.UsePlaceholder = true;
	VS_INP_CODE.UsePlaceholder = true;
	VS_CODE_NAME.UsePlaceholder = true;
	
	VS_INP_GROUP_CODE.SetPlaceholder(' 예: NEW_CODE_TYPE');
	VS_INP_GROUP_NAME.SetPlaceholder(' 예: 새로운 코드 유형');
	VS_INP_CODE_DESC.SetPlaceholder(' 그룹에 대한 설명');
	VS_INP_CODE.SetPlaceholder(' 예: NEW_VALUE');
	VS_CODE_NAME.SetPlaceholder(' 예: 새로운 값');
 };
 

/**************************************
 * 버튼 컨트롤이 클릭되는 시점에 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤이름 
 *		 string	Text (Readonly:False) : 라벨 값 
**************************************/
 var OnButtonClick  = function(sender, args){
 	switch(args.Id){
		case 'BTN_MST_ADD': // 그룹 추가
			setInputValue('GRD_MASTER'); // Input 컨트롤 초기화
			
			popup = Matrix.ShowWindow("그룹 추가",0,0,460,415,true,false,"그룹 추가",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
			break;
			
		case 'BTN_DTL_ADD': // 코드 추가
			if(!Matrix.GetGlobalParamValue('VS_GROUP_CD')){
				Matrix.Information('먼저 코드 그룹을 선택해주세요','안내');
				return;
			}
			
			setInputValue(null);
			BTN_CD_SAV.Text = '추가';
			VS_INP_CODE.IsReadOnly = false;
			VS_INP_CODE.Style.Background.Color.SetRGBA('255' ,'255' ,'255' ,'1');
			break;
			
		case 'BTN_MST_DEL': // 삭제 (코드 그룹)			
			if(!GRD_MASTER.GetCurrentRow()){
				Matrix.Information('삭제할 코드 그룹 선택 후 다시 시도하세요','안내');
				return;				
			}else GRD_MASTER.GetCurrentRow().Data.RowState = 'D';
			
			if(GRD_MASTER.GetCurrentRow().GetValue('CODE') > 0){
				Matrix.Information('모든 상세 코드를 삭제한 후 다시 시도하세요','안내');
				return;
			}
			
			Matrix.Confirm('[ '+Matrix.GetGlobalParamValue('VS_GROUP_CD')+' ] 그룹코드를 삭제하시겠습니까?','안내' ,function(ok){
               	if(ok){
					Matrix.RunScript('GRD_MASTER','GRD_MASTER_DELETE' ,function(p){
						if(p.Success == false){
						Matrix.Alert(p.Message);
						return;
					}
						Matrix.doRefresh('GRD_MASTER');
						Matrix.Information('삭제 완료되었습니다.','안내');
						Matrix.SetGlobalParams('VS_GROUP_CD',null);
					});
             	}else GRD_MASTER.ClearRowState(false);
            } ,0);
			
			break;
			
		case 'BTN_DTL_DEL': // 삭제 (상세 코드)
			var checkCount = 0;
			for(var i=0; i<GRD_DETAIL.GetRowCount(); i++){
				if(GRD_DETAIL.getRowValue(i,'CHK') == 'Y'){
					GRD_DETAIL.ChangeRowStateAt(i,'D');
					checkCount++;
				}
			}
			
			if(!checkCount){
				Matrix.Information('삭제할 항목을 선택하세요','안내');
				return;
			}
			
			Matrix.Confirm('선택한 항목을 삭제하시겠습니까?','안내' ,function(ok){
               	if(ok){
					Matrix.RunScript('GRD_DETAIL','GRD_DETAIL_DELETE' ,function(p){
						if(p.Success == false){
						Matrix.Alert(p.Message);
						return;
					}
						Matrix.doRefresh('GRD_MASTER,GRD_DETAIL');
						Matrix.Information('삭제 완료되었습니다.','안내');
					});
             	}else GRD_DETAIL.ClearRowState(false);
            } ,0);
			break;
		
		case 'BTN_GRP_CNC': // 취소 (Form: '그룹 추가')
			popup.Close();
			break;
		
		case 'BTN_GRP_SAV': // 추가 (Form: '그룹 추가')
			var fields = [VS_INP_GROUP_CODE.Text,VS_INP_GROUP_NAME.Text];
			if(isInvalidInput(fields)){
				Matrix.Information('필수 입력 항목을 확인해주세요','안내');
				return;
			}
			
			Matrix.RunScript('','GRD_MASTER_INSERT' ,function(p){
            	if(p.Success == false){
           		Matrix.Alert(p.Message);
           		return;
           	}
				Matrix.doRefresh('GRD_MASTER');
				Matrix.Information('추가 완료되었습니다.','안내');
				popup.Close();
            });
			break;
		
		case 'BTN_CD_CNC': // 취소 (Form: '코드 추가')
			popup.Close();
			break;
		
		case 'BTN_CD_SAV': // 추가 (Form: '코드 추가')
			var fields = [VS_INP_CODE.Text,VS_CODE_NAME.Text];
			if(isInvalidInput(fields)){
				Matrix.Information('필수 입력 항목을 확인해주세요','안내');
				return;
			}
			
			var scriptName = BTN_CD_SAV.Text=='저장' ? 'GRD_DETAIL_UPDATE' : 'GRD_DETAIL_INSERT';
			Matrix.RunScript('',scriptName ,function(p){
            	if(p.Success == false){
           		Matrix.Alert(p.Message);
           		return;
           	}
				Matrix.doRefresh('GRD_DETAIL');
				Matrix.Information(BTN_CD_SAV.Text+' 완료되었습니다.','안내');
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
 	if(args.Id == 'GRD_MASTER'){
		Matrix.getObject('LBL_MST_CNT').Text = args.RecordCount;
	
	}else if(args.Id == 'GRD_DETAIL'){
		Matrix.getObject('LBL_DTL_CNT').Text = args.RecordCount;
	}
 };
 
 
 
/**************************************
 * 그리드의 셀을 클릭할 떄 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤 이름 
 *		 aud.control.grids.DataGridRow	Row (Readonly:False) : 데이터 레코드 정보 
 *		 aud.control.grids.DataGridCell	Cell (Readonly:False) : 데이터셀 정보 
 *		 aud.control.grids.DataGridColumn	Field (Readonly:False) : 필드 정보 
 *		 boolean	Handled (Readonly:False) : cell selection 정보 유지 여부 
**************************************/
 var OnCellClick  = function(sender, args){
 	if(args.Id == 'GRD_MASTER'){
		Matrix.SetGlobalParams('VS_GROUP_CD',args.Row.GetValue('GROUP_CD'));
		Matrix.doRefresh('GRD_DETAIL');
		
		LBL_TTL_3.Text = '  상세 코드 – '+args.Row.GetValue('CODE_NAME');
		LBL_INIT.Visible = false;
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
 	if(args.Id == 'GRD_DETAIL'){
		setInputValue(args.Row);
		BTN_CD_SAV.Text = '저장';
		VS_INP_CODE.IsReadOnly = true;
		VS_INP_CODE.Style.Background.Color.SetRGBA('217' ,'217' ,'217' ,'0.3');
		
		popup = Matrix.ShowWindow("코드 추가",0,0,460,350,true,false,"코드 수정",true,'#ffffff',0,false,false);
		popup.MoveToCenter();
	}
 };
 
 
/**************************************
 * 그리드의 멀티 헤더 체크 박스를 클릭하는 순간 발생합니다.
 * * arguments :  
 *		 string	Id (Readonly:False) : 컨트롤 이름 
 *		 aud.control.grids.MultiHeaderCell	HeaderCell (Readonly:False) : 멀티헤더셀 객체 
 *		 booleans	Checked (Readonly:False) : 체크 유무 
 *		 boolean	Cancel (Readonly:False) : 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다. 
**************************************/
 var OnGridMultiHeaderCheckBoxClicked  = function(sender, args){
  	if(args.Id == 'GRD_DETAIL'){
		var GRD = Matrix.getObject(args.Id);
		var checkValue = args.Checked ? 'Y' : 'N';
		
		for (var i=0; i<GRD.GetRowCount(); i++) {
			GRD.setRowValue(i, 'CHK', checkValue);
		}
		GRD.Update();
	}
 };
 
 
 var setInputValue = function(row){
 	if(row == 'GRD_MASTER'){
		VS_INP_GROUP_CODE.Text = '';
		VS_INP_GROUP_NAME.Text = '';
		VS_INP_CODE_DESC.Text  = '';
		
	}else if(typeof row === 'object' && row !== null){
		VS_GROUP_CODE.Text = Matrix.GetGlobalParamValue('VS_GROUP_CD');
		VS_INP_CODE.Text   = row.GetValue('CODE');
		VS_CODE_NAME.Text  = row.GetValue('CODE_NAME');
		VN_SORT.Text 	   = row.GetValue('SORT_ORDER');
		VS_USE_YN.Value    = row.GetValue('USE_YN_CODE');
	
	}else{
		Matrix.Execute('GET_MAX_SORT' ,function(p){
			if(p.Success == false){
				Matrix.Alert(p.Message);
				return;
			}
			var  dt = p.DataTable;
			
			VS_GROUP_CODE.Text = Matrix.GetGlobalParamValue('VS_GROUP_CD');
			VS_INP_CODE.Text   = '';
			VS_CODE_NAME.Text  = '';
			VN_SORT.Text	   = dt.getData(0,'MAX_SORT');
			VS_USE_YN.Value    = 'Y';
			
			popup = Matrix.ShowWindow("코드 추가",0,0,460,350,true,false,"코드 추가",true,'#ffffff',0,false,false);
			popup.MoveToCenter();
		});
	}
 };
 
 
var isInvalidInput = function(fields) {
	return fields.some(function(v) {
		return v === null || v === undefined || v === '';
	});
};