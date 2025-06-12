/**
* 컬러 스타일 객체
*/
export interface Color{

  /**
   * 알파
  */
  A: number;

  /**
   * 블루
  */
  B: number;

  /**
   * 그린
  */
  G: number;

  /**
   * 레드
  */
  R: number;

  /** 
   * RGBA() 로 색상 추출.
   *
  */
  GetRGBA(): string;

  /** 
   * Color 값 설정 (eg. '#efefef' or 'rgba(255,255,255,1)')
   *
  * @param color eg. '#efefef' or 'rgba(255,255,255,1)'
  */
  SetColor(color: string): void;

  /** 
   * RGBA() 로 색상 적용.
   *
  * @param r r
  * @param g g
  * @param b b
  * @param a a
  */
  SetRGBA(r: string | number, g: string | number, b: string | number, a: string | number): void;

  /** 
   * RGBA() 로 색상 적용. (예)'rgba(255,255,255,1)'
   *
  * @param color (예)'rgba(255,255,255,1)'
  */
  SetRGBA(color: string): void;

}
