import { enSizeType } from "../../../aud/enums/comm/enSizeType";
/**
* 테이블 레이아웃의 열을 구성하는 클래스.
*/
export interface TableColumn{

  /**
   * 실제 열 너비
  */
  ActualWidth: number;

  /**
   * 열 너비 유형(0:Pixel/1:Star)
  */
  ColumnWidthType: enSizeType;

  /**
   * 열 이름
  */
  Name: string;

  /**
   * 열 너비
  */
  Width: number;

}
