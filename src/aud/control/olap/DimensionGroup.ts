import { DimensionGroupItem } from "../../../aud/control/olap/DimensionGroupItem";
/**
* 피벗 컨트롤 디멘젼 그룹 정보
*/
export interface DimensionGroup{

  /**
   * 디멘젼 항목 정보
  */
  Items: DimensionGroupItem[];

  /** 
   * 디멘젼 항목을 추가합니다.
   *
  * @param name 항목명
  */
  AddItem(name: string): DimensionGroupItem;

  /** 
   * 디멘젼 항목을 모두 제거 합니다.
   *
  */
  Clear(): void;

  /** 
   * 디멘젼 항목을 삭제합니다.
   *
  * @param name 항목명
  */
  Remove(name: string): void;

}
