/**
* Line 객체
*/
export interface Line{

  /** 
   * line의 스타일 변경 사항을 지도에 반영합니다.
   *
   * @example
   * ```js
   * // line 객체 생성 //
   * var lineLocation = [[x1, y1], [x2, y2]];    // 위치 정보 전달
   * var line = map.addLine(lineLocation);
   * 
   * Button.OnClick = function(s, e) {
   *     line.setLineCap('round');   // 'butt', 'round', 'square'
   *     line.Update();
   * }
   * ```
  */
  Update(): void;

  /** 
   * 특정 좌표에 위치하는 line 객체를 제거합니다.
   *
   * @example
   * ```js
   * // line 객체 생성 //
   * var lineLocation = [[x1, y1], [x2, y2]];    // 위치 정보 전달
   * var line = map.addLine(lineLocation);
   * 
   * Button.OnClick = function(s, e) {
   *     var lineLocation = [[x1, y1], [x2, y2]];
   *     if(line) line.removeLines(lineLocation);
   * }
   * ```
  * @param coordinate 삭제를 원하는 line의 좌표를 입력합니다. 빈 값을 전달하면 모든 line이 삭제됩니다.
  */
  removeLines(coordinate: string[]): void;

  /** 
   * line 객체의 color를 설정합니다. Update() 실행 후 UI가 변경됩니다.
   *
   * @example
   * ```js
   * // line 객체 생성 //
   * var lineLocation = [[x1, y1], [x2, y2]];    // 위치 정보 전달
   * var line = map.addLine(lineLocation);
   * 
   * Button.OnClick = function(s, e) {
   *     line.setColor('#ffecbf');
   *     line.Update();
   * }
   * ```
  * @param color 색상 코드를 입력합니다.
  */
  setColor(color: string): void;

  /** 
   * line 객체의 lineCap style을 설정합니다. Update() 실행 후 UI가 변경됩니다.
   *
   * @example
   * ```js
   * // line 객체 생성 //
   * var lineLocation = [[x1, y1], [x2, y2]];    // 위치 정보 전달
   * var line = map.addLine(lineLocation);
   * 
   * Button.OnClick = function(s, e) {
   *     line.setLineCap('round');   // 'butt', 'round', 'square'
   *     line.Update();
   * }
   * ```
  * @param lineCap Cap style을 입력합니다.
  */
  setLineCap(lineCap: string): void;

  /** 
   * line 객체의 lineDash style을 설정합니다. Update() 실행 후 UI가 변경됩니다.
   *
   * @example
   * ```js
   * // line 객체 생성 //
   * var lineLocation = [[x1, y1], [x2, y2]];    // 위치 정보 전달
   * var line = map.addLine(lineLocation);
   * 
   * Button.OnClick = function(s, e) {
   *     line.setLineDash([5, 15]);
   *     line.Update();
   * }
   * ```
  * @param lineDash 선의 표시와 숨김 부분의 길이를 나타내는 배열을 입력합니다.
  */
  setLineDash(lineDash: number[]): void;

  /** 
   * line 객체의 width를 설정합니다. Update() 실행 후 UI가 변경됩니다.
   *
   * @example
   * ```js
   * // line 객체 생성 //
   * var lineLocation = [[x1, y1], [x2, y2]];    // 위치 정보 전달
   * var line = map.addLine(lineLocation);
   * 
   * Button.OnClick = function(s, e) {
   *     line.setWidth(10);
   *     line.Update();
   * }
   * ```
  * @param width 너비를 입력합니다.
  */
  setWidth(width: number): void;

}
