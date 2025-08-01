import { Control } from "../../aud/control/Control";
import { DataSet } from "../../aud/data/DataSet";
/**
* Highchart에서 제공하는 유형의 차트을 표현할 수 있습니다.
*/
export interface HighChart_C extends Control{

  /**
   * Stock Chart 버튼 영역 타이틀 텍스트
  */
  RangeSelectorButtonsTitle: string;

  /**
   * Stock Chart 날짜 입력 영역 From 에 해당하는 타이틀 텍스트
  */
  RangeSelectorFromText: string;

  /**
   * Stock Chart 날짜 입력 영역 To 에 해당하는 타이틀 텍스트
  */
  RangeSelectorToText: string;

  /**
   * Stock Chart 사용 여부
  */
  UseStockChart: boolean;

  /**
   * Stock Chart 옵션 사용 여부
  */
  UseStockChartOption: boolean;

  /** 
   * 차트에 바인딩된 데이터셋을 초기화합니다.
   *
  */
  ClearDataSet(): DataSet;

  /** 
   * 차트의 현재 정보를 기준으로 새로 그립니다.
   *
  */
  Draw(): void;

  /** 
   * 차트에 바인딩된 데이터셋을 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /** 
   * 차트에 바인딩된 데이터소스 명을 반환합니다.
   *
  */
  GetDataSourceName(): string;

  /** 
   * 엑셀 Export를 위한 JSON 정보를 반환합니다.
   *
  * @param range 엑셀 시트의 표시 시작 위치(eg.A5:J11)
  */
  GetExcelExportJSON(range: string): string;

  /** 
   * 차트의 데이터셋을 변경합니다.
   *
  * @param dataset 데이터셋 객체
  */
  SetDataSet(dataset: DataSet): void;

  /** 
   * 차트의 데이터소스을 변경합니다.
   *
  * @param name 변경할 데이터소스 명
  */
  SetDataSourceName(name: string): void;

  /** 
   * 차트에 적용할 Script 를 등록합니다.
   *
  * @param script 차트에 적용할 Script
  */
  SetHighChartScript(script: any): void;

}
