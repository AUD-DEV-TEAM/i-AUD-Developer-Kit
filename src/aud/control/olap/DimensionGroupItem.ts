import { enDimensionGroupItemType } from "../../../aud/enums/olap/enDimensionGroupItemType";
/**
* 피벗 컨트롤 디멘젼 그룹 항목 정보
*/
export interface DimensionGroupItem{

  /**
   * 항목 리스트
  */
   readonly Entries: string[];

  /**
   * 항목 타입
  */
   readonly ItemType: enDimensionGroupItemType;

  /**
   * 이름
  */
   readonly Name: string;

}
