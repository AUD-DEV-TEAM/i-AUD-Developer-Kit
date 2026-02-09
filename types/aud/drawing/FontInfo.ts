import { Color } from "../../aud/drawing/Color";
/**
* 글씨 스타일 객체
*/
export interface FontInfo{

  /**
   * Bold
  */
  Bold: boolean;

  /**
   * 색상
  */
  Color: Color;

  /**
   * Family
  */
  Family: string;

  /**
   * HorizontalAlignment
  */
  HorizontalAlignment: string;

  /**
   * Italic
  */
  Italic: boolean;

  /**
   * Size
  */
  Size: string;

  /**
   * UnderLine
  */
  UnderLine: boolean;

  /**
   * VerticalAlignment
  */
  VerticalAlignment: string;

}
