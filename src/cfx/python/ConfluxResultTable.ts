import { ScriptConfluxColumn } from "../../cfx/python/ScriptConfluxColumn";
import { enConfluxPythonDataType } from "../../cfx/python/enums/enConfluxPythonDataType";
import { ScriptConfluxResultRow } from "../../cfx/python/ScriptConfluxResultRow";
/**
* Conflux Python Scirpt의 결과 데이터 반환 모델입니다.
*/
export interface ConfluxResultTable{

  /** 
   * column을 추가합니다.
   *
   * @example
   * ```js
   * result_table = Conflux.create_result_table()
   * 
   * result_table.add_column('판매년도', True)
   * result_table.add_column('판매월', True)
   * result_table.add_column('지점구분명', False)
   * result_table.add_column('지점코드', False)
   * ```
  * @param column_name 컬럼 이름을 지정하는 파라미터
  * @param is_number  데이터 타입의 숫자 타입 여부 파라미터
  */
  add_column(column_name: str, is_number?: bool): ScriptConfluxColumn;

  /** 
   * column을 추가합니다.
   *
   * @example
   * ```js
   * result_table = Conflux.create_result_table()
   * 
   * result_table.add_column('판매년도', 2)
   * result_table.add_column('판매월', 2)
   * result_table.add_column('지점구분명', 4)
   * result_table.add_column('지점코드', 4)
   * ```
  * @param column_name  컬럼 이름을 지정하는 파라미터
  * @param data_type  컬럼의 데이터 타입을 지정하는 파라미터
  */
  add_column(column_name: str, data_type?: enConfluxPythonDataType): ScriptConfluxColumn;

  /** 
   * ScriptConfluxResultRow 객체를 이용하여 Row를 추가합니다.
   *
  * @param row row data 파라미터
  */
  append_row(row: ScriptConfluxResultRow): None;

  /** 
   * 값이 빈 ScriptConfluxResultRow 객체를 생성하여 Row를 추가합니다.
   *
  */
  append_row(): None;

  /** 
   * row를 추가합니다.
   *
  */
  create_row(): ScriptConfluxResultRow;

  /** 
   * Column명 또는 인덱스에 해당하는 Column을 반환합니다.
   *
  * @param key  반환 받을 컬럼명을 지정하는 파라미터
  */
  get_column(key: str | int): ScriptConfluxColumn;

  /** 
   * Column을 배열형태로 반환합니다.
   *
  */
  get_columns(): List<ScriptConfluxColumn>;

  /** 
   * 테이블 이름을 반환합니다.
   *
  */
  get_name(): str;

  /** 
   * Row를 반환합니다.
   *
  * @param index 반환 받을 row의 인덱스를 지정하는 파라미터
  */
  get_row(index: int): ScriptConfluxResultRow;

  /** 
   * 테이블 이름을 설정합니다.
   *
  * @param name  테이블 객체명을 지정하는 파라미터
  */
  set_name(name: str): None;

}
