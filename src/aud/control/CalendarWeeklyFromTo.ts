import { Control } from "../../aud/control/Control";
/**
 * 시작 주와 종료 주를 선택할 수 있는 기간 선택 달력 컨트롤입니다.
 *
 * 두 개의 달력을 통해 주 단위 범위를 선택하며,
 * {@link OnValueChanged} 이벤트를 통해 주 기간 변경을 처리합니다.
 *
 * @example
 * ```js
 * //----------------------------------------------
 * // 패턴1: 기본 주 기간 선택 및 값 읽기
 * //----------------------------------------------
 * var calWeekRange = Matrix.getObject("calWeekRange");
 *
 * calWeekRange.OnValueChanged = function(sender, args) {
 *     var fromWeek = args.Text;   // ViewFormat 형식 시작 주 (예: "2024-01-08")
 *     var toWeek = args.Text2;    // ViewFormat 형식 종료 주 (예: "2024-01-22")
 *
 *     // 주 수 계산
 *     var weekCount = calculateWeeks(args.Date, args.Date2);
 *     Matrix.Alert("선택된 기간: " + weekCount + "주간 (" + fromWeek + " ~ " + toWeek + ")");
 * };
 *
 * function calculateWeeks(from, to) {
 *     var diffDays = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
 *     return Math.floor(diffDays / 7) + 1;
 * }
 *
 * //----------------------------------------------
 * // 패턴2: 최근 4주 기간으로 초기화
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     var calFourWeeks = Matrix.getObject("calFourWeeks");
 *
 *     // 포맷 설정
 *     calFourWeeks.DataFormat = "yyyyMMdd";
 *     calFourWeeks.ViewFormat = "yyyy-MM-dd";
 *
 *     // 이번 주 월요일
 *     var today = new Date();
 *     var dayOfWeek = today.getDay();
 *     var thisMonday = new Date(today);
 *     thisMonday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
 *
 *     // 3주 전 월요일
 *     var threeWeeksAgo = new Date(thisMonday);
 *     threeWeeksAgo.setDate(thisMonday.getDate() - 21);
 *
 *     calFourWeeks.FromDate = threeWeeksAgo;  // 시작 주
 *     calFourWeeks.ToDate = thisMonday;       // 종료 주 (이번 주)
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 주간 보고서 범위 조회
 * //----------------------------------------------
 * var btnWeeklySearch = Matrix.getObject("btnWeeklySearch");
 * var calReportRange = Matrix.getObject("calReportRange");
 * var grid = Matrix.getObject("DataGrid");
 *
 * btnWeeklySearch.OnClick = function(sender, args) {
 *     if (!calReportRange.Value || !calReportRange.Value2) {
 *         Matrix.Alert("조회할 주 기간을 선택하세요.");
 *         calReportRange.ShowPopup();
 *         return;
 *     }
 *
 *     // 각 주의 종료일 계산
 *     var fromEnd = new Date(calReportRange.FromDate);
 *     fromEnd.setDate(fromEnd.getDate() + 6);
 *
 *     var toEnd = new Date(calReportRange.ToDate);
 *     toEnd.setDate(toEnd.getDate() + 6);
 *
 *     // 서버 스크립트 호출
 *     var params = {
 *         VS_FROM_DATE: calReportRange.Value,         // 시작 주 월요일 "20240108"
 *         VS_TO_DATE: formatDateToString(toEnd)       // 종료 주 일요일 "20240128"
 *     };
 *
 *     Matrix.RunScript("", "GetWeeklyRangeReportService", params, function(p) {
 *         if (p.Success) {
 *             grid.SetDataSet(p.DataSet);
 *
 *             var weekCount = calculateWeeks(calReportRange.FromDate, calReportRange.ToDate);
 *             Matrix.Alert(weekCount + "주간 데이터 조회 완료");
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
 * function calculateWeeks(from, to) {
 *     var diffDays = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
 *     return Math.floor(diffDays / 7) + 1;
 * }
 *
 * //----------------------------------------------
 * // 패턴4: 최대 12주까지만 선택 가능
 * //----------------------------------------------
 * var calLimit = Matrix.getObject("calLimit");
 *
 * calLimit.OnValueChanged = function(sender, args) {
 *     var weekCount = calculateWeeks(args.Date, args.Date2);
 *
 *     if (weekCount > 12) {
 *         Matrix.Alert("최대 12주까지만 선택할 수 있습니다.");
 *
 *         // 시작 주 기준 12주 후로 종료 주 자동 조정
 *         var maxTo = new Date(args.Date);
 *         maxTo.setDate(maxTo.getDate() + (11 * 7));  // 12주 = 시작 주 + 11주
 *         sender.ToDate = maxTo;
 *     }
 * };
 *
 * function calculateWeeks(from, to) {
 *     var diffDays = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
 *     return Math.floor(diffDays / 7) + 1;
 * }
 *
 * //----------------------------------------------
 * // 패턴5: 시작 주 변경 시 종료 주 자동 설정
 * //----------------------------------------------
 * var calAuto = Matrix.getObject("calAuto");
 *
 * calAuto.OnFromValueChanged = function(sender, args) {
 *     // 시작 주 선택 시 자동으로 4주 후를 종료 주로 설정
 *     var fromDate = args.Date;
 *     var toDate = new Date(fromDate);
 *     toDate.setDate(toDate.getDate() + (3 * 7));  // 4주간
 *
 *     sender.ToDate = toDate;
 *     Matrix.Alert("4주 기간으로 설정되었습니다.");
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 종료 주 최대값 동적 제어
 * //----------------------------------------------
 * var calDynamic = Matrix.getObject("calDynamic");
 *
 * calDynamic.OnFromValueChanged = function(sender, args) {
 *     // 시작 주 기준 8주 후까지만 종료 주 선택 가능
 *     var fromDate = args.Date;
 *
 *     // SetToCalendarMaxDate 사용
 *     // format: "8W" (8주), "2M" (2개월)
 *     sender.SetToCalendarMaxDate("8W", fromDate);
 * };
 *
 * //----------------------------------------------
 * // 패턴7: 월별 주차 선택 (해당 월의 모든 주)
 * //----------------------------------------------
 * var btnJan = Matrix.getObject("btnJan");
 * var btnFeb = Matrix.getObject("btnFeb");
 * var calMonth = Matrix.getObject("calMonth");
 *
 * // 1월의 모든 주 선택
 * btnJan.OnClick = function(sender, args) {
 *     var year = new Date().getFullYear();
 *
 *     // 1월 1일이 속한 주의 월요일
 *     var jan1 = new Date(year, 0, 1);
 *     var dayOfWeek = jan1.getDay();
 *     var firstMonday = new Date(jan1);
 *     firstMonday.setDate(jan1.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
 *
 *     // 1월 31일이 속한 주의 월요일
 *     var jan31 = new Date(year, 0, 31);
 *     dayOfWeek = jan31.getDay();
 *     var lastMonday = new Date(jan31);
 *     lastMonday.setDate(jan31.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
 *
 *     calMonth.FromDate = firstMonday;
 *     calMonth.ToDate = lastMonday;
 * };
 *
 * //----------------------------------------------
 * // 패턴8: 분기별 주차 분석
 * //----------------------------------------------
 * var calQuarter = Matrix.getObject("calQuarter");
 * var btnAnalyze = Matrix.getObject("btnAnalyze");
 *
 * btnAnalyze.OnClick = function(sender, args) {
 *     if (!calQuarter.Value || !calQuarter.Value2) {
 *         Matrix.Alert("분석할 주 기간을 선택하세요.");
 *         return;
 *     }
 *
 *     var weekCount = calculateWeeks(calQuarter.FromDate, calQuarter.ToDate);
 *
 *     // 주차별 데이터 조회 및 집계
 *     var params = {
 *         VS_FROM_DATE: calQuarter.Value,
 *         VS_TO_DATE: calQuarter.Value2,
 *         VN_WEEK_COUNT: weekCount.toString()
 *     };
 *
 *     Matrix.RunScript("", "AnalyzeWeeklyTrendService", params, function(p) {
 *         if (p.Success) {
 *             Matrix.Alert(weekCount + "주간 트렌드 분석 완료");
 *             // 차트나 그리드에 결과 표시
 *         }
 *     });
 * };
 *
 * function calculateWeeks(from, to) {
 *     var diffDays = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
 *     return Math.floor(diffDays / 7) + 1;
 * }
 * ```
 */
export interface CalendarWeeklyFromTo extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyyMMdd"`)
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
   * 출력용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyy-MM-dd"`)
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
   * From(시작) 주가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarWeeklyFromTo}
   */
  OnFromValueChanged : (sender : CalendarWeeklyFromTo
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
   * From(시작) 또는 To(종료) 주가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarWeeklyFromTo}
   */
  OnValueChanged : (sender : CalendarWeeklyFromTo
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
