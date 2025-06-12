import { enJoinType } from "../../aud/enums/meta/enJoinType";
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
   * 병합 유형
   * @hidden
  */
  JoinType: enJoinType;

  /**
   * MetaView 집합
   * @hidden
  */
  Views: NamedDictionary;

  /** 
   * 언어 코드를 요청하는 메소드
   *
  * @param strLangList 
  * @param langRows 
  * @param callbackFunc 
  * @param isNormalView 
   * @hidden
  */
  RequestLanguageListRows(strLangList: string, langRows: any, callbackFunc?: Function, isNormalView?: boolean): void;

}
