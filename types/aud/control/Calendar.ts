import { Control } from "../../aud/control/Control";
/**
 * 일자를 선택할 수 있는 달력 컨트롤입니다.
 *
 * 날짜를 선택하고 포맷하는 기능을 제공하며,
 * {@link OnValueChanged} 이벤트를 통해 날짜 변경을 처리합니다.
 *
 * @example
 * ```js
 * //----------------------------------------------
 * // 패턴1: 기본 날짜 선택 및 값 읽기
 * //----------------------------------------------
 * var calStart = Matrix.getObject("calStart");
 *
 * // 날짜 변경 이벤트
 * calStart.OnValueChanged = function(sender, args) {
 *     Matrix.Alert("선택된 날짜: " + args.Text);
 *     // args.Date: Date 객체
 *     // args.Text: ViewFormat 형식 문자열 (예: "2024-01-15")
 * };
 *
 * // 현재 선택된 날짜 읽기
 * var selectedDate = calStart.Value;  // DataFormat 형식 (예: "20240115")
 * var displayDate = calStart.Text;    // ViewFormat 형식 (예: "2024-01-15")
 *
 * //----------------------------------------------
 * // 패턴2: 날짜 포맷 설정 및 초기값 지정
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     var calBirth = Matrix.getObject("calBirth");
 *
 *     // 데이터 저장용 포맷 (DB 저장 시 사용)
 *     calBirth.DataFormat = "yyyyMMdd";  // 20240115
 *
 *     // 화면 표시용 포맷
 *     calBirth.ViewFormat = "yyyy-MM-dd";  // 2024-01-15
 *
 *     // 초기 날짜 설정 (오늘 날짜)
 *     var today = new Date();
 *     calBirth.Date = today;
 *
 *     // 또는 문자열로 설정
 *     calBirth.Value = "20240115";  // DataFormat 형식
 * };
 *
 * //----------------------------------------------
 * // 패턴3: 날짜 범위 제한 (최소/최대 날짜)
 * //----------------------------------------------
 * var calReserve = Matrix.getObject("calReserve");
 *
 * // 오늘부터 30일 후까지만 선택 가능
 * var today = new Date();
 * var maxDate = new Date();
 * maxDate.setDate(today.getDate() + 30);
 *
 * calReserve.MinDate = formatDate(today);        // "20240115"
 * calReserve.MaxDate = formatDate(maxDate);      // "20240214"
 *
 * // 날짜 포맷 헬퍼 함수
 * function formatDate(date) {
 *     var year = date.getFullYear();
 *     var month = ("0" + (date.getMonth() + 1)).slice(-2);
 *     var day = ("0" + date.getDate()).slice(-2);
 *     return year + month + day;
 * }
 *
 * //----------------------------------------------
 * // 패턴4: 시작일/종료일 연동 처리
 * //----------------------------------------------
 * var calFrom = Matrix.getObject("calFrom");
 * var calTo = Matrix.getObject("calTo");
 *
 * // 시작일 변경 시 종료일 최소값 업데이트
 * calFrom.OnValueChanged = function(sender, args) {
 *     calTo.MinDate = sender.Value;  // 종료일은 시작일 이후만 선택 가능
 *
 *     // 종료일이 시작일보다 이전이면 자동 조정
 *     if (calTo.Value && calTo.Value < sender.Value) {
 *         calTo.Value = sender.Value;
 *     }
 * };
 *
 * // 종료일 변경 시 시작일 최대값 업데이트
 * calTo.OnValueChanged = function(sender, args) {
 *     calFrom.MaxDate = sender.Value;  // 시작일은 종료일 이전만 선택 가능
 * };
 *
 * //----------------------------------------------
 * // 패턴5: 검색 조건으로 날짜 사용
 * //----------------------------------------------
 * var btnSearch = Matrix.getObject("btnSearch");
 * var calSearchDate = Matrix.getObject("calSearchDate");
 * var grid = Matrix.getObject("DataGrid");
 *
 * btnSearch.OnClick = function(sender, args) {
 *     // 날짜가 선택되지 않은 경우 체크
 *     if (!calSearchDate.Value) {
 *         Matrix.Alert("조회 날짜를 선택하세요.");
 *         calSearchDate.ShowPopup();
 *         return;
 *     }
 *
 *     // 서버 스크립트 호출 (날짜를 DataFormat 형식으로 전달)
 *     var params = {
 *         VS_SEARCH_DATE: calSearchDate.Value  // "20240115"
 *     };
 *
 *     Matrix.RunScript("", "SearchByDateService", params, function(p) {
 *         if (p.Success) {
 *             grid.SetDataSet(p.DataSet);
 *         }
 *     });
 * };
 *
 * //----------------------------------------------
 * // 패턴6: 주말 강조 및 주차 표시
 * //----------------------------------------------
 * Matrix.OnDocumentLoadComplete = function(sender, args) {
 *     var calSchedule = Matrix.getObject("calSchedule");
 *
 *     // 토/일 강조 색상 적용
 *     calSchedule.HighlightWeekend = true;
 *
 *     // 주차 번호 표시
 *     calSchedule.UseWeekNumber = true;
 *
 *     // 월요일부터 시작 (0: 일요일, 1: 월요일)
 *     calSchedule.DisplayStartDayOfWeek = 1;
 *
 *     // 읽기 전용 설정 (조회만 가능)
 *     calSchedule.IsReadOnly = false;
 * };
 *
 * //----------------------------------------------
 * // 패턴7: 날짜 계산 및 자동 설정
 * //----------------------------------------------
 * var calContract = Matrix.getObject("calContract");
 * var calExpiry = Matrix.getObject("calExpiry");
 *
 * // 계약일 선택 시 만료일 자동 계산 (1년 후)
 * calContract.OnValueChanged = function(sender, args) {
 *     var contractDate = args.Date;
 *     var expiryDate = new Date(contractDate);
 *     expiryDate.setFullYear(expiryDate.getFullYear() + 1);  // 1년 추가
 *     expiryDate.setDate(expiryDate.getDate() - 1);          // 하루 전
 *
 *     calExpiry.Date = expiryDate;
 *     Matrix.Alert("만료일이 " + calExpiry.Text + "로 설정되었습니다.");
 * };
 *
 * //----------------------------------------------
 * // 패턴8: 달력 팝업 프로그래밍 방식 제어
 * //----------------------------------------------
 * var btnShowCal = Matrix.getObject("btnShowCal");
 * var btnHideCal = Matrix.getObject("btnHideCal");
 * var calEvent = Matrix.getObject("calEvent");
 *
 * // 팝업 표시
 * btnShowCal.OnClick = function(sender, args) {
 *     calEvent.ShowPopup();
 * };
 *
 * // 팝업 숨기기
 * btnHideCal.OnClick = function(sender, args) {
 *     calEvent.HidePopup();
 * };
 * ```
 */
export interface Calendar extends Control{

  /**
   * 데이터 저장용 날짜 포맷을 가져오거나 설정합니다. (예: `"yyyyMMdd"`)
   */
  DataFormat: string;

  /**
   * 선택된 날짜를 `Date` 객체로 가져오거나 설정합니다.
   */
  Date: Date;

  /**
   * 달력에서 요일 표시를 시작할 기준 요일을 가져오거나 설정합니다. (기본값: `0`, 일요일)
   */
  DisplayStartDayOfWeek: number;

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
   * 선택된 날짜를 {@link ViewFormat} 형식의 문자열로 가져오거나 설정합니다.
   */
  Text: string;

  /**
   * 달력에 각 행의 주차를 표시할지 여부를 가져오거나 설정합니다.
   */
  UseWeekNumber: boolean;

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
   * 선택된 날짜가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 달력 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Calendar}
   */
  OnValueChanged : (sender : Calendar
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

  /** 캘린더의 선택된 날짜 값을 배열로 반환합니다. */
  GetValue(): string[];
}
