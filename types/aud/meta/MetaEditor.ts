import { Control } from "../../aud/control/Control";
/**
* i-META Viewer 쿼리 미리 보기 영역
* @hidden
*/
export interface MetaEditor extends Control{

  /** 
   * SQL Text를 설정하는 메소드
   *
  * @param sqlText SQL 문
   * @hidden
  */
  SetValue(sqlText: string): void;

}
