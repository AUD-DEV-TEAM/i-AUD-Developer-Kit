import { Control } from "../../aud/control/Control";
import { enInitType } from "../../aud/enums/comm/enInitType";
import { enRefreshType } from "../../aud/enums/comm/enRefreshType";
import { DataSet } from "../../aud/data/DataSet";
/**
* 콤보박스 컨트롤로 사용자에게 목록을 제시하고 그중에서 단일값을 선택할 수 있도록 합니다.
*/
export interface ComboBox extends Control{

  /**
   * 초기값 유형
  */
  InitType: enInitType;

  /**
   * 초기값
  */
  InitValue: string;

  /**
   * 읽기전용
  */
  IsReadOnly: boolean;

  /**
   * 콤보박스에 연결된 항목의 개수입니다.
  */
   readonly ItemCount: number;

  /**
   * 컨트롤의 PaddingLeft(default: 6)
  */
  PaddingLeft: number;

  /**
   * 데이터 조회 방식
  */
  RefreshType: enRefreshType;

  /**
   * 현재 선택된 항목의 인덱스입니다.
  */
  SelectedIndex: number;

  /**
   * 현재 선택된 항목의 캡션입니다.
  */
  Text: string;

  /**
   * 전체 노드 사용 여부
  */
  UseAllItems: boolean;

  /**
   * 값이  true일 경우, 콤보박스의 모든 항목이 선택되었을 때에는 "전체"라는 텍스트가 캡션에 표시됩니다.
  */
  UseAllItemsText: string;

  /**
   * 현재 선택된 항목의 값입니다.
  */
  Value: string;

  /** 
   * 항목을 추가합니다.
   *
  * @param value 값
  * @param name 텍스트
  */
  AddItem(value: string, name: string): void;

  /** 
   * 컨트롤에 바인딩 된 데이터셋을 초기화합니다.
   *
  */
  ClearDataSet(): void;

  /** 
   * 컨트롤의 데이터를 모두 삭제합니다.
   *
  */
  ClearValue(): void;

  /** 
   * 컨트롤에 바인딩 된 데이터셋 객체를 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /** 
   * 컨트롤에 데이터셋 객체를 바인딩 합니다.
   *
  * @param ds 데이터셋 객체
  */
  SetDataSet(ds: DataSet): void;

  /** 
   * 주어진 이름의 데이터 소스를 바인딩 합니다.
   *
  * @param name 데이터 소스 명
  */
  SetDataSourceName(name: string): void;

  /**
   * @event 
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param args
   *
   * Target : {@link ComboBox}
  */
  OnDataBindEnd : (sender : ComboBox
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 데이터셋의 레코드 수량
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event 
   *
   * 콤보박스 컨트롤의 값이 변경될때 발생합니다.
   *
   * @param args
   *
   * Target : {@link ComboBox}
  */
  OnValueChanged : (sender : ComboBox
  , args : { 
    /**
     * 컨트롤이름
    */
    Id: string
    /**
     * 컨트롤 값
    */
    Value: string
    /**
     * 선택된 값의 인덱스
    */
    SelectedIndex: number
  }
  ) => void;


}
