import { enMetaFieldCategory } from "../../aud/enums/meta/enMetaFieldCategory";
/**
* i-META Viewer에 배치한 항목
*/
export interface MetaItem{

  /**
   * 필드의 카테고리
   * @hidden
  */
  Category: enMetaFieldCategory;

  /**
   * 메타 항목 Unique ID
  */
  Code: string;

  /**
   * 화면 표시명
  */
  Description: string;

  /**
   * 메타 항목 ID(메타 디자이너 기준)
  */
  MetaItemCode: string;

}
