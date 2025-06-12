import { Dock } from "../../aud/drawing/Dock";
import { Style } from "../../aud/drawing/Style";
import { Rect } from "../../aud/drawing/Rect";
/**
* 모든 컨트롤이 상속받는 기본 타입으로, 모든 객체가 이 객체의 속성을 상속 받습니다.
*/
export interface Control{

  /**
   * 사용자 정의 속성
  */
  Custom: string;

  /**
   * 컨트롤 설명
  */
  Description: string;

  /**
   * 컨트롤의 Docking(변경 후 Update() 또는 Resize()를 호출해야 합니다.)
  */
  Docking: Dock;

  /**
   * 컨트롤의 ROOT DOM 객체를 반환 합니다.
대부분의 객체는 DIV 객체 입니다.
   * @hidden
  */
   readonly Element: any;

  /**
   * 현재 컨트롤을 포함한 폼의 이름을 반환 합니다.
  */
   readonly FormName: string;

  /**
   * 컨트롤의 높이
  */
  Height: number;

  /**
   * 컨트롤 활성화 여부
  */
  IsEnabled: boolean;

  /**
   * 컨트롤의 위치(Left)
  */
  Left: number;

  /**
   * 컨트롤 이름
  */
   readonly Name: string;

  /**
   * 컨트롤 스타일
  */
  Style: Style;

  /**
   * 컨트롤 탭키 순서
  */
  TabIndex: number;

  /**
   * 컨트롤의 툴팁
  */
  Tooltip: string;

  /**
   * 컨트롤의 위치(Top)
  */
  Top: number;

  /**
   * 컨트롤 유형명
  */
   readonly Type: string;

  /**
   * 컨트롤 표시 여부
  */
  Visible: boolean;

  /**
   * 컨트롤의 너비
  */
  Width: number;

  /**
   * 컨트롤의 Z-Index
  */
  ZIndex: number;

  /** 
   * 애니메이션을 설정합니다.
   *
  * @param option 애니메이션 옵션
   * @hidden
  */
  Animation(option: object): void;

  /** 
   * 컨트롤이 포커스를 얻게 합니다.
   *
  */
  Focus(): void;

  /** 
   * 뷰포트를 기준으로 한 상대적인 위치 정보(Rect)를 반환합니다.
   *
  */
  GetClientRect(): Rect;

  /** 
   * 위치와 크기를 다시 계산하여 컨트롤을 재배치합니다.
   *
  */
  Resize(): void;

  /** 
   * 컨트롤을 회전 시킵니다.
   *
  * @param angle 회전 각
  */
  Rotate(angle: number): void;

  /** 
   * 컨트롤의 위치 및 설정 정보를 반영하여 다시 그립니다.
   *
  */
  Update(): void;

  /** 
   * 컨트롤의 위치 및 사이즈를 설정 합니다.
   *
   * @example
   * ```js
   * 
   *  var grid = Matrix.getObject("DataGrid");
   *  var rect = {"Left" : 100
   * 		    , "Top" : 100
   * 		    , "Width" : 400
   * 		    , "Height" : 400};
   *  //컨트롤의 사이즈를 설정합니다.
   *  //setRect는 모델만 변경하고 바로 사이즈를 계산하지 않습니다.
   *  //여러개의 컨트롤의 사이즈를 일괄 수정할 경우 성능 향상에 도움이 됩니다.
   *  grid.setRect(rect);
   *  //설정된 사이즈로 컨트롤을 다시 그립니다.
   *  grid.Resize();
   * ```
  * @param rect 컨트롤 사이즈 {Left:number,Top:number,Width:number,Height:number}
  */
  setRect(rect: Rect): void;

}
