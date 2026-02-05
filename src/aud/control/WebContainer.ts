import { Control } from "../../aud/control/Control";
/**
 * HTML, JSP 등의 웹페이지를 담을 수 있는 컨트롤입니다.
 */
export interface WebContainer extends Control {

  /**
   * 웹페이지 URL을 가져오거나 설정합니다.
   */
  URL: string;

  /**
   * 웹페이지에 정의된 함수를 호출합니다.
   *
   * @param fnName 호출할 함수 이름
   * @param args 호출할 함수에 넘길 파라미터
   */
  CallInnerFunction(fnName: string, args: any): any;

  /**
   * 브라우저 컴포넌트의 HTML Document 객체를 반환합니다.
   *
   */
  getDocument(): Document | null;

  /**
   * 브라우저 컴포넌트의 Window 객체를 반환합니다.
   *
   */
  getWindow(): Window | null;

  /**
   * 특정 페이지로 이동합니다.
   *
   * @param url 대상 페이지 주소
   * @param postData POST 방식으로 전송할 파라미터 (생략할 경우 GET 방식으로 호출합니다.)
   */
  goPage(url: string, postData?: object): void;

  /**
   * @event
   *
   * 브라우저의 페이지가 로드 완료된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 웹 컨테이너 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link WebContainer}
   */
  OnPageLoad: (sender: WebContainer
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
    }
  ) => void;


}
