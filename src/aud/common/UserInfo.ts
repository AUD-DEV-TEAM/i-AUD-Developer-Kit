/**
* 사용자 정보를 제공합니다.
*/
export interface UserInfo{

  /**
   * 부서 코드
  */
   readonly DeptCode: string;

  /**
   * 부서 경로
  */
   readonly DeptPath: string;

  /**
   * Client IP
  */
   readonly IPAddress: string;

  /**
   * 다국어 코드
  */
   readonly LangCode: string;

  /**
   * 사용자 코드
  */
   readonly UserCode: string;

  /**
   * 암호화된 사용자 코드
  */
   readonly UserEncCode: string;

  /**
   * 사용자 명
  */
   readonly UserName: string;

  /**
   * 사용자 그룹
  */
   readonly UserRole: string;

}
