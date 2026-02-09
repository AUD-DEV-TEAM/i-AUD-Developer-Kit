import { Control } from "../../aud/control/Control";
import { SliderStyle } from "../../aud/control/slider/SliderStyle";
/**
* 슬라이더 컨트롤입니다.
*/
export interface Slider extends Control{

  /**
   * 데이터 포맷을 가져오거나 설정합니다.
  */
  Format: string;

  /**
   * 핸들의 시작 위치값을 가져오거나 설정합니다.
  */
  From: number;

  /**
   * 그리드 셀의 개수를 가져오거나 설정합니다.
  */
  GridNum: number;

  /**
   * 읽기 전용 여부를 가져오거나 설정합니다.
  */
  IsReadOnly: boolean;

  /**
   * 최대값을 가져오거나 설정합니다.
  */
  Max: number;

  /**
   * 최소값을 가져오거나 설정합니다.
  */
  Min: number;

  /**
   * 시작/종료 위치값 표시 여부를 가져오거나 설정합니다.
  */
  ShowFromTo: number;

  /**
   * 최소/최대값 표시 여부를 가져오거나 설정합니다.
  */
  ShowMinMax: number;

  /**
   * 스킨을 가져오거나 설정합니다.
  */
  Skin: string;

  /**
   * 핸들 이동 스텝 단위를 가져오거나 설정합니다.
  */
  Step: number;

  /**
   * 핸들의 종료 위치값을 가져오거나 설정합니다.
  */
  To: number;

  /**
   * 그리드 표시 여부를 가져오거나 설정합니다.
  */
  UseGrid: boolean;

  /**
   * Shadow 스타일 사용 여부를 가져오거나 설정합니다.
  */
  UseShadow: boolean;

  /**
   * 핸들의 종료 위치 사용 여부를 가져오거나 설정합니다.
  */
  UseToPoint: boolean;

  /**
   * 슬라이더 스타일을 가져옵니다.
  */
  sliderStyle: SliderStyle;

  /**
   * @event
   *
   * 슬라이더 컨트롤의 핸들을 드래그하는 동안 발생합니다.
   *
   * @param sender 이벤트가 발생한 슬라이더 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Slider}
  */
  OnChange : (sender : Slider
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 최소값
    */
    Min: number
    /**
     * 최대값
    */
    Max: number
    /**
     * 핸들의 시작 위치값
    */
    From: number
    /**
     * 핸들의 종료 위치값
    */
    To: number
  }
  ) => void;


  /**
   * @event
   *
   * 슬라이더 컨트롤의 핸들 드래그를 완료할 때 발생합니다.
   *
   * @param sender 이벤트가 발생한 슬라이더 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link Slider}
  */
  OnFinish : (sender : Slider
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 최소값
    */
    Min: number
    /**
     * 최대값
    */
    Max: number
    /**
     * 핸들의 시작 위치값
    */
    From: number
    /**
     * 핸들의 종료 위치값
    */
    To: number
  }
  ) => void;


}
