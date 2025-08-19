import { Control } from "../../aud/control/Control";
import { MenuOption } from "../../aud/control/igrids/MenuOption";
import { IWorkBook } from "../../aud/control/igrids/IWorkBook";
import { enExportType } from "../../aud/enums/comm/enExportType";
import { iGridView } from "../../aud/control/igrids/iGridView";
import { Cell } from "../../aud/control/igrids/Cell";
import { DataTable } from "../../aud/data/DataTable";
import { Selection } from "../../aud/control/igrids/Selection";
import { XLS_UTIL } from "../../aud/control/igrids/XLS_UTIL";
import { WorkBook } from "../../aud/control/igrids/WorkBook";
import { ICell } from "../../aud/control/igrids/ICell";
import { IValValidator } from "../../aud/control/igrids/IValValidator";
import { ContextMenu } from "../../aud/control/ContextMenu";
/**
* Excel 변환 자료를 기반으로 서비스하는 그리드
*/
export interface iGrid extends Control{

  /**
   * ActiveSheet Name
  */
  ActiveSheet: string;

  /**
   * 서버에서 쿼리 실행 후에 수행되는 스크립트
(CRUD  Calculate 동작에서도 수행됩니다.)

  */
  AfterScript: string;

  /**
   *  서버에서 쿼리 실행 전에 수행되는 스크립트
  */
  BeforeScript: string;

  /**
   * 엑셀 내보내기 시 시트보호 옵션을 적용할지 여부
  */
  EnableSheetProtection: boolean;

  /**
   * MX-Grid에 표현된 데이터 기준으로 엑셀 내보내기 실행 시 숨겨진 셀을 제거할지 여부를 설정합니다.
  */
  IgnoreExportHiddenCells: boolean;

  /**
   * 메뉴 옵션
  */
  MenuOption: MenuOption;

  /**
   * Scroll의 offsetleft 값
  */
  ScrollLeft: number;

  /**
   * Scroll의 offsettop 값
  */
  ScrollTop: number;

  /**
   *  원본 엑셀 모델의 코드
  */
  TemplateCode: string;

  /**
   * Multi Worksheet support
  */
  UseMultiSheet: boolean;

  /**
   * WorkBook
  */
  WorkBook: IWorkBook;

  /** 
   * 그리드 모델이 변경된 경우 재 계산을 수행 합니다.
   *
  * @param isServer 서버에 계산 요청을 합니다.(옵션)
  */
  Calculate(isServer?: boolean): void;

  /** 
   * 특정 시트로 이동합니다.
   *
  * @param sheetName target worksheet name
  */
  ChangeSheet(sheetName: string): void;

  /** 
   * 확장/축소 대상 모두 축소하기
   *
  */
  CollapsedAll(): void;

  /** 
   * 확장/축소 대상 모두 확장하기
   *
  */
  ExpandAll(): void;

  /** 
   * Export 서비스를 호출 합니다.
   *
  * @param exportType Export Type(Excel, HTML, HML, DOC)
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
   * 엑셀 Export를 위한 JSON 정보를 반환합니다.
   *
  * @param range 엑셀 시트의 표시 시작 위치(eg.A1)
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
   * 데이터의 수정 유무를 결과로 반환해주는 메소드
   *
  */
  IsModified(): boolean;

  /** 
   * 데이터를 다시 요청하는 메소드(서버 스크립트 수행)
   *
  */
  Refresh(): void;

  /** 
   * 화면의 특정 위치(Left, Top)로 스크롤을 이동합니다.
   *
  * @param left Offset Left
  * @param top Offset Top
  * @param time animation time interval
  */
  ScrollMove(left: number, top: number, time?: number): void;

  /** 
   * 특정 셀의 위치로 이동합니다.
   *
  * @param row row index
  * @param column column index
  * @param time animation duration
  */
  ScrollTo(row: number, column: number, time: number): void;

  /** 
   * 틀 고정 라인의 색상을 설정합니다.
   *
  * @param value 색상 값(rgba, rgb, hex)
  */
  SetFreezeLineColor(value: string): string;

  /** 
   * 선택된 셀의 색상을 설정합니다.
   *
  * @param value 색상 값(rgba, rgb, hex)
  */
  SetSelectedColor(value: string): string;

  /** 
   * 특정 열들을 숨기거나 표시 합니다.
   *
  * @param columns excel의 Column 인덱스 목록 (e.g., [1,2,3])
  * @param visible 표시 여부
  */
  ShowHideColumns(columns: number[], visible: boolean): void;

  /** 
   * 특정 행들을 숨기거나 표시 합니다.
   *
  * @param rows excel의 Row 인덱스 목록 (e.g., [1,2,3])
  * @param visible 표시 여부
  */
  ShowHideRows(rows: number[], visible: boolean): void;

  /** 
   * 그리드를 다시 그려주는 메소드(스크롤바 유지하지 않음)
   *
  */
  Update(): void;

  /** 
   * 데이터 수정의 정합성을 검사하고 결과를 반환합니다.
   *
  */
  Validate(): boolean;

  /** 
   * MX-GRID 뷰어 객체
   *
  */
  Viewer(): iGridView;

  /** 
   * 특정 주소값의 셀을 반환 합니다.
   *
  * @param row Row Index
  * @param column Column Index
  */
  getCell(row: number, column: number): Cell;

  /** 
   * _D_로 정의한 데이터 테이블을 반환합니다.
   *
  * @param name 데이터 테이블 이름
  */
  getDataTable(name: string): DataTable;

  /** 
   * 엑셀 내보내기 방식을 설정 반환합니다. (Default, AllSheets)
   *
  */
  getExcelExportType(): string;

  /** 
   * 특정 주소값의 셀을 반환 합니다.
   *
  * @param rangeName 주소값(eg.A1)
  */
  getRange(rangeName: string): Cell;

  /** 
   * MX-GRID의 선택기 객체를 반환 합니다.
   *
  */
  getSelection(): Selection;

  /** 
   * MX-GRID 유틸리티 객체를 반환 합니다.
   *
  */
  getUtility(): XLS_UTIL;

  /** 
   * MX-GRID의 엑셀 모델을 반환 합니다.
   *
  */
  getWorkBook(): WorkBook;

  /** 
   * 다중 시트 사용 시 전체 시트 목록을 반환 합니다.
   *
  */
  getWorkSheetNames(): string[];

  /** 
   * 편집 모드 활성화 여부 설정하기
   *
  * @param editable editable
  */
  setEditable(editable: boolean): void;

  /** 
   * 엑셀 내보내기 방식을 설정 합니다. (Default, AllSheets)
   *
  * @param type 내보내기 방식(Default, AllSheets)
  */
  setExcelExportType(type: string): void;

  /**
   * @event 
   *
   * CRUD 시 서버에서 계산된 결과가 처리된 이후에 발생합니다.
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OnCalculateEnd : (sender : iGrid
  , args : { 
    /**
     * Control Name
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * CRUD 시 서버로 요청 시작 시점에 발생합니다.
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OnCalculateStart : (sender : iGrid
  , args : { 
    /**
     * Control Name
    */
    Id: string
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid 셀 데이터 수정 시작 이벤트
   *
   * @param args
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
     * 텍스트 편집기의 너비를 여러 셀에 걸처 병합한 사이즈로 표현합니다.(병합 셀 갯수 입력)
    */
    MergeColumn: number
    /**
     * 콤보 상자의 목록을 설정 합니다.
    */
    LOVList: string[]
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid Cell Click 이벤트
   *
   * @param args
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
   * MX-Grid Cell Double Click 이벤트
   *
   * @param args
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
   * MX-Grid 셀 데이터 수정 완료 이벤트
   *
   * @param args
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
   * CRUD 시 입력 유도 또는 오류 메시지를 표현하기 전 발생합니다.
   *
   * @param args
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
     * 입력 메시지 : 1, 오류 메시지 : -9
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
     * 메시지 출력을 취소할 지 여부
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 컨트롤 클릭 시 발생합니다.
   *
   * @param args
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
   * @param args
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
   * @param args
   *
   * Target : {@link iGrid}
  */
  OnDataBindEnd : (sender : iGrid
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
   * 컨트롤이 서버로 부터 데이터를 요청하기 전 발생합니다.
   *
   * @param args
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
     * true로 설정 시 실행이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * MX-Grid내에서 메시지를 출력할 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OnMessage : (sender : iGrid
  , args : { 
    /**
     * MX-Grid 이름
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
     * 메시지 출력 유형  (Infomation=0 ,Error=1,Instance=2)
    */
    Type: number
    /**
     * true로 설정 시 내부에서 메시지 박스를 생성하지 않습니다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 스크롤의 위치값이 변경되면 발생합니다.
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OnScroll : (sender : iGrid
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
   * MX-Grid Selection Change 이벤트
   *
   * @param args
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
   *  MX-Grid의 시트가 변경된 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link iGrid}
  */
  OnSheetChanged : (sender : iGrid
  , args : { 
    /**
     * 컨트롤 아이디
    */
    Id: string
    /**
     * 시트명
    */
    SheetName: string
  }
  ) => void;


}
