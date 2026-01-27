import { Control } from "../../aud/control/Control";
import { Color } from "../../aud/drawing/Color";
/**
* 컬러픽커 컨트롤로 색상값을 선택 할 수 있습니다.
*/
export interface ColorPicker extends Control{

  /**
   * 색상
  */
   readonly Color: Color;

  /**
   * 현재 색상값 정보 확인 및 색상 값을 입력 할 수 있습니다.
  */
  ColorValue: string;

  /**
   * @event 
   *
   * 컬러픽커 컨트롤의 색상이 변경될 경우 발생합니다.
   *
   * @param args
   *
   * Target : {@link ColorPicker}
  */
  OnColorPickerValueChanged : (sender : ColorPicker
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 컬러 객체
    */
    Color: Color
  }
  ) => void;


}
