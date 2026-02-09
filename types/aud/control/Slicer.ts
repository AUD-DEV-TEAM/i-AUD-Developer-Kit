import { Control } from "../../aud/control/Control";
import { enSortType } from "../../aud/enums/slicer/enSortType";
import { DataSet } from "../../aud/data/DataSet";
/**
* OlapGrid/DataGrid의 특정 Dimension 필드의 필터링 기능을 제공하는 컨트롤입니다.
*/
export interface Slicer extends Control{

  /**
   * 보고서가 열리면서 자동으로 조회할지 여부를 가져오거나 설정합니다.
  */
  AutoRefresh: boolean;

  /**
   * 아이템(셀)의 높이를 가져오거나 설정합니다.
  */
  CellHeight: number;

  /**
   * 표시 열 수를 가져오거나 설정합니다.
  */
  ColumnCount: number;

  /**
   * 헤더 아이템(셀)의 배경색을 가져오거나 설정합니다.
  */
  HeaderColor: string;

  /**
   * 헤더 아이템(셀) 표시 여부를 가져오거나 설정합니다.
  */
  HeaderVisible: boolean;

  /**
   * 기본 아이템(셀)의 경계선 색을 가져오거나 설정합니다.
  */
  ItemBorderColor: string;

  /**
   * 기본 아이템(셀)의 배경색을 가져오거나 설정합니다.
  */
  ItemColor: string;

  /**
   * 아이템(셀)의 글꼴 스타일 정보를 가져오거나 설정합니다.
   * 설정 시에도 반환된 JSON 속성명으로 설정해야 합니다.
   * (예: `{ "FontFamily": "맑은 고딕", "FontColor": "#000000", "FontSize": 12, "FontHAlign": 0, "FontVAlign": 1, "UnderLine": false }`)
  */
  ItemFontStyle: object;

  /**
   * 선택된 항목 변경 시 자동으로 연결된 컨트롤을 조회할지 여부를 가져오거나 설정합니다.
  */
  ManualUpdate: boolean;

  /**
   * 선택된 아이템(셀)의 경계선 색을 가져오거나 설정합니다.
  */
  SelectedBorderColor: string;

  /**
   * 선택된 아이템(셀)의 배경색을 가져오거나 설정합니다.
  */
  SelectedColor: string;

  /**
   * 아이템(셀)의 표시 텍스트 정렬 유형(Asc, Desc)을 가져오거나 설정합니다.
  */
  SortType: enSortType;

  /**
   * 헤더 아이템(셀)의 표시 텍스트를 가져오거나 설정합니다.
  */
  Text: string;

  /**
   * Slicer의 데이터를 초기화합니다.
   *
  */
  ClearData(): void;

  /**
   * Slicer에 바인딩된 데이터셋을 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /**
   * 엑셀 내보내기를 위한 JSON 정보를 반환합니다.
   *
  * @param range 엑셀 시트의 표시 시작 위치 (예: A5:J11)
  */
  GetExcelExportJSON(range: string): string;

  /**
   * 현재 선택된(필터링된) 아이템(셀)의 값을 반환합니다.
   *
  */
  GetValue(): string[];

  /**
   * 데이터를 조회합니다.
   *
  */
  Refresh(): void;

  /**
   * Slicer의 데이터셋을 변경합니다.
   *
  * @param dataset 데이터셋 객체
  */
  SetDataSet(dataset: DataSet): void;

  /**
   * 주어진 이름의 데이터소스를 바인딩합니다.
   *
  * @param name 데이터소스 이름
  */
  SetDataSourceName(name: string): void;

  /**
   * OLAP/Grid의 특정 필드의 Filter와 연결합니다.
   *
  * @param gridName OLAP/Grid 컨트롤 이름
  * @param fieldName 필드 이름
  */
  SetFilterBindGrid(gridName: string, fieldName: string): void;

  /**
   * CSS 스타일 코드로 아이템의 글꼴 스타일을 설정합니다.
   *
   * @example
   * ```js
   * var cssText = "font-family: 맑은 고딕;color:#000000;font-size:12px;text-decoration:normal;vertical-align:middle;text-align:left;";
   * Matrix.getObject("Slicer").SetItemFontStyle(cssText);
   * ```
  * @param cssText CSS 스타일 코드
  */
  SetItemFontStyle(cssText: string): void;

  /**
   * @event
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 Slicer 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Slicer}
  */
  OnDataBindEnd : (sender : Slicer
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터셋의 레코드 수
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event
   *
   * Slicer의 선택 영역이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 Slicer 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Slicer}
  */
  OnSelectionChanged : (sender : Slicer
  , args : {
    /**
     * 선택된 값 목록
    */
    Values: string[]
    /**
     * 전체 선택 여부
    */
    IsSelectedAll: boolean
    /**
     * 이 값을 `true`로 설정할 경우 선택 영역(값)이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


}
