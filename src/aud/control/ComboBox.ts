import { Control } from "../../aud/control/Control";
import { enInitType } from "../../aud/enums/comm/enInitType";
import { enRefreshType } from "../../aud/enums/comm/enRefreshType";
import { DataSet } from "../../aud/data/DataSet";
/**
 * 목록에서 단일 값을 선택할 수 있는 콤보박스 컨트롤입니다.
 */
export interface ComboBox extends Control{

  /**
   * 초기값 유형을 가져오거나 설정합니다.
  */
  InitType: enInitType;

  /**
   * 초기값을 가져오거나 설정합니다.
  */
  InitValue: string;

  /**
   * 읽기 전용 여부를 가져오거나 설정합니다.
  */
  IsReadOnly: boolean;

  /**
   * 콤보박스에 연결된 항목의 수를 가져옵니다.
  */
   readonly ItemCount: number;

  /**
   * 컨트롤의 왼쪽 여백(px)을 가져오거나 설정합니다. (기본값: `6`)
  */
  PaddingLeft: number;

  /**
   * 데이터 조회 방식을 가져오거나 설정합니다.
  */
  RefreshType: enRefreshType;

  /**
   * 현재 선택된 항목의 인덱스를 가져오거나 설정합니다.
  */
  SelectedIndex: number;

  /**
   * 현재 선택된 항목의 표시 텍스트를 가져오거나 설정합니다.
  */
  Text: string;

  /**
   * "전체" 항목 사용 여부를 가져오거나 설정합니다.
  */
  UseAllItems: boolean;

  /**
   * 모든 항목이 선택되었을 때 캡션에 표시할 텍스트를 가져오거나 설정합니다.
  */
  UseAllItemsText: string;

  /**
   * 현재 선택된 항목의 값을 가져오거나 설정합니다.
  */
  Value: string;

  /**
   * 항목을 추가합니다.
   *
  * @param value 항목 값
  * @param name 항목 표시 텍스트
  */
  AddItem(value: string, name: string): void;

  /**
   * 컨트롤에 바인딩된 데이터셋을 초기화합니다.
   *
  */
  ClearDataSet(): void;

  /**
   * 컨트롤의 데이터를 모두 삭제합니다.
   *
  */
  ClearValue(): void;

  /**
   * 컨트롤에 바인딩된 데이터셋 객체를 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /**
   * 컨트롤에 데이터셋 객체를 바인딩합니다.
   *
  * @param ds 데이터셋 객체
  */
  SetDataSet(ds: DataSet): void;

  /**
   * 지정한 이름의 데이터소스를 바인딩합니다.
   *
  * @param name 데이터소스 이름
  */
  SetDataSourceName(name: string): void;

  /**
   * @event
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 콤보박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link ComboBox}
  */
  OnDataBindEnd : (sender : ComboBox
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터셋의 레코드 수
    */
    RecordCount: number
  }
  ) => void;


  /**
   * @event
   *
   * 콤보박스의 선택 값이 변경될 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 콤보박스 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link ComboBox}
  */
  OnValueChanged : (sender : ComboBox
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 선택된 값
    */
    Value: string
    /**
     * 선택된 항목의 인덱스
    */
    SelectedIndex: number
  }
  ) => void;


}
