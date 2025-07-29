import { ScriptDataTable } from "../../../com/matrix/script/ScriptDataTable";
/**
* 데이터셋 모델
*/
export interface ScriptDataSet{

  /** 
   * 데이터셋에 테이블을 추가합니다.
   *
  * @param table 테이블 객체
  * @param name 테이블 명
  */
  AddTable(table: ScriptDataTable, name: string): ScriptDataTable;

  /** 
   * 모든 테이블 객체를 제거합니다.
   *
  */
  ClearTables(): void;

  /** 
   * 데이터셋에 새 테이블을 생성하고, 생성된 테이블을 반환합니다.
   *
  * @param tableName 테이블 명
  */
  CreateTable(tableName: string): ScriptDataTable;

  /** 
   * 데이터셋의 테이블 목록 중 특정 위치(인덱스)의 테이블 객체를 반환합니다.
   *
  * @param idx 테이블 컬렉션 내 인덱스 값
  */
  getTable(idx: int): ScriptDataTable;

  /** 
   * 특정 이름을 가지는 테이블 객체를 반환합니다.
   *
  * @param key 테이블 명(컨트롤 명)
  */
  getTable(key: string): ScriptDataTable;

  /** 
   * 데이터셋이 가지고 잇는 테이블 개수를 반환합니다.
   *
  */
  getTableCount(): int;

  /** 
   * 데이터셋이 가지는 테이블 목록을 배열 유형으로 반환합니다.
   *
  */
  getTables(): ScriptDataTable[];

}
