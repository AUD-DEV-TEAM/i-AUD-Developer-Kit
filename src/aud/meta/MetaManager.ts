import { enMergeViewTreeSortLevel } from "../../aud/enums/meta/enMergeViewTreeSortLevel";
import { MetaItemImageManager } from "../../aud/meta/MetaItemImageManager";
import { enMetaMode } from "../../aud/enums/meta/enMetaMode";
import { MetaManagerModel } from "../../aud/meta/MetaManagerModel";
import { enProductMode } from "../../aud/enums/meta/enProductMode";
import { enReportType } from "../../aud/enums/meta/enReportType";
import { enMetaConditionOperator } from "../../aud/enums/meta/enMetaConditionOperator";
import { enMetaConditionDefaultPromptType } from "../../aud/enums/meta/enMetaConditionDefaultPromptType";
import { enFilterItemProtectLevel } from "../../aud/enums/meta/enFilterItemProtectLevel";
import { enMetaConditionFilterType } from "../../aud/enums/meta/enMetaConditionFilterType";
import { enMetaConditionPromptValidate } from "../../aud/enums/meta/enMetaConditionPromptValidate";
import { enMetaReportControlType } from "../../aud/enums/meta/enMetaReportControlType";
import { enMetaFieldGroupFunction } from "../../aud/enums/meta/enMetaFieldGroupFunction";
import { PeriodAnalysis } from "../../aud/meta/PeriodAnalysis";
import { Control } from "../../aud/control/Control";
import { DataRow } from "../../aud/data/DataRow";
/**
* 
* @hidden
*/
export interface MetaManager{

  /**
   * 뷰어가 오픈된 상태인지 여부
   * @hidden
  */
  IsViewerOpen: boolean;

  /**
   * 병합뷰의 항목 순서를 각 서브뷰에 배치된 항목 순으로 처리할 건지 여부
   * @hidden
  */
  MergeViewTreeSortLevel: enMergeViewTreeSortLevel;

  /**
   * MetaView Image 관리 객체
   * @hidden
  */
  MetaItemImageManager: MetaItemImageManager;

  /**
   * view 모드
   * @hidden
  */
  Mode: enMetaMode;

  /**
   * MetaView Model class
   * @hidden
  */
  Model: MetaManagerModel;

  /**
   * 제품 모드
   * @hidden
  */
  ProductMode: enProductMode;

  /**
   * QueryBuilder창 Option에 대한 프로퍼티입니다.
   * @hidden
  */
  QueryBuilderOption: any;

  /**
   * 보고서 유형
   * @hidden
  */
  ReportType: enReportType;

  /** 
   * 특정 메타 보고서에 조회 조건을 추가하는 메소드
   *
  * @param itemCode 코드
  * @param filterOperator 비교 연산자
  * @param promptType 입력 유형
  * @param promptName 변수명
  * @param defaultValue 기본값
  * @param protectLevel 보안레벨
  * @param viewName 뷰의 이름. 없을 경우에는 현재 활성화 뷰에 추가(예)V1, V3, V3등
  * @param filterType 필터 유형
  * @param promptValidate 유효성 검사 유형
  * @param parentCode 부모 코드값
  * @param formula 계산 수식
  * @param caption 화면 표시명
   * @hidden
  */
  AddFilterItem(itemCode: string, filterOperator: enMetaConditionOperator, promptType: enMetaConditionDefaultPromptType, promptName: string, defaultValue: any, protectLevel: enFilterItemProtectLevel, viewName: string, filterType: enMetaConditionFilterType, promptValidate: enMetaConditionPromptValidate, parentCode: string, formula: string, caption: string): void;

  /** 
   * 특정 메타 보고서에 조회 항목을 추가하는 메소드
   *
  * @param position 추가할 위치
  * @param itemCode 항목 코드
  * @param groupFunction 그룹함수
  * @param viewName 뷰이름
  * @param formula 계산 수식
  * @param caption 화면 표시명
  * @param periodAnalysis 기간별 비교 분석 정보
   * @hidden
  */
  AddItemEx(position: enMetaReportControlType, itemCode: string, groupFunction?: enMetaFieldGroupFunction, viewName?: string, formula?: string, caption?: string, periodAnalysis?: PeriodAnalysis): void;

  /** 
   * layout 정보를 만들어주는 메소드
   *
  * @param control 
  * @param resultCallbackFunc 
   * @hidden
  */
  ApplyMeta(control: Control, resultCallbackFunc: Function): void;

  /** 
   * 레포트 유형을 변경하는 메소드
   *
  * @param reportType 레포트 유형(1: Analysis, 3: List)
   * @hidden
  */
  ChangeReportType(reportType: enReportType): void;

  /** 
   * 병합 폴더를 생성해주는 메소드
   *
  * @param targetNodeList 병합할 항목
  * @param folderName 폴더명
  * @param folderCode 폴더코드
   * @hidden
  */
  CreateMergeFolder(targetNodeList: Array<any>, folderName?: string, folderCode?: string): DataRow;

  /** 
   * 특정 메타 보고서에 조회 항목을 삭제하는 메소드
   *
  * @param position 삭제할 위치
  * @param metaItemCode 항목 코드
   * @hidden
  */
  DeleteItem(position: enMetaReportControlType, metaItemCode: string): void;

  /** 
   * 병합 폴더를 삭제해주는 메소드
   *
  * @param targetNodeList 삭제할 폴더
   * @hidden
  */
  DeleteMergeList(targetNodeList: DataRow[]): void;

  /** 
   * 배치된 항목 갯수 구하는 메소드
   *
   * @hidden
  */
  GetItemCount(): number;

  /** 
   * layout 정보를 받아서 view를 불러오는 메소드
   *
  * @param layout 레이아웃 XML
  * @param gridLayoutInfo grid 배치 정보
  * @param callback 콜백 함수
  * @param isShowMeta 팝업 여부
   * @hidden
  */
  LoadMeta(layout: string, gridLayoutInfo: object | undefined, callback: Function, isShowMeta?: boolean): void;

  /** 
   * SQLText 요청하는 메소드
   *
  * @param callback 콜백 함수
   * @hidden
  */
  MakeSQL(callback: Function): void;

  /** 
   * 메타 보고서를 병합하는 메소드
   *
  * @param reportCode 메타 보고서 코드
  * @param callback 메타 보고서 오픈 콜백 함수
   * @hidden
  */
  MergeMeta(reportCode: string, callback: Function): void;

  /** 
   * 메타 보고서 오픈 메소드
   *
  * @param reportCode 메타 보고서 코드
  * @param isMerge 병합인지 여부
  * @param callback 메타 보고서 오픈 콜백 함수
   * @hidden
  */
  OpenMeta(reportCode: string, isMerge: boolean, callback?: Function): Promise<any>;

  /** 
   * 메타 보고서 오픈 메소드
   *
  * @param reportCode 보고서 코드
   * @hidden
  */
  OpenReport(reportCode: string): void;

}
