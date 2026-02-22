import { Control } from "../../aud/control/Control";
import { OlapField } from "../../aud/control/olap/OlapField";
import { Options } from "../../aud/control/olap/Options";
import { ScriptSelection } from "../../aud/control/olap/ScriptSelection";
import { FieldGroup } from "../../aud/control/olap/FieldGroup";
import { ScriptMultiHeader } from "../../aud/control/olap/ScriptMultiHeader";
import { ScriptDataCell } from "../../aud/control/olap/ScriptDataCell";
import { ScriptCustomDimension } from "../../aud/control/olap/ScriptCustomDimension";
import { DimensionGroup } from "../../aud/control/olap/DimensionGroup";
import { enArea } from "../../aud/enums/olap/enArea";
import { OlapFilter } from "../../aud/control/olap/OlapFilter";
import { ScriptMenuOption } from "../../aud/control/olap/ScriptMenuOption";
import { ScriptHitTestResult } from "../../aud/control/olap/ScriptHitTestResult";
import { ContextMenu } from "../../aud/control/ContextMenu";
import { ScriptHeaderCell } from "../../aud/control/olap/ScriptHeaderCell";
import { enOlapExportsType } from "../../aud/enums/olap/enOlapExportsType";
import { IMultiHeaderCell } from "../../aud/control/olap/IMultiHeaderCell";
/**
* 다차원 분석 기능을 제공하는 컨트롤입니다.
*/
export interface OlapGrid extends Control{

  /**
   * 필터용으로 바인딩된 콤보박스의 값이 변경되면 자동으로 조회를 수행할지 여부를 가져오거나 설정합니다.
  */
  AutoBindingRefresh: boolean;

  /**
   * 보고서가 열리면서 자동으로 조회할지 여부를 가져오거나 설정합니다.
  */
  AutoRefresh: boolean;

  /**
   * 컨트롤 캡션을 가져오거나 설정합니다.
  */
  Caption: string;

  /**
   * 데이터 영역의 열 수를 가져옵니다.
  */
  ColumnCount: number;

  /**
   * 데이터소스의 키값을 가져오거나 설정합니다.
  */
  DataSourceKey: string;

  /**
   * 클립보드 비활성화 여부를 가져오거나 설정합니다.
  */
  DisableClipBoard: boolean;

  /**
   * 데이터 내보내기 버튼 클릭 시 대상 여부를 가져오거나 설정합니다.
  */
  DoExport: boolean;

  /**
   * 데이터 조회 버튼 클릭 시 조회 대상 여부를 가져오거나 설정합니다.
  */
  DoRefresh: boolean;

  /**
   * 필드 목록을 가져옵니다.
  */
  Fields: OlapField[];

  /**
   * 옵션 정보를 가져옵니다.
  */
   readonly Options: Options;

  /**
   * 데이터 영역의 행 수를 가져옵니다.
  */
  RowCount: number;

  /**
   * 스크롤의 가로 오프셋 값을 가져오거나 설정합니다.
  */
  ScrollLeft: number;

  /**
   * 스크롤의 세로 오프셋 값을 가져오거나 설정합니다.
  */
  ScrollTop: number;

  /**
   * 선택 영역 객체를 가져옵니다.
  */
  Selection: ScriptSelection;

  /**
   * 현재 컨트롤의 자식 컨트롤을 가져오거나 설정합니다. (자식 컨트롤은 현재 컨트롤 조회 시 한번에 계산된 결과를 출력합니다.)
  */
  SubOlapGrid: OlapGrid;

  /**
   * 차트 소스 바인딩 시 총소계 표시 여부를 가져오거나 설정합니다.
  */
  UseChartSourceGrandTotal: boolean;

  /**
   * 차트 소스 바인딩 시 반전된 DataTable 사용 여부를 가져오거나 설정합니다.
  */
  UseChartSourceReverse: boolean;

  /**
   * 차트 소스 바인딩 시 소계 표시 여부를 가져오거나 설정합니다.
  */
  UseChartSourceTotal: boolean;

  /** 
   * 필드 그룹을 생성합니다.
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * var flds = ["창고구분", "창고코드", "창고이름"];
   * var fld;
   * for(var i=0;i<flds.length; i++){
   * 	fld = OlapGrid.getField(flds[i]);
   * 	if(fld){
   * 		fld.Area = 1 ; //Row//
   * 	}
   * }
   * OlapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
   * OlapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거	
   * 
   * OlapGrid.AddFieldGroup("GRP_FIELDS_01",flds);
   * OlapGrid.Refresh();
   * ```
  * @param name 그룹 이름
  * @param childrens 자식 필드 이름 목록 (배열 또는 콤마로 분리한 문자열)
  */
  AddFieldGroup(name: string, childrens: string[]): FieldGroup;

  /** 
   * 특정 셀을 숨김 처리합니다.
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * OlapGrid.ClearHiddenPaths();//전체 숨김 내역 제거
   * 	
   * //년도가 2012 년이면 판매 단가를 표시하지 않는다.
   * var cell;
   * var header;
   * var path;
   * for(var c=0,len=OlapGrid.ColumnCount;c<len; c++){
   * 	cell = OlapGrid.getCell(0 ,c);
   * 	if(cell.Field && cell.Field.Name == "판매단가"){
   * 		if(cell.getHeaderValue("년도") == "2012"){
   * 			//경로 정보를 구한다.
   * 			path = getHiddenPath(cell.ColumnHeader);
   * 			OlapGrid.AddHiddenPaths(path);
   * 		}
   * 	}
   * }
   * Matrix.doRefresh("OlapGrid");
   * 
   * var getHiddenPath = function(hCell) {
   *     var path = "";
   *     var cell = hCell;
   *     while (true) {
   *         if (!cell || !cell.Field)
   *             break;
   * 			
   *         if (cell.Measure) {
   *             path += "[" + cell.Key + "]";
   *         }
   *         else if (cell.GrandTotal) {
   *             path += "[#GRAND_TOTAL#]";
   *         }
   *         else if (cell.Total && cell.Reference) {
   *             path += "[#" + cell.Reference.Key + "#]";
   *         }
   *         else {
   *             path += "[" + cell.Key + "]";
   *         }
   *         cell = cell.Parent;
   *     }
   *     return path;
   * };
   * ```
  * @param path 경로 표현식 (예: [DIMENSION_PATH1][DIMENSION_PATH2]...)
  */
  AddHiddenPaths(path: string): void;

  /** 
   * 계층 필드를 생성합니다.
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * var fieldNames = "창고구분,창고코드,창고이름";
   * var flds = fieldNames.split(",");
   * var fld;
   * for(var i=0;i<flds.length; i++){
   * 	fld = OlapGrid.getField(flds[i]);
   * 	if(fld){
   * 		fld.Area = 1 ; //Row//
   * 	}
   * }
   * OlapGrid.ClearFieldGroup();     //필드 그룹 모두 제거
   * OlapGrid.ClearHierarchyGroup(); //hierarchy필드 모두 제거	
   * 
   * OlapGrid.AddHierarchyGroupInfo("HIERARCHY_01", fieldNames , flds);
   * OlapGrid.Refresh();
   * ```
  * @param name 그룹이름
  * @param caption 화면 표시 이름
  * @param childrens 자식 필드 이름 목록 (배열 또는 콤마로 분리한 문자열)
  */
  AddHierarchyGroupInfo(name: string, caption: string, childrens: string[]): OlapField;

  /**
   * 필드를 추가하고 추가된 필드를 반환합니다.
   *
   * @example 계산 필드 추가 (판매수량 비율)
   * ```
   * var olap = Matrix.getObject("OlapGrid1");
   * olap.BeginFieldUpdate();
   *
   * var fld = olap.AppendField("RATE_FIELD");
   * fld.Caption = "판매비율(%)";
   * fld.Category = 2;      // enCategory.Measure
   * fld.Area = 4;          // enArea.Data
   * fld.SummaryType = 9;   // enSummaryType.Calculate
   * fld.Format = "#,##0.00";
   * fld.Formula = '[판매수량] / ForAll("[COMPANY]", [판매수량]) * 100';
   *
   * olap.EndFieldUpdate();
   * olap.Refresh();
   * ```
  * @param name 필드 이름
  */
  AppendField(name: string): OlapField;

  /** 
   * 필드 제어 시작을 컨트롤에 알립니다.
   *
  */
  BeginFieldUpdate(): void;

  /** 
   * 현재 뷰에서 변경된 내용을 다시 계산하고 화면을 다시 그립니다.
   * 필드의 너비나 셀의 높이 등 화면에서 계산 가능한 옵션만 적용되며
   * 필드가 추가되거나, 위치 이동 등 서버의 계산이 필요한 경우는 Refresh를 사용해야 합니다.
  */
  Calculate(): void;

  /**
   * 현재 뷰에서 변경된 내용을 다시 계산하고 화면을 다시 그립니다.
   *
  * @param resetScroll 스크롤 초기화 여부
  */
  Calculate(resetScroll: boolean): void;

  /** 
   * 수정된 데이터 셀들을 서버에서 계산하도록 지시합니다.
   *
  * @param callback 계산 완료 후 호출되는 콜백 함수
  */
  CalculateWriteBack(callback: Function): boolean;

  /** 
   * 수정된 데이터 셀 중 계산하지 않은 셀이 있는지 여부를 반환합니다.
   *
  */
  CanCalculateWriteBack(): boolean;

  /** 
   * 모든 필드의 사용자 정의 항목을 제거합니다.
   *
  */
  ClearCustomDimensions(): void;

  /** 
   * 모든 필드의 사용자 정의 정렬 리스트를 제거합니다.
   *
  */
  ClearCustomSort(): void;

  /** 
   * 화면의 데이터를 초기화합니다.
   *
  */
  ClearData(): void;

  /** 
   * 컨트롤에 바인딩되어 있는 데이터를 초기화합니다.
   *
  */
  ClearDataSet(): void;

  /** 
   * 모든 필드의 디멘전 그룹 정보를 제거합니다.
   *
  */
  ClearDimensionGroups(): void;

  /** 
   * 컨트롤 내 모든 필드 그룹 정보를 삭제합니다.
   *
  */
  ClearFieldGroup(): void;

  /** 
   * 모든 필드를 삭제합니다.
   *
  */
  ClearFields(): void;

  /** 
   * 모든 필드의 필터 정보를 초기화합니다.
   *
  */
  ClearFilters(): void;

  /** 
   * 숨김 처리 정보를 모두 삭제합니다.
   *
  */
  ClearHiddenPaths(): void;

  /** 
   * Hierarchy 필드를 모두 삭제합니다.
   *
  */
  ClearHierarchyGroup(): void;

  /** 
   * 헤더 영역의 전체 노드를 축소합니다.
   *
  */
  CollapsedAll(): void;

  /** 
   * 멀티 헤더를 생성합니다.
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * var mHeader = OlapGrid.CreateMultiHeaders(2); 
   * mHeader.UseMultiHeader = true;
   * var beforeYear = "";
   * var currentYear = "";
   * var beginIndex = -1;
   * var colspan = 1;
   * var lastRowIndex = mHeader.RowCount -1;
   * for(var c=0; c<mHeader.ColumnCount; c++){
   * 	var cell = mHeader.getCell(lastRowIndex ,c);
   * 	cell.Align = 2;
   * 	currentYear = cell.Text; //마지막 셀(필드명이 표시된 셀을 읽어 온다
   * 	if(currentYear.indexOf("_") > 0){
   * 		currentYear = currentYear.substring(0,currentYear.indexOf("_"));
   * 	}
   * 	if(currentYear != beforeYear){
   * 		if(beginIndex >= 0){
   * 			cell = mHeader.getCell(0 ,beginIndex);
   * 			cell.ColSpan = colspan;
   * 			cell.Text = beforeYear;				
   * 			cell.Align = 2 ; //Center//
   * 		}
   * 		beginIndex = c;
   * 		colspan = 1;
   * 	}else{
   * 		colspan ++;
   * 	}
   * 	beforeYear = currentYear;
   * }
   * // 마지막 점검
   * if(colspan > 1 && beginIndex >= 0){
   * 	cell = mHeader.getCell(0 ,beginIndex);
   * 	cell.ColSpan = colspan;
   * 	cell.Text = beforeYear;	
   * 	cell.Align = 2 ; //Center//
   * }
   * OlapGrid.Refresh();
   * ```
  * @param rowCount 생성할 행 수
  */
  CreateMultiHeaders(rowCount: number): ScriptMultiHeader;

  /** 
   * 수정된 필드 정보를 일괄 반영합니다.
   *
  */
  EndFieldUpdate(): void;

  /** 
   * Drill to detail 결과를 데이터 그리드에 출력합니다.
   *
  * @param dataCell 데이터 셀
  * @param dataGridName DataGrid 이름
  */
  ExecuteDrillToDetail(dataCell: ScriptDataCell, dataGridName: string): void;

  /** 
   * 특정 헤더를 확장 하거나 축소합니다.
   *
  * @param fieldName 필드 이름
  * @param items 찾을 아이템 목록(,로 분리하여 입력)
  * @param expand 축소/확장 여부
  */
  Expand(fieldName: string, items: string, expand: boolean): void;

  /** 
   * 특정 헤더를 확장 하거나 축소합니다.
   *
  * @param fieldName 필드 이름
  * @param items 찾을 아이템 목록
  * @param expand 축소/확장 여부
  */
  Expand(fieldName: string, items: string[], expand: boolean): void;

  /** 
   * 헤더 영역의 전체 노드를 확장합니다.
   *
  */
  ExpandAll(): void;

  /** 
   * CSV 파일 내보내기를 실행합니다.
   *
  */
  ExportCSV(): void;

  /** 
   * CSV 파일 내보내기를 실행합니다.
   *
  * @param callbackFunc 내보내기가 완료되었을 때 호출할 콜백 함수
   * @hidden
  */
  ExportCSV(callbackFunc: Function): Function;

  /** 
   * 엑셀 파일 내보내기를 실행합니다.
   *
  */
  ExportExcel(): void;

  /** 
   * 텍스트 파일 내보내기를 실행합니다.
   *
  */
  ExportText(): void;

  /** 
   * 엑셀 내보내기 데이터를 반환합니다.
   *
  * @param range 엑셀의 출력 시작 셀 주소
  */
  GetExcelExportJSON(range: string): string;

  /** 
   * 그리드에서 수정된 데이터가 존재하는지 여부를 반환합니다.
   *
  */
  IsModified(): boolean;

  /** 
   * 필드의 위치를 변경합니다.
   *
  * @param name 필드 이름
  * @param index 영역 내 위치 (0부터 시작)
  * @param update 이동 후 자동 업데이트 여부
  */
  MoveField(name: string, index: number, update: boolean): boolean;

  /**
   * 필드의 위치를 변경합니다.
   *
  * @param name 필드 이름
  * @param index 영역 내 위치 (0부터 시작)
  */
  MoveField(name: string, index: number): boolean;

  /** 
   * 특정 페이지로 이동합니다.
   *
  * @param page 이동할 페이지 번호
  */
  MovePage(page: number): void;

  /** 
   * i-META 레이아웃 창을 실행합니다.
   *
  */
  OpenDialogAnalysisItemsSettings(): void;

  /** 
   * 계산 필드 편집 창을 실행합니다.
   *
  */
  OpenDialogCalculatorField(): void;

  /** 
   * 사용자 정의 항목을 편집할 수 있는 창을 실행합니다.
   *
  * @param fieldName 필드 이름
  */
  OpenDialogCustomDimension(fieldName: string): void;

  /** 
   * 필드의 사용자 정의 정렬을 수행 할 수 있는 창을 실행합니다.
   *
  * @param fieldName 필드 이름
  */
  OpenDialogCustomSort(fieldName: string): void;

  /** 
   * 필드의 디멘전 그룹을 설정 할 수 있는 창을 실행합니다.
   *
  * @param fieldName 필드 이름
  */
  OpenDialogDimensionGroup(fieldName: string): void;

  /** 
   * 필터 대화 상자를 실행합니다.
   *
  * @param fieldName 필드 이름
  */
  OpenDialogFilter(fieldName: string): void;

  /** 
   * 전체 필드의 필터를 설정할 수 있는 창을 실행합니다.
   *
  */
  OpenDialogFilterManager(): void;

  /** 
   * 필드의 포맷을 일괄 수정할 수 있는 창을 실행합니다.
   *
  */
  OpenDialogFormatting(): void;

  /** 
   * 필드의 수식 편집 창을 실행합니다.
   *
  * @param fieldName 필드 이름
  */
  OpenDialogFormulaEditor(fieldName: string): void;

  /** 
   * 필드의 배치를 관리할 수 있는 창을 실행합니다.
   *
  */
  OpenDialogLayout(): void;

  /** 
   * 멀티헤더 디자인 창을 실행합니다.
   *
  */
  OpenDialogMultiHeader(): void;

  /** 
   * 피벗 컨트롤의 상세 속성을 설정할 수 있는 창을 실행합니다.
   *
  */
  OpenDialogProperties(): void;

  /** 
   * 데이터를 조회합니다.
   *
  */
  Refresh(): void;

  /** 
   * 특정 필드의 사용자 정의 항목을 제거합니다.
   *
  * @param fieldName 필드 이름
  */
  RemoveCustomDimension(fieldName: string): void;

  /** 
   * 필드의 사용자 정의 정렬 리스트를 삭제합니다.
   *
  * @param fieldName 필드 이름
  */
  RemoveCustomSort(fieldName: string): void;

  /** 
   * 필드의 디멘전 그룹 정보를 제거합니다.
   *
  * @param fieldName 필드 이름
  */
  RemoveDimensionGroup(fieldName: string): void;

  /** 
   * 지정한 이름의 필드를 삭제합니다.
   *
  * @param name 필드 이름
  */
  RemoveField(name: string): void;

  /** 
   * 특정 필드 그룹을 삭제합니다.
   *
  * @param name 그룹이름
  */
  RemoveFieldGroup(name: string): void;

  /** 
   * 필드의 필터 정보를 초기화합니다.
   *
  * @param fieldName 필드 이름
  */
  RemoveFilter(fieldName: string): void;

  /** 
   * 주어진 이름의 Hierarchy 필드를 삭제합니다.
   *
  * @param fieldName 필드 이름
  */
  RemoveHierarchyGroup(fieldName: string): void;

  /** 
   * 화면을 다시 그립니다. (Offset 등의 값은 유지됩니다.)
   *
  */
  ScreenUpdate(): void;

  /** 
   * 화면을 다시 그립니다.
   *
  */
  Update(): void;

  /** 
   * 필드에 사용자 정의 항목을 추가합니다.
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * var grpName = "1.수도권";
   * var nDim = OlapGrid.addCustomDimension("창고이름", grpName );
   * nDim.Caption = grpName ;
   * var arr= ["부천점", "용산점", "테크노점" ,"안양점"];
   * var text = '"' + arr.join("\",\"") + '"';
   * nDim.Formula = ' InList([창고이름], ' + text + ')';
   * nDim.DataCellStyle = "BXcc50e79a-71cb-4105-96a5-98a025fdf8bc";
   * OlapGrid.Refresh();		
   * ```
  * @param fieldName 필드 이름
  * @param dimensionName 디멘전 이름
  */
  addCustomDimension(fieldName: string, dimensionName: string): ScriptCustomDimension;

  /** 
   * 필드의 디멘전 그룹 정보를 생성합니다.
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObejct("OlapGrid");
   * //그룹 필드 추가
   * var targetField = "창고코드";
   * var newField = OlapGrid.addDimensionGroup(targetField ,"그룹(" + targetField+ ")");
   * var group = newField.DimensionGroupInfo; //디멘젼 그룹 정보
   * 
   * var item = group.AddItem("1.ALL");
   * item.ItemType = 2 ; //All//
   * 		
   * item = group.AddItem("2.SE");
   * item.ItemType = 0 ; //Normal//
   * item.Entries =  ['SE01','SE03','SE04','SE05','SE06','SE09','SE10','SE12','SE20','SE30','SE40','SE50','SE90'];
   * 
   * item = group.AddItem("3.CS");
   * item.ItemType = 0 ; //Normal//
   * item.Entries = ['CS01','CS10','CS30','CS40','CS99'];
   * 
   * item = group.AddItem("4.SC");
   * item.ItemType = 0 ; //Normal//
   * item.Entries =  ['SC01','SC02','SC03','SC04'];		
   * 
   * item = group.AddItem("5.Others");
   * item.ItemType= 1 ; //Others// 		
   * 
   * newField.Area = 1 ; //Row//
   * OlapGrid.MoveField(newField.Name ,0, false);
   * OlapGrid.getField("창고코드").Area = 1  //Row//;
   * OlapGrid.MoveField("창고코드" ,1, true);
   * OlapGrid.Refresh();
   * ```
  * @param fieldName 대상 필드 이름
  * @param caption 디멘전 그룹 필드 라벨
  */
  addDimensionGroup(fieldName: string, caption: string): OlapField;

  /** 
   * OlapGrid의 사전 필터를 추가합니다.
(사전 필터는 특정 배치 기준으로 수식으로 필터를 할 수 있습니다.)
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * //기존 설정 삭제
   * OlapGrid.clearPreFilter();
   * //필터 추가
   * //Product, Customer 그룹해서 SALE_QTY의 합계 수량이 10000개 이상만 표현
   * OlapGrid.addPreFilter(["PRODUCT","CUSTOMER"],"SUM([SALE_QTY]) >= 10000"); 
   * 
   * OlapGrid.Refresh();
   * ```
  * @param groupByFields 그룹할 필드의 이름 또는 라벨을 배열 형태로 전달합니다.
  * @param formula 수식을 입력합니다. 수식의 결과는 boolean 타입을 반환해야 합니다.
  */
  addPreFilter(groupByFields: string[], formula: string): void;

  /** 
   * OlapGrid 의 설정된 ColumnSort 를 초기화합니다.
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * OlapGrid.ClearColumnSort(true); // column sort 초기화 후 자동 조회
   * ```
  * @param update 초기화 후 자동 업데이트 여부
  */
  clearColumnSort(update: boolean): void;

  /** 
   * OlapGrid 의 설정된 ColumnSort 를 초기화합니다.
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * OlapGrid.ClearColumnSort(); // column sort 초기화
   * OlapGrid.Refresh(false); //조회
   * ```
  */
  clearColumnSort(): void;

  /** 
   * OlapGrid의 사전 필터를 모두 제거합니다.
   *
  */
  clearPreFilter(): void;

  /** 
   * Top n 필터 정보를 삭제합니다.
   *
  */
  clearTopFilter(): void;

  /** 
   * Base64 인코딩된 이미지 결과를 반환합니다.
   *
  */
  getBase64Image(): string;

  /** 
   * Base64 인코딩된 이미지 결과를 반환합니다.
   *
  * @param callback 이미지 변환 완료 후 호출되는 콜백 함수
  */
  getBase64Image(callback: (value:string) => void): void;

  /** 
   * 특정 위치의 데이터셀을 반환합니다.
   *
  * @param r Row Index
  * @param c Column Index
  */
  getCell(r: number, c: number): ScriptDataCell;

  /** 
   * 필드의 사용자 정의 항목 리스트를 반환합니다.
   *
  * @param fieldName 필드 이름
  */
  getCustomDimension(fieldName: string): ScriptCustomDimension[];

  /** 
   * 필드의 사용자 정의 정렬 리스트를 반환합니다.
   *
  * @param fieldName 필드 이름
  */
  getCustomSort(fieldName: string): string[];

  /** 
   * 필드의 디멘전 그룹 정보를 반환합니다.
   *
  * @param fieldName 필드 이름
  */
  getDimensionGroup(fieldName: string): DimensionGroup;

  /** 
   * i-META를 통해 Drill To Detail 정보를 조회하기 위한 XML을 반환합니다.
   *
  * @param cell 데이터셀
  */
  getDrillToDetailXml(cell: ScriptDataCell): string;

  /** 
   * 지정한 이름의 필드를 반환합니다.
   *
  * @param name 필드 이름
  */
  getField(name: string): OlapField;

  /** 
   * 필드의 구성원 목록을 반환합니다.
   *
  * @param fieldName 필드 이름
  * @param callback 전체 항목과 선택된 항목을 전달받는 콜백 함수
  */
  getFieldMembers(fieldName: string, callback: (allItems:Array<string>, selectedItems:Array<string>)=>void): void;

  /** 
   * 특정 영역의 필드 목록을 반환합니다.
   *
  * @param area 영역 (입력하지 않을 경우 전체 목록 반환)
  */
  getFieldNames(area: enArea): string[];

  /** 
   * 전체 필드 목록을 반환합니다.
   *
  */
  getFields(): OlapField[];

  /** 
   * 필드의 필터 정보를 반환합니다.
   *
  * @param fieldName 필드 이름
  */
  getFilter(fieldName: string): OlapFilter;

  /** 
   * Context 메뉴 옵션을 반환합니다.
   *
  */
  getMenuOption(): ScriptMenuOption;

  /** 
   * 멀티 헤더를 반환합니다.
   *
  */
  getMultiHeader(): ScriptMultiHeader;

  /** 
   * Excel의 GETPIVOTDATA  함수
   *
  * @param dataFieldName 데이터 필드 이름
  * @param expression 표현식 (예: [FLD_NAME1][FindValue1],[FLD_NAME2][FindValue2]...)
  */
  getPivotData(dataFieldName: string, expression: string): number;

  /** 
   * OlapGrid의 사전 필터 목록을 반환합니다.
   *
   * @example
   * ```js
   *  var GET_PRE_FILTERS = function(){
   *  	var OlapGrid = Matrix.getObject("OlapGrid");
   *  	var DataGrid = Matrix.getObject("DataGrid");
   * 	DataGrid.ClearData();
   * 	var filters = OlapGrid.getPreFilters();
   * 	for(var i=0,len=filters.length;i<len;i++){
   * 		var flter = filters[i];
   * 		var nRow = DataGrid.AppendRow(true);
   * 		nRow.SetValue("FIELD" ,flter.GroupBy.join(","));
   * 		nRow.SetValue("FORMULA" ,flter.Formula);
   * 	} 
   *  }
   * ```
  */
  getPreFilters(): Array<{"GroupBy":Array<string>, "Formula":string}>;

  /** 
   * 선택 영역 객체를 반환합니다.
   *
  */
  getSelection(): ScriptSelection;

  /** 
   * OlapGrid 의 ColumnSort 를 설정합니다.
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * OlapGrid.setColumnSort(1, 0, true); // column leaf node 의 첫번째 셀(0) 기준으로  오름차순(1) 설정 후 자동 조회
   * //또는 경로 값으로 설정 가능합니다.
   * OlapGrid.setColumnSort(1, {"PRODUCT":"SmartPhone", "CUSTOMER":"Korea"},  true);
   * //컬럼 경로에 Product가 SmartPhone이고 CUSTOMER가 Korea인 첫 번째 항목을 찾아서 정렬합니다.
   * ```
  * @param sortType Asc:1/Desc:2
  * @param indexOrPath Column Header LeafNode Index(0부터 시작)
  * @param update ColumnSort 설정 후 자동 업데이트 여부
  */
  setColumnSort(sortType: number, indexOrPath: number | {[key:string]:string}, update: boolean): void;

  /** 
   * OlapGrid 의 ColumnSort 를 설정합니다.
   *
   * @example
   * ```js
   * 
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * OlapGrid.setColumnSort(1, 0); // column leaf node 의 첫번째 셀(0) 기준으로  오름차순(1) 설정
   * //또는 경로 값으로 설정 가능합니다.
   * OlapGrid.setColumnSort(1, {"PRODUCT":"SmartPhone", "CUSTOMER":"Korea"});
   * //컬럼 경로에 Product가 SmartPhone이고 CUSTOMER가 Korea인 첫 번째 항목을 찾아서 정렬합니다.
   * OlapGrid.Refresh(false); // 설정 유지된 상태로 조회
   * ```
  * @param sortType Asc:1/Desc:2
  * @param indexOrPath Column Header LeafNode Index(0부터 시작)
  */
  setColumnSort(sortType: number, indexOrPath: number | {[key:string]:string}): void;

  /** 
   * 컨트롤의 커서를 지정합니다.
   *
  * @param cursorName 커서 모양
  */
  setCursor(cursorName: string): void;

  /** 
   * 주어진 이름의 데이터소스를 바인딩합니다.
   *
  * @param name 데이터소스 이름
  */
  setDataSourceName(name: string): void;

  /** 
   * 필드에 필터를 설정합니다.(Between)
   *
  * @param fieldName 필드 이름
  * @param valueA 값 A
  * @param valueB 값 B
  */
  setDimensionFilterBetWeen(fieldName: string, valueA: string, valueB: string): void;

  /** 
   * 필드에 필터를 설정합니다.(In)
   *
  * @param fieldName 필드 이름
  * @param values 값 목록
  */
  setDimensionFilterIn(fieldName: string, values: string[]): void;

  /** 
   * 필드에 필터를 설정합니다.(Not In)
   *
  * @param fieldName 필드 이름
  * @param values 값 목록
  */
  setDimensionFilterNotIn(fieldName: string, values: string[]): void;

  /** 
   * 데이터 수정 시 잠김셀을 수식으로 설정합니다.
   *
  * @param formula 잠김셀의 계산 수식(결과가 true면 잠금)
  */
  setLockCellFormula(formula: string): void;

  /** 
   * 필드에 필터를 설정합니다.(Measure)
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * OlapGrid.setMeasureFilter('판매단가', '>=',10000 ,'<=',30000,true);
   * OlapGrid.Refresh();
   * ```
  * @param fieldName 필드 이름
  * @param operator1 연산자 1(eg. <, >,<>,>=,<=)
  * @param value1 값 1
  * @param operator2 연산자 2(eg. <, >,<>,>=,<=)
  * @param value2 값 2
  * @param and true=And, false=Or
  */
  setMeasureFilter(fieldName: string, operator1: string, value1: number, operator2: string, value2: number, and: boolean): void;

  /** 
   * 필드에 필터를 설정합니다.(Measure)
   *
   * @example
   * ```js
   * var OlapGrid = Matrix.getObject("OlapGrid");
   * OlapGrid.setMeasureFilter('판매단가', '>=',10000);
   * OlapGrid.Refresh();
   * ```
  * @param fieldName 필드 이름
  * @param operator 연산자 (eg. <, >,<>,>=,<=)
  * @param value 값
  */
  setMeasureFilter(fieldName: string, operator: string, value: number): void;

  /** 
   * 데이터 갱신 시 자동으로 선택될 영역을 지정합니다.
   *
  * @param top Top(Start Row Index)
  * @param bottom Bottom(End Row Index)
  * @param left Left(Start Column Index)
  * @param right Right(End Column Index)
  */
  setSelectionIndex(top: number, bottom: number, left: number, right: number): void;

  /** 
   * Top n 필터 정보를 설정합니다.
   *
  * @param filterFiledName 필터 대상 필드 이름
  * @param valueFiledName 값 필드 이름
  * @param rank 순위 값
  * @param isTop 상위 여부(true:내림 차순으로 정렬, false:오름 차순으로 정렬)
  * @param groupBy 상위 그룹 필드 목록
  */
  setTopFilter(filterFiledName: string, valueFiledName: string, rank: number, isTop: boolean, groupBy: string[]): void;

  /**
   * @event 
   *
   * 정렬 정보 변경 전에 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnBeforeSortChange : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 정렬 대상 필드(※ ColumnSort의 경우 null 반환)
    */
    Field: OlapField
    /**
     * ColumnSort 대상 셀의 Index(※ 일반 정렬의 경우 -1 반환)
    */
    Index: number
    /**
     * Canceled 를 true 설정할 경우 정렬이 취소됩니다.
    */
    Canceled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   *  Write-Back 계산 결과를 바인딩 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnCalculateWriteBackEnd : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤의 셀의 너비를 변경하게 되면 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnCellResized : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤 클릭 시 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnClick : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * 컨텍스트 메뉴가 열리기 전에 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnContextMenuOpening : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 히트 테스트 정보
    */
    HitInfo: ScriptHitTestResult
    /**
     * 컨텍스트 메뉴 객체
    */
    Menu: ContextMenu
    /**
     * 컨텍스트 메뉴를 열지 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnDataBindEnd : (sender : OlapGrid
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
   * 데이터 셀을 더블 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnDataCellDoubleClick : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 셀 객체
    */
    DataCell: ScriptDataCell
  }
  ) => void;


  /**
   * @event 
   *
   * 헤더 셀의 확장/축소가 변경된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnExpandChanged : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 헤더셀 정보
    */
    Cell: ScriptHeaderCell
  }
  ) => void;


  /**
   * @event 
   *
   * 내보내기 직전에 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnExportStart : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 내보내기 유형
    */
    ExportType: enOlapExportsType
    /**
     * 파일명, 기본값 : 보고서명_yyyyMMddHHmmss(일시는 실제 다운로드 시점에 설정)
    */
    ExportFileName: string
    /**
     * 글자 유형, 기본값 iStudioConfig.CanvasDefaultFont
    */
    DefaultFontName: string
    /**
     * 글자 크기, 기본값 11
    */
    DefaultFontSize: number
    /**
     * Excel로 내보내기 할 경우 상단 Row에 데이터를 추가할 수 있습니다.(string array 형태로 지정)
    */
    ExportRows: string[]
    /**
     * Text 내보내기 시 Column 단위별 구분자.  eg.\\t (탭 문자)
    */
    TextExportColSeparator: string
    /**
     * Text 내보내기 시 Column 단위별 구분자.  eg.\\n (개행 문자)
    */
    TextExportRowSeparator: string
    /**
     * 이 값을 true 로 설정 할 경우 내보내기가 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 필드의 필터가 변경되면 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnFilterChanged : (sender : OlapGrid
  , args : { 
    /**
     * 필터가 변경된 필드
    */
    Field: OlapField
  }
  ) => void;


  /**
   * @event 
   *
   * 헤더 셀을 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnHeaderClicked : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 헤더 셀 객체
    */
    HeaderCell: ScriptHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 헤더 셀을 더블 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnHeaderDoubleClicked : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 헤더 셀 객체
    */
    HeaderCell: ScriptHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 필드의 배치 정보가 변경된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnLayoutUpdated : (sender : OlapGrid
  , args : { 
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤 위에서 마우스를 이동하는 동안 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnMouseMove : (sender : OlapGrid
  , args : { 
    /**
     * 히트 테스트 정보
    */
    HitInfo: ScriptHitTestResult
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 헤더 셀을 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnMultiHeaderClicked : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 헤더 셀 객체
    */
    HeaderCell: IMultiHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 멀티 헤더 셀을 더블 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnMultiHeaderDoubleClicked : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 헤더 셀 객체
    */
    HeaderCell: IMultiHeaderCell
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 셀 수정 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapDataCellEndEdit : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 셀 객체
    */
    Cell: ScriptDataCell
    /**
     * 수정 전 값
    */
    BeforeValue: number
    /**
     * 수정 후 값
    */
    AfterValue: number
    /**
     * 잠긴 레코드의 값
    */
    LockedValue: number
    /**
     * 이 값을 true 로 설정 할 경우 수정 작업이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 셀 수정 모드로 진입할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnOlapDataCellStartEdit : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 셀 객체
    */
    Cell: ScriptDataCell
    /**
     * 이 값을 true 로 설정 할 경우 수정 모드로 진입이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 스크롤 위치가 변경될 때 발생합니다.
   *
   * @example
   * ```js
   * var OlapGrid1 = Matrix.getObject("OlapGrid1");
   * var OlapGrid2 = Matrix.getObject("OlapGrid2");
   * OlapGrid2 .OnScroll = function(s, e){
   * 	if(chkSyncScroll.Checked == false) return;
   * 	try{
   * 		OlapGrid1.ScrollLeft = e.ScrollLeft;
   * 		OlapGrid1.ScrollTop = e.ScrollTop;
   * 		OlapGrid1.Update();
   * 	}catch(e){}
   * }; 
   * ```
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnScroll : (sender : OlapGrid
  , args : { 
    /**
     * 가로 스크롤 오프셋
    */
    ScrollLeft: number
    /**
     * 세로 스크롤 오프셋
    */
    ScrollTop: number
  }
  ) => void;


  /**
   * @event 
   *
   * 피벗 그리드의 선택 영역이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnSelectionChanged : (sender : OlapGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택 영역 객체
    */
    Selection: ScriptSelection
  }
  ) => void;


  /**
   * @event 
   *
   * 화면이 업데이트되면 발생합니다.
   *
   * @param sender 이벤트가 발생한 OlapGrid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link OlapGrid}
  */
  OnUpdated : (sender : OlapGrid
  , args : { 
  }
  ) => void;


}
