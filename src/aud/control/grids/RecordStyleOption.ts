import { Color } from "../../../aud/drawing/Color";
/**
* DataGrid/TreeGrid 레코드 스타일 옵션
*/
export interface RecordStyleOption{

  /**
   * 그리드 컨트롤 레코드 마지막 선택 레코드 색
  */
  LastSelectedRecordColor: Color;

  /**
   * 그리드 컨트롤 레코드 반복행 배경색
  */
  OddRowBackgroundColor: Color;

  /**
   * 그리드 컨트롤 레코드 높이
  */
  RowHeight: number;

  /**
   * 그리드 컨트롤 레코드 선택 레코드 색
  */
  SelectedRecordColor: Color;

}
