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
  * @param caption 캡션
  * @param Id Id
  * @param image base64 string
  */
  AddItem(caption: string, Id: string, image: string): void;

  /** 
   * 선택된 아이템 목록에 아이템을 추가
   *
  * @param item Item
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
  * @param index Index
  * @param item Item
  */
  DelSelectedItem(index: number, item: any): void;

  /** 
   * 스크롤바 유무 반환
   *
  * @param visibleType 출력 타입
  * @param IsEnabled 사용 가능 여부
  */
  IsScrollBarVisible(visibleType: enScrollBarVisibilityType, IsEnabled: boolean): boolean;

  /** 
   * Option을 설정하는 메서드
   *
  * @param option 옵션
  */
  SetOption(option: any): void;

}
