/**
 * 컨트롤 Validator
 * i-AUD Developer Kit - MTSD File Validator
 */

import { BaseValidator } from './base.validator';
import { ValidationResult, ValidationContext, Element } from '../types';
import { getControlSchema, controlSchemas } from '../schemas';

/**
 * 컨트롤 요소를 검증하는 Validator
 */
export class ControlValidator extends BaseValidator {
  /**
   * 컨트롤 요소를 검증합니다.
   */
  validate(element: Element, context: ValidationContext): ValidationResult[] {
    this.clearResults();

    const controlType = element.Type;
    const controlName = element.Name;
    const schema = getControlSchema(controlType);
    const path = context.path;

    // 알려진 컨트롤 타입인지 확인
    if (!controlSchemas.has(controlType)) {
      this.addInfo(
        'unknown-control-type',
        `Unknown control type "${controlType}". Using default validation rules.`,
        path,
        {
          messageKo: `알 수 없는 컨트롤 타입 "${controlType}". 기본 검증 규칙을 사용합니다.`,
          controlType,
          controlName,
        }
      );
    }

    // 필수 속성 검사
    for (const requiredProp of schema.requiredProperties) {
      if (!(requiredProp in element) || (element as any)[requiredProp] === undefined || (element as any)[requiredProp] === null) {
        this.addError(
          'missing-required-property',
          `Required property "${requiredProp}" is missing in ${controlType} control "${controlName}"`,
          `${path}.${requiredProp}`,
          {
            messageKo: `${controlType} 컨트롤 "${controlName}"에 필수 속성 "${requiredProp}"이(가) 누락되었습니다`,
            controlType,
            controlName,
          }
        );
      }
    }

    // 속성별 검사
    for (const propSchema of schema.properties) {
      const value = (element as any)[propSchema.name];
      this.validateProperty(value, propSchema, path, controlType, controlName);
    }

    // 컨트롤 타입별 추가 검증
    this.validateControlSpecific(element, context);

    return this.getResults();
  }

  /**
   * 컨트롤 타입별 특수 검증을 수행합니다.
   */
  private validateControlSpecific(element: Element, context: ValidationContext): void {
    const controlType = element.Type;
    const controlName = element.Name;
    const path = context.path;

    switch (controlType) {
      case 'DataGrid':
        this.validateDataGrid(element, context);
        break;
      case 'OlapGrid':
        this.validateOlapGrid(element, context);
        break;
      case 'ComboBox':
      case 'ListBox':
      case 'MultiComboBox':
        this.validateDataBoundControl(element, context);
        break;
      case 'Chart':
      case 'PieChart':
      case 'PolygonChart':
      case 'ScatterChart':
        this.validateChart(element, context);
        break;
      default:
        // 데이터소스 참조 검증 (공통)
        if ('DataSource' in element && element.DataSource) {
          this.validateDataSourceReference(element.DataSource, controlType, controlName, path, context);
        }
        break;
    }

    // 위치/크기 유효성 검증
    this.validatePosition(element, context);

    // 이름 규칙 검증
    this.validateNamingConvention(element, context);
  }

  /**
   * DataGrid 컨트롤을 검증합니다.
   */
  private validateDataGrid(element: any, context: ValidationContext): void {
    const path = context.path;
    const controlName = element.Name;

    // 데이터소스 참조 검증
    if (element.DataSource) {
      this.validateDataSourceReference(element.DataSource, 'DataGrid', controlName, path, context);
    }

    // 컬럼 검증
    if (element.Columns && Array.isArray(element.Columns)) {
      const columnNames = new Set<string>();

      element.Columns.forEach((column: any, index: number) => {
        const columnPath = `${path}.Columns[${index}]`;

        // 중복 컬럼명 검사
        if (columnNames.has(column.Name)) {
          this.addWarning(
            'duplicate-column-name',
            `Duplicate column name "${column.Name}" in DataGrid "${controlName}"`,
            columnPath,
            {
              messageKo: `DataGrid "${controlName}"에 중복된 컬럼명 "${column.Name}"이(가) 있습니다`,
              controlType: 'DataGrid',
              controlName,
              actualValue: column.Name,
            }
          );
        }
        columnNames.add(column.Name);

        // 컬럼 너비 검증
        if (column.Width <= 0) {
          this.addError(
            'invalid-column-width',
            `Column "${column.Name}" has invalid width: ${column.Width}`,
            `${columnPath}.Width`,
            {
              messageKo: `컬럼 "${column.Name}"의 너비가 유효하지 않습니다: ${column.Width}`,
              controlType: 'DataGrid',
              controlName,
              actualValue: column.Width,
              expectedValue: '> 0',
            }
          );
        }

        // Validator 설정 검증
        if (column.Validator) {
          this.validateColumnValidator(column.Validator, column.Name, columnPath, context);
        }
      });

      // 컬럼이 없는 경우 경고
      if (element.Columns.length === 0) {
        this.addWarning(
          'empty-columns',
          `DataGrid "${controlName}" has no columns defined`,
          `${path}.Columns`,
          {
            messageKo: `DataGrid "${controlName}"에 정의된 컬럼이 없습니다`,
            controlType: 'DataGrid',
            controlName,
          }
        );
      }
    }
  }

  /**
   * OlapGrid 컨트롤을 검증합니다.
   */
  private validateOlapGrid(element: any, context: ValidationContext): void {
    const path = context.path;
    const controlName = element.Name;

    // 데이터소스 참조 검증
    if (element.DataSource) {
      this.validateDataSourceReference(element.DataSource, 'OlapGrid', controlName, path, context);
    }

    // iOLAPView 검증
    if (element.iOLAPView) {
      const olapView = element.iOLAPView;

      // Fields 검증
      if (olapView.Fields && Array.isArray(olapView.Fields)) {
        const fieldKeys = new Set<string>();
        let hasMeasure = false;
        let hasDimension = false;

        olapView.Fields.forEach((field: any, index: number) => {
          const fieldPath = `${path}.iOLAPView.Fields[${index}]`;

          // 중복 필드 키 검사
          if (fieldKeys.has(field.Key)) {
            this.addWarning(
              'duplicate-field-key',
              `Duplicate field key "${field.Key}" in OlapGrid "${controlName}"`,
              fieldPath,
              {
                messageKo: `OlapGrid "${controlName}"에 중복된 필드 키 "${field.Key}"이(가) 있습니다`,
                controlType: 'OlapGrid',
                controlName,
                actualValue: field.Key,
              }
            );
          }
          fieldKeys.add(field.Key);

          // Category 검증
          if (field.Category === 2) {
            hasMeasure = true;
          } else if (field.Category === 1) {
            hasDimension = true;
          }

          // Area와 Category 조합 검증
          if (field.Category === 1 && field.Area === 4) {
            this.addWarning(
              'invalid-dimension-in-data-area',
              `Dimension field "${field.Key}" should not be in Data area`,
              fieldPath,
              {
                messageKo: `디멘전 필드 "${field.Key}"은(는) Data 영역에 있으면 안 됩니다`,
                controlType: 'OlapGrid',
                controlName,
                actualValue: `Category: ${field.Category}, Area: ${field.Area}`,
              }
            );
          }
        });

        // Measure 필드 없음 경고
        if (!hasMeasure) {
          this.addWarning(
            'no-measure-field',
            `OlapGrid "${controlName}" has no measure fields`,
            `${path}.iOLAPView.Fields`,
            {
              messageKo: `OlapGrid "${controlName}"에 측정값(Measure) 필드가 없습니다`,
              controlType: 'OlapGrid',
              controlName,
            }
          );
        }
      }

      // Options 검증
      if (olapView.Options) {
        const options = olapView.Options;

        // CellHeight 검증
        if (options.CellHeight && options.CellHeight < 10) {
          this.addWarning(
            'cell-height-too-small',
            `OlapGrid "${controlName}" cell height ${options.CellHeight} may be too small`,
            `${path}.iOLAPView.Options.CellHeight`,
            {
              messageKo: `OlapGrid "${controlName}"의 셀 높이 ${options.CellHeight}이(가) 너무 작을 수 있습니다`,
              controlType: 'OlapGrid',
              controlName,
              actualValue: options.CellHeight,
              suggestion: '최소 10 이상 권장',
            }
          );
        }

        // TreeHeaderWidth 검증
        if (options.TreeHeaderWidth && options.TreeHeaderWidth < 50) {
          this.addWarning(
            'tree-header-width-too-small',
            `OlapGrid "${controlName}" tree header width ${options.TreeHeaderWidth} may be too small`,
            `${path}.iOLAPView.Options.TreeHeaderWidth`,
            {
              messageKo: `OlapGrid "${controlName}"의 트리 헤더 너비 ${options.TreeHeaderWidth}이(가) 너무 작을 수 있습니다`,
              controlType: 'OlapGrid',
              controlName,
              actualValue: options.TreeHeaderWidth,
              suggestion: '최소 50 이상 권장',
            }
          );
        }
      }
    }
  }

  /**
   * 데이터 바인딩 컨트롤을 검증합니다.
   */
  private validateDataBoundControl(element: any, context: ValidationContext): void {
    const path = context.path;
    const controlType = element.Type;
    const controlName = element.Name;

    // 데이터소스 참조 검증
    if (element.DataSource) {
      this.validateDataSourceReference(element.DataSource, controlType, controlName, path, context);
    }

    // AutoRefresh와 DataSource 조합 검증
    if (element.AutoRefresh && !element.DataSource) {
      this.addWarning(
        'auto-refresh-without-datasource',
        `${controlType} "${controlName}" has AutoRefresh enabled but no DataSource`,
        path,
        {
          messageKo: `${controlType} "${controlName}"에 AutoRefresh가 활성화되어 있지만 DataSource가 없습니다`,
          controlType,
          controlName,
        }
      );
    }
  }

  /**
   * 차트 컨트롤을 검증합니다.
   */
  private validateChart(element: any, context: ValidationContext): void {
    const path = context.path;
    const controlType = element.Type;
    const controlName = element.Name;

    // 데이터소스 참조 검증
    if (element.DataSource) {
      this.validateDataSourceReference(element.DataSource, controlType, controlName, path, context);
    }
  }

  /**
   * 데이터소스 참조를 검증합니다.
   */
  private validateDataSourceReference(
    dataSourceId: string,
    controlType: string,
    controlName: string,
    path: string,
    context: ValidationContext
  ): void {
    if (!context.dataSourceIds.includes(dataSourceId)) {
      this.addError(
        'invalid-datasource-reference',
        `${controlType} "${controlName}" references non-existent DataSource "${dataSourceId}"`,
        `${path}.DataSource`,
        {
          messageKo: `${controlType} "${controlName}"이(가) 존재하지 않는 DataSource "${dataSourceId}"을(를) 참조합니다`,
          controlType,
          controlName,
          actualValue: dataSourceId,
          expectedValue: context.dataSourceIds,
        }
      );
    }
  }

  /**
   * 컬럼 Validator 설정을 검증합니다.
   */
  private validateColumnValidator(validator: any, columnName: string, path: string, context: ValidationContext): void {
    // 변수 참조 검증
    if (validator.Value1 && validator.Value1.startsWith(':')) {
      const varName = validator.Value1.substring(1);
      if (!context.variableNames.includes(varName)) {
        this.addWarning(
          'invalid-variable-reference',
          `Column "${columnName}" validator references non-existent variable "${varName}"`,
          `${path}.Validator.Value1`,
          {
            messageKo: `컬럼 "${columnName}"의 Validator가 존재하지 않는 변수 "${varName}"을(를) 참조합니다`,
            actualValue: validator.Value1,
            expectedValue: context.variableNames,
          }
        );
      }
    }

    if (validator.Value2 && validator.Value2.startsWith(':')) {
      const varName = validator.Value2.substring(1);
      if (!context.variableNames.includes(varName)) {
        this.addWarning(
          'invalid-variable-reference',
          `Column "${columnName}" validator references non-existent variable "${varName}"`,
          `${path}.Validator.Value2`,
          {
            messageKo: `컬럼 "${columnName}"의 Validator가 존재하지 않는 변수 "${varName}"을(를) 참조합니다`,
            actualValue: validator.Value2,
            expectedValue: context.variableNames,
          }
        );
      }
    }
  }

  /**
   * 위치/크기 유효성을 검증합니다.
   */
  private validatePosition(element: Element, context: ValidationContext): void {
    const path = context.path;
    const controlType = element.Type;
    const controlName = element.Name;
    const position = element.Position;

    if (!position) return;

    // 크기가 너무 작은 경우
    if (position.Width < 10 || position.Height < 10) {
      this.addWarning(
        'control-too-small',
        `${controlType} "${controlName}" has very small size (${position.Width}x${position.Height})`,
        `${path}.Position`,
        {
          messageKo: `${controlType} "${controlName}"의 크기가 매우 작습니다 (${position.Width}x${position.Height})`,
          controlType,
          controlName,
          actualValue: `${position.Width}x${position.Height}`,
          suggestion: '의도적인 것인지 확인하세요',
        }
      );
    }

    // 음수 위치 검사
    if (position.Left < 0 || position.Top < 0) {
      this.addWarning(
        'negative-position',
        `${controlType} "${controlName}" has negative position (Left: ${position.Left}, Top: ${position.Top})`,
        `${path}.Position`,
        {
          messageKo: `${controlType} "${controlName}"의 위치가 음수입니다 (Left: ${position.Left}, Top: ${position.Top})`,
          controlType,
          controlName,
          actualValue: `Left: ${position.Left}, Top: ${position.Top}`,
        }
      );
    }
  }

  /**
   * 이름 규칙을 검증합니다.
   */
  private validateNamingConvention(element: Element, context: ValidationContext): void {
    const path = context.path;
    const controlType = element.Type;
    const controlName = element.Name;

    // 이름에 공백 포함 여부
    if (controlName.includes(' ')) {
      this.addWarning(
        'name-contains-space',
        `${controlType} name "${controlName}" contains spaces`,
        `${path}.Name`,
        {
          messageKo: `${controlType} 이름 "${controlName}"에 공백이 포함되어 있습니다`,
          controlType,
          controlName,
          suggestion: '공백 대신 밑줄(_)을 사용하세요',
        }
      );
    }

    // 숫자로 시작하는 이름
    if (/^\d/.test(controlName)) {
      this.addWarning(
        'name-starts-with-number',
        `${controlType} name "${controlName}" starts with a number`,
        `${path}.Name`,
        {
          messageKo: `${controlType} 이름 "${controlName}"이(가) 숫자로 시작합니다`,
          controlType,
          controlName,
          suggestion: '이름은 문자로 시작하는 것이 좋습니다',
        }
      );
    }

    // 특수문자 포함 여부 (밑줄, 하이픈 제외)
    if (/[^a-zA-Z0-9_\-가-힣]/.test(controlName)) {
      this.addWarning(
        'name-contains-special-chars',
        `${controlType} name "${controlName}" contains special characters`,
        `${path}.Name`,
        {
          messageKo: `${controlType} 이름 "${controlName}"에 특수문자가 포함되어 있습니다`,
          controlType,
          controlName,
          suggestion: '영문, 숫자, 밑줄, 하이픈, 한글만 사용하세요',
        }
      );
    }
  }
}
