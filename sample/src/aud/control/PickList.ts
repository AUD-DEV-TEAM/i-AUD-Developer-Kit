import { Control } from "../../aud/control/Control";
/**
* 로컬의 파일(*.csv 또는 *.txt)을 업로드하여 데이터를 표현하는 객체 입니다.
*/
export interface PickList extends Control{

  /**
   * 현재 선택된 값을 string 형식으로 반환(구분자 ;)
  */
  EditValue: string;

  /**
   * 읽기전용
  */
  IsReadOnly: boolean;

  /**
   * 현재 선택된 값을 string[] 형식으로 반환
  */
  Value: string[];

  /**
   * @event 
   *
   * 픽리스트의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link PickList}
  */
  OnValueChange : (sender : PickList
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 변경 전 컨트롤 값
    */
    OldValue: string
    /**
     * 현재 컨트롤 string값(구분자 ;)
    */
    Value: string
  }
  ) => void;


}
