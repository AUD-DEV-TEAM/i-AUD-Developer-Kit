import { Control } from "../../aud/control/Control";
/**
* 라디오 버튼 컨트롤 입니다.
*/
export interface RadioButton extends Control{

  /**
   * 선택 여부
  */
  Checked: boolean;

  /**
   * 선택된 상태의 값
  */
  CheckedValue: string;

  /**
   * Radio 버튼 Element
   * @hidden
  */
  ElementRadio: HTMLDivElement;

  /**
   * 그룹 명
  */
  GroupName: string;

  /**
   * 선택 여부
  */
  IsChecked: boolean;

  /**
   * 컨트롤 다국어 코드
  */
  LanguageCode: string;

  /**
   * 텍스트
  */
  Text: string;

  /**
   * 텍스트 위치(front,back)
  */
  TextPosition: string;

  /** 
   * ToolTip 을 지정하는 함수 ( 연구소 전용 )
   *
   * @hidden
  */
  SetTooltip(): void;

  /**
   * @event 
   *
   * 라디오 컨트롤의 값이 변경될 경우 발생합니다.
   *
   * @example
   * ```js
   * RadioButton.OnValueChange();
   * ```
   * @param args
   *
   * Target : {@link RadioButton}
  */
  OnValueChange : (sender : RadioButton
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 그룹명
    */
    GroupName: string
    /**
     * 라벨 값
    */
    Text: string
    /**
     * 체크 여부
    */
    IsChecked: boolean
  }
  ) => void;


}
