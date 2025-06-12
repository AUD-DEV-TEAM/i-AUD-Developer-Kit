import { DataGridColumn } from "../../../aud/control/grids/DataGridColumn";
import { MergeCell } from "../../../aud/control/grids/MergeCell";
import { DataGridRow } from "../../../aud/control/grids/DataGridRow";
/**
* 데이터 그리드의 셀에 대한 모델
*/
export interface DataGridCell{

  /**
   * 셀의 배경색(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
  */
  BackColor: string;

  /**
   * 셀의 필드 정보
  */
  Column: DataGridColumn;

  /**
   * 실제 데이터 객체
  */
  Data: object;

  /**
   * 텍스트 Bold 처리 유무(true 인 경우 Bold 처리)
  */
  FontBold: boolean;

  /**
   * 텍스트 색상(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
  */
  FontColor: string;

  /**
   * 텍스트의 Italic 처리 유무(true 인 경우 Italic 처리)
  */
  FontItalic: boolean;

  /**
   * 병합 셀
  */
  MergeCell: MergeCell;

  /**
   * 셀의 부모 객체(노드/ 행)
  */
  Row: DataGridRow;

  /**
   * 콤보박스 셀의 텍스트
  */
   readonly Text: object;

  /**
   * 셀의 텍스트
  */
  Value: object;

}
