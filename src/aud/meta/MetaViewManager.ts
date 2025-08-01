import { enReportType } from "../../aud/enums/meta/enReportType";
import { DialogBox } from "../../aud/control/DialogBox";
import { enDialogButtonType } from "../../aud/enums/comm/enDialogButtonType";
import { enMergeType } from "../../aud/enums/meta/enMergeType";
import { MetaView } from "../../aud/meta/MetaView";
/**
* i-META Viewer 팝업 UI를 관리하는 객체
*/
export interface MetaViewManager{

  /**
   * 활성화된 MetaView
  */
  ActiveView: MetaView | undefined;

  /**
   * QueryBuilder창 Option에 대한 프로퍼티입니다.
  */
  QueryBuilderOption: any;

  /**
   * report 유형은 Analysis(분석)이거나 List(목록)입니다.
  */
   readonly ReportType: number;

  /**
   * ListGrid 모드 조회 항목 컨트롤 명
  */
  SelectName: string;

  /** 
   * 파라미터에 해당하는 인덱스 순서의 뷰를 활성화 시켜주는 메소드
   *
   * @example
   * ```js
   * AUD.MetaViewManager.Active(0);
   * ```
  * @param index 뷰 인덱스
  */
  Active(index: number): void;

  /** 
   * 보고서 유형에 따라 UI를 바꾸는 메소드
   *
  * @param reportType 1: Analysis, 3: List
  */
  ChangeReportType(reportType: enReportType): void;

  /** 
   * 배치된 항목을 삭제하는 메소드
   *
  */
  ClearLayout(): void;

  /** 
   * DrillToDetail일 경우 배치된 항목들의 컬럼명(캡션)을 모두 반환해주는 메소드
   *
   * @example
   * ```js
   * AUD.MetaViewManager.GetExecuteColumnNames(function (tempColumnCaptions) {
   * 
   * });
   * ```
  * @param callbackFunc Callback function after receiving LanguageCode.
  */
  GetExecuteColumnNames(callbackFunc: Function): void;

  /** 
   * 하이브리드 쿼리를 실행하기 위한 XML을 생성하는 메소드를 제공합니다.
   *
   * @example
   * ```js
   * AUD.MetaViewManager.GetExecuteHybridQueryXML(metaDataSource.LayoutXML, this.GetLayoutData(type, fieldKey, true), void 0, true, void 0, filterFieldInfo);
   * ```
  * @param layoutXML XML 레이아웃
  * @param gridLayoutInfo 배치된 그리드 정보
  * @param pivotXML 피벗 그리드 요약 XML
  * @param useNotSort 정렬 순서 설정 유무
  * @param removeGroupBy group by 사용 여부
  * @param filterFieldInfo OlapGrid 필터 필드
  */
  GetExecuteHybridQueryXML(layoutXML: string, gridLayoutInfo: any, pivotXML: string, useNotSort: boolean, removeGroupBy: boolean, filterFieldInfo: any): string;

  /** 
   * LOV용 XML을 만들어주는 메소드
   *
   * @example
   * ```js
   * AUD.MetaViewManager.GetExecuteLOVQueryXML(metaDataSource.LayoutXML, this.MetaItemExecuteCode, distinct, '', false);
   * ```
  * @param layoutXML XML 레이아웃
  * @param itemCode 조회할 아이템의 Code
  * @param isDistinct Distinct 유무
  * @param keyword 검색어
  * @param includeAttribute Attribute 포함 유무
  * @param useSQLEncrypt response sql 암호화 여부
  * @param isViewMode portal 에서 meta file 띄우는 경우인지 여부
  * @param addingFilterItems 추가되는 Filter Item
  */
  GetExecuteLOVQueryXML(layoutXML: string, itemCode: string, isDistinct: boolean, keyword: string, includeAttribute: boolean, useSQLEncrypt: boolean, isViewMode: boolean, addingFilterItems: any): string;

  /** 
   * 쿼리를 요청해서 화면에 출력하는 메소드
   *
   * @example
   * ```js
   * AUD.MetaWizardManager.GetMetaViewManager().GetExecuteQuery()
   * ```
  */
  GetExecuteQuery(): void;

  /** 
   * XML 쿼리 실행을 위한 메소드를 생성합니다.
   *
   * @example
   * ```js
   * AUD.MetaViewManager.GetExecuteQueryXML(tempMetaDataSource.LayoutXML, undefined, true);
   * ```
  * @param layoutXML 레이아웃 XML 파일
  * @param pivotXML 피봇 그리드에 대한 요약 정보가 포함된 XML입니다.
  * @param useNotSort order by의 포함 유무
  * @param removeGroupBy group by 사용 여부
  * @param useEncrypt 쿼리의 암호화 여부를 확인해 주세요.
  */
  GetExecuteQueryXML(layoutXML: string, pivotXML: string, useNotSort: boolean, removeGroupBy: boolean, useEncrypt: boolean): string;

  /** 
   * 조회 조건 컨트롤의 쿼리를 실행하기 위한 XML을 생성하는 메소드를 제공합니다.
   *
   * @example
   * ```js
   * AUD.MetaViewManager.GetFilterItemLayout(metaDataSource.LayoutXML, ds.Code, controlName);
   * ```
  * @param layoutXML XML 레이아웃
  * @param metaItemCode 조회 조건에 연결된 MetaItemCode
  * @param variableName 변수명
  */
  GetFilterItemLayout(layoutXML: string, metaItemCode: string, variableName: string): string;

  /** 
   * 확인 눌렀을 시 반환해주는 Object를 만들어주는 메소드
   *
   * @example
   * ```js
   * AUD.MetaWizardManager.GetMetaViewManager().GetMetaLayoutInfo(function(dialog, dialogWindow, type, metaInfo) {
   * 	console.log(metaInfo.SQLText);
   * 	console.log(metaInfo.LayoutXML);
   * });
   * ```
  * @param resultCallbackFunc callback 함수
  * @param dialog 팝업 DialogBox 객체
  * @param dialogWindow 팝업 window 객체
  * @param type 버튼 type
  */
  GetMetaLayoutInfo(resultCallbackFunc: Function, dialog: DialogBox, dialogWindow: Window, type: enDialogButtonType): void;

  /** 
   * 보고서 리스트 영역 감추는 메소드
   *
  */
  HideMetaViewerReportList(): void;

  /** 
   * 레이아웃 XML을 가지고 뷰를 불러오는 메소드
   *
   * @example
   * ```js
   * LoadMetaView("<xml...>", {}, "DS123...", "Data1", function() { ... })
   * ```
  * @param layoutXML 레이아웃 XML
  * @param gridLayoutInfo grid 배치 정보
  * @param dataSourceCode 데이타소스 코드
  * @param dataSourceName 데이타소스 명
  * @param callback 콜백 함수
  */
  LoadMetaView(layoutXML: string, gridLayoutInfo: object | undefined, dataSourceCode: string, dataSourceName: string, callback: Function): void;

  /** 
   * 메타 보고서 오픈하는 메소드
   *
  * @param reportCode 보고서 코드
  * @param moduleCode 모듈 코드
  */
  OpenReport(reportCode: string, moduleCode: string): void;

  /** 
   * 병합 유형 설정 메소드
   *
   * @example
   * ```js
   * AUD.MetaViewManager.SetMergeType("enUnionAll");   
   * ```
  * @param mergeType 
  */
  SetMergeType(mergeType: enMergeType): void;

  /** 
   * 보고서 리스트 영역 보여주는 메소드
   *
  */
  ShowMetaViewerReportList(): void;

}
