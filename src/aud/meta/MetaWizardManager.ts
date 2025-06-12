import { enMetaConditionOperator } from "../../aud/enums/meta/enMetaConditionOperator";
import { enMetaConditionDefaultPromptType } from "../../aud/enums/meta/enMetaConditionDefaultPromptType";
import { enFilterItemProtectLevel } from "../../aud/enums/meta/enFilterItemProtectLevel";
import { enMetaConditionFilterType } from "../../aud/enums/meta/enMetaConditionFilterType";
import { enMetaConditionPromptValidate } from "../../aud/enums/meta/enMetaConditionPromptValidate";
import { enMetaReportControlType } from "../../aud/enums/meta/enMetaReportControlType";
import { enMetaFieldGroupFunction } from "../../aud/enums/meta/enMetaFieldGroupFunction";
import { PeriodAnalysis } from "../../aud/meta/PeriodAnalysis";
import { MetaFilterItem } from "../../aud/meta/MetaFilterItem";
import { MetaViewManager } from "../../aud/meta/MetaViewManager";
import { MetaView } from "../../aud/meta/MetaView";
import { Control } from "../../aud/control/Control";
/**
* 메타 뷰어 팝업을 관리하는 객체
*/
export interface MetaWizardManager{

  /** 
   * 특정 뷰를 활성화 시켜주는 메소드
   *
  * @param viewName 뷰 이름(V1, V2, V3, V4)
  */
  Active(viewName: string): void;

  /** 
   * 특정 메타 보고서에 분석항목 조회 조건을 추가하는 메소드
   *
  * @param itemCode 추가할 조회 조건 코드
  * @param filterOperator 추가할 조회 조건의 비교 연산자
  * @param promptType 추가할 조회 조건의 유형
  * @param promptName 추가할 조회 조건의 변수명
  * @param defaultValue 추가할 조회 조건의 기본값
  * @param protectLevel 추가할 조회 조건의 보안레벨
  * @param viewName 추가할 뷰의 이름. 없을 경우에는 현재 활성화 뷰에 추가(예)V1, V3, V3등
  */
  AddAnalysisFilterItem(itemCode: string, filterOperator: number, promptType: number, promptName: string, defaultValue: object, protectLevel: number, viewName: string): void;

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
  */
  AddFilterItem(itemCode: string, filterOperator: enMetaConditionOperator, promptType: enMetaConditionDefaultPromptType, promptName: string, defaultValue: object, protectLevel: enFilterItemProtectLevel, viewName: string, filterType: enMetaConditionFilterType, promptValidate: enMetaConditionPromptValidate, parentCode: string, formula: string, caption: string): void;

  /** 
   * 특정 메타 보고서에 조회 조건을 추가하는 메소드
   *
  * @param itemName 추가할 조회 조건 캡션명
  * @param filterOperator 추가할 조회 조건의 비교 연산자
  * @param promptType 추가할 조회 조건의 유형
  * @param promptName 추가할 조회 조건의 변수명
  * @param defaultValue 추가할 조회 조건의 기본값
  * @param protectLevel 추가할 조회 조건의 보안레벨
  * @param viewName 추가할 뷰의 이름. 없을 경우에는 현재 활성화 뷰에 추가(예)V1, V3, V3등
  */
  AddFilterItemByName(itemName: string, filterOperator: number, promptType: number, promptName: string, defaultValue: object, protectLevel: number, viewName: string): void;

  /** 
   * 특정 메타 보고서에 조회 항목을 추가하는 메소드
   *
  * @param position 추가할 위치
  * @param itemCode 항목 코드
  * @param groupFunction 그룹함수
  * @param viewName 뷰이름
  * @param formula 계산 수식
  * @param caption 화면 표시명
  * @param periodAnalysis 기간별 비교분석
  */
  AddItemEx(position: enMetaReportControlType, itemCode: string, groupFunction?: enMetaFieldGroupFunction, viewName?: string, formula?: string, caption?: string, periodAnalysis?: PeriodAnalysis): void;

  /** 
   * 특정 메타 보고서에 SQLHint 항목을 추가하는 메소드
   *
  * @param SQLHint 추가할 SQL Hint 텍스트
  * @param viewName 추가할 뷰의 이름. 없을 경우에는 현재 활성화 뷰에 추가(예)V1, V3, V3등
  */
  AddSQLHintItem(SQLHint: string, viewName: string): void;

  /** 
   * 특정 메타 보고서에 조회 조건을 Clear하는 메소드
   *
  * @param viewName Clear할 뷰의 이름 (예)V1, V3, V3등. 없을 경우에는 모든 뷰
  */
  ClearFilterItems(viewName: string): void;

  /** 
   * 특정 메타 보고서에 조회 항목을 삭제하는 메소드
   *
  * @param position  삭제할 위치
  * @param itemCode  항목 코드
  */
  DeleteItem(position: enMetaReportControlType, itemCode: string): void;

  /** 
   * 메타 데이터소스 설정 팝업의 버튼을 클릭을 반생시켜주는 메소드
   *
  * @param triggerName 버튼 트리거 이름(OK : 확인 버튼, Cancel : 취소 버튼, Query : 쿼리 미리보기 버튼)
  */
  ExecuteButtonTrigger(triggerName: string): void;

  /** 
   * 특정 뷰의 모든 조회 조건 목록을 반환해주는 메소드
   *
  * @param viewName 뷰 이름(V1, V2, V3, V4)
  */
  GetAllFilterItems(viewName: string): MetaFilterItem[];

  /** 
   * 메타 뷰어에서 SQL과 MetaLayoutXML을 조회하는 메소드
   *
  * @param callback 콜백 함수
  */
  GetMetaLayoutInfo(callback: Function): void;

  /** 
   * 메타 팝업창의 MetaViewManager 객체를 반환하는 메소드
   *
  */
  GetMetaViewManager(): MetaViewManager;

  /** 
   * 모든 뷰를 반환해주는 메소드
   *
  */
  GetViews(): MetaView[];

  /** 
   * 메타 뷰어 보고서 영역 감추는 메소드
   *
  */
  HideReportListArea(): void;

  /** 
   * 메타 뷰어 상단 영역 감추는 메소드
   *
  */
  HideTopArea(): void;

  /** 
   * 메타 뷰어에서 LOV 사용 유무를 설정하는 메소드
   *
  * @param isEnable LOV 사용 유무
  */
  SetEnableLOV(isEnable: boolean): void;

  /** 
   * 특정 메타 보고서에 특정 조회 조건의 값을 설정하는 메소드
   *
  * @param viewName 해당 조회 조건이 배치되어있는 뷰 이름(예)V1, V2, V3
  * @param promptName 해당 조회 조건의 변수명
  * @param value1 설정할 값 1
  * @param value2 설정할 값 2(Between 시 사용)
  */
  SetFilterValue(viewName: string, promptName: string, value1: object, value2: object): void;

  /** 
   * 메타 데이터소스 설정 팝업을 출력하는 메소드
   *
  * @param control 메타 데이터소스를 적용할 컨트롤
  */
  ShowPopupForControl(control: Control): void;

}
