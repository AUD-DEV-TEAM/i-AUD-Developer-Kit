import { Control } from "../../aud/control/Control";
import { ChartOptions } from "../../aud/control/charts/ChartOptions";
import { ExtraSeriesInfoCollection } from "../../aud/control/charts/ExtraSeriesInfoCollection";
import { NamedDictionary } from "../../aud/data/NamedDictionary";
import { Legend } from "../../aud/control/charts/Legend";
import { PlotOptions } from "../../aud/control/charts/PlotOptions";
import { Title } from "../../aud/control/charts/Title";
import { XAxis } from "../../aud/control/charts/XAxis";
import { YAxis } from "../../aud/control/charts/YAxis";
import { ExtraSeries } from "../../aud/control/charts/ExtraSeries";
import { DataSet } from "../../aud/data/DataSet";
import { Chart } from "../../aud/control/Chart";
/**
* Scatter 유형의 차트를 표현할 수 있습니다.
*/
export interface ScatterChart extends Control{

  /**
   * 보고서가 열리면서 자동으로 Refresh를 할지 여부
  */
  AutoRefresh: boolean;

  /**
   * Scatter 차트의 영역과 기본적인 옵션 정보를 제공
  */
  ChartOptions: ChartOptions;

  /**
   * 내보내기 활성화 여부
  */
  DoExport: boolean;

  /**
   * 전체 Refresh 동작에서 Refresh 대상인지 여부
  */
  DoRefresh: boolean;

  /**
   * Scatter 차트에 바인딩된 계열의 객체 정보를 제공
  */
  ExtraSeriesInfo: ExtraSeriesInfoCollection;

  /**
   * Scatter 차트의 데이터셋 필드 정보
  */
  FieldInfo: NamedDictionary;

  /**
   * 범례 대한 정보를 제공
  */
  Legend: Legend;

  /**
   * 계열별 차트 종류에 대한 구성 객체의 레퍼객체 정보를 제공
  */
  PlotOptions: PlotOptions;

  /**
   * Scatter 차트의 제목 옵션 정보를 제공
  */
  Title: Title;

  /**
   * X축에 대한 정보를 제공
  */
  XAxis: XAxis;

  /**
   * Y1축에 대한 정보를 제공
  */
  Y1Axis: YAxis;

  /**
   * Y2축에 대한 정보를 제공
  */
  Y2Axis: YAxis;

  /** 
   * 차트의 계열을 추가합니다.
   *
  */
  AddSeries(): ExtraSeries;

  /** 
   * Scatter 차트에 바인딩된 데이터셋을 초기화합니다.
   *
  */
  ClearDataSet(): DataSet;

  /** 
   * 차트의 계열을 전부 삭제합니다.
   *
  */
  ClearSeries(): void;

  /** 
   * Scatter 차트의 현재 정보를 기준으로 새로 그립니다.
   *
  */
  Draw(): void;

  /** 
   * Scatter 차트에 바인딩된 데이터셋을 반환합니다.
   *
  */
  GetDataSet(): DataSet;

  /** 
   * Scatter 차트에 바인딩된 데이터소스 명을 반환합니다.
   *
  */
  GetDataSourceName(): string;

  /** 
   * 엑셀 Export를 위한 JSON 정보를 반환합니다.
   *
  * @param range 엑셀 시트의 표시 시작 위치(eg.A5:J11)
  */
  GetExcelExportJSON(range: string): string;

  /** 
   * 차트의 계열을 삭제합니다.
   *
  * @param seriesName 삭제할 계열명
  */
  RemoveSeries(seriesName: string): void;

  /** 
   * Scatter 차트의 데이터셋을 변경합니다.
   *
  * @param dataset 데이터셋 객체
  */
  SetDataSet(dataset: DataSet): void;

  /** 
   * Scatter 차트의 데이터소스을 변경합니다.
   *
  * @param name 변경할 데이터소스 명
  */
  SetDataSourceName(name: string): void;

  /** 
   * base64 encoding된 이미지 결과를 반환 합니다.
   *
  * @param callback 이미지 변환 완료 후 함수
  * ```
  *  
  *               function(base64ext){
  * 
  *               }	
  * ```
  */
  getBase64Image(callback: (value:string) => void): void;

  /**
   * @event 
   *
   * 컨트롤에 데이터셋이 바인딩된 후 발생합니다.
   *
   * @param args
   *
  */
  OnDataBindEnd : (sender : ScatterChart
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
   * 분산형/거품형 차트 컨트롤의 데이터 포인트를 클릭할 때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Chart}
  */
  OnDataPointClick : (sender : ScatterChart
  , args : { 
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 차트 종류
    */
    Type: number
    /**
     * 시리즈 명
    */
    Series: string
    /**
     * X값 필드 명
    */
    PointX: string
    /**
     * Y값 필드 명
    */
    PointY: string
    /**
     * Z값 필드 명(거품형의 경우)
    */
    PointZ: string
    /**
     * Label값 필드 명
    */
    PointLabel: string
    /**
     * X 값
    */
    ValueX: number
    /**
     * Y 값
    */
    ValueY: number
    /**
     * Z 값(거품형의 경우)
    */
    ValueZ: number
    /**
     * Label 값
    */
    ValueLabel: number
    /**
     * 포인트 인덱스
    */
    PointIndex: number
  }
  ) => void;


}
