import { NamedDictionary } from "../../aud/data/NamedDictionary";
import { DataRow } from "../../aud/data/DataRow";
import { enKeyType } from "../../aud/enums/comm/enKeyType";
import { enDataType } from "../../aud/enums/comm/enDataType";
import { DataColumn } from "../../aud/data/DataColumn";
import { DataSet } from "../../aud/data/DataSet";
/**
* 데이터 셋의 테이블 객체에 대한 정보를 제공합니다.
*/
export interface DataTable{

  /**
   * Columns 정보
   * @hidden
  */
  Columns: NamedDictionary;

  /**
   * 테이블 이름
  */
  Name: string;

  /**
   * 컬럼 수량
  */
  Rows: DataRow[];

  /** 
   * 컬럼을 추가합니다.
   *
  * @param name 컬럼명
  * @param caption 컬럼 캡션
  * @param keyType 키 유형
  * @param dataType 데이터 유형
  */
  AddColumn(name: string, caption: string, keyType: enKeyType, dataType: enDataType): void;

  /** 
   * 컬럼을 추가합니다.
   *
  * @param name 컬럼명
  * @param caption 컬럼 캡션
  * @param keyType 키 유형
  */
  AddColumn(name: string, caption: string, keyType: enKeyType): void;

  /** 
   * 컬럼을 추가합니다.
   *
  * @param name 컬럼명
  * @param isNumber 숫자인지 아닌지 여부
  */
  AddColumn(name: string, isNumber: boolean): void;

  /** 
   * 컬럼을 추가합니다.
   *
  * @param name 컬럼명
  * @param caption 컬럼 캡션
  */
  AddColumn(name: string, caption: string): void;

  /** 
   * 컬럼을 추가합니다.
   *
  * @param name 컬럼명
  */
  AddColumn(name: string): void;

  /** 
   * 레코드를 하나 추가하고 추가된 행 번호를 반환합니다.
   *
  * @param rowdata 레코드 데이터 문자열
  * @param delimeter 필드 구분자 (default: ','}
  */
  AppendRow(rowdata: string, delimeter: string): number;

  /** 
   * 레코드를 하나 추가하고 추가된 행 번호를 반환합니다.
   *
  * @param array 레코드 데이터를 가지는 array
  */
  AppendRow(array: Array<any>): number;

  /** 
   * 레코드를 하나 추가하고 추가된 행 번호를 반환합니다.
   *
  * @param row 레코드 객체
  */
  AppendRow(row: DataRow): number;

  /** 
   * 레코드를 하나 추가하고 추가된 행 번호를 반환합니다.
   *
  */
  AppendRow(): number;

  /** 
   * 레코드들의 상태 수정(U)/삭제(D)/신규(D) 값들을 초기화 시킵니다.
   *
  * @param removeRow row를 삭제할지 여부
  */
  ClearRowState(removeRow: boolean): void;

  /** 
   * 모든 레코드를 삭제합니다.
   *
  */
  ClearRows(): void;

  /** 
   * 복제된 테이블을 반환합니다.
   *
  */
  Clone(): DataTable;

  /** 
   * 복제된 테이블을 반환하되 행은 포함하지 않습니다.
   *
  */
  CloneSchema(): DataTable;

  /** 
   * 레코드의 상태값(N,U,D)가 없을 경우 전체 레코드를 반환합니다.
   *
  * @param flag 상태값(N, U, D), 값이 없을 경우 전체
  */
  GetChanges(flag: string): DataTable;

  /** 
   * 특정 이름의 컬럼을 반환합니다.
   *
  * @param name 특정 컬럼의 이름
  */
  GetColumn(name: string): DataColumn;

  /** 
   * 컬럼 이름 목록을 반환합니다.
   *
  */
  GetColumnNames(): string[];

  /** 
   * 특정 위치의 레코드를 반환합니다.
   *
  * @param index 특정 레코드 위치의 인덱스 값
  */
  GetRow(index: number): DataRow;

  /** 
   * 레코드의 수를 반환한다.
   *
  */
  GetRowCount(): number;

  /** 
   * 배열 데이터를 기준으로 행들을 자동 생성합니다.
   *
   * @example
   * ```js
   * //----------- 단일 컬럼 샘플
   *         var ds  = Matrix.CreateDataSet();
   *         var dt  = ds.CreateTable("T1");
   *         dt.AddColumn("CODE");
   *         // 1차원 배열 사용
   *         dt.ImportRows(["A01", "A02", "A03"]);
   *         Matrix.getObject("comboBox").SetDataSet(ds);
   *         
   *         //----------- 다중 컬럼 샘플        
   *         var ds  = Matrix.CreateDataSet();
   *         var dt  = ds.CreateTable("T1");
   *         dt.AddColumn("CODE");
   *         dt.AddColumn("NAME");
   *         //2차원 배열
   *         dt.ImportRows([["Kr","Korea"], ["En","USA"],["Ca","Canada"]]); 
   *         Matrix.getObject("comboBox").SetDataSet(ds);
   * ```
  * @param rows 
  */
  ImportRows(rows?: Array<any>|Array<Array<any>>): void;

  /** 
   * 컬럼을 삽입합니다.
   *
  * @param areaIndex 삽입할 위치
  * @param name 컬럼명
  */
  InsertColumn(areaIndex: number, name: string): void;

  /** 
   * 컬럼을 삽입합니다.
   *
  * @param areaIndex 삽입할 위치
  * @param name 컬럼명
  * @param caption 컬럼 캡션
  * @param keyType 키 유형
  * @param dataType 데이터 유형
  */
  InsertColumn(areaIndex: number, name: string, caption: string, keyType: enKeyType, dataType: enDataType): void;

  /** 
   * 컬럼을 삽입합니다.
   *
  * @param areaIndex 삽입할 위치
  * @param name 컬럼명
  * @param caption 컬럼 캡션
  * @param keyType 키 유형
  */
  InsertColumn(areaIndex: number, name: string, caption: string, keyType: enKeyType): void;

  /** 
   * 컬럼을 삽입합니다.
   *
  * @param areaIndex 삽입할 위치
  * @param name 컬럼명
  * @param isNumber 숫자인지 아닌지 여부
  */
  InsertColumn(areaIndex: number, name: string, isNumber: boolean): void;

  /** 
   * 컬럼을 삽입합니다.
   *
  * @param areaIndex 삽입할 위치
  * @param name 컬럼명
  * @param caption 컬럼 캡션
  */
  InsertColumn(areaIndex: number, name: string, caption: string): void;

  /** 
   * 특정 위치의 레코드를 삭제합니다.
   *
  * @param idx 레코드 위치
  */
  RemoveRow(idx: number): void;

  /** 
   * 테이블 데이터에서 필터 조건에 해당하는 레코드만 추출한 테이블의 사본을 반환합니다.
   *
  * @param funtion 필터 함수(function(rowindex, dataRow){return true;};)
  */
  Select(funtion: Function): DataTable;

  /** 
   * 레코드의 상태값(N,U,D)을 일괄 변경합니다.
   *
  * @param flag 상태값(N, U, D)
  */
  SetRowStatus(flag: string): void;

  /** 
   * 테이블의 데이터를 정렬 표현식에 의해 정렬합니다.
   *
  * @param method 정렬할 기준 메소드
  */
  Sort(method: Function): void;

  /** 
   * 현재 테이블 포함하는 데이터셋을 새로 생성하여 반환합니다.
   *
  */
  ToDataSet(): DataSet;

  /** 
   * 레코드의 특정 셀의 값을 반환합니다.
   *
  * @param rowIdx 특정 레코드의 위치
  * @param field 특정 컬럼의 이름 또는 인덱스
  */
  getData(rowIdx: number, field: string | number): any;

  /** 
   * 레코드의 특정 셀의 값을 반환합니다.
   *
  * @param rowIdx 특정 레코드의 위치
  * @param fieldName 특정 컬럼의 이름
  */
  getRowValue(rowIdx: number, fieldName: string): any;

  /** 
   * 레코드의 특정 셀의 값을 설정합니다.
   *
  * @param rowIdx 특정 레코드의 위치
  * @param field 특정 컬럼의 이름 또는 인덱스
  * @param value 값
  */
  setData(rowIdx: number, field: string | number, value: any): void;

  /** 
   * 레코드의 특정 셀의 값을 설정합니다.
   *
  * @param rowIdx 특정 레코드의 위치
  * @param fieldName 특정 컬럼의 이름
  * @param val 설정하고자 하는 값
  */
  setRowValue(rowIdx: number, fieldName: string, val: any): void;

}
