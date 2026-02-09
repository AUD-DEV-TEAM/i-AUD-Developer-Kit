import { Color } from "../../../aud/drawing/Color";
import { BorderInfo } from "../../../aud/drawing/BorderInfo";
import { FixedRowStyleOption } from "../../../aud/control/grids/FixedRowStyleOption";
import { HeaderStyleOption } from "../../../aud/control/grids/HeaderStyleOption";
import { RecordStyleOption } from "../../../aud/control/grids/RecordStyleOption";
/**
 * DataGrid/TreeGrid 스타일 옵션
 */
export interface StyleOption{

  /**
   * 그리드 컨트롤 배경 색상
   */
  BackgroundColor: Color;

  /**
   * 그리드 컨트롤 테두리. Color와 Thickness 속성만 설정 가능합니다.
   */
  Border: BorderInfo;

  /**
   * 그리드 컨트롤 행 고정 스타일
   */
  FixedRowStyle: FixedRowStyleOption;

  /**
   * 그리드 컨트롤 글자 스타일 굵기 여부
   */
  FontBold: boolean;

  /**
   * 그리드 컨트롤 글자 유형
   */
  FontFamily: string;

  /**
   * 그리드 컨트롤 글자 스타일 기울임 여부
   */
  FontItalic: boolean;

  /**
   * 그리드 컨트롤 글자 크기. 레코드 높이보다 작은 크기만 설정 가능합니다.
   */
  FontSize: number;

  /**
   * 그리드 컨트롤 글자 색상
   */
  ForegroundColor: Color;

  /**
   * 그리드 컨트롤 틀고정 색상
   */
  FrozenLineColor: Color;

  /**
   * 그리드 컨트롤 틀고정 선 두께
   */
  FrozenLineThickness: number;

  /**
   * 그리드 컨트롤 헤더 스타일
   */
  HeaderStyle: HeaderStyleOption;

  /**
   * 그리드 컨트롤 가로 테두리. Color와 Thickness 속성만 설정 가능합니다.
   */
  HorizontalBorder: BorderInfo;

  /**
   * 그리드 컨트롤 레코드 스타일
   */
  RecordStyle: RecordStyleOption;

  /**
   * 그리드 컨트롤 세로 테두리. Color와 Thickness 속성만 설정 가능합니다.
   */
  VerticalBorder: BorderInfo;

}
