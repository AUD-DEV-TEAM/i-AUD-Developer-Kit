/**
 * MTSD File Validator
 * i-AUD Developer Kit
 *
 * MTSD 파일의 구조와 컨트롤 속성을 검증하는 도구입니다.
 */

// Types
export * from './types';

// Schemas
export * from './schemas';

// Validators
export * from './validators';

// Reporter
export { ValidationReporter } from './reporter';

// 편의를 위한 간단한 API
import { MtsdValidator } from './validators';
import { ValidationReporter } from './reporter';
import { ValidationReport, ValidatorOptions } from './types';

/**
 * MTSD 파일을 검증하고 콘솔에 결과를 출력합니다.
 * @param filePath MTSD 파일 경로
 * @param options 검증 옵션
 * @returns ValidationReport
 */
export function validateMtsdFile(filePath: string, options?: ValidatorOptions): ValidationReport {
  const validator = new MtsdValidator(options);
  return validator.validateFile(filePath);
}

/**
 * MTSD JSON 문자열을 검증합니다.
 * @param jsonString MTSD JSON 문자열
 * @param options 검증 옵션
 * @returns ValidationReport
 */
export function validateMtsdJson(jsonString: string, options?: ValidatorOptions): ValidationReport {
  const mtsd = MtsdValidator.parseJson(jsonString);
  const validator = new MtsdValidator(options);
  const context = {
    path: '',
    mtsd,
    dataSourceIds: mtsd.DataSources?.Datas?.map(ds => ds.Id) || [],
    variableNames: mtsd.Variables?.map(v => v.Name) || [],
  };
  const results = validator.validate(mtsd, context);

  return {
    filePath: '<json-input>',
    reportCode: mtsd.ReportInfo?.ReportCode,
    reportName: mtsd.ReportInfo?.ReportName,
    validatedAt: new Date().toISOString(),
    isValid: results.filter(r => r.severity === 'error').length === 0,
    summary: {
      errorCount: results.filter(r => r.severity === 'error').length,
      warningCount: results.filter(r => r.severity === 'warning').length,
      infoCount: results.filter(r => r.severity === 'info').length,
      controlCount: mtsd.Forms?.reduce((sum, f) => sum + (f.Elements?.length || 0), 0) || 0,
      formCount: mtsd.Forms?.length || 0,
      dataSourceCount: mtsd.DataSources?.Datas?.length || 0,
    },
    results,
  };
}

/**
 * ValidationReport를 콘솔 형식 문자열로 변환합니다.
 * @param report ValidationReport
 * @param options 출력 옵션
 * @returns 포맷팅된 문자열
 */
export function formatReport(
  report: ValidationReport,
  options?: { format?: 'console' | 'json' | 'markdown' | 'csv'; useKorean?: boolean; useColors?: boolean }
): string {
  const reporter = new ValidationReporter({
    useColors: options?.useColors ?? true,
    useKorean: options?.useKorean ?? false,
  });

  switch (options?.format) {
    case 'json':
      return reporter.formatJson(report);
    case 'markdown':
      return reporter.formatMarkdown(report);
    case 'csv':
      return reporter.formatCsv(report);
    case 'console':
    default:
      return reporter.formatConsole(report);
  }
}
