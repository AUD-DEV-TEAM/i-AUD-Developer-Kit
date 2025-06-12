import { NamedDictionary } from "../../aud/data/NamedDictionary";
/**
* 
* @hidden
*/
export interface MetaManagerModel{

  /**
   * 활성화된 MetaView
   * @hidden
  */
  ActiveView: any;

  /**
   * MetaView 집합
   * @hidden
  */
  Views: NamedDictionary;

}
