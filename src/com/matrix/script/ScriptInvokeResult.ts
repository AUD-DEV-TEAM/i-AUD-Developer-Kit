/**
* Invoke Result
*/
export interface ScriptInvokeResult{

  /** 
   * Error가 있는지 판단하는 메서드
   *
  */
  HasError(): boolean;

  /** 
   * Error 텍스트를 가져오는 메서드
   *
  */
  getError(): string;

  /** 
   * 값을 가져오는 메서드
   *
  */
  getValue(): any;

}
