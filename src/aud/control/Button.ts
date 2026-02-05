import { Control } from "../../aud/control/Control";
/**
 * 버튼 컨트롤입니다.
 *
 * 사용자가 클릭하여 명령을 실행할 수 있는 UI 요소이며,
 * {@link OnClick} 이벤트를 통해 클릭 동작을 처리합니다.
 *
 * @example
 * ```ts
 * //----------------------------------------------
 * // 패턴1: 기본 버튼 클릭 이벤트 처리
 * //----------------------------------------------
 * let btnSearch: Button = Matrix.getObject("btnSearch") as Button;
 *
 * btnSearch.OnClick = function(sender, args) {
 *     Matrix.Alert("버튼 '" + args.Text + "'이(가) 클릭되었습니다.");
 * };
 *
 * //----------------------------------------------
 * // 패턴2: 서버 스크립트 호출 및 데이터 조회
 * //----------------------------------------------
 * let btnLoad: Button = Matrix.getObject("btnLoad") as Button;
 * let grid: DataGrid = Matrix.getObject("DataGrid") as DataGrid;
 *
 * btnLoad.OnClick = function(sender, args) {
 *     // 파라미터 구성
 *     let params = {
 *         VS_SEARCH_TEXT: "검색어",
 *         VN_PAGE_NO: 1
 *     };
 *
 *     // 서버 스크립트 호출
 *     Matrix.RunScript("", "SearchService", params, function(p) {
 *         if (p.Success == false) {
 *             Matrix.Alert(p.Message);
 *             return;
 *         }
 *         grid.SetDataSet(p.DataSet);
 *         Matrix.Alert("조회 완료: " + p.DataSet.Tables[0].Rows.length + "건");
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 버튼 텍스트 및 스타일 동적 변경
 * //----------------------------------------------
 * let btnToggle: Button = Matrix.getObject("btnToggle") as Button;
 * let isActive = false;
 *
 * btnToggle.OnClick = function(sender, args) {
 *     isActive = !isActive;
 *
 *     if (isActive) {
 *         btnToggle.Text = "활성화됨";
 *         btnToggle.SetMouseOverBoxStyle("PRIMARY_BTN_Active");
 *     } else {
 *         btnToggle.Text = "비활성화됨";
 *         btnToggle.SetMouseOverBoxStyle("PRIMARY_BTN_Inactive");
 *     }
 * };
 *
 * //----------------------------------------------
 * // 패턴4: 버튼 비활성화/활성화 제어
 * //----------------------------------------------
 * let btnSave: Button = Matrix.getObject("btnSave") as Button;
 * let btnCancel: Button = Matrix.getObject("btnCancel") as Button;
 *
 * btnSave.OnClick = function(sender, args) {
 *     // 저장 중 다른 버튼 비활성화
 *     btnSave.Enabled = false;
 *     btnCancel.Enabled = false;
 *     btnSave.Text = "저장 중...";
 *
 *     Matrix.RunScript("", "SaveService", function(p) {
 *         if (p.Success) {
 *             Matrix.Alert("저장되었습니다.");
 *         } else {
 *             Matrix.Alert("저장 실패: " + p.Message);
 *         }
 *
 *         // 버튼 다시 활성화
 *         btnSave.Enabled = true;
 *         btnCancel.Enabled = true;
 *         btnSave.Text = "저장";
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴5: 데이터 검증 후 서버 호출
 * //----------------------------------------------
 * let btnSubmit: Button = Matrix.getObject("btnSubmit") as Button;
 * let txtName: TextBox = Matrix.getObject("txtName") as TextBox;
 * let txtEmail: TextBox = Matrix.getObject("txtEmail") as TextBox;
 *
 * btnSubmit.OnClick = function(sender, args) {
 *     // 입력값 검증
 *     if (!txtName.Text || txtName.Text.trim() === "") {
 *         Matrix.Alert("이름을 입력하세요.");
 *         txtName.Focus();
 *         return;
 *     }
 *
 *     if (!txtEmail.Text || txtEmail.Text.indexOf("@") === -1) {
 *         Matrix.Alert("올바른 이메일을 입력하세요.");
 *         txtEmail.Focus();
 *         return;
 *     }
 *
 *     // 검증 통과 후 서버 전송
 *     let params = {
 *         VS_NAME: txtName.Text,
 *         VS_EMAIL: txtEmail.Text
 *     };
 *
 *     Matrix.RunScript("", "RegisterService", params, function(p) {
 *         if (p.Success) {
 *             Matrix.Alert("등록되었습니다.");
 *             txtName.Text = "";
 *             txtEmail.Text = "";
 *         }
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 마우스 오버/다운 스타일 적용
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     let btnAction: Button = Matrix.getObject("btnAction") as Button;
 *
 *     // 마우스 오버 시 스타일
 *     btnAction.SetMouseOverBoxStyle("PRIMARY_BTN_Hover");
 *
 *     // 마우스 다운 시 스타일
 *     btnAction.SetMouseDownBoxStyle("PRIMARY_BTN_Pressed");
 *
 *     // 커서 모양 변경
 *     btnAction.Cursor = "pointer";
 * };
 * ```
 */
export interface Button extends Control{

  /**
   * 컨트롤의 마우스 커서 모양을 CSS cursor 값으로 지정합니다.
   *
   * @example
   * ```ts
   * let btn: Button = Matrix.getObject("btnAction") as Button;
   * btn.Cursor = "pointer";   // 손 모양
   * btn.Cursor = "wait";      // 로딩 모양
   * btn.Cursor = "not-allowed"; // 사용 불가 표시
   * ```
   */
  Cursor: string;

  /**
   * 버튼 텍스트에 적용할 다국어 코드를 지정합니다.
   *
   * 다국어 코드가 설정되면 사용자의 언어 설정에 따라 버튼 텍스트가 자동으로 변환됩니다.
   */
  LanguageCode: string;

  /**
   * 버튼에 표시되는 텍스트를 가져오거나 설정합니다.
   *
   * @example
   * ```ts
   * let btn: Button = Matrix.getObject("btnSave") as Button;
   *
   * // 텍스트 설정
   * btn.Text = "저장";
   *
   * // 텍스트 읽기
   * let label = btn.Text; // "저장"
   * ```
   */
  Text: string;

  /**
   * 마우스를 누르고 있을 때(MouseDown) 적용할 BoxStyle을 지정합니다.
   *
   * BoxStyle의 Key 또는 이름으로 지정할 수 있으며,
   * 해당 BoxStyle이 존재하지 않거나 Style 속성이 없으면 적용되지 않습니다.
   *
   * @example
   * ```ts
   * let btn: Button = Matrix.getObject("btnAction") as Button;
   *
   * // BoxStyle Key로 지정
   * btn.SetMouseDownBoxStyle("BX5DF3C663CEBD410DB823074438DD30C6");
   *
   * // BoxStyle 이름으로 지정
   * btn.SetMouseDownBoxStyle("PRIMARY_BTN_Default");
   * ```
   * @param boxStyleIdentifier BoxStyle의 Key 또는 이름
   */
  SetMouseDownBoxStyle(boxStyleIdentifier: string): void;

  /**
   * 마우스를 올렸을 때(MouseOver) 적용할 BoxStyle을 지정합니다.
   *
   * BoxStyle의 Key 또는 이름으로 지정할 수 있으며,
   * 해당 BoxStyle이 존재하지 않거나 Style 속성이 없으면 적용되지 않습니다.
   *
   * @example
   * ```ts
   * let btn: Button = Matrix.getObject("btnAction") as Button;
   *
   * // BoxStyle Key로 지정
   * btn.SetMouseOverBoxStyle("BXCAF656A487E84A92A16419B0ACC273D0");
   *
   * // BoxStyle 이름으로 지정
   * btn.SetMouseOverBoxStyle("PRIMARY_BTN_Hover");
   * ```
   * @param boxStyleIdentifier BoxStyle의 Key 또는 이름
   */
  SetMouseOverBoxStyle(boxStyleIdentifier: string): void;

  /**
   * @event
   *
   * 버튼이 클릭될 때 발생하는 이벤트입니다.
   *
   * @param sender 이벤트가 발생한 버튼 컨트롤
   * @param args 이벤트 인자
   * @param args.Id 버튼 컨트롤 이름
   * @param args.Text 버튼에 표시된 텍스트
   *
   * Target : {@link Button}
   *
   * @example
   * ```ts
   * let btnSearch: Button = Matrix.getObject("btnSearch") as Button;
   * let grid: DataGrid = Matrix.getObject("DataGrid") as DataGrid;
   *
   * btnSearch.OnClick = function(sender, args) {
   *     // 서버 스크립트 호출을 통한 데이터 조회
   *     Matrix.RunScript("", "SearchService", function(p) {
   *         if (p.Success == false) {
   *             Matrix.Alert(p.Message);
   *             return;
   *         }
   *         grid.SetDataSet(p.DataSet);
   *     });
   * };
   * ```
   */
  OnClick : (sender : Button
  , args : {
    /**
     * 버튼 컨트롤 이름
     */
    Id: string
    /**
     * 버튼에 표시된 텍스트
     */
    Text: string
  }
  ) => void;

}
