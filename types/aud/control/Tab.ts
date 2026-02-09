import { Control } from "../../aud/control/Control";
import { TabItem } from "../../aud/control/tabs/TabItem";
import { NamedDictionary } from "../../aud/data/NamedDictionary";
import { ContextMenu } from "../../aud/control/ContextMenu";
/**
 * 탭 컨트롤로 다양한 종류의 컨트롤을 탭 아이템별로 묶을 수 있습니다.
 */
export interface Tab extends Control {

  /**
   * 활성화된 탭 아이템 객체를 가져옵니다.
   */
  readonly ActiveTabItem: TabItem;

  /**
   * 활성화된 탭 아이템의 인덱스를 가져옵니다.
   */
  readonly ActiveTabItemIndex: number;

  /**
   * 탭 컨트롤의 속성 정보를 가져옵니다.
   */
  Property: object;

  /**
   * 탭 아이템 목록을 가져옵니다.
   */
  readonly TabItems: NamedDictionary;

  /**
   * 탭 아이템을 추가합니다. 기존에 존재하는 탭 아이템 이름의 경우 추가하지 않고 기존 탭 아이템을 반환합니다.
   *
   * @param name 탭 아이템 이름
   * @hidden
   */
  AddTabItem(name: string): TabItem;

  /**
   * 탭 아이템을 삭제합니다.
   *
   * @param name 탭 아이템 이름
   * @hidden
   */
  DeleteTabItem(name: string): void;

  /**
   * 탭 아이템을 삭제합니다.
   *
   * @param tabItem 탭 아이템 객체
   * @hidden
   */
  DeleteTabItem(tabItem: TabItem): void;

  /**
   * 활성화되는 탭 아이템을 설정합니다.
   *
   * @example
   * ```js
   * var tabItem = Tab.TabItems.GetByIndex(index);
   * Tab.SetActiveTabItem(tabItem);
   * ```
   * @param tabItem 탭 아이템
   */
  SetActiveTabItem(tabItem: TabItem): void;

  /**
   * 활성화되는 탭 아이템을 인덱스로 설정합니다.
   *
   * @example
   * ```js
   * Tab.SetActiveTabItemByIndex(2);
   * ```
   * @param index 인덱스
   */
  SetActiveTabItemByIndex(index: number): void;

  /**
   * 탭 아이템 정보를 반영하여 다시 그립니다. 탭 아이템 내 컨트롤 모두가 업데이트됩니다.
   *
   * @param tabItem 탭 아이템 객체
   * @hidden
   */
  UpdateTabItem(tabItem: TabItem): void;

  /**
   * 탭 아이템 정보를 반영하여 다시 그립니다. 탭 아이템 내 컨트롤 모두가 업데이트됩니다.
   *
   * @param name 탭 아이템 이름
   * @hidden
   */
  UpdateTabItem(name: string): void;

  /**
   * @event
   *
   * 현재 활성화된 탭이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 탭 컨트롤
   * @param args 이벤트 인자
   *
   * @example
   * ```js
   * var tab = Matrix.getObject('TAB_MAIN');
   * tab.OnActiveTabChanged = function(s, e) {
   *     if (e.TabName === 'Dashboard') {
   *         Matrix.Execute("DS_CURRENT", 'CHT_CURRENT');
   *         Matrix.doRefresh(['CHT_CURRENT', 'CHT_MONTHLY', 'GRD_DASHBOARD']);
   *     } else if (e.TabName === 'Chart') {
   *         var item = tab.TabItems.Get('Dashboard');
   *         item.Text = item.Text + "click";
   *         item.Tooltip = "clicked";
   *         item.Visible = false;
   *         tab.Update();
   *         Matrix.doRefresh(['CHT_TEAM', 'CHT_DETAIL', 'CHT_PLAN', 'CHT_DISTRIBUTION']);
   *     } else {
   *         Matrix.doRefresh('GRD_DATA_ALL');
   *     }
   * }
   * ```
   *
   * Target : {@link Tab}
   */
  OnActiveTabChanged: (sender: Tab
    , args: {
      /**
       * 탭 컨트롤 이름
       */
      Id: string
      /**
       * 활성화된 탭의 이름
       */
      TabName: string
      /**
       * 활성화된 탭의 인덱스
       */
      TabIndex: number
    }
  ) => void;


  /**
   * @event
   *
   * 컨텍스트 메뉴가 열리기 전에 발생합니다.
   *
   * @param sender 이벤트가 발생한 탭 컨트롤
   * @param args 이벤트 인자
   *
   * @example
   * ```js
   * var Tab = Matrix.getObject('Tab');
   * Tab.OnContextMenuOpening = function(sender, args) {
   *     if ((args.TabItem && args.TabItem.Text == "view")
   *         || Tab.ActiveTabItem.Text == "view") {
   *         args.Cancel = true; // 화면 표시명이 view인 tabitem일 때는 contextmenu를 보여주지 않습니다.
   *     } else {
   *         var tabMenu = args.Menu;
   *         tabMenu.AddLine();
   *         tabMenu.AddMenu("Alert", function() {
   *             Matrix.Alert("Click Alert Menu");
   *         });
   *     }
   * }
   * ```
   *
   * Target : {@link Tab}
   */
  OnContextMenuOpening: (sender: Tab
    , args: {
      /**
       * 컨트롤 이름
       */
      Id: string
      /**
       * 컨텍스트 메뉴 객체
       */
      Menu: ContextMenu
      /**
       * 이 값을 `true`로 설정할 경우 컨텍스트 메뉴가 열리지 않습니다.
       */
      Cancel: boolean
      /**
       * 우클릭된 탭 아이템. 없을 경우 `undefined`를 반환합니다.
       */
      TabItem: TabItem
    }
  ) => void;


}
