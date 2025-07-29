/**
* 뷰 옵션
*/
export interface OptionView{

  /**
   * 데이터 박스의 상하 좌우 마진
  */
  BoxMargin: double;

  /**
   * 셀 텍스트 가로 정렬(ex:left, center, right)
  */
  CellTextAlignment: string;

  /**
   * 데이터 표시 영역의 셀 너비
  */
  CellWidth: double;

  /**
   * 컬럼 헤더 영역의 높이
  */
  ColumnHeaderHeight: double;

  /**
   * 컬럼 헤더 영역 텍스트 가로 정렬(ex:left, center, right)
  */
  ColumnHeaderTextAlignment: string;

  /**
   * 필드 위치 이동 금지
  */
  DisableDragDropField: boolean;

  /**
   * 데이터 라벨의 마진
  */
  LabelMargin: double;

  /**
   * 멀티행의 행간 gap 높이
  */
  LineHeight: double;

  /**
   * 가로 고정 영역 헤더 정렬 (ex:left, center, right)
  */
  RowHeaderTextAlignment: string;

  /**
   * 데이터 행의 높이
  */
  RowHeight: double;

  /**
   * Minor Unit 라벨 표시 여부
  */
  VisibleMinorUnitLabel: boolean;

}
