/**
* 엑셀의 셀 스타일에 대한 정보를 제공합니다.
*/
export interface ScriptCellStyle{

  /** 
   * Border
   *
  */
  getBorder(): string;

  /** 
   * Fill
   *
  */
  getFill(): string;

  /** 
   * Font
   *
  */
  getFont(): string;

  /** 
   * Format
   *
  */
  getFormat(): string;

  /** 
   * Horizontal alignment
   *
  */
  getHorizontal(): number;

  /** 
   * cell's indent level
   *
  */
  getIndentLevel(): number;

  /** 
   * text rotataion angle
   *
  */
  getRotationAngle(): number;

  /** 
   * Shrink To Fit cell's text
   *
  */
  getShrinkToFit(): boolean;

  /** 
   * Vertical alignment
   *
  */
  getVertical(): number;

  /** 
   * Wrap cell's text
   *
  */
  getWrapText(): boolean;

  /** 
   * update border style
   *
  * @param style eg. border-left:solid,#000000;border-top:solid,#000000;border-right:solid,#000000;border-bottom:solid,#000000;border-DiagonalUp:solid,#000000;border-DiagonalDown:solid,#000000;
  */
  setBorder(style: string): void;

  /** 
   * update fill style
   *
  * @param style eg. #efefef
  */
  setFill(style: string): void;

  /** 
   * update font style
   *
  * @param style eg. font-family:맑은고딕;font-size:11;font-weight:bold;font-style:italic,underline;font-color:#eeeeee
  */
  setFont(style: string): void;

  /** 
   * update format
   *
  * @param style eg. #,###
  */
  setFormat(style: string): void;

  /** 
   * update horizontal align
   *
  * @param align eg. Left, Center, Right
  */
  setHorizontal(align: string): void;

  /** 
   * update horizontal align
   *
  * @param align eg. Left = 0, Center = 1, Right = 2
  */
  setHorizontal(align: number): void;

  /** 
   * cell's indent level
   *
  * @param level  
  */
  setIndentLevel(level: number): void;

  /** 
   * text rotataion angle
   *
  * @param angle 90, -90, 0
  */
  setRotationAngle(angle: number): void;

  /** 
   * Shrink To Fit cell's text
   *
  * @param shrinkToFit  
  */
  setShrinkToFit(shrinkToFit: boolean): void;

  /** 
   * update vertical align
   *
  * @param align eg. Top = 0, Center = 1, Bottom = 2
  */
  setVertical(align: number): void;

  /** 
   * update vertical align
   *
  * @param align eg. Top, Center, Bottom
  */
  setVertical(align: string): void;

  /** 
   * Wrap cell's text
   *
  * @param wrap  
  */
  setWrapText(wrap: boolean): void;

}
