import { Control } from "../../aud/control/Control";
/**
 * 주(Week) 단위로 날짜를 선택할 수 있는 달력 컨트롤입니다.
 *
 * 특정 주의 시작일을 선택하며,
 * {@link OnValueChanged} 이벤트를 통해 주 변경을 처리합니다.
 *
 * @example
 * ```js
 * //----------------------------------------------
 * // 패턴1: 기본 주 선택 및 값 읽기
 * //----------------------------------------------
 * var calWeek = Matrix.getObject("calWeek");
 *
 * calWeek.OnValueChanged = function(sender, args) {
 *     var weekStart = args.Text;  // ViewFormat 형식 (예: "2024-01-08")
 *     var weekDate = args.Date;
 *
 *     // 해당 주의 종료일 계산 (시작일 + 6일)
 *     var weekEnd = new Date(weekDate);
 *     weekEnd.setDate(weekEnd.getDate() + 6);
 *
 *     Matrix.Alert("선택된 주: " + weekStart + " ~ " + formatDate(weekEnd));
 * };
 *
 * function formatDate(date) {
 *     var year = date.getFullYear();
 *     var month = ("0" + (date.getMonth() + 1)).slice(-2);
 *     var day = ("0" + date.getDate()).slice(-2);
 *     return year + "-" + month + "-" + day;
 * }
 *
 * //----------------------------------------------
 * // 패턴2: 이번 주로 초기화
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     var calThisWeek = Matrix.getObject("calThisWeek");
 *
 *     // 포맷 설정
 *     calThisWeek.DataFormat = "yyyyMMdd";
 *     calThisWeek.ViewFormat = "yyyy-MM-dd";
 *
 *     // 이번 주 월요일로 설정
 *     var today = new Date();
 *     var dayOfWeek = today.getDay();  // 0(일) ~ 6(토)
 *     var monday = new Date(today);
 *     monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
 *
 *     calThisWeek.Date = monday;
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 주간 보고서 조회
 * //----------------------------------------------
 * var btnWeeklyReport = Matrix.getObject("btnWeeklyReport");
 * var calReportWeek = Matrix.getObject("calReportWeek");
 * var grid = Matrix.getObject("DataGrid");
 *
 * btnWeeklyReport.OnClick = function(sender, args) {
 *     if (!calReportWeek.Value) {
 *         Matrix.Alert("주를 선택하세요.");
 *         calReportWeek.ShowPopup();
 *         return;
 *     }
 *
 *     // 주의 시작일과 종료일 계산
 *     var weekStart = calReportWeek.Date;
 *     var weekEnd = new Date(weekStart);
 *     weekEnd.setDate(weekEnd.getDate() + 6);
 *
 *     // 서버 스크립트 호출
 *     var params = {
 *         VS_WEEK_START: calReportWeek.Value,  // "20240108" (월요일)
 *         VS_WEEK_END: formatDateToString(weekEnd)  // "20240114" (일요일)
 *     };
 *
 *     Matrix.RunScript("", "GetWeeklyReportService", params, function(p) {
 *         if (p.Success) {
 *             grid.SetDataSet(p.DataSet);
 *             Matrix.Alert("주간 보고서 조회 완료");
 *         }
 *     });
 * };
 *
 * function formatDateToString(date) {
 *     var year = date.getFullYear();
 *     var month = ("0" + (date.getMonth() + 1)).slice(-2);
 *     var day = ("0" + date.getDate()).slice(-2);
 *     return year + month + day;
 * }
 *
 * //----------------------------------------------
 * // 패턴4: 이전/다음 주 버튼
 * //----------------------------------------------
 * var btnPrevWeek = Matrix.getObject("btnPrevWeek");
 * var btnNextWeek = Matrix.getObject("btnNextWeek");
 * var calNav = Matrix.getObject("calNav");
 *
 * // 이전 주
 * btnPrevWeek.OnClick = function(sender, args) {
 *     var current = calNav.Date;
 *     var prevWeek = new Date(current);
 *     prevWeek.setDate(current.getDate() - 7);
 *     calNav.Date = prevWeek;
 * };
 *
 * // 다음 주
 * btnNextWeek.OnClick = function(sender, args) {
 *     var current = calNav.Date;
 *     var nextWeek = new Date(current);
 *     nextWeek.setDate(current.getDate() + 7);
 *     calNav.Date = nextWeek;
 * };
 *
 * //----------------------------------------------
 * // 패턴5: 주차 정보 표시
 * //----------------------------------------------
 * var calWeekInfo = Matrix.getObject("calWeekInfo");
 * var lblWeekInfo = Matrix.getObject("lblWeekInfo");
 *
 * calWeekInfo.OnValueChanged = function(sender, args) {
 *     var weekDate = args.Date;
 *
 *     // 해당 년도의 몇 번째 주인지 계산
 *     var startOfYear = new Date(weekDate.getFullYear(), 0, 1);
 *     var days = Math.floor((weekDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
 *     var weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
 *
 *     lblWeekInfo.Text = weekDate.getFullYear() + "년 " + weekNumber + "주차";
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 선택 가능한 주 제한 (최근 12주)
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     var calRecent = Matrix.getObject("calRecent");
 *
 *     // 오늘부터 12주 전까지만 선택 가능
 *     var today = new Date();
 *     var twelveWeeksAgo = new Date(today);
 *     twelveWeeksAgo.setDate(today.getDate() - (12 * 7));
 *
 *     calRecent.MinDate = formatDateToString(twelveWeeksAgo);
 *     calRecent.MaxDate = formatDateToString(today);
 * };
 *
 * function formatDateToString(date) {
 *     var year = date.getFullYear();
 *     var month = ("0" + (date.getMonth() + 1)).slice(-2);
 *     var day = ("0" + date.getDate()).slice(-2);
 *     return year + month + day;
 * }
 *
 * //----------------------------------------------
 * // 패턴7: 주별 실적 입력
 * //----------------------------------------------
 * var calInput = Matrix.getObject("calInput");
 * var txtAmount = Matrix.getObject("txtAmount");
 * var btnSave = Matrix.getObject("btnSave");
 *
 * btnSave.OnClick = function(sender, args) {
 *     if (!calInput.Value) {
 *         Matrix.Alert("주를 선택하세요.");
 *         return;
 *     }
 *
 *     if (!txtAmount.Text) {
 *         Matrix.Alert("금액을 입력하세요.");
 *         return;
 *     }
 *
 *     // 주간 실적 저장
 *     var params = {
 *         VS_WEEK_START: calInput.Value,  // "20240108"
 *         VN_AMOUNT: txtAmount.Text
 *     };
 *
 *     Matrix.RunScript("", "SaveWeeklyPerformanceService", params, function(p) {
 *         if (p.Success) {
 *             Matrix.Alert("저장되었습니다.");
 *             txtAmount.Text = "";
 *         }
 *     });
 * };
 * ```
 */
export interface CalendarWeekly extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyyMMdd"`)
   */
  DataFormat: string;

  /**
   * 선택된 날짜를 `Date` 객체로 가져오거나 설정합니다.
   */
  Date: Date;

  /**
   * 초기 선택 날짜를 가져오거나 설정합니다.
   */
  InitDate: string;

  /**
   * 읽기 전용 여부를 가져오거나 설정합니다.
   */
  IsReadOnly: boolean;

  /**
   * 최대 선택 가능 날짜를 가져오거나 설정합니다.
   */
  MaxDate: string;

  /**
   * 최소 선택 가능 날짜를 가져오거나 설정합니다.
   */
  MinDate: string;

  /**
   * 선택된 날짜를 {@link ViewFormat} 형식의 문자열로 가져오거나 설정합니다.
   */
  Text: string;

  /**
   * 선택된 날짜를 {@link DataFormat} 형식의 문자열로 가져오거나 설정합니다.
   */
  Value: string;

  /**
   * 출력용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyy-MM-dd"`)
   */
  ViewFormat: string;

  /**
   * 날짜 선택 팝업을 닫습니다.
   *
   */
  HidePopup(): void;

  /**
   * 날짜 선택 팝업을 표시합니다.
   *
   */
  ShowPopup(): void;

  /**
   * @event
   *
   * 선택된 주가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarWeekly}
   */
  OnValueChanged : (sender : CalendarWeekly
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * {@link ViewFormat} 형식의 날짜 문자열
    */
    Text: string
    /**
     * `Date` 객체 형식의 날짜
    */
    Date: Date
  }
  ) => void;


}
