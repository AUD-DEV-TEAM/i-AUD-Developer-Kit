/**
* BoxStyle 컨트롤
*/
export interface BoxStyle{

  /**
   * BoxStyle의 코드
  */
   readonly BoxStyleCode: string;

  /**
   * BoxStyle의 이름
  */
   readonly BoxStyleName: string;

  /**
   * checkbox 사용여부
  */
  UseCheckBox: boolean;

  /**
   * 사용 여부
  */
  UseYN: boolean;

  /** 
   * 박스스타일 키로 스타일을 적용합니다.
   *
  * @param boxStyleKey 박스스타일 키
  */
  SetBoxStyleKey(boxStyleKey: string): boolean;

  /** 
   * 박스스타일 속성을 적용합니다.
   *
  */
  Update(): void;

  /**
   * @event 
   *
   * BoxStyle 체크박스 클릭 시 발생하는 이벤트
   *
   * @param args
   *
   * Target : {@link BoxStyle}
  */
  OnBoxStyleCheckValueChange : (sender : BoxStyle
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 체크 상태
    */
    IsChecked: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * BoxStyle 선택 시 발생되는 이벤트
   *
   * @param args
   *
   * Target : {@link BoxStyle}
  */
  OnBoxStyleSelected : (sender : BoxStyle
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 박스스타일 키
    */
    BoxStyleKey: string
  }
  ) => void;


}
