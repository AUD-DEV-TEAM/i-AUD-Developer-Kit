/**
* 제품 보고서에서 사용하는 Splitter
* @hidden
*/
export interface Splitter{

  /**
   * Splitter가 좌측/우측을 접을 수 있는지 설정한다. false이면 Splitter가 접지 않는다.
  */
  Foldable: boolean;

  /**
   * Splitter 좌측/우측이 접힌 혹은 펼쳐진 상태 반환
  */
  Folded: boolean;

  /**
   * Height
  */
  Height: number;

  /**
   * Left
  */
  Left: number;

  /**
   * Top
  */
  Top: number;

  /**
   * 
  */
  Visible: boolean;

  /**
   * Width
  */
  Width: number;

  /** 
   * Dispose
   *
  */
  Dispose(): void;

  /** 
   * HideControls
   *
  */
  HideControls(): void;

  /** 
   * Resize
   *
  */
  Resize(): void;

  /** 
   * ShowControls
   *
  */
  ShowControls(): void;

  /**
   * @event 
   *
   * OnEndDrag
   *
   * @param args
   *
  */
  OnEndDrag : (sender : Splitter
  , args : { 
    /**
     * MouseEvent
    */
    Event: MouseEvent
  }
  ) => void;


  /**
   * @event 
   *
   * OnMoveDrag
   *
   * @param args
   *
  */
  OnMoveDrag : (sender : Splitter
  , args : { 
    /**
     * MouseEvent
    */
    Event: MouseEvent
    /**
     * 마우스 위치
    */
    Left: number
    /**
     * Splitter의 MoveEvent를 통한 Splitter 자체 기능 사용 유무.
    */
    Move: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * OnStartDrag
   *
   * @param args
   *
  */
  OnStartDrag : (sender : Splitter
  , args : { 
    /**
     * MouseEvent
    */
    Event: MouseEvent
    /**
     * Splitter의 MoveEvent를 통한 Splitter 자체 기능 사용 유무.
    */
    Move: boolean
  }
  ) => void;


}
