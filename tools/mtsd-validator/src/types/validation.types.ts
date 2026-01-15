/**
 * Validation 결과 관련 타입 정의
 * i-AUD Developer Kit - MTSD File Validator
 */

/** Validation 심각도 레벨 */
export type ValidationSeverity = 'error' | 'warning' | 'info';

/** Validation 결과 항목 */
export interface ValidationResult {
  /** 심각도 */
  severity: ValidationSeverity;
  /** 규칙 ID */
  ruleId: string;
  /** 메시지 */
  message: string;
  /** 메시지 (한국어) */
  messageKo?: string;
  /** 경로 (예: Forms[0].Elements[1].Position.Width) */
  path: string;
  /** 컨트롤 타입 */
  controlType?: string;
  /** 컨트롤 이름 */
  controlName?: string;
  /** 현재 값 */
  actualValue?: any;
  /** 기대 값 또는 제안 */
  expectedValue?: any;
  /** 수정 제안 */
  suggestion?: string;
}

/** Validation 요약 */
export interface ValidationSummary {
  /** 총 오류 수 */
  errorCount: number;
  /** 총 경고 수 */
  warningCount: number;
  /** 총 정보 수 */
  infoCount: number;
  /** 검사된 컨트롤 수 */
  controlCount: number;
  /** 검사된 폼 수 */
  formCount: number;
  /** 검사된 데이터소스 수 */
  dataSourceCount: number;
}

/** 전체 Validation 보고서 */
export interface ValidationReport {
  /** 파일 경로 */
  filePath: string;
  /** 보고서 코드 */
  reportCode?: string;
  /** 보고서 이름 */
  reportName?: string;
  /** 검사 시간 */
  validatedAt: string;
  /** 유효 여부 */
  isValid: boolean;
  /** 요약 */
  summary: ValidationSummary;
  /** 상세 결과 목록 */
  results: ValidationResult[];
}

/** Validation 규칙 정의 */
export interface ValidationRule {
  /** 규칙 ID */
  id: string;
  /** 규칙 이름 */
  name: string;
  /** 규칙 설명 */
  description: string;
  /** 규칙 설명 (한국어) */
  descriptionKo?: string;
  /** 심각도 */
  severity: ValidationSeverity;
  /** 적용 대상 컨트롤 타입 (빈 배열이면 전체) */
  targetTypes: string[];
  /** 활성화 여부 */
  enabled: boolean;
}

/** Validation 컨텍스트 */
export interface ValidationContext {
  /** 현재 경로 */
  path: string;
  /** 폼 이름 */
  formName?: string;
  /** 폼 인덱스 */
  formIndex?: number;
  /** 컨트롤 인덱스 */
  elementIndex?: number;
  /** 부모 요소 */
  parent?: any;
  /** 전체 MTSD 데이터 */
  mtsd: any;
  /** 데이터소스 ID 목록 */
  dataSourceIds: string[];
  /** 변수 이름 목록 */
  variableNames: string[];
}

/** Validator 설정 옵션 */
export interface ValidatorOptions {
  /** 엄격 모드 (경고도 오류로 취급) */
  strict?: boolean;
  /** 무시할 규칙 ID 목록 */
  ignoreRules?: string[];
  /** 적용할 규칙 ID 목록 (지정 시 해당 규칙만 적용) */
  onlyRules?: string[];
  /** 특정 컨트롤 타입만 검사 */
  targetTypes?: string[];
  /** 최대 오류 수 (초과 시 검사 중단) */
  maxErrors?: number;
  /** 상세 출력 여부 */
  verbose?: boolean;
}

/** 속성 스키마 정의 */
export interface PropertySchema {
  /** 속성 이름 */
  name: string;
  /** 필수 여부 */
  required: boolean;
  /** 타입 */
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any';
  /** 최소값 (숫자형) */
  min?: number;
  /** 최대값 (숫자형) */
  max?: number;
  /** 최소 길이 (문자열/배열) */
  minLength?: number;
  /** 최대 길이 (문자열/배열) */
  maxLength?: number;
  /** 허용 값 목록 */
  enum?: any[];
  /** 정규식 패턴 (문자열) */
  pattern?: string;
  /** 기본값 */
  defaultValue?: any;
  /** 설명 */
  description?: string;
  /** 중첩 스키마 (객체/배열) */
  schema?: PropertySchema[];
}

/** 컨트롤 스키마 정의 */
export interface ControlSchema {
  /** 컨트롤 타입 */
  type: string;
  /** 필수 속성 목록 */
  requiredProperties: string[];
  /** 속성 스키마 목록 */
  properties: PropertySchema[];
  /** 상속 타입 */
  extends?: string;
}
