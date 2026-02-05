import { Control } from "../../aud/control/Control";
/**
 * 연월(Year-Month)을 선택할 수 있는 달력 컨트롤입니다.
 *
 * 특정 연월을 선택하며,
 * {@link OnValueChanged} 이벤트를 통해 연월 변경을 처리합니다.
 *
 * @example
 * ```ts
 * //----------------------------------------------
 * // 패턴1: 기본 연월 선택 및 값 읽기
 * //----------------------------------------------
 * let calMonth: CalendarYear = Matrix.getObject("calMonth") as CalendarYear;
 *
 * calMonth.OnValueChanged = function(sender, args) {
 *     let yearMonth = args.Text;  // ViewFormat 형식 (예: "2024-01")
 *     let date = args.Date;
 *
 *     // 해당 월의 첫날과 마지막날 계산
 *     let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
 *     let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
 *
 *     Matrix.Alert("선택된 월: " + yearMonth + " (1일~" + lastDay.getDate() + "일)");
 * };
 *
 * //----------------------------------------------
 * // 패턴2: 당월로 초기화
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     let calCurrent: CalendarYear = Matrix.getObject("calCurrent") as CalendarYear;
 *
 *     // 포맷 설정
 *     calCurrent.DataFormat = "yyyyMM";
 *     calCurrent.ViewFormat = "yyyy-MM";
 *
 *     // 이번 달로 설정
 *     let today = new Date();
 *     calCurrent.Date = today;
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 월별 보고서 조회
 * //----------------------------------------------
 * let btnMonthlyReport: Button = Matrix.getObject("btnMonthlyReport") as Button;
 * let calReportMonth: CalendarYear = Matrix.getObject("calReportMonth") as CalendarYear;
 * let grid: DataGrid = Matrix.getObject("DataGrid") as DataGrid;
 *
 * btnMonthlyReport.OnClick = function(sender, args) {
 *     if (!calReportMonth.Value) {
 *         Matrix.Alert("조회할 연월을 선택하세요.");
 *         calReportMonth.ShowPopup();
 *         return;
 *     }
 *
 *     // 해당 월의 시작일과 종료일 계산
 *     let date = calReportMonth.Date;
 *     let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
 *     let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
 *
 *     // 서버 스크립트 호출
 *     let params = {
 *         VS_YEAR_MONTH: calReportMonth.Value,  // "202401"
 *         VS_FROM_DATE: formatDateToString(firstDay),  // "20240101"
 *         VS_TO_DATE: formatDateToString(lastDay)      // "20240131"
 *     };
 *
 *     Matrix.RunScript("", "GetMonthlyReportService", params, function(p) {
 *         if (p.Success) {
 *             grid.SetDataSet(p.DataSet);
 *             Matrix.Alert(calReportMonth.Text + " 월 보고서 조회 완료");
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
 * // 패턴4: 회계연도(Fiscal Year) 처리
 * //----------------------------------------------
 * let calFiscal: CalendarYear = Matrix.getObject("calFiscal") as CalendarYear;
 * let lblFiscalYear: Label = Matrix.getObject("lblFiscalYear") as Label;
 *
 * calFiscal.OnValueChanged = function(sender, args) {
 *     let date = args.Date;
 *     let year = date.getFullYear();
 *     let month = date.getMonth() + 1;  // 1~12
 *
 *     // 회계연도 계산 (4월 시작 기준)
 *     let fiscalYear = month >= 4 ? year : year - 1;
 *
 *     lblFiscalYear.Text = "회계연도: " + fiscalYear + "년 (FY" + fiscalYear + ")";
 * };
 *
 * //----------------------------------------------
 * // 패턴5: 이전/다음 월 버튼
 * //----------------------------------------------
 * let btnPrevMonth: Button = Matrix.getObject("btnPrevMonth") as Button;
 * let btnNextMonth: Button = Matrix.getObject("btnNextMonth") as Button;
 * let calNav: CalendarYear = Matrix.getObject("calNav") as CalendarYear;
 *
 * // 이전 월
 * btnPrevMonth.OnClick = function(sender, args) {
 *     let current = calNav.Date;
 *     let prevMonth = new Date(current.getFullYear(), current.getMonth() - 1, 1);
 *     calNav.Date = prevMonth;
 * };
 *
 * // 다음 월
 * btnNextMonth.OnClick = function(sender, args) {
 *     let current = calNav.Date;
 *     let nextMonth = new Date(current.getFullYear(), current.getMonth() + 1, 1);
 *     calNav.Date = nextMonth;
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 선택 가능 범위 제한 (최근 12개월)
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     let calRecent: CalendarYear = Matrix.getObject("calRecent") as CalendarYear;
 *
 *     // 이번 달부터 12개월 전까지만 선택 가능
 *     let today = new Date();
 *     let twelveMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 12, 1);
 *
 *     calRecent.MinDate = formatYearMonth(twelveMonthsAgo);  // "202301"
 *     calRecent.MaxDate = formatYearMonth(today);            // "202412"
 * };
 *
 * function formatYearMonth(date: Date): string {
 *     let year = date.getFullYear();
 *     let month = ("0" + (date.getMonth() + 1)).slice(-2);
 *     return year + month;
 * }
 *
 * //----------------------------------------------
 * // 패턴7: 월별 데이터 입력
 * //----------------------------------------------
 * let calInput: CalendarYear = Matrix.getObject("calInput") as CalendarYear;
 * let txtSales: TextBox = Matrix.getObject("txtSales") as TextBox;
 * let btnSaveMonthly: Button = Matrix.getObject("btnSaveMonthly") as Button;
 *
 * btnSaveMonthly.OnClick = function(sender, args) {
 *     if (!calInput.Value) {
 *         Matrix.Alert("연월을 선택하세요.");
 *         return;
 *     }
 *
 *     if (!txtSales.Text) {
 *         Matrix.Alert("매출액을 입력하세요.");
 *         return;
 *     }
 *
 *     // 월별 실적 저장
 *     let params = {
 *         VS_YEAR_MONTH: calInput.Value,  // "202401"
 *         VN_SALES: txtSales.Text
 *     };
 *
 *     Matrix.RunScript("", "SaveMonthlySalesService", params, function(p) {
 *         if (p.Success) {
 *             Matrix.Alert(calInput.Text + " 실적이 저장되었습니다.");
 *             txtSales.Text = "";
 *         }
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴8: 분기별 데이터 처리
 * //----------------------------------------------
 * let btnQ1: Button = Matrix.getObject("btnQ1") as Button;
 * let btnQ2: Button = Matrix.getObject("btnQ2") as Button;
 * let calQuarter: CalendarYear = Matrix.getObject("calQuarter") as CalendarYear;
 *
 * // 1분기 첫 달 선택 (1월)
 * btnQ1.OnClick = function(sender, args) {
 *     let year = new Date().getFullYear();
 *     calQuarter.Date = new Date(year, 0, 1);  // 1월
 *     Matrix.Alert("1분기 시작 월(1월)이 선택되었습니다.");
 * };
 *
 * // 2분기 첫 달 선택 (4월)
 * btnQ2.OnClick = function(sender, args) {
 *     let year = new Date().getFullYear();
 *     calQuarter.Date = new Date(year, 3, 1);  // 4월
 *     Matrix.Alert("2분기 시작 월(4월)이 선택되었습니다.");
 * };
 *
 * // 분기 계산 함수
 * calQuarter.OnValueChanged = function(sender, args) {
 *     let date = args.Date;
 *     let month = date.getMonth() + 1;
 *     let quarter = Math.ceil(month / 3);
 *
 *     Matrix.Alert("선택된 월은 " + quarter + "분기입니다.");
 * };
 * ```
 */
export interface CalendarYear extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyyMM"`)
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
   * 출력용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyy-MM"`)
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
   * 선택된 연월이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYear}
  */
  OnValueChanged : (sender : CalendarYear
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
