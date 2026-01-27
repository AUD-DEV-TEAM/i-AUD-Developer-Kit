import { Axis } from "../../../aud/control/charts/Axis";
/**
* X축에 대한 정보를 제공합니다.
*/
export interface XAxis extends Axis{

  /**
   * 축의 서식
  */
  AnnoFormat: string;

  /**
   * 축의 Items(데이터)을 반환합니다.
  */
   readonly Categories: string[];

  /**
   * 축의 Items의 글자 스타일-굵기 여부
  */
  FontBold: boolean;

  /**
   * 축의 Items의 글자 색
  */
  FontColor: string;

  /**
   * 축의 Items의 글자 유형
  */
  FontFamily: string;

  /**
   * 축의 Items의 글자 스타일-기울림 여부
  */
  FontItalic: boolean;

  /**
   * 축의 Items의 글자 크기
  */
  FontSize: number;

  /**
   * X축의 Group 으로 설정할 필드
  */
  GroupField: string;

  /**
   * X축의 GroupLabel 의 글자 굵기
  */
  GroupFontBold: boolean;

  /**
   * X축의 GroupLabel 의 글자 색상
  */
  GroupFontColor: string;

  /**
   * X축의 GroupLabel 의 글꼴
  */
  GroupFontFamily: string;

  /**
   * X축의 GroupLabel 의 글자 기울기
  */
  GroupFontItalic: boolean;

  /**
   * X축의 GroupLabel 의 글자 크기
  */
  GroupFontSize: number;

  /**
   * 축의 Items별 X offset 값(default:0)
  */
  LabelsX: number;

  /**
   * 축의 Items별 Y offset 값(default:null)
  */
  LabelsY: number;

  /** 
   * X축의 Items 의 값을 기본값으로 초기화합니다.
   *
  */
  ClearDefinedItems(): void;

  /** 
   * X축의 Items 의 값을 동적으로 변경합니다.
   *
  * @param items 구분자 ; (세미콜론)
  */
  SetDefinedItems(items: string): void;

}
