import { Control } from "../../aud/control/Control";
import { SliderStyle } from "../../aud/control/slider/SliderStyle";
/**
* 슬라이더 컨트롤 입니다.
*/
export interface Slider extends Control{

  /**
   * 데이터 포멧
  */
  Format: string;

  /**
   * 핸들의 시작 위치값
  */
  From: number;

  /**
   * 그리드 셀의 개수
  */
  GridNum: number;

  /**
   * 읽기전용
  */
  IsReadOnly: boolean;

  /**
   * 최대값
  */
  Max: number;

  /**
   * 최소값
  */
  Min: number;

  /**
   * 시작/종료 위치값 표시 여부
  */
  ShowFromTo: number;

  /**
   * 최소/최대값 표시 여부
  */
  ShowMinMax: number;

  /**
   * 스킨
  */
  Skin: string;

  /**
   * 핸들 이동 스텝 단위
  */
  Step: number;

  /**
   * 핸들의 종료 위치값
  */
  To: number;

  /**
   * 그리드 표시 여부
  */
  UseGrid: boolean;

  /**
   * Shadow 스타일 사용 여부
  */
  UseShadow: boolean;

  /**
   * 핸들의 종료 위치 사용 여부
  */
  UseToPoint: boolean;

  /**
   * 슬라이더 스타일
  */
  sliderStyle: SliderStyle;

  /**
   * @event 
   *
   * 슬라이더 컨트롤의 핸들을 드래그하는 동안 발생합니다.
   *
   * @param args
   *
   * Target : {@link Slider}
  */
  OnChange : (sender : Slider
  , args : { 
    /**
     * 컨트롤이름
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
   * 슬라이더 컨트롤의 핸들 드래그를 완료할때 발생합니다.
   *
   * @param args
   *
   * Target : {@link Slider}
  */
  OnFinish : (sender : Slider
  , args : { 
    /**
     * 컨트롤이름
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
