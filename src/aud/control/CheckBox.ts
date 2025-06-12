import { Control } from "../../aud/control/Control";
import { enCheckBoxViewType } from "../../aud/enums/comm/enCheckBoxViewType";
/**
* 체크 박스 컨트롤로 사용자에게 선택/취소에 대한 입력을 처리할 수 있습니다.
*/
export interface CheckBox extends Control{

  /**
   * 체크 여부
  */
  Checked: boolean;

  /**
   * 선택된 상태의 반환 값
  */
  CheckedValue: string;

  /**
   * 그룹 이름 설정
  */
  GroupName: string;

  /**
   * 체크 여부
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
   * 선택되지 않은 상태의 값
  */
  UnCheckedValue: string;

  /**
   * 체크박스의 값
  */
  Value: string;

  /**
   * 체크박스 뷰 형태
   * @hidden
  */
  ViewType: enCheckBoxViewType;

  /**
   * @event 
   *
   * 체크박스 컨트롤의 값이 변경될 경우 발생합니다.
   *
   * @param args
   *
   * Target : {@link CheckBox}
  */
  OnValueChange : (sender : CheckBox
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 체크 상태
    */
    IsChecked: boolean
  }
  ) => void;


}
