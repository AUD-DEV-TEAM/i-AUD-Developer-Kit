/**
* Property 컨트롤
*/
export interface Property{

  /** 
   * Property 의 Section 에 들어갈 목록을 설정
   *
  * @param properties Property 의 Section 에 들어갈 목록
  */
  SetProperties(properties: any): void;

  /** 
   * Property 의 Section 목록을 설정
   *
  * @param selectionsOpt Section 에 설정할 객체
  */
  SetSections(selectionsOpt: any): void;

  /** 
   * Property 컨트롤의 업데이트 작업 수행
   *
  * @param isControlMode Component 모드 ( Default: true )
  */
  Update(isControlMode: boolean): void;

}
