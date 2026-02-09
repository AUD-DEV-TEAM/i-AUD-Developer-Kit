import { NamedDictionary } from "../../aud/data/NamedDictionary";
/**
 * i-AUD의 폼 모델입니다.
 */
export interface Form{

  /**
   * 컨트롤 목록을 가져옵니다.
  */
  Controls: NamedDictionary;

  /**
   * 폼의 ID를 가져옵니다.
  */
  Id: string;

  /**
   * 폼의 이름을 가져오거나 설정합니다.
  */
  Name: string;

  /**
   * 화면 표시 여부를 가져오거나 설정합니다.
  */
  Visible: boolean;

}
