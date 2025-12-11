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
   * 중복 항목 제거
  */
  DistinctRecord: boolean;

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
   * 확인 버튼 클릭 시 layout 모델을 만들어주는 메소드
   *
  * @param callback 콜백 함수
   * @hidden
  */
  ApplyMetaModel(callback: Function): void;

  /** 
   * 언어 코드를 요청하는 메소드
   *
  * @param strLangList 다국어 문자열 리스트
  * @param langRows 문자열 Rows들
  * @param callbackFunc 콜백함수
  * @param isNormalView Normal View 여부
   * @hidden
  */
  RequestLanguageListRows(strLangList: string, langRows: any, callbackFunc?: Function, isNormalView?: boolean): void;

}
