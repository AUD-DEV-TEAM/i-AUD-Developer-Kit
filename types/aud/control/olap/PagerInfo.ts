/**
* PivotGrid의 페이징 옵션에 대한 정보를 제공합니다.
*/
export interface PagerInfo{

  /**
   * 현재 페이즈
  */
   readonly CurrentPage: number;

  /**
   * 페이지 사이즈
  */
  PageSize: number;

  /**
   * 전체 페이지 건수
  */
   readonly TotalPageCount: number;

  /**
   * 전체 Row 건수
  */
   readonly TotalRowCount: number;

  /**
   * 페이지 사용 여부
  */
  UsePaging: boolean;

}
