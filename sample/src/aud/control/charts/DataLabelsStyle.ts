/**
* 데이터 레이블의 스타일 정보를 제공합니다.
*/
export interface DataLabelsStyle{

  /**
   * 데이터 레이블의 배경 색상
  */
  BackgroundColor: string;

  /**
   * 데이터 레이블의 테두리 색상
  */
  BorderColor: string;

  /**
   * 데이터 레이블의 테두리 모서리
  */
  BorderRadius: number;

  /**
   * 데이터 레이블의 테두리 스타일(none:없음, solid:단일선, double:이중선, dotted:점선)
  */
  BorderStyle: string;

  /**
   * 데이터 레이블의 테두리 두께
  */
  BorderWidth: number;

  /**
   * 데이터 레이블의 글자 색상
  */
  Color: string;

  /**
   * 데이터 레이블의 글자 종류
  */
  FontFamily: string;

  /**
   * 데이터 레이블의 글자 크기
  */
  FontSize: number;

  /**
   * 데이터 레이블의 글자 스타일(italic)
  */
  FontStyle: string;

  /**
   * 데이터 레이블의 글자 스타일(bold)
  */
  FontWeight: string;

  /**
   * 데이터 레이블의 배경 투명도(0~1)
  */
  Opacity: number;

  /**
   * 데이터 레이블의 테두리를 기준으로 안쪽 여백
  */
  Padding: number;

}
