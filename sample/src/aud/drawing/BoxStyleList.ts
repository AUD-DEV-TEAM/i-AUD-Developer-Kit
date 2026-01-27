import { NamedDictionary } from "../../aud/data/NamedDictionary";
import { BoxStyle } from "../../aud/drawing/BoxStyle";
/**
* 박스 스타일 목록
*/
export interface BoxStyleList{

  /**
   * 리스트
   * @hidden
  */
  _extraList: NamedDictionary;

  /**
   * 리스트
   * @hidden
  */
  _list: NamedDictionary;

  /** 
   * List 에 BoxStyle 을 추가합니다.
(사용자 API 제공 안함)
   *
  * @param boxStyle 
   * @hidden
  */
  Add(boxStyle: BoxStyle): void;

  /** 
   * ExtraList 에 BoxStyle 을 추가합니다.
(사용자 API 제공 안함)
   *
  * @param boxStyle 
   * @hidden
  */
  AddExtra(boxStyle: BoxStyle): void;

  /** 
   * List 와 ExtraList 를 초기화합니다.
(사용자 API 제공 안함)
   *
   * @hidden
  */
  Clear(): void;

  /** 
   * BoxStyle 을 복사합니다.
(사용자 API 제공 안함)
   *
  * @param key 
   * @hidden
  */
  Copy(key: string): BoxStyle;

  /** 
   * Unique 한 Name 을 반환합니다.
(사용자 API 제공 안함)
   *
  * @param targetName 
   * @hidden
  */
  CreateUniqueStyleName(targetName?: string): string;

  /** 
   * List 와 ExtraList 를 순회합니다.
(사용자 API 제공 안함)
   *
  * @param func 
   * @hidden
  */
  ForEach(func: (idx: number, item: any) => boolean | void): void;

  /** 
   * List 를 순회합니다.
(사용자 API 제공 안함)
   *
  * @param func 
   * @hidden
  */
  ForEachList(func: (idx: number, item: any) => boolean | void): void;

  /** 
   * key에 해당하는 BoxStyle을 가져옵니다.
   *
  * @param key BoxStyle의 키
  */
  Get(key: string): BoxStyle;

  /** 
   * List 의 개수를 반환합니다.
(사용자 API 제공 안함)
   *
   * @hidden
  */
  GetCount(): number;

  /** 
   * 이름에 해당하는 BoxStyle을 가져옵니다.
   *
  * @param name BoxStyle의 이름
  */
  GetItemByStyleName(name: string): BoxStyle;

  /** 
   * BoxStyle List 를 반환합니다.
(사용자 API 제공 안함)
   *
   * @hidden
  */
  GetItems(): {[key:string]:any};

  /** 
   * 기본설정을 가지는 새로운 BoxStyle을 생성하여 반환합니다.
   *
  */
  New(): BoxStyle;

  /** 
   * key에 해당하는 BoxStyle을 삭제합니다.
   *
  * @param key BoxStyle의 키
  */
  Remove(key: string): void;

}
