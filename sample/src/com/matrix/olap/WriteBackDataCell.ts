/**
* OLAP Write-Back에서 수정한 셀 정보입니다.
*/
export interface WriteBackDataCell{

  /**
   * 사용자가 수정한 값
  */
   readonly After: number;

  /**
   * 사용자가 수정하기 이전의 값
  */
   readonly Before: number;

  /**
   * 필드의 이름
  */
   readonly Field: string;

}
