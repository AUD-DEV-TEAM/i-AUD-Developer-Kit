import { Grid } from "../../aud/control/Grid";
import { enVerticalPositionType } from "../../aud/enums/comm/enVerticalPositionType";
import { DataGridRow } from "../../aud/control/grids/DataGridRow";
/**
* 데이터를 표형태로 표현해주는 컨트롤.
*/
export interface DataGrid extends Grid{

  /**
   * 값이 NaN인 셀 텍스트
  */
  NaNCellText: string;

  /**
   * 페이지 번호
  */
  PageIndex: number;

  /**
   * 페이지 사이즈
  */
  PageSize: number;

  /**
   * 페이지 위치
  */
  PagingPosition: enVerticalPositionType;

  /**
   * 내보내기 시 세로 병합(MergeRule)과 가로 병합(필드 별 병합용 참조 필드)을 모두 해제합니다.
  */
  UseExportDisableMergeRule: boolean;

  /**
   * 페이징 사용 유무
  */
  UsePaging: boolean;

  /** 
   * 마지막 페이지의 위치를 구해주는 메소드. Record 개수 표시 옵션이 false일 경우에는 0으로 반환합니다.
   *
  */
  GetLastPageIndex(): number;

  /** 
   * 특정 위치의 레코드(행)을 찾아준다.
   *
  * @param idx 행 위치
  */
  GetRow(idx: number): DataGridRow;

  /** 
   * 전체 레코드(페이지를 사용하지 않을 경우 필터로 인해 숨은 레코드 포함)에서 특정 위치의 레코드(행)을 찾아준다.
   *
  * @param idx 행 위치
  */
  GetRowInTotalRows(idx: number): DataGridRow;

  /** 
   * 전체 레코드(필터 적용)의 수를 반환합니다.
   *
  */
  GetTotalPageRowCount(): number;

  /** 
   * 데이타 그리드를 그룹핑합니다.
   *
  * @param Fields 필드 목록
  */
  GroupGrid(Fields: string[]): void;

  /** 
   * 행을 현재 선택된 행의 다음 행에 삽입하는 메소드
   *
  */
  InsertRow(): DataGridRow;

  /** 
   * 행을 특정 위치에 삽입하는 메소드
   *
  * @param idx 삽입할 행 인덱스
  */
  InsertRow(idx: number): DataGridRow;

  /** 
   * 페이지를 사용할 경우 다음 페이지로 이동하는 메소드
   *
  */
  MoveNextPage(): void;

  /** 
   * 페이지를 사용할 경우 특정 페이지로 이동하는 메소드. Record 개수 표시 옵션이 true로 설정되어 있어야 합니다.
   *
  * @param PageIndex 찾으려는 페이지(1부터 시작)
  */
  MovePage(PageIndex: number): void;

  /** 
   * 페이지를 사용할 경우 이전 페이지로 이동하는 메소드
   *
  */
  MovePrevPage(): void;

}
