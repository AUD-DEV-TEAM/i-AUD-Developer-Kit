import { Control } from "../../aud/control/Control";
/**
* Addin 컴포넌트 입니다.
*/
export interface AddIn extends Control{

  /**
   * 생성할 클래스 이름
  */
  ClassName: string;

  /** 
   * 로딩 된 라이브러리의 메인 객체를 반환합니다.
   *
  * @param clsName 메인 클래스 명
  */
  getScriptClass(clsName: string): any;

  /**
   * @event 
   *
   * View 모드에서 Addin의 로드된 라이브러리의 Component 객체가 생성된 후 발생합니다.
   *
   * @param args
   *
   * Parameter Info
  */
  OnComponentClassLoaded : (sender : AddIn
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
  }
  ) => void;


}
