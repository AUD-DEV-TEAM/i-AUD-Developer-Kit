/**
* 보고서 정보를 제공합니다.
*/
export interface ReportInfo{

  /**
   * 보고서 코드
  */
   readonly CODE: string;

  /**
   * 보고서 설명
  */
   readonly DESC: string;

  /**
   * 보고서 명
  */
   readonly NAME: string;

  /**
   * 상위 폴더 코드
  */
   readonly PARENT: string;

  /**
   * 보고서 모듈코드
  */
   readonly TYPE: string;

}
