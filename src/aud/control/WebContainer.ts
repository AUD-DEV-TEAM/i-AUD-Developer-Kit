import { Control } from "../../aud/control/Control";
/**
* html, jsp 등의 웹페이지를 담을 수 있습니다.
*/
export interface WebContainer extends Control{

  /**
   * 웹페이지 URL
  */
  URL: string;

  /** 
   * 웹페이지에 정의된 함수를 호출합니다.
   *
  * @param fnName 호출할 함수 이름
  * @param args 호출할 함수에 넘길 파라미터
  */
  CallInnerFunction(fnName: string, args: object): object;

  /** 
   * 브라우저 컴포넌트의 html document 객체를 반환 합니다.
   *
  */
  getDocument(): object;

  /** 
   * 브라우저 컴포넌트의 window 객체를 반환 합니다.
   *
  */
  getWindow(): object;

  /** 
   * 특정 페이지로 이동 합니다.
   *
  * @param url 대상 페이지 주소
  * @param postData POST 방식으로 로 전송할 파라미터 (생략할 경우 GET 방식으로 호출합니다.)
  */
  goPage(url: string, postData: object): void;

  /**
   * @event 
   *
   * 브라우저의 페이지가 로드완료 된 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link WebContainer}
  */
  OnPageLoad : (sender : WebContainer
  , args : { 
    /**
     * Form Id
    */
    Id: string
  }
  ) => void;


}
