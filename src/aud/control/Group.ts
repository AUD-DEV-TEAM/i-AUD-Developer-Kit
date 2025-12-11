import { Control } from "../../aud/control/Control";
import { NamedDictionary } from "../../aud/data/NamedDictionary";
/**
* 그룹 컨트롤로 다양한 종류의 컨트롤을 묶을 수 있습니다.
*/
export interface Group extends Control{

  /**
   * Group의 자식 컨트롤을 가지고 있는 NamedDictionary
   * @hidden
  */
  Controls: NamedDictionary;

  /** 
   * Group 에 컨트롤을 추가합니다.
   *
  * @param control 컨트롤
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
  * @param name 이름
  */
  RemoveControl(name: string): boolean;

  /** 
   * base64 encoding된 이미지 결과를 반환 합니다.
   *
  * @param callback 이미지 변환 완료 후 함수
  * ```
  *  
  *                   function(base64ext){
  *                       
  *                     }	
  * ```
  */
  getBase64Image(callback: (value:string) => void): void;

}
