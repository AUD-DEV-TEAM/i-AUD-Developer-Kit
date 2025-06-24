import { IWorkSheet } from "../../../aud/control/igrids/IWorkSheet";
import { ICell } from "../../../aud/control/igrids/ICell";
import { ISelectionArea } from "../../../aud/control/igrids/ISelectionArea";
/**
* MX-GRID의 내부 뷰 객체
*/
export interface iGridView{

  /**
   * MX-GRID 내부 Canvas 객체의 Context2D객체
  */
  Context: CanvasRenderingContext2D;

  /**
   * MX-GRID 내부 Canvas 객체의 Context2D객체 (Layer)
  */
  Context2: CanvasRenderingContext2D;

  /**
   * 문서 편집 모드 여부
  */
  IsDesignMode: boolean;

  /**
   * 날짜 입력기 사용 여부
  */
  UseDatePicker: boolean;

  /** 
   * 모델에서 수정된 내용을 다시 계산합니다.
   *
  */
  Calculate(): void;

  /** 
   * 화면을 다시 그리기 위해 Canvas를 갱신합니다.
   *
  * @param force 강제로 갱신할지 여부

  */
  Update(force?: boolean): void;

  /** 
   * 행 삭제 작업 예약
   *
  * @param pos  삭제 할  위치
  * @param count 삭제 할 갯수
  */
  addDeleteRowInfo(pos: number, count: number): void;

  /** 
   * 행 추가 작업 예약
   *
  * @param pos 추가 할 위치
  * @param count  추가 할 갯수
  * @param baseRow 추가되는 행의 기준이 되는 행 (높이의 기준)
  */
  addInsertRowInfo(pos: number, count: number, baseRow: number): void;

  /** 
   * 현재 활성화 되어져 있는 WorkSheet 객체를 반환합니다.
   *
  */
  getActiveWorkSheet(): IWorkSheet;

  /** 
   * 행/열의 헤더의 표시 상태를 반환 합니다.
   *
  */
  getDisplayHeadings(): boolean;

  /** 
   * 셀 편집 기능이 활성화되어 있을 때, 서버에서 계산 결과를 대기 중인지 여부를 반환합니다.
   *
  */
  getWateForRequest(): boolean;

  /** 
   * 행/열의 헤더를 표시할지 여부를 설정합니다.
   *
  * @param display 표시 여부
  */
  setDisplayHeadings(display: boolean): void;

  /**
   * @event 
   *
   * ClipBoard 데이터를 붙여넣기 할때 발생합니다.
   *
   * @param args 클립보드 데이터
   *
   * @example
   * ```js
   * MX_GRID.Viewer().OnBeginClipBoardPaste = function(args){
   *     //paste     
   * };
   * ```
   * Target : {@link iGridView}
  */
  OnBeginClipBoardPaste : ( args: {Rows:Array<Array<string>>,Range:ISelectionArea,IgnoreHiddenCells:boolean,Cancel:boolean} ) => void;


  /**
   * @event 
   *
   * 셀이 그려진 다음에 발생합니다.
   *
   * @param cell 대상 셀
   *
   * @example
   * ```js
   * MX_GRID.Viewer().OnCellDrawed = function (cell){
   *     var ctx = MX_GRID.Viewer().Context;
   *     ctx.save();
   *     try {  
   *         var rect = {
   *             "Left": cell.BoundRectangle.Left,
   *             "Top": cell.BoundRectangle.Top,
   *             "Width": cell.BoundRectangle.Width,
   *             "Height": cell.BoundRectangle.Height
   *         };
   *         left = rect.Left;        
   *         ctx.font = "12px 'Arial'";
   *         ctx.fillStyle = "#cccccc";        
   *         ctx.fillText("✏️", left, rect.Top + 13, rect.Width);
   *     }catch (e) { 
   * 
   *     }finally {
   *         ctx.restore();
   *     } 
   * }
   * ```
   * Target : {@link iGridView}
  */
  OnCellDrawed : ( cell: ICell ) => void;


  /**
   * @event 
   *
   * 키보드에서 키를 누를 때 발생합니다.
   *
   * @param event  현재 선택된 셀 정보
   * @param args 직접 처리 여부
   *
   * @example
   * ```js
   * MX_GRID.Viewer().OnKeyDown = function (event, args) {     
   *     if (event.ctrlKey) {         
   *         if (event.key == "Enter") {
   *             args.Handled = true;            
   *         }
   *         else if (event.key == "Backspace") {
   *             args.Handled = true;
   *              
   *         }
   *     }
   * } 
   * ```
   * Target : {@link iGridView}
  */
  OnKeyDown : ( event: JQuery.KeyDownEvent, args:  { Cell: ICell | null, Handled: boolean } ) => void;


  /**
   * @event 
   *
   * 키보드에서 키를 눌렀다가 뗄 때 발생합니다.
   *
   * @param event  현재 선택된 셀 정보
   * @param args 직접 처리 여부
   *
   * @example
   * ```js
   * MX_GRID.Viewer().OnKeyUp = function (event, args) {     
   *     if (event.ctrlKey) {         
   *         if (event.key == "Enter") {
   *             args.Handled = true;            
   *         }
   *         else if (event.key == "Backspace") {
   *             args.Handled = true;
   *              
   *         }
   *     }
   * } 
   * ```
   * Target : {@link iGridView}
  */
  OnKeyUp : ( event: JQuery.KeyUpEvent, args:  { Cell: ICell | null, Handled: boolean } ) => void;


  /**
   * @event 
   *
   * 화면이 그려질때마다 발생합니다.
   *
   * @param args
   *
   * @example
   * ```js
   * MX_GRID.Viewer().OnUpdated = function (){
   *     //...
   * }
   * ```
   * Target : {@link iGridView}
  */
  OnUpdated : (sender : iGridView
  , args : { 
  }
  ) => void;


}
