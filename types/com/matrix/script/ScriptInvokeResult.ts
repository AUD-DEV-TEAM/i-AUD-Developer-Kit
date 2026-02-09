/**
* 메서드 호출 결과를 제공합니다.
*/
export interface ScriptInvokeResult{

  /**
   * 오류 발생 여부를 반환합니다.
   *
  */
  HasError(): boolean;

  /**
   * 오류 메시지를 반환합니다.
   *
  */
  getError(): string;

  /**
   * 결과 값을 반환합니다.
   *
  */
  getValue(): any;

}
