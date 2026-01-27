import { Control } from "../../aud/control/Control";
import { enSortType } from "../../aud/enums/slicer/enSortType";
import { DataSet } from "../../aud/data/DataSet";
/**
* OlapGrid/DataGrid의 특정 Dimension 필드의 필터링 기능을 제공하는 컨트롤입니다.
*/
export interface Slicer extends Control{

  /**
   * 보고서가 열리면서 자동으로 Refresh를 할지 여부
  */
  AutoRefresh: boolean;

  /**
   * Item(Cell) 의 높이
  */
  CellHeight: number;

  /**
   * 표시 Column 수
  */
  ColumnCount: number;

  /**
   * Header Item(Cell) 의 배경색
  */
  HeaderColor: string;

  /**
   * Header Item(Cell) 표시 여부
  */
  HeaderVisible: boolean;

  /**
   * 기본 Item(Cell) 의 경계선 색
  */
  ItemBorderColor: string;

  /**
   * 기본 Item(Cell) 의 배경색
  */
  ItemColor: string;

  /**
   * Item(Cell) 의 FontStyle 정보를 반환 및 설정 가능합니다. 설정 시에도 반환된 JSON 속성명으로 설정하셔야 합니다.
eg.{ FontFamily": "맑은 고딕", "FontColor": "#000000", "FontSize": 12, "FontHAlign": 0(Slicer.enHorizonAlign), "FontVAlign": 1(Slicer.enVerticalAlign), "UnderLine" : false }"
  */
  ItemFontStyle: JSON;

  /**
   * 선택된 항목 변경 시 자동으로 연결된 컨트롤 Refresh를 할지 여부
  */
  ManualUpdate: boolean;

  /**
   * 선택된 Item(Cell) 의 경계선 색
  */
  SelectedBorderColor: string;

  /**
   * 선택된 Item(Cell) 의 배경색
  */
  SelectedColor: string;

  /**
   * Item(Cell) 의 표시 Text 정렬 유형(Asc, Desc)
  */
  SortType: enSortType;

  /**
   * Header Item(Cell) 의 표시 Text
  */
  Text: string;

  /** 
   * Slicer 의 데이터를 초기화 합니다.
   *
  */
  ClearData(): void;

  /** 
   * Slicer 에 바인딩된 데이터셋을 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /** 
   * 엑셀 Export를 위한 JSON 정보를 반환합니다.
   *
  * @param range 엑셀 시트의 표시 시작 위치(eg.A5:J11)
  */
  GetExcelExportJSON(range: string): string;

  /** 
   * 현재 선택된(필터링된) Item(Cell)의 값을 반환합니다.
   *
  */
  GetValue(): string[];

  /** 
   * 데이터를 실행합니다.
   *
  */
  Refresh(): void;

  /** 
   * Slicer 의 데이터셋을 변경합니다.
   *
  * @param dataset 데이터셋 객체
  */
  SetDataSet(dataset: DataSet): void;

  /** 
   * 주어진 이름의 데이터 소스를 바인딩 합니다.
   *
  * @param name 데이터 소스 명
  */
  SetDataSourceName(name: string): void;

  /** 
   * OLAP/Grid의 특정 필드의 Filter와 연결합니다.
   *
  * @param gridName OLAP/Grid 컨트롤명
  * @param fieldName 필드 명
  */
  SetFilterBindGrid(gridName: string, fieldName: string): void;

  /** 
   * CSS 스타일 코드로 Item의 Font Style을 설정합니다.
   *
   * @example
   * ```js
   * var cssText = "font-family: 맑은 고딕;color:#000000;font-size:12px;text-decoration:normal;vertical-align:middle;text-align:left;";
   * Matrix.getObject("Slicer").SetItemFontStyle(cssText);
   * ```
  * @param cssText CSS 스타일 코드
  * ```
  * font-family: 맑은 고딕;color:#000000;font-size:12px;text-decoration:normal;vertical-align:middle;text-align:left;
  * ```
  */
  SetItemFontStyle(cssText: string): void;

  /**
   * @event 
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param args
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
     * 데이터셋의 레코드 수량
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event 
   *
   * Slicer의 선택 영역이 변경된 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link Slicer}
  */
  OnSelectionChanged : (sender : Slicer
  , args : { 
    /**
     * 선태된 값 목록
    */
    Values: string[]
    /**
     * 전체 선택 여부
    */
    IsSelectedAll: boolean
    /**
     * 이 값을 true 로 설정 할 경우 선택 영역(값)이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


}
