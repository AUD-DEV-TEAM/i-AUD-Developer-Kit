import { WorkSheet } from "../../../aud/control/igrids/WorkSheet";
/**
* 엑셀 workbook 모델
*/
export interface WorkBook{

  /**
   * 엑셀 모델 내 Worksheet 목록을 반환 합니다.
  */
   readonly WorkSheets: WorkSheet[];

  /** 
   * 엑셀 모델을 반환 합니다.
   *
  */
  Serialize(): any;

  /** 
   * 현재 활성화 된 worksheet 객체를 반환 합니다.
   *
  */
  getActiveSheet(): WorkSheet;

}
