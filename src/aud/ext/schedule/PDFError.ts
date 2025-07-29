/**
* PDF Export시, Error 리턴하는 object
*/
export interface PDFError{

  /**
   * Major 마지막 단위로 계산한 조회 가능 일자
  */
  AvailableDate: int;

  /**
   * Major 마지막 단위로 계산한 초과한 일자
  */
  OverDate: int;

  /**
   * 초과한 너비(pixel)
  */
  OverWidth: int;

}
