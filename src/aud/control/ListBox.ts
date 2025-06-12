import { Control } from "../../aud/control/Control";
import { enScrollBarVisibilityType } from "../../aud/enums/comm/enScrollBarVisibilityType";
/**
* ListBox 컨트롤. 사용자 API 공개 안함
* @hidden
*/
export interface ListBox extends Control{

  /** 
   * Item 추가
   *
  * @param caption 
  * @param Id 
  * @param image base64 string
  */
  AddItem(caption: string, Id: string, image: string): void;

  /** 
   * 선택된 아이템 목록에 아이템을 추가
   *
  * @param item 
  */
  AddSelectedItem(item: any): void;

  /** 
   * 전체 아이템 선택
   *
  */
  AllSelect(): void;

  /** 
   * Item 목록 초기화
   *
  */
  ClearItems(): void;

  /** 
   * 선택된 아이템 목록에서 특정 아이템을 제거
   *
  * @param index 
  * @param item 
  */
  DelSelectedItem(index: number, item: any): void;

  /** 
   * 스크롤바 유무 반환
   *
  * @param visibleType 
  * @param IsEnabled 
  */
  IsScrollBarVisible(visibleType: enScrollBarVisibilityType, IsEnabled: boolean): boolean;

  /** 
   * 
   *
  * @param option 
  */
  SetOption(option: any): void;

}
