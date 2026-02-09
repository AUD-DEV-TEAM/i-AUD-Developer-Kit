import { enFreezeColumnType } from "../../../aud/enums/grid/enFreezeColumnType";
/**
 * 그리드의 고정 영역을 설정해주는 클래스
 */
export interface FreezeColumnSetting{

  /**
   * 왼쪽 고정 컬럼 수
   */
  Left: number;

  /**
   * 오른쪽 고정 수
   */
  Right: number;

  /**
   * 고정 컬럼 타입
   */
  Type: enFreezeColumnType;

}
