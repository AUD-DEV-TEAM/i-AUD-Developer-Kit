import { Control } from "../../aud/control/Control";
import { Color } from "../../aud/drawing/Color";
/**
 * 색상 값을 선택할 수 있는 컬러픽커 컨트롤입니다.
 */
export interface ColorPicker extends Control{

  /**
   * 현재 색상 객체를 가져옵니다.
  */
   readonly Color: Color;

  /**
   * 현재 색상 값을 가져오거나 설정합니다.
  */
  ColorValue: string;

  /**
   * @event
   *
   * 선택된 색상이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 컬러픽커 컨트롤
   * @param args 이벤트 인자
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
     * 변경된 색상 객체
    */
    Color: Color
  }
  ) => void;

  /** 선택된 색상 값을 배열로 반환합니다. */
  GetValue(): string[];
}
