/**
* Rectangle 객체
*/
export interface Rectangle{

  /**
   * Height
  */
  Height: number;

  /**
   * Left
  */
  Left: number;

  /**
   * Top
  */
  Top: number;

  /**
   * Width
  */
  Width: number;

  /** 
   * 주어진 영역과 교차하는 영역을 반환 합니다.
   *
  * @param rect Left
  */
  Intersect(rect: Rectangle): Rectangle;

  /** 
   * 빈 영역인지 여부를 반환 합니다.
   *
  */
  IsEmpty(): boolean;

  /** 
   * 주어진 영역과 현재 영역의 합에 해당하는 영역을 반환 합니다.
   *
  * @param rect Left
  */
  Union(rect: Rectangle): Rectangle;

  /** 
   * Top + Height
   *
  */
  getBottom(): number;

  /** 
   * Left + Width
   *
  */
  getRight(): number;

}
