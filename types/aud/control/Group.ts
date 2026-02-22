import { Control } from "../../aud/control/Control";
import { NamedDictionary } from "../../aud/data/NamedDictionary";
/**
 * 다양한 종류의 컨트롤을 묶을 수 있는 그룹 컨트롤입니다.
 */
export interface Group extends Control{

  /**
   * Group의 자식 컨트롤을 가지고 있는 NamedDictionary
   * @hidden
  */
  Controls: NamedDictionary<Control>;

  /**
   * 그룹에 컨트롤을 추가합니다.
   *
  * @param control 추가할 컨트롤
  */
  AddControl(control: Control): void;

  /**
   * 그룹에 컨트롤 목록을 추가합니다.
   *
  * @param controls 컨트롤 목록
   * @hidden
  */
  AddControls(controls?: NamedDictionary<Control>): boolean;

  /**
   * 지정한 이름의 컨트롤을 그룹에서 제거합니다.
   *
  * @param name 컨트롤 이름
  */
  RemoveControl(name: string): boolean;

  /**
   * Base64 인코딩된 이미지를 반환합니다.
   *
  * @param callback 이미지 변환 완료 후 호출되는 콜백 함수 (인자: Base64 문자열)
  */
  getBase64Image(callback: (value:string) => void): void;

}
