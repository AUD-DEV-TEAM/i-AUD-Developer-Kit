/**
 * ExternalComponent — 외부 JS/CSS 컴포넌트를 동적으로 로드하는 컨트롤
 *
 * 스크립트에서 접근 가능한 API 타입 정의입니다.
 */
export interface ExternalComponent {

    /** 데이터소스 바인딩 */
    DataSource: string;

    /** 자동 갱신 여부 */
    AutoRefresh: boolean;

    /** 수동 조회 대상 여부 */
    DoRefresh: boolean;

    /** 컴포넌트 로딩 완료 여부 */
    IsReady: boolean;

    /** 현재 로딩된 컴포넌트 ID */
    ComponentId: string;

    /** 로딩된 컴포넌트 모델 반환 (로딩 전이면 null) */
    getModel(): IComponentBridge | null;

    /** 조건 값 조회 → bridge 위임 */
    GetValue(): string[];

    /** 조건 값 설정 → bridge 위임 */
    SetValue(values: string[]): void;

    /**
     * 컴포넌트 로드 (비동기)
     * @param componentId 컴포넌트 ID (manifest 기반 로딩)
     */
    LoadComponent(componentId: string): void;

    /**
     * 컴포넌트 로딩 완료 이벤트.
     * 이미 로딩 완료된 상태에서 설정하면 즉시 호출됩니다.
     */
    OnComponentReady: ((sender: ExternalComponent, args: { Id: string, ComponentType: string }) => void) | null;

    /**
     * 컴포넌트 로딩 실패 이벤트.
     * 이미 에러가 발생한 상태에서 설정하면 즉시 호출됩니다.
     */
    OnComponentError: ((sender: ExternalComponent, args: { Id: string, Error: string }) => void) | null;
}
