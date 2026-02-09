import { Control } from "../../../aud/control/Control";
import { ContextMenuItem } from "../../../aud/control/ContextMenuItem";
import { enDiagramModelType } from "../../../aud/enums/diagram/enDiagramModelType";
/**
 * 다이어그램 컨트롤
 */
export interface DiagramControl extends Control{

  /**
   * 컨텍스트 메뉴 아이템 목록을 반환합니다.
   */
  GetContextMenuList(): Array<ContextMenuItem>;

  /**
   * 현재 설정된 다이어그램 모델 타입을 반환합니다.
   */
  getModelType(): enDiagramModelType;

  /**
   * 다이어그램의 모델 타입을 설정합니다.
   *
   * @param name 설정할 다이어그램 모델 타입
   */
  setModelType(name: enDiagramModelType): void;

  /**
   * @event
   *
   * 컨텍스트 메뉴가 열릴 때 발생합니다.
   */
  OnContextMenuOpening : (sender : DiagramControl
  , args : {
  }
  ) => void;

}
