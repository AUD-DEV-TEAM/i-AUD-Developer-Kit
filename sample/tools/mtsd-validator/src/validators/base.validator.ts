/**
 * 기본 Validator 클래스
 * i-AUD Developer Kit - MTSD File Validator
 */

import {
  ValidationResult,
  ValidationContext,
  ValidationSeverity,
  PropertySchema,
} from '../types';

/**
 * 기본 Validator 추상 클래스
 * 모든 Validator는 이 클래스를 상속받습니다.
 */
export abstract class BaseValidator {
  protected results: ValidationResult[] = [];

  /**
   * Validation 결과를 추가합니다.
   */
  protected addResult(
    severity: ValidationSeverity,
    ruleId: string,
    message: string,
    path: string,
    options?: {
      messageKo?: string;
      controlType?: string;
      controlName?: string;
      actualValue?: any;
      expectedValue?: any;
      suggestion?: string;
    }
  ): void {
    this.results.push({
      severity,
      ruleId,
      message,
      path,
      ...options,
    });
  }

  /**
   * 오류를 추가합니다.
   */
  protected addError(
    ruleId: string,
    message: string,
    path: string,
    options?: {
      messageKo?: string;
      controlType?: string;
      controlName?: string;
      actualValue?: any;
      expectedValue?: any;
      suggestion?: string;
    }
  ): void {
    this.addResult('error', ruleId, message, path, options);
  }

  /**
   * 경고를 추가합니다.
   */
  protected addWarning(
    ruleId: string,
    message: string,
    path: string,
    options?: {
      messageKo?: string;
      controlType?: string;
      controlName?: string;
      actualValue?: any;
      expectedValue?: any;
      suggestion?: string;
    }
  ): void {
    this.addResult('warning', ruleId, message, path, options);
  }

  /**
   * 정보를 추가합니다.
   */
  protected addInfo(
    ruleId: string,
    message: string,
    path: string,
    options?: {
      messageKo?: string;
      controlType?: string;
      controlName?: string;
      actualValue?: any;
      expectedValue?: any;
      suggestion?: string;
    }
  ): void {
    this.addResult('info', ruleId, message, path, options);
  }

  /**
   * 현재까지의 결과를 반환합니다.
   */
  public getResults(): ValidationResult[] {
    return this.results;
  }

  /**
   * 결과를 초기화합니다.
   */
  public clearResults(): void {
    this.results = [];
  }

  /**
   * 값의 타입을 검증합니다.
   */
  protected validateType(
    value: any,
    expectedType: PropertySchema['type'],
    path: string,
    propertyName: string
  ): boolean {
    if (value === undefined || value === null) {
      return true; // null/undefined는 required 검사에서 처리
    }

    let isValid = false;

    switch (expectedType) {
      case 'string':
        isValid = typeof value === 'string';
        break;
      case 'number':
        isValid = typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)));
        break;
      case 'boolean':
        isValid = typeof value === 'boolean';
        break;
      case 'object':
        isValid = typeof value === 'object' && !Array.isArray(value);
        break;
      case 'array':
        isValid = Array.isArray(value);
        break;
      case 'any':
        isValid = true;
        break;
    }

    if (!isValid) {
      this.addError(
        'invalid-type',
        `Property "${propertyName}" should be of type "${expectedType}", but got "${typeof value}"`,
        path,
        {
          messageKo: `속성 "${propertyName}"은(는) "${expectedType}" 타입이어야 하지만 "${typeof value}" 타입입니다`,
          actualValue: typeof value,
          expectedValue: expectedType,
        }
      );
    }

    return isValid;
  }

  /**
   * 속성 스키마에 따라 값을 검증합니다.
   */
  protected validateProperty(
    value: any,
    schema: PropertySchema,
    path: string,
    controlType?: string,
    controlName?: string
  ): void {
    const fullPath = `${path}.${schema.name}`;

    // 필수 속성 검사
    if (schema.required && (value === undefined || value === null)) {
      this.addError(
        'missing-required-property',
        `Required property "${schema.name}" is missing`,
        fullPath,
        {
          messageKo: `필수 속성 "${schema.name}"이(가) 누락되었습니다`,
          controlType,
          controlName,
          expectedValue: schema.type,
        }
      );
      return;
    }

    // 값이 없으면 이후 검사 건너뜀
    if (value === undefined || value === null) {
      return;
    }

    // 타입 검사
    if (!this.validateType(value, schema.type, path, schema.name)) {
      return;
    }

    // 숫자 범위 검사
    if (schema.type === 'number') {
      const numValue = typeof value === 'string' ? Number(value) : value;

      if (schema.min !== undefined && numValue < schema.min) {
        this.addError(
          'value-below-minimum',
          `Property "${schema.name}" value ${numValue} is below minimum ${schema.min}`,
          fullPath,
          {
            messageKo: `속성 "${schema.name}"의 값 ${numValue}이(가) 최소값 ${schema.min}보다 작습니다`,
            controlType,
            controlName,
            actualValue: numValue,
            expectedValue: `>= ${schema.min}`,
          }
        );
      }

      if (schema.max !== undefined && numValue > schema.max) {
        this.addError(
          'value-above-maximum',
          `Property "${schema.name}" value ${numValue} is above maximum ${schema.max}`,
          fullPath,
          {
            messageKo: `속성 "${schema.name}"의 값 ${numValue}이(가) 최대값 ${schema.max}보다 큽니다`,
            controlType,
            controlName,
            actualValue: numValue,
            expectedValue: `<= ${schema.max}`,
          }
        );
      }
    }

    // 문자열/배열 길이 검사
    if ((schema.type === 'string' || schema.type === 'array') && typeof value === 'object' ? Array.isArray(value) : typeof value === 'string') {
      const length = value.length;

      if (schema.minLength !== undefined && length < schema.minLength) {
        this.addError(
          'length-below-minimum',
          `Property "${schema.name}" length ${length} is below minimum ${schema.minLength}`,
          fullPath,
          {
            messageKo: `속성 "${schema.name}"의 길이 ${length}이(가) 최소 길이 ${schema.minLength}보다 작습니다`,
            controlType,
            controlName,
            actualValue: length,
            expectedValue: `>= ${schema.minLength}`,
          }
        );
      }

      if (schema.maxLength !== undefined && length > schema.maxLength) {
        this.addWarning(
          'length-above-maximum',
          `Property "${schema.name}" length ${length} is above maximum ${schema.maxLength}`,
          fullPath,
          {
            messageKo: `속성 "${schema.name}"의 길이 ${length}이(가) 최대 길이 ${schema.maxLength}보다 큽니다`,
            controlType,
            controlName,
            actualValue: length,
            expectedValue: `<= ${schema.maxLength}`,
          }
        );
      }
    }

    // 열거형 값 검사
    if (schema.enum && !schema.enum.includes(value)) {
      this.addError(
        'invalid-enum-value',
        `Property "${schema.name}" value "${value}" is not in allowed values: [${schema.enum.join(', ')}]`,
        fullPath,
        {
          messageKo: `속성 "${schema.name}"의 값 "${value}"은(는) 허용된 값 [${schema.enum.join(', ')}]에 포함되지 않습니다`,
          controlType,
          controlName,
          actualValue: value,
          expectedValue: schema.enum,
        }
      );
    }

    // 정규식 패턴 검사
    if (schema.pattern && typeof value === 'string') {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        this.addWarning(
          'pattern-mismatch',
          `Property "${schema.name}" value "${value}" does not match pattern "${schema.pattern}"`,
          fullPath,
          {
            messageKo: `속성 "${schema.name}"의 값 "${value}"이(가) 패턴 "${schema.pattern}"과 일치하지 않습니다`,
            controlType,
            controlName,
            actualValue: value,
            expectedValue: schema.pattern,
          }
        );
      }
    }

    // 중첩 스키마 검사
    if (schema.schema && schema.type === 'object' && typeof value === 'object') {
      for (const nestedSchema of schema.schema) {
        this.validateProperty(value[nestedSchema.name], nestedSchema, fullPath, controlType, controlName);
      }
    }

    // 배열 아이템 스키마 검사
    if (schema.schema && schema.type === 'array' && Array.isArray(value)) {
      value.forEach((item, index) => {
        const itemPath = `${fullPath}[${index}]`;
        for (const itemSchema of schema.schema!) {
          this.validateProperty(item[itemSchema.name], itemSchema, itemPath, controlType, controlName);
        }
      });
    }
  }

  /**
   * 추상 메서드: 실제 검증 로직을 구현합니다.
   */
  abstract validate(data: any, context: ValidationContext): ValidationResult[];
}
