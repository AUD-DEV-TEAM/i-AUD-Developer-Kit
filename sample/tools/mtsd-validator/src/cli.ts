#!/usr/bin/env node
/**
 * MTSD Validator CLI
 * i-AUD Developer Kit - MTSD File Validator
 */

import * as fs from 'fs';
import * as path from 'path';
import { MtsdValidator } from './validators';
import { ValidationReporter } from './reporter';
import { ValidatorOptions, ValidationReport } from './types';

/**
 * CLI 옵션 인터페이스
 */
interface CliOptions {
  files: string[];
  output?: string;
  format: 'console' | 'json' | 'markdown' | 'csv';
  strict: boolean;
  ignoreRules: string[];
  onlyRules: string[];
  targetTypes: string[];
  maxErrors: number;
  korean: boolean;
  noColors: boolean;
  verbose: boolean;
  help: boolean;
  version: boolean;
  recursive: boolean;
}

/**
 * 기본 옵션
 */
const defaultOptions: CliOptions = {
  files: [],
  format: 'console',
  strict: false,
  ignoreRules: [],
  onlyRules: [],
  targetTypes: [],
  maxErrors: 1000,
  korean: false,
  noColors: false,
  verbose: false,
  help: false,
  version: false,
  recursive: false,
};

/**
 * 도움말 출력
 */
function printHelp(): void {
  console.log(`
MTSD File Validator - i-AUD Developer Kit

Usage:
  mtsd-validator <file...> [options]
  mtsd-validator <directory> --recursive [options]

Options:
  -o, --output <file>       Output file path (default: stdout)
  -f, --format <format>     Output format: console, json, markdown, csv (default: console)
  -s, --strict              Treat warnings as errors
  --ignore <rules>          Comma-separated list of rule IDs to ignore
  --only <rules>            Only apply specified rule IDs (comma-separated)
  --types <types>           Only validate specified control types (comma-separated)
  --max-errors <n>          Maximum number of errors before stopping (default: 1000)
  -k, --korean              Use Korean messages when available
  --no-colors               Disable colored output
  -r, --recursive           Recursively search for .mtsd files in directories
  -v, --verbose             Verbose output
  -h, --help                Show this help message
  --version                 Show version

Examples:
  # Validate a single file
  mtsd-validator report.mtsd

  # Validate multiple files with JSON output
  mtsd-validator *.mtsd -f json -o results.json

  # Validate all mtsd files in a directory
  mtsd-validator ./reports --recursive

  # Validate with specific rules only
  mtsd-validator report.mtsd --only missing-required-property,invalid-type

  # Ignore specific rules
  mtsd-validator report.mtsd --ignore name-contains-space,control-too-small

  # Validate only DataGrid controls
  mtsd-validator report.mtsd --types DataGrid,OlapGrid

Rule IDs:
  Structure:
    - missing-required-section
    - invalid-forms-type
    - invalid-datasources-type

  ReportInfo:
    - missing-report-info-property
    - invalid-report-code-format

  DataSources:
    - missing-datasource-id
    - missing-datasource-name
    - duplicate-datasource-id
    - duplicate-datasource-name
    - duplicate-column-name

  Variables:
    - missing-variable-name
    - duplicate-variable-name
    - invalid-variable-name-start

  Forms:
    - missing-form-id
    - missing-form-name
    - duplicate-form-name
    - duplicate-control-name-across-forms

  Controls:
    - unknown-control-type
    - missing-required-property
    - invalid-type
    - value-below-minimum
    - value-above-maximum
    - length-below-minimum
    - length-above-maximum
    - invalid-enum-value
    - pattern-mismatch
    - invalid-datasource-reference
    - invalid-variable-reference

  DataGrid:
    - duplicate-column-name
    - invalid-column-width
    - empty-columns

  OlapGrid:
    - duplicate-field-key
    - invalid-dimension-in-data-area
    - no-measure-field
    - cell-height-too-small
    - tree-header-width-too-small

  Naming:
    - name-contains-space
    - name-starts-with-number
    - name-contains-special-chars

  Position:
    - control-too-small
    - negative-position
`);
}

/**
 * 버전 출력
 */
function printVersion(): void {
  console.log('mtsd-validator v1.0.0');
}

/**
 * 명령줄 인자 파싱
 */
function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = { ...defaultOptions };
  let i = 0;

  while (i < args.length) {
    const arg = args[i];

    switch (arg) {
      case '-h':
      case '--help':
        options.help = true;
        break;
      case '--version':
        options.version = true;
        break;
      case '-o':
      case '--output':
        options.output = args[++i];
        break;
      case '-f':
      case '--format':
        options.format = args[++i] as CliOptions['format'];
        break;
      case '-s':
      case '--strict':
        options.strict = true;
        break;
      case '--ignore':
        options.ignoreRules = args[++i].split(',').map(s => s.trim());
        break;
      case '--only':
        options.onlyRules = args[++i].split(',').map(s => s.trim());
        break;
      case '--types':
        options.targetTypes = args[++i].split(',').map(s => s.trim());
        break;
      case '--max-errors':
        options.maxErrors = parseInt(args[++i], 10);
        break;
      case '-k':
      case '--korean':
        options.korean = true;
        break;
      case '--no-colors':
        options.noColors = true;
        break;
      case '-r':
      case '--recursive':
        options.recursive = true;
        break;
      case '-v':
      case '--verbose':
        options.verbose = true;
        break;
      default:
        if (!arg.startsWith('-')) {
          options.files.push(arg);
        }
        break;
    }
    i++;
  }

  return options;
}

/**
 * MTSD 파일 찾기 (재귀적)
 */
function findMtsdFiles(dirPath: string): string[] {
  const files: string[] = [];

  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findMtsdFiles(fullPath));
    } else if (item.endsWith('.mtsd')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * 파일 목록 확장
 */
function expandFiles(patterns: string[], recursive: boolean): string[] {
  const files: string[] = [];

  for (const pattern of patterns) {
    if (fs.existsSync(pattern)) {
      const stat = fs.statSync(pattern);

      if (stat.isDirectory()) {
        if (recursive) {
          files.push(...findMtsdFiles(pattern));
        } else {
          console.error(`Warning: ${pattern} is a directory. Use --recursive to search for .mtsd files.`);
        }
      } else if (pattern.endsWith('.mtsd')) {
        files.push(pattern);
      }
    } else {
      // Glob 패턴 처리 (간단한 * 패턴)
      const dir = path.dirname(pattern);
      const baseName = path.basename(pattern);

      if (baseName.includes('*') && fs.existsSync(dir)) {
        const regex = new RegExp('^' + baseName.replace(/\*/g, '.*') + '$');
        const items = fs.readdirSync(dir);

        for (const item of items) {
          if (regex.test(item) && item.endsWith('.mtsd')) {
            files.push(path.join(dir, item));
          }
        }
      } else {
        console.error(`Warning: File not found: ${pattern}`);
      }
    }
  }

  return files;
}

/**
 * 메인 함수
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  if (options.version) {
    printVersion();
    process.exit(0);
  }

  if (options.files.length === 0) {
    console.error('Error: No input files specified.');
    console.error('Use --help for usage information.');
    process.exit(1);
  }

  // 파일 목록 확장
  const files = expandFiles(options.files, options.recursive);

  if (files.length === 0) {
    console.error('Error: No .mtsd files found.');
    process.exit(1);
  }

  if (options.verbose) {
    console.log(`Found ${files.length} file(s) to validate.`);
  }

  // Validator 생성
  const validatorOptions: ValidatorOptions = {
    strict: options.strict,
    ignoreRules: options.ignoreRules,
    onlyRules: options.onlyRules.length > 0 ? options.onlyRules : undefined,
    targetTypes: options.targetTypes.length > 0 ? options.targetTypes : undefined,
    maxErrors: options.maxErrors,
    verbose: options.verbose,
  };

  const validator = new MtsdValidator(validatorOptions);
  const reporter = new ValidationReporter({
    useColors: !options.noColors,
    useKorean: options.korean,
  });

  // 전체 결과 저장
  const allReports: ValidationReport[] = [];
  let hasErrors = false;

  // 각 파일 검증
  for (const file of files) {
    if (options.verbose) {
      console.log(`Validating: ${file}`);
    }

    try {
      const report = validator.validateFile(file);
      allReports.push(report);

      if (!report.isValid) {
        hasErrors = true;
      }

      // 콘솔 출력 (단일 파일 또는 verbose 모드)
      if (options.format === 'console' && (files.length === 1 || options.verbose)) {
        console.log(reporter.formatConsole(report));
      }
    } catch (error: any) {
      console.error(`Error validating ${file}: ${error.message}`);
      hasErrors = true;
    }
  }

  // 결과 출력
  let output: string;

  if (allReports.length === 1) {
    const report = allReports[0];

    switch (options.format) {
      case 'json':
        output = reporter.formatJson(report);
        break;
      case 'markdown':
        output = reporter.formatMarkdown(report);
        break;
      case 'csv':
        output = reporter.formatCsv(report);
        break;
      case 'console':
      default:
        output = reporter.formatConsole(report);
        break;
    }
  } else {
    // 다중 파일 결과
    const combinedReport = {
      validatedAt: new Date().toISOString(),
      totalFiles: allReports.length,
      validFiles: allReports.filter(r => r.isValid).length,
      invalidFiles: allReports.filter(r => !r.isValid).length,
      reports: allReports,
    };

    switch (options.format) {
      case 'json':
        output = JSON.stringify(combinedReport, null, 2);
        break;
      case 'markdown':
        output = formatMultiFileMarkdown(allReports, reporter);
        break;
      case 'csv':
        output = formatMultiFileCsv(allReports, reporter);
        break;
      case 'console':
      default:
        output = formatMultiFileConsole(allReports, reporter, !options.noColors);
        break;
    }
  }

  // 출력
  if (options.output) {
    fs.writeFileSync(options.output, output, 'utf-8');
    console.log(`Results written to: ${options.output}`);
  } else if (options.format !== 'console' || allReports.length > 1) {
    console.log(output);
  }

  // 종료 코드
  if (hasErrors || (options.strict && allReports.some(r => r.summary.warningCount > 0))) {
    process.exit(1);
  }

  process.exit(0);
}

/**
 * 다중 파일 콘솔 출력
 */
function formatMultiFileConsole(reports: ValidationReport[], reporter: ValidationReporter, useColors: boolean): string {
  const lines: string[] = [];
  const Colors = {
    reset: useColors ? '\x1b[0m' : '',
    red: useColors ? '\x1b[31m' : '',
    green: useColors ? '\x1b[32m' : '',
    yellow: useColors ? '\x1b[33m' : '',
    bold: useColors ? '\x1b[1m' : '',
    dim: useColors ? '\x1b[2m' : '',
  };

  lines.push('');
  lines.push(`${Colors.bold}MTSD Validation Summary${Colors.reset}`);
  lines.push(`${Colors.dim}${'═'.repeat(70)}${Colors.reset}`);
  lines.push('');

  const validCount = reports.filter(r => r.isValid).length;
  const invalidCount = reports.filter(r => !r.isValid).length;
  const totalErrors = reports.reduce((sum, r) => sum + r.summary.errorCount, 0);
  const totalWarnings = reports.reduce((sum, r) => sum + r.summary.warningCount, 0);

  lines.push(`  Total Files: ${reports.length}`);
  lines.push(`  ${Colors.green}✓ Valid: ${validCount}${Colors.reset}`);
  lines.push(`  ${Colors.red}✗ Invalid: ${invalidCount}${Colors.reset}`);
  lines.push('');
  lines.push(`  Total Errors: ${Colors.red}${totalErrors}${Colors.reset}`);
  lines.push(`  Total Warnings: ${Colors.yellow}${totalWarnings}${Colors.reset}`);
  lines.push('');

  lines.push(`${Colors.dim}${'─'.repeat(70)}${Colors.reset}`);
  lines.push('  File Results:');
  lines.push(`${Colors.dim}${'─'.repeat(70)}${Colors.reset}`);
  lines.push('');

  for (const report of reports) {
    const status = report.isValid
      ? `${Colors.green}✓${Colors.reset}`
      : `${Colors.red}✗${Colors.reset}`;
    const shortPath = report.filePath.length > 50
      ? '...' + report.filePath.slice(-47)
      : report.filePath;

    lines.push(`  ${status} ${shortPath}`);
    if (!report.isValid) {
      lines.push(`      ${Colors.red}${report.summary.errorCount} errors${Colors.reset}, ${Colors.yellow}${report.summary.warningCount} warnings${Colors.reset}`);
    }
  }

  lines.push('');
  lines.push(`${Colors.dim}${'═'.repeat(70)}${Colors.reset}`);
  lines.push('');

  return lines.join('\n');
}

/**
 * 다중 파일 마크다운 출력
 */
function formatMultiFileMarkdown(reports: ValidationReport[], reporter: ValidationReporter): string {
  const lines: string[] = [];

  lines.push('# MTSD Validation Summary');
  lines.push('');
  lines.push('## Overview');
  lines.push('');
  lines.push(`- **Total Files:** ${reports.length}`);
  lines.push(`- **Valid:** ${reports.filter(r => r.isValid).length}`);
  lines.push(`- **Invalid:** ${reports.filter(r => !r.isValid).length}`);
  lines.push(`- **Total Errors:** ${reports.reduce((sum, r) => sum + r.summary.errorCount, 0)}`);
  lines.push(`- **Total Warnings:** ${reports.reduce((sum, r) => sum + r.summary.warningCount, 0)}`);
  lines.push('');

  lines.push('## File Results');
  lines.push('');
  lines.push('| File | Status | Errors | Warnings |');
  lines.push('|------|--------|--------|----------|');

  for (const report of reports) {
    const status = report.isValid ? '✅ Valid' : '❌ Invalid';
    const shortPath = path.basename(report.filePath);
    lines.push(`| ${shortPath} | ${status} | ${report.summary.errorCount} | ${report.summary.warningCount} |`);
  }

  lines.push('');

  // 상세 결과 (실패한 파일만)
  const failedReports = reports.filter(r => !r.isValid);
  if (failedReports.length > 0) {
    lines.push('## Details');
    lines.push('');

    for (const report of failedReports) {
      lines.push(`### ${path.basename(report.filePath)}`);
      lines.push('');
      lines.push(reporter.formatMarkdown(report).split('## Details')[1] || 'No details available.');
      lines.push('');
    }
  }

  return lines.join('\n');
}

/**
 * 다중 파일 CSV 출력
 */
function formatMultiFileCsv(reports: ValidationReport[], reporter: ValidationReporter): string {
  const lines: string[] = [];

  lines.push('File,Severity,RuleId,Message,Path,ControlType,ControlName');

  for (const report of reports) {
    for (const result of report.results) {
      const row = [
        `"${report.filePath}"`,
        result.severity,
        result.ruleId,
        `"${result.message.replace(/"/g, '""')}"`,
        `"${result.path}"`,
        result.controlType || '',
        result.controlName || '',
      ];
      lines.push(row.join(','));
    }
  }

  return lines.join('\n');
}

// 실행
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
