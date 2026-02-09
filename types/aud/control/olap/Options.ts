import { CacheOption } from "../../../aud/control/olap/CacheOption";
import { enColumnTotalLocation } from "../../../aud/enums/olap/enColumnTotalLocation";
import { ExportOption } from "../../../aud/control/olap/ExportOption";
import { PagerInfo } from "../../../aud/control/olap/PagerInfo";
import { enRowTotalLocation } from "../../../aud/enums/olap/enRowTotalLocation";
import { OptionStyle } from "../../../aud/control/olap/OptionStyle";
import { enOlapViewType } from "../../../aud/enums/olap/enOlapViewType";
/**
* 옵션 정보
*/
export interface Options{

  /**
   * 캐시 옵션
  */
  CacheOption: CacheOption;

  /**
   * 셀의 경계에서 너비 조정이 가능한지 여부를 설정합니다.
  */
  CanResizeCellWidth: boolean;

  /**
   * Column 영역 표시 문자
  */
  ColumnAreaText: string;

  /**
   * Column 총계 표시 위치
  */
  ColumnGrandTotalLocation: enColumnTotalLocation;

  /**
   * Column 총계 헤더 셀에 표시할 문자
  */
  ColumnGrandTotalText: string;

  /**
   * Column 소계 표시 위치
  */
  ColumnTotalLocation: enColumnTotalLocation;

  /**
   * Column 소계 헤더셀에 표시할 문자
  */
  ColumnTotalText: string;

  /**
   * Data 영역 표시 문자
  */
  DataAreaText: string;

  /**
   * ClipBoard 활성화 여부
  */
  DisableClipBoard: boolean;

  /**
   * Column 총계 표시 여부
  */
  DisplayColumnGrandTotal: boolean;

  /**
   * Column 소계 표시 여부
  */
  DisplayColumnSubTotal: boolean;

  /**
   * Row 총계 표시 여부
  */
  DisplayRowGrandTotal: boolean;

  /**
   * Row 소계 표시 여부
  */
  DisplayRowSubTotal: boolean;

  /**
   * 값이 없는 경우 데이터 셀에 표시할 문자
  */
  EmptyCellText: string;

  /**
   * 데이터 수정 시 레코드가 없는 셀 데이터 자동 생성 여부
  */
  EnableCreateRecord: boolean;

  /**
   * Write-back(수정 모드) 활성화
  */
  EnableWriteBack: boolean;

  /**
   * Enter 입력 시 이동 방향
(0:Down, 1:Right)
  */
  EnterDirection: number;

  /**
   * 계산 수식 수행 중 에러가 발생한 셀에 표시할 문자
  */
  ErrorCellText: string;

  /**
   * Export 옵션
  */
  ExportOption: ExportOption;

  /**
   * Filter 영역 표시 문자
  */
  FilterAreaText: string;

  /**
   * 값이 빈 Row 숨김 처리
  */
  HideEmptyMeasureColumns: boolean;

  /**
   * 값이 빈 Column 숨김 처리
  */
  HideEmptyMeasureRows: boolean;

  /**
   * 수정된 셀의 계산을 수동으로 실행할지 여부
  */
  ManualUpdate: boolean;

  /**
   * 데이터 그룹 필드 표시 문자
  */
  MeasuresText: string;

  /**
   * 셀의 계산 결과 값이 유효하지 않을 경우 셀에 표시할 문자
  */
  NotAvaliableCellText: string;

  /**
   * i-META 데이터소스 사용 시(UseHybrid=true), 필터 영역에 배치된 필드의 필터 쿼리 최적화 옵션(기본값:false)
  */
  OptimizingHybridFilter: boolean;

  /**
   * 페이징 옵션
  */
  PagerInfo: PagerInfo;

  /**
   * Row 영역 표시 문자
  */
  RowAreaText: string;

  /**
   * Row 총계 표시 위치
  */
  RowGrandTotalLocation: enRowTotalLocation;

  /**
   * Row 총계 헤더 셀에 표시할 문자
  */
  RowGrandTotalText: string;

  /**
   * Row 헤더 영역 고정 하지 않음
  */
  RowHeaderUnFix: boolean;

  /**
   * Row 소계 표시 위치
  */
  RowTotalLocation: enRowTotalLocation;

  /**
   * Row 소계 헤더셀에 표시할 문자
  */
  RowTotalText: string;

  /**
   * Column 영역 표시 여부
  */
  ShowColumnrArea: boolean;

  /**
   * Filter 영역 표시 여부
  */
  ShowDataArea: boolean;

  /**
   * 확장/축소 버튼 표시 여부
  */
  ShowExpandButtons: boolean;

  /**
   * Filter 영역 표시 여부
  */
  ShowFilterArea: boolean;

  /**
   * Row 영역 표시 여부
  */
  ShowRowArea: boolean;

  /**
   * 스타일 정보
  */
  Style: OptionStyle;

  /**
   * TreeViewer 유형 일때 Row 영역의 전체 너비, 기본값 300(단위px)
  */
  TreeHeaderWidth: number;

  /**
   * TreeViewer 유형 일때 Tree헤더 Indent 너비, 기본값 20(단위px)
  */
  TreeIndentWidth: number;

  /**
   * Viewer 유형(0:Default, 1:TreeView)
  */
  ViewType: enOlapViewType;

  /**
   * 수정 여부와 상관없이 모든 행을 데이터에서 읽을 지 여부
  */
  WriteBackFetchAllRows: boolean;

  /**
   * 0으로 나누기를 시도하여 에러가 발생한 셀에 표시할 문자
  */
  ZeroDivisioinCellText: string;

  /** 
   * OlapGrid의 영역별 스타일을 BoxStyle의 Key/Name 으로 설정합니다.
   *
  * @param styleName 스타일 속성 명(DataCell,TotalDataCell,GrandTotalDataCell,RowHeaderCell,RowTotalHeaderCell,RowGrandTotalHeaderCell,ColumnHeaderCell,ColumnTotalHeaderCell,ColumnGrandTotalHeaderCell,MeasureField,AttributeField,PeriodField,DatasField,FilterFieldArea,DataFieldArea,ColumnFieldArea,RowFieldArea,Selection,LockedStyle,EditedStyle,ModifiedStyle)
  * @param key BoxStyle Key/Name
  */
  setBoxStyle(styleName: string, key: string): void;

}
