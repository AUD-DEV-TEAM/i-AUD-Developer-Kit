import { Control } from "../../aud/control/Control";
/**
 * 유저 컴포넌트를 불러올 수 있습니다.
 */
export interface UserComponent extends Control {

  /**
   * 보고서를 불러와서 표시합니다.
   *
   */
  OpenReport(): void;

  /**
   * 불러올 보고서 정보를 설정합니다.
   *
   * @param reportInfo `{CODE: reportCode, NAME: reportName}` 형식
   * @param openReport `true`인 경우 보고서 정보 설정 후 바로 보고서를 엽니다.
   */
  SetReportInfo(reportInfo: { CODE: string, NAME: string }, openReport: boolean): void;

  /**
   * 유저 컴포넌트의 스크립트 객체를 반환합니다.
   *
   */
  getScriptObject(): Window;

  /**
   * @event
   *
   * UserComponent가 로딩 완료된 후 발생합니다.
   *
   * @param sender 이벤트가 발생한 유저 컴포넌트 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link UserComponent}
   */
  OnLoaded: (sender: UserComponent
    , args: {
      /**
       * 유저 컴포넌트 이름
       */
      Id: string
      /**
       * 보고서 스크립트 객체
       */
      ScriptObject: Window
    }
  ) => void;


}
