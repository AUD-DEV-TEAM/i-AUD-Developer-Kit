import { Control } from "../../aud/control/Control";
/**
 * 시작 연월과 종료 연월을 선택할 수 있는 기간 선택 달력 컨트롤입니다.
 *
 * 두 개의 달력을 통해 연월 범위를 선택하며,
 * {@link OnValueChanged} 이벤트를 통해 연월 기간 변경을 처리합니다.
 *
 * @example
 * ```ts
 * //----------------------------------------------
 * // 패턴1: 기본 연월 기간 선택 및 값 읽기
 * //----------------------------------------------
 * let calMonthRange: CalendarYearFromTo = Matrix.getObject("calMonthRange") as CalendarYearFromTo;
 *
 * calMonthRange.OnValueChanged = function(sender, args) {
 *     let fromMonth = args.Text;   // ViewFormat 형식 시작 연월 (예: "2024-01")
 *     let toMonth = args.Text2;    // ViewFormat 형식 종료 연월 (예: "2024-03")
 *
 *     // 월 수 계산
 *     let monthCount = calculateMonths(args.Date, args.Date2);
 *     Matrix.Alert("선택된 기간: " + monthCount + "개월 (" + fromMonth + " ~ " + toMonth + ")");
 * };
 *
 * function calculateMonths(from: Date, to: Date): number {
 *     let months = (to.getFullYear() - from.getFullYear()) * 12;
 *     months += to.getMonth() - from.getMonth();
 *     return months + 1;
 * }
 *
 * //----------------------------------------------
 * // 패턴2: 최근 3개월 기간으로 초기화
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     let calThreeMonths: CalendarYearFromTo = Matrix.getObject("calThreeMonths") as CalendarYearFromTo;
 *
 *     // 포맷 설정
 *     calThreeMonths.DataFormat = "yyyyMM";
 *     calThreeMonths.ViewFormat = "yyyy-MM";
 *
 *     // 이번 달
 *     let today = new Date();
 *     let thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
 *
 *     // 2개월 전
 *     let twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
 *
 *     calThreeMonths.FromDate = twoMonthsAgo;  // 시작 월
 *     calThreeMonths.ToDate = thisMonth;       // 종료 월 (이번 달)
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 월별 기간 조회
 * //----------------------------------------------
 * let btnMonthlySearch: Button = Matrix.getObject("btnMonthlySearch") as Button;
 * let calPeriod: CalendarYearFromTo = Matrix.getObject("calPeriod") as CalendarYearFromTo;
 * let grid: DataGrid = Matrix.getObject("DataGrid") as DataGrid;
 *
 * btnMonthlySearch.OnClick = function(sender, args) {
 *     if (!calPeriod.Value || !calPeriod.Value2) {
 *         Matrix.Alert("조회할 연월 기간을 선택하세요.");
 *         calPeriod.ShowPopup();
 *         return;
 *     }
 *
 *     // 각 월의 시작일과 종료일 계산
 *     let fromDate = calPeriod.FromDate;
 *     let fromFirst = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
 *
 *     let toDate = calPeriod.ToDate;
 *     let toLast = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0);
 *
 *     // 서버 스크립트 호출
 *     let params = {
 *         VS_FROM_MONTH: calPeriod.Value,         // "202401"
 *         VS_TO_MONTH: calPeriod.Value2,          // "202403"
 *         VS_FROM_DATE: formatDateToString(fromFirst),  // "20240101"
 *         VS_TO_DATE: formatDateToString(toLast)        // "20240331"
 *     };
 *
 *     Matrix.RunScript("", "GetMonthlyRangeReportService", params, function(p) {
 *         if (p.Success) {
 *             grid.SetDataSet(p.DataSet);
 *
 *             let monthCount = calculateMonths(calPeriod.FromDate, calPeriod.ToDate);
 *             Matrix.Alert(monthCount + "개월 데이터 조회 완료");
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
 * function calculateMonths(from: Date, to: Date): number {
 *     let months = (to.getFullYear() - from.getFullYear()) * 12;
 *     months += to.getMonth() - from.getMonth();
 *     return months + 1;
 * }
 *
 * //----------------------------------------------
 * // 패턴4: 최대 기간 제한 (최대 12개월)
 * //----------------------------------------------
 * let calLimit: CalendarYearFromTo = Matrix.getObject("calLimit") as CalendarYearFromTo;
 *
 * calLimit.OnValueChanged = function(sender, args) {
 *     let monthCount = calculateMonths(args.Date, args.Date2);
 *
 *     if (monthCount > 12) {
 *         Matrix.Alert("최대 12개월까지만 선택할 수 있습니다.");
 *
 *         // 시작 월 기준 12개월 후로 종료 월 자동 조정
 *         let maxTo = new Date(args.Date.getFullYear(), args.Date.getMonth() + 11, 1);
 *         sender.ToDate = maxTo;
 *     }
 * };
 *
 * function calculateMonths(from: Date, to: Date): number {
 *     let months = (to.getFullYear() - from.getFullYear()) * 12;
 *     months += to.getMonth() - from.getMonth();
 *     return months + 1;
 * }
 *
 * //----------------------------------------------
 * // 패턴5: 시작 연월 변경 시 종료 연월 자동 설정
 * //----------------------------------------------
 * let calAuto: CalendarYearFromTo = Matrix.getObject("calAuto") as CalendarYearFromTo;
 *
 * calAuto.OnFromValueChanged = function(sender, args) {
 *     // 시작 월 선택 시 자동으로 3개월 후를 종료 월로 설정
 *     let fromDate = args.Date;
 *     let toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 2, 1);
 *
 *     sender.ToDate = toDate;
 *     Matrix.Alert("3개월 기간으로 설정되었습니다.");
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 분기 빠른 선택
 * //----------------------------------------------
 * let btnQ1: Button = Matrix.getObject("btnQ1") as Button;
 * let btnQ2: Button = Matrix.getObject("btnQ2") as Button;
 * let calQuarter: CalendarYearFromTo = Matrix.getObject("calQuarter") as CalendarYearFromTo;
 *
 * // 1분기 선택 (1월~3월)
 * btnQ1.OnClick = function(sender, args) {
 *     let year = new Date().getFullYear();
 *     calQuarter.FromDate = new Date(year, 0, 1);   // 1월
 *     calQuarter.ToDate = new Date(year, 2, 1);     // 3월
 * };
 *
 * // 2분기 선택 (4월~6월)
 * btnQ2.OnClick = function(sender, args) {
 *     let year = new Date().getFullYear();
 *     calQuarter.FromDate = new Date(year, 3, 1);   // 4월
 *     calQuarter.ToDate = new Date(year, 5, 1);     // 6월
 * };
 *
 * //----------------------------------------------
 * // 패턴7: 회계연도 기간 선택
 * //----------------------------------------------
 * let btnFiscalYear: Button = Matrix.getObject("btnFiscalYear") as Button;
 * let calFiscal: CalendarYearFromTo = Matrix.getObject("calFiscal") as CalendarYearFromTo;
 *
 * btnFiscalYear.OnClick = function(sender, args) {
 *     let today = new Date();
 *     let currentMonth = today.getMonth() + 1;  // 1~12
 *
 *     // 회계연도 시작 (4월)
 *     let fiscalStartYear = currentMonth >= 4 ? today.getFullYear() : today.getFullYear() - 1;
 *     let fiscalStart = new Date(fiscalStartYear, 3, 1);  // 4월 1일
 *
 *     // 회계연도 종료 (다음 해 3월)
 *     let fiscalEnd = new Date(fiscalStartYear + 1, 2, 1);  // 3월 1일
 *
 *     calFiscal.FromDate = fiscalStart;
 *     calFiscal.ToDate = fiscalEnd;
 *     Matrix.Alert("회계연도 FY" + fiscalStartYear + " 기간이 설정되었습니다.");
 * };
 *
 * //----------------------------------------------
 * // 패턴8: 월 수 계산 및 트렌드 분석
 * //----------------------------------------------
 * let calTrend: CalendarYearFromTo = Matrix.getObject("calTrend") as CalendarYearFromTo;
 * let btnAnalyzeTrend: Button = Matrix.getObject("btnAnalyzeTrend") as Button;
 *
 * btnAnalyzeTrend.OnClick = function(sender, args) {
 *     if (!calTrend.Value || !calTrend.Value2) {
 *         Matrix.Alert("분석할 연월 기간을 선택하세요.");
 *         return;
 *     }
 *
 *     let monthCount = calculateMonths(calTrend.FromDate, calTrend.ToDate);
 *
 *     // 월별 데이터 조회 및 트렌드 분석
 *     let params = {
 *         VS_FROM_MONTH: calTrend.Value,
 *         VS_TO_MONTH: calTrend.Value2,
 *         VN_MONTH_COUNT: monthCount.toString()
 *     };
 *
 *     Matrix.RunScript("", "AnalyzeMonthlyTrendService", params, function(p) {
 *         if (p.Success) {
 *             Matrix.Alert(monthCount + "개월 트렌드 분석 완료");
 *             // 차트나 그리드에 결과 표시
 *         }
 *     });
 * };
 *
 * function calculateMonths(from: Date, to: Date): number {
 *     let months = (to.getFullYear() - from.getFullYear()) * 12;
 *     months += to.getMonth() - from.getMonth();
 *     return months + 1;
 * }
 * ```
 */
export interface CalendarYearFromTo extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyyMM"`)
  */
  DataFormat: string;

  /**
   * From(시작) 날짜를 `Date` 객체로 가져오거나 설정합니다.
  */
  FromDate: Date;

  /**
   * From(시작) 날짜를 {@link ViewFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  FromText: string;

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
   * To(종료) 달력 컨트롤의 이름을 가져옵니다.
  */
  Name2: string;

  /**
   * To(종료) 날짜를 `Date` 객체로 가져오거나 설정합니다.
  */
  ToDate: Date;

  /**
   * To(종료) 날짜를 {@link ViewFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  ToText: string;

  /**
   * From(시작) 날짜를 {@link DataFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  Value: string;

  /**
   * To(종료) 날짜를 {@link DataFormat} 형식의 문자열로 가져오거나 설정합니다.
  */
  Value2: string;

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
   * To(종료) 달력의 최대 선택 가능 날짜를 변경합니다.
   *
  * @param format MaxDate 형식 문자열 (컨트롤 속성의 [Validator] > [MaxDate] 항목과 동일한 형식)
  * @param measureDate 기준이 되는 날짜
  */
  SetToCalendarMaxDate(format: string, measureDate: Date): void;

  /**
   * 날짜 선택 팝업을 표시합니다.
   *
  */
  ShowPopup(): void;

  /**
   * @event
   *
   * From(시작) 연월이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYearFromTo}
  */
  OnFromValueChanged : (sender : CalendarYearFromTo
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * {@link ViewFormat} 형식의 From 날짜 문자열
    */
    Text: string
    /**
     * `Date` 객체 형식의 From 날짜
    */
    Date: Date
  }
  ) => void;


  /**
   * @event
   *
   * From(시작) 또는 To(종료) 연월이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYearFromTo}
  */
  OnValueChanged : (sender : CalendarYearFromTo
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * {@link ViewFormat} 형식의 From 날짜 문자열
    */
    Text: string
    /**
     * {@link ViewFormat} 형식의 To 날짜 문자열
    */
    Text2: string
    /**
     * `Date` 객체 형식의 From 날짜
    */
    Date: Date
    /**
     * `Date` 객체 형식의 To 날짜
    */
    Date2: Date
  }
  ) => void;


}
