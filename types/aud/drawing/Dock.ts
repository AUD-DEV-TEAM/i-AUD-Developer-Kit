/**
* 상하좌우 Docking을 설정하는 객체(Docking 설정 후, 해당 컨트롤의 Update() 또는 Resize() 시, 반영됨.)
*/
export interface Dock{

  /**
   * 하단 Docking
  */
  Bottom: boolean;

  /**
   * 컨트롤 Docking시 기존 컨트롤 사이즈를 유지할 지 여부
  */
  KeepSize: boolean;

  /**
   * 좌측 Docking
  */
  Left: boolean;

  /**
   * Left, Top, Right, Bottom의 마진 값 e.g. "1,1,1,1"
  */
  Margin: string | object;

  /**
   * 컨트롤의 최소 사이즈 높이
  */
  MinHeight: number;

  /**
   * 컨트롤의 최소 사이즈 너비
  */
  MinWidth: number;

  /**
   * 우측 Docking
  */
  Right: boolean;

  /**
   * 상단 Docking
  */
  Top: boolean;

  /** 
   * 메소드를 통해 왼쪽, 위, 오른쪽, 아래 여백 값을 조회합니다.
   *
   * @hidden
  */
  GetMargin(): Array<any>;

}
