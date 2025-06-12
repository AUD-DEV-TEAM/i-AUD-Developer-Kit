/**
* Marker 객체
*/
export interface Marker{

  /** 
   * 해당 marker의 id를 반환합니다.
   *
   * @example
   * ```js
   * // marker 객체 생성 //
   * var markerLocation = [[x, y]];    // 위치 정보 전달
   * var marker = map.addMarker(markerLocation);
   * 
   * Button.OnClick = function(s, e) {
   *     var markerInfo = marker.getId();
   *     alert(markerInfo);
   * }
   * ```
  */
  getId(): Marker;

  /** 
   * id에 해당하는 marker를 제거합니다. id가 undefined일 경우, 모든 marker를 제거합니다.
   *
   * @example
   * ```js
   * // marker 객체 생성 //
   * var markerLocation = [[x, y]];    // 위치 정보 전달
   * var marker = map.addMarker(markerLocation);
   * 
   * Button.OnClick = function(s, e) {
   *     var busan = [129.03555, 35.1838];
   *     marker.removeMarkers(busan);
   * }
   * ```
  * @param id 제거를 원하는 marker 정보를 입력합니다. 빈 값을 입력하면 모든 marker가 삭제됩니다.
  */
  removeMarkers(id: string[]): void;

  /** 
   * 설정한 이미지를 scale에 맞게 제공합니다.
   *
   * @example
   * ```js
   * // marker 객체 생성 //
   * var markerLocation = [[x, y]];    // 위치 정보 전달
   * var marker = map.addMarker(markerLocation);
   * 
   * Button.OnClick = function(s, e) {
   *     marker.setImg('pin.png', 0.08);
   * }
   * ```
  * @param imgUrl contextpath/reports/WEB_IMAGES 아래의 이미지 파일을 입력합니다.
  * @param imgScale 빈 값이 입력되면 기본 스케일로 1이 적용됩니다.
  */
  setImg(imgUrl: string, imgScale?: number): void;

}
