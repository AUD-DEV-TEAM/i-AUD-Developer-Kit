/**
* MX-GRID WorkSheet 보호 옵션
*/
export interface IProtection{

  /**
   * 잠긴셀 선택 여부
  */
  AllowSelectingLockedCell: boolean;

  /**
   * 잠기지 않은 셀 선택 여부 
  */
  AllowSelectingUnlockedCell: boolean;

}
