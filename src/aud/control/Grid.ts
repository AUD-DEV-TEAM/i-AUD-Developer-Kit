import { Control } from "../../aud/control/Control";
import { SolidColorBrush } from "../../aud/drawing/SolidColorBrush";
import { DataSet } from "../../aud/data/DataSet";
import { enOrientationType } from "../../aud/enums/comm/enOrientationType";
import { FreezeColumnSetting } from "../../aud/control/grids/FreezeColumnSetting";
import { enMergeRuleType } from "../../aud/enums/grid/enMergeRuleType";
import { MultiHeader } from "../../aud/control/grids/MultiHeader";
import { CompactMultiLine } from "../../aud/control/charts/CompactMultiLine";
import { enSelectRuleType } from "../../aud/enums/grid/enSelectRuleType";
import { enHeaderType } from "../../aud/enums/grid/enHeaderType";
import { DataGridColumn } from "../../aud/control/grids/DataGridColumn";
import { DataGridRow } from "../../aud/control/grids/DataGridRow";
import { enExportType } from "../../aud/enums/comm/enExportType";
import { DataTable } from "../../aud/data/DataTable";
import { DataGridCell } from "../../aud/control/grids/DataGridCell";
import { MultiHeaderCell } from "../../aud/control/grids/MultiHeaderCell";
import { DataRow } from "../../aud/data/DataRow";
import { ContextMenu } from "../../aud/control/ContextMenu";
/**
* 데이터그리드, 트리그리드의 부모 클래스
* @hidden
*/
export interface Grid extends Control{

  /**
   * 보고서가 열리면서 자동으로 Refresh를 할지 여부
  */
  AutoRefresh: boolean;

  /**
   * 배경색
  */
  Background: SolidColorBrush;

  /**
   * 컨트롤의 하단 영역 데이터 소스 키값
  */
  BottomRowDataSource: string;

  /**
   * Column 높이
  */
  ColumnHeaderHeight: number;

  /**
   * 마우스 커서 타입(ex: 'pointer', 'crosshair')
  */
  CursorType: string;

  /**
   * CRUD 수행 시 DML유형(0:Default, 1:Batch, 2:Merge)
  */
  DMLType: number;

  /**
   * 데이터 제한 건수
  */
  DataLimit: number;

  /**
   * 데이터 셋
  */
  DataSet: DataSet;

  /**
   * 컨트롤의 데이터 소스 키값
  */
  DataSource: string;

  /**
   * 내보내기 활성화 여부
  */
  DoExport: boolean;

  /**
   * 전체 Refresh동작 에서 Refresh 대상인지 여부
  */
  DoRefresh: boolean;

  /**
   * 수정 가능 유무
  */
  Editable: boolean;

  /**
   * 엔터 키 입력 시 다음 셀 선택 방향
  */
  EnterKeyDirection: enOrientationType;

  /**
   * 내보내기 시 Row 제한 개수(0일 경우에는 전체 내보내기)
  */
  ExportCount: number;

  /**
   * 필터창 데이터 제한 건수
  */
  FilterLOVLimit: number;

  /**
   * Font Color
  */
  Foreground: SolidColorBrush;

  /**
   * 좌측 고정열의 수
  */
  FreezeColumn: FreezeColumnSetting;

  /**
   * 세로 병합 규칙
  */
  MergeRule: enMergeRuleType;

  /**
   * 멀티 헤더 모델
  */
  MultiHeader: MultiHeader;

  /**
   * 멀티라인 팝업 객체
  */
  MultiLinePopup: CompactMultiLine;

  /**
   * 반복행 배경색
  */
  OddRowBackground: SolidColorBrush;

  /**
   * Row 헤더 너비
  */
  RowHeaderWidth: number;

  /**
   * Row 높이
  */
  RowHeight: number;

  /**
   * Scroll의 offsetleft 값
  */
  ScrollLeft: number;

  /**
   * Scroll의 offsettop 값
  */
  ScrollTop: number;

  /**
   * 선택 규칙
  */
  SelectRule: enSelectRuleType;

  /**
   * 헤더 보기
   * @hidden
  */
  ShowHeader: enHeaderType;

  /**
   * Text 유형 내보내기 시 Column 구분자(eg. \\t)
  */
  TextExportColSeparator: string;

  /**
   * Text 유형 내보내기 시 Row 구분자(eg. \\n)
  */
  TextExportRowSeparator: string;

  /**
   * 컨트롤의 상단 영역 데이터 소스 키값
  */
  TopRowDataSource: string;

  /**
   * 분석항목설정 기능 사용 유무
  */
  UseAnalysisItemSetting: boolean;

  /**
   * CSV 내보내기 기능 사용 유무
  */
  UseCSVExport: boolean;

  /**
   * ClipBoard Copy&Paste 사용 가능 여부
  */
  UseClipboard: boolean;

  /**
   * 워드 내보내기 기능 사용 유무
  */
  UseDOCExport: boolean;

  /**
   * 디자인 기능 사용 유무
  */
  UseDesign: boolean;

  /**
   * 엑셀 내보내기 기능 사용 유무
  */
  UseExcelExport: boolean;

  /**
   * 내보내기 시 필터 및 정렬 사용
  */
  UseExportFilterOrOrderbyInfo: boolean;

  /**
   * 내보내기 시 서버 조회 사용
  */
  UseExportServerRetrieve: boolean;

  /**
   * 필터 초기화 기능 사용 유무
  */
  UseFilterInit: boolean;

  /**
   * 서식 설정 기능 사용 유무
  */
  UseFormatSetting: boolean;

  /**
   * HML 내보내기 기능 사용 유무
  */
  UseHMLExport: boolean;

  /**
   * 멀티 헤더 사용 유무
  */
  UseMultiHeader: boolean;

  /**
   * 멀티 헤더 설정 기능 사용 유무
  */
  UseMultiHeaderMenu: boolean;

  /**
   * PPT 내보내기 기능 사용 유무
  */
  UsePPTExport: boolean;

  /**
   * 텍스트 내보내기 기능 사용 유무
  */
  UseTextExport: boolean;

  /**
   * 행 번호 보여줄지 여부
  */
  ViewLineNumber: boolean;

  /** 
   * 컬럼을 추가합니다. 기존에 존재하는 필드명의 경우 추가하지 않고 기존 필드를 반환합니다.
   *
   * @example
   * ```js
   * Matrix.getObject('DataGrid').AddColumn('추가한 컬럼');
   * Matrix.getObject('DataGrid').Calculate();
   * ```
  * @param name 컬럼명
  * @param isNumber 데이터 타입이 수치형인지 여부
  */
  AddColumn(name: string, isNumber?: boolean): DataGridColumn;

  /** 
   * 특정 필드에 필터를 추가하는 메소드
   *
  * @param fieldName 필드 명
  * @param type 필터 타입(0 : Dimension, 1 : Measure)
  * @param operator 비교 연산자(Dimension : [In,NotIn,Between], Measure : [=,>,<,>=,<=,<>])
  * @param value 필터 조건 값
  * @param isAnd AND 인지 OR인지 유무(필터 타입이 Measure일 경우에만 사용. 기본값은 true)
  */
  AddFilter(fieldName: string, type: number, operator: string, value: any, isAnd: boolean): void;

  /** 
   * 특정 필드에  정렬 정보를 추가하는 메소드
   *
  * @param fieldName 필드 명
  * @param sortType 정렬 타입(1 : 내림차순, 2 : 오름차순)
  * @param isNotDraw 정렬 정보를 추가 한 후에 그리드를 다시 그릴지 유무. 기본값은 false이다.(true : 그리지 않음)
  */
  AddSort(fieldName: string, sortType: number, isNotDraw: boolean): void;

  /** 
   * 행을 추가하고 추가된 행 정보를 반환합니다.
   *
  * @param isNotDraw 행을 추가 한 후에 그리드를 다시 그릴지 유무. 기본값은 false이다.(true : 그리지 않음)
  */
  AppendRow(isNotDraw?: boolean): DataGridRow;

  /** 
   * 컨트롤의 데이터 정보를 계산해서 다시 그려준다.
   *
  */
  Calculate(): void;

  /** 
   * 특정 행의 상태를 바꿔주는 메소드
   *
  * @param row 행
  * @param updateState 바꿔줄 상태값('' : 일반, 'N' : 추가, 'U' : 수정, 'D' : 삭제)
  */
  ChangeRowState(row: DataGridRow, updateState: string): void;

  /** 
   * 특정 행의 상태를 바꿔주는 메소드
   *
  * @param index 행의 인덱스
  * @param updateState 바꿔줄 상태값('' : 일반, 'N' : 추가, 'U' : 수정, 'D' : 삭제)
  */
  ChangeRowStateAt(index: number, updateState: string): void;

  /** 
   * 전체 화면을 지운다.
   *
  */
  ClearCanvas(): void;

  /** 
   * 그리드의 데이터를 초기화 합니다.
   *
  */
  ClearData(): void;

  /** 
   * 그리드의 데이터셋을 초기화 합니다.
   *
  * @param isClearFields 필드 목록도 삭제할지 유무 True이면 필드 목록도 삭제한다.
  */
  ClearDataSet(isClearFields: boolean): void;

  /** 
   * 필드를 초기화한다.
   *
  */
  ClearFields(): void;

  /** 
   * 필터 모델 정보를 삭제해준다.(UI로 반영은 Calculate를 호출해줘야만 한다.)
   *
  * @param fieldNames 필터를 제거할 필드 모델 이름 목록 없으면 모든 필터 정보를 삭제해준다.
  */
  ClearFilters(fieldNames: string[]): void;

  /** 
   * 데이터의 레코드 수정 정보(신규/수정/삭제)를 모두 제거합니다.
   *
  */
  ClearRowState(): void;

  /** 
   * 모든 레코드를 삭제합니다.
   *
  */
  ClearRows(): void;

  /** 
   * 선택 영역을 초기화 해준다.
   *
  */
  ClearSelect(): void;

  /** 
   * 그리드의 모든 정렬 정보를 초기화 시켜주는 메소드(다시 그리지는 않는다.)
   *
  */
  ClearSort(): void;

  /** 
   * 멀티 헤더를 생성합니다.
   *
  * @param rowCount 행의 개수
  */
  CreateMultiHeaderLayout(rowCount: number): MultiHeader;

  /** 
   * 컬럼을 삭제합니다.
   *
   * @example
   * ```js
   * Matrix.getObject('DataGrid').DeleteColumn('추가한 컬럼');
   * Matrix.getObject('DataGrid').Calculate();
   * ```
  * @param name 삭제하려는 컬럼의 이름
  */
  DeleteColumn(name: string): void;

  /** 
   * 오직 헤더 영역만 그려준다.
   *
  */
  DrawOnlyHeader(): void;

  /** 
   * 수정된 내용을 컨트롤에 반영하고 컨트롤을 Update 합니다.
   *
  */
  EndUpdate(): void;

  /** 
   * 테이블의 데이터를 정렬 표현식에 의해 정렬합니다.
   *
  * @param sortExpression 정렬 표현식 : [FIELD_NAME1] ASC, [FIELD_NAME2] DESC
  */
  ExecuteSort(sortExpression: string): void;

  /** 
   * Export 서비스를 호출 합니다.
   *
  * @param exportType Export Type(Excel, PPT, CSV, Text)
  * @param callBack CallBack 함수
  * ```
  * 
  * function(p){
  * //   
  * //   p.FolderName = file path
  * //   p.FileName = file name
  * //   
  *   var newName = "MXGrid_" + Matrix.GetDateTime().ToString("yyyyMMddHHmmss") + ".xlsx";
  *   Matrix.DownloadFile(p.FolderName, p.FileName ,newName ,true);
  * }
  * ```
  */
  ExportServiceCall(exportType: enExportType, callBack: (p: {"FolderName":string,"FileName":string})=>void): void;

  /** 
   * 컨트롤이 포커스를 얻게 합니다.
   *
  */
  Focus(): void;

  /** 
   * 컬럼의 수를 반환합니다.
   *
  */
  GetColumnCount(): number;

  /** 
   * 특정 컬럼의 데이터테이블을 반환합니다.
   *
  * @param columnName 데이터소스가 바인딩된 컬럼명
  */
  GetColumnDataTable(columnName: string): DataTable;

  /** 
   * 현재 선택된 셀을 반환합니다.
   *
  */
  GetCurrentCell(): DataGridCell;

  /** 
   * 현재 선택된 셀의 행을 반환합니다.
   *
  */
  GetCurrentRow(): DataGridRow;

  /** 
   * 그리드의 데이터셋을 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /** 
   * 그리드의 데이터소스명을 반환합니다.
   *
  */
  GetDataSourceName(): string;

  /** 
   * 특정 영역의 데이터테이블을 반환합니다.
   *
  * @param datasourceType 1 : 중앙, 2 : 상단, 3 : 하단
  */
  GetDataTable(datasourceType: number): DataTable;

  /** 
   * DrillToDetail의 쿼리를 반환해주는 메소드
   *
  * @param callbackFunc 반환 받을 콜백 함수(매개 변수 목록 : 결과 코드[0:성공,1:실패], 쿼리, 에러 메세지)
  * ```
  * 
  *                         		function(resultCode, resultQuery, resultMessage){
  *                         			if(resultCode == 0){
  *                         				var sql = resultQuery;
  *                         			}
  * 
  *                         			else{
  *                         				Matrix.Error("Error", resultMessage);
  *                         			}
  *                         		} 
  * ```
  */
  GetDrillToDetailSQL(callbackFunc: (resultCode:number, resultQuery:string, resultMessage:string)=>void): void;

  /** 
   * 엑셀 Export를 위한 JSON 정보를 반환합니다.
   *
  * @param range 엑셀 시트의 표시 시작 위치(eg.A1)
  */
  GetExcelExportJSON(range: string): string;

  /** 
   * 특정 필드를 찾아준다.
   *
  * @param fieldInfo 필드명 또는 필드 위치
  */
  GetField(fieldInfo: string | number): DataGridColumn;

  /** 
   * 특정 필드의 인덱스를 반환합니다.
   *
  * @param field 필드 정보
  */
  GetFieldIndex(field: DataGridColumn): number;

  /** 
   * 그리드의 컬럼명 목록을 반환합니다.
   *
  */
  GetFieldNames(): string[];

  /** 
   * 필드의 목록을 반환해주는 메소드
   *
  */
  GetFields(): DataGridColumn[];

  /** 
   * 멀티헤더 객체를 반환합니다.
   *
  */
  GetMultiHeader(): MultiHeader;

  /** 
   * 멀티헤더 객체에 정의된 특정 위치의 셀을 반환합니다.
   *
  * @param RowIndex 찾으려는 셀의 Row 인덱스
  * @param ColumnIndex 찾으려는 셀의 Column 인덱스
  */
  GetMultiHeaderCell(RowIndex: number, ColumnIndex: number): MultiHeaderCell;

  /** 
   * 멀티헤더 객체에 정의된 컨트롤을 반환합니다.
   *
  * @param name 찾으려는 컨트롤 이름
  */
  GetMultiHeaderControl(name: string): Control;

  /** 
   * 멀티헤더 객체에 정의된 컨트롤 목록을 반환합니다.
   *
  */
  GetMultiHeaderControls(): Control[];

  /** 
   * 멀티헤더의 Layout을 JSON형태로 반환합니다.
   *
  */
  GetMultiHeaderLayout(): object;

  /** 
   * 레코드의 수를 반환합니다.
   *
  */
  GetRowCount(): number;

  /** 
   * 특정 행(레코드)의 인덱스를 반환합니다.
   *
  * @param row 데이터 레코드 정보
  */
  GetRowIndex(row: DataGridRow): number;

  /** 
   * 특정 위치 행의 상태값을 반환합니다.
   *
  * @param idx 레코드 인덱스
  */
  GetRowStatus(idx: number): string;

  /** 
   * 현재 선택된 행의 상태값을 반환합니다.
   *
  */
  GetRowStatus(): string;

  /** 
   * 현재 선택된 셀의 목록을 반환합니다.
   *
  */
  GetSelectedCells(): DataGridCell[];

  /** 
   * 현재 선택된 행의 목록을 반환해주는 메소드
   *
  */
  GetSelectedRows(): DataGridRow[];

  /** 
   * 전체 레코드(페이지를 사용하지 않을 경우 필터로 인하여 숨은 레코드까지 포함)의 수를 반환합니다.
   *
  */
  GetTotalRowCount(): number;

  /** 
   * 데이터의 수정 유무를 결과로 반환해주는 메소드
   *
  */
  IsModified(): boolean;

  /** 
   * 특정 필드의 위치를 이동합니다.
   *
  * @param key 필드명
  * @param areaIndex 이동할 위치
  */
  MoveField(key: string, areaIndex: number): boolean;

  /** 
   * 그리드를 다시 그려주는 메소드
(Update(): 스크롤바와 정렬을 유지하지 않음)
(ReDraw(): 스크롤바와 정렬을 유지)
   *
  */
  ReDraw(): void;

  /** 
   * 데이터를 다시 요청하는 메소드(OnExecuteStart 이벤트는 발생하지 않는다.)
   *
  */
  RefreshData(): void;

  /** 
   * 특정 레코드를 삭제합니다.
   *
  * @param row 레코드
  * @param isNotDraw 행을 추가 한 후에 그리드를 다시 그릴지 유무. 기본값은 false이다.(true : 그리지 않음)
  */
  RemoveRow(row: DataGridRow, isNotDraw: boolean): void;

  /** 
   * 특정 선택한 레코드를 삭제합니다.
   *
  */
  RemoveRow(): void;

  /** 
   * 특정 위치의 레코드를 삭제합니다.
   *
  * @param idx 레코드 위치
  * @param isNotDraw 행을 추가 한 후에 그리드를 다시 그릴지 유무. 기본값은 false이다.(true : 그리지 않음)
  */
  RemoveRowAt(idx: number, isNotDraw: boolean): void;

  /** 
   * 특정 셀을 선택하는 메소드
   *
  * @param idx 레코드 인덱스
  * @param fieldName 필드명
  */
  SelectCell(idx: number, fieldName: string): void;

  /** 
   * 특정 레코드를 선택하는 메소드
   *
  * @param idx 레코드 인덱스
  */
  SelectRow(idx: number): void;

  /** 
   * 특정 영역의 행을 선택하는 메소드(시작 행부터 끝까지 선택)
   *
  * @param startIndex 시작 행 인덱스
  */
  SelectRowRange(startIndex: number): void;

  /** 
   * 특정 영역의 행을 선택하는 메소드
   *
  * @param startIndex 시작 행 인덱스
  * @param endIndex 종료 행 인덱스
  */
  SelectRowRange(startIndex: number, endIndex: number): void;

  /** 
   * 컬럼별 최대 text의 길이에 맞게 너비를 맞춥니다.
   *
  * @param columns 컬럼 이름 목록(string 타입으로 입력하는 경우 컴마(,)를 분리자로 여러개 입력)
  * @param includeHeader 헤더 포함 여부
  */
  SetAutoFit(columns: string|string[], includeHeader: boolean): void;

  /** 
   * 특정 컬럼의 데이터테이블을 설정합니다.
   *
  * @param columnName 데이터소스가 바인딩된 컬럼명
  * @param table 입력할 데이터테이블 객체
  */
  SetColumnDataTable(columnName: string, table: DataTable): void;

  /** 
   * 컬럼의 계산 수식을 설정합니다.
   *
  * @param name 컬럼명
  * @param Formula 수식
  */
  SetColumnFormula(name: string, Formula: string): void;

  /** 
   * 그리드의 데이터셋을 설정합니다.
   *
  * @param dataSet 데이터소스
  */
  SetDataSet(dataSet: DataSet): void;

  /** 
   * 특정 데이터소스 명을 그리드의 데이터소스로 설정합니다.
   *
  * @param name 데이터소스 명
  */
  SetDataSourceName(name: string): void;

  /** 
   * 특정 데이터소스 명을 그리드의 하단 영역 데이터소스로 설정합니다.
   *
  * @param name 데이터소스 명
  */
  SetDataSourceNameBottom(name: string): void;

  /** 
   * 특정 데이터소스 명을 그리드의 상단 영역 데이터소스로 설정합니다.
   *
  * @param name 데이터소스 명
  */
  SetDataSourceNameTop(name: string): void;

  /** 
   * 특정 영역의 데이터테이블을 설정합니다.
   *
  * @param datasourceType 1 : 중앙, 2 : 상단, 3 : 하단
  * @param table 입력할 데이터테이블 객체
  */
  SetDataTable(datasourceType: number, table: DataTable): void;

  /** 
   * JSON형태의 Layout을 멀티헤더에 적용합니다.
   *
  * @param layout GetMultiHeaderLayout()에서 return한 모델(type  0:None, 1:Label, 2:TextBox, 21:NumberBox, 3:Checkbox, 4:Button, 5:ComboBox, 6:Daily, 61:DFromTo, 62:Month, 63:MFromTo, 7:Image, 
  */
  SetMultiHeaderLayout(layout: object): boolean;

  /** 
   * 그리드를 다시 그려주는 메소드
(Update(): 스크롤바와 정렬을 유지하지 않음)
(ReDraw(): 스크롤바와 정렬을 유지)
   *
  */
  Update(): void;

  /** 
   * 그리드를 CSV로 변환하여 서버에 저장합니다.
   *
  * @param callBack CallBack 함수
  */
  UploadCSV(callBack: Function): void;

  /** 
   * 데이터 수정의 정합성을 검사하고 결과를 반환합니다.
   *
  * @param ignoreRowState Row 상태 무시 여부
  * @param checkInputSetting 유효성 검사 체크 여부
   * @hidden
  */
  Validate(ignoreRowState?: boolean, checkInputSetting?: boolean): boolean;

  /** 
   * 수정된 데이터의 정합성을 검사하고 결과를 반환합니다.
   *
  * @param ignoreRowState Row 상태 무시 여부 (default: false)
  * @param checkInputSetting 유효성 검사 체크 여부 (default: true)

  */
  ValidateEx(ignoreRowState?: boolean, checkInputSetting?: boolean): boolean;

  /** 
   * 데이터테이블을 반환합니다.
   *
  */
  getDataTable(): DataTable;

  /** 
   * 현재 선택된 행의 필드의 값을 반환합니다.
   *
  * @param fieldInfo 필드명 또는 필드 위치
  */
  getRowValue(fieldInfo: string | number): object;

  /** 
   * 특정 위치행의 필드의 값을 반환합니다.
   *
  * @param idx 레코드 인덱스
  * @param fieldInfo 필드명 또는 필드 위치
  */
  getRowValue(idx: number, fieldInfo: string | number): object;

  /** 
   * 특정 필드에 Dimension 필터(Between)를 추가하는 메소드
   *
  * @param fieldName 필드 명
  * @param value1 첫번째 필터 조건 값
  * @param value2 두번째 필터 조건 값
  */
  setDimensionFilterBetWeen(fieldName: string, value1: string, value2: string): void;

  /** 
   * 특정 필드에 Dimension 필터(In)를 추가하는 메소드
   *
  * @param fieldName 필드 명
  * @param values 필터 조건 값 목록
  */
  setDimensionFilterIn(fieldName: string, values: string[]): void;

  /** 
   * 특정 필드에 Dimension 필터(NotIn)를 추가하는 메소드
   *
  * @param fieldName 필드 명
  * @param values 필터 조건 값 목록
  */
  setDimensionFilterNotIn(fieldName: string, values: string[]): void;

  /** 
   * 특정 필드에 Measure 필터 두개를 추가하는 메소드
   *
  * @param fieldName 필드 명
  * @param operator1 첫번째 비교 연산자(=,>,<,>=,<=,<>))
  * @param value1 첫번째 필터 조건 값
  * @param operator2 두번째 비교 연산자(=,>,<,>=,<=,<>). 두번째 조건을 사용하지 않을 경우에는 넣어주지 않아야 한다.
  * @param value2 두번째 필터 조건 값
  * @param isAnd AND 인지 FALSE인지 유무(필터 타입이 Measure일 경우에만 사용. 기본값은 true)
  */
  setMeasureFilter(fieldName: string, operator1: string, value1: string, operator2: string, value2: string, isAnd: boolean): void;

  /** 
   * 특정 필드에 Measure 필터 하나를 추가하는 메소드
   *
  * @param fieldName 필드 명
  * @param operator1 첫번째 비교 연산자(=,>,<,>=,<=,<>))
  * @param value1 첫번째 필터 조건 값
  */
  setMeasureFilter(fieldName: string, operator1: string, value1: string): void;

  /** 
   * 특정 위치행의 필드값을 변경합니다.
   *
  * @param rowIdx 레코드 인덱스
  * @param fieldName 필드명
  * @param value 값
  */
  setRowValue(rowIdx: number, fieldName: string, value: string | object): boolean;

  /** 
   * 현재 선택된 행의 필드값을 수정합니다.
   *
  * @param fieldName 필드명
  * @param value 값
  */
  setRowValue(fieldName: string, value: string | object): boolean;

  /**
   * @event 
   *
   * 그리드의 셀을 클릭할 떄 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellClick : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * cell selection 정보 유지 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 더블 클릭할 떄 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellDoubleClick : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 더블 터치할 떄 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellDoubleTouch : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀의 key 입력 시 발생합니다.
   *
   * @param args
   *
   * @example
   * ```js
   * Matrix.getObject('DataGrid').OnCellKeyDown = function(s,e){
   * 	//예시코드: enter일 때 grid 행 추가
   * 
   * 	//event keyCode를 확인합니다.
   * 	if(e.Event && e.Event.keyCode !== 13) return;
   * 
   * 	var grid = Matrix.getObject('DataGrid'); //Matrix.getObject(e.Id);
   * 
   * 	//행을 추가합니다.
   * 	grid.AppendRow(false);
   * }
   * ```
   * Target : Grid
  */
  OnCellKeyDown : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 발생한 KeyboardEvent 객체
    */
    Event: KeyboardEvent
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 셀이 Load될때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellLoaded : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 셀의 배경색을 변경하실 경우 이값을 넣어 줍니다.(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
    */
    BackColor: string
    /**
     * 셀의 텍스트 색상을 변경하실 경우 이값을 넣어 줍니다.(e.g., "rgba(255, 0, 0, 1)", "#FF0000")
    */
    FontColor: string
    /**
     * 셀의 텍스트를 Bold처리하여 표현할지 유무. true일 경우 Bold처리가 됩니다.
    */
    FontBold: boolean
    /**
     * 셀의 텍스트를 Italic처리하여 표현할지 유무. true일 경우 Italic처리가 됩니다.
    */
    FontItalic: boolean
    /**
     * 이 값을 true로 설정 하게되면 값을 그리지 않습니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀을 터치할 떄 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCellTouch : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드가 클릭되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnClick : (sender : Grid
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
   * 데이터 그리드의 레코드가 추가되는 시점에 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCreateNewRow : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 TRUE로 설정하면 Row 추가가 취소됩니다.
    */
    Cancel: boolean
    /**
     * 데이터 레코드 객체
    */
    Record: DataRow
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 셀이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnCurrentCellChanged : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
    /**
     * 이전 셀
    */
    OldCell: DataGridCell
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 행이 변경될 때 발생합니다/
   *
   * @param args
   *
   * Target : Grid
  */
  OnCurrentRowChanged : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 셀 데이타 정보
    */
    Record: object
    /**
     * 이 값을 true 설정하면 자동 선택 기능이 취소됩니다.
    */
    Handled: boolean
    /**
     * 이전 행 요소
    */
    OldRow: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnDataBindEnd : (sender : Grid
  , args : { 
    /**
     * 컨트롤이름
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
   * 그리드의 행이 키입력으로 인하여 삭제될때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnDeletingRow : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정하시면 셀의 데이터 수정이 취소됩니다.
    */
    Cancel: boolean
    /**
     * 행 객체
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * [Ctrl + V] 키를 이용해 클립보드에 데이터를 붙여넣기 종료 시 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnEndClipBoardPaste : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 셀 데이타 정보
    */
    Record: object
    /**
     * 수정되거나 추가된 레코드 목록을 반환합니다.
    */
    UpdatedRows: DataGridRow[]
    /**
     * 클립보드 텍스트 입니다.
    */
    ClipBoardText: string
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀의 값이 수정된 후 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnEndEdit : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정 하게되면 수정작업이 취소됩니다.
    */
    Cancel: boolean
    /**
     * 셀의 필드 정보
    */
    Field: DataGridColumn
    /**
     * 수정 되기 전 값
    */
    BeforeValue: object
    /**
     * 수정된 값
    */
    AfterValue: object
    /**
     * 행 객체
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 체크 박스를 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridCheckBoxClicked : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 체크 유무
    */
    Checked: boolean
    /**
     * 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
    */
    Cancel: boolean
    /**
     * 레코드 노드
    */
    Row: DataGridRow
    /**
     * 클릭한 셀의 데이터
    */
    Record: any
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 컬럼 헤더를 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridColumnHeaderClicked : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 필드
    */
    Field: DataGridColumn
    /**
     * 처리완료 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 컬럼 헤더를 더블 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridColumnHeaderDoubleClicked : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 필드
    */
    Field: DataGridColumn
    /**
     * 처리완료 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 ComboBox 값이 바뀔 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridComboBoxChanged : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 셀 데이타 정보
    */
    Record: object
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 변경된 값
    */
    ChangeValue: string
    /**
     * 이 값을 true로 설정하시면 셀의 데이터 수정이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 컨텍스트 메뉴가 열리기 전에 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridContextMenuOpening : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 컨텍스트 메뉴 객체
    */
    Menu: ContextMenu
    /**
     * 데이터 레코드 정보
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 컨텍스트 메뉴를 열지 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 엑셀 내보내기 전에 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridExportStart : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 다운로드 시 저장할 파일명
    */
    FileName: string
    /**
     * 글자 유형, 기본값 iStudioConfig.CanvasDefaultFont
    */
    DefaultFontName: string
    /**
     * 글자 크기, 기본값 11
    */
    DefaultFontSize: number
    /**
     * Excel로 내보내기 할 경우 상단 Row에 데이터를 추가할 수 있습니다.(string array 또는 {"Range":"A1","ColSpan":10,"Value":"■ 보고서 명 : ","Style":{"Border":"border:Thin,#000000;","Font":"font-color:#000000"}}형태로 지정)
    */
    ExportRows: object[]
    /**
     * DataGrid의 엑셀 위치 (default : A1)
    */
    ExportGridCell: string
    /**
     * 서버 조회 데이타 사용 여부
    */
    ExportServerData: boolean
    /**
     * 이 값을 true 로 설정 할 경우 내보내기가 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 필터가 변경된 시점에 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridFilterChanged : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 필드 정보
    */
    Field: DataGridColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 멀티헤더 셀이 로드될때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridMultiHeaderCellLoaded : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 멀티헤더셀 객체
    */
    HeaderCell: MultiHeaderCell
    /**
     * 내부 컨트롤
    */
    Control: Control
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 멀티 헤더 체크 박스를 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridMultiHeaderCheckBoxClicked : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 멀티헤더셀 객체
    */
    HeaderCell: MultiHeaderCell
    /**
     * 체크 유무
    */
    Checked: boolean
    /**
     * 이 값을 true로 설정 하게되면 클릭 처리가 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 멀티헤더 셀을 클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridMultiHeaderClicked : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 멀티헤더셀 객체
    */
    HeaderCell: MultiHeaderCell
    /**
     * 처리완료 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 멀티헤더 셀을 더블클릭하는 순간 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGridMultiHeaderDoubleClicked : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 멀티헤더셀 객체
    */
    HeaderCell: MultiHeaderCell
    /**
     * 처리완료 여부
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤에 Grouping 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnGroupDataBindEnd : (sender : Grid
  , args : { 
    /**
     * 컨트롤이름
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
   * 컨트롤에 마우스를 이동하는 동안 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnMouseMove : (sender : Grid
  , args : { 
    /**
     * 마우스 오버 중인 셀 정보.
셀이 없을 경우 undefined를 반환합니다.
    */
    Cell: DataGridCell
  }
  ) => void;


  /**
   * @event 
   *
   * 스크롤의 위치값이 변경되면 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnScroll : (sender : Grid
  , args : { 
    /**
     * offset left
    */
    ScrollLeft: number
    /**
     * offset top
    */
    ScrollTop: number
  }
  ) => void;


  /**
   * @event 
   *
   * [Ctrl + V] 키를 이용해 클립보드에 데이터를 붙여넣기 실행 시 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnStartClipBoardPaste : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 행 객체
    */
    Row: DataGridRow
    /**
     * 데이터셀 정보
    */
    Cell: DataGridCell
    /**
     * 셀 데이타 정보
    */
    Record: object
    /**
     * 클립보드 텍스트로, 작업을 취소하려면 이 값을 제거하십시오.
    */
    ClipBoardText: string
  }
  ) => void;


  /**
   * @event 
   *
   * 그리드의 셀이 수정모드로 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnStartEdit : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정하시면 셀의 데이터 수정이 취소됩니다.
    */
    Cancel: boolean
    /**
     * 셀의 필드 정보. 단, Paste(붙여넣기) 동작 시에는 셀의 필드 정보 중 Name 값만 반환됩니다.
    */
    Field: DataGridColumn
    /**
     * 셀의 값
    */
    Value: object
    /**
     * 행 객체
    */
    Row: DataGridRow
  }
  ) => void;


  /**
   * @event 
   *
   * 데이터 그리드의 셀의 값이 변경될 때 발생합니다.
   *
   * @param args
   *
   * Target : Grid
  */
  OnValidate : (sender : Grid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 이 값을 true로 설정 시 컨트롤 내부 Validate 동작은 취소되고 스크립트에서 정의한 내용만 반영됩니다.
    */
    Handled: boolean
    /**
     * Validate error메시지를 지정하실 수 있습니다.
    */
    Message: string
    /**
     * 필드 정보
    */
    Field: DataGridColumn
    /**
     * 행 객체
    */
    Row: DataGridRow
  }
  ) => void;


}
