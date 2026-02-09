import { Control } from "../../aud/control/Control";
import { MenuOption } from "../../aud/control/igrids/MenuOption";
import { IWorkBook } from "../../aud/control/igrids/IWorkBook";
import { enExportType } from "../../aud/enums/comm/enExportType";
import { IWorkSheet } from "../../aud/control/igrids/IWorkSheet";
import { ICell } from "../../aud/control/igrids/ICell";
import { iGridView } from "../../aud/control/igrids/iGridView";
import { Cell } from "../../aud/control/igrids/Cell";
import { DataTable } from "../../aud/data/DataTable";
import { Selection } from "../../aud/control/igrids/Selection";
import { XLS_UTIL } from "../../aud/control/igrids/XLS_UTIL";
import { WorkBook } from "../../aud/control/igrids/WorkBook";
import { IValValidator } from "../../aud/control/igrids/IValValidator";
import { ContextMenu } from "../../aud/control/ContextMenu";
/**
* 엑셀 변환 자료를 기반으로 서비스하는 MX-Grid 컨트롤입니다.
*/
export interface iGrid extends Control{

  /**
   * 활성화된 시트 이름을 가져오거나 설정합니다.
  */
  ActiveSheet: string;

  /**
   * 서버에서 쿼리 실행 후에 수행되는 스크립트를 가져오거나 설정합니다. (CRUD Calculate 동작에서도 수행됩니다.)
  */
  AfterScript: string;

  /**
   * 서버에서 쿼리 실행 전에 수행되는 스크립트를 가져오거나 설정합니다.
  */
  BeforeScript: string;

  /**
   * 엑셀 내보내기 시 시트 보호 옵션 적용 여부를 가져오거나 설정합니다.
  */
  EnableSheetProtection: boolean;

  /**
   * 엑셀의 시트 확대/축소 기능 적용 여부를 가져오거나 설정합니다.
  */
  EnableZoom: boolean;

  /**
   * 엑셀 내보내기 실행 시 숨겨진 셀을 제거할지 여부를 가져오거나 설정합니다.
  */
  IgnoreExportHiddenCells: boolean;

  /**
   * 메뉴 옵션을 가져옵니다.
  */
  MenuOption: MenuOption;

  /**
   * 스크롤의 offsetLeft 값을 가져오거나 설정합니다.
  */
  ScrollLeft: number;

  /**
   * 스크롤의 offsetTop 값을 가져오거나 설정합니다.
  */
  ScrollTop: number;

  /**
   * 원본 엑셀 모델의 코드를 가져옵니다.
  */
  TemplateCode: string;

  /**
   * 다중 시트 사용 여부를 가져오거나 설정합니다.
  */
  UseMultiSheet: boolean;

  /**
   * WorkBook 객체를 가져옵니다.
  */
  WorkBook: IWorkBook;

  /**
   * 그리드 모델이 변경된 경우 재계산을 수행합니다.
   *
  * @param isServer 서버에 계산 요청 여부 (옵션)
  */
  Calculate(isServer?: boolean): void;

  /**
   * 특정 시트로 이동합니다.
   *
  * @param sheetName 대상 시트 이름
  */
  ChangeSheet(sheetName: string): void;

  /**
   * 확장/축소 대상을 모두 축소합니다.
   *
  */
  CollapsedAll(): void;

  /**
   * 확장/축소 대상을 모두 확장합니다.
   *
  */
  ExpandAll(): void;

  /**
   * 내보내기 서비스를 호출합니다.
   *
  * @param exportType 내보내기 유형 (Excel, HTML, HML, DOC)
  * @param callBack 내보내기 완료 후 호출되는 콜백 함수 (인자: {FolderName, FileName})
  */
  ExportServiceCall(exportType: enExportType, callBack: (p: {"FolderName":string,"FileName":string})=>void): void;

  /**
   * 엑셀 내보내기를 위한 JSON 정보를 반환합니다.
   *
  * @param range 엑셀 시트의 표시 시작 위치 (예: A1)
  */
  GetExcelExportJSON(range: string): string;

  /**
   * 틀 고정 라인의 색상을 반환합니다.
   *
  */
  GetFreezeLineColor(): string;

  /**
   * 선택된 셀의 색상을 반환합니다.
   *
  */
  GetSelectedColor(): string;

  /**
   * 데이터의 수정 여부를 반환합니다.
   *
  */
  IsModified(): boolean;

  /**
   * 데이터를 다시 요청합니다. (서버 스크립트 수행)
   *
  */
  Refresh(): void;

  /**
   * 화면의 특정 위치(Left, Top)로 스크롤을 이동합니다.
   *
  * @param left Offset Left
  * @param top Offset Top
  * @param time 애니메이션 시간 간격
  */
  ScrollMove(left: number, top: number, time?: number): void;

  /**
   * 특정 셀의 위치로 이동합니다.
   *
  * @param row 행 인덱스
  * @param column 열 인덱스
  * @param time 애니메이션 시간
  * @param marginLeft 왼쪽 여백
  * @param marginTop 위쪽 여백
  */
  ScrollTo(row: number, column: number, time?: number, marginLeft?: number, marginTop?: number): void;

  /**
   * 틀 고정 라인의 색상을 설정합니다.
   *
  * @param value 색상 값 (rgba, rgb, hex)
  */
  SetFreezeLineColor(value: string): string;

  /**
   * 선택된 셀의 색상을 설정합니다.
   *
  * @param value 색상 값 (rgba, rgb, hex)
  */
  SetSelectedColor(value: string): string;

  /**
   * 특정 열들을 숨기거나 표시합니다.
   *
  * @param columns 엑셀의 열 인덱스 목록 (예: [1,2,3])
  * @param visible 표시 여부
  */
  ShowHideColumns(columns: number[], visible: boolean): void;

  /**
   * 특정 행들을 숨기거나 표시합니다.
   *
  * @param rows 엑셀의 행 인덱스 목록 (예: [1,2,3])
  * @param visible 표시 여부
  */
  ShowHideRows(rows: number[], visible: boolean): void;

  /**
   * 그리드를 다시 그립니다. 스크롤바를 유지하지 않습니다.
   *
  */
  Update(): void;

  /**
   * 데이터 수정의 정합성을 검사하고 결과를 반환합니다.
   *
  */
  Validate(): boolean;

  /**
   * 특정 셀의 데이터 정합성을 검사하고 결과를 반환합니다.
   *
  * @param ws 워크시트 모델
  * @param cell 셀
  */
  ValidateCell(ws: IWorkSheet, cell: ICell): boolean;

  /**
   * MX-Grid 뷰어 객체를 반환합니다.
   *
  */
  Viewer(): iGridView;

  /**
   * 특정 주소의 셀을 반환합니다.
   *
  * @param row 행 인덱스
  * @param column 열 인덱스
  */
  getCell(row: number, column: number): Cell;

  /**
   * _D_로 정의한 데이터 테이블을 반환합니다.
   *
  * @param name 데이터 테이블 이름
  */
  getDataTable(name: string): DataTable;

  /**
   * 엑셀 내보내기 방식을 반환합니다. (Default, AllSheets, AllSheetsWithoutAUDFunction)
   *
  */
  getExcelExportType(): string;

  /**
   * 특정 주소의 셀을 반환합니다.
   *
  * @param rangeName 주소 값 (예: A1)
  */
  getRange(rangeName: string): Cell;

  /**
   * MX-Grid의 선택기 객체를 반환합니다.
   *
  */
  getSelection(): Selection;

  /**
   * MX-Grid 유틸리티 객체를 반환합니다.
   *
  */
  getUtility(): XLS_UTIL;

  /**
   * MX-Grid의 엑셀 모델을 반환합니다.
   *
  */
  getWorkBook(): WorkBook;

  /**
   * 다중 시트 사용 시 전체 시트 목록을 반환합니다.
   *
  */
  getWorkSheetNames(): string[];

  /**
   * 편집 모드 활성화 여부를 설정합니다.
   *
  * @param editable 편집 가능 여부
  */
  setEditable(editable: boolean): void;

  /**
   * 엑셀 내보내기 방식을 설정합니다. (Default, AllSheets, AllSheetsWithoutAUDFunction)
   *
  * @param type 내보내기 방식 (Default, AllSheets, AllSheetsWithoutAUDFunction)
  */
  setExcelExportType(type: string): void;

  /**
   * @event
   *
   * MX-Grid의 활성화 시트가 변경된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnActivateSheetChanged : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 활성화된 시트
    */
    Sheet: IWorkSheet
  }
  ) => void;


  /**
   * @event
   *
   * CRUD 시 서버에서 계산된 결과가 처리된 이후에 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnCalculateEnd : (sender : iGrid
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
   * CRUD 시 서버로 요청 시작 시점에 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnCalculateStart : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * `true`로 설정 시 실행이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event
   *
   * 셀 데이터 수정이 시작될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnCellBeginEdit : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 대상 셀
    */
    Cell: Cell
    /**
     * 편집 취소 여부
    */
    Cancel: boolean
    /**
     * 텍스트 편집기의 너비를 여러 셀에 걸쳐 병합한 크기로 표현합니다. (병합 셀 개수 입력)
    */
    MergeColumn: number
    /**
     * 콤보 상자의 목록을 설정합니다.
    */
    LOVList: string[]
  }
  ) => void;


  /**
   * @event
   *
   * 셀을 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnCellClick : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 셀 정보
    */
    Cell: Cell
    /**
     * 셀 내 클릭 위치 X
    */
    X: number
    /**
     * 셀 내 클릭 위치 Y
    */
    Y: number
  }
  ) => void;


  /**
   * @event
   *
   * 셀을 더블 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnCellDoubleClick : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 셀 정보
    */
    Cell: Cell
    /**
     * 셀 내 클릭 위치 X
    */
    X: number
    /**
     * 셀 내 클릭 위치 Y
    */
    Y: number
  }
  ) => void;


  /**
   * @event
   *
   * 셀 데이터 수정이 완료될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnCellEndEdit : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 수정된 데이터 셀 목록
    */
    getCells(): Cell[]
    /**
     * 서버로 계산 실행 취소 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event
   *
   * CRUD 시 입력 유도 또는 오류 메시지를 표시하기 전 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnCellValidatorMessage : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 셀 객체
    */
    Cell: ICell
    /**
     * 유효성 검사 정보
    */
    Validator: IValValidator
    /**
     * 입력 메시지: 1, 오류 메시지: -9
    */
    Type: number
    /**
     * 제목 (변경 가능)
    */
    Title: string
    /**
     * 메시지 (변경 가능)
    */
    Message: string
    /**
     * 메시지 출력 취소 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event
   *
   * 컨트롤을 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnClick : (sender : iGrid
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
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnContextMenuOpening : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 셀
    */
    Cell: Cell
    /**
     * 컨텍스트 메뉴 객체
    */
    Menu: ContextMenu
    /**
     * 컨텍스트 메뉴 표시 취소 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnDataBindEnd : (sender : iGrid
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
   * 컨트롤이 서버로부터 데이터를 요청하기 전 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnExecuteStart : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * `true`로 설정 시 실행이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event
   *
   * MX-Grid 내에서 메시지를 출력할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnMessage : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 메시지 고유 아이디
    */
    Code: string
    /**
     * 메시지 내용
    */
    Message: string
    /**
     * 메시지 출력 유형 (Information=0, Error=1, Instance=2)
    */
    Type: number
    /**
     * `true`로 설정 시 내부에서 메시지 박스를 생성하지 않습니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event
   *
   * 스크롤 위치가 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnScroll : (sender : iGrid
  , args : {
    /**
     * Offset Left
    */
    ScrollLeft: number
    /**
     * Offset Top
    */
    ScrollTop: number
  }
  ) => void;


  /**
   * @event
   *
   * 셀 선택이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnSelectionChange : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터 셀 목록 정보
    */
    Cells: Cell[]
  }
  ) => void;


  /**
   * @event
   *
   * MX-Grid의 시트가 변경된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 MX-Grid 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link iGrid}
  */
  OnSheetChanged : (sender : iGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 시트 이름
    */
    SheetName: string
  }
  ) => void;


}
