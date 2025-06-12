import { enArea } from "../../../aud/enums/olap/enArea";
import { enCategory } from "../../../aud/enums/olap/enCategory";
import { enOlapFieldCreateType } from "../../../aud/enums/olap/enOlapFieldCreateType";
import { ScriptCustomDimension } from "../../../aud/control/olap/ScriptCustomDimension";
import { DimensionGroup } from "../../../aud/control/olap/DimensionGroup";
import { OlapFilter } from "../../../aud/control/olap/OlapFilter";
import { enGroupByType } from "../../../aud/enums/olap/enGroupByType";
import { enHorizonAlign } from "../../../aud/enums/olap/enHorizonAlign";
import { enSortType } from "../../../aud/enums/olap/enSortType";
import { enSummaryType } from "../../../aud/enums/olap/enSummaryType";
import { enSummaryVariation } from "../../../aud/enums/olap/enSummaryVariation";
import { enTotalSummaryType } from "../../../aud/enums/olap/enTotalSummaryType";
/**
* 필드 컴포넌트
*/
export interface OlapField{

  /**
   * Column 영역으로 이동 가능 여부
  */
  AllowColumn: boolean;

  /**
   * 데이터 영역으로 이동 가능 여부
  */
  AllowData: boolean;

  /**
   * 필터 영역으로 이동 가능 여부
  */
  AllowFilter: boolean;

  /**
   * Row 영역으로 이동 가능 여부
  */
  AllowRow: boolean;

  /**
   * 화면 배치 영역 구분
  */
  Area: enArea;

  /**
   * 영역에 표시 위치
  */
  AreaIndex: number;

  /**
   * 화면 표시명
  */
  Caption: string;

  /**
   * 화면 표시명
  */
  Category: enCategory;

  /**
   * 필드 생성 구분
  */
   readonly CreateType: enOlapFieldCreateType;

  /**
   * 사용자 정의 항목 리스트
  */
  CustomDimensionList: ScriptCustomDimension[];

  /**
   * 사용자 정의 정렬 기준 목록
  */
  CustomSortList: string[];

  /**
   * 사용자 정의 그룹 정보
  */
  DimensionGroupInfo: DimensionGroup;

  /**
   * 데이터 수정 모드(0:없음, 1:가중치 배분, 2:균등배분, 3:가중치 배분(Force), 4:균등배분(force)
  */
  EditMethod: number;

  /**
   * 수정 모드가 가중치 배분일 경우 가중치 값을 가지는 필드명
  */
  EditMethodRef: string;

  /**
   * 데이터 수정 시 소수점 최대 자릿 수
  */
  EditPrecision: number;

  /**
   * 필드 그룹에서 확장 여부
  */
  Expanded: boolean;

  /**
   * 필터 가능 여부
  */
  FilterAble: boolean;

  /**
   * 필터 정보
  */
  FilterInfo: OlapFilter;

  /**
   * 데이터 출력 서식
  */
  Format: string;

  /**
   * 출력 서식 다국어 코드
  */
  FormatLanguageCode: string;

  /**
   * 계산 함수 수식
  */
  Formula: string;

  /**
   * 계산 함수 수식2
  */
  Formula2: string;

  /**
   * Hybrid방식에서 생성되는 SQL의 집계 방식
  */
  GroupByType: enGroupByType;

  /**
   * 헤더 영역 출력 시 정렬 기준
  */
  HeaderAlignment: enHorizonAlign;

  /**
   * InDimensions 목록
  */
  InDimensions: string;

  /**
   * 다국어 코드
  */
  LanguageCode: string;

  /**
   * 데이터 기준 정렬 방식의 정렬 필드
  */
  MeasureSortField: string;

  /**
   * 이동 가능 여부
  */
  MoveAble: boolean;

  /**
   * 필드명
  */
   readonly Name: string;

  /**
   * 참조 값 수식
  */
  RefFormula: string;

  /**
   * 정렬 가능 여부
  */
  SortAble: boolean;

  /**
   * 필드의 정렬 기준 필드
  */
  SortBaseField: string;

  /**
   * 정렬 방식
  */
  SortType: enSortType;

  /**
   * 2차 계산 기준 필드명 
  */
  SummaryBaseFieldKey: string;

  /**
   * 집계 함수 구분
  */
  SummaryType: enSummaryType;

  /**
   * 2차 계산 방식
  */
  SummaryVariation: enSummaryVariation;

  /**
   * 데이터 영역 출력 시 정렬 기준
  */
  TextAlignment: enHorizonAlign;

  /**
   * ToolTip으로 사용할 필드의 이름
  */
  ToolTipField: string;

  /**
   * 필드의  ToolTIp 문자열
  */
  ToolTipText: string;

  /**
   * 소계의 집계 함수 구분
  */
  TotalSummaryType: enTotalSummaryType;

  /**
   * 데이터 표현 단위
  */
  Unit: number;

  /**
   * 차트 연계 시 데이터로 사용할 지 여부
  */
  UseChartSource: boolean;

  /**
   * 숨김 여부
  */
  Visible: boolean;

  /**
   * 소계 표시 여부
  */
  VisibleSubTotal: boolean;

  /**
   * 필드의 표현 너비
  */
  Width: number;

  /** 
   * 필드 스타일 속성을 BoxStyle의 Key/Name 으로 설정합니다.
   *
  * @param styleName 스타일 속성 명(HeaderCellStyle,HeaderTotalCellStyle,DataCellStyle,TotalDataCellStyle,GrandTotalDataCellStyle)
  * @param key BoxStyle Key/Name
  */
  setBoxStyle(styleName: string, key: string): void;

}
