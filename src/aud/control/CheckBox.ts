import { Control } from "../../aud/control/Control";
import { enCheckBoxViewType } from "../../aud/enums/comm/enCheckBoxViewType";
/**
 * 사용자에게 선택/해제 입력을 처리할 수 있는 체크박스 컨트롤입니다.
 */
export interface CheckBox extends Control{

  /**
   * 체크 여부를 가져오거나 설정합니다.
  */
  Checked: boolean;

  /**
   * 선택된 상태일 때의 값을 가져오거나 설정합니다.
  */
  CheckedValue: string;

  /**
   * 그룹 이름을 가져오거나 설정합니다.
  */
  GroupName: string;

  /**
   * 체크 여부를 가져오거나 설정합니다.
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
   * 텍스트 표시 위치를 가져오거나 설정합니다. (`"front"`: 앞, `"back"`: 뒤)
  */
  TextPosition: string;

  /**
   * 선택 해제 상태일 때의 값을 가져오거나 설정합니다.
  */
  UnCheckedValue: string;

  /**
   * 체크박스의 값을 가져오거나 설정합니다.
  */
  Value: string;

  /**
   * 체크박스의 뷰 형태를 가져오거나 설정합니다.
  */
  ViewType: enCheckBoxViewType;

  /**
   * @event
   *
   * 체크박스의 값이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 체크박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link CheckBox}
  */
  OnValueChange : (sender : CheckBox
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 체크 상태
    */
    IsChecked: boolean
    /**
     * 그룹 이름
    */
    GroupName: string
    /**
     * 표시 텍스트
    */
    Text: string
  }
  ) => void;


}
