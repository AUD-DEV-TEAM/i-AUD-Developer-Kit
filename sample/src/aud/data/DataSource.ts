/**
* 보고서의 데이터소스 객체에 대한 접근을 제공합니다.
*/
export interface DataSource{

  /**
   * 데이터소스 코드
  */
   readonly Code: string;

  /**
   * 데이터소스의 커넥션 코드
  */
   readonly ConnectionCode: string;

  /**
   * 데이터소스 이름
  */
   readonly Name: string;

  /**
   * 메타 사용 여부
  */
   readonly UseMeta: boolean;

}
