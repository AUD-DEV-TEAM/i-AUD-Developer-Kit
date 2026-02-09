/**
 * 사용자에게 팝업창을 표시하는 컨트롤입니다.
 *
 * 팝업의 내용은 보고서의 특정 폼을 대상으로 하며,
 * {@link Matrix.ShowWindow} 또는 {@link Matrix.ShowReportDialog}로 생성합니다.
 *
 * @example
 * ```ts
 * //----------------------------------------------
 * // 패턴1: 기본 폼 팝업 표시
 * //----------------------------------------------
 * let btnOpenPopup: Button = Matrix.getObject("btnOpenPopup") as Button;
 * let popup: FormDialog;
 *
 * btnOpenPopup.OnClick = function(sender, args) {
 *     // ShowWindow(폼이름, left, top, width, height, isModal, resizable, header, isAutoClose, backColor, buttons)
 *     // buttons: 0=없음, 1=닫기, 2=확인+취소
 *     popup = Matrix.ShowWindow("POP_FORM", 0, 0, 600, 400, true, true, "팝업 제목", false, null, 2);
 *
 *     // 팝업 닫힘 이벤트
 *     popup.OnClosed = function(sender, args) {
 *         Matrix.Alert("팝업이 닫혔습니다.");
 *         popup = null;
 *     };
 *
 *     // 확인 버튼 클릭 이벤트
 *     popup.OnDialogResult = function(type) {
 *         Matrix.Alert("확인 버튼이 클릭되었습니다.");
 *         popup.Close();
 *     };
 * };
 *
 * //----------------------------------------------
 * // 패턴2: 데이터 선택 팝업 (그리드에서 항목 선택)
 * //----------------------------------------------
 * let btnSelectUser: Button = Matrix.getObject("btnSelectUser") as Button;
 * let txtUserName: TextBox = Matrix.getObject("txtUserName") as TextBox;
 * let popupSelect: FormDialog;
 *
 * btnSelectUser.OnClick = function(sender, args) {
 *     // 사용자 선택 팝업 표시
 *     popupSelect = Matrix.ShowWindow("POP_USER_SELECT", 0, 0, 800, 500, true, true, "사용자 선택", false, null, 2);
 *     popupSelect.MoveToCenter();  // 화면 중앙에 배치
 *
 *     // 확인 버튼 클릭 시
 *     popupSelect.OnDialogResult = function(type) {
 *         // 팝업 내부의 그리드에서 선택된 행 가져오기
 *         let popGrid: DataGrid = Matrix.getFormObject("POP_USER_SELECT", "gridUsers") as DataGrid;
 *         let selectedRow = popGrid.GetSelectedRow();
 *
 *         if (selectedRow) {
 *             let userName = selectedRow.GetValue("USER_NAME");
 *             let userCode = selectedRow.GetValue("USER_CODE");
 *
 *             txtUserName.Text = userName;
 *             txtUserName.SetValue("USER_CODE", userCode);
 *
 *             popupSelect.Close();
 *         } else {
 *             Matrix.Alert("사용자를 선택하세요.");
 *         }
 *     };
 *
 *     popupSelect.OnClosed = function(sender, args) {
 *         popupSelect = null;
 *     };
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 데이터 입력 팝업
 * //----------------------------------------------
 * let btnAddItem: Button = Matrix.getObject("btnAddItem") as Button;
 * let grid: DataGrid = Matrix.getObject("DataGrid") as DataGrid;
 * let popupInput: FormDialog;
 *
 * btnAddItem.OnClick = function(sender, args) {
 *     // 입력 폼 팝업 표시
 *     popupInput = Matrix.ShowWindow("POP_INPUT", 0, 0, 500, 300, true, false, "새 항목 추가", false, null, 2);
 *     popupInput.MoveToCenter();
 *
 *     // 확인 버튼 클릭 시
 *     popupInput.OnDialogResult = function(type) {
 *         // 팝업의 입력 컨트롤들 가져오기
 *         let popTxtName: TextBox = Matrix.getFormObject("POP_INPUT", "txtName") as TextBox;
 *         let popTxtAmount: NumberBox = Matrix.getFormObject("POP_INPUT", "txtAmount") as NumberBox;
 *
 *         // 유효성 검증
 *         if (!popTxtName.Text) {
 *             Matrix.Alert("이름을 입력하세요.");
 *             return;
 *         }
 *
 *         // 서버 저장
 *         let params = {
 *             VS_NAME: popTxtName.Text,
 *             VN_AMOUNT: popTxtAmount.Text
 *         };
 *
 *         Matrix.RunScript("", "SaveItemService", params, function(p) {
 *             if (p.Success) {
 *                 Matrix.Alert("저장되었습니다.");
 *                 grid.SetDataSet(p.DataSet);  // 그리드 갱신
 *                 popupInput.Close();
 *             }
 *         });
 *     };
 *
 *     popupInput.OnClosed = function(sender, args) {
 *         popupInput = null;
 *     };
 * };
 *
 * //----------------------------------------------
 * // 패턴4: 보고서 팝업 (ShowReportDialog)
 * //----------------------------------------------
 * let btnOpenReport: Button = Matrix.getObject("btnOpenReport") as Button;
 *
 * btnOpenReport.OnClick = function(sender, args) {
 *     // 다른 보고서를 팝업으로 표시
 *     let params = {
 *         VS_DEPT_CODE: "D001",
 *         VS_YEAR: "2024"
 *     };
 *
 *     let options = {
 *         Width: 1000,
 *         Height: 700,
 *         Center: true,
 *         IsModal: true,
 *         Title: "부서별 실적 보고서",
 *         Resizable: true,
 *         Buttons: 1  // 닫기 버튼만 표시
 *     };
 *
 *     let dialog: DialogBox = Matrix.ShowReportDialog("DEPT_REPORT", params, options, function(resultData) {
 *         // 팝업에서 Matrix.ReportDialogResult(data, true)로 전달한 데이터 수신
 *         if (resultData) {
 *             Matrix.Alert("팝업에서 전달받은 데이터: " + JSON.stringify(resultData));
 *         }
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴5: 팝업 위치 및 크기 동적 조정
 * //----------------------------------------------
 * let btnOpenDynamic: Button = Matrix.getObject("btnOpenDynamic") as Button;
 * let popupDynamic: FormDialog;
 *
 * btnOpenDynamic.OnClick = function(sender, args) {
 *     popupDynamic = Matrix.ShowWindow("POP_DYNAMIC", 100, 100, 400, 300, false, true, "동적 팝업", false, null, 1);
 *
 *     // 2초 후 크기 변경
 *     setTimeout(function() {
 *         if (popupDynamic && popupDynamic.IsOpened) {
 *             popupDynamic.Width = 600;
 *             popupDynamic.Height = 500;
 *             Matrix.Alert("팝업 크기가 변경되었습니다.");
 *         }
 *     }, 2000);
 *
 *     // 4초 후 중앙으로 이동
 *     setTimeout(function() {
 *         if (popupDynamic && popupDynamic.IsOpened) {
 *             popupDynamic.MoveToCenter();
 *             Matrix.Alert("팝업이 중앙으로 이동했습니다.");
 *         }
 *     }, 4000);
 *
 *     popupDynamic.OnClosed = function(sender, args) {
 *         popupDynamic = null;
 *     };
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 상세 정보 팝업 (그리드 행 더블클릭)
 * //----------------------------------------------
 * let gridList: DataGrid = Matrix.getObject("gridList") as DataGrid;
 * let popupDetail: FormDialog;
 *
 * gridList.OnRowDoubleClick = function(sender, args) {
 *     let row = args.Row;
 *     let itemCode = row.GetValue("ITEM_CODE");
 *
 *     // 상세 정보 팝업 표시
 *     popupDetail = Matrix.ShowWindow("POP_DETAIL", 0, 0, 700, 600, true, true, "상세 정보", false, null, 1);
 *     popupDetail.MoveToCenter();
 *
 *     // 팝업의 컨트롤에 데이터 설정
 *     let popTxtCode: TextBox = Matrix.getFormObject("POP_DETAIL", "txtCode") as TextBox;
 *     let popTxtName: TextBox = Matrix.getFormObject("POP_DETAIL", "txtName") as TextBox;
 *
 *     popTxtCode.Text = row.GetValue("ITEM_CODE");
 *     popTxtName.Text = row.GetValue("ITEM_NAME");
 *
 *     // 서버에서 상세 정보 조회
 *     let params = {
 *         VS_ITEM_CODE: itemCode
 *     };
 *
 *     Matrix.RunScriptEx(["POP_DETAIL:gridDetail"], "GetItemDetailService", params, function(p) {
 *         if (p.Success) {
 *             // 팝업 내부의 그리드에 데이터 설정
 *         }
 *     });
 *
 *     popupDetail.OnClosed = function(sender, args) {
 *         popupDetail = null;
 *     };
 * };
 *
 * //----------------------------------------------
 * // 패턴7: 팝업 체인 (팝업에서 다른 팝업 열기)
 * //----------------------------------------------
 * let btnOpenChain: Button = Matrix.getObject("btnOpenChain") as Button;
 * let popup1: FormDialog;
 * let popup2: FormDialog;
 *
 * btnOpenChain.OnClick = function(sender, args) {
 *     // 첫 번째 팝업
 *     popup1 = Matrix.ShowWindow("POP_STEP1", 0, 0, 500, 400, true, true, "1단계", false, null, 2);
 *     popup1.MoveToCenter();
 *
 *     popup1.OnDialogResult = function(type) {
 *         // 첫 번째 팝업에서 확인 클릭 시 두 번째 팝업 표시
 *         popup1.Close();
 *
 *         popup2 = Matrix.ShowWindow("POP_STEP2", 0, 0, 500, 400, true, true, "2단계", false, null, 2);
 *         popup2.MoveToCenter();
 *
 *         popup2.OnDialogResult = function(type) {
 *             Matrix.Alert("모든 단계가 완료되었습니다.");
 *             popup2.Close();
 *         };
 *
 *         popup2.OnClosed = function(sender, args) {
 *             popup2 = null;
 *         };
 *     };
 *
 *     popup1.OnClosed = function(sender, args) {
 *         popup1 = null;
 *     };
 * };
 *
 * //----------------------------------------------
 * // 패턴8: 조건부 팝업 닫기
 * //----------------------------------------------
 * let btnConditionalClose: Button = Matrix.getObject("btnConditionalClose") as Button;
 * let popupValidate: FormDialog;
 *
 * btnConditionalClose.OnClick = function(sender, args) {
 *     popupValidate = Matrix.ShowWindow("POP_VALIDATE", 0, 0, 600, 400, true, true, "데이터 검증", false, null, 2);
 *     popupValidate.MoveToCenter();
 *
 *     // 확인 버튼 클릭 시
 *     popupValidate.OnDialogResult = function(type) {
 *         // 팝업 내부의 데이터 검증
 *         let popTxtValue: TextBox = Matrix.getFormObject("POP_VALIDATE", "txtValue") as TextBox;
 *         let value = parseInt(popTxtValue.Text);
 *
 *         if (isNaN(value) || value < 0) {
 *             Matrix.Alert("0 이상의 숫자를 입력하세요.");
 *             return;  // 팝업을 닫지 않음
 *         }
 *
 *         if (value > 100) {
 *             Matrix.Alert("100 이하의 값을 입력하세요.");
 *             return;  // 팝업을 닫지 않음
 *         }
 *
 *         // 검증 통과 시에만 팝업 닫기
 *         Matrix.Alert("검증 성공! 값: " + value);
 *         popupValidate.Close();
 *     };
 *
 *     popupValidate.OnClosed = function(sender, args) {
 *         popupValidate = null;
 *     };
 * };
 * ```
 */
export interface FormDialog{

  /**
   * 높이
  */
  Height: number;

  /**
   * 현재창이 열려있는지 여부
  */
   readonly IsOpened: boolean;

  /**
   * 위치(Left)
  */
  Left: number;

  /**
   * 팝업 타이틀
  */
  Title: string;

  /**
   * 위치(Top)
  */
  Top: number;

  /**
   * 넓이
  */
  Width: number;

  /** 
   * 팝업 윈도우를 닫습니다.
   *
  */
  Close(): void;

  /** 
   * 팝업 윈도우를 화면의 중앙으로 이동 시킵니다.
   *
  */
  MoveToCenter(): void;

  /**
   * @event 
   *
   * 팝업 윈도우가 닫힐때 발생합니다.(버튼 유형 1의 [닫기], 유형 2의 [취소] 버튼 클릭 시 발생) 
   *
   * @param args
   *
   * Parameter Info
  */
  OnClosed : (sender : FormDialog
  , args : { 
  }
  ) => void;


  /**
   * @event 
   *
   * 버튼 유형 2의 [확인] 버튼 클릭 시 발생합니다. 
   *
   * @example
   * ```js
   * var POP_DATASET = Matrix.ShowWindow("POP_DATASET",0,0,350, 180, false, true, "데이터 집계 설정",false, null, 2, null);
   * POP_DATASET.OnClosed = function(sender, args){
   * 	POP_DATASET = null;
   * 
   * };
   * POP_DATASET.OnDialogResult = function(result){
   * 	//확인에 대한 작업
   * 	_this.POP_DATASET.Close(); 
   * };
   * ```
   * @param type 이벤트가 발생된 버튼의 유형(OK)이 반환됩니다.
   *
   * Parameter Info
  */
  OnDialogResult : ( type: string ) => void;


}
