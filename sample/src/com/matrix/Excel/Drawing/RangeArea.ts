/**
* 엑셀의 셀 영역에 대한 정보를 제공합니다.
*/
export interface RangeArea{

  /** 
   * 빈 영역인지 여부를 반환 합니다.
   *
  */
  IsEmpty(): boolean;

  /** 
   * 영역의 종료 열의 주소값을 반환 합니다.
   *
  */
  getBottom(): number;

  /** 
   * 영역의 높이를 반환 합니다.
   *
  */
  getHeight(): number;

  /** 
   * 영역의 시작 행의 주소값을 반환 합니다.
   *
  */
  getLeft(): number;

  /** 
   * 영역의 주소명을 반환 합니다.
   *
  */
  getRangeName(): string;

  /** 
   * 영역의 종료 행의 주소값을 반환 합니다.
   *
  */
  getRight(): number;

  /** 
   * 영역의 시작 열의 주소값을 반환 합니다.
   *
  */
  getTop(): number;

  /** 
   * 영역의 너비를 반환 합니다.
   *
  */
  getWidth(): number;

}
