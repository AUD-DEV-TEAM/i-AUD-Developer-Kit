import { enCellType } from "../../../aud/enums/comm/enCellType";
/**
 * 멀티헤더의 레이아웃 정보를 나타냅니다.
 *
 * {@link Grid.GetMultiHeaderLayout}에서 반환되며, {@link Grid.SetMultiHeaderLayout}에 전달됩니다.
 */
export interface MultiHeaderLayout {

  /**
   * 멀티헤더의 행 목록
   */
  Rows: MultiHeaderRowLayout[];

  /**
   * 멀티헤더의 컬럼 목록
   */
  Cols: MultiHeaderColLayout[];

}

/**
 * 멀티헤더 레이아웃의 행 정보를 나타냅니다.
 */
export interface MultiHeaderRowLayout {

  /**
   * 행에 포함된 셀 목록
   */
  Cells: MultiHeaderCellLayout[];

}

/**
 * 멀티헤더 레이아웃의 컬럼 정보를 나타냅니다.
 */
export interface MultiHeaderColLayout {

  /**
   * 컬럼의 필드명
   */
  Name: string;

  /**
   * 컬럼의 표시명
   */
  Caption: string;

}

/**
 * 멀티헤더 레이아웃의 셀 정보를 나타냅니다.
 */
export interface MultiHeaderCellLayout {

  /**
   * 셀의 표시 텍스트
   */
  Caption: string;

  /**
   * 셀에 바인딩된 필드명
   */
  Name: string;

  /**
   * 행 인덱스
   */
  RowIndex: number;

  /**
   * 열 인덱스
   */
  ColIndex: number;

  /**
   * 행 병합 수
   */
  RowSpan: number;

  /**
   * 열 병합 수
   */
  ColSpan: number;

  /**
   * 셀 유형 (0: None, 1: Label, 2: TextBox, 21: NumberBox, 3: Checkbox, 4: Button, 5: ComboBox, 6: Daily, 61: DFromTo, 62: Month, 63: MFromTo, 7: Image)
   */
  Type: enCellType;

  /**
   * 텍스트 정렬 방식 (`"start"`: 왼쪽, `"center"`: 중앙, `"end"`: 오른쪽)
   */
  Align: string;

  /**
   * 다국어 코드
   */
  LanguageCode?: string;

  /**
   * 셀 색상
   */
  Color?: string;

  /**
   * 내부 컨트롤 이름
   */
  ControlName?: string;

}
