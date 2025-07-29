import { ScriptCopyRange } from "../../../../com/matrix/script/excel/ScriptCopyRange";
import { RangeArea } from "../../../../com/matrix/Excel/Drawing/RangeArea";
import { ScriptDataTable } from "../../../../com/matrix/script/ScriptDataTable";
import { ScriptChart } from "../../../../com/matrix/script/excel/ScriptChart";
import { enChartType } from "../../../../com/matrix/script/excel/enChartType";
import { ScriptImage } from "../../../../com/matrix/script/excel/ScriptImage";
import { ConditionFormatList } from "../../../../com/matrix/script/excel/ConditionFormatList";
import { ScriptWorkSheetTableBinder } from "../../../../com/matrix/script/data/ScriptWorkSheetTableBinder";
import { ScriptFileCellWriter } from "../../../../com/matrix/script/excel/ScriptFileCellWriter";
import { WorkSheetPageSetup } from "../../../../com/matrix/Excel/WorkSheetPageSetup";
import { ScriptCellRange } from "../../../../com/matrix/script/excel/ScriptCellRange";
import { SparklineGroupCollectionEx } from "../../../../com/matrix/Excel/SparkLine/SparklineGroupCollectionEx";
import { ValidatorCollection } from "../../../../com/matrix/Excel/Validation/ValidatorCollection";
import { enHorizontal } from "../../../../com/matrix/script/excel/enHorizontal";
import { enVertical } from "../../../../com/matrix/script/excel/enVertical";
import { ScriptCellStyle } from "../../../../com/matrix/script/excel/ScriptCellStyle";
import { enWrapText } from "../../../../com/matrix/script/excel/enWrapText";
/**
* 엑셀의 WorkSheet에 대한 접근을 제공합니다.
*/
export interface ScriptWorkSheet{

  /** 
   * 스타일을 복제합니다.
   *
  * @param sourceWorksheet source workSheet
  * @param sourceColumn index of start colmun(eg.1)
  * @param target address of  target column list(eg.1,2,3..10)
  */
  CloneStyleColumnToColumn(sourceWorksheet: ScriptWorkSheet, sourceColumn: int, target: string): void;

  /** 
   * 스타일을 복제합니다.
   *
  * @param sourceWorksheet source workSheet
  * @param sourceRow index of start row(eg.1)
  * @param target address of  target row list(eg.1,2,3..10)
  */
  CloneStyleRowToRow(sourceWorksheet: ScriptWorkSheet, sourceRow: int, target: string): void;

  /** 
   * Worksheet의 특정 영역을 복사한다.
   *
  * @param beginRow 시작 열 번호(1부터 시작 됨)
  * @param beginCol 시작 행 번호(1부터 시작 됨)
  * @param endRow 종료 열 번호(1부터 시작 됨)
  * @param endCol 종료 행 번호(1부터 시작 됨)
  */
  Copy(beginRow: int, beginCol: int, endRow: int, endCol: int): ScriptCopyRange;

  /** 
   * Worksheet의 특정 영역을 복사한다.
   *
  * @param fromRange 시작 셀의 주소(eg.B1)
  * @param toRange 종료 셀의 주소(eg.G10)
  */
  Copy(fromRange: string, toRange: string): ScriptCopyRange;

  /** 
   * Worksheet의 특정 영역을 복사한다.
   *
  * @param rangeName 셀의 영역 주소(eg.B1:F10)
  */
  Copy(rangeName: string): ScriptCopyRange;

  /** 
   * DataTable의 데이터를 worksheet에 삽입합니다.
   *
  * @param table data table
  * @param range 위치 (eg. A1)
  * @param headerWrite 표의 헤더를 표시할지 여부
  */
  CopyFromDataTable(table: ScriptDataTable, range: string, headerWrite: boolean): RangeArea;

  /** 
   * 테이블 형태의 Json데이터를 데이터를 worksheet에 삽입합니다.
   *
  * @param table data table
  * @param range 위치 (eg. A1)
  * @param headerWrite 표의 헤더를 표시할지 여부
  * @param columns 바인딩 대상 컬럼 목록(분리자=,)
  */
  CopyFromDataTable(table: ScriptDataTable, range: string, headerWrite: boolean, columns: string): RangeArea;

  /** 
   * Insert table Json data into the worksheet. 
   *
  * @param jsonText json text
  * @param range 위치 (eg. A1)
  */
  CopyFromJsonTable(jsonText: string, range: string): RangeArea;

  /** 
   * 테이블 형태의 Json데이터를 데이터를 worksheet에 삽입합니다.
   *
  * @param jsonText json text
  * @param row row number
  * @param col column number
  */
  CopyFromJsonTable(jsonText: string, row: int, col: int): RangeArea;

  /** 
   * 차트를 생성합니다.
   *
  * @param chartType 차트 타입
  * @param fromRange 차트 생성 위치 시작 셀의 주소(eg.B1)
  * @param toRange 차트 생성 위치 종료 셀의 주소(eg.G10)
  */
  CreateChart(chartType: enChartType, fromRange: string, toRange: string): ScriptChart;

  /** 
   * 차트를 생성합니다.
   *
  * @param chartType 차트 타입
  * @param beginRow 시작 열 번호(1부터 시작 됨)
  * @param beginCol 시작 행 번호(1부터 시작 됨)
  * @param endRow 종료 열 번호(1부터 시작 됨)
  * @param endCol 종료 행 번호(1부터 시작 됨)
  */
  CreateChart(chartType: enChartType, beginRow: int, beginCol: int, endRow: int, endCol: int): ScriptChart;

  /** 
   * 차트를 생성합니다.
   *
  * @param jsonText json text
  * @param range 차트 생성 위치 시작 셀의 주소(eg.B1:K10)
  */
  CreateChartByJson(jsonText: string, range: string): ScriptChart;

  /** 
   * 차트를 생성합니다.
   *
  * @param jsonText json text
  * @param beginRow 시작 열 번호(1부터 시작 됨)
  * @param beginCol 시작 행 번호(1부터 시작 됨)
  * @param endRow 종료 열 번호(1부터 시작 됨)
  * @param endCol 종료 행 번호(1부터 시작 됨)
  */
  CreateChartByJson(jsonText: string, beginRow: int, beginCol: int, endRow: int, endCol: int): ScriptChart;

  /** 
   * 차트를 생성합니다.
   *
  * @param jsonText json text
  * @param fromRange 차트 생성 위치 시작 셀의 주소(eg.B1)
  * @param toRange 차트 생성 위치 종료 셀의 주소(eg.G10)
  */
  CreateChartByJson(jsonText: string, fromRange: string, toRange: string): ScriptChart;

  /** 
   * 시트에 이미지를 삽입합니다.
   *
  * @param imagePath 이미지 경로
  * @param fromRange 이미지 위치 시작 셀의 주소(eg.B1)
  * @param toRange 이미지 위치 종료 셀의 주소(eg.G10)
  */
  CreateImage(imagePath: string, fromRange: string, toRange: string): ScriptImage;

  /** 
   * 시트에 이미지를 삽입합니다.
   *
  * @param imagePath 이미지 경로
  * @param beginRow 시작 열 번호(1부터 시작 됨)
  * @param beginCol 시작 행 번호(1부터 시작 됨)
  * @param endRow 종료 열 번호(1부터 시작 됨)
  * @param endCol 종료 행 번호(1부터 시작 됨)
  */
  CreateImage(imagePath: string, beginRow: int, beginCol: int, endRow: int, endCol: int): ScriptImage;

  /** 
   * 시트에 이미지를 삽입합니다.
   *
  * @param base64Text 이미지 인코딩 문자열
  * @param fromRange 이미지 위치 시작 셀의 주소(eg.B1)
  * @param toRange 이미지 위치 종료 셀의 주소(eg.G10)
  */
  CreateImageByBase64(base64Text: string, fromRange: string, toRange: string): ScriptImage;

  /** 
   * 시트에 이미지를 삽입합니다.
   *
  * @param base64Text 이미지 인코딩 문자열
  * @param beginRow 시작 열 번호(1부터 시작 됨)
  * @param beginCol 시작 행 번호(1부터 시작 됨)
  * @param endRow 종료 열 번호(1부터 시작 됨)
  * @param endCol 종료 행 번호(1부터 시작 됨)
  */
  CreateImageByBase64(base64Text: string, beginRow: int, beginCol: int, endRow: int, endCol: int): ScriptImage;

  /** 
   * 특정 행을 삭제 합니다.
   *
  * @param idx column Index
  */
  DeleteColumn(idx: int): void;

  /** 
   * 특정 범위의 행들을 삭제 합니다.
   *
  * @param beginIndex start column
  * @param endIndex end column
  */
  DeleteColumns(beginIndex: int, endIndex: int): void;

  /** 
   * 숨겨진 행들을 삭제합니다.
   *
  */
  DeleteHiddenColumns(): void;

  /** 
   * 숨겨진 열들을 삭제합니다.
   *
  */
  DeleteHiddenRows(): void;

  /** 
   * 특정 열을 삭제합니다.
   *
  * @param idx Row Index
  */
  DeleteRow(idx: int): void;

  /** 
   * 특정 범위의 열들을 삭제합니다.
   *
  * @param beginIndex start row
  * @param endIndex end row
  */
  DeleteRows(beginIndex: int, endIndex: int): void;

  /** 
   * Worksheet의 셀 내 수식을 비활성화 상태를 설정합니다.
(비활성화 된 경우 수식이 동작하지 않습니다.)
   *
  * @param disable 비활성화 여부
  */
  DisableFormula(disable: boolean): void;

  /** 
   * 선택한 위치에 수량만큼 행을 추가합니다.
   *
  * @param index 삽입 위치
  * @param count 수량
  */
  InsertColumns(index: int, count: int): void;

  /** 
   * 선택한 위치에 수량만큼 열을 추가합니다.
   *
  * @param index 삽입 위치
  * @param count 수량
  */
  InsertRows(index: int, count: int): void;

  /** 
   * 현재 시트를 활성화 시킵니다.
   *
  * @param active 
  */
  IsActive(active: boolean): void;

  /** 
   * 현재 시트가 활성화 되어 있는지를 반환 합니다.
   *
  */
  IsActive(): boolean;

  /** 
   * 셀을 병합 합니다.
   *
  * @param beginRow 시작 열 번호(1부터 시작 됨)
  * @param beginCol 시작 행 번호(1부터 시작 됨)
  * @param endRow 종료 열 번호(1부터 시작 됨)
  * @param endCol 종료 행 번호(1부터 시작 됨)
  */
  MergeCell(beginRow: int, beginCol: int, endRow: int, endCol: int): void;

  /** 
   * 셀을 병합 합니다.
   *
  * @param fromRange 범위 시작 셀의 주소(eg.B1)
  * @param toRange 범위 종료 셀의 주소(eg.G10)
  */
  MergeCell(fromRange: string, toRange: string): void;

  /** 
   * 셀을 병합 합니다.
   *
  * @param range 셀의 주소(eg.B1:G10)
  */
  MergeCell(range: string): void;

  /** 
   * 셀 병합을 해제합니다.
   *
  * @param mergeArea 셀 병합 정보
  */
  UnMerge(mergeArea: RangeArea): void;

  /** 
   * WorkSheet의 보호 옵션을 설정 합니다.
   *
  * @param allowSelectingLockedCell 잠김셀을 선택할 수 있는지 여부
  * @param allowSelectingUnlockedCell 잠기지 않은 셀을 선택할 수 있는지 여부
  */
  UpdateProtection(allowSelectingLockedCell: boolean, allowSelectingUnlockedCell: boolean): void;

  /** 
   * 조건부 서식 목록을 반환 합니다.
   *
  */
  getConditionFormat(): ConditionFormatList;

  /** 
   * DataTable로 바인딩을 지원하는 객체를 반환 합니다.
   *
  * @param range 위치 (eg. A1)
  * @param headerWrite 표의 헤더를 표시할지 여부
  * @param copyStyleRow 스타일 복사 대상 Row
  */
  getDataTableBinder(range: string, headerWrite: boolean, copyStyleRow: int): ScriptWorkSheetTableBinder;

  /** 
   * Return worksheet's  default row height.
   *
  */
  getDefaultRowHeight(): double;

  /** 
   * Show/Hide grid lines.
   *
  */
  getDisplayGridlines(): boolean;

  /** 
   * 대용량 Excel 쓰기를 위한 FileCellWriter를 생성합니다.
   *
  * @param row 시작 셀의 열번호
  * @param column 시작 셀의 행 번호
  */
  getFileCellWriter(row: number, column: number): ScriptFileCellWriter;

  /** 
   * 대용량 Excel 쓰기를 위한 FileCellWriter를 생성합니다.
   *
  * @param rangeName 시작셀의 주소값 e.g. A1
  */
  getFileCellWriter(rangeName: string): ScriptFileCellWriter;

  /** 
   * 병합 셀 목록을 반환 합니다.
   *
  */
  getMergeCells(): Array<RangeArea>;

  /** 
   * Return worksheet's name.
   *
  */
  getName(): string;

  /** 
   * 시트 인쇄 옵션 정보를 반환합니다.
   *
  */
  getPageSetup(): WorkSheetPageSetup;

  /** 
   * 셀 영역 객체를 반환 합니다.
   *
  * @param rangeName RangeName
  */
  getRange(rangeName: string): ScriptCellRange;

  /** 
   * 셀 영역 객체를 반환 합니다.
   *
  * @param row row number
  * @param col column number
  */
  getRange(row: int, col: int): ScriptCellRange;

  /** 
   * WorkSheet 내부 SparkLine 객체의 목록을 반환합니다.
   *
  */
  getSparkLines(): SparklineGroupCollectionEx;

  /** 
   * 시트 내 현재 사용 중인 전체 영역을 반환합니다.
   *
  */
  getUsedRange(): RangeArea;

  /** 
   * WorkSheet의 유효성 검사기 객체를 반환합니다.
   *
  */
  getValidators(): ValidatorCollection;

  /** 
   * MX-GRID로 출력할 영역을 반환합니다.
   *
  */
  getViewRange(): RangeArea;

  /** 
   * 셀이 존재하는지 여부를 반환합니다.
   *
  * @param row row number
  * @param col column number
  */
  hasRange(row: int, col: int): boolean;

  /** 
   * 셀이 존재하는지 여부를 반환합니다.
   *
  * @param rangeName RangeName
  */
  hasRange(rangeName: string): boolean;

  /** 
   * 특정 열의 높이를 화면에 맞도록 조정할 수 있습니다.
   *
  * @param rowIndex 열 번호(1부터 시작 됨)
  */
  setAutoRowHeight(rowIndex: int): void;

  /** 
   * 특정 셀에 계산 수식을 작성합니다.
   *
  * @param range 셀의 주소(eg.B1)
  * @param formula 계산 수식
  */
  setCellFormula(range: string, formula: string): void;

  /** 
   * 특정 셀에 계산 수식을 작성합니다.
   *
  * @param rowIndex 열 번호(1부터 시작 됨)
  * @param columnIndex 행 번호(1부터 시작 됨)
  * @param formula 계산 수식
  */
  setCellFormula(rowIndex: int, columnIndex: int, formula: string): void;

  /** 
   * 특정 셀의 스타일을 지정합니다.
   *
  * @param rowIndex 열 번호(1부터 시작 됨)
  * @param columnIndex 행 번호(1부터 시작 됨)
  * @param fontStyle font style (eg.font-family:Tahoma;font-size:10;font-weight:bold;font-style:italic,underline;font-color:#000000;)
  * @param borderStyle border style (eg. border-left:solid,#000000;border-top:solid,#000000;border-right:solid,#000000;border-bottom:solid,#000000;border-DiagonalUp:solid,#000000;border-DiagonalDown:solid,#000000;)
  * @param fillStyle fill style (eg. #00FFFF)
  * @param format format (eg.#,##0.00)
  * @param horizonAlgn 가로 정렬
  * @param verticalAlgn 세로 정렬
  * @param wrapText 텍스트 줄 바꿈
  */
  setCellStyle(rowIndex: int, columnIndex: int, fontStyle: string, borderStyle: string, fillStyle: string, format: string, horizonAlgn: enHorizontal, verticalAlgn: enVertical, wrapText: boolean): void;

  /** 
   * 특정 셀의 스타일을 지정합니다.
   *
  * @param rowIndex 열 번호(1부터 시작 됨)
  * @param columnIndex 행 번호(1부터 시작 됨)
  * @param fontStyle font style (eg.font-family:Tahoma;font-size:10;font-weight:bold;font-style:italic,underline;font-color:#000000;)
  * @param borderStyle border style (eg. border-left:solid,#000000;border-top:solid,#000000;border-right:solid,#000000;border-bottom:solid,#000000;border-DiagonalUp:solid,#000000;border-DiagonalDown:solid,#000000;)
  * @param fillStyle fill style (eg. #00FFFF)
  * @param format format (eg.#,##0.00)
  * @param horizonAlgn 가로 정렬
  * @param verticalAlgn 세로 정렬
  */
  setCellStyle(rowIndex: int, columnIndex: int, fontStyle: string, borderStyle: string, fillStyle: string, format: string, horizonAlgn: enHorizontal, verticalAlgn: enVertical): void;

  /** 
   * 특정 셀의 스타일을 지정합니다.
   *
  * @param rowIndex 열 번호(1부터 시작 됨)
  * @param columnIndex 행 번호(1부터 시작 됨)
  * @param style 스타일
  */
  setCellStyle(rowIndex: int, columnIndex: int, style: ScriptCellStyle): void;

  /** 
   * 특정 셀의 스타일을 지정합니다.
   *
  * @param range 셀의 주소(eg.B1)
  * @param fontStyle font style (eg.font-family:Tahoma;font-size:10;font-weight:bold;font-style:italic,underline;font-color:#000000;)
  * @param borderStyle border style (eg. border-left:solid,#000000;border-top:solid,#000000;border-right:solid,#000000;border-bottom:solid,#000000;border-DiagonalUp:solid,#000000;border-DiagonalDown:solid,#000000;)
  * @param fillStyle fill style (eg. #00FFFF)
  * @param format format (eg.#,##0.00)
  * @param horizonAlgn 가로 정렬
  * @param verticalAlgn 세로 정렬
  * @param wrapText 텍스트 줄 바꿈
  */
  setCellStyle(range: string, fontStyle: string, borderStyle: string, fillStyle: string, format: string, horizonAlgn: enHorizontal, verticalAlgn: enVertical, wrapText: enWrapText): void;

  /** 
   * 특정 셀의 스타일을 지정합니다.
   *
  * @param range 셀의 주소(eg.B1)
  * @param fontStyle font style (eg.font-family:Tahoma;font-size:10;font-weight:bold;font-style:italic,underline;font-color:#000000;)
  * @param borderStyle border style (eg. border-left:solid,#000000;border-top:solid,#000000;border-right:solid,#000000;border-bottom:solid,#000000;border-DiagonalUp:solid,#000000;border-DiagonalDown:solid,#000000;)
  * @param fillStyle fill style (eg. #00FFFF)
  * @param format format (eg.#,##0.00)
  * @param horizonAlgn 가로 정렬
  * @param verticalAlgn 세로 정렬
  */
  setCellStyle(range: string, fontStyle: string, borderStyle: string, fillStyle: string, format: string, horizonAlgn: enHorizontal, verticalAlgn: enVertical): void;

  /** 
   * 특정 셀의 스타일을 지정합니다.
   *
  * @param range 셀의 주소(eg.B1)
  * @param style 스타일
  */
  setCellStyle(range: string, style: ScriptCellStyle): void;

  /** 
   * 특정 셀에 텍스트를 작성합니다.
   *
  * @param range 셀의 주소(eg.B1)
  * @param text 텍스트
  */
  setCellText(range: string, text: string): void;

  /** 
   * 특정 셀에 텍스트를 작성합니다.
   *
  * @param rowIndex 열 번호(1부터 시작 됨)
  * @param columnIndex 행 번호(1부터 시작 됨)
  * @param text 텍스트
  */
  setCellText(rowIndex: int, columnIndex: int, text: string): void;

  /** 
   * 특정 셀에 값(수치값)을 작성합니다.
   *
  * @param range 셀의 주소(eg.B1)
  * @param value 값
  */
  setCellValue(range: string, value: int): void;

  /** 
   * 특정 셀에 값(수치값)을 작성합니다.
   *
  * @param rowIndex 열 번호(1부터 시작 됨)
  * @param columnIndex 행 번호(1부터 시작 됨)
  * @param value 값
  */
  setCellValue(rowIndex: int, columnIndex: int, value: int): void;

  /** 
   * 컬럼 헤더 영역을 설정 합니다.
   *
  * @param rangeName RangeName
  */
  setColumnHeaderRange(rangeName: string): void;

  /** 
   * 특정 행의 너비를 지정합니다.
   *
  * @param columnIndex 행 번호(1부터 시작 됨)
  * @param width 너비 값
  */
  setColumnWidth(columnIndex: int, width: double): void;

  /** 
   * 특정 행의 너비를 지정합니다.
   *
  * @param startCol 시작 행 번호(1부터 시작 됨)
  * @param endCol 종료 행 번호(1부터 시작 됨)
  * @param width 너비 값
  */
  setColumnWidth(startCol: int, endCol: int, width: double): void;

  /** 
   * 특정 행의 너비를 pixel 단위로 지정합니다.
   *
  * @param columnIndex 행 번호(1부터 시작 됨)
  * @param width 너비 값
  */
  setColumnWidthByPixel(columnIndex: int, width: double): void;

  /** 
   * 특정 행의 너비를 pixel 단위로 지정합니다.
   *
  * @param startCol 시작 행 번호(1부터 시작 됨)
  * @param endCol 종료 행 번호(1부터 시작 됨)
  * @param width 너비 값
  */
  setColumnWidthByPixel(startCol: int, endCol: int, width: double): void;

  /** 
   * Sets the unit of the colum's width.
   *
  * @param columnIndex column number (starting at 1)
  * @param unit unit value : % or empty 
  */
  setColumnWidthUnit(columnIndex: int, unit: string): void;

  /** 
   * Sets the unit of the colum's width.
   *
  * @param startCol start column number (starting at 1)
  * @param endCol end column number (starting at 1)
  * @param unit unit value : % or empty 
  */
  setColumnWidthUnit(startCol: int, endCol: int, unit: string): void;

  /** 
   * Set worksheet's default row height.
   *
  * @param height Height
  */
  setDefaultRowHeight(height: double): void;

  /** 
   * Show/Hide grid lines.
   *
  * @param visible Display
  */
  setDisplayGridlines(visible: boolean): void;

  /** 
   * 셀 고정 헤더 영역을 지정 합니다.
   *
  * @param row row number
  * @param col column number
  */
  setFreezePanes(row: int, col: int): void;

  /** 
   * WorkSheet의 이름을 지정합니다.
   *
  * @param name Name
  */
  setName(name: string): void;

  /** 
   * 특정 영역의 스타일을 지정합니다.
   *
  * @param range 셀의 주소(eg.B1:G10)
  * @param style 스타일
  */
  setRangeStyle(range: string, style: ScriptCellStyle): void;

  /** 
   * 특정 영역의 스타일을 지정합니다.
   *
  * @param beginRow 시작 열 번호(1부터 시작 됨)
  * @param beginCol 시작 행 번호(1부터 시작 됨)
  * @param endRow 종료 열 번호(1부터 시작 됨)
  * @param endCol 종료 행 번호(1부터 시작 됨)
  * @param style 스타일
  */
  setRangeStyle(beginRow: int, beginCol: int, endRow: int, endCol: int, style: ScriptCellStyle): void;

  /** 
   * 특정 영역의 스타일을 지정합니다.
   *
  * @param range 셀의 주소(eg.B1:G10)
  * @param fontStyle font style (eg.font-family:Tahoma;font-size:10;font-weight:bold;font-style:italic,underline;font-color:#000000;)
  * @param borderStyle border style (eg. border-left:solid,#000000;border-top:solid,#000000;border-right:solid,#000000;border-bottom:solid,#000000;border-DiagonalUp:solid,#000000;border-DiagonalDown:solid,#000000;)
  * @param fillStyle fill style (eg. #00FFFF)
  * @param format format (eg.#,##0.00)
  * @param horizonAlgn 가로 정렬
  * @param verticalAlgn 세로 정렬
  */
  setRangeStyle(range: string, fontStyle: string, borderStyle: string, fillStyle: string, format: string, horizonAlgn: enHorizontal, verticalAlgn: enVertical): void;

  /** 
   * 특정 열의 높이를 지정합니다.
   *
  * @param rowIndex 열 번호(1부터 시작 됨)
  * @param height 높이 값
  */
  setRowHeight(rowIndex: int, height: double): void;

  /** 
   * 특정 열의 높이를 pixel 단위로 지정합니다.
   *
  * @param row 
  * @param height 
  */
  setRowHeightByPixel(row?: int, height?: int): void;

}
