import { OlapField } from "../../../aud/control/olap/OlapField";
/**
* 필드 간 연결 정보
*/
export interface FieldGroup{

  /**
   * 그룹의 항목 리스트(필드리스트)
  */
   readonly Childrens: string[];

  /**
   * 그룹명
  */
   readonly Name: string;

  /** 
   * 변경된 필드 그룹 정보를 반영합니다.
   *
  */
  Update(): void;

  /** 
   * 계층형 필드로 변경합니다.
   *
  */
  UpdateToHierarchy(): OlapField;

}
