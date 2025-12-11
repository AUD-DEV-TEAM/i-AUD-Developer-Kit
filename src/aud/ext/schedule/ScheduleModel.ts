import { DataSet } from "../../../aud/data/DataSet";
import { OptionData } from "../../../aud/ext/schedule/OptionData";
import { OptionStyle } from "../../../aud/ext/schedule/OptionStyle";
import { OptionView } from "../../../aud/ext/schedule/OptionView";
import { SelectionModel } from "../../../aud/ext/schedule/SelectionModel";
import { ScheduleCell } from "../../../aud/ext/schedule/ScheduleCell";
import { ScheduleField } from "../../../aud/ext/schedule/ScheduleField";
import { ScriptDateUtil } from "../../../aud/util/ScriptDateUtil";
import { DataRow } from "../../../aud/data/DataRow";
import { ScheduleRow } from "../../../aud/ext/schedule/ScheduleRow";
import { ContextMenu } from "../../../aud/control/ContextMenu";
/**
* grid model object
*/
export interface ScheduleModel{

  /**
   * 데이타소스
  */
  DataSet: DataSet;

  /**
   * Data Options
  */
  OptionData: OptionData;

  /**
   * Style Options
  */
  OptionStyle: OptionStyle;

  /**
   * View Options
  */
  OptionView: OptionView;

  /**
   * 선택한 셀들
  */
  Selection: SelectionModel;

  /** 
   * 셀을 제거합니다.
   *
  * @param Cell target cell
  */
  DeleteCell(Cell: ScheduleCell): void;

  /** 
   * 조건에 만족하는 셀을 찾는다.
   *
  * @param fieldName 탐색할 필드명
  * @param value 검색 값
  */
  FindCell(fieldName: string, value: string): ScheduleCell;

  /** 
   * 두 입력값 간의 minior unit의 차
   *
  * @param fromDate 시작 일자
  * @param toDate 종료 일자
  */
  GetDistanceCount(fromDate: string, toDate: string): boolean;

  /** 
   * 특정 필드 객체를 반환 합니다.
   *
  * @param name 필드명
  */
  GetField(name: string): ScheduleField;

  /** 
   * 입력 시간이 이동 또는 삭제 가능한 기간 인지 확인 합니다.
   *
  * @param SelectedDate 선택 일자
  */
  IsAvaliablePeriod(SelectedDate: ScriptDateUtil): boolean;

  /** 
   * 선택한 셀들을 병합합니다.
   *
  * @param Cells 선택한 셀들
  */
  MergeCell(Cells: ScheduleCell[]): void;

  /** 
   * 특정 셀로 스크롤을 이동한다.
   *
  * @param cell 셀
  */
  MoveToCell(cell: ScheduleCell): void;

  /** 
   * 셀을 2등분으로 분할 합니다.
   *
  * @param Cell target cell
  * @param Position 분할할 위치
  */
  SplitCell(Cell: ScheduleCell, Position: number): ScheduleCell[];

  /** 
   * 카테고리 항목을 갱신합니다.
   *
  */
  UpdateCategory(): void;

  /** 
   * 레코드 기준으로 셀을 다시 계산한다.(위치 자동 이동 및 사이즈 재계산)
   *
  * @param record 레코드
  */
  UpdateCellByRecord(record: DataRow): boolean;

  /** 
   * 필드 목록을 반환 합니다.
   *
  */
  getFields(): ScheduleField[];

  /**
   * @event 
   *
   * Context Menu Create
   *
   * @param args
   *
   * Parameter Info
  */
  OnContextMenuOpenning : (sender : ScheduleModel
  , args : { 
    /**
     * schedule main model
    */
    Model: ScheduleModel
    /**
     * target cell
    */
    Cell: ScheduleCell
    /**
     * 선택 열 정보
    */
    SelectedRow: ScheduleRow
    /**
     * 선택 일자
    */
    SelectedDate: ScriptDateUtil
    /**
     * MenuObject
    */
    Menu: ContextMenu
  }
  ) => void;


  /**
   * @event 
   *
   * Cell Double Click event
   *
   * @param args
   *
   * Parameter Info
  */
  OnScheduleCellDoubleClick : (sender : ScheduleModel
  , args : { 
    /**
     * target cell
    */
    Cell: ScheduleCell
  }
  ) => void;


  /**
   * @event 
   *
   * 스케쥴 이동 및 기간 조정 후 이벤트 발생
   *
   * @param args
   *
   * Parameter Info
  */
  OnScheduleUpdated : (sender : ScheduleModel
  , args : { 
    /**
     * target cell
    */
    Cell: ScheduleCell
  }
  ) => void;


}
