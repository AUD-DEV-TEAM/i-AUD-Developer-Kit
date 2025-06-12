import { HeaderIcon } from "../../../aud/ext/listview/HeaderIcon";
import { HeaderCheckBox } from "../../../aud/ext/listview/HeaderCheckBox";
import { HeaderComboBox } from "../../../aud/ext/listview/HeaderComboBox";
/**
* ListView 컨트롤 Item
*/
export interface ListViewItem{

  /**
   * ListViewItem 배경색
  */
  Background: string;

  /**
   * ListViewItem 테두리 색상
  */
  BorderColor: string;

  /**
   * ListViewItem 테두리 두께
  */
  BorderThickness: string;

  /**
   * Disabed 효과를 내는 Style 사용 여부
  */
  DisabledEffect: boolean;

  /**
   * ListViewItem 글꼴
  */
  Font: string;

  /**
   * ListViewItem 문자열 색상
  */
  FontColor: string;

  /**
   * ListViewItem 문자열 크기
  */
  FontSize: number;

  /**
   * ListViewItem 문자열 스타일
  */
  FontStyle: string;

  /**
   * ListViewItem 글꼴 두께
  */
  FontWeight: string;

  /**
   * ListViewItem 세로 길이(높이)
  */
  Height: number;

  /**
   * key값
  */
   readonly Id: string;

  /**
   * ListViewItem Margin
  */
  Margin: string;

  /**
   * ListViewItem Padding
  */
  Padding: string;

  /**
   * ListViewItem 표시 되는 문자열
  */
  Text: string;

  /**
   * ListViewItem Header 영역과 Text 영역의 간격을 조절
  */
  TextAndHeaderSpacing: string;

  /**
   * ListViewItem 문자열 수평 정렬(Left: 0, Center: 1, Right: 2)
  */
  TextHorizontalAlignment: number;

  /**
   * ListViewItem 문자열 수직 정렬(Top: 0, Middle: 1, Bottom: 2)
  */
  TextVerticalAlignment: string;

  /**
   * header 사용 여부
  */
  UseHeader: boolean;

  /**
   * ListViewItem의 Value
  */
  Value: string;

  /**
   * ListViewItem 가로 길이(너비)
  */
  Width: number;

  /** 
   * ListViewItem에서 사용 되는 HeaderItem 추가
   *
  * @param type 생성하고자 하는 Header 종류(combo, icon, checkbox)
  * @param param Header 생성 시, 필요한 정보
  */
  AddHeader(type: ListViewItem, param: JSON): void;

  /** 
   * ListViewItem의 Header 획득
   *
  * @param headerNumber 표시/숨김 처리 하고자 하는 Header의 번호
  */
  GetHeader(headerNumber: number): HeaderIcon | HeaderCheckBox | HeaderComboBox;

  /** 
   * ListViewItem의 Header 항목을 표시/숨김
   *
  * @param headerNumber 표시/숨김 처리 하고자 하는 Header의 번호 및 번호들의 배열
  * @param isVisible 표시/숨김 여부(true : 표시, false : 숨김)
  */
  SetVisibleHeader(headerNumber: number|number[], isVisible: boolean): void;

}
