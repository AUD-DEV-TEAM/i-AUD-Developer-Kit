/**
 * ExternalComponent 브릿지 인터페이스 (앰비언트 선언)
 *
 * 외부 컴포넌트가 구현해야 할 인터페이스.
 * import 없이 스크립트 모드에서 사용하기 위한 앰비언트 타입입니다.
 */

/** 외부 컴포넌트가 구현해야 할 브릿지 인터페이스 */
interface IComponentBridge {
    // 필수
    Create(container: HTMLDivElement, config: any): void;
    Dispose(): void;
    Resize(width: number, height: number): void;

    // 선택 — 조건/데이터
    GetValue?(): string[];
    SetValue?(values: string[]): void;
    SetData?(data: any): void;

    // 선택 — 직렬화
    Serialize?(target: any): void;
    Deserialize?(source: any): void;
}

/** AUD 글로벌 네임스페이스 */
interface AUDNamespace {
    [className: string]: any;
}

interface Window {
    AUD: AUDNamespace;
}