/**
* 피벗 컨트롤 사용자 정의 항목
*/
export interface ScriptCustomDimension{

  /**
   * 화면 출력 명
  */
  Caption: string;

  /**
   * 데이터 계산 수식
  */
  DataCellFormula: string;

  /**
   * 데이터 셀 스타일
  */
  DataCellStyle: string;

  /**
   * 레코드가 없는 항목 표시 여부
  */
  DisplayBlankEntry: boolean;

  /**
   * 서식
  */
  Format: string;

  /**
   * 계산 수식
  */
  Formula: string;

  /**
   * 헤더 셀 스타일
  */
  HeaderCellStyle: string;

  /**
   * 이름
  */
   readonly Name: string;

}
