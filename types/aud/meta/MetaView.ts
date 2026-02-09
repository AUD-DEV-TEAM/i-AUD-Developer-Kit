import { MetaItem } from "../../aud/meta/MetaItem";
import { MetaFilterItem } from "../../aud/meta/MetaFilterItem";
/**
* 메타 뷰를 가리키는 객체(읽기전용)
*/
export interface MetaView{

  /**
   * 오픈한 메타 전체 리스트 목록
  */
  AllMetaItems: MetaItem[];

  /**
   * 중복 항목 제거 여부
  */
  DistinctRecord: boolean;

  /**
   * root 필터아이템
  */
  FilterRootData: MetaFilterItem;

  /**
   * 메타 뷰어 탭에 표시되는 탭 이름
  */
   readonly Header: string;

  /**
   * 영역 별 MetaItem 오프젝트
  */
  Items: any;

  /**
   * 뷰 이름(예 :V1,V3)
  */
   readonly Name: string;

  /** 
   * 메타 뷰에 배치한 항목 갯수 조회하는 메소드
   *
  */
  GetSelectedItemsCnt(): number;

}
