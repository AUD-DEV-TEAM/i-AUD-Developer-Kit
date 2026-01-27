import { enChartType } from "../../../aud/enums/chart/enChartType";
/**
* Pie 차트의 영역과 기본적인 옵션 정보를 제공 합니다.
*/
export interface PieChartOptions{

  /**
   * 차트 유형
  */
  ChartType: enChartType;

  /**
   * 툴팁 기능 활성화 여부
  */
  Tooltip: boolean;

  /**
   * Tooltip 수식
  */
  TooltipFormatter: string;

  /**
   * DOC export 사용 여부
  */
  UseDOCExport: boolean;

  /**
   * 디자인 메뉴 사용 여부
  */
  UseDesignMenu: boolean;

  /**
   * Excel export 사용 여부
  */
  UseExcelExport: boolean;

  /**
   * HML export 사용 여부
  */
  UseHMLExport: boolean;

  /**
   * PPT export 사용 여부
  */
  UsePPTExport: boolean;

  /** 
   * 계열별 색상을 지정합니다.
   *
   * @example
   * ```js
   * //차트의 팔렛트 색상을 업데이트 합니다.
   * var Chart = Matrix.getObject("Chart"); 
   * var colors = ["#CCE8C8","#8DD0D0","#4BB9D6","#3495C6","#2B6FAE","#234797","#191E80","#111558"];
   * Chart.ChartOptions.SetCustomPalette(colors);
   * Chart.Draw(();
   * ```
  * @param pltt 색상코드를 string array 형태로 지정
  */
  SetCustomPalette(pltt: string[]): void;

}
