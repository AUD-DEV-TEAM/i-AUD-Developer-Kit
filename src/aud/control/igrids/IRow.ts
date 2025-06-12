import { ICell } from "../../../aud/control/igrids/ICell";
/**
* MX_GRID Row 모델
*/
export interface IRow{

  /**
   * 셀 목록
  */
  Cells: ICell[];

  /**
   * 높이
  */
  Height: number;

  /**
   * 선택 여부
  */
  IsSelected: boolean;

  /**
   * Row Number
  */
  R: number;

  /**
   * Row의 수정 상태 (N,U,D)  
  */
  Status: string;

  /**
   * 상단 위치
  */
  Top: number;

  /**
   * 높이의 단위 percent=1 , fix=0
  */
  Unit: number;

  /**
   * 표시여부
  */
  Visible: boolean;

}
