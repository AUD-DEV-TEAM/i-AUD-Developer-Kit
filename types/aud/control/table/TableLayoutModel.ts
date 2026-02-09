/**
* 테이블 레이아웃 모델의 셀 정보
*/
export interface TableLayoutCellModel{

  /**
   * 행 인덱스
  */
  Row: number;

  /**
   * 열 인덱스
  */
  Column: number;

  /**
   * 행 병합 수
  */
  RowSpan?: number;

  /**
   * 열 병합 수
  */
  ColumnSpan?: number;

  /**
   * 셀 텍스트
  */
  Text?: string;

}

/**
* 테이블 레이아웃의 JSON 모델 정보
*/
export interface TableLayoutModel{

  /**
   * 최대 행 수
  */
  MaxRow: number;

  /**
   * 자식 셀 목록
  */
  Children: TableLayoutCellModel[];

}
