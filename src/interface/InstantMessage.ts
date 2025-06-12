import { IInstanceMessage } from "./IInstanceMessage"

export interface InstantMessage extends IInstanceMessage {
    Type: string;
    mParentDOM: HTMLElement;
    mAnimationDuration: number;  // 애니메이션 동작시간(second)
    mDisplayTimeout: number;     // 메세지 표시 유지시간(millisecond)
    mStartBottom: number;    // 하단 시작지점의 px
    mInnerText: string;
    mIsShow: boolean;
    mMsgObj: any;
    mTimeTag: number;
    mHasMouseoverEvent: boolean;

    constructor(dom: HTMLElement);

    /**
     * 
     * @param meg: 표시할 메세지
     */
    Show(msg: string): void;

    Close(): void;

    /**
     * 메세지 DOM 생성
     * @param msg : 표시할 메세지 Text
     */
    Create(msg: string): void;

    /**
     * 현재는 DataSourceEditor 보고서 닫힐 때에만 호출함.
     */
    Dispose(): void;
}