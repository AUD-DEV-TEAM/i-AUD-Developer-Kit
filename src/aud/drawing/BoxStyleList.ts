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
   * key에 해당하는 BoxStyle을 가져옵니다.
   *
  * @param key BoxStyle의 키
  */
  Get(key: string): BoxStyle;

  /** 
   * 이름에 해당하는 BoxStyle을 가져옵니다.
   *
  * @param name BoxStyle의 이름
  */
  GetItemByStyleName(name: string): BoxStyle;

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
