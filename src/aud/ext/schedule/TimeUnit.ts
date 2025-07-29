import { enTimeUnit } from "../../../aud/enums/schedule/enTimeUnit";
/**
* 기간 표시 단위
*/
export interface TimeUnit{

  /**
   * 표현 양식
  */
  Format: string;

  /**
   * 기간 구분
  */
  Unit: enTimeUnit;

  /**
   * 기간 값
  */
  Value: int;

  /** 
   * 월별 text를 지정합니다.(ex:['Jan', 'Feb'])
   *
  * @param text 컬럼 헤더 라벨
  */
  SetMajorLabels(text: string[]): void;

}
