import { IColumn } from "../../../aud/control/igrids/IColumn";
import { FreezePanes } from "../../../aud/control/igrids/FreezePanes";
import { IProtection } from "../../../aud/control/igrids/IProtection";
import { IRow } from "../../../aud/control/igrids/IRow";
import { ICell } from "../../../aud/control/igrids/ICell";
import { IValValidator } from "../../../aud/control/igrids/IValValidator";
/**
* MX-GRID WorkSheet 모델
*/
export interface IWorkSheet{

  /**
   * 셀 목록
  */
  Cells: {[rngname:string]:ICell};

  /**
   * 열 목록
  */
  Columns: IColumn[];

  /**
   * 행/열 고정 정보
  */
  FreezePanes: FreezePanes;

  /**
   * 시트 이름
  */
  Name: string;

  /**
   * 시트 보호 옵션 정보
  */
  Protection: IProtection;

  /**
   * 행 목록
  */
  Rows: IRow[];

  /**
   * 입력 유효성 목록
  */
  Validators: Array<IValValidator>;

}
