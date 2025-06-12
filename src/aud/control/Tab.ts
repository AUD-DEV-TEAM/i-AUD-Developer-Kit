import { Control } from "../../aud/control/Control";
import { TabItem } from "../../aud/control/tabcontrol/TabItem";
import { NamedDictionary } from "../../aud/data/NamedDictionary";
/**
* 탭 컨트롤로 다양한 종류의 컨트롤을 탭 아이템별로 묶을 수 있습니다.
*/
export interface Tab extends Control{

  /**
   * 활성화된 탭 아이템 객체
  */
   readonly ActiveTabItem: TabItem;

  /**
   * 활성화된 탭 아이템의 Index
  */
   readonly ActiveTabItemIndex: number;

  /**
   * 탭 컨트롤의 속성들
  */
  Property: object;

  /**
   * 탭 아이템 목록
  */
   readonly TabItems: NamedDictionary;

  /** 
   * 활성화되는 탭을 설정합니다.
   *
   * @example
   * ```js
   * var tabItem = Tab.TabItems.GetByIndex(index);
   * Tab.SetActiveTabItem(tabItem );
   * ```
  * @param tabItem 탭 아이템
  */
  SetActiveTabItem(tabItem: TabItem): void;

  /** 
   * 활성화되는 탭을 인덱스로 설정합니다.
   *
   * @example
   * ```js
   * Tab.SetActiveTabItemByIndex(2);
   * ```
  * @param index  인덱스
  */
  SetActiveTabItemByIndex(index: number): void;

  /**
   * @event 
   *
   * 현재 활성화된 탭이 변경될 때 발생하는 이벤트
   *
   * @param args
   *
  */
  OnActiveTabChanged : (sender : Tab
  , args : { 
    /**
     * 탭 컨트롤의 Id
    */
    Id: string
    /**
     * 활성화된 탭의 이름
    */
    TabName: string
    /**
     * 활성화된 탭의 Index
    */
    TabIndex: number
  }
  ) => void;


}
