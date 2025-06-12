import { IDrawingArea } from "../../../aud/control/igrids/IDrawingArea";
import { IValValidator } from "../../../aud/control/igrids/IValValidator";
/**
* MX-GRID 셀의 모델
*/
export interface ICell{

  /**
   * 셀이 실제 그려진 영역
  */
  BoundRectangle: IDrawingArea;

  /**
   * 셀의 열번호
  */
  C: number;

  /**
   * 폰트 색상
  */
  Color: string;

  /**
   * 셀을 사용자가 수정 가능하지 여부
  */
  Editable: boolean;

  /**
   * 셀 유효성 오류 정보
  */
  Error: IValValidator;

  /**
   * 셀의 수식 (디자인 모드에서만 출력)
  */
  Formula: string;

  /**
   * 수식에서 참조하는 셀인지 여부
  */
  IsFormulaRef: boolean;

  /**
   * 입력 마스크 포멧
  */
  MaskFormat: string;

  /**
   * 셀이 병합의 자식인 경우 해당 부모 셀의 주소값
  */
  MergeRef: string;

  /**
   * 셀 병합 여부
  */
  Merged: boolean;

  /**
   * 셀의 행 번호
  */
   readonly R: number;

  /**
   * 셀의 주소 값
  */
  Range: string;

  /**
   * 셀의 표시 테스트
  */
  Text: string;

  /**
   * 셀의 데이터 타입 
    String=0,
    Number=1,
    Empty=-1,
    Date=2,
    Bool=3,
    Error=-9,
  */
  Type: number;

  /**
   * 셀의 입력 Validator 인덱스
  */
  Validator: number;

  /**
   * 셀의 값
  */
  Value: string|number|null;

  /**
   * 셀의 스타일 이름
  */
  class: string;

  /**
   * 셀의 열 방향 병합정보
  */
  colspan: number;

  /**
   * 셀의 행 방향 병합정보
  */
  rowspan: number;

}
