import { DataGrid } from "../../aud/control/DataGrid";
/**
 * 데이터를 표 형태로 표현하는 그룹 그리드 컨트롤입니다.
 */
export interface GroupGrid extends DataGrid{

  /**
   * 소계/합계 행 번호 표시 여부를 가져오거나 설정합니다.
  */
  ShowSubTotalRowHeader: boolean;

  /**
   * 내보내기 시 세로 병합(MergeRule)과 가로 병합(필드별 병합용 참조 필드)을 모두 해제할지 여부를 가져오거나 설정합니다.
  */
  UseExportDisableMergeRule: boolean;

}
