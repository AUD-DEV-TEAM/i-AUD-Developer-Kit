import { enCellMoveMode } from "../../../aud/enums/schedule/enCellMoveMode";
import { LineSchedule } from "../../../aud/ext/schedule/LineSchedule";
import { enTransposeType } from "../../../aud/enums/schedule/enTransposeType";
import { TimeUnit } from "../../../aud/ext/schedule/TimeUnit";
import { enTimeUnit } from "../../../aud/enums/schedule/enTimeUnit";
/**
* 데이터 옵션
*/
export interface OptionData{

  /**
   * 카테고리 값을 가진 필드명(해당 필드의 값이 NULL이거나 빈값이면 일반 셀로 취급)
  */
  CategoryFieldName: string;

  /**
   * 셀 겹치는 방식(0: 새row에 추가, 1:뒤의 셀 밀기, 2: 동작안함)
  */
  CellMoveMode: enCellMoveMode;

  /**
   * 스케쥴 항목의 색상 값을 가지는 필드명
  */
  ColorFieldName: string;

  /**
   * 데이터의 일자 입력 포멧(eg.yyyy-MM-dd HH:mm:ss)
  */
  DateTimeFormat: string;

  /**
   * 소요 기간 필드명
  */
  DurationFieldName: string;

  /**
   * 필터 기능 활성화 여부
  */
  EnableFilter: boolean;

  /**
   * 재료 소진 일자 필드명
  */
  ExhaustionDateField: string;

  /**
   * 스케쥴 항목의 기간 시작 필드명
  */
  FromFieldName: string;

  /**
   * 재료 소진 종료 색상 필드명
  */
  GraditionEndColorFieldName: string;

  /**
   * 재료 소진 시작 색상 필드명
  */
  GraditionStartColorFieldName: string;

  /**
   * 셀 선택 시 같이 선택할 필드명
  */
  GroupFieldName: string;

  /**
   * 헤더 영역 필드명 (,로 분리하여 입력)
  */
  HeaderFieldNames: string;

  /**
   * 화면에 표시하지 않는 기간 관리
  */
  HiddenRange: LineSchedule;

  /**
   * 대기열 필드명
  */
  JobQueueLabel: string;

  /**
   * 스케쥴 항목의 라벨 표시 필드
  */
  LabelFieldName: string;

  /**
   * 라인(설비) 유휴 기간 관리
  */
  LineSchedule: LineSchedule;

  /**
   * 셀 이동 잠금(시작일) 값이 Y 인 경우 잠김
  */
  LockFromFieldName: string;

  /**
   * 셀 이동 잠금(종료일) 값이 Y 인 경우 잠김
  */
  LockToFieldName: string;

  /**
   * 이동 가능한 열을 구분하기 위한 키값(동일한 값만 이동 가능)
  */
  MoveAbleKeyFieldName: string;

  /**
   * 시작 일자, 시간 또는 종료 일자, 시간의 근사값 구하는 방식(0: 버림, 1: 반올림, 2: 올림)
  */
  RoundType: number;

  /**
   * 스케쥴 항목의 기간 종료 필드명
  */
  ToFieldName: string;

  /**
   * 스케쥴 항목의 ToolTip 표시 필드
  */
  ToolTipFieldName: string;

  /**
   * 행렬 축 변경(default: Right)
  */
  TransposeType: enTransposeType;

  /**
   * 대기열 사용 여부
  */
  UseJobQueue: boolean;

  /**
   * SubTotalRow 사용 여부
  */
  UseSubTotalRow: boolean;

  /** 
   * 총계행을 추가합니다.
   *
  * @param option 소계행 옵션
  */
  AddGrandTotalRow(option: object): void;

  /** 
   * 특수 일정 기간을 등록합니다.
   *
  * @param fromdate 시작일
  * @param todate 종료일
  * @param color 색상값
  */
  AddSpecialDay(fromdate: string, todate: string, color: string): boolean;

  /** 
   * 해당일이 이동 가능한 일자인지 체크합니다.
   *
  * @param moveToDate 일자
  */
  CheckAvaliablePeriod(moveToDate: string): void;

  /** 
   * GrandTotalRow를 초기화합니다.
   *
  */
  ClearGrandTotalRow(): boolean;

  /** 
   * 특수 일정 목록을 제거합니다.
   *
  */
  ClearSpecialDays(): void;

  /** 
   * 일정이 조정 가능한 범위를 지정 합니다.(설정된 범위 외에는 이동할 수 없습니다.)
   *
  * @param fromdate 시작일
  * @param todate 종료일
  */
  SetAvaliablePeriod(fromdate: string, todate: string): void;

  /** 
   * 화면에 표시할 데이터 기간을 설정 합니다.
   *
  * @param fromdate 시작일
  * @param todate 종료일
  */
  SetDisplayPeriod(fromdate: string, todate: string): void;

  /** 
   * 시간 관리 주 눈금 단위를 설정 합니다.
   *
  * @param unit unit
  * @param interval 간격
  * @param format 표현 양식
  * @param index 멀티헤더 위치
  */
  SetMajorUnit(unit: enTimeUnit, interval: number, format: string, index: number): TimeUnit;

  /** 
   * 시간 관리 보조 눈금 단위를 설정 합니다.
   *
  * @param unit unit
  * @param interval 간격
  * @param format 표현 양식
  */
  SetMinorUnit(unit: enTimeUnit, interval: number, format: string): void;

}
