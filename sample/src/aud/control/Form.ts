import { NamedDictionary } from "../../aud/data/NamedDictionary";
/**
* i-AUD의 폼 모델
*/
export interface Form{

  /**
   * 컨트롤 목록
  */
  Controls: NamedDictionary;

  /**
   * 폼의 Id
  */
  Id: string;

  /**
   * 폼 이름
  */
  Name: string;

  /**
   * 화면에 표시 여부
  */
  Visible: boolean;

}
