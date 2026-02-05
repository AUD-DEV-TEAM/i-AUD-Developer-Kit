import { Dock } from "../../aud/drawing/Dock";
import { Style } from "../../aud/drawing/Style";
import { Rect } from "../../aud/drawing/Rect";
/**
 * 모든 컨트롤이 상속받는 기본 타입으로, 모든 객체가 이 객체의 속성을 상속받습니다.
 */
export interface Control{

  /**
   * 사용자 정의 속성을 가져오거나 설정합니다.
  */
  Custom: string;

  /**
   * 컨트롤의 설명을 가져오거나 설정합니다.
  */
  Description: string;

  /**
   * 컨트롤의 도킹(Docking) 방식을 가져오거나 설정합니다. (변경 후 Update() 또는 Resize()를 호출해야 합니다.)
  */
  Docking: Dock;

  /**
   * 컨트롤의 ROOT DOM 객체를 반환 합니다.
대부분의 객체는 DIV 객체 입니다.
   * @hidden
  */
   readonly Element: HTMLDivElement;

  /**
   * 현재 컨트롤을 포함한 폼의 이름을 가져옵니다.
  */
   readonly FormName: string;

  /**
   * 컨트롤의 높이를 가져오거나 설정합니다.
  */
  Height: number;

  /**
   * 컨트롤 활성화 여부를 가져오거나 설정합니다.
  */
  IsEnabled: boolean;

  /**
   * 컨트롤의 왼쪽(Left) 위치를 가져오거나 설정합니다.
  */
  Left: number;

  /**
   * 컨트롤의 이름을 가져옵니다.
  */
   readonly Name: string;

  /**
   * 컨트롤의 스타일을 가져오거나 설정합니다.
  */
  Style: Style;

  /**
   * 컨트롤의 탭 키 순서를 가져오거나 설정합니다.
  */
  TabIndex: number;

  /**
   * 컨트롤의 툴팁을 가져오거나 설정합니다.
  */
  Tooltip: string;

  /**
   * 컨트롤의 위쪽(Top) 위치를 가져오거나 설정합니다.
  */
  Top: number;

  /**
   * 컨트롤의 유형명을 가져옵니다.
  */
   readonly Type: string;

  /**
   * 컨트롤의 표시 여부를 가져오거나 설정합니다.
  */
  Visible: boolean;

  /**
   * 컨트롤의 너비를 가져오거나 설정합니다.
  */
  Width: number;

  /**
   * 컨트롤의 Z-Index를 가져오거나 설정합니다.
  */
  ZIndex: number;

  /**
   * 애니메이션을 설정합니다.
   *
  * @param option 애니메이션 옵션
   * @hidden
  */
  Animation(option: string | object): void;

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
   * 컨트롤을 회전시킵니다.
   *
  * @param angle 회전 각도
  */
  Rotate(angle: number): void;

  /**
   * 컨트롤의 위치 및 설정 정보를 반영하여 다시 그립니다.
   *
  */
  Update(): void;

  /**
   * 컨트롤의 위치 및 크기를 설정합니다.
   *
   * @example
   * ```js
   * var grid = Matrix.getObject("DataGrid");
   * var rect = {"Left": 100, "Top": 100, "Width": 400, "Height": 400};
   * // setRect는 모델만 변경하고 바로 크기를 계산하지 않습니다.
   * // 여러 개의 컨트롤 크기를 일괄 수정할 경우 성능 향상에 도움이 됩니다.
   * grid.setRect(rect);
   * // 설정된 크기로 컨트롤을 다시 그립니다.
   * grid.Resize();
   * ```
  * @param rect 컨트롤의 위치 및 크기 정보
  */
  setRect(rect: Rect): void;

}
