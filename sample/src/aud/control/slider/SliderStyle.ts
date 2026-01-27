/**
* Slider 컨트롤의 스타일 객체입니다.
*/
export interface SliderStyle{

  /**
   * Active Data Label의 배경 색
  */
  ActiveDataLabelBackgroundColor: string;

  /**
   * Active Data Label의 폰트 색
  */
  ActiveDataLabelTextColor: string;

  /**
   * Active Data Label의 폰트 종류
  */
  ActiveDataLabelTextFont: string;

  /**
   * Active Data Label의 폰트 크기
  */
  ActiveDataLabelTextSize: string;

  /**
   * Bar 배경 색
  */
  BarBackground: string;

  /**
   * From / To Data Label의 배경 색
  */
  FromToDataLabelBackgroundColor: string;

  /**
   * From / To Data Label의 폰트 색
  */
  FromToDataLabelTextColor: string;

  /**
   * From / To Data Label의 폰트 종류
  */
  FromToDataLabelTextFont: string;

  /**
   * From / To Data Label의 폰트 크기
  */
  FromToDataLabelTextSize: string;

  /**
   * Grid 색
  */
  GridColor: string;

  /**
   * Grid 폰트 종류
  */
  GridTextFont: string;

  /**
   * Grid 폰트 크기
  */
  GridTextSize: string;

  /**
   * Handle의 Border 색
  */
  HandleBorderColor: string;

  /**
   * Handle 배경 색
  */
  HandleColor: string;

  /**
   * Handle의 마우스 오버 했을 때의 배경 색
  */
  HoverHandleColor: string;

  /**
   * Line 배경 색
  */
  LineBackground: string;

  /**
   * Shadow 색
  */
  ShadowColor: string;

  /** 
   * Slider의 스타일을 초기화시킵니다.
   *
   * @example
   * ```js
   * Button.OnClick = function(s, e){
   *     Slider.sliderStyle.Clear();
   * }
   * ```
  */
  Clear(): void;

}
