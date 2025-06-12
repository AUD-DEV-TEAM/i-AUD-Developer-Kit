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
   * 탭 아이템의 속성을 return 합니다.
   *
   * @example
   * ```js
   * var style = TabItem.GetAttribute("ActiveStyle");
   * ```
  */
  GetProperty(): any;

}
