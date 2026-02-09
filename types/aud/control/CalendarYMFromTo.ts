import { Control } from "../../aud/control/Control";
/**
 * 시작 연도와 종료 연도를 선택할 수 있는 기간 선택 달력 컨트롤입니다.
 *
 * 두 개의 달력을 통해 연도 범위를 선택하며,
 * {@link OnValueChanged} 이벤트를 통해 연도 기간 변경을 처리합니다.
 *
 * @example
 * ```js
 * //----------------------------------------------
 * // 패턴1: 기본 연도 기간 선택 및 값 읽기
 * //----------------------------------------------
 * var calYearRange = Matrix.getObject("calYearRange");
 *
 * calYearRange.OnValueChanged = function(sender, args) {
 *     var fromYear = args.Text;   // ViewFormat 형식 시작 연도 (예: "2020")
 *     var toYear = args.Text2;    // ViewFormat 형식 종료 연도 (예: "2024")
 *
 *     // 년 수 계산
 *     var yearCount = parseInt(toYear) - parseInt(fromYear) + 1;
 *     Matrix.Alert("선택된 기간: " + yearCount + "년간 (" + fromYear + " ~ " + toYear + ")");
 * };
 *
 * //----------------------------------------------
 * // 패턴2: 최근 3년 기간으로 초기화
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     var calThreeYears = Matrix.getObject("calThreeYears");
 *
 *     // 포맷 설정
 *     calThreeYears.DataFormat = "yyyy";
 *     calThreeYears.ViewFormat = "yyyy";
 *
 *     // 올해
 *     var today = new Date();
 *     var thisYear = new Date(today.getFullYear(), 0, 1);
 *
 *     // 2년 전
 *     var twoYearsAgo = new Date(today.getFullYear() - 2, 0, 1);
 *
 *     calThreeYears.FromDate = twoYearsAgo;  // 시작 연도
 *     calThreeYears.ToDate = thisYear;       // 종료 연도 (올해)
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 연도별 기간 조회
 * //----------------------------------------------
 * var btnYearlySearch = Matrix.getObject("btnYearlySearch");
 * var calPeriod = Matrix.getObject("calPeriod");
 * var grid = Matrix.getObject("DataGrid");
 *
 * btnYearlySearch.OnClick = function(sender, args) {
 *     if (!calPeriod.Value || !calPeriod.Value2) {
 *         Matrix.Alert("조회할 연도 기간을 선택하세요.");
 *         calPeriod.ShowPopup();
 *         return;
 *     }
 *
 *     // 각 연도의 시작일과 종료일 계산
 *     var fromYear = parseInt(calPeriod.Value);
 *     var fromFirst = new Date(fromYear, 0, 1);
 *
 *     var toYear = parseInt(calPeriod.Value2);
 *     var toLast = new Date(toYear, 11, 31);
 *
 *     // 서버 스크립트 호출
 *     var params = {
 *         VS_FROM_YEAR: calPeriod.Value,         // "2020"
 *         VS_TO_YEAR: calPeriod.Value2,          // "2024"
 *         VS_FROM_DATE: formatDateToString(fromFirst),  // "20200101"
 *         VS_TO_DATE: formatDateToString(toLast)        // "20241231"
 *     };
 *
 *     Matrix.RunScript("", "GetYearlyRangeReportService", params, function(p) {
 *         if (p.Success) {
 *             grid.SetDataSet(p.DataSet);
 *
 *             var yearCount = toYear - fromYear + 1;
 *             Matrix.Alert(yearCount + "년간 데이터 조회 완료");
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
 * // 패턴4: 최대 기간 제한 (최대 5년)
 * //----------------------------------------------
 * var calLimit = Matrix.getObject("calLimit");
 *
 * calLimit.OnValueChanged = function(sender, args) {
 *     var fromYear = parseInt(args.Text);
 *     var toYear = parseInt(args.Text2);
 *     var yearCount = toYear - fromYear + 1;
 *
 *     if (yearCount > 5) {
 *         Matrix.Alert("최대 5년까지만 선택할 수 있습니다.");
 *
 *         // 시작 연도 기준 5년 후로 종료 연도 자동 조정
 *         var maxTo = new Date(args.Date.getFullYear() + 4, 0, 1);
 *         sender.ToDate = maxTo;
 *     }
 * };
 *
 * //----------------------------------------------
 * // 패턴5: 시작 연도 변경 시 종료 연도 자동 설정
 * //----------------------------------------------
 * var calAuto = Matrix.getObject("calAuto");
 *
 * calAuto.OnFromValueChanged = function(sender, args) {
 *     // 시작 연도 선택 시 자동으로 3년 후를 종료 연도로 설정
 *     var fromYear = args.Date.getFullYear();
 *     var toDate = new Date(fromYear + 2, 0, 1);
 *
 *     sender.ToDate = toDate;
 *     Matrix.Alert("3년 기간으로 설정되었습니다.");
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 장기 트렌드 분석
 * //----------------------------------------------
 * var calTrend = Matrix.getObject("calTrend");
 * var btnAnalyzeLongTerm = Matrix.getObject("btnAnalyzeLongTerm");
 * var chart = Matrix.getObject("Chart");
 *
 * btnAnalyzeLongTerm.OnClick = function(sender, args) {
 *     if (!calTrend.Value || !calTrend.Value2) {
 *         Matrix.Alert("분석할 연도 기간을 선택하세요.");
 *         return;
 *     }
 *
 *     var fromYear = parseInt(calTrend.Value);
 *     var toYear = parseInt(calTrend.Value2);
 *     var yearCount = toYear - fromYear + 1;
 *
 *     // 장기 트렌드 데이터 조회
 *     var params = {
 *         VS_FROM_YEAR: calTrend.Value,
 *         VS_TO_YEAR: calTrend.Value2,
 *         VN_YEAR_COUNT: yearCount.toString()
 *     };
 *
 *     Matrix.RunScript("", "AnalyzeLongTermTrendService", params, function(p) {
 *         if (p.Success) {
 *             chart.SetDataSet(p.DataSet);
 *             Matrix.Alert(yearCount + "년간 장기 트렌드 분석 완료");
 *         }
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴7: 다년간 데이터 비교
 * //----------------------------------------------
 * var calCompare = Matrix.getObject("calCompare");
 * var btnCompare = Matrix.getObject("btnCompare");
 * var grid = Matrix.getObject("DataGrid");
 *
 * btnCompare.OnClick = function(sender, args) {
 *     if (!calCompare.Value || !calCompare.Value2) {
 *         Matrix.Alert("비교할 연도 기간을 선택하세요.");
 *         return;
 *     }
 *
 *     var fromYear = parseInt(calCompare.Value);
 *     var toYear = parseInt(calCompare.Value2);
 *
 *     // 연도별 데이터를 배열로 조회하여 비교
 *     var yearList = [];
 *     for (var year = fromYear; year <= toYear; year++) {
 *         yearList.push(year.toString());
 *     }
 *
 *     var params = {
 *         VS_YEAR_LIST: yearList.join(","),  // "2020,2021,2022,2023,2024"
 *         VS_FROM_YEAR: calCompare.Value,
 *         VS_TO_YEAR: calCompare.Value2
 *     };
 *
 *     Matrix.RunScript("", "CompareMultiYearService", params, function(p) {
 *         if (p.Success) {
 *             grid.SetDataSet(p.DataSet);
 *             Matrix.Alert(yearList.length + "년간 비교 분석 완료");
 *         }
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴8: 연도 범위 검증
 * //----------------------------------------------
 * var calValidate = Matrix.getObject("calValidate");
 * var btnValidate = Matrix.getObject("btnValidate");
 *
 * btnValidate.OnClick = function(sender, args) {
 *     if (!calValidate.Value || !calValidate.Value2) {
 *         Matrix.Alert("연도 기간을 선택하세요.");
 *         return;
 *     }
 *
 *     var fromYear = parseInt(calValidate.Value);
 *     var toYear = parseInt(calValidate.Value2);
 *     var yearCount = toYear - fromYear + 1;
 *
 *     // 검증: 미래 연도 선택 불가
 *     var currentYear = new Date().getFullYear();
 *     if (toYear > currentYear) {
 *         Matrix.Alert("미래 연도는 선택할 수 없습니다.");
 *         calValidate.ToDate = new Date(currentYear, 0, 1);
 *         return;
 *     }
 *
 *     // 검증: 최소 2년 이상
 *     if (yearCount < 2) {
 *         Matrix.Alert("최소 2년 이상의 기간을 선택하세요.");
 *         return;
 *     }
 *
 *     // 검증: 최대 10년까지
 *     if (yearCount > 10) {
 *         Matrix.Alert("최대 10년까지만 선택할 수 있습니다.");
 *         var maxTo = new Date(fromYear + 9, 0, 1);
 *         calValidate.ToDate = maxTo;
 *         return;
 *     }
 *
 *     Matrix.Alert("검증 통과: " + yearCount + "년 기간이 선택되었습니다.");
 * };
 * ```
 */
export interface CalendarYMFromTo extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyy"`)
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
   * 출력용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyy"`)
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
   * From(시작) 연도가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYMFromTo}
  */
  OnFromValueChanged : (sender : CalendarYMFromTo
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
   * From(시작) 또는 To(종료) 연도가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CalendarYMFromTo}
  */
  OnValueChanged : (sender : CalendarYMFromTo
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
