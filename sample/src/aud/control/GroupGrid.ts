import { DataGrid } from "../../aud/control/DataGrid";
/**
* 데이터를 표형태로 표현해주는 컨트롤.
*/
export interface GroupGrid extends DataGrid{

  /**
   * 소계, 합계행번호 표시 여부
  */
  ShowSubTotalRowHeader: boolean;

  /**
   * 내보내기 시 세로 병합(MergeRule)과 가로 병합(필드 별 병합용 참조 필드)을 모두 해제합니다.
  */
  UseExportDisableMergeRule: boolean;

}
