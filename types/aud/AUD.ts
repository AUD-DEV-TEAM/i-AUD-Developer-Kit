import { GlobalConfig } from "../aud/data/GlobalConfig";
import { GlobalParam } from "../aud/common/GlobalParam";
import { ScriptDateUtil } from "../aud/util/ScriptDateUtil";
import { BoxStyleList } from "../aud/drawing/BoxStyleList";
/**
 * i-AUD 플랫폼의 최상위 전역 객체입니다.
 *
 * 보고서 클라이언트 스크립트에서 `_AUD_` 전역 변수로 접근할 수 있으며,
 * 서비스 호출, 전역 설정, 뷰어 관리, 다국어, REST API 호출 등의 기능을 제공합니다.
 *
 * @example
 * ```ts
 * // 전역 설정 조회
 * let contextPath = _AUD_.GlobalConfig.CONTEXT_PATH;
 *
 * // 전역 파라미터 조회
 * let userCode = _AUD_.GlobalParam.GetValue("VS_USER_CODE");
 *
 * // 다국어 텍스트 조회
 * let msg = _AUD_.Trans("Message.Info.Save");
 *
 * // REST API 호출
 * _AUD_.CallRestAPI("/api/custom/getData", { param1: "value1" }, function(result) {
 *     if (result.Success) {
 *         console.log(result.Result);
 *     }
 * });
 *
 * // 보고서 다국어 조회
 * let label = _AUD_.GetLanguage("LABEL_001", "기본값");
 *
 * // 외부 스크립트 로드
 * _AUD_.ImportScript("https://cdn.example.com/lib.js", function() {
 *     console.log("스크립트 로드 완료");
 * });
 * ```
 */
export interface AUD {

  /**
   * 전역 설정(GlobalConfig) 객체를 반환합니다.
   *
   * 서버에서 전달받은 컨텍스트 경로, MAF 경로, 프로토콜 등의 설정 정보에 접근할 수 있습니다.
   *
   * @example
   * ```js
   * var contextPath = _AUD_.GlobalConfig.CONTEXT_PATH;
   * var protocol = _AUD_.GlobalConfig.PROTOCOL;
   * ```
   */
  readonly GlobalConfig: GlobalConfig;

  /**
   * 전역 파라미터(GlobalParam) 객체를 반환합니다.
   *
   * 보고서에서 공통으로 사용하는 전역 변수(VS_/VN_ 접두사)에 접근하거나 추가할 수 있습니다.
   *
   * @example
   * ```js
   * // 전역 파라미터 값 조회
   * var userCode = _AUD_.GlobalParam.GetValue("VS_USER_CODE");
   *
   * // 전역 파라미터 추가
   * _AUD_.GlobalParam.Add("VS_CUSTOM", "값", 1);
   * ```
   */
  readonly GlobalParam: GlobalParam;
 

  /**
   * ScriptDateUtil 유틸리티 객체입니다.
   *
   * 날짜 관련 유틸리티 함수를 제공합니다.
   */
  readonly ScriptDateUtil: ScriptDateUtil;

  /**
   * 박스 스타일 목록(BoxStyleList) 객체를 반환합니다.
   *
   * 키 또는 이름으로 BoxStyle을 조회하거나 새로 생성할 수 있습니다.
   *
   * @example
   * ```js
   * var boxStyle = _AUD_.BoxStyleList.Get("BXD42C71B0275149C4BB6B74FD68B7C8E4");
   * var btnStyle = _AUD_.BoxStyleList.GetItemByStyleName("Button Default");
   * ```
   */
  readonly BoxStyleList: BoxStyleList;

  /**
   * 제품 다국어(i18n JSON 파일에 정의된 것)를 조회합니다.
   *
   * @param code 다국어 코드
   * @param option 다국어 처리 변수('{{변수}}') 값
   * @returns 다국어 텍스트
   *
   * @example
   * ```js
   * var msg = _AUD_.Trans("Message.Info.Save");
   * var formatted = _AUD_.Trans("Message.Confirm.Delete", { name: "항목1" });
   * ```
   */
  Trans(code: string, option?: any): string;

  /**
   * 보고서 다국어를 조회합니다.
   *
   * 보고서에 설정된 다국어 리소스에서 키에 해당하는 값을 반환합니다.
   *
   * @param key 다국어 코드
   * @param defaultValue 코드에 맞는 값이 없을 경우 반환할 기본값
   * @returns 다국어 텍스트 또는 기본값
   *
   * @example
   * ```js
   * var label = _AUD_.GetLanguage("LABEL_TITLE", "제목");
   * ```
   */
  GetLanguage(key: string, defaultValue?: string): string;

  /**
   * AUD 옵션 값을 조회합니다.
   *
   * @param optionName 옵션 이름
   * @param defaultValue 옵션이 없을 경우 반환할 기본값
   * @returns 옵션 값
   *
   * @example
   * ```js
   * var useProgress = _AUD_.GetAUDOption("UseProgressFocus", true);
   * ```
   */
  GetAUDOption(optionName: string, defaultValue: any): any;
 

  /**
   * 메인 Viewer 객체를 반환합니다.
   *
   * @param viewerId 특정 Viewer ID (생략 시 첫 번째 Viewer 반환)
   * @returns Viewer 객체
   */
  GetMainViewer(viewerId?: string): any;

  /**
   * 지정한 ID의 Viewer 객체를 반환합니다.
   *
   * @param viewerId Viewer ID
   * @returns Viewer 객체
   */
  GetViewer(viewerId: string): any;

  /**
   * 현재 활성 Viewer 객체를 반환합니다.
   *
   * @returns 활성 Viewer 객체
   */
  GetActiveViewer(): any;
 

  /**
   * 외부에서 전달받은 커스텀 파라미터를 설정합니다.
   *
   * @param params 파라미터 배열 ({ KEY: string, VALUE: string }[])
   * @param encrypted 암호화 여부
   */
  SetCustomParams(params: { KEY: string, VALUE: string }[], encrypted?: boolean): void;
  
}
