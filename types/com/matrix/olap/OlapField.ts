/**
* OLAP Grid의 필드 객체 입니다.
*/
export interface OlapField{

  /**
   * 필드 표시명
  */
   readonly Caption: string;

  /**
   * 데이터 테이블의 컬럼 인덱스
  */
   readonly DataColumnIndex: number;

  /**
   * 필드 이름
  */
   readonly Name: string;

}
