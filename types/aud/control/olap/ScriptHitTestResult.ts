import { enArea } from "../../../aud/enums/olap/enArea";
import { OlapField } from "../../../aud/control/olap/OlapField";
import { ScriptDataCell } from "../../../aud/control/olap/ScriptDataCell";
import { ScriptHeaderCell } from "../../../aud/control/olap/ScriptHeaderCell";
import { IMultiHeaderCell } from "../../../aud/control/olap/IMultiHeaderCell";
/**
* OlapGrid 마우스로 클릭한 영역에 대한 Hit Test 정보
*/
export interface ScriptHitTestResult{

  /** 
   * Grand Total 셀 여부
   *
  */
  IsGrandTotal(): boolean;

  /** 
   * Total 셀 여부
   *
  */
  IsTotal(): boolean;

  /** 
   * 현재 Hittest의 영역을 반환 합니다.
   *
  */
  getArea(): enArea;

  /** 
   * 현재 Hittest와 관련된 셀 정보를 반환 합니다. 셀은 데이터셀, 헤더셀, 멀티헤더셀 또는 null 값을 가질 수 있습니다.
   *
  */
  getCell(): ScriptDataCell | ScriptHeaderCell | IMultiHeaderCell | null;

  /** 
   * 현재 Hittest와 관련된 필드를 반환 합니다.
   *
  */
  getField(): OlapField;

  /**
   * 현재 마우스 위치와 관련있는 특정 필드의 값을 반환 합니다.
   *
  * @param fldName 필드명. 입력하지 않을 경우 현재 영역의 기본 필드 값을 반환합니다.
  * @returns 필드 값. 문자열, 숫자 또는 null
  */
  getValue(fldName?: string): string | number | null;

}
