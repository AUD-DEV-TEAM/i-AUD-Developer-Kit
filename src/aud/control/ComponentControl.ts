import { Control } from "../../aud/control/Control";
/**
 * AddIn 컨트롤에서 동적으로 로드된 외부 컴포넌트 객체입니다.
 *
 * {@link AddIn.getScriptClass}를 통해 반환되며, 컴포넌트별 고유 메서드는 이 인터페이스를 확장하여 사용합니다.
 */
export interface ComponentControl {

  /**
   * 컴포넌트의 클래스 이름을 가져오거나 설정합니다.
  */
  ClassName: string;

  /**
   * 컴포넌트의 HTML 요소를 가져옵니다.
  */
  Element: HTMLDivElement;

  /**
   * 컴포넌트의 ID를 가져옵니다.
  */
  Id: string;

  /**
   * 컴포넌트의 이름을 가져옵니다.
  */
  Name: string;

  /**
   * 컴포넌트의 너비를 가져오거나 설정합니다.
  */
  Width: number;

  /**
   * 컴포넌트의 높이를 가져오거나 설정합니다.
  */
  Height: number;

  /**
   * 컴포넌트를 생성합니다.
   *
  * @param parent 부모 컨테이너
  * @param name 컴포넌트 이름
  */
  Create(parent: Control, name: string): ComponentControl | Control;

  /**
   * 컴포넌트를 해제합니다.
   *
  */
  Dispose(): void;

  /**
   * 컴포넌트의 크기를 재조정합니다.
   *
  */
  Resize(): void;

  /**
   * 컴포넌트를 갱신합니다.
   *
  * @param opt 갱신 옵션
  */
  Update(opt?: any): void;

}
