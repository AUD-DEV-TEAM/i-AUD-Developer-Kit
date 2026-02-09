/**
* HTML5 Canvas 객체
*/
export interface ContextWrapper{

  /**
   * 배경색(ex:#ffa500)
  */
  FillStyle: string;

  /**
   * 폰트 속성(ex: 12px bold '맑은 고딕')
  */
  Font: string;

  /**
   * 투명도(0~1)
  */
  GlobalAlpha: number;

  /**
   * 선 두께
  */
  LineWidth: number;

  /**
   * 선 색(ex:#6b9dcb)
  */
  StrokeStyle: number;

  /**
   * 글자 가로 위치(ex: left, center, right)
  */
  TextAlign: string;

  /** 
   * 크기가 너비와 높이로 결정되는 (x, y) 위치에 채워진 사각형을 그립니다.
   *
  * @param x x좌표
  * @param y y좌표
  * @param width 너비
  * @param height 높이
  */
  FillRect(x: number, y: number, width: number, height: number): void;

  /** 
   * 지정된 (x, y) 위치에 지정된 텍스트를 그립니다(채웁니다).
   *
  * @param x x좌표
  * @param y y좌표
  */
  FillText(x: number, y: number): void;

  /** 
   * 문자열의 길이(px)값을 반환합니다.
   *
  * @param text 문자열
  */
  MeasureText(text: string): number;

  /** 
   * 박스 스타일명으로 스타일을 적용합니다.
   *
  * @param boxStyleName 박스 스타일 명
  */
  SetBoxStyleName(boxStyleName: string): string;

  /** 
   * 현재 획 스타일을 사용하여 시작점이 (x, y)이고 너비가 w이고 높이가 h인 사각형을 캔버스에 그립니다.
   *
  * @param x x좌표
  * @param y y좌표
  * @param width 너비
  * @param height 높이
  */
  StrokeRect(x: number, y: number, width: number, height: number): void;

}
