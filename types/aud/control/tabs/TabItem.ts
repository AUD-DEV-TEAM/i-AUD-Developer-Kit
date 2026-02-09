/**
* 탭 컨트롤에서의 탭 아이템

*/
export interface TabItem{

  /**
   * 탭 아이템의 활성화 여부
  */
   readonly IsActive: boolean;

  /**
   * 탭 아이템의 이름
  */
   readonly Name: string;

  /**
   * 탭 아이템의 화면 표시명
  */
  Text: string;

  /**
   * 탭 아이템의 툴팁
  */
  Tooltip: string;

  /**
   * 탭 아이템의 표시 여부
  */
  Visible: boolean;

  /**
   * 탭 아이템의 속성을 반환합니다.
   *
  * @param attributeName 속성명 (예: "ActiveStyle", "InactiveStyle", "MouseOverStyle", "MouseDownStyle", "TooltipLanguageCode", "TextLanguageCode" 등)
  * @returns 속성 값. 속성이 없으면 undefined 반환
  */
  GetProperty(attributeName: string): any;

}
