export interface IColor {
    R: number | null | undefined;
    G: number | null | undefined;
    B: number | null | undefined;
    A: number | null | undefined;

    CompareWith(obj: Object): IColor;
    GetRGBA(): string;
    SetRGBA(red: number, green: number, blue: number, alpha: number): void;
    SetColorRGBA(color: string): void;
    SetARGB(red: string | number, green: string | number, blue: string | number, alpha: string | number): void;
    ToString(): string;
    GetHex(): string;
    SetHex(hex: string): void;
    SetHexForARGB(hex: string): void;
    SetColor(color: string): void;
    Dispose(): void;

}
