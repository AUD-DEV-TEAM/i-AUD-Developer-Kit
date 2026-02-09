import { DataTable } from "../../aud/data/DataTable";
/**
* 기본 데이터 구조인 데이터셋에 대한 정보를 제공합니다.
*/
export interface DataSet{

  /** 
   * 테이블을 추가합니다.
   *
  * @param table 테이블 객체
  */
  AddTable(table: DataTable): void;

  /** 
   * 모든 데이터 테이블을 제거합니다.
   *
  */
  ClearTables(): void;

  /** 
   * 복제된 데이터 셋을 반환합니다.
   *
  */
  Clone(): DataSet;

  /** 
   * 데이터 테이블을 생성합니다.
   *
  * @param name 테이블 명
  */
  CreateTable(name: string): DataTable;

  /** 
   * 특정 데이터 테이블을 반환합니다.
   *
  * @param idx 테이블 인덱스(int) 또는 테이블 명(string)
  */
  GetTable(idx: number): DataTable;

  /** 
   * 특정 데이터 테이블을 반환합니다.
   *
  * @param tableName 데이터 테이블의 이름
  */
  GetTable(tableName: string): DataTable;

  /** 
   * 모든 테이블 수를 반환해주는 메소드
   *
  */
  GetTableCount(): number;

}
