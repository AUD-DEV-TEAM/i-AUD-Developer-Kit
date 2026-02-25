import { Control } from "@AUD_CLIENT/control/Control";
import { ListView } from "@AUD_CLIENT/ext/listview/ListView";
import { GeoMap } from "@AUD_CLIENT/ext/geomap/GeoMap";
import { ScheduleGrid } from "@AUD_CLIENT/ext/schedule/ScheduleGrid";
import { BoxStyle } from "@AUD_CLIENT/drawing/BoxStyle";
import { Property } from "@AUD_CLIENT/ext/Property";
import { SmartEditor } from "@AUD_CLIENT/ext/SmartEditor";
import { WebEditor } from "@AUD_CLIENT/ext/WebEditor";
import { BaseControl } from "@AUD_CLIENT/ext/BaseControl";
import { GridHtmlView } from "@AUD_CLIENT/ext/GridHtmlView";
import { CodeEditor } from "@AUD_CLIENT/ext/CodeEditor";

/**
 * 외부 컴포넌트 라이브러리를 로드하여 표시하는 컨트롤입니다.
 *
 * `Matrix.getObject()`로 AddIn 타입 컨트롤을 가져오면 이 래퍼 객체가 반환됩니다.
 * {@link ClassName}에 지정된 클래스를 비동기로 로드하고, 로드 완료 후 {@link OnComponentClassLoaded} 이벤트가 발생합니다.
 * 컴포넌트는 비동기로 로딩되므로, 반드시 {@link OnComponentClassLoaded} 이벤트 안에서
 * {@link getScriptClass}를 호출하여 실제 컴포넌트에 접근하세요.
 *
 * @example
 * ```ts
 * // BaseControl 컴포넌트 접근
 * let addIn = Matrix.getObject("myCtrl") as AddIn;
 * addIn.OnComponentClassLoaded = function(sender, args) {
 *     let ctrl = addIn.getScriptClass() as BaseControl;
 *     ctrl.addCSS('.card { padding: 10px; }');
 *     ctrl.addHTML('<div class="card">내용</div>');
 * };
 *
 * // GridHtmlView 컴포넌트 접근
 * let addIn2 = Matrix.getObject("myView") as AddIn;
 * addIn2.OnComponentClassLoaded = function(sender, args) {
 *     let view = addIn2.getScriptClass() as GridHtmlView;
 *     view.DataGrid = Matrix.getObject("GRD") as DataGrid;
 *     view.HTML = '<div aud-for="ROWS"><span aud-bind="NAME"></span></div>';
 * };
 * ```
 */
export interface AddIn extends Control{

  /**
   * 로드할 컴포넌트의 클래스 이름을 가져오거나 설정합니다.
  */
  ClassName: string;

  /**
   * 로드된 라이브러리의 실제 컴포넌트 객체를 반환합니다.
   *
   * AddIn은 BaseControl, GridHtmlView 등의 컴포넌트를 감싸는 래퍼입니다.
   * 이 메서드로 내부 컴포넌트에 접근하여 addCSS, addHTML, DataGrid 등
   * 컴포넌트 고유 API를 사용할 수 있습니다.
   *
   * **주의**: 컴포넌트는 비동기 로딩되므로, 반드시 `OnComponentClassLoaded` 이벤트 안에서 호출하세요.
   * 이벤트 밖에서 호출하면 컴포넌트가 아직 로딩되지 않아 null이 반환될 수 있습니다.
   *
   * @returns 내부 컴포넌트 객체 (BaseControl, GridHtmlView 등). 컴포넌트가 아직 로드되지 않았으면 null
   *
   * @example
   * ```ts
   * let addIn = Matrix.getObject("myCtrl") as AddIn;
   * addIn.OnComponentClassLoaded = function(sender, args) {
   *     // BaseControl 접근
   *     let ctrl = addIn.getScriptClass() as BaseControl;
   *     ctrl.addCSS('.title { font-weight: bold; }');
   *     ctrl.addHTML('<h1 class="title">제목</h1>');
   * };
   * ```
  */
  getScriptClass(): ListView|GeoMap|ScheduleGrid|BoxStyle|Property|SmartEditor|WebEditor |BaseControl |GridHtmlView | 
CodeEditor| null;

  /**
   * @event
   *
   * 로드된 라이브러리의 컴포넌트 객체가 생성된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 AddIn 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link AddIn}
   *
   * @example
   * ```ts
   * let addIn = Matrix.getObject("myCtrl") as AddIn;
   * addIn.OnComponentClassLoaded = function(sender, args) {
   *     let ctrl = addIn.getScriptClass() as BaseControl;
   *     ctrl.addHTML('<div>컴포넌트 준비 완료</div>');
   * };
   * ```
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
