import { TooltipStyle } from "../../../aud/ext/geomap/TooltipStyle";
/**
* Tooltip 객체
*/
export interface Tooltip{

  /**
   * Tooltip이 표시되는지 여부
  */
   readonly IsHide: boolean;

  /**
   * Tooltip의 스타일 객체입니다.
  */
  Style: TooltipStyle;

  /** 
   * Tooltip 객체를 삭제합니다.
   *
   * @example
   * ```js
   * // toolTip 객체 생성 //
   * var toolTip = map.createTooltip();
   * 
   * Button.OnClick = function(s, e) {
   *     if(toolTip) toolTip.delete();
   * }
   * ```
  */
  delete(): void;

  /** 
   * 현재 표시되고 있는 Tooltip을 숨깁니다.
   *
   * @example
   * ```js
   * // toolTip 객체 생성 //
   * var toolTip = map.createTooltip();
   * 
   * Button.OnClick = function(s, e) {
   *     if(!toolTip.IsHide) toolTip.hide();
   * }
   * ```
  */
  hide(): void;

  /** 
   * Tooltip에 표시할 텍스트를 지정합니다.
   *
   * @example
   * ```js
   * // toolTip 객체 생성 //
   * var toolTip = map.createTooltip();
   * 
   * map.OnFeatureMouseOver = function(args){
   *     var feature = args.feature;
   *     
   *     if(feature && toolTip){
   *         var label = feature.get('LABEL');
   *         var text = '';
   * 
   *         switch(label){
   *             case '서울특별시':
   *                 text = label + ' 은 대한민국의 수도입니다.';
   *             break;
   *             
   *             case '제주특별자치도':
   *                 text = label + ' 은 비행기로 1시간 거리입니다.';
   *             break;
   *         }
   *         
   *         toolTip.setText(text);
   *     }
   * }
   * ```
  * @param text Tooltip에 표시할 텍스트를 입력합니다.
  */
  setText(text: string): void;

  /** 
   * Tooltip을 화면에 표시합니다.
   *
   * @example
   * ```js
   * // toolTip 객체 생성 //
   * var toolTip = map.createTooltip();
   * 
   * Button.OnClick = function(s, e) {
   *     if(toolTip.IsHide) toolTip.show();
   * }
   * ```
  */
  show(): void;

}
