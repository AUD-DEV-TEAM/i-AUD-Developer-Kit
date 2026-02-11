import { Control } from "../../aud/control/Control";
/**
* 로컬 파일(*.csv 또는 *.txt)을 업로드하여 데이터를 선택할 수 있는 픽리스트 컨트롤입니다.
*/
export interface PickList extends Control{

  /**
   * 현재 선택된 값을 문자열 형식으로 가져옵니다. (구분자: 세미콜론)
  */
  EditValue: string;

  /**
   * 읽기 전용 여부를 가져오거나 설정합니다.
  */
  IsReadOnly: boolean;

  /**
   * 현재 선택된 값을 문자열 배열 형식으로 가져옵니다.
  */
  Value: string[];

  /**
   * @event
   *
   * 픽리스트의 값이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 픽리스트 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link PickList}
  */
  OnValueChange : (sender : PickList
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 변경 전 값
    */
    OldValue: string
    /**
     * 현재 값 (구분자: 세미콜론)
    */
    Value: string
  }
  ) => void;

  /** 픽리스트의 선택된 값 배열을 반환합니다. */
  GetValue(): string[];
}
