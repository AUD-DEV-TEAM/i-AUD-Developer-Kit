import { WorkSheet } from "../../../aud/control/igrids/WorkSheet";
import { XLSWorkBook } from "../../../aud/control/igrids/XLSWorkBook";
/**
* 엑셀 workbook 모델
*/
export interface WorkBook{

  /**
   * 엑셀 모델 내 Worksheet 목록을 반환 합니다.
  */
   readonly WorkSheets: WorkSheet[];

  /**
   * 엑셀 모델을 직렬화하여 반환 합니다.
   *
  * @returns 엑셀 Workbook 직렬화 데이터. 실패 시 null 반환
  */
  Serialize(): XLSWorkBook | null;

  /** 
   * 현재 활성화 된 worksheet 객체를 반환 합니다.
   *
  */
  getActiveSheet(): WorkSheet;

}
