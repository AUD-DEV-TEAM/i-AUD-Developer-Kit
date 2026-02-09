import { Color } from "../../aud/drawing/Color";
/**
* 선 스타일 객체
*/
export interface BorderInfo{

  /**
   * 색상
  */
  Color: Color;

  /**
   * Corner Radius(Default: '0,0,0,0')
  */
  CornerRadius: string;

  /**
   * Line Type(none:없음, solid:단일선, double:이중선, dotted:점선, dashed: 파선)
  */
  LineType: string;

  /**
   * Thickness(Default: '1,1,1,1')
  */
  Thickness: string;

}
