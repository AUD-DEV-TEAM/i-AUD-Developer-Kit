import { ScriptCellRange } from "../../../../com/matrix/script/excel/ScriptCellRange";
/**
* 대용량 엑셀 파일을 생성하기 위한 도구입니다.
*/
export interface ScriptFileCellWriter{

  /** 
   * 버퍼에 셀들 등록합니다.(셀 출력 시 주소 기준으로 정렬을 보장합니다.)
   *
  * @param cell 추가할 셀 객체
   * @hidden
  */
  addCell(cell: ScriptCellRange): void;

  /** 
   * 파일 쓰기를 완료하고 파일 객체를 닫습니다.
   *
   * @hidden
  */
  close(): void;

  /** 
   * 셀을 생성합니다.
   *
  * @param rangeName 셀 주소 e.g. A1
  * @param baseCell 복사할 원본 셀
  */
  createCell(rangeName: string, baseCell: ScriptCellRange): ScriptCellRange;

  /** 
   * 셀을 생성합니다.
   *
  * @param row 엑셀의 열 번호
  * @param column 엑셀의 행 번호
   * @hidden
  */
  createCell(row: number, column: number): ScriptCellRange;

  /** 
   * 셀을 생성합니다.
   *
  * @param rangeName 셀 주소 e.g. A1
   * @hidden
  */
  createCell(rangeName: string): ScriptCellRange;

  /** 
   * 셀을 생성합니다.
   *
  * @param row 엑셀의 열 번호
  * @param column 엑셀의 행 번호
  * @param baseCell 복사할 원본 셀
   * @hidden
  */
  createCell(row: number, column: number, baseCell: ScriptCellRange): ScriptCellRange;

  /** 
   * 셀의 정보를 파일로 출력합니다.
   *
  * @param cell 파일로 출력할 셀 객체
   * @hidden
  */
  writeCell(cell: ScriptCellRange): void;

  /** 
   * 버퍼에 담긴 모든 셀을 주소값으로 정렬 후 파일로 출력합니다.
   *
   * @hidden
  */
  writeCells(): void;

}
