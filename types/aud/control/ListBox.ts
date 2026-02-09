import { Control } from "../../aud/control/Control";
import { enScrollBarVisibilityType } from "../../aud/enums/comm/enScrollBarVisibilityType";
/**
* ListBox 컨트롤입니다.
* @hidden
*/
export interface ListBox extends Control{

  /**
   * 아이템을 추가합니다.
   *
  * @param caption 캡션
  * @param Id ID
  * @param image Base64 문자열
  */
  AddItem(caption: string, Id: string, image: string): void;

  /**
   * 선택된 아이템 목록에 아이템을 추가합니다.
   *
   * @param item 아이템 객체
   */
  AddSelectedItem(item: object): void;

  /**
   * 전체 아이템을 선택합니다.
   *
  */
  AllSelect(): void;

  /**
   * 아이템 목록을 초기화합니다.
   *
  */
  ClearItems(): void;

  /**
   * 선택된 아이템 목록에서 특정 아이템을 제거합니다.
   *
   * @param index 인덱스
   * @param item 아이템 객체
   */
  DelSelectedItem(index: number, item: object): void;

  /**
   * 스크롤바 표시 여부를 반환합니다.
   *
  * @param visibleType 출력 타입
  * @param IsEnabled 사용 가능 여부
  */
  IsScrollBarVisible(visibleType: enScrollBarVisibilityType, IsEnabled: boolean): boolean;

  /**
   * 옵션을 설정합니다.
   *
   * @param option 옵션 객체
   */
  SetOption(option: object): void;

}
