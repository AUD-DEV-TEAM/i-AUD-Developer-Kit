import { NamedDictionary } from "../../aud/data/NamedDictionary";
import { BoxStyle } from "../../aud/drawing/BoxStyle";
/**
* 박스 스타일 목록
*/
export interface BoxStyleList{
 
     
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
  

/**
 * BoxStyle 색상 모델 (Background 등)
 */
export interface IBoxStyleColor {
  ColorR: number;
  ColorG: number;
  ColorB: number;
  ColorA: number;
}

/**
 * BoxStyle 테두리 모델
 */
export interface IBoxStyleBorderData {
  ColorR: number;
  ColorG: number;
  ColorB: number;
  ColorA: number;
  /** 모서리 둥글기 (예: "4,4,4,4") */
  CornerRadius: string;
  /** 선 유형 (none, solid, double, dotted, dashed) */
  LineType: string;
  /** 두께 (예: "1,1,1,1") */
  Thickness: string;
}

/**
 * BoxStyle 글꼴 모델
 */
export interface IBoxStyleFontData {
  Bold: boolean;
  ColorR: number;
  ColorG: number;
  ColorB: number;
  ColorA: number;
  /** 글꼴 패밀리 (예: "inherit", "맑은 고딕") */
  Family: string;
  /** 가로 정렬 (left, center, right) */
  HorizontalAlignment: string;
  Italic: boolean;
  /** 글꼴 크기 */
  Size: number;
  UnderLine: boolean;
  /** 세로 정렬 (top, middle, bottom) */
  VerticalAlignment: string;
}
