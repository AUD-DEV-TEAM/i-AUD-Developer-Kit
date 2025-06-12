import { Control } from "../../../aud/control/Control";
import { enDiagramModelType } from "../../../aud/enums/diagram/enDiagramModelType";
/**
* 다이어그램 컨트롤
*/
export interface DiagramControl extends Control{

  /** 
   * 컨텍스트 메뉴 리스트를 가져옵니다.
   *
  */
  GetContextMenuList(): Array<any>;

  /** 
   * 모델 정보를 가져옵니다.
   *
  */
  getModelType(): enDiagramModelType;

  /** 
   * 모델 정보 셋팅
   *
  * @param name 
  */
  setModelType(name: enDiagramModelType): void;

  /**
   * @event 
   *
   * 컨텍스트메뉴가 열릴 때 발생합니다
   *
   * @param args
   *
  */
  OnContextMenuOpening : (sender : DiagramControl
  , args : { 
  }
  ) => void;


}
