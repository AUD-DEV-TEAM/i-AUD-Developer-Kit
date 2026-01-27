import { IWorkSheet } from "../../../aud/control/igrids/IWorkSheet";
/**
* MX-GRID WorkBook 모델
*/
export interface IWorkBook{

  /**
   * 기본 폰트 명
  */
  DefaultFontName: string;

  /**
   * 기본 폰트 사이즈
  */
  DefaultFontSize: number;

  /**
   * 시트 이름 목록
  */
  SheetNames: {[key: string]: string};

  /**
   * WorkSheet 목록
  */
  Tables: IWorkSheet[];

  /** 
   * MX-GRID 엑셀 제어 모델
   *
  */
  getWorkBook(): any;

}
