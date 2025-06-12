/**
* 사용자 입력에 대한 이벤트 모델을 제공합니다.
*/
export interface Event{

  /**
   * 이벤트 키코드 예) 13 : Enter
  */
   readonly keyCode: number;

  /** 
   * Enter
   *
  */
  isEnter(): boolean;

  /** 
   * Space
   *
  */
  isSpace(): boolean;

}
