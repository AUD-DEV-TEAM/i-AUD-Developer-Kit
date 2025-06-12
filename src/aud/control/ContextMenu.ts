/**
* 컨트롤을 통해서 출력되는 컨텍스트 메뉴 객체
*/
export interface ContextMenu{

  /** 
   * 컨텍스트 메뉴에 라인을 추가한다.
   *
  */
  AddLine(): void;

  /** 
   * 컨텍스트 메뉴에 아이템을 추가한다.
   *
  * @param Name 아이템의 텍스트 명
  * @param Event 해당 아이템을 클릭 시 작동해야할 이벤트
  * ```
  * 
  *                         		function(){
  *                         			alert("아이템이 클릭되었습니다.");
  *                         		} 
  * ```
  */
  AddMenu(Name: string, Event: Function): void;

  /** 
   * 컨텍스트 메뉴 아이템을 모두 지운다.
   *
  */
  Clear(): void;

}
