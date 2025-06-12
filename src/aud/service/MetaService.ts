/**
* Meta Ajax 통신 객체
* @hidden
*/
export interface MetaService{

  /** 
   * 메타뷰 좌측트리의 조회 서비스
   *
  * @param option 
  * @param callBackFnc 
  */
  GetMenuList(option?: any, callBackFnc?: Function): void;

  /** 
   * 메타 보고서 조회 서비스
   *
  * @param option 
  * @param callBackFnc 
  */
  SearchReport(option?: any, callBackFnc?: Function): void;

}
