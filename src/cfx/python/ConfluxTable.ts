import { ScriptConfluxColumn } from "../../cfx/python/ScriptConfluxColumn";
import { ScriptConfluxRow } from "../../cfx/python/ScriptConfluxRow";
/**
* Conflux Python Script의 부모 노드의 데이터를 가져오는 모델입니다.
*/
export interface ConfluxTable{

  /** 
   * Fetch를 실행합니다.
   *
  */
  execute_fetch(): None;

  /** 
   * Column명 또는 index에 해당하는 Column을 반환합니다.
   *
  * @param key  받환 받을 컬럼명을 지정하는 파라미터
  */
  get_column(key: str | int): ScriptConfluxColumn;

  /** 
   * 테이블의 Column을 배열형태로 반환합니다.
   *
  */
  get_columns(): List<ScriptConfluxColumn>;

  /** 
   * 테이블 이름을 반환합니다.
   *
  */
  get_name(): str;

  /** 
   * 받아온 Row중 해당하는 인덱스 Row를 반환합니다.
   *
  * @param index  반환 받을 row의 인덱스를 지정하는 파라미터
  */
  get_row(index?: int): ScriptConfluxRow;

  /** 
   * 테이블 Row 목록을 모두 반환합니다.
   *
  */
  get_row(): List<ScriptConfluxRow>;

  /** 
   * 다음 행이 있는지에 대한 여부를 확인해서 반환합니다.
   *
  */
  next_row(): bool;

  /** 
   * 테이블명을 지정합니다.
   *
  * @param name ConfluxTable 객체명을 지정하는 파라미터
  */
  set_name(name: str): None;

}
