import { FreezePanes } from "../../../aud/control/igrids/FreezePanes";
/**
* 엑셀 시트 모델
*/
export interface WorkSheet{ 

  /** 
   * 엑셀 영역 그리드 라인 표시 여부 반환
   *
  */
  getDisplayGridlines(): boolean;

  /** 
   * 틀정정 정보 반환
   *
  */
  getFreezePanes(): FreezePanes;

  /** 
   * 엑셀 영역 그리드 라인 표시 여부 설정
   *
  * @param display Display 여부
  */
  setDisplayGridlines(display: boolean): void;

  /** 
   * 시트 보호 설정하기
   *
  * @param lockedCell 잠김 셀 선택 가능 여부
  * @param unlockedCell 잠기지 않은셀 선택 가능 여부
  */
  setProtection(lockedCell: boolean, unlockedCell: boolean): void;

  /** 
   * 문서를 특정 row/colum 사이즈로 생성합니다.
   *
  * @param rowIndex Row Index
  * @param colIndex Column Index
  */
  setRowColumns(rowIndex: number, colIndex: number): void;

}
