import { Rect } from "../../../aud/drawing/Rect";
import { DataRow } from "../../../aud/data/DataRow";
import { ScriptDateUtil } from "../../../aud/util/ScriptDateUtil";
import { ScheduleModel } from "../../../aud/ext/schedule/ScheduleModel";
import { ScheduleRow } from "../../../aud/ext/schedule/ScheduleRow";
/**
* 스케쥴 셀 아이템
*/
export interface ScheduleCell{

  /**
   * 배경색
  */
  BackColor: string;

  /**
   * 셀 위치
  */
  Bound: Rect;

  /**
   * 데이터 레코드
  */
  DataRow: DataRow;

  /**
   * 글자정렬
  */
  FontAlign: string;

  /**
   * 폰트굵기
  */
  FontBold: string;

  /**
   * 폰트색상
  */
  FontColor: string;

  /**
   * 폰트
  */
  FontFamily: string;

  /**
   * 폰트크기
  */
  FontSize: number;

  /**
   * 시작일자
  */
  FromDate: Date;

  /**
   * 시작일자
  */
  FromDateTime: ScriptDateUtil;

  /**
   * 선 색
  */
  LineColor: string;

  /**
   * 스케쥴 메인 모델
  */
  Model: ScheduleModel;

  /**
   * 열 객체
  */
  ParentNode: ScheduleRow;

  /**
   * Drop할 대상 Row
  */
  TargetRow: ScheduleRow;

  /**
   * 시작일자
  */
  ToDate: Date;

  /**
   * 종료일자
  */
  ToDateTime: ScriptDateUtil;

  /** 
   * 셀을 제거합니다.
   *
  */
  Delete(): void;

  /** 
   * 현재 셀의 기간이 이동 또는 삭제 가능한 기간 인지 확인 합니다.
   *
  */
  IsAvaliablePeriod(): boolean;

  /** 
   * 스케쥴을 이동합니다.
   *
  * @param row 대상 열
  * @param time 이동 시간
  */
  MoveTo(row: ScheduleRow, time: ScriptDateUtil): void;

  /** 
   * 셀을 2등분으로 분할 합니다.
   *
  */
  Split(): void;

}
