/**
 * 컨트롤을 통해서 출력되는 컨텍스트 메뉴 객체입니다.
 */
export interface ContextMenu{

  /**
   * 컨텍스트 메뉴에 구분선을 추가합니다.
   *
  */
  AddLine(): void;

  /**
   * 컨텍스트 메뉴에 아이템을 추가합니다.
   *
  * @param Name 아이템의 표시 텍스트
  * @param Event 아이템 클릭 시 실행할 이벤트 함수
  */
  AddMenu(Name: string, Event: Function): void;

  /**
   * 컨텍스트 메뉴의 아이템을 모두 삭제합니다.
   *
  */
  Clear(): void;

}
