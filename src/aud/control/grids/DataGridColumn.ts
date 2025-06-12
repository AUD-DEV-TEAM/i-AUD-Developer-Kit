import { enDataColumnType } from "../../../aud/enums/grid/enDataColumnType";
import { DataColumn } from "../../../aud/data/DataColumn";
import { enDataType } from "../../../aud/enums/comm/enDataType";
import { enSizeType } from "../../../aud/enums/comm/enSizeType";
import { enKeyType } from "../../../aud/enums/comm/enKeyType";
import { FilterCondition } from "../../../aud/control/grids/FilterCondition";
import { enCheckBoxValueType } from "../../../aud/enums/grid/enCheckBoxValueType";
/**
* 그리드의 필드에 대한 정보를 제공합니다.
*/
export interface DataGridColumn{

  /**
   * 필드 표시명
  */
  Caption: string;

  /**
   * 컬럼 타입
  */
  ColumnType: enDataColumnType;

  /**
   * 필드 데이터 객체
  */
  Data: DataColumn;

  /**
   * 필드 데이터 타입
  */
  DataType: enDataType;

  /**
   * 콤보 박스 유형일 때 항목 정의
  */
  DefinedItems: string;

  /**
   * 필드 데이터 수정 가능 여부
  */
  Editable: boolean;

  /**
   * 병합 참조 필드
  */
  FieldForMerge: string;

  /**
   * 데이터 ToolTip 연계 필드 명
  */
  FieldForTooltip: string;

  /**
   * 필드 기능 활성화 여부
  */
  Filterable: boolean;

  /**
   * 데이터 표현식
  */
  Format: string;

  /**
   * 필드의 넓이 유형(0:Pixel/1:Star)
  */
  GridColumnWidthType: enSizeType;

  /**
   * 헤더 정렬 방식(start:왼쪽정렬/center:중앙정렬/end:오른쪽정렬)
  */
  HeaderPosition: string;

  /**
   * 레코드 추가 시 초기 지정값
  */
  InitValue: object;

  /**
   * 필드의 헤더에 체크박스가 있을 경우 체크 유무
  */
  IsCheckBoxAllSelected: enCheckBoxValueType | undefined;

  /**
   * 필드 키 타입
  */
  KeyType: enKeyType;

  /**
   * 다국어 적용 코드
  */
  LanguageCode: string;

  /**
   * 필드의 병합 가능 여부
  */
  Mergeable: boolean;

  /**
   * 필드명
  */
  Name: string;

  /**
   * 필드의 너비 조정 가능 여부
  */
  Resizable: boolean;

  /**
   * 정렬 기능 활성화 여부
  */
  Sortable: boolean;

  /**
   * 데이터 정렬 방식(start:왼쪽정렬/center:중앙정렬/end:오른쪽정렬)
  */
  TextPosition: string;

  /**
   * 필드의 수치데이터 표현 단위
  */
  Unit: number;

  /**
   * 해당 필드의 내보내기 유무
  */
  UseExport: boolean;

  /**
   * 필드 표시 여부
  */
  Visible: boolean;

  /**
   * 필드의 넓이
  */
  Width: number;

  /** 
   * 필터를 추가하는 메소드
   *
  * @param type 필터 타입(0 : Dimension, 1 : Measure)
  * @param operator 비교 연산자(Dimension : [In,NotIn,Between], Measure : [=,>,<,>=,<=,<>])
  * @param value 필터 조건 값
  * @param isAnd AND 인지 OR 인지 유무(필터 타입이 Measure일 경우에만 사용. 기본값은 true)
  */
  AddFilter(type: number, operator: string, value: object, isAnd: boolean): void;

  /** 
   * 컬럼의 데이타 스타일을 삭제해주는 메소드
   *
  */
  ClearBoxStyle(): void;

  /** 
   * 필터 모델 정보를 삭제해준다.(UI로 반영은 Calculate를 호출해줘야만 한다.)
   *
  */
  ClearFilter(): void;

  /** 
   * 컬럼의 실제 사이즈를 반환해주는 메소드
   *
  */
  GetActualWidth(): number;

  /** 
   * 컬럼의 필터정보를 반환해주는 메소드
   *
  */
  GetFilter(): FilterCondition[];

  /** 
   * 컬럼의 데이타 스타일을 적용해주는 메소드
   *
  * @param BoxStyleCode 설정할 BoxStyle의 코드명
  */
  SetBoxStyle(BoxStyleCode: string): void;

  /** 
   * 컬럼의 헤더 스타일을 적용해주는 메소드
   *
  * @param BoxStyleCode 설정할 BoxStyle의 코드명
  */
  SetHeaderBoxStyle(BoxStyleCode: string): void;

  /** 
   * 컬럼의 사이즈를 설정해주는 메소드
   *
  * @param width 설정할 컬럼 사이즈
  */
  SetWidth(width: number): void;

}
