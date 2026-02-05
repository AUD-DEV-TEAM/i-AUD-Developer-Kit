import { Control } from "../../aud/control/Control";
import { PieChartOptions } from "../../aud/control/charts/PieChartOptions";
import { Legend } from "../../aud/control/charts/Legend";
import { PiePlotOptions } from "../../aud/control/charts/PiePlotOptions";
import { PieSeriesInfoCollection } from "../../aud/control/charts/PieSeriesInfoCollection";
import { Title } from "../../aud/control/charts/Title";
import { DataSet } from "../../aud/data/DataSet";
import { Chart } from "../../aud/control/Chart";
/**
* 원형 또는 도넛형 차트를 표현할 수 있는 차트 컨트롤입니다.
*/
export interface PieChart extends Control{

  /**
   * 보고서가 열리면서 자동으로 조회할지 여부를 가져오거나 설정합니다.
  */
  AutoRefresh: boolean;

  /**
   * Pie 차트의 영역과 기본 옵션 정보를 가져옵니다.
  */
  ChartOptions: PieChartOptions;

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
   * 계열별 Pie 차트 종류에 대한 구성 옵션 정보를 가져옵니다.
  */
  PlotOptions: PiePlotOptions;

  /**
   * Pie 차트에 바인딩된 계열의 객체 정보를 가져옵니다.
  */
  SeriesInfo: PieSeriesInfoCollection;

  /**
   * Pie 차트의 제목 옵션 정보를 가져옵니다.
  */
  Title: Title;

  /**
   * Pie 차트에 바인딩된 데이터셋을 초기화합니다.
   *
  */
  ClearDataSet(): DataSet;

  /**
   * Pie 차트의 현재 정보를 기준으로 새로 그립니다.
   *
  */
  Draw(): void;

  /**
   * Pie 차트에 바인딩된 데이터셋을 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /**
   * Pie 차트에 바인딩된 데이터소스 이름을 반환합니다.
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
   * PivotGrid/DataGrid와 데이터 바인딩을 연결합니다.
   *
  * @param name PivotGrid/DataGrid 컨트롤 이름
  */
  SetDataBindGrid(name: string): string;

  /**
   * Pie 차트의 데이터셋을 변경합니다.
   *
  * @param dataset 데이터셋 객체
  */
  SetDataSet(dataset: DataSet): void;

  /**
   * Pie 차트의 데이터소스를 변경합니다.
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
   * @param sender 이벤트가 발생한 Pie 차트 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link PieChart}
  */
  OnDataBindEnd : (sender : PieChart
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
   * 원형 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 Pie 차트 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link PieChart}
  */
  OnDataPointClick : (sender : PieChart
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 시리즈 이름
    */
    Series: string
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
    /**
     * 포인트 영역 색상
    */
    PointColor: string
  }
  ) => void;


}
