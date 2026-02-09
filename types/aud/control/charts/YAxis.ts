import { Axis } from "../../../aud/control/charts/Axis";
/**
 * Y축에 대한 정보를 제공합니다.
 */
export interface YAxis extends Axis{

  /**
   * 축의 서식
  */
  AnnoFormat: string;

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
   * 축의 각각의 Items 영역의 너비
  */
  LabelsWidth: number;

  /**
   * 축의 Items별 X offset 값(default:undefined)
  */
  LabelsX: number;

  /**
   * 축의 Items별 Y offset 값(default:3)
  */
  LabelsY: number;

  /**
   * 기준선 의 색
  */
  PlotLinesColor: string;

  /**
   * 기준선 의 선 유형(default:solid)
  */
  PlotLinesDashStyle: string;

  /**
   * 기준선 의 기준 값
  */
  PlotLinesValue: number;

  /**
   * 기준선 표시 할 경우 기준 값 표시 여부
  */
  PlotLinesValueVisibled: boolean;

  /**
   * 기준선 의 두께
  */
  PlotLinesWidth: number;

}
