import { Control } from "../../aud/control/Control";
import { ChartOptions } from "../../aud/control/charts/ChartOptions";
import { Legend } from "../../aud/control/charts/Legend";
import { PlotOptions } from "../../aud/control/charts/PlotOptions";
import { Title } from "../../aud/control/charts/Title";
import { XAxis } from "../../aud/control/charts/XAxis";
import { YAxis } from "../../aud/control/charts/YAxis";
import { Series } from "../../aud/control/charts/Series";
import { DataSet } from "../../aud/data/DataSet";
import { NamedDictionary } from "@AUD_CLIENT/data/NamedDictionary";
/**
 * 다양한 종류의 차트를 표현할 수 있는 차트 컨트롤입니다.
 */
export interface Chart extends Control{

  /**
   * 보고서가 열리면서 자동으로 데이터를 조회할지 여부를 가져오거나 설정합니다.
  */
  AutoRefresh: boolean;

  /**
   * 차트의 영역 및 기본 옵션 정보를 가져옵니다.
  */
  ChartOptions: ChartOptions;

  /**
   * 내보내기 대상 여부를 가져오거나 설정합니다.
  */
  DoExport: boolean;

  /**
   * 전체 Refresh 동작에서 조회 대상 여부를 가져오거나 설정합니다.
  */
  DoRefresh: boolean;

  /**
   * 범례 정보를 가져옵니다.
  */
  Legend: Legend;

  /**
   * 계열별 차트 유형에 대한 플롯 옵션 정보를 가져옵니다.
  */
  PlotOptions: PlotOptions;

  /**
   * 차트에 바인딩된 계열 정보 컬렉션을 가져옵니다.
  */
  SeriesInfo: NamedDictionary<Series>;

  /**
   * 차트의 제목 옵션 정보를 가져옵니다.
  */
  Title: Title;

  /**
   * X축 정보를 가져옵니다.
  */
  XAxis: XAxis;

  /**
   * Y1축 정보를 가져옵니다.
  */
  Y1Axis: YAxis;

  /**
   * Y2축 정보를 가져옵니다.
  */
  Y2Axis: YAxis;

  /**
   * 차트에 계열을 추가하고, 추가된 계열을 반환합니다.
   *
  */
  AddSeries(): Series;

  /**
   * 차트에 바인딩된 데이터셋을 초기화합니다.
   *
  */
  ClearDataSet(): DataSet;

  /**
   * 차트의 계열을 모두 삭제합니다.
   *
  */
  ClearSeries(): void;

  /**
   * 차트의 현재 정보를 기준으로 다시 그립니다.
   *
  */
  Draw(): void;

  /**
   * 차트에 바인딩된 데이터셋을 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /**
   * 차트에 바인딩된 데이터소스 이름을 반환합니다.
   *
  */
  GetDataSourceName(): string;

  /**
   * 엑셀 내보내기를 위한 JSON 정보를 반환합니다.
   *
  * @param range 엑셀 시트의 표시 시작 위치 (예: `"A5:J11"`)
  */
  GetExcelExportJSON(range: string): string;

  /**
   * 지정한 이름의 계열을 삭제합니다.
   *
  * @param seriesName 삭제할 계열 이름
  */
  RemoveSeries(seriesName: string): void;

  /**
   * PivotGrid 또는 DataGrid와 데이터 바인드를 연결합니다.
   *
  * @param name PivotGrid 또는 DataGrid 컨트롤 이름
  */
  SetDataBindGrid(name: string): string;

  /**
   * 차트의 데이터셋을 설정합니다.
   *
  * @param dataset 데이터셋 객체
  */
  SetDataSet(dataset: DataSet): void;

  /**
   * 차트의 데이터소스를 변경합니다.
   *
  * @param name 변경할 데이터소스 이름
  */
  SetDataSourceName(name: string): void;

  /**
   * 차트를 Base64 인코딩된 이미지로 변환하여 반환합니다.
   *
  * @param callback 이미지 변환 완료 후 호출되는 콜백 함수 (인자: Base64 문자열)
  */
  getBase64Image(callback: (value:string) => void): void;

  /**
   * @event
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 차트 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Chart}
  */
  OnDataBindEnd : (sender : Chart
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
   * 차트의 데이터 포인트를 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 차트 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Chart}
  */
  OnDataPointClick : (sender : Chart
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 계열 유형
    */
    Type: number
    /**
     * 계열 이름
    */
    Series: string
    /**
     * 계열 라벨
    */
    Label: string
    /**
     * 포인트 이름
    */
    Point: string
    /**
     * 포인트 값
    */
    Value: number
    /**
     * 포인트 인덱스
    */
    PointIndex: number
  }
  ) => void;


}
