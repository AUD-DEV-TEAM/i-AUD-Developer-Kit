import { Control } from "../../aud/control/Control";
/**
 * 시작일과 종료일을 선택할 수 있는 기간 선택 달력 컨트롤입니다.
 *
 * 두 개의 달력을 통해 날짜 범위를 선택하며,
 * {@link OnValueChanged} 이벤트를 통해 기간 변경을 처리합니다.
 *
 * @example
 * ```js
 * //----------------------------------------------
 * // 패턴1: 기본 기간 선택 및 값 읽기
 * //----------------------------------------------
 * var calPeriod = Matrix.getObject("calPeriod");
 *
 * calPeriod.OnValueChanged = function(sender, args) {
 *     var fromDate = args.Text;   // ViewFormat 형식 시작일 (예: "2024-01-01")
 *     var toDate = args.Text2;    // ViewFormat 형식 종료일 (예: "2024-01-31")
 *
 *     Matrix.Alert("선택 기간: " + fromDate + " ~ " + toDate);
 * };
 *
 * // 현재 선택된 기간 읽기
 * var startDate = calPeriod.Value;   // DataFormat 형식 (예: "20240101")
 * var endDate = calPeriod.Value2;    // DataFormat 형식 (예: "20240131")
 *
 * //----------------------------------------------
 * // 패턴2: 초기 기간 설정 (당월 1일~말일)
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     var calMonth = Matrix.getObject("calMonth");
 *
 *     // 포맷 설정
 *     calMonth.DataFormat = "yyyyMMdd";
 *     calMonth.ViewFormat = "yyyy-MM-dd";
 *
 *     // 당월 1일
 *     var today = new Date();
 *     var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
 *
 *     // 당월 말일
 *     var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
 *
 *     calMonth.FromDate = firstDay;
 *     calMonth.ToDate = lastDay;
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 기간 검색 조건으로 사용
 * //----------------------------------------------
 * var btnSearch = Matrix.getObject("btnSearch");
 * var calRange = Matrix.getObject("calRange");
 * var grid = Matrix.getObject("DataGrid");
 *
 * btnSearch.OnClick = function(sender, args) {
 *     // 기간 유효성 검증
 *     if (!calRange.Value || !calRange.Value2) {
 *         Matrix.Alert("조회 기간을 선택하세요.");
 *         calRange.ShowPopup();
 *         return;
 *     }
 *
 *     // 서버 스크립트 호출
 *     var params = {
 *         VS_FROM_DATE: calRange.Value,   // "20240101"
 *         VS_TO_DATE: calRange.Value2     // "20240131"
 *     };
 *
 *     Matrix.RunScript("", "SearchByPeriodService", params, function(p) {
 *         if (p.Success) {
 *             grid.SetDataSet(p.DataSet);
 *
 *             // 기간 일수 계산
 *             var days = calculateDays(calRange.FromDate, calRange.ToDate);
 *             Matrix.Alert("조회 완료 (" + days + "일간)");
 *         }
 *     });
 * };
 *
 * function calculateDays(from, to) {
 *     var diff = to.getTime() - from.getTime();
 *     return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
 * }
 *
 * //----------------------------------------------
 * // 패턴4: 최대 기간 제한 (최대 31일)
 * //----------------------------------------------
 * var calLimit = Matrix.getObject("calLimit");
 *
 * calLimit.OnValueChanged = function(sender, args) {
 *     var from = args.Date;
 *     var to = args.Date2;
 *
 *     // 기간 일수 계산
 *     var diffDays = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
 *
 *     if (diffDays > 31) {
 *         Matrix.Alert("최대 31일까지만 선택할 수 있습니다.");
 *
 *         // 시작일 기준 31일 후로 종료일 자동 조정
 *         var maxTo = new Date(from);
 *         maxTo.setDate(maxTo.getDate() + 31);
 *         sender.ToDate = maxTo;
 *     }
 * };
 *
 * //----------------------------------------------
 * // 패턴5: 시작일 변경 시 종료일 자동 설정
 * //----------------------------------------------
 * var calAuto = Matrix.getObject("calAuto");
 *
 * calAuto.OnFromValueChanged = function(sender, args) {
 *     // 시작일 선택 시 자동으로 7일 후를 종료일로 설정
 *     var fromDate = args.Date;
 *     var toDate = new Date(fromDate);
 *     toDate.setDate(toDate.getDate() + 6);  // 7일간 (시작일 포함)
 *
 *     sender.ToDate = toDate;
 *     Matrix.Alert("기간이 7일로 설정되었습니다.");
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 종료일 최대값 동적 제어
 * //----------------------------------------------
 * var calDynamic = Matrix.getObject("calDynamic");
 *
 * calDynamic.OnFromValueChanged = function(sender, args) {
 *     // 시작일 기준 90일 후까지만 종료일 선택 가능
 *     var fromDate = args.Date;
 *
 *     // SetToCalendarMaxDate 사용
 *     // format: "3M" (3개월), "90D" (90일), "1Y" (1년)
 *     sender.SetToCalendarMaxDate("90D", fromDate);
 * };
 *
 * //----------------------------------------------
 * // 패턴7: 분기/반기 빠른 선택
 * //----------------------------------------------
 * var btnQ1 = Matrix.getObject("btnQ1");
 * var btnQ2 = Matrix.getObject("btnQ2");
 * var calQuarter = Matrix.getObject("calQuarter");
 *
 * // 1분기 선택 (1월~3월)
 * btnQ1.OnClick = function(sender, args) {
 *     var year = new Date().getFullYear();
 *     calQuarter.FromDate = new Date(year, 0, 1);   // 1월 1일
 *     calQuarter.ToDate = new Date(year, 2, 31);    // 3월 31일
 * };
 *
 * // 2분기 선택 (4월~6월)
 * btnQ2.OnClick = function(sender, args) {
 *     var year = new Date().getFullYear();
 *     calQuarter.FromDate = new Date(year, 3, 1);   // 4월 1일
 *     calQuarter.ToDate = new Date(year, 5, 30);    // 6월 30일
 * };
 *
 * //----------------------------------------------
 * // 패턴8: 선택 가능 범위 제한
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     var calRestrict = Matrix.getObject("calRestrict");
 *
 *     // 전년도 1월 1일부터 오늘까지만 선택 가능
 *     var today = new Date();
 *     var lastYear = new Date(today.getFullYear() - 1, 0, 1);
 *
 *     calRestrict.MinDate = formatDate(lastYear);  // "20230101"
 *     calRestrict.MaxDate = formatDate(today);     // "20240115"
 *
 *     // 주말 강조
 *     calRestrict.HighlightWeekend = true;
 *
 *     // 주차 표시
 *     calRestrict.UseWeekNumber = true;
 * };
 *
 * function formatDate(date) {
 *     var year = date.getFullYear();
 *     var month = ("0" + (date.getMonth() + 1)).slice(-2);
 *     var day = ("0" + date.getDate()).slice(-2);
 *     return year + month + day;
 * }
 * ```
 */
export interface CalendarFromTo extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyyMMdd"`)
   */
  DataFormat: string;

  /**
   * 달력에서 요일 표시를 시작할 기준 요일을 가져오거나 설정합니다. (기본값: `0`, 일요일)
   */
  DisplayStartDayOfWeek: number;

  /**
   * From(시작) 날짜를 `Date` 객체로 가져오거나 설정합니다.
   */
  FromDate: Date;

  /**
   * From(시작) 날짜를 {@link ViewFormat} 형식의 문자열로 가져오거나 설정합니다.
   */
  FromText: string;

  /**
   * 토/일 강조 색상 적용 여부를 가져오거나 설정합니다.
   */
  HighlightWeekend: boolean;

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
   * 달력에 각 행의 주차를 표시할지 여부를 가져오거나 설정합니다.
   */
  UseWeekNumber: boolean;

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
   * From(시작) 날짜가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarFromTo}
   */
  OnFromValueChanged : (sender : CalendarFromTo
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
   * From(시작) 또는 To(종료) 날짜가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarFromTo}
   */
  OnValueChanged : (sender : CalendarFromTo
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
