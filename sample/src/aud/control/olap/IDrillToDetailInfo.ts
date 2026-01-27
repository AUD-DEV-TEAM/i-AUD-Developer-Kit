import { IDrillFilterInfo } from "../../../aud/control/olap/IDrillFilterInfo";
/**
* 데이터 셀 drill to detail 를 위한 상세 정보 모델
*/
export interface IDrillToDetailInfo{

  /**
   * Index of Column
  */
   readonly Column: number;

  /**
   * 필터 정보
  */
   readonly Filters: IDrillFilterInfo[];

  /**
   * Index of Row
  */
   readonly Row: number;

}
