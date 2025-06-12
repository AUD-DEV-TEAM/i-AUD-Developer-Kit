export interface ImageEditorManager{
    DrawingManager(callbackFunc: Function, params?:any): void
    Destroy(): void;
}