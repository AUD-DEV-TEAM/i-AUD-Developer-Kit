import { DataGrid } from "../../aud/control/DataGrid";
/**
* 데이터를 표형태로 표현해주는 컨트롤.
*/
export interface GroupGrid extends DataGrid{

  /**
   * 소계, 합계행번호 표시 여부
  */
  ShowSubTotalRowHeader: boolean;

}
