/**
 * MTSD 파일 전체 Validator
 * i-AUD Developer Kit - MTSD File Validator
 */

import * as fs from 'fs';
import * as path from 'path';
import { BaseValidator } from './base.validator';
import { ControlValidator } from './control.validator';
import {
  ValidationResult,
  ValidationContext,
  ValidationReport,
  ValidationSummary,
  ValidatorOptions,
  MtsdFile,
} from '../types';

/**
 * MTSD 파일 전체를 검증하는 Validator
 */
export class MtsdValidator extends BaseValidator {
  private controlValidator: ControlValidator;
  private options: ValidatorOptions;

  constructor(options: ValidatorOptions = {}) {
    super();
    this.controlValidator = new ControlValidator();
    this.options = {
      strict: false,
      ignoreRules: [],
      maxErrors: 1000,
      verbose: false,
      ...options,
    };
  }

  /**
   * MTSD 파일을 파싱합니다.
   */
  static parseFile(filePath: string): MtsdFile {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as MtsdFile;
  }

  /**
   * MTSD JSON 문자열을 파싱합니다.
   */
  static parseJson(jsonString: string): MtsdFile {
    return JSON.parse(jsonString) as MtsdFile;
  }

  /**
   * 파일 경로로 MTSD 파일을 검증합니다.
   */
  validateFile(filePath: string): ValidationReport {
    const mtsd = MtsdValidator.parseFile(filePath);
    const results = this.validate(mtsd, this.createContext(mtsd));
    return this.createReport(filePath, mtsd, results);
  }

  /**
   * MTSD 객체를 검증합니다.
   */
  validate(mtsd: MtsdFile, context: ValidationContext): ValidationResult[] {
    this.clearResults();

    // 기본 구조 검증
    this.validateStructure(mtsd, context);

    // ReportInfo 검증
    this.validateReportInfo(mtsd.ReportInfo, context);

    // DataSources 검증
    this.validateDataSources(mtsd.DataSources, context);

    // Variables 검증
    this.validateVariables(mtsd.Variables, context);

    // Forms 및 Elements 검증
    this.validateForms(mtsd.Forms, context);

    // 결과 필터링
    return this.filterResults(this.getResults());
  }

  /**
   * ValidationContext를 생성합니다.
   */
  private createContext(mtsd: MtsdFile): ValidationContext {
    return {
      path: '',
      mtsd,
      dataSourceIds: mtsd.DataSources?.Datas?.map(ds => ds.Id) || [],
      variableNames: mtsd.Variables?.map(v => v.Name) || [],
    };
  }

  /**
   * 기본 구조를 검증합니다.
   */
  private validateStructure(mtsd: MtsdFile, context: ValidationContext): void {
    // 필수 최상위 속성 검사
    const requiredProps = ['ReportInfo', 'DataSources', 'Forms'];

    for (const prop of requiredProps) {
      if (!(prop in mtsd)) {
        this.addError(
          'missing-required-section',
          `Required section "${prop}" is missing`,
          prop,
          {
            messageKo: `필수 섹션 "${prop}"이(가) 누락되었습니다`,
          }
        );
      }
    }

    // Forms 배열 검사
    if (mtsd.Forms && !Array.isArray(mtsd.Forms)) {
      this.addError(
        'invalid-forms-type',
        'Forms should be an array',
        'Forms',
        {
          messageKo: 'Forms는 배열이어야 합니다',
          actualValue: typeof mtsd.Forms,
          expectedValue: 'array',
        }
      );
    }

    // DataSources.Datas 배열 검사
    if (mtsd.DataSources && mtsd.DataSources.Datas && !Array.isArray(mtsd.DataSources.Datas)) {
      this.addError(
        'invalid-datasources-type',
        'DataSources.Datas should be an array',
        'DataSources.Datas',
        {
          messageKo: 'DataSources.Datas는 배열이어야 합니다',
          actualValue: typeof mtsd.DataSources.Datas,
          expectedValue: 'array',
        }
      );
    }
  }

  /**
   * ReportInfo를 검증합니다.
   */
  private validateReportInfo(reportInfo: any, context: ValidationContext): void {
    if (!reportInfo) return;

    const path = 'ReportInfo';

    // 필수 속성 검사
    const requiredProps = ['ReportCode', 'ReportName'];
    for (const prop of requiredProps) {
      if (!reportInfo[prop]) {
        this.addError(
          'missing-report-info-property',
          `Required ReportInfo property "${prop}" is missing or empty`,
          `${path}.${prop}`,
          {
            messageKo: `필수 ReportInfo 속성 "${prop}"이(가) 누락되었거나 비어 있습니다`,
          }
        );
      }
    }

    // ReportCode 형식 검사
    if (reportInfo.ReportCode && !/^REP[A-F0-9]{32}$/i.test(reportInfo.ReportCode)) {
      this.addWarning(
        'invalid-report-code-format',
        `ReportCode "${reportInfo.ReportCode}" does not match expected format`,
        `${path}.ReportCode`,
        {
          messageKo: `ReportCode "${reportInfo.ReportCode}"이(가) 예상 형식과 일치하지 않습니다`,
          actualValue: reportInfo.ReportCode,
          expectedValue: 'REP + 32자리 16진수',
        }
      );
    }

    // DocumentVersion 검사
    if (reportInfo.DocumentVersion) {
      const versionParts = reportInfo.DocumentVersion.split('.');
      if (versionParts.length < 3) {
        this.addInfo(
          'unusual-document-version',
          `DocumentVersion "${reportInfo.DocumentVersion}" has unusual format`,
          `${path}.DocumentVersion`,
          {
            messageKo: `DocumentVersion "${reportInfo.DocumentVersion}"의 형식이 일반적이지 않습니다`,
          }
        );
      }
    }
  }

  /**
   * DataSources를 검증합니다.
   */
  private validateDataSources(dataSources: any, context: ValidationContext): void {
    if (!dataSources?.Datas) return;

    const dataSourceIds = new Set<string>();
    const dataSourceNames = new Set<string>();

    dataSources.Datas.forEach((ds: any, index: number) => {
      const path = `DataSources.Datas[${index}]`;

      // 필수 속성 검사
      if (!ds.Id) {
        this.addError(
          'missing-datasource-id',
          `DataSource at index ${index} is missing Id`,
          `${path}.Id`,
          {
            messageKo: `인덱스 ${index}의 DataSource에 Id가 누락되었습니다`,
          }
        );
      }

      if (!ds.Name) {
        this.addError(
          'missing-datasource-name',
          `DataSource at index ${index} is missing Name`,
          `${path}.Name`,
          {
            messageKo: `인덱스 ${index}의 DataSource에 Name이 누락되었습니다`,
          }
        );
      }

      // 중복 ID 검사
      if (ds.Id && dataSourceIds.has(ds.Id)) {
        this.addError(
          'duplicate-datasource-id',
          `Duplicate DataSource Id "${ds.Id}"`,
          `${path}.Id`,
          {
            messageKo: `중복된 DataSource Id "${ds.Id}"`,
            actualValue: ds.Id,
          }
        );
      }
      if (ds.Id) dataSourceIds.add(ds.Id);

      // 중복 Name 검사
      if (ds.Name && dataSourceNames.has(ds.Name)) {
        this.addWarning(
          'duplicate-datasource-name',
          `Duplicate DataSource Name "${ds.Name}"`,
          `${path}.Name`,
          {
            messageKo: `중복된 DataSource Name "${ds.Name}"`,
            actualValue: ds.Name,
          }
        );
      }
      if (ds.Name) dataSourceNames.add(ds.Name);

      // DSType 검사
      if (ds.DSType !== undefined && ![0, 1, 2, 3, 4, 5].includes(ds.DSType)) {
        this.addWarning(
          'unknown-datasource-type',
          `DataSource "${ds.Name}" has unknown DSType: ${ds.DSType}`,
          `${path}.DSType`,
          {
            messageKo: `DataSource "${ds.Name}"의 DSType이 알 수 없습니다: ${ds.DSType}`,
            actualValue: ds.DSType,
            expectedValue: [0, 1, 2, 3, 4, 5],
          }
        );
      }

      // Columns 검사
      if (ds.Columns && Array.isArray(ds.Columns)) {
        const columnNames = new Set<string>();

        ds.Columns.forEach((col: any, colIndex: number) => {
          const colPath = `${path}.Columns[${colIndex}]`;

          if (!col.Name) {
            this.addError(
              'missing-column-name',
              `Column at index ${colIndex} in DataSource "${ds.Name}" is missing Name`,
              `${colPath}.Name`,
              {
                messageKo: `DataSource "${ds.Name}"의 인덱스 ${colIndex} 컬럼에 Name이 누락되었습니다`,
              }
            );
          }

          // 중복 컬럼명 검사
          if (col.Name && columnNames.has(col.Name)) {
            this.addWarning(
              'duplicate-column-name',
              `Duplicate column name "${col.Name}" in DataSource "${ds.Name}"`,
              colPath,
              {
                messageKo: `DataSource "${ds.Name}"에 중복된 컬럼명 "${col.Name}"`,
                actualValue: col.Name,
              }
            );
          }
          if (col.Name) columnNames.add(col.Name);

          // Type 검사
          if (col.Type && !['String', 'Numeric', 'DateTime'].includes(col.Type)) {
            this.addInfo(
              'unusual-column-type',
              `Column "${col.Name}" has unusual Type: ${col.Type}`,
              `${colPath}.Type`,
              {
                messageKo: `컬럼 "${col.Name}"의 타입이 일반적이지 않습니다: ${col.Type}`,
                actualValue: col.Type,
                expectedValue: ['String', 'Numeric', 'DateTime'],
              }
            );
          }
        });
      }
    });
  }

  /**
   * Variables를 검증합니다.
   */
  private validateVariables(variables: any[], context: ValidationContext): void {
    if (!variables || !Array.isArray(variables)) return;

    const variableNames = new Set<string>();

    variables.forEach((variable: any, index: number) => {
      const path = `Variables[${index}]`;

      // 필수 속성 검사
      if (!variable.Name) {
        this.addError(
          'missing-variable-name',
          `Variable at index ${index} is missing Name`,
          `${path}.Name`,
          {
            messageKo: `인덱스 ${index}의 변수에 Name이 누락되었습니다`,
          }
        );
      }

      // 중복 이름 검사
      if (variable.Name && variableNames.has(variable.Name)) {
        this.addError(
          'duplicate-variable-name',
          `Duplicate Variable Name "${variable.Name}"`,
          `${path}.Name`,
          {
            messageKo: `중복된 변수명 "${variable.Name}"`,
            actualValue: variable.Name,
          }
        );
      }
      if (variable.Name) variableNames.add(variable.Name);

      // 이름 규칙 검사
      if (variable.Name && /^[^a-zA-Z_]/.test(variable.Name)) {
        this.addWarning(
          'invalid-variable-name-start',
          `Variable name "${variable.Name}" should start with a letter or underscore`,
          `${path}.Name`,
          {
            messageKo: `변수명 "${variable.Name}"은(는) 문자 또는 밑줄로 시작해야 합니다`,
            actualValue: variable.Name,
          }
        );
      }
    });
  }

  /**
   * Forms를 검증합니다.
   */
  private validateForms(forms: any[], context: ValidationContext): void {
    if (!forms || !Array.isArray(forms)) return;

    const formNames = new Set<string>();
    const allControlNames = new Set<string>();

    forms.forEach((form: any, formIndex: number) => {
      const formPath = `Forms[${formIndex}]`;

      // 필수 속성 검사
      if (!form.Id) {
        this.addError(
          'missing-form-id',
          `Form at index ${formIndex} is missing Id`,
          `${formPath}.Id`,
          {
            messageKo: `인덱스 ${formIndex}의 Form에 Id가 누락되었습니다`,
          }
        );
      }

      if (!form.Name) {
        this.addError(
          'missing-form-name',
          `Form at index ${formIndex} is missing Name`,
          `${formPath}.Name`,
          {
            messageKo: `인덱스 ${formIndex}의 Form에 Name이 누락되었습니다`,
          }
        );
      }

      // 중복 이름 검사
      if (form.Name && formNames.has(form.Name)) {
        this.addWarning(
          'duplicate-form-name',
          `Duplicate Form Name "${form.Name}"`,
          `${formPath}.Name`,
          {
            messageKo: `중복된 Form 이름 "${form.Name}"`,
            actualValue: form.Name,
          }
        );
      }
      if (form.Name) formNames.add(form.Name);

      // Elements 검증
      if (form.Elements && Array.isArray(form.Elements)) {
        form.Elements.forEach((element: any, elementIndex: number) => {
          const elementPath = `${formPath}.Elements[${elementIndex}]`;

          // 컨트롤 이름 중복 검사 (폼 간)
          if (element.Name && allControlNames.has(element.Name)) {
            this.addWarning(
              'duplicate-control-name-across-forms',
              `Control name "${element.Name}" is duplicated across forms`,
              `${elementPath}.Name`,
              {
                messageKo: `컨트롤 이름 "${element.Name}"이(가) 여러 폼에서 중복됩니다`,
                controlType: element.Type,
                controlName: element.Name,
              }
            );
          }
          if (element.Name) allControlNames.add(element.Name);

          // 컨트롤 검증
          const controlContext: ValidationContext = {
            ...context,
            path: elementPath,
            formName: form.Name,
            formIndex,
            elementIndex,
          };

          // 타입 필터링
          if (this.options.targetTypes && this.options.targetTypes.length > 0) {
            if (!this.options.targetTypes.includes(element.Type)) {
              return;
            }
          }

          const controlResults = this.controlValidator.validate(element, controlContext);
          this.results.push(...controlResults);

          // 최대 오류 수 체크
          if (this.options.maxErrors && this.results.filter(r => r.severity === 'error').length >= this.options.maxErrors) {
            this.addWarning(
              'max-errors-reached',
              `Maximum error count (${this.options.maxErrors}) reached. Stopping validation.`,
              elementPath,
              {
                messageKo: `최대 오류 수(${this.options.maxErrors})에 도달했습니다. 검증을 중단합니다.`,
              }
            );
            return;
          }
        });
      }
    });
  }

  /**
   * 결과를 필터링합니다.
   */
  private filterResults(results: ValidationResult[]): ValidationResult[] {
    let filtered = results;

    // 무시할 규칙 필터링
    if (this.options.ignoreRules && this.options.ignoreRules.length > 0) {
      filtered = filtered.filter(r => !this.options.ignoreRules!.includes(r.ruleId));
    }

    // 특정 규칙만 적용
    if (this.options.onlyRules && this.options.onlyRules.length > 0) {
      filtered = filtered.filter(r => this.options.onlyRules!.includes(r.ruleId));
    }

    return filtered;
  }

  /**
   * ValidationReport를 생성합니다.
   */
  private createReport(filePath: string, mtsd: MtsdFile, results: ValidationResult[]): ValidationReport {
    const summary = this.createSummary(mtsd, results);

    return {
      filePath,
      reportCode: mtsd.ReportInfo?.ReportCode,
      reportName: mtsd.ReportInfo?.ReportName,
      validatedAt: new Date().toISOString(),
      isValid: summary.errorCount === 0,
      summary,
      results,
    };
  }

  /**
   * ValidationSummary를 생성합니다.
   */
  private createSummary(mtsd: MtsdFile, results: ValidationResult[]): ValidationSummary {
    const errorCount = results.filter(r => r.severity === 'error').length;
    const warningCount = results.filter(r => r.severity === 'warning').length;
    const infoCount = results.filter(r => r.severity === 'info').length;

    let controlCount = 0;
    if (mtsd.Forms) {
      mtsd.Forms.forEach(form => {
        if (form.Elements) {
          controlCount += form.Elements.length;
        }
      });
    }

    return {
      errorCount,
      warningCount,
      infoCount,
      controlCount,
      formCount: mtsd.Forms?.length || 0,
      dataSourceCount: mtsd.DataSources?.Datas?.length || 0,
    };
  }
}
