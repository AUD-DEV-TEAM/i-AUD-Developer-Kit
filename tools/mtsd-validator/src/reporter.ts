/**
 * Validation 결과 출력 모듈
 * i-AUD Developer Kit - MTSD File Validator
 */

import { ValidationReport, ValidationResult, ValidationSeverity } from './types';

/**
 * 콘솔 색상 코드
 */
const Colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

/**
 * 심각도별 아이콘
 */
const SeverityIcons: Record<ValidationSeverity, string> = {
  error: '✖',
  warning: '⚠',
  info: 'ℹ',
};

/**
 * 심각도별 색상
 */
const SeverityColors: Record<ValidationSeverity, string> = {
  error: Colors.red,
  warning: Colors.yellow,
  info: Colors.blue,
};

/**
 * Validation Reporter 클래스
 */
export class ValidationReporter {
  private useColors: boolean;
  private useKorean: boolean;

  constructor(options: { useColors?: boolean; useKorean?: boolean } = {}) {
    this.useColors = options.useColors ?? true;
    this.useKorean = options.useKorean ?? false;
  }

  /**
   * 색상 적용
   */
  private color(text: string, colorCode: string): string {
    if (!this.useColors) return text;
    return `${colorCode}${text}${Colors.reset}`;
  }

  /**
   * 콘솔 출력
   */
  formatConsole(report: ValidationReport): string {
    const lines: string[] = [];

    // 헤더
    lines.push('');
    lines.push(this.color('═'.repeat(70), Colors.dim));
    lines.push(this.color('  MTSD File Validation Report', Colors.bold));
    lines.push(this.color('═'.repeat(70), Colors.dim));
    lines.push('');

    // 파일 정보
    lines.push(`  ${this.color('File:', Colors.cyan)} ${report.filePath}`);
    if (report.reportName) {
      lines.push(`  ${this.color('Report:', Colors.cyan)} ${report.reportName}`);
    }
    if (report.reportCode) {
      lines.push(`  ${this.color('Code:', Colors.cyan)} ${report.reportCode}`);
    }
    lines.push(`  ${this.color('Validated:', Colors.cyan)} ${report.validatedAt}`);
    lines.push('');

    // 요약
    lines.push(this.color('─'.repeat(70), Colors.dim));
    lines.push(this.color('  Summary', Colors.bold));
    lines.push(this.color('─'.repeat(70), Colors.dim));
    lines.push('');

    const summary = report.summary;
    lines.push(`  ${this.color('Forms:', Colors.white)} ${summary.formCount}`);
    lines.push(`  ${this.color('Controls:', Colors.white)} ${summary.controlCount}`);
    lines.push(`  ${this.color('DataSources:', Colors.white)} ${summary.dataSourceCount}`);
    lines.push('');

    // 결과 카운트
    const errorText = `${SeverityIcons.error} ${summary.errorCount} errors`;
    const warningText = `${SeverityIcons.warning} ${summary.warningCount} warnings`;
    const infoText = `${SeverityIcons.info} ${summary.infoCount} info`;

    lines.push(
      `  ${this.color(errorText, Colors.red)}  ` +
      `${this.color(warningText, Colors.yellow)}  ` +
      `${this.color(infoText, Colors.blue)}`
    );
    lines.push('');

    // 상세 결과
    if (report.results.length > 0) {
      lines.push(this.color('─'.repeat(70), Colors.dim));
      lines.push(this.color('  Details', Colors.bold));
      lines.push(this.color('─'.repeat(70), Colors.dim));
      lines.push('');

      // 심각도별 그룹핑
      const groupedResults = this.groupResultsBySeverity(report.results);

      for (const severity of ['error', 'warning', 'info'] as ValidationSeverity[]) {
        const results = groupedResults[severity];
        if (results.length === 0) continue;

        lines.push(this.color(`  ${severity.toUpperCase()}S (${results.length})`, SeverityColors[severity]));
        lines.push('');

        for (const result of results) {
          lines.push(this.formatResult(result));
        }
        lines.push('');
      }
    }

    // 최종 결과
    lines.push(this.color('═'.repeat(70), Colors.dim));
    if (report.isValid) {
      lines.push(this.color('  ✓ Validation Passed', Colors.green));
    } else {
      lines.push(this.color('  ✗ Validation Failed', Colors.red));
    }
    lines.push(this.color('═'.repeat(70), Colors.dim));
    lines.push('');

    return lines.join('\n');
  }

  /**
   * 단일 결과 포맷팅
   */
  private formatResult(result: ValidationResult): string {
    const icon = SeverityIcons[result.severity];
    const color = SeverityColors[result.severity];
    const message = this.useKorean && result.messageKo ? result.messageKo : result.message;

    const lines: string[] = [];

    // 메인 라인
    let mainLine = `    ${this.color(icon, color)} `;
    mainLine += `${this.color(`[${result.ruleId}]`, Colors.dim)} `;
    mainLine += message;
    lines.push(mainLine);

    // 경로
    lines.push(`      ${this.color('at', Colors.dim)} ${result.path}`);

    // 컨트롤 정보
    if (result.controlType || result.controlName) {
      const controlInfo = [
        result.controlType ? `Type: ${result.controlType}` : '',
        result.controlName ? `Name: ${result.controlName}` : '',
      ].filter(Boolean).join(', ');
      lines.push(`      ${this.color('control', Colors.dim)} ${controlInfo}`);
    }

    // 실제 값
    if (result.actualValue !== undefined) {
      const actualStr = typeof result.actualValue === 'object'
        ? JSON.stringify(result.actualValue)
        : String(result.actualValue);
      lines.push(`      ${this.color('actual:', Colors.dim)} ${actualStr}`);
    }

    // 기대 값
    if (result.expectedValue !== undefined) {
      const expectedStr = typeof result.expectedValue === 'object'
        ? JSON.stringify(result.expectedValue)
        : String(result.expectedValue);
      lines.push(`      ${this.color('expected:', Colors.dim)} ${expectedStr}`);
    }

    // 제안
    if (result.suggestion) {
      lines.push(`      ${this.color('suggestion:', Colors.cyan)} ${result.suggestion}`);
    }

    return lines.join('\n');
  }

  /**
   * 심각도별 그룹핑
   */
  private groupResultsBySeverity(results: ValidationResult[]): Record<ValidationSeverity, ValidationResult[]> {
    return {
      error: results.filter(r => r.severity === 'error'),
      warning: results.filter(r => r.severity === 'warning'),
      info: results.filter(r => r.severity === 'info'),
    };
  }

  /**
   * JSON 형식 출력
   */
  formatJson(report: ValidationReport, pretty: boolean = true): string {
    if (pretty) {
      return JSON.stringify(report, null, 2);
    }
    return JSON.stringify(report);
  }

  /**
   * 마크다운 형식 출력
   */
  formatMarkdown(report: ValidationReport): string {
    const lines: string[] = [];

    lines.push('# MTSD Validation Report');
    lines.push('');
    lines.push('## File Information');
    lines.push('');
    lines.push(`- **File:** ${report.filePath}`);
    if (report.reportName) lines.push(`- **Report Name:** ${report.reportName}`);
    if (report.reportCode) lines.push(`- **Report Code:** ${report.reportCode}`);
    lines.push(`- **Validated At:** ${report.validatedAt}`);
    lines.push(`- **Status:** ${report.isValid ? '✅ Valid' : '❌ Invalid'}`);
    lines.push('');

    lines.push('## Summary');
    lines.push('');
    lines.push('| Metric | Count |');
    lines.push('|--------|-------|');
    lines.push(`| Forms | ${report.summary.formCount} |`);
    lines.push(`| Controls | ${report.summary.controlCount} |`);
    lines.push(`| DataSources | ${report.summary.dataSourceCount} |`);
    lines.push(`| Errors | ${report.summary.errorCount} |`);
    lines.push(`| Warnings | ${report.summary.warningCount} |`);
    lines.push(`| Info | ${report.summary.infoCount} |`);
    lines.push('');

    if (report.results.length > 0) {
      lines.push('## Details');
      lines.push('');

      const groupedResults = this.groupResultsBySeverity(report.results);

      for (const severity of ['error', 'warning', 'info'] as ValidationSeverity[]) {
        const results = groupedResults[severity];
        if (results.length === 0) continue;

        const severityEmoji = { error: '🔴', warning: '🟡', info: '🔵' }[severity];
        lines.push(`### ${severityEmoji} ${severity.charAt(0).toUpperCase() + severity.slice(1)}s (${results.length})`);
        lines.push('');

        for (const result of results) {
          const message = this.useKorean && result.messageKo ? result.messageKo : result.message;
          lines.push(`- **[${result.ruleId}]** ${message}`);
          lines.push(`  - Path: \`${result.path}\``);
          if (result.controlType) lines.push(`  - Control Type: ${result.controlType}`);
          if (result.controlName) lines.push(`  - Control Name: ${result.controlName}`);
          if (result.suggestion) lines.push(`  - Suggestion: ${result.suggestion}`);
          lines.push('');
        }
      }
    }

    return lines.join('\n');
  }

  /**
   * CSV 형식 출력
   */
  formatCsv(report: ValidationReport): string {
    const lines: string[] = [];

    // 헤더
    lines.push('Severity,RuleId,Message,Path,ControlType,ControlName,ActualValue,ExpectedValue,Suggestion');

    // 데이터
    for (const result of report.results) {
      const message = this.useKorean && result.messageKo ? result.messageKo : result.message;
      const row = [
        result.severity,
        result.ruleId,
        `"${message.replace(/"/g, '""')}"`,
        `"${result.path}"`,
        result.controlType || '',
        result.controlName || '',
        result.actualValue !== undefined ? `"${String(result.actualValue).replace(/"/g, '""')}"` : '',
        result.expectedValue !== undefined ? `"${String(result.expectedValue).replace(/"/g, '""')}"` : '',
        result.suggestion ? `"${result.suggestion.replace(/"/g, '""')}"` : '',
      ];
      lines.push(row.join(','));
    }

    return lines.join('\n');
  }
}
