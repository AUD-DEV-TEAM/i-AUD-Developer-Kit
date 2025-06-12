import { Style } from "../../../aud/drawing/Style";
import { Control } from "../../../aud/control/Control";
import { enCellType } from "../../../aud/enums/comm/enCellType";
import { Grid } from "../../../aud/control/Grid";
/**
* 데이터 그리드의 멀티 헤더 셀에 대한 모델
*/
export interface MultiHeaderCell{

  /**
   * 셀의 스타일
  */
  CellStyle: Style;

  /**
   * 열 위치
  */
  Col: number;

  /**
   * 헤더 정렬 방식(start:왼쪽정렬/center:중앙정렬/end:오른쪽정렬)
  */
  HeaderPosition: string;

  /**
   * 내부 컨트롤
  */
  InnerControl: Control;

  /**
   * 행 위치
  */
  Row: number;

  /**
   * 셀 유형
   * @hidden
  */
  Type: enCellType;

  /**
   * 셀의 텍스트
  */
  Value: object;

  /** 
   * 내부 컨트롤 생성 메소드
   *
  * @param grid 
  * @param container 
  * @param name 
   * @hidden
  */
  CreateInnerControl(grid: Grid, container: any, name: string): void;

  /** 
   * 그리드의 기본 헤더 스타일로 초기화 해준다.
   *
  * @param grid grid control
  */
  InitCellStyle(grid: Grid): void;

  /** 
   * 셀을 병합합니다.
   *
  * @param ColumnIndex 셀의 Column 인덱스
  * @param RowIndex 셀의 Row 인덱스
  * @param colSpan Column 병합 개수
  * @param rowSpan Row 병합 개수
  */
  Merge(ColumnIndex: number, RowIndex: number, colSpan: number, rowSpan: number): void;

  /** 
   * 박스스타일 키로 스타일을 적용합니다.
   *
   * @example
   * ```js
   *  var DataGrid = Matrix.getObject("DataGrid"); 
   *  var mHeaders = DataGrid.GetMultiHeader();
   *  //데이터 그리드의 멀티 헤더의 스타일을 일괄 수정 합니다.
   *  var cell;
   *  for(var r=0;r<mHeaders.MaxRow;r++){
   *  	for(var c=0;c<mHeaders.MaxColumn;c++){
   * 		cell = mHeaders.GetCell(r ,c);
   * 		cell.SetBoxStyleName("StyleName");
   * 	}
   *  }
   *  DataGrid.ReDraw();
   * ```
  * @param boxStyleKey 박스스타일키
  */
  SetBoxStyleKey(boxStyleKey: string): string;

  /** 
   * 박스 스타일명으로 스타일을 적용합니다.
   *
   * @example
   * ```js
   *  var DataGrid = Matrix.getObject("DataGrid"); 
   *  var mHeaders = DataGrid.GetMultiHeader();
   *  //데이터 그리드의 멀티 헤더의 스타일을 일괄 수정 합니다.
   *  var cell;
   *  for(var r=0;r<mHeaders.MaxRow;r++){
   *  	for(var c=0;c<mHeaders.MaxColumn;c++){
   * 		cell = mHeaders.GetCell(r ,c);
   * 		cell.SetBoxStyleName("StyleName");
   * 	}
   *  }
   *  DataGrid.ReDraw();
   * ```
  * @param boxStyleName 박스 스타일 명
  */
  SetBoxStyleName(boxStyleName: string): string;

  /** 
   * 셀의 병합을 해제합니다.
   *
  * @param useInnerControl 컨트롤 유지 여부
  */
  UnMerge(useInnerControl: boolean): void;

}
