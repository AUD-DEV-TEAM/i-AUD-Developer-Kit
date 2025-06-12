import { ScriptDataTable } from "../../../../com/matrix/script/ScriptDataTable";
import { ScriptDataRow } from "../../../../com/matrix/script/ScriptDataRow";
/**
* 엑셀(MX-GRID)의 특정 Range를 순차적으로 읽을 수 있는 기능을 제공합니다.
*/
export interface WorkSheetDataReader{

  /** 
   * 엑셀의 영역의 데이터에 대한 스키마를 확인할 수 있는 DataTable 정보를 반환 합니다.
(컬럼 목록만 존재하며, 레코드 정보는 존재하지 않습니다.)
   *
  */
  ReadSchema(): ScriptDataTable;

  /** 
   * 현재 객체를 닫고 메모리를 해제 합니다.
   *
  */
  close(): void;

  /** 
   * 레코드를 순차적으로 읽을 시 다음 레코드의 존재 여부를 반환 합니다.
   *
  */
  hasNext(): boolean;

  /** 
   * 레코드 객체를 반환 합니다.
   *
  */
  next(): ScriptDataRow;

}
