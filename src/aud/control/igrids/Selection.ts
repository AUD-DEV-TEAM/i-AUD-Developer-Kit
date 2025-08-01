import { IRow } from "../../../aud/control/igrids/IRow";
import { ISelectionArea } from "../../../aud/control/igrids/ISelectionArea";
import { ICell } from "../../../aud/control/igrids/ICell";
import { IValValidator } from "../../../aud/control/igrids/IValValidator";
/**
* MX-GRID Selection 모델
*/
export interface Selection{

  /**
   * 외곽 라인 색상
  */
  BorderColor: string;

  /**
   * 선택 모드 (0:Default, 1:SingleCell, 2:SingleRow)
  */
  SelectionMode: number;

  /** 
   * 선택 영역의 열의 너비를 글자 크기에 맞게 자동으로 설정합니다.
   *
  */
  AutoFitColumns(): boolean;

  /** 
   * 선택 영역의 행 높이를 글자 크기에 맞게 자동으로 설정합니다.
   *
  * @param rows 선택된 영역이 아닌 다른 영역에 대해서 작업할 경우 해당 Row 목록을 전달합니다.
  */
  AutoFitRows(rows?: number[]): boolean;

  /** 
   * 모든 선택 항목을 초기화 합니다.
   *
  */
  Clear(): void;

  /** 
   * 선택된 셀들의 데이터를 복사합니다.
   *
  */
  Copy(): string;

  /** 
   * 선택된 영역을 병합하거나, 병합된 영역이면 병합을 해제 합니다.
   *
  */
  Merge(): void;

  /** 
   * 데이터를 선택한 셀에 붙여넣기 합니다.
   *
  * @param text 붙여넣을 데이터
  */
  Paste(text: string): void;

  /** 
   * 특정 영역을 선택 합니다.
   *
  * @param fromR 선택 시작 위치 Row
  * @param fromC 선택 시작 위치 Column
  * @param toR 선택 종료 위치 Row
  * @param toC 선택 종료 위치 Column
  */
  Select(fromR: number, fromC: number, toR: number, toC: number): void;

  /** 
   * 특정 영역을 선택 합니다.
   *
  * @param fromRange 선택 시작 위치(eg. A1)
  * @param toRange 선택 시작 위치(eg. C10))
  */
  Select(fromRange: string, toRange: string): void;

  /** 
   * 특정 영역을 선택 합니다.
   *
  * @param rIndex 해당 찾으려는 셀의 행 인덱스 값
  * @param cIndex 해당 찾으려는 셀의 열 인덱스 값
  */
  Select(rIndex: number, cIndex: number): void;

  /** 
   * 특정 영역을 선택 합니다.
   *
  * @param rangeName 해당 찾으려는 셀의 영역(eg. A1:B10 or A1)
  */
  Select(rangeName: string): void;

  /** 
   * 특정 위치의 Row 영역 선택하기
   *
  * @param fromRow 시작 행 정보
  * @param toRow 종료 행 정보
  */
  SelectRows(fromRow: IRow, toRow?: IRow): void;

  /** 
   * 현재 선택된 셀의 유효성 정보를 모드 제거 합니다.
   *
  * @param targetRect 선택한 영역외에 영역에 대해서 작업 할 경우 해당 영역을 전달 합니다.
  */
  clearValidator(targetRect?: ISelectionArea): boolean;

  /** 
   * 현재 선택된 셀을 반환 합니다.
   *
  */
  getCurrentCell(): ICell;

  /** 
   * 특정 영역이 화면에 그려진 실제 위치를 반환 합니다.
   *
  * @param range 엑셀 영역 이름 e.g. A1:C9
  */
  getDrawdRectangle(range: string): ISelectionArea;

  /** 
   * 선택된 영역이 편집 가능한지를 반환 합니다.
   *
  * @param targetRect 선택 영역이 아닌 다른 영역을 설정하고자 하면 해당 영역의 위치 정보를 전달 합니다.
  */
  getEditable(targetRect?: ISelectionArea): boolean;

  /** 
   * 선택된 영역의 셀 목록을 반환 합니다.
   *
  */
  getSelectedCells(): ICell[];

  /** 
   * 선택된 영역의 좌표 정보를 반환 합니다.
   *
  */
  getSelectionRectangle(): ISelectionArea;

  /** 
   * 선택된 영역의 스타일 공통 정보를 반환 합니다.
   *
  */
  getStyle(): any;

  /** 
   * 현재 선택된 셀의 유효성 검사 정보를 반환 합니다.
   *
  */
  getValidator(): IValValidator;

  /** 
   * 선택된 영역에 border 스타일을 설정합니다.
   *
  * @param lineStyle 스타일 문자열 e.g.Thin,#FF000000
  * @param left border-left
  * @param top border-top
  * @param right border-right
  * @param bottom border-bottom
  * @param horizon horizon
  * @param virtical virtical
  * @param diagonalup diagonalup
  * @param diagonaldown diagonaldown
  */
  setBorderStyle(lineStyle: string, left: boolean, top: boolean, right: boolean, bottom: boolean, horizon: boolean, virtical: boolean, diagonalup: boolean, diagonaldown: boolean): boolean;

  /** 
   * 현재 선택된 셀을 변경 합니다.
   *
  * @param cell 
  */
  setCurrentCell(cell: ICell): void;

  /** 
   * 선택된 영역을 편집 가능한 영역으로 설정합니다.
   *
  * @param editable 수정 가능 여부
  * @param targetRect 선택 영역이 아닌 다른 영역을 설정하고자 하면 해당 영역의 위치 정보를 전달 합니다.
  */
  setEditable(editable: boolean, targetRect?: ISelectionArea): void;

  /** 
   * 틀고정을 설정합니다.
   *
  * @param freeze 틀고정 여부
  * @param row 선택된 영역이 아닌 다른 위치에 틀고정 시 해당 Row 번호를 전달 합니다.
  * @param col 선택된 영역이 아닌 다른 위치에 틀고정 시 해당 Column 번호를 전달 합니다.
  */
  setFreezePanes(freeze: boolean, row?: number, col?: number): void;

  /** 
   * 선택된 영역에 스타일을 설정 합니다.
   *
  * @param style 스타일 모델 정보
  * @param targetRect (옵션)스타일을 설정할 영역을 지정합니다.
  * @param forceUpdate (옵션)true로 설정 시 주어진 스타일이 없는 셀에 스타일은 무시합니다.
  */
  setStyle(style: any, targetRect?: ISelectionArea, forceUpdate?: boolean): void;

  /** 
   * 현재 선택된 셀의 유효성 검사 정보를 설정합니다.
   *
  * @param validator  유효성 검사 모델
  * @param targetRect 현재 선택된 영역이 아닌 다른 영역에 대해서 처리할 경우 해당 영역 전달
  * @param mergeModel 병합할 유효성 검사 모델
  */
  setValidator(validator: IValValidator, targetRect?: ISelectionArea, mergeModel?: IValValidator): boolean;

}
