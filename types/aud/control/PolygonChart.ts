import { Control } from "../../aud/control/Control";
import { ChartOptions } from "../../aud/control/charts/ChartOptions";
import { Legend } from "../../aud/control/charts/Legend";
import { PaneOption } from "../../aud/control/charts/PaneOption";
import { PlotOptions } from "../../aud/control/charts/PlotOptions";
import { PolygonSeriesInfoCollection } from "../../aud/control/charts/PolygonSeriesInfoCollection";
import { Title } from "../../aud/control/charts/Title";
import { XAxis } from "../../aud/control/charts/XAxis";
import { YAxis } from "../../aud/control/charts/YAxis";
import { PolygonSeries } from "../../aud/control/charts/PolygonSeries";
import { DataSet } from "../../aud/data/DataSet";
import { Chart } from "../../aud/control/Chart";
/**
* Polygon, Polar 유형의 차트를 표현할 수 있는 차트 컨트롤입니다.
*/
export interface PolygonChart extends Control{

  /**
   * 보고서가 열리면서 자동으로 조회할지 여부를 가져오거나 설정합니다.
  */
  AutoRefresh: boolean;

  /**
   * 차트의 영역과 기본 옵션 정보를 가져옵니다.
  */
  ChartOptions: ChartOptions;

  /**
   * 내보내기 활성화 여부를 가져오거나 설정합니다.
  */
  DoExport: boolean;

  /**
   * 전체 조회 동작에서 조회 대상인지 여부를 가져오거나 설정합니다.
  */
  DoRefresh: boolean;

  /**
   * 범례에 대한 정보를 가져옵니다.
  */
  Legend: Legend;

  /**
   * 데이터가 표현되는 포인트의 전체 영역에 대한 정보를 가져옵니다.
  */
  PaneOption: PaneOption;

  /**
   * Polygon 차트의 데이터 표시 영역에 대한 정보를 가져옵니다.
  */
  PlotOptions: PlotOptions;

  /**
   * 차트에 바인딩된 계열의 객체 정보를 가져옵니다.
  */
  SeriesInfo: PolygonSeriesInfoCollection;

  /**
   * 차트의 제목 옵션 정보를 가져옵니다.
  */
  Title: Title;

  /**
   * X축에 대한 정보를 가져옵니다.
  */
  XAxis: XAxis;

  /**
   * Y1축에 대한 정보를 가져옵니다.
  */
  Y1Axis: YAxis;

  /**
   * 차트의 계열을 추가합니다.
   *
  */
  AddSeries(): PolygonSeries;

  /**
   * 차트에 바인딩된 데이터셋을 초기화합니다.
   *
  */
  ClearDataSet(): DataSet;

  /**
   * 차트의 계열을 전부 삭제합니다.
   *
  */
  ClearSeries(): void;

  /**
   * 차트의 현재 정보를 기준으로 새로 그립니다.
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
  * @param range 엑셀 시트의 표시 시작 위치 (예: A5:J11)
  */
  GetExcelExportJSON(range: string): string;

  /**
   * 차트의 계열을 삭제합니다.
   *
  * @param seriesName 삭제할 계열 이름
  */
  RemoveSeries(seriesName: string): void;

  /**
   * PivotGrid/DataGrid와 데이터 바인딩을 연결합니다.
   *
  * @param name PivotGrid/DataGrid 컨트롤 이름
  */
  SetDataBindGrid(name: string): string;

  /**
   * 차트의 데이터셋을 변경합니다.
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
   * Base64 인코딩된 이미지 결과를 반환합니다.
   *
  * @param callback 이미지 변환 완료 후 호출되는 콜백 함수
  */
  getBase64Image(callback: (value:string) => void): void;

  /**
   * @event
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 방사형 차트 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link PolygonChart}
  */
  OnDataBindEnd : (sender : PolygonChart
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
   * 방사형 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 방사형 차트 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link PolygonChart}
  */
  OnDataPointClick : (sender : PolygonChart
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
     * 시리즈 이름
    */
    Series: string
    /**
     * 시리즈 레이블
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
