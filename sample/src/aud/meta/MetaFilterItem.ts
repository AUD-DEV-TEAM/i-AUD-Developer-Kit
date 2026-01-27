/**
* 메타 조회 조건을 가리키는 객체(읽기전용)
*/
export interface MetaFilterItem{

  /**
   * 비교 연산자
  */
  ComparisonOperator: number;

  /**
   * 데이터소스 코드(데이터셋 유형일 경우 사용)
  */
  DataSetSourceCode: string;

  /**
   * 조회 항목 코드(데이터셋 유형일 경우 사용)
  */
  DataSetUseFieldCode: string;

  /**
   * 필터 유형
  */
   readonly FilterType: number;

  /**
   * 표시명
  */
  Name: string;

  /**
   * 비교 연산자
  */
  Operator: number;

  /**
   * 프롬프트 유형
  */
   readonly PromptType: number;

  /**
   * 필수 입력 유형
  */
  PromptValidate: number;

  /**
   * 보호 레벨
  */
  ProtectLevel: number;

  /**
   * 첫번째 값
  */
  Value1: any;

  /**
   * 두번째 값
  */
  Value2: any;

  /**
   * 변수 이름
  */
   readonly VariableName: string;

}
