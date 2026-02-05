import { Control } from "../../aud/control/Control";
/**
 * 연도(Year)를 선택할 수 있는 달력 컨트롤입니다.
 *
 * 특정 연도를 선택하며,
 * {@link OnValueChanged} 이벤트를 통해 연도 변경을 처리합니다.
 *
 * @example
 * ```ts
 * //----------------------------------------------
 * // 패턴1: 기본 연도 선택 및 값 읽기
 * //----------------------------------------------
 * let calYear: CalendarYM = Matrix.getObject("calYear") as CalendarYM;
 *
 * calYear.OnValueChanged = function(sender, args) {
 *     let year = args.Text;  // ViewFormat 형식 (예: "2024")
 *     let date = args.Date;
 *
 *     // 해당 연도의 첫날과 마지막날 계산
 *     let firstDay = new Date(date.getFullYear(), 0, 1);
 *     let lastDay = new Date(date.getFullYear(), 11, 31);
 *
 *     Matrix.Alert("선택된 연도: " + year + " (1월 1일 ~ 12월 31일)");
 * };
 *
 * //----------------------------------------------
 * // 패턴2: 올해로 초기화
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     let calThisYear: CalendarYM = Matrix.getObject("calThisYear") as CalendarYM;
 *
 *     // 포맷 설정
 *     calThisYear.DataFormat = "yyyy";
 *     calThisYear.ViewFormat = "yyyy";
 *
 *     // 올해로 설정
 *     let today = new Date();
 *     calThisYear.Date = today;
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 연도별 보고서 조회
 * //----------------------------------------------
 * let btnYearlyReport: Button = Matrix.getObject("btnYearlyReport") as Button;
 * let calReportYear: CalendarYM = Matrix.getObject("calReportYear") as CalendarYM;
 * let grid: DataGrid = Matrix.getObject("DataGrid") as DataGrid;
 *
 * btnYearlyReport.OnClick = function(sender, args) {
 *     if (!calReportYear.Value) {
 *         Matrix.Alert("조회할 연도를 선택하세요.");
 *         calReportYear.ShowPopup();
 *         return;
 *     }
 *
 *     // 해당 연도의 시작일과 종료일 계산
 *     let year = parseInt(calReportYear.Value);
 *     let firstDay = new Date(year, 0, 1);
 *     let lastDay = new Date(year, 11, 31);
 *
 *     // 서버 스크립트 호출
 *     let params = {
 *         VS_YEAR: calReportYear.Value,  // "2024"
 *         VS_FROM_DATE: formatDateToString(firstDay),  // "20240101"
 *         VS_TO_DATE: formatDateToString(lastDay)      // "20241231"
 *     };
 *
 *     Matrix.RunScript("", "GetYearlyReportService", params, function(p) {
 *         if (p.Success) {
 *             grid.SetDataSet(p.DataSet);
 *             Matrix.Alert(calReportYear.Text + "년 보고서 조회 완료");
 *         }
 *     });
 * };
 *
 * function formatDateToString(date: Date): string {
 *     let year = date.getFullYear();
 *     let month = ("0" + (date.getMonth() + 1)).slice(-2);
 *     let day = ("0" + date.getDate()).slice(-2);
 *     return year + month + day;
 * }
 *
 * //----------------------------------------------
 * // 패턴4: 전년 대비 분석
 * //----------------------------------------------
 * let calCompare: CalendarYM = Matrix.getObject("calCompare") as CalendarYM;
 * let lblComparison: Label = Matrix.getObject("lblComparison") as Label;
 *
 * calCompare.OnValueChanged = function(sender, args) {
 *     let currentYear = parseInt(args.Text);
 *     let previousYear = currentYear - 1;
 *
 *     lblComparison.Text = "비교 대상: " + currentYear + "년 vs " + previousYear + "년";
 *
 *     // 전년 대비 데이터 조회
 *     let params = {
 *         VS_CURRENT_YEAR: currentYear.toString(),
 *         VS_PREVIOUS_YEAR: previousYear.toString()
 *     };
 *
 *     Matrix.RunScript("", "CompareYearOverYearService", params, function(p) {
 *         if (p.Success) {
 *             Matrix.Alert("전년 대비 분석 완료");
 *         }
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴5: 이전/다음 년도 버튼
 * //----------------------------------------------
 * let btnPrevYear: Button = Matrix.getObject("btnPrevYear") as Button;
 * let btnNextYear: Button = Matrix.getObject("btnNextYear") as Button;
 * let calNav: CalendarYM = Matrix.getObject("calNav") as CalendarYM;
 *
 * // 이전 년도
 * btnPrevYear.OnClick = function(sender, args) {
 *     let current = calNav.Date;
 *     let prevYear = new Date(current.getFullYear() - 1, 0, 1);
 *     calNav.Date = prevYear;
 * };
 *
 * // 다음 년도
 * btnNextYear.OnClick = function(sender, args) {
 *     let current = calNav.Date;
 *     let nextYear = new Date(current.getFullYear() + 1, 0, 1);
 *     calNav.Date = nextYear;
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 선택 가능 연도 제한 (최근 5년)
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     let calRecent: CalendarYM = Matrix.getObject("calRecent") as CalendarYM;
 *
 *     // 올해부터 5년 전까지만 선택 가능
 *     let today = new Date();
 *     let fiveYearsAgo = new Date(today.getFullYear() - 5, 0, 1);
 *
 *     calRecent.MinDate = fiveYearsAgo.getFullYear().toString();  // "2019"
 *     calRecent.MaxDate = today.getFullYear().toString();         // "2024"
 * };
 *
 * //----------------------------------------------
 * // 패턴7: 연도별 데이터 입력
 * //----------------------------------------------
 * let calInput: CalendarYM = Matrix.getObject("calInput") as CalendarYM;
 * let txtRevenue: TextBox = Matrix.getObject("txtRevenue") as TextBox;
 * let btnSaveYearly: Button = Matrix.getObject("btnSaveYearly") as Button;
 *
 * btnSaveYearly.OnClick = function(sender, args) {
 *     if (!calInput.Value) {
 *         Matrix.Alert("연도를 선택하세요.");
 *         return;
 *     }
 *
 *     if (!txtRevenue.Text) {
 *         Matrix.Alert("매출액을 입력하세요.");
 *         return;
 *     }
 *
 *     // 연도별 실적 저장
 *     let params = {
 *         VS_YEAR: calInput.Value,  // "2024"
 *         VN_REVENUE: txtRevenue.Text
 *     };
 *
 *     Matrix.RunScript("", "SaveYearlyRevenueService", params, function(p) {
 *         if (p.Success) {
 *             Matrix.Alert(calInput.Text + "년 실적이 저장되었습니다.");
 *             txtRevenue.Text = "";
 *
 *             // 다음 연도로 자동 이동
 *             let nextYear = new Date(calInput.Date.getFullYear() + 1, 0, 1);
 *             calInput.Date = nextYear;
 *         }
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴8: 회계연도 표시
 * //----------------------------------------------
 * let calFiscal: CalendarYM = Matrix.getObject("calFiscal") as CalendarYM;
 * let lblFiscalYear: Label = Matrix.getObject("lblFiscalYear") as Label;
 *
 * calFiscal.OnValueChanged = function(sender, args) {
 *     let year = parseInt(args.Text);
 *
 *     // 회계연도 계산 (4월 시작 기준)
 *     // 예: 2024년 선택 시 → FY2024는 2024.04~2025.03
 *     lblFiscalYear.Text = "회계연도: FY" + year + " (" + year + ".04 ~ " + (year + 1) + ".03)";
 * };
 * ```
 */
export interface CalendarYM extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyy"`)
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
   * 출력용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyy"`)
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
   * 선택된 연도가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYM}
  */
  OnValueChanged : (sender : CalendarYM
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
