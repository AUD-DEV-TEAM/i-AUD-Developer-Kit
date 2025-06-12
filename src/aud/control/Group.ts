import { Control } from "../../aud/control/Control";
import { NamedDictionary } from "../../aud/data/NamedDictionary";
/**
* 그룹 컨트롤로 다양한 종류의 컨트롤을 묶을 수 있습니다.
*/
export interface Group extends Control{

  /** 
   * Group 에 컨트롤을 추가합니다.
   *
  * @param control 
  */
  AddControl(control: Control): void;

  /** 
   * Group 에 컨트롤들을 추가합니다.
   *
  * @param controls Controls
   * @hidden
  */
  AddControls(controls?: NamedDictionary): boolean;

  /** 
   * 지정한 이름의 컨트롤을 Group 에서 제거합니다.
   *
  * @param name 
  */
  RemoveControl(name: string): boolean;

}
