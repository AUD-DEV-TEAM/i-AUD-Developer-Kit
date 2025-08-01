/**
* Invoke Result
*/
export interface ScriptInvokeResult{

  /** 
   *  
   *
  */
  HasError(): boolean;

  /** 
   *  
   *
  */
  getError(): string;

  /** 
   *  
   *
  */
  getValue(): any;

}
