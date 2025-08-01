import { ContextMenu } from "../../../aud/control/ContextMenu";
import { ScheduleModel } from "../../../aud/ext/schedule/ScheduleModel";
import { ScheduleView } from "../../../aud/ext/schedule/ScheduleView";
import { PDFError } from "../../../aud/ext/schedule/PDFError";
import { DataSet } from "../../../aud/data/DataSet";
import { ScheduleCell } from "../../../aud/ext/schedule/ScheduleCell";
import { ContextWrapper } from "../../../aud/html/canvas/ContextWrapper";
import { ScheduleRow } from "../../../aud/ext/schedule/ScheduleRow";
import { enDragType } from "../../../aud/enums/schedule/enDragType";
import { enKeyCodeType } from "../../../aud/enums/comm/enKeyCodeType";
/**
* Waterfall Chart
*/
export interface ScheduleGrid{

  /**
   * 컨텍스트 메뉴
  */
  ContextMenu: ContextMenu;

  /**
   * 화면 상/하 분리 기능 활성화 여부
  */
  EnableVerticalSpliter: boolean;

  /**
   * Model
  */
  Model: ScheduleModel;

  /**
   * 셀 리사이징 가능 여부
  */
  Resizable: boolean;

  /**
   * View
  */
  View: ScheduleView;

  /** 
   * 전체 데이터를 재 계산 합니다.(화면을 갱신하기 위해서는 Update를 함께 호출 하십시오)
   *
  * @param resetOffset 현재 화면 Left,Top offset값 초기화 여부
  */
  Calculate(resetOffset: boolean): void;

  /** 
   * 현재 내용을 PDF로 Export 합니다.
   *
  * @param fileName 내보내기 파일명
  * @param leftPadding 왼쪽 여백
  * @param topPadding 위쪽 여백
  * @param compressYN 압축 여부(웹브라우저에서 이미지 깨질 가능성 있음)
  */
  ExportPDF(fileName: string, leftPadding: number, topPadding: number, compressYN: boolean): PDFError;

  /** 
   * 차트의 전체 높이를 반환해주는 메소드
   *
  */
  GetTotalHeight(): number;

  /** 
   * 차트의 전체 너비를 반환해주는 메소드
   *
  */
  GetTotalWidth(): number;

  /** 
   * 데이터의 수정 유무를 결과로 반환해주는 메소드
   *
  */
  IsModified(): boolean;

  /** 
   * 컨트롤에 데이터셋 객체를 바인딩 합니다.
   *
  * @param ds 데이터셋 객체
  * @param updateLayout 컬럼 헤더 layout 유지 유무
  */
  SetDataSet(ds: DataSet, updateLayout: boolean): void;

  /** 
   * 화면 상/하 분리하고 상단의 높이를 설정합니다.
   *
  * @param topHeight 상단 높이
  */
  SetSplitVirticalTop(topHeight: number): void;

  /** 
   * 현재 행렬 축을 바꾸는 메소드
   *
  */
  Transpose(): void;

  /** 
   * 계산된 모델을 기준으로 화면을 갱신합니다.
   *
  */
  Update(): void;

  /**
   * @event 
   *
   * 드래깅 중인 셀들을 종료 후 Drawing 후 호출합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnBindEndDrag : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 대상 일자
    */
    TargetDate: Date[]
  }
  ) => void;


  /**
   * @event 
   *
   * 셀 drawing시 발생합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnDrawCell : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 Drawing한 셀
    */
    Cell: ScheduleCell
    /**
     * HTML5 Canvas 객체
    */
    Context: ContextWrapper
  }
  ) => void;


  /**
   * @event 
   *
   * 필드 헤더셀 drawing시 발생합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnDrawFieldHeader : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 필드헤더셀 정보
    */
    Row: ScheduleRow
    /**
     * 배경색 (ex #FF0000)
    */
    BackColor: string
    /**
     * 글자색 (ex #FF0000)
    */
    FontColor: string
  }
  ) => void;


  /**
   * @event 
   *
   * 셀 drawing시 발생합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnDrawSubtotalCell : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 Drawing한 셀
    */
    Cell: ScheduleCell
    /**
     * 현재 Drawing한 Row
    */
    Row: ScheduleRow
    /**
     * GrandTotal Row일 경우 row index
    */
    GrandTotalRowIndex: number
  }
  ) => void;


  /**
   * @event 
   *
   * 간트 차트 셀 paste 완료 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnEndClipBoardPaste : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택한 셀
    */
    Cells: Array<any>
  }
  ) => void;


  /**
   * @event 
   *
   * 드래깅 중인 셀들을 종료합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnEndDrag : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 선택한 셀들
    */
    SelectedCells: ScheduleCell[]
    /**
     * 대상 Row
    */
    TargetRow: ScheduleRow[]
    /**
     * 대상 시작일자
    */
    TargetStartDate: Date[]
    /**
     * 대상 종료일자
    */
    TargetEndDate: Date[]
    /**
     * Drag 유형
    */
    DragType: enDragType
    /**
     * 이 값을 true로 설정 시 실행이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * 셀을 선택 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnGanttChartCellClick : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터셀 정보
    */
    Cell: ScheduleCell
    /**
     * 이 값을 true로 설정 시 실행이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


  /**
   * @event 
   *
   * Chart의 셀을 더블 클릭할 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnGanttChartCellDoubleClick : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터셀 정보
    */
    Cell: ScheduleCell
  }
  ) => void;


  /**
   * @event 
   *
   * 간트 차트 keydown시 발생합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnGanttChartKeyDown : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * window 이벤트 keyCode
    */
    KeyCode: enKeyCodeType
    /**
     * control key down 여부
    */
    CtrlKey: boolean
    /**
     * keyDown 처리할지 말지 여부(true: copy paste 등 처리)
    */
    Handle: boolean
    /**
     * Paste 시 스케줄 record
    */
    TargetRow: ScheduleRow[]
    /**
     * Paste 시 target 일자 시간
    */
    TargetDate: Date[]
    /**
     * 선택한 셀
    */
    Cells: Array<any>
  }
  ) => void;


  /**
   * @event 
   *
   * 셀 리사이징이나 이동 시 발생합니다.
   *
   * @param args
   *
   * Target : {@link ScheduleGrid}
  */
  OnStartDrag : (sender : ScheduleGrid
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 현재 선택한 셀들
    */
    SelectedCells: ScheduleCell[]
    /**
     * 대상 일자
    */
    TargetDate: Date[]
    /**
     * Drag 유형
    */
    DragType: enDragType
    /**
     * 이 값을 true로 설정 시 실행이 취소됩니다.
    */
    Cancel: boolean
  }
  ) => void;


}
