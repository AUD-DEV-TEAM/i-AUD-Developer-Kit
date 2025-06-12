import { DataTable } from "../../../aud/data/DataTable";
import { Rectangle } from "../../../aud/control/olap/Rectangle";
/**
* 컨트롤의 셀렉션 제어 컨트롤
*/
export interface ScriptSelection{

  /** 
   * 선택을 취소 합니다.
   *
  */
  Clear(): string;

  /** 
   * 선택한 영역의 데이터를 ClipBoard로 복사하고 해당 문자열을 반환 합니다.
   *
  */
  CopyClipBoard(): string;

  /** 
   * 선택한 영역이 있는지 여부를  반환 합니다.
   *
  */
  IsEmpty(): boolean;

  /** 
   * 화면 전체를 선택합니다.
   *
  */
  SelectAll(): void;

  /** 
   * 데이터 영역을 선택 합니다.
   *
  * @param left Left
  * @param top Top
  * @param width Width
  * @param height Height
  */
  SelectDataArea(left: number, top: number, width: number, height: number): void;

  /** 
   * 선택된 영역의 데이터를 차트 데이터 로 변환하여 반환합니다.
   *
  * @param maxDepth 라벨 최대 깊이
  * @param useTotal Total Cell 사용 여부
  * @param useGrandTotal Grand Total Cell 사용 여부
  * @param useReverseData 반전된 DataTable 사용 여부
  */
  getChartTable(maxDepth: number, useTotal: boolean, useGrandTotal: boolean, useReverseData: boolean): DataTable;

  /** 
   * 현재 선택된 영역을 반환 합니다.
   *
  */
  getSelectedArea(): Rectangle;

  /** 
   * 선택된 영역의 Summary 데이터를 반환 합니다.
   *
  */
  getSummaryTable(): DataTable;

}
