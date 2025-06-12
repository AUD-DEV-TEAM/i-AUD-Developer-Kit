import { MetaItemDragManager } from "../../aud/meta/MetaItemDragManager";
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
/**
* 
* @hidden
*/
export interface MetaManager{

  /**
   * i-META Viewer 항목 drag 관리 객체
   * @hidden
  */
  MetaItemDragManager: MetaItemDragManager;

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
  AddFilterItem(itemCode: string, filterOperator: enMetaConditionOperator, promptType: enMetaConditionDefaultPromptType, promptName: string, defaultValue: object, protectLevel: enFilterItemProtectLevel, viewName: string, filterType: enMetaConditionFilterType, promptValidate: enMetaConditionPromptValidate, parentCode: string, formula: string, caption: string): void;

  /** 
   * 특정 메타 보고서에 조회 항목을 추가하는 메소드
   *
  * @param position 추가할 위치
  * @param itemCode 항목 코드
  * @param groupFunction 그룹함수
  * @param viewName 뷰이름
  * @param formula 계산 수식
  * @param caption 화면 표시명
   * @hidden
  */
  AddItemEx(position: enMetaReportControlType, itemCode: string, groupFunction: enMetaFieldGroupFunction, viewName: string, formula: string, caption: string): void;

  /** 
   * 메타 보고서 오픈 메소드
   *
  * @param reportCode 메타 보고서 코드
  * @param moduleCode 메타 보고서 모듈코드(M0, MV, SX)
   * @hidden
  */
  OpenMeta(reportCode: string, moduleCode: string): Promise<any>;

}
