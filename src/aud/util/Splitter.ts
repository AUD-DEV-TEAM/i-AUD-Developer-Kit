import { enFoldedDirectionType } from "../../aud/enums/comm/enFoldedDirectionType";
/**
* 제품 보고서에서 사용하는 Splitter
* @hidden
*/
export interface Splitter{

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
  * @param directionType 
  */
  HideControls(directionType: enFoldedDirectionType): void;

  /** 
   * Resize
   *
  */
  Resize(): void;

  /** 
   * ShowControls
   *
  * @param directionType 
  */
  ShowControls(directionType: enFoldedDirectionType): void;

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
  }
  ) => void;


}
