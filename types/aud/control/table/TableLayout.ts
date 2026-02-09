import { Control } from "../../../aud/control/Control";
import { TableColumn } from "../../../aud/control/table/TableColumn";
import { TableCell } from "../../../aud/control/table/TableCell";
import { TableRow } from "../../../aud/control/table/TableRow";
import { TableLayoutModel } from "../../../aud/control/table/TableLayoutModel";
/**
* 특정 영역을 테이블 형태로 구성해주는 레이아웃 컨트롤
*/
export interface TableLayout extends Control{

  /**
   * 셀 내부 컨트롤 기본 마진 값
  */
  BasicMargin: string;

  /**
   * 열 목록
  */
  Cols: TableColumn[];

  /**
   * 복사한 셀 목록
  */
  CopiedItems: TableCell[];

  /**
   * 컨트롤의 데이터 소스 키값
  */
  InnerControlList: string;

  /**
   * 라인 두께
  */
  LineWidth: number;

  /**
   * 행 목록
  */
  Rows: TableRow[];

  /**
   * 선택된 셀 목록
  */
  SelectedItems: TableCell[];

  /**
   * 수평 스크롤바 보임 여부
  */
  ShowHorizontalScrollBar: boolean;

  /**
   * 수직 스크롤바 보임 여부
  */
  ShowVerticalScrollBar: boolean;

  /** 
   * 열을 추가하는 메소드
   *
  * @param name 추가되는 열의 이름
  */
  AddColumn(name: string): boolean;

  /** 
   * 행을 추가하는 메소드
   *
  */
  AddRow(): boolean;

  /** 
   * 전체 화면을 지운다.
   *
  */
  ClearCanvas(): void;

  /** 
   * 선택 영역을 초기화 해준다.
   *
  */
  ClearSelect(): void;

  /** 
   * 특정 열을 삭제하는 메소드
   *
  * @param index 삭제하려는 열의 인덱스 정보
  */
  DeleteColumn(index: number): boolean;

  /** 
   * 특정 행을 삭제하는 메소드
   *
  * @param index 삭제하려는 행의 인덱스 정보
  */
  DeleteRow(index: number): boolean;

  /** 
   * 특정 셀을 찾는다.
   *
  * @param rIndex 해당 찾으려는 셀의 행 인덱스 값
  * @param cIndex 해당 찾으려는 셀의 열 인덱스 값
  */
  GetCell(rIndex: number, cIndex: number): TableCell;

  /** 
   * 엑셀 Export를 위한 JSON 정보를 반환합니다.
   *
  * @param range 엑셀 시트의 표시 시작 위치(eg.A1)
  */
  GetExcelExportJSON(range: string): string;

  /** 
   * 특정 내부 컨트롤을 찾는다.
   *
  * @param name 해당 찾으려는 컨트롤의 이름
  */
  GetInnerControl(name: string): Control;

  /** 
   * 테이블 레이아웃 구성 정보를 화면으로 시각화 시켜주기 위해 JSON포맷(String)으로 모델을 반환해주는 메소드
   *
  */
  GetJSONModel(): string;

  /** 
   * 특정 위치에 열을 추가하는 메소드
   *
  * @param index 끼워 넣을 열의 인덱스 정보
  * @param name 추가되는 열의 이름
  */
  InsertColumn(index: number, name: string): boolean;

  /** 
   * 특정 위치에 행을 추가하는 메소드
   *
  * @param index 끼워 넣을 행의 인덱스 정보
  */
  InsertRow(index: number): boolean;

  /**
   * 테이블 레이아웃을 구성시켜주는 메소드
   *
  * @param columns 열 객체 배열. Name 속성은 필수로 정의 필요
  * @param model 구성하려는 테이블 모델 객체. MaxRow와 Children 속성을 포함
  */
  SetJSONModel(columns: TableColumn[], model: TableLayoutModel): void;

  /** 
   * 전체 영역을 다시 그려준다.
   *
  */
  Update(): void;

  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수직선을 드래그 완료할때 발생합니다.
   *
   * @param args
   *
   * Parameter Info
  */
  OnColumnLineDragEnd : (sender : TableLayout
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
    */
    Column: TableColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수직선을 드래그 시작할때 발생합니다.
   *
   * @param args
   *
   * Parameter Info
  */
  OnColumnLineDragStart : (sender : TableLayout
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
    */
    Column: TableColumn
    /**
     * 드래그를 시작하지 않을지 유무 True이면 드래그 동작이 발생하지 않는다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수직선위에 마우스가 올라갈 경우 발생합니다.
   *
   * @param args
   *
   * Parameter Info
  */
  OnColumnLineMouseOver : (sender : TableLayout
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 마우스가 올라간 라인의 셀의 행 정보
    */
    Row: TableRow
    /**
     * 마우스가 올라간 라인의 셀 정보
    */
    Cell: TableCell
    /**
     * 마우스가 올라간 라인의 셀의 열 정보
    */
    Column: TableColumn
    /**
     * 마우스가 올라간 라인의 인덱스
    */
    LineIndex: number
    /**
     * 마우스 오버 이벤트가 발생하지 않을지 설정 유무. True이면 마우스 오버 이벤트가 발생하지 않는다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수평선을 드래그 완료할때 발생합니다.
   *
   * @param args
   *
   * Parameter Info
  */
  OnRowLineDragEnd : (sender : TableLayout
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
    */
    Column: TableColumn
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수평선을 드래그 시작할때 발생합니다.
   *
   * @param args
   *
   * Parameter Info
  */
  OnRowLineDragStart : (sender : TableLayout
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 드래그 시작 지점 행 정보
    */
    Row: TableRow
    /**
     * 드래그 시작 지점 셀 정보
    */
    Cell: TableCell
    /**
     * 드래그 시작 지점 열 정보
    */
    Column: TableColumn
    /**
     * 드래그를 시작하지 않을지 유무 True이면 드래그 동작이 발생하지 않는다.
    */
    Handled: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 테이블레이아웃 내부의 수평선위에 마우스가 올라갈 경우 발생합니다.
   *
   * @param args
   *
   * Parameter Info
  */
  OnRowLineMouseOver : (sender : TableLayout
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 마우스가 올라간 라인의 셀의 행 정보
    */
    Row: TableRow
    /**
     * 마우스가 올라간 라인의 셀 정보
    */
    Cell: TableCell
    /**
     * 마우스가 올라간 라인의 셀의 열 정보
    */
    Column: TableColumn
    /**
     * 마우스가 올라간 라인의 인덱스
    */
    LineIndex: number
    /**
     * 마우스 오버 이벤트가 발생하지 않을지 설정 유무. True이면 마우스 오버 이벤트가 발생하지 않는다.
    */
    Handled: boolean
  }
  ) => void;


}
