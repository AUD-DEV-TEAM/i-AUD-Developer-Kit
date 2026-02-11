import { Control } from "@AUD_CLIENT/control/Control";
import { ListView } from "@AUD_CLIENT/ext/listview/ListView";
import { GeoMap } from "@AUD_CLIENT/ext/geomap/GeoMap";
import { ScheduleGrid } from "@AUD_CLIENT/ext/schedule/ScheduleGrid";
import { BoxStyle } from "@AUD_CLIENT/drawing/BoxStyle";
import { Property } from "@AUD_CLIENT/ext/Property";
import { SmartEditor } from "@AUD_CLIENT/ext/SmartEditor";
import { WebEditor } from "@AUD_CLIENT/ext/WebEditor";
import { BaseControl } from "@AUD_CLIENT/ext/BaseControl";
/**
 * 외부 컴포넌트 라이브러리를 로드하여 표시하는 컨트롤입니다.
 *
 * {@link ClassName}에 지정된 클래스를 동적으로 로드하고, 로드 완료 후 {@link OnComponentClassLoaded} 이벤트가 발생합니다.
 */
export interface AddIn extends Control{

  /**
   * 로드할 컴포넌트의 클래스 이름을 가져오거나 설정합니다.
  */
  ClassName: string;

  /**
   * 로드된 라이브러리의 컴포넌트 객체를 반환합니다.
   *
  * @param clsName 컴포넌트 클래스 이름
  */
  getScriptClass(clsName: string): ListView|GeoMap|ScheduleGrid|BoxStyle|Property|SmartEditor|WebEditor |BaseControl | null;

  /**
   * @event
   *
   * 로드된 라이브러리의 컴포넌트 객체가 생성된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 AddIn 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link AddIn}
  */
  OnComponentClassLoaded : (sender : AddIn
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
  }
  ) => void;


}
