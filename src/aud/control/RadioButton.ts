import { Control } from "../../aud/control/Control";
/**
* 라디오 버튼 컨트롤입니다.
*/
export interface RadioButton extends Control{

  /**
   * 선택 여부를 가져오거나 설정합니다.
  */
  Checked: boolean;

  /**
   * 선택된 상태의 값을 가져오거나 설정합니다.
  */
  CheckedValue: string;

  /**
   * Radio 버튼 Element
   * @hidden
  */
  ElementRadio: HTMLDivElement;

  /**
   * 그룹 이름을 가져오거나 설정합니다.
  */
  GroupName: string;

  /**
   * 선택 여부를 가져오거나 설정합니다.
  */
  IsChecked: boolean;

  /**
   * 다국어 코드를 가져오거나 설정합니다.
  */
  LanguageCode: string;

  /**
   * 표시 텍스트를 가져오거나 설정합니다.
  */
  Text: string;

  /**
   * 텍스트 위치를 가져오거나 설정합니다. (front, back)
  */
  TextPosition: string;

  /**
   * 툴팁을 지정합니다.
   *
   * @hidden
  */
  SetTooltip(): void;

  /**
   * @event
   *
   * 라디오 컨트롤의 값이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 라디오 버튼 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link RadioButton}
  */
  OnValueChange : (sender : RadioButton
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 그룹 이름
    */
    GroupName: string
    /**
     * 표시 텍스트
    */
    Text: string
    /**
     * 체크 여부
    */
    IsChecked: boolean
  }
  ) => void;


}
