/**
* 데이터 테이블의 레코드 객체에 대한 정보를 제공합니다.
*/
export interface DataRow{

  /**
   * 레코드의 상태 수정(U)/삭제(D)/신규(D)
  */
  RowState: string;

  /** 
   * 레코드의 상태를 삭제합니다.
   *
  */
  ClearRowState(): void;

  /** 
   * 레코드의 특정 필드의 셀 값을 반환합니다.
   *
  * @param name 필드명(string)
  */
  GetValue(name: string): object;

  /** 
   * 레코드의 특정 필드의 셀값을 설정합니다.
   *
  * @param name 필드명(string)
  * @param value 필드 값
  */
  SetValue(name: string, value: any): void;

}
