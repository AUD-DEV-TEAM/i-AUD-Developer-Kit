/**
 * 컨트롤별 Validation 스키마 정의
 * i-AUD Developer Kit - MTSD File Validator
 */

import { ControlSchema, PropertySchema } from '../types';

// ============================================
// 공통 속성 스키마
// ============================================

/** Position 속성 스키마 */
export const positionSchema: PropertySchema[] = [
  { name: 'Left', required: true, type: 'number', min: 0, description: '좌측 위치' },
  { name: 'Top', required: true, type: 'number', min: 0, description: '상단 위치' },
  { name: 'Width', required: true, type: 'number', min: 1, description: '너비' },
  { name: 'Height', required: true, type: 'number', min: 1, description: '높이' },
  { name: 'ZIndex', required: false, type: 'number', min: 0, description: 'Z-Index' },
  { name: 'TabIndex', required: false, type: 'number', min: 0, description: 'Tab 순서' },
  { name: 'Docking', required: false, type: 'object', description: '도킹 설정' },
];

/** Color 속성 스키마 */
export const colorSchema: PropertySchema[] = [
  { name: 'R', required: true, type: 'number', min: 0, max: 255, description: 'Red' },
  { name: 'G', required: true, type: 'number', min: 0, max: 255, description: 'Green' },
  { name: 'B', required: true, type: 'number', min: 0, max: 255, description: 'Blue' },
  { name: 'A', required: true, type: 'number', min: 0, max: 1, description: 'Alpha' },
];

/** Font 속성 스키마 */
export const fontSchema: PropertySchema[] = [
  { name: 'Color', required: false, type: 'object', schema: colorSchema, description: '폰트 색상' },
  { name: 'Size', required: false, type: 'number', min: 1, max: 200, description: '폰트 크기' },
  { name: 'Family', required: false, type: 'string', description: '폰트 패밀리' },
  { name: 'Bold', required: false, type: 'boolean', description: '굵게' },
  { name: 'Italic', required: false, type: 'boolean', description: '기울임' },
  { name: 'UnderLine', required: false, type: 'boolean', description: '밑줄' },
  {
    name: 'HorizontalAlignment',
    required: false,
    type: 'string',
    enum: ['left', 'center', 'right'],
    description: '가로 정렬',
  },
  {
    name: 'VerticalAlignment',
    required: false,
    type: 'string',
    enum: ['top', 'middle', 'bottom'],
    description: '세로 정렬',
  },
];

/** Border 속성 스키마 */
export const borderSchema: PropertySchema[] = [
  { name: 'Color', required: false, type: 'object', schema: colorSchema, description: '테두리 색상' },
  { name: 'LineType', required: false, type: 'string', enum: ['solid', 'dashed', 'dotted', 'none'], description: '선 스타일' },
  { name: 'Thickness', required: false, type: 'string', pattern: '^\\d+,\\d+,\\d+,\\d+$', description: '두께 (top,right,bottom,left)' },
  { name: 'CornerRadius', required: false, type: 'string', pattern: '^\\d+,\\d+,\\d+,\\d+$', description: '모서리 반경' },
];

/** Style 속성 스키마 */
export const styleSchema: PropertySchema[] = [
  { name: 'Type', required: false, type: 'number', enum: [0, 1, 2], description: '스타일 타입' },
  { name: 'BoxStyle', required: false, type: 'string', description: 'BoxStyle 참조' },
  { name: 'Background', required: false, type: 'object', description: '배경' },
  { name: 'Border', required: false, type: 'object', schema: borderSchema, description: '테두리' },
  { name: 'Font', required: false, type: 'object', schema: fontSchema, description: '폰트' },
];

/** 기본 컨트롤 속성 스키마 */
export const baseControlSchema: PropertySchema[] = [
  { name: 'Type', required: true, type: 'string', description: '컨트롤 타입' },
  { name: 'Id', required: true, type: 'string', minLength: 1, description: '컨트롤 ID' },
  { name: 'Name', required: true, type: 'string', minLength: 1, description: '컨트롤 이름' },
  { name: 'Visible', required: false, type: 'boolean', defaultValue: true, description: '표시 여부' },
  { name: 'Position', required: true, type: 'object', schema: positionSchema, description: '위치 정보' },
  { name: 'Style', required: false, type: 'object', schema: styleSchema, description: '스타일' },
  { name: 'LanguageCode', required: false, type: 'string', description: '다국어 코드' },
];

// ============================================
// 컨트롤별 스키마 정의
// ============================================

/** Label 컨트롤 스키마 */
export const labelSchema: ControlSchema = {
  type: 'Label',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'Text', required: false, type: 'string', description: '표시 텍스트' },
    { name: 'Formula', required: false, type: 'string', description: '계산 수식' },
    { name: 'Cursor', required: false, type: 'string', enum: ['default', 'pointer', 'text', 'move'], description: '커서 모양' },
    { name: 'MxBinding', required: false, type: 'string', description: '데이터 바인딩' },
    { name: 'MxBindingUseStyle', required: false, type: 'boolean', description: '바인딩 스타일 사용' },
    { name: 'UseTooltip', required: false, type: 'boolean', description: '툴팁 사용' },
    { name: 'Margin', required: false, type: 'object', description: '여백' },
  ],
};

/** Button 컨트롤 스키마 */
export const buttonSchema: ControlSchema = {
  type: 'Button',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'Text', required: false, type: 'string', description: '버튼 텍스트' },
    { name: 'Cursor', required: false, type: 'string', enum: ['default', 'pointer'], description: '커서 모양' },
  ],
};

/** TextBox 컨트롤 스키마 */
export const textBoxSchema: ControlSchema = {
  type: 'TextBox',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'Text', required: false, type: 'string', description: '텍스트' },
    { name: 'Value', required: false, type: 'string', description: '값' },
    { name: 'Formula', required: false, type: 'string', description: '계산 수식' },
    { name: 'IsReadOnly', required: false, type: 'boolean', defaultValue: false, description: '읽기 전용' },
    { name: 'MaxLength', required: false, type: 'number', min: 0, description: '최대 글자 수' },
    { name: 'MxBinding', required: false, type: 'string', description: '데이터 바인딩' },
    { name: 'InputType', required: false, type: 'number', enum: [0, 1, 2, 3], description: '입력 타입' },
  ],
};

/** RichTextBox 컨트롤 스키마 */
export const richTextBoxSchema: ControlSchema = {
  type: 'RichTextBox',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'Text', required: false, type: 'string', description: '텍스트' },
    { name: 'Value', required: false, type: 'string', description: '값' },
    { name: 'Formula', required: false, type: 'string', description: '계산 수식' },
    { name: 'IsReadOnly', required: false, type: 'boolean', defaultValue: false, description: '읽기 전용' },
    { name: 'MaxLength', required: false, type: 'number', min: 0, description: '최대 글자 수' },
    { name: 'MxBinding', required: false, type: 'string', description: '데이터 바인딩' },
  ],
};

/** ComboBox 컨트롤 스키마 */
export const comboBoxSchema: ControlSchema = {
  type: 'ComboBox',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'DataSource', required: false, type: 'string', description: '데이터소스 ID' },
    { name: 'InitType', required: false, type: 'number', enum: [0, 1, 2], description: '초기값 유형' },
    { name: 'InitValue', required: false, type: 'string', description: '초기값' },
    { name: 'IsReadOnly', required: false, type: 'boolean', defaultValue: false, description: '읽기 전용' },
    { name: 'UseAllItems', required: false, type: 'boolean', description: '전체 항목 사용' },
    { name: 'UseAllItemsText', required: false, type: 'string', description: '전체 항목 텍스트' },
    { name: 'AutoRefresh', required: false, type: 'boolean', description: '자동 새로고침' },
  ],
};

/** CheckBox 컨트롤 스키마 */
export const checkBoxSchema: ControlSchema = {
  type: 'CheckBox',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'Text', required: false, type: 'string', description: '레이블 텍스트' },
    { name: 'Checked', required: false, type: 'boolean', defaultValue: false, description: '체크 여부' },
    { name: 'CheckedValue', required: false, type: 'string', description: '체크 시 값' },
    { name: 'UncheckedValue', required: false, type: 'string', description: '미체크 시 값' },
  ],
};

/** DataGrid 컬럼 스키마 */
export const dataGridColumnSchema: PropertySchema[] = [
  { name: 'Name', required: true, type: 'string', minLength: 1, description: '컬럼 필드명' },
  { name: 'Caption', required: true, type: 'string', description: '컬럼 헤더 텍스트' },
  { name: 'Width', required: true, type: 'number', min: 1, description: '컬럼 너비' },
  { name: 'ColumnType', required: false, type: 'number', enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], description: '컬럼 타입' },
  { name: 'Format', required: false, type: 'string', description: '표시 형식' },
  { name: 'KeyType', required: false, type: 'number', enum: [0, 1, 2], description: '키 타입' },
  { name: 'DataType', required: false, type: 'number', enum: [0, 1], description: '데이터 타입' },
  { name: 'HeaderPosition', required: false, type: 'string', enum: ['left', 'center', 'right'], description: '헤더 정렬' },
  { name: 'TextPosition', required: false, type: 'string', enum: ['start', 'center', 'end'], description: '텍스트 정렬' },
  { name: 'Visible', required: false, type: 'boolean', defaultValue: true, description: '표시 여부' },
  { name: 'Editable', required: false, type: 'boolean', description: '편집 가능 여부' },
  { name: 'Validator', required: false, type: 'object', description: '유효성 검사 설정' },
];

/** DataGrid 컨트롤 스키마 */
export const dataGridSchema: ControlSchema = {
  type: 'DataGrid',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position', 'Columns'],
  properties: [
    ...baseControlSchema,
    { name: 'DataSource', required: false, type: 'string', description: '데이터소스 ID' },
    { name: 'Columns', required: true, type: 'array', schema: dataGridColumnSchema, minLength: 1, description: '컬럼 목록' },
    { name: 'CellMargin', required: false, type: 'string', pattern: '^\\d+,\\d+,\\d+,\\d+$', description: '셀 여백' },
    { name: 'ShowHeader', required: false, type: 'number', enum: [0, 1, 2], description: '헤더 표시 유형' },
    { name: 'ColumnHeaderHeight', required: false, type: 'number', min: 1, description: '헤더 높이' },
    { name: 'RowHeight', required: false, type: 'number', min: 1, description: '행 높이' },
    { name: 'Editable', required: false, type: 'boolean', description: '편집 가능 여부' },
    { name: 'FontSize', required: false, type: 'number', min: 1, max: 100, description: '폰트 크기' },
    { name: 'AutoRefresh', required: false, type: 'boolean', description: '자동 새로고침' },
    { name: 'DoRefresh', required: false, type: 'boolean', description: '새로고침 수행' },
    { name: 'DoExport', required: false, type: 'boolean', description: '내보내기 수행' },
  ],
};

/** OlapGrid Field 스키마 */
export const olapFieldSchema: PropertySchema[] = [
  { name: 'Key', required: true, type: 'string', minLength: 1, description: '필드 키' },
  { name: 'Caption', required: true, type: 'string', description: '필드 캡션' },
  { name: 'Category', required: true, type: 'number', enum: [1, 2], description: '카테고리 (1: 디멘전, 2: 측정값)' },
  { name: 'Area', required: true, type: 'number', enum: [1, 2, 3, 4], description: '영역 (1: Row, 2: Column, 3: Filter, 4: Data)' },
  { name: 'SummaryType', required: false, type: 'number', enum: [0, 1, 2, 3, 4, 5], description: '집계 유형' },
  { name: 'Format', required: false, type: 'string', description: '표시 형식' },
  { name: 'Width', required: false, type: 'number', min: 1, description: '너비' },
  { name: 'SortType', required: false, type: 'number', enum: [0, 1, 2], description: '정렬 유형' },
  { name: 'Visible', required: false, type: 'boolean', defaultValue: true, description: '표시 여부' },
  { name: 'DataType', required: false, type: 'number', enum: [0, 1], description: '데이터 타입' },
];

/** OlapGrid Options 스키마 */
export const olapOptionsSchema: PropertySchema[] = [
  { name: 'ViewType', required: false, type: 'number', enum: [0, 1, 2], description: '뷰 타입' },
  { name: 'IsExpandAll', required: false, type: 'boolean', description: '전체 확장' },
  { name: 'ShowExpandButtons', required: false, type: 'boolean', description: '확장 버튼 표시' },
  { name: 'EmptyCellText', required: false, type: 'string', description: '빈 셀 텍스트' },
  { name: 'CellHeight', required: false, type: 'number', min: 1, description: '셀 높이' },
  { name: 'HeaderCellHeight', required: false, type: 'number', min: 1, description: '헤더 셀 높이' },
  { name: 'TreeHeaderWidth', required: false, type: 'number', min: 1, description: '트리 헤더 너비' },
  { name: 'DisplayColumnSubTotal', required: false, type: 'boolean', description: '컬럼 소계 표시' },
  { name: 'DisplayRowSubTotal', required: false, type: 'boolean', description: '행 소계 표시' },
  { name: 'DisplayColumnGrandTotal', required: false, type: 'boolean', description: '컬럼 총계 표시' },
  { name: 'DisplayRowGrandTotal', required: false, type: 'boolean', description: '행 총계 표시' },
];

/** OlapGrid 컨트롤 스키마 */
export const olapGridSchema: ControlSchema = {
  type: 'OlapGrid',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position', 'iOLAPView'],
  properties: [
    ...baseControlSchema,
    { name: 'DataSource', required: false, type: 'string', description: '데이터소스 ID' },
    { name: 'iOLAPView', required: true, type: 'object', description: 'OLAP 뷰 설정' },
    { name: 'ExtraOption', required: false, type: 'object', description: '추가 옵션' },
    { name: 'AutoRefresh', required: false, type: 'boolean', description: '자동 새로고침' },
    { name: 'DoRefresh', required: false, type: 'boolean', description: '새로고침 수행' },
    { name: 'DoExport', required: false, type: 'boolean', description: '내보내기 수행' },
  ],
};

/** Chart 컨트롤 스키마 */
export const chartSchema: ControlSchema = {
  type: 'Chart',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'DataSource', required: false, type: 'string', description: '데이터소스 ID' },
    { name: 'ChartType', required: false, type: 'number', description: '차트 타입' },
    { name: 'Title', required: false, type: 'object', description: '차트 제목' },
    { name: 'Legend', required: false, type: 'object', description: '범례 설정' },
    { name: 'XAxis', required: false, type: 'object', description: 'X축 설정' },
    { name: 'YAxis', required: false, type: 'object', description: 'Y축 설정' },
    { name: 'Series', required: false, type: 'array', description: '시리즈 목록' },
    { name: 'PlotOptions', required: false, type: 'object', description: '플롯 옵션' },
    { name: 'AutoRefresh', required: false, type: 'boolean', description: '자동 새로고침' },
  ],
};

/** Image 컨트롤 스키마 */
export const imageSchema: ControlSchema = {
  type: 'Image',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'ImagePath', required: false, type: 'string', description: '이미지 경로' },
    { name: 'ImageUrl', required: false, type: 'string', description: '이미지 URL' },
    { name: 'Stretch', required: false, type: 'number', enum: [0, 1, 2, 3], description: '늘이기 모드' },
  ],
};

/** Tab 컨트롤 스키마 */
export const tabSchema: ControlSchema = {
  type: 'Tab',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'TabItems', required: false, type: 'array', description: '탭 항목 목록' },
    { name: 'SelectedIndex', required: false, type: 'number', min: 0, description: '선택된 탭 인덱스' },
    { name: 'TabPosition', required: false, type: 'number', enum: [0, 1, 2, 3], description: '탭 위치' },
  ],
};

/** Group 컨트롤 스키마 */
export const groupSchema: ControlSchema = {
  type: 'Group',
  extends: 'BaseControl',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: [
    ...baseControlSchema,
    { name: 'Elements', required: false, type: 'array', description: '하위 요소 목록' },
    { name: 'Text', required: false, type: 'string', description: '그룹 제목' },
    { name: 'ShowHeader', required: false, type: 'boolean', description: '헤더 표시' },
  ],
};

// ============================================
// 스키마 맵
// ============================================

/** 컨트롤 타입별 스키마 맵 */
export const controlSchemas: Map<string, ControlSchema> = new Map([
  ['Label', labelSchema],
  ['Button', buttonSchema],
  ['TextBox', textBoxSchema],
  ['RichTextBox', richTextBoxSchema],
  ['ComboBox', comboBoxSchema],
  ['CheckBox', checkBoxSchema],
  ['DataGrid', dataGridSchema],
  ['OlapGrid', olapGridSchema],
  ['Chart', chartSchema],
  ['Image', imageSchema],
  ['Tab', tabSchema],
  ['Group', groupSchema],
]);

/** 기본 컨트롤 스키마 (알 수 없는 타입용) */
export const defaultControlSchema: ControlSchema = {
  type: 'Unknown',
  requiredProperties: ['Type', 'Id', 'Name', 'Position'],
  properties: baseControlSchema,
};

/**
 * 컨트롤 타입에 맞는 스키마를 반환합니다.
 * @param controlType 컨트롤 타입
 * @returns 컨트롤 스키마
 */
export function getControlSchema(controlType: string): ControlSchema {
  return controlSchemas.get(controlType) || defaultControlSchema;
}
