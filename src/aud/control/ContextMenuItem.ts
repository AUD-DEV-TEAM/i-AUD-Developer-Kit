/**
* Matrix.CreateContextMenuItem() 또는 Matrix.CreateContextMenuChildItem()으로 생성된 컨텍스트 메뉴 아이템 객체
*
* @example
* ```js
* // 메뉴 아이템 생성
* var menuItem = Matrix.CreateContextMenuItem("메뉴1", function() {
*     Matrix.Alert("메뉴1 클릭");
* });
* // 메뉴 아이템 추가
* Matrix.AddContextMenu(menuItem);
* ```
*/
export interface ContextMenuItem{

  /**
   * 메뉴 아이템의 고유 ID
   *
  */
   readonly Id: string;

  /**
   * 메뉴 아이템의 표시 이름
   *
  */
  Name: string;

  /**
   * 비활성화 여부
   *
  */
  isDisabled: boolean;

  /**
   * 부모 메뉴 아이템의 ID (기본값: "DEFAULT", 최상위 메뉴)
   *
  */
   readonly ParentId: string;

  /**
   * 클릭 시 실행되는 이벤트 함수
   *
  */
  ClickEvent: Function;

}
