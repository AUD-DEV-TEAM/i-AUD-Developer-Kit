/**
* 사용자에게 팝업창을 표시하는 컨트롤입니다. 팝업의 내용은 보고서의 특정 폼을 대상으로 합니다.
*/
export interface FormDialog{

  /**
   * 높이
  */
  Height: number;

  /**
   * 현재창이 열려있는지 여부
  */
   readonly IsOpened: boolean;

  /**
   * 위치(Left)
  */
  Left: number;

  /**
   * 팝업 타이틀
  */
  Title: string;

  /**
   * 위치(Top)
  */
  Top: number;

  /**
   * 넓이
  */
  Width: number;

  /** 
   * 팝업 윈도우를 닫습니다.
   *
  */
  Close(): void;

  /** 
   * 팝업 윈도우를 화면의 중앙으로 이동 시킵니다.
   *
  */
  MoveToCenter(): void;

  /**
   * @event 
   *
   * 팝업 윈도우가 닫힐때 발생합니다.(버튼 유형 1의 [닫기], 유형 2의 [취소] 버튼 클릭 시 발생) 
   *
   * @param args
   *
  */
  OnClosed : (sender : FormDialog
  , args : { 
  }
  ) => void;


  /**
   * @event 
   *
   * 버튼 유형 2의 [확인] 버튼 클릭 시 발생합니다. 
   *
   * @param args
   *
   * @example
   * ```js
   * var POP_DATASET = Matrix.ShowWindow("POP_DATASET",0,0,350, 180, false, true, "데이터 집계 설정",false, null, 2, null);
   * POP_DATASET.OnClosed = function(sender, args){
   * 	POP_DATASET = null;
   * 
   * };
   * POP_DATASET.OnDialogResult = function(result){
   * 	//확인에 대한 작업
   * 	_this.POP_DATASET.Close(); 
   * };
   * ```
  */
  OnDialogResult : ( 
    result: string 
  ) => void;


}
