//import { StyleManager } from "./StyleManager";

import { IBrush, IColorStop, ICornerRadius, IDisposable, IDrawing, IFontStyle, IHitTestResult, IImageDrawingRepisitory, IImageLoadEvent, IImageWaitItem, IImageWaitList, IMagnetPointer, IMeasureText, IMouseEventArgs, IPoint, IRectangle, ISize, IStyle, IThickness } from "./interface";
import { enHorizonAlign, enResizeType, enVerticalAlign } from "./enums";
import { ISelectable } from "./ISelectable";
import { IDiagramView } from "./IDiagramView";

/**
 * 도형관련 연산 처리
 */
export class RECT {

    public static Point(x: number, y: number): IPoint {
        return { "X": Math.floor(x), "Y": Math.floor(y) };
    }

    public static Rect(pt: IPoint, w: number | IPoint, h?: number): IRectangle {
        if (typeof w == "number") {
            return { "Left": Math.floor(pt.X), "Top": Math.floor(pt.Y), "Width": Math.floor(w as number), "Height": Math.floor(h as number) };
        } else {
            w = w as IPoint;

            return {
                "Left": Math.floor(Math.min(pt.X, w.X))
                , "Top": Math.floor(Math.min(pt.Y, w.Y))
                , "Width": Math.floor(Math.abs(pt.X - w.X))
                , "Height": Math.floor(Math.abs(pt.Y - w.Y))
            };

        }
    }
    public static getRect(x: number, y: number, w: number, h: number): IRectangle {
        return { "Left": Math.floor(x), "Top": Math.floor(y), "Width": Math.floor(w), "Height": Math.floor(h) };
    }
    public static EmptyRect(): IRectangle {
        return { "Left": 0, "Top": 0, "Width": 0, "Height": 0 };
    }
    public static EmptyPoint(): IPoint {
        return { "X": 0, "Y": 0 };
    }
    public static EmptySize(): ISize {
        return { "Width": 0, "Height": 0 };
    }
    public static getThickness(n1: number, n2?: number, n3?: number, n4?: number): IThickness {
        if (n2 && n3 && n4)
            return { "Left": n1, "Top": n2, "Right": n3, "Bottom": n4 };
        else
            return { "Left": n1, "Top": n1, "Right": n1, "Bottom": n1 };
    }
    public static ToString(rect: IRectangle | IPoint): string {
        if (rect.hasOwnProperty("Left")) {
            return "Left:" + (rect as IRectangle).Left
                + ",Top:" + (rect as IRectangle).Top
                + ",Width:" + (rect as IRectangle).Width
                + "Height:" + (rect as IRectangle).Height;
        } else {
            return "X:" + (rect as IPoint).X
                + ",Y:" + (rect as IPoint).Y;
        }

    }
    /**
     * 특정 경로가  사각형과 교차하는지 여부
     */
    public static IntersectPaths(paths:Array<IPoint>, rect: IRectangle): boolean {
        if(paths.length == 2){
            if(RECT.IntersectLineRectangle(paths[0], paths[1], rect)){
                return true;
            }
        }
        for(let i=0,len=paths.length-2; i<len; i++){
            if(RECT.IntersectLineRectangle(paths[i], paths[i+1], rect)){
                return true;
            }
        }
        return false;
    }
    /**
     * 특정 라인이 사각형과 교차하는지 여부
     * @param a 
     * @param b 
     * @param rect 
     * @returns 
     */
    public static IntersectLineRectangle(a: IPoint, b: IPoint, rect: IRectangle): boolean {

        let rx2 = RECT.Right(rect);
        let ry2 = RECT.Bottom(rect);

        let left = Math.min(rect.Left, rx2),
            top = Math.min(rect.Top, ry2),
            right = Math.max(rect.Left, rx2),
            bottom = Math.max(rect.Top, ry2);
        if (a.X < left && b.X < left || a.X > right && b.X > right ||
            a.Y < top && b.Y < top || a.Y > bottom && b.Y > bottom) {
            return false;
        }
        var m = (b.Y - a.Y) / (b.X - a.X);
        var y = m * (left - a.X) + a.Y;
        if (y >= top && y <= bottom) {
            return true;
        }
        y = m * (right - a.X) + a.Y;
        if (y >= top && y <= bottom) {
            return true;
        }
        var x = (top - a.Y) / m + a.X;
        if (x >= left && x <= right) {
            return true;
        }
        x = (bottom - a.Y) / m + a.X;
        if (x >= left && x <= right) {
            return true;
        }
        return false;
    }
    /**
     * 위치 값 및 사이즈 보정
     * @param rect 
     */
    public static optimize(rect: IRectangle | IPoint): IRectangle | IPoint {
        if ((rect as object).hasOwnProperty("Wdith")) {
            rect = rect as IRectangle;
            rect.Left = Math.floor(rect.Left);
            rect.Top = Math.floor(rect.Top);
            rect.Width = Math.floor(rect.Width);
            rect.Height = Math.floor(rect.Height);
            return rect;
        } else {
            rect = rect as IPoint;
            rect.X = Math.floor(rect.X);
            rect.Y = Math.floor(rect.Y);
            return rect;
        }
    }

    /**
     * 비어 있는 영역인지 여부
     * @param rect 
     * @returns 
     */
    public static IsEmpty(rect: IRectangle): boolean {
        return rect.Width <= 0 || rect.Height <= 0;
    }
    public static Right(rect: IRectangle): number {
        return rect.Left + rect.Width;
    }
    public static Bottom(rect: IRectangle): number {
        return rect.Top + rect.Height;
    }
    public static Middle(rect:IRectangle):number{
        return Math.floor(rect.Top + (rect.Height / 2));
    }
    public static Center(rect:IRectangle):number{
        return Math.floor(rect.Left + (rect.Width / 2));
    }
    /**
     * 영역을 확대 합니다.
     * @param rect 
     * @param left 
     * @param top 
     * @param right 
     * @param bottom 
     * @returns 
     */
    public static Wide(rect: IRectangle, left: number, top?: number, right?: number, bottom?: number): IRectangle {
        return {
            "Left": rect.Left - left
            , "Top": rect.Top - (top ? top : left)
            , "Width": rect.Width + (left + (right ? right : left))
            , "Height": rect.Height + ((top ? top : left) + (bottom ? bottom : left))
        };
    }

    /**
     * 영역을 축소 합니다.
     * @param rect 
     * @param left 
     * @param top 
     * @param right 
     * @param bottom 
     * @returns 
     */
    public static Narrow(rect: IRectangle, left: number, top?: number, right?: number, bottom?: number): IRectangle {
        return {
            "Left": rect.Left + left
            , "Top": rect.Top + (typeof top === 'number' ? top : left)
            , "Width": rect.Width - (left + (typeof right === 'number' ? right : left))
            , "Height": rect.Height - ((typeof top === 'number' ? top : left) + (typeof bottom === 'number' ? bottom : left))
        };
    }
    
    /**
     * Point의 위치가 세로 방향으로 해당 위치에 존재하는가?
     * @param p point
     */
    public static ContainVertical(rect: IRectangle, p: IPoint): boolean {
        return rect.Top <= p.Y
            && rect.Top + rect.Height >= p.Y;
    }
    /**
     * Point의 위치가 가로 방향으로 해당 위치에 존재하는가?
     * @param p point
     */
    public static ContainHorizon(rect: IRectangle, p: IPoint): boolean {
        return rect.Left <= p.X
            && rect.Left + rect.Width >= p.X;
    }
    /**
     * 두개의 사각형을 포함하는 전체 영역 반환
     * @param a 
     * @param b 
     * @returns 
     */
    public static Union(a: IRectangle, b: IRectangle): IRectangle {
        let _left: number = Math.min(a.Left, b.Left);
        let _top: number = Math.min(a.Top, b.Top);
        let _right: number = Math.max(RECT.Right(a), RECT.Right(b));
        let _bottom: number = Math.max(RECT.Bottom(a), RECT.Bottom(b));
        return { Left: _left, Top: _top, Width: _right - _left, Height: _bottom - _top };
    }
    public static UnionAll(list: Array<IRectangle>): IRectangle {

        let _left: number = 0;
        let _top: number = 0;
        let _right: number = 0;
        let _bottom: number = 0;
        let _first: boolean = true;
        list.forEach(rec => {
            if (_first) {
                _first = false;
                _left = rec.Left;
                _top = rec.Top;
                _right = RECT.Right(rec);
                _bottom = RECT.Bottom(rec);
            } else {
                _left = Math.min(_left, rec.Left);
                _top = Math.min(_top, rec.Top);
                _right = Math.max(_right, RECT.Right(rec));
                _bottom = Math.max(_bottom, RECT.Bottom(rec));
            }
        });
        return { Left: _left, Top: _top, Width: _right - _left, Height: _bottom - _top };
    }
    /**
     * 사각형의 교집합 반환
     * @param a 
     * @param b 
     * @returns 
     */
    public static Intersect(a: IRectangle, b: IRectangle): IRectangle | undefined {
        let _rightA: number = RECT.Right(a);
        if (_rightA < b.Left) return;
        let _rightB: number = RECT.Right(b);
        if (_rightB < a.Left) return;
        let _bottomA: number = RECT.Bottom(a);
        if (b.Top > _bottomA) return;
        let _bottomB: number = RECT.Bottom(b);
        if (a.Top > _bottomB) return;

        let _left: number = Math.max(a.Left, b.Left);
        let _right: number = Math.min(_rightA, _rightB);
        if (_right - _left <= 0) return;
        let _top: number = Math.max(a.Top, b.Top);
        let _bottom: number = Math.min(_bottomA, _bottomB);
        if (_bottom - _top <= 0) return;
        return { Left: _left, Top: _top, Width: _right - _left, Height: _bottom - _top };
    }


    /**
     * 동일한 위치의 사각형인지 여부
     * @param rect 
     * @returns 
     */
    public static Equal(a: IRectangle, b: IRectangle): boolean {
        return a.Left == b.Left
            && a.Top == b.Top
            && a.Width == b.Width
            && a.Height == b.Height;
    }

    /**
     * 복제
     */
    public static Clone(a: IRectangle): IRectangle {
        return { Left: a.Left, Top: a.Top, Width: a.Width, Height: a.Height };
    }

    public static From(a: IRectangle): IPoint {

        return { X: a.Left, Y: a.Top };
    }
    public static To(a: IRectangle): IPoint {
        return { X: a.Left, Y: a.Top };
    }

    public static Resize(a: IRectangle, width: number, height: number): IRectangle {

        return {
            Left: a.Left
            , Top: a.Top
            , Width: width
            , Height: height
        };
    }
    public static ClonePoint(a: IPoint): IPoint {
        return { X: a.X, Y: a.Y };
    }

    /**
     * Rectangle 이 다른 Rectangle 내에 존재하는가
     * @param rect2 point
     */
    public static InRect(rect: IRectangle, rect2: IRectangle): boolean {
        return rect2.Left >= rect.Left
            && rect2.Top >= rect.Top
            && RECT.Right(rect2) <= RECT.Right(rect)
            && RECT.Bottom(rect2) <= RECT.Bottom(rect);
    }
    
    /**
     * Point가 Rectangle 내에 존재하는가
     * @param p point
     */
    public static InPoint(rect: IRectangle, p: IPoint): boolean {
        return rect.Left <= p.X
            && rect.Left + rect.Width >= p.X
            && rect.Top <= p.Y
            && rect.Top + rect.Height >= p.Y;
    }
    /**
     * resize 영역의 값을 반환 합니다.
     *   Rectangel의 테두리 영역 (margin 3?)에 위치한지 여부를 반환 합니다.
     *  enResizeArea
     * @param rect 
     * @param p 
     */
    public static getResizePoint(rect: IRectangle, p: IPoint): enResizeType {

        let margin = 5; //위치 너비 8
        if (Math.abs(rect.Left - p.X) <= margin) {
            if (Math.abs(rect.Top - p.Y) <= margin) {
                return enResizeType.LeftTop;
            } else if (Math.abs(RECT.Bottom(rect) - p.Y) <= margin) {
                return enResizeType.LeftBottom;
            } else {
                return enResizeType.Left;
            }
        } else if (Math.abs(RECT.Right(rect) - p.X) <= margin) {
            if (Math.abs(rect.Top - p.Y) <= margin) {
                return enResizeType.RightTop;
            } else if (Math.abs(RECT.Bottom(rect) - p.Y) <= margin) {
                return enResizeType.RightBottom;
            } else {
                return enResizeType.Right;
            }
        } else if (Math.abs(rect.Top - p.Y) <= margin) {
            return enResizeType.Top;
        } else if (Math.abs(RECT.Bottom(rect) - p.Y) <= margin) {
            return enResizeType.Bottom;
        }
        return enResizeType.None;
    }
    /**
     * Resize 타입에 따른 커서 모양을 반환 합니다.
     * @param resizeType 
     * @returns 
     */
    public static getResizeCursor(resizeType: enResizeType | undefined): string {
        if (!resizeType) {
            return "";
        }
        switch (resizeType) {
            case enResizeType.Left:
            case enResizeType.Right:
                return "ew-resize";
            case enResizeType.Top:
            case enResizeType.Bottom:
                return "ns-resize";
            case enResizeType.LeftTop:
            case enResizeType.RightBottom:
                return "nwse-resize";
            case enResizeType.RightTop:
            case enResizeType.LeftBottom:
                return "sw-resize";
            case enResizeType.None:
            default:
                return "";

        }
    }
    /**
     * 특정 위치로 사각형의 위치를 이동한다.
     * @param rec 
     * @param x 
     * @param y 
     * @returns 
     */
    public static Move(rec: IRectangle, x: number, y: number): IRectangle {
        return {
              Left: x
            , Top: y
            , Width: rec.Width
            , Height: rec.Height
        };
    }
    public static MoveRect(rec: IRectangle, p1: IPoint, p2: IPoint): IRectangle {
        return {
            Left: Math.max(0, ((p2.X > p1.X) ? (rec.Left + (p2.X - p1.X)) : (rec.Left - (p1.X - p2.X))))
            , Top: Math.max(0, ((p2.Y > p1.Y) ? (rec.Top + (p2.Y - p1.Y)) : (rec.Top - (p1.Y - p2.Y))))
            , Width: rec.Width
            , Height: rec.Height
        };
    }
    /**
     * 사이즈 조정
     *  (마우스로 Drag 해서 사이즈 조정 시 사용)
     * @param rec 
     * @param p1 
     * @param p2 
     * @param type 
     * @param minSize 
     * @returns 
     */
    public static ResizRect(rec: IRectangle, p1: IPoint, p2: IPoint, type: enResizeType, minSize: ISize, proportion: boolean): IRectangle {
        let result = RECT.Clone(rec);
        let oldSize: number;
        let rate: number;
        switch (type) {
            case enResizeType.Left:
                if (p1.X > p2.X) { //                    
                    result.Left = Math.max(0, result.Left - (p1.X - p2.X));
                    result.Width += (p1.X - p2.X);
                } else {
                    oldSize = result.Width;
                    result.Width = Math.max(minSize.Width, result.Width - (p2.X - p1.X));
                    result.Left += (oldSize - result.Width);
                }
                //비중
                if (proportion) {
                    rate = result.Width / rec.Width;
                    result.Height = Math.floor(rec.Height * rate);
                }
                break;
            case enResizeType.Right:
                if (p1.X > p2.X) { //
                    result.Width = Math.max(minSize.Width, result.Width - (p1.X - p2.X));
                } else {
                    result.Width += (p2.X - p1.X);
                }
                //비중
                if (proportion) {
                    rate = result.Width / rec.Width;
                    result.Height = Math.floor(rec.Height * rate);
                }
                break;
            case enResizeType.Top:
                if (p1.Y > p2.Y) { //
                    result.Top = Math.max(0, result.Top - (p1.Y - p2.Y));
                    result.Height += (p1.Y - p2.Y);
                } else {
                    oldSize = result.Height;
                    result.Height = Math.max(minSize.Height, result.Height - (p2.Y - p1.Y));
                    result.Top += (oldSize - result.Height); //(p2.Y - p1.Y);
                }

                //비중
                if (proportion) {
                    rate = result.Height / rec.Height;
                    result.Width = Math.floor(rec.Width * rate);
                }
                break;
            case enResizeType.Bottom:
                if (p1.Y > p2.Y) { //
                    result.Height = Math.max(minSize.Height, result.Height - (p1.Y - p2.Y));
                } else {
                    result.Height += (p2.Y - p1.Y);
                }
                //비중
                if (proportion) {
                    rate = result.Height / rec.Height;
                    result.Width = Math.floor(rec.Width * rate);
                }
                break;
            case enResizeType.LeftTop:

                result = RECT.ResizRect(result, p1, p2, enResizeType.Left, minSize, proportion);
                if (!proportion) {
                    result = RECT.ResizRect(result, p1, p2, enResizeType.Top, minSize, proportion);
                }
                break;
            case enResizeType.LeftBottom:
                result = RECT.ResizRect(result, p1, p2, enResizeType.Left, minSize, proportion);
                if (!proportion) {
                    result = RECT.ResizRect(result, p1, p2, enResizeType.Bottom, minSize, proportion);
                }
                break;
            case enResizeType.RightTop:
                result = RECT.ResizRect(result, p1, p2, enResizeType.Right, minSize, proportion);
                if (!proportion) {
                    result = RECT.ResizRect(result, p1, p2, enResizeType.Top, minSize, proportion);
                }
                break;
            case enResizeType.RightBottom:
                result = RECT.ResizRect(result, p1, p2, enResizeType.Right, minSize, proportion);
                if (!proportion) {
                    result = RECT.ResizRect(result, p1, p2, enResizeType.Bottom, minSize, proportion);
                }
                break;

        }
        return result;
    }
    public static Offset(rec: IRectangle, x: number, y: number): IRectangle {
        return {"Left" : rec.Left + x 
                ,"Top" : rec.Top + y
                ,"Width":rec.Width
                ,"Height" : rec.Height};

    }
    public static OffsetPoint(pt: IPoint, x: number, y: number): IPoint {
        return {"X" :pt.X + x, "Y": pt.Y + y};
    }



    public static AntiAlis(rec: IRectangle | IPoint): IRectangle | IPoint {
        if ((rec as object).hasOwnProperty("Left")) {
            rec = rec as IRectangle;
            return {
                Left: Math.floor(rec.Left) - 0.5
                , Top: Math.floor(rec.Top) - 0.5
                , Width: Math.floor(rec.Width) 
                , Height: Math.floor(rec.Height)
            } as IRectangle;
        } else {
            rec = rec as IPoint;
            return {
                X: Math.floor(rec.X) - 0.5
                , Y: Math.floor(rec.Y) - 0.5
            } as IPoint;
        }
    }
    /**
     * 두 점간의 거리를 계산 한다.
     * @param a 점1
     * @param b 점2
     * @returns 
     */
    public static Distant(a: IPoint, b: IPoint): number {
        return Math.sqrt((Math.abs(b.X - a.X) * Math.abs(b.X - a.X)) + (Math.abs(b.Y - a.Y) * Math.abs(b.Y - a.Y)));
    }


}


/**
 * font style
 */
export class FontStyle implements IFontStyle {
    constructor(fontName?: string, fontSize?: number, color?: string, bold?: boolean, italic?: boolean, underline?: boolean) {
        if (typeof fontName !== undefined) this.FontFamily = fontName;
        if (typeof fontSize !== undefined) this.FontSize = fontSize as number;
        else this.FontSize = 12;

        if (bold !== true) this.Bold = bold;
        if (italic !== true) this.Italic = italic;
        if (underline !== true) this.UnderLine = underline;
        if (color) {
            this.Color = color;
            // if(typeof color == "string"){            
            //     this.Color = new SolidColorBrush(color);
            // }else if(typeof color == "object"){            
            //     this.Color = StyleManager.createBrush(color);
            // }
        }
        this.Wrap = false;
    }
    public Italic: boolean | undefined;
    public Bold: boolean | undefined;
    public UnderLine: boolean | undefined;
    public FontFamily: string | undefined;
    public FontSize: number;
    public Color: string | undefined;
    public Wrap : boolean;


    public Update(ctx: CanvasRenderingContext2D): void {
        if (this.Color) {
            ctx.fillStyle = this.Color;
            ctx.strokeStyle = this.Color;
            // this.Color.fillStyle(ctx);
            // this.Color.strokeStyle(ctx);
        }
        let fntStyles: Array<string> = new Array<string>();

        if (this.Italic) fntStyles.push("italic");
        if (this.Bold) fntStyles.push("bold");
        if (this.FontSize && this.FontSize > 0) fntStyles.push(this.FontSize + "px");
        if (this.FontFamily) fntStyles.push("'" + this.FontFamily + "'");
        if (fntStyles.length > 0) {
            ctx.font = fntStyles.join(" ");
        }
    }
 
    /**
     * 직렬화
     * @param model 
     */
    // public Serialize(): object {
    //     let model: any = {};
    //     if (this.Italic === true) model["Italic"] = this.Italic;
    //     if (this.Bold === true) model["Bold"] = this.Bold;
    //     if (this.UnderLine === true) model["UnderLine"] = this.UnderLine;
    //     if (this.FontFamily) model["FontFamily"] = this.FontFamily;
    //     if (this.FontSize > 0) model["FontSize"] = this.FontSize;
    //     if (this.Color) {
    //         model["Color"] = this.Color;
    //     }
    //     return model;
    // }
    /**
     *  역직렬화
     * @param model 
     */
    // public DeSerialize(model: any): void {
    //     this.Italic = (model["Italic"] === true) ? true : false;
    //     this.Bold = (model["Bold"] === true) ? true : false;
    //     this.UnderLine = (model["UnderLine"] === true) ? true : false;

    //     if (model["FontFamily"]) this.FontFamily = model["FontFamily"];
    //     if (model["FontSize"] > 0) this.FontSize = model["FontSize"];
    //     if (model["Color"]) {
    //         this.Color = model["Color"];
    //     }
    // }

    public static getDefaultFont(): FontStyle {
        return new FontStyle("맑은 고딕", 12, "#000");
    }

    public Dispose(): void {

    }
}


/**
 * Style;
 */
export class Style implements IStyle {
    constructor(key?: string, line?: string, fill?: string) {
        if (key) {
            this.Key = key;
        }
        if (line) {
            this.LineBrush = new SolidColorBrush(line);
        }
        if (fill) {
            this.FillBrush = new SolidColorBrush(fill);
        }

        this.HAlign = enHorizonAlign.Left;
        this.VAlign = enVerticalAlign.Center;
        this.FontStyle = FontStyle.getDefaultFont();
    }
    public Key ?: string ;
    public LineBrush?: IBrush ;//border color
    public LineDash?: Array<number> | undefined ;
    public FillBrush?: IBrush ;//fill color
    public HAlign?: enHorizonAlign ;
    public VAlign?: enVerticalAlign ;
    public FontStyle: FontStyle ;
    public Border?: IThickness ;

    public Padding?: IThickness ; // inner margin
    public CornerRadius?: ICornerRadius ;


    public getFontSize(defSize?: number): number {
        if (this.FontStyle && this.FontStyle.FontSize > 0) {
            return this.FontStyle.FontSize;
        }
        return (defSize) ? defSize : 12;
    }

    /**
     * 스타일 적용
     * @param ctx 
     * @param stroke 
     * @param fill 
     * @param font 
     */
    public Update(ctx: CanvasRenderingContext2D, rect?: IRectangle): void {

        //if(this.FontStyle) this.FontStyle.Update(ctx);
        if (this.LineBrush) this.LineBrush.strokeStyle(ctx);
        if (this.Border) {
            ctx.lineWidth = Math.max(this.Border.Left, this.Border.Top, this.Border.Right, this.Border.Bottom);
        } else {
            ctx.lineWidth = 1;
        }
        if(typeof ctx.setLineDash === "function"){
            if (this.LineDash) {
                ctx.setLineDash(this.LineDash);
            }else{
                ctx.setLineDash([]);
            }
        }
        if (this.FillBrush) this.FillBrush.fillStyle(ctx, rect);
    }
    public UpdateFontStyle(ctx: CanvasRenderingContext2D): void {

        if (this.FontStyle) this.FontStyle.Update(ctx);
    }

    // public Update(ctx:CanvasRenderingContext2D, font?:boolean, stroke?:boolean, fill?:boolean):void{

    //     if(font){
    //         if(this.FontStyle) this.FontStyle.Update(ctx, stroke, fill);
    //     }else{
    //         if(stroke){             
    //             if(this.LineBrush) this.LineBrush.strokeStyle(ctx);

    //             if(this.Border){
    //                 ctx.lineWidth = Math.max(this.Border.Left, this.Border.Top, this.Border.Right, this.Border.Bottom);                     
    //             }else{
    //                 ctx.lineWidth = 1;
    //             }
    //         }
    //         if(fill && this.FillBrush) this.FillBrush.fillStyle(ctx);
    //     } 
    // }  

    /**
     * 직렬화
     * @param model 
     */
    // public Serialize(): any {
    //     let model: any = {};
    //     model["Key"] = this.Key;
    //     if (this.LineBrush) {
    //         model["LineBrush"] = this.LineBrush.Serialize();
    //     }
    //     if (this.LineDash) {
    //         model["LineDash"] = this.LineDash;
    //     }
    //     if (this.FillBrush) {
    //         model["FillBrush"] = this.FillBrush.Serialize();
    //     }
    //     if (this.FontStyle) {
    //         model["FontStyle"] = this.FontStyle.Serialize();
    //     }
    //     if (this.HAlign) {
    //         model["HAlign"] = this.HAlign;
    //     }
    //     if (this.VAlign) {
    //         model["VAlign"] = this.VAlign;
    //     }

    //     if (this.Border) {
    //         model["Border"] = {
    //             "Left": this.Border.Left
    //             , "Top": this.Border.Top
    //             , "Right": this.Border.Right
    //             , "Bottom": this.Border.Bottom
    //         };
    //     }
    //     if (this.Padding) {
    //         model["Padding"] = {
    //             "Left": this.Padding.Left
    //             , "Top": this.Padding.Top
    //             , "Right": this.Padding.Right
    //             , "Bottom": this.Padding.Bottom
    //         };
    //     }

    //     if (this.CornerRadius) {
    //         model["CornerRadius"] = {
    //             "TL": this.CornerRadius.TL
    //             , "TR": this.CornerRadius.TR
    //             , "BL": this.CornerRadius.BL
    //             , "BR": this.CornerRadius.BR
    //         };
    //     }

    //     return model;

    // }
    /**
     *  역직렬화
     * @param model 
     */
    // public DeSerialize(model: any): void {
    //     this.Key = model["Key"];
    //     if (model["LineBrush"]) {
    //         this.LineBrush = model["LineBrush"];
    //     }

    //     if (model["LineDash"]) {
    //         this.LineDash = model["LineDash"] as Array<number>;
    //     }
    //     if (model["FillBrush"]) {
    //         this.FillBrush = model["FillBrush"];
    //     }
    //     if (model["FontStyle"]) {
    //         this.FontStyle = new FontStyle();
    //         this.FontStyle.DeSerialize(model["FontStyle"]);
    //     }
    //     if (model["HAlign"]) this.HAlign = model["HAlign"];
    //     else this.HAlign = enHorizonAlign.Left;

    //     if (model["VAlign"]) this.VAlign = model["VAlign"];
    //     else this.VAlign = enVerticalAlign.Center;

    //     if (model["Border"]) {
    //         this.Border = model["Border"];
    //     }

    //     if (model["Padding"]) {
    //         this.Padding = model["Padding"];
    //     }
    //     if (model["CornerRadius"]) {
    //         this.CornerRadius = model["CornerRadius"];
    //     }
    // }



    public Dispose(): void {
        if (this.LineBrush) this.LineBrush.Dispose();
        if (this.FillBrush) this.FillBrush.Dispose();
        if (this.FontStyle) this.FontStyle.Dispose();

    }

    // public Clone(key: string): IStyle {
    //     let model = this.Serialize();
    //     model["Key"] = key;
    //     let style = new Style();
    //     style.DeSerialize(model);
    //     return style as IStyle;
    // }

}
/**
 * Solid Color Brush
 */
export class SolidColorBrush implements IBrush {
    public Color: string;
    constructor(color?: string) {
        if (color) {
            this.Color = color;
        } else {
            this.Color = "";
        }
    }
    public fillStyle(ctx: CanvasRenderingContext2D, rect?: IRectangle): void {
        if (this.Color) {
            ctx.fillStyle = this.Color;
        }
    }
    public strokeStyle(ctx: CanvasRenderingContext2D, rect?: IRectangle): void {
        if (this.Color) {
            ctx.strokeStyle = this.Color;
        }
    }
    public getColor(): string | undefined {
        return this.Color;
    }
    /**
     * 직렬화
     * @param model 
     */
    // public Serialize(): any {
    //     let model: any = {};
    //     model["Type"] = "SolidColor";
    //     model["Color"] = this.Color;
    //     return model;
    // }
    /**
     *  역직렬화
     * @param model 
     */
    // public DeSerialize(model: any): void {
    //     this.Color = model["Color"];
    // }

    public Dispose(): void {

    }
}
/**
 * Linear Gradient Brush
 */
export class LinearGradientBrush implements IBrush {
    constructor(colorStops?: Array<IColorStop>) {
        this.From = { "X": 0, "Y": 0 };
        this.To = { "X": 0, "Y": 0 };
        if (colorStops) this.ColorStops = colorStops;
    }
    public From: IPoint | undefined;
    public To: IPoint | undefined;
    public ColorStops: Array<IColorStop> | undefined;
    public fillStyle(ctx: CanvasRenderingContext2D, rect?: IRectangle): void {
        ctx.fillStyle = this.getGradient(ctx, rect) as CanvasGradient;
    }

    public strokeStyle(ctx: CanvasRenderingContext2D, rect?: IRectangle): void {
        ctx.strokeStyle = this.getGradient(ctx, rect) as CanvasGradient;
    }
    private getGradient(ctx: CanvasRenderingContext2D, rect?: IRectangle): CanvasGradient | undefined {
        if (rect) {
            this.From = { X: rect.Left, Y: rect.Top };
            this.To = { X: rect.Left + rect.Width, Y: rect.Top + rect.Height };
        }
        if (this.From && this.To && this.ColorStops) {
            let gradient = ctx.createLinearGradient(this.From.X, this.From.Y, this.To.X, this.To.Y);
            // Add three color stops
            for (let i = 0; i < this.ColorStops.length; i++) {
                gradient.addColorStop(this.ColorStops[i].Point, this.ColorStops[i].Color);
            }
            return gradient;
        }
        
        return undefined;
    }

    public getColor(): string | undefined {
        if (this.ColorStops && this.ColorStops.length > 0) {
            return this.ColorStops[0].Color;
        }
        return undefined;
    }
    /**
     * 직렬화
     * @param model 
     */
    // public Serialize(): any {
    //     let model: any = {};
    //     model["Type"] = "LinearGradient";
    //     model["From"] = this.From;
    //     model["To"] = this.To;
    //     model["ColorStops"] = this.ColorStops;
    //     return model;
    // }
    /**
     *  역직렬화
     * @param model 
     */
    // public DeSerialize(model: any): void {
    //     this.From = model["From"];
    //     this.To = model["To"];
    //     this.ColorStops = model["ColorStops"];
    // }

    public Dispose(): void {
        this.From = undefined;
        this.To = undefined;
        this.ColorStops = undefined;
    }
}
/**
 * Radial Gradient Brush
 */
export class RadialGradientBrush implements IBrush {

    constructor(from?: IPoint, to?: IPoint, radius1?: number, radius2?: number, colorStops?: Array<IColorStop>) {
        if (from) this.From = from;
        if (to) this.To = to;
        if (radius1) this.Radius1 = radius1;
        if (radius2) this.Radius2 = radius2;
        if (colorStops) this.ColorStops = colorStops;
    }
    public From: IPoint | undefined;
    public To: IPoint | undefined;
    public ColorStops: Array<IColorStop> | undefined;
    public Radius1: number;
    public Radius2: number;
    public fillStyle(ctx: CanvasRenderingContext2D, rect?: IRectangle): void {
        ctx.fillStyle = this.getGradient(ctx, rect) as CanvasGradient;
    }

    public strokeStyle(ctx: CanvasRenderingContext2D, rect?: IRectangle): void {
        ctx.strokeStyle = this.getGradient(ctx, rect) as CanvasGradient;
    }
    private getGradient(ctx: CanvasRenderingContext2D, rect?: IRectangle): CanvasGradient | undefined {
        if (rect) {
            this.From = { X: rect.Left, Y: rect.Top };
            this.To = { X: rect.Left + rect.Width, Y: rect.Top + rect.Height };
        }
        if (this.From && this.To && this.ColorStops) {

            let gradient = ctx.createRadialGradient(this.From.X, this.From.Y, this.Radius1, this.To.X, this.To.Y, this.Radius2);
            // Add three color stops
            // Add three color stops
            for (let i = 0; i < this.ColorStops.length; i++) {
                gradient.addColorStop(this.ColorStops[i].Point, this.ColorStops[i].Color);
            }
            return gradient;
        }
        return undefined;
    }
    public getColor(): string | undefined {
        if (this.ColorStops && this.ColorStops.length > 0) {
            return this.ColorStops[0].Color;
        }
        return undefined;
    }
    /**
   * 직렬화
   * @param model 
   */
    // public Serialize(): any {
    //     let model: any = {};
    //     model["Type"] = "RadialGradient";
    //     model["From"] = this.From;
    //     model["To"] = this.To;
    //     model["Radius1"] = this.Radius1;
    //     model["Radius2"] = this.Radius2;
    //     model["ColorStops"] = this.ColorStops;
    //     return model;
    // }
    /**
     *  역직렬화
     * @param model 
     */
    // public DeSerialize(model: any): void {
    //     this.From = model["From"];
    //     this.To = model["To"];
    //     this.Radius1 = model["Radius1"];
    //     this.Radius2 = model["Radius2"];
    //     this.ColorStops = model["ColorStops"];
    // }

    public Dispose(): void {
        this.From = undefined;
        this.To = undefined;
        this.ColorStops = undefined;
    }
}





/**
 * 실제 Drawing  하는 객체
 */
export class Drawing implements IDrawing, IDisposable {

    constructor(view: IDiagramView, canvas: HTMLCanvasElement) {
        this.mView = view;
        this.mCanvas = canvas;
        this.mContext = canvas.getContext("2d") as CanvasRenderingContext2D;
        // anti aliasing
        //this.mContext.translate(0.5, 0.5);  
        this.mSelectableList = new Array<ISelectable>();
        this.mImageRepository = new ImageDrawingRepisitory();
    }
    private mImageRepository : IImageDrawingRepisitory;
    private mView: IDiagramView;
    private mContext: CanvasRenderingContext2D;
    private mCanvas: HTMLCanvasElement;
    public OffsetLeft: number;
    public OffsetTop: number;
    //private mStyle: Style | undefined;
    private mSelectableList: Array<ISelectable>; //Selectable 객체
    // get OffsetLeft(){
    //     return this.mView.OffsetLeft;
    // }
    // get OffsetTop(){
    //     return this.mView.OffsetTop;
    // }
    public Dispose(): void {
        (this.mImageRepository as unknown as IDisposable).Dispose();
        (this.mContext as any) = undefined;
        (this.mCanvas as any) = undefined;
        //(this.mStyle as any) = undefined;
        (this.mSelectableList as any) = undefined;
        (this.mView as any) = undefined;
    }
    /**
     * 전체 Clear
     * @returns 
     */
    public clear(): IDrawing {
        this.mContext.clearRect(0, 0, this.mView.Width, this.mView.Height);
        this.mSelectableList = new Array<ISelectable>();
        return this;
    }
    public scale(x: number, y: number): IDrawing {
        this.mContext.scale(x, y);
        return this;
    }
    public translate(x: number, y: number): IDrawing {
        this.mContext.translate(x, y);
        return this;
    }

    /**
     * 이미지 그리기
     * @param image 
     * @param x 
     * @param y 
     * @param w 
     * @param h 
     * @returns 
     */
    public drawImage(image: CanvasImageSource, x: number, y: number, w?: number, h?: number): IDrawing {
        if (w && h) {
            this.mContext.drawImage(image, x, y, w, h);
        } else {
            this.mContext.drawImage(image, x, y);
        }
        return this;
    }
    public drawImageAsync(name: string, url: string, tag: any, callback: IImageLoadEvent): IDrawing {
        this.mImageRepository.LoadImage(name, url, tag, callback);
        return this;
    }
    /**
     * draw line
     * @param from 
     * @param to 
     * @returns 
     */
    public drawLine(from: IPoint, to: IPoint): IDrawing {
        
        from = RECT.AntiAlis(from) as IPoint;
        to = RECT.AntiAlis(to) as IPoint;
        this.mContext.beginPath();
        this.mContext.moveTo(from.X, from.Y);
        this.mContext.lineTo(to.X, to.Y);
        this.mContext.stroke();
        return this;
    }


    public setOffset(left: number, top: number): IDrawing {
        //this.mContext.translate((Math.floor(left) * -1) + 0.5, (Math.floor(top) * -1) + 0.5);          
        this.mContext.translate((Math.floor(left) * -1), (Math.floor(top) * -1));
        return this;
    }
    /**
     * 그림자 효과
     * @param x 
     * @param y 
     * @param blur 
     * @param color 
     * @returns 
     */
    public setShadow(x:number,y:number, blur:number, color:string):IDrawing{
        this.mContext.shadowOffsetX = x;
        this.mContext.shadowOffsetY = y;
        this.mContext.shadowBlur = blur;
        this.mContext.shadowColor = color;
        return this;
    }
    /**
     * 화살표 그리기
     * @param from 
     * @param to 
     * @param headlen 
     */
    public drawArrow(from:IPoint, to:IPoint, headlen:number):IDrawing {        
        let dx = to.X - from.X;
        let dy = to.Y - from.Y;
        let angle = Math.atan2(dy, dx);
        this.mContext.moveTo(from.X, from.Y);
        this.mContext.lineTo(to.X, to.Y);
        this.mContext.stroke();
        //
        this.mContext.beginPath()
        this.mContext.setLineDash([]);
        this.mContext.moveTo(to.X, to.Y);
        this.mContext.lineTo(to.X - headlen * Math.cos(angle - Math.PI / 6), to.Y - headlen * Math.sin(angle - Math.PI / 6));
        this.mContext.moveTo(to.X, to.Y);
        this.mContext.lineTo(to.X - headlen * Math.cos(angle + Math.PI / 6), to.Y - headlen * Math.sin(angle + Math.PI / 6));
        this.mContext.stroke();
        return this;
    }
      
    public drawArrowPath(points:Array<IPoint>, headlen:number):IDrawing{
        if(points.length < 2){return this;}
        if(points.length == 2){
            return this.drawArrow(points[0], points[1], 10);    
        }
        
        let from : IPoint = points[points.length - 2];
        let  to  : IPoint = points[points.length - 1];
        let  dx  : number = to.X - from.X;
        let  dy  : number = to.Y - from.Y;
        let angle : number  = Math.atan2(dy, dx);
        this.moveTo(points[0]);
        for(let i=1;i<points.length - 1; i++){
            this.lineTo(points[i])
        }
        //화살표 그리기 (화살표는 점선으로 안그려 지도록)
        this.lineTo(to)
            .stroke()
            .beginPath()
            .setLineDash([])
            .moveTo(to)            
            .lineTo(RECT.Point(to.X - headlen * Math.cos(angle - Math.PI / 6), to.Y - headlen * Math.sin(angle - Math.PI / 6)))
            .moveTo(to)
            .lineTo(RECT.Point(to.X - headlen * Math.cos(angle + Math.PI / 6), to.Y - headlen * Math.sin(angle + Math.PI / 6)))
            .stroke();
        return this; 
    }


    /**
     * 경로 출력
     * @param paths 
     * @returns 
     */
    public drawPath(paths:Array<IPoint>):IDrawing{
        this.mContext.beginPath();
        for(let i=0,len=paths.length; i<len;i++){
            if(i==0){
                this.mContext.moveTo(paths[i].X, paths[i].Y);
            }else{
                this.mContext.lineTo(paths[i].X, paths[i].Y);
            }
        }
        this.mContext.stroke();
        return this;
    }

    /**
     * 이동
     * @param to 
     * @returns 
     */
    public moveTo(to: IPoint): IDrawing {
        to = RECT.AntiAlis(to) as IPoint;
        this.mContext.moveTo(to.X, to.Y);
        return this;
    }
    public lineTo(to: IPoint): IDrawing {
        to = RECT.AntiAlis(to) as IPoint;
        this.mContext.lineTo(to.X, to.Y);
        return this;
    }
    public stroke(): IDrawing {
        this.mContext.stroke();
        return this;
    }
    public beginPath(): IDrawing {
        this.mContext.beginPath();
        return this;
    }
    public closePath(): IDrawing {
        this.mContext.closePath();
        return this;
    }
    public fill(): IDrawing {
        this.mContext.fill();
        return this;
    }
    public save(): IDrawing {
        this.mContext.save();
        return this;
    }
    public restore(): IDrawing {
        this.mContext.restore();
        return this;
    }
    public clearRect(rect: IRectangle): IDrawing {
        rect = RECT.AntiAlis(rect) as IRectangle;
        this.mContext.clearRect(rect.Left, rect.Top, rect.Width, rect.Height);
        return this;
    }

    public fillRect(rect: IRectangle, color?:string|IStyle): IDrawing {
        rect = RECT.AntiAlis(rect) as IRectangle; 
    
        if (color) {
            if(typeof color == "string"){
                this.mContext.fillStyle = color;
            }else{
                let style : Style = color as Style;
                if(style.FillBrush){
                    style.FillBrush.fillStyle(this.mContext, rect);
                }
            }
        }
        this.mContext.fillRect(rect.Left, rect.Top, rect.Width, rect.Height);        
        return this;
    }
    public updateStyle(style?: IStyle): IDrawing {
        if(style){
           style.Update(this.mContext);
        }
        return this as IDrawing;
    }
    public updateFontStyle(style?: IStyle): IDrawing {
        if(style){
           style.UpdateFontStyle(this.mContext);
        }
        return this as IDrawing;
    } 
    
    public arc(x:number, y:number, radius:number, start : number, end:number): IDrawing {
        this.mContext.arc(x, y, radius, start, end);
        return this;
    }
    public flllCircle(x:number, y:number, radius:number): IDrawing {
        this.mContext.beginPath();
        this.mContext.arc(x, y, radius, 0, Math.PI * 2);
        this.mContext.fill();
        return this;
    }
    public strokeCircle(x:number, y:number, radius:number): IDrawing {
        this.mContext.beginPath();
        this.mContext.arc(x, y, radius, 0, Math.PI * 2);
        this.mContext.stroke();
        return this;
    }

    public roundRect(rect:IRectangle, fill:boolean, stroke:boolean, style:IStyle): IDrawing {
        rect = RECT.AntiAlis(rect) as IRectangle;
        let radius: ICornerRadius | undefined = undefined;
        
        //this.mContext.save();
        try{
            if (style) {
                radius = style.CornerRadius;
                style.Update(this.mContext, rect);
            }
            let x = rect.Left;
            let y = rect.Top;
            let width = rect.Width;
            let height = rect.Height;
            if (radius) {
                this.mContext.beginPath();
                this.mContext.moveTo(x + radius.TL, y);
                this.mContext.lineTo(x + width - radius.TR, y);

                this.mContext.quadraticCurveTo(x + width, y, x + width, y + radius.TR);
                this.mContext.lineTo(x + width, y + height - radius.BR);

                this.mContext.quadraticCurveTo(x + width, y + height, x + width - radius.BR, y + height);
                this.mContext.lineTo(x + radius.BL, y + height);

                this.mContext.quadraticCurveTo(x, y + height, x, y + height - radius.BL);
                this.mContext.lineTo(x, y + radius.TL);

                this.mContext.quadraticCurveTo(x, y, x + radius.TL, y);
                this.mContext.closePath();
                if (fill) {
                    this.mContext.fill();
                }
                if (stroke) {
                    this.mContext.stroke();
                }
            } else {
                //rect
                if (fill) {
                    this.mContext.fillRect(rect.Left, rect.Top, rect.Width, rect.Height);
                }
                if (stroke) {
                    this.mContext.strokeRect(rect.Left, rect.Top, rect.Width, rect.Height);
                }
            }
        }catch(e){

        }
        // finally{
        //     this.mContext.restore();
        // }
        return this;
    }

    public strokeRect(rect: IRectangle, color?:string|IStyle): IDrawing {
        rect = RECT.AntiAlis(rect) as IRectangle;
        if(color){
            if(typeof color == "string"){
                this.mContext.strokeStyle = color;
            }else{
                let style : IStyle = color as IStyle;
                if(style.LineBrush){
                    style.LineBrush.strokeStyle(this.mContext);
                }
            }
        } 
        this.mContext.strokeRect(rect.Left, rect.Top, rect.Width, rect.Height);
        
        return this;
    }
    
    /**
     * 선택 포인트 
     * @param pt 
     * @returns 
     */
    public selectPoint(pt: IPoint, size: number): IDrawing {

        pt = RECT.AntiAlis(pt) as IPoint;
        let radius: number = size / 2;
        let rhalf: number = radius / 2;
        this.mContext.fillRect(pt.X - radius, pt.Y - radius, size, size);
        this.mContext.strokeRect(pt.X - radius, pt.Y - radius, size, size);
        this.mContext.strokeRect(pt.X - rhalf, pt.Y - rhalf, radius, radius);
        return this;
    }

    public lineWidth(width:number):IDrawing{
        this.mContext.lineWidth = width;
        return this;
    }
    public strokeStyle(color:string):IDrawing{
        this.mContext.strokeStyle = color;
        return this;
    }
    public fillStyle(color:string):IDrawing{
        this.mContext.fillStyle = color;
        return this;
    }


    public setFontStyle(size:number, fontName:string, color:string, bold?:boolean, italic?:boolean): IDrawing {
        if (color) {
            this.mContext.fillStyle = color;
        }
        let fntStyles: Array<string> = new Array<string>();

        if (italic === true) fntStyles.push("italic");
        if (bold === true)   fntStyles.push("bold");
        
        fntStyles.push(size + "px");
        fntStyles.push("'" + fontName+ "'");
        
        this.mContext.font = fntStyles.join(" ");
        return this;
        
    }

    public setLineDash(dashArray:Array<number>):IDrawing{
        this.mContext.setLineDash(dashArray);
        return this;
    }

    public drawBorder(rect: IRectangle, style:IStyle): IDrawing {
        rect = RECT.AntiAlis(rect) as IRectangle;
 
        try { 
            if (style && style.Border) {
                let border : IThickness = style.Border;
                let hasLine = false;
                //this.mContext.save();
                //line top
                this.beginPath();
                if (border.Top) {
                    this.mContext.lineWidth = border.Top;
                    this.moveTo({ "X": rect.Left, "Y": rect.Top })
                        .lineTo({ "X": RECT.Right(rect), "Y": rect.Top });

                    hasLine = true;
                }
                // line right
                if (border.Right) {
                    this.mContext.lineWidth = border.Right;
                    this.moveTo({ "X": RECT.Right(rect), "Y": rect.Top })
                        .lineTo({ "X": RECT.Right(rect), "Y": RECT.Bottom(rect) });
                    hasLine = true;
                }
                // line bottom
                if (border.Bottom) {
                    this.mContext.lineWidth = border.Bottom;
                    this.moveTo({ "X": RECT.Right(rect), "Y": RECT.Bottom(rect) })
                        .lineTo({ "X": rect.Left, "Y": RECT.Bottom(rect) });
                    hasLine = true;
                }

                // line left top
                if (border.Left) {
                    this.mContext.lineWidth = border.Left;
                    this.moveTo({ "X": rect.Left, "Y": RECT.Bottom(rect) })
                        .lineTo({ "X": rect.Left, "Y": rect.Top });
                    hasLine = true;
                }
                if (hasLine) {
                    this.stroke();
                }
                

            } 
        } catch (e) { }
 
        return this;
    }

    /**
     * 자동 줄바꿈 시 라인 수 계산 하기
     * @param text 
     * @param limitWidth 
     * @param align 
     * @returns 
     */
	public getWrapText(text: string, limitWidth: number, align: enHorizonAlign): Array<string> {
		/* 텍스트 너비 계산 하기 */
        let ctx: CanvasRenderingContext2D = this.mContext; 
		let result: Array<string> = new Array<string>();
		let chr: string;
		let nxt: string;
		let idx: number = 0;
		let wText: string;
		let startIndex: number = 0;
		while (true) {
			chr = text.substring(idx, idx + 1);

			if (chr == "\r") {
				if (idx < text.length - 1) {
					nxt = text.substring(idx + 1, idx + 2);
				} else {
					nxt = "";
				}
				if (nxt == "\n") {
					idx++;
				}
				result.push(text.substring(startIndex, idx));
				startIndex = idx + 1;
				//text = text.substring(idx+1);
				//idx = -1;					
			} else if (chr == "\n") {
				result.push(text.substring(startIndex, idx));
				startIndex = idx + 1;
				//text = text.substring(idx+1);
				//idx = -1;	
			} else {
				//너비 점검					
				if (align != enHorizonAlign.Center) {
					wText = " " + text.substring(startIndex, idx + 1);
				}else{
					wText = text.substring(startIndex, idx + 1);
				}
				if(ctx.measureText(wText).width > limitWidth){
					//크면 인덱스 줄이기	
					result.push(text.substring(startIndex, idx));
					startIndex = idx;
				}
			}
			idx++;
			if (idx >= text.length) {
				break;
			}

		}
		if (text.length > startIndex) {
			result.push(text.substring(startIndex));
		}
		return result;

	}

    /**
     * 폰트의 높이 자동 계산하기(자동 줄바꿈)
     * @param text 
     * @param limitWidth 
     * @param align 
     * @param style 
     * @returns 
     */
    public getWrapTextHeight(text:string, limitWidth:number, align:enHorizonAlign, style?:IStyle):number{
 
        let fontSize: number = 12;         
        let padding: IThickness = { "Left": 0, "Top": 0, "Right": 0, "Bottom": 0 };
        if (style) {
            style.UpdateFontStyle(this.mContext);
            fontSize = style.getFontSize(12);
            if (style.Padding) {
                padding = style.Padding;
            }
        }
        let arrText : Array<string>;        
        let MARGIN = 2;
        let MARGIN_2X = 4 + (padding.Left + padding.Right);
        let stockHeight = 0; //margin top;
        arrText = this.getWrapText(text, limitWidth - MARGIN_2X, align);
        for (let i = 0; i < arrText.length; i++) {
            stockHeight += MARGIN;
            stockHeight += fontSize;
        }
        return stockHeight;
    }


    public fillText(text: string, rect: IRectangle, style?:IStyle): IDrawing {
        if (!text) return this;
        rect = RECT.AntiAlis(rect) as IRectangle; 
        //this.mContext.save();
        try {
            let vAlign: enVerticalAlign = enVerticalAlign.Center;
            let hAlign: enHorizonAlign = enHorizonAlign.Left;
            let fontSize: number = 12;
            let underline: boolean = false;
            let wrap : boolean = false;
            let padding: IThickness = { "Left": 0, "Top": 0, "Right": 0, "Bottom": 0 };
            if (style) {
                style.UpdateFontStyle(this.mContext);

                fontSize = style.getFontSize(12);
                vAlign = style.VAlign as enVerticalAlign;
                hAlign = style.HAlign as enHorizonAlign;
                if (style.FontStyle) {
                    underline = style.FontStyle.UnderLine === true;
                    wrap = style.FontStyle.Wrap === true;
                }

                if (style.Padding) {
                    padding = style.Padding;
                }
            }
            let msText: IMeasureText = { "Text": text, "Cut": false, "Width": 0 };


            let arrText : Array<string>;
            
            let MARGIN = 2;
            let MARGIN_2X = 4 + (padding.Left + padding.Right);
            let stockHeight = 0; //margin top;
            let measureTextList = new Array<IMeasureText>();
            if(wrap == true){
                arrText = this.getWrapText(text, rect.Width - MARGIN_2X, hAlign);
            }else{
                arrText = text.split("\n");  
            }
            
            for (let i = 0; i < arrText.length; i++) {
                stockHeight += MARGIN;
                text = arrText[i];
                if(wrap == true){
                    msText = { "Text": text, "Cut": false, "Width":  this.mContext.measureText(text).width };
                }else{
                    if (text.length > 0) {
                        // text 길이 자르기
                        if (hAlign != enHorizonAlign.Right) {
                            msText = this.measureText(text, rect.Width - MARGIN_2X, false); // -4 == MARGIN * 2                   
                        } else { // right
                            msText = this.measureText(text, rect.Width - MARGIN_2X, true);
                        }
                    } else {
                        msText = { "Text": "", "Cut": false, "Width": 0 };
                    }
                }
                
                if ((stockHeight + fontSize) > rect.Height) { //check height over
                    break;
                }
                stockHeight += fontSize;

                // add draw target list
                (msText as any)["Top"] = stockHeight;
                measureTextList.push(msText);
            }

            // drawing
            let lft: number;
            let tp: number;

            /* top */
            if (vAlign == enVerticalAlign.Top) {
                tp = 0;
            } else if (vAlign == enVerticalAlign.Center) {
                tp = Math.floor((rect.Height - stockHeight) / 2) - MARGIN;
            } else {// if(vAlign == enVerticalAlign.Bottom){
                tp = Math.floor((rect.Height - stockHeight)) - MARGIN;
            }
            for (let i = 0; i < measureTextList.length; i++) {
                msText = measureTextList[i];
                if (hAlign == enHorizonAlign.Left) {
                    lft = MARGIN + padding.Left;
                } else if (hAlign == enHorizonAlign.Center) {
                    lft = Math.floor((rect.Width - msText.Width) / 2);
                } else {// if(hAlign == enHorizonAlign.Right){
                    lft = Math.floor((rect.Width - msText.Width) - MARGIN - padding.Right);
                }
                this.mContext.fillText(msText.Text, Math.floor(rect.Left + lft) - 0.5, Math.floor(rect.Top + (msText as any)["Top"] + tp) - 0.5);
                //this.mContext.fillText(measureText.Text,  Math.floor(rect.Left + lft), Math.floor(rect.Top + measureText["Top"] + tp)) ;
                if (underline) {
                    this.mContext.lineWidth = 1;
                    this.mContext.beginPath();
                    this.mContext.moveTo(Math.floor(rect.Left + lft), Math.floor(rect.Top + (msText as any)["Top"] + tp + MARGIN));
                    this.mContext.lineTo(Math.floor(rect.Left + lft + msText.Width), Math.floor(rect.Top + (msText as any)["Top"] + tp + MARGIN));
                    this.mContext.stroke();
                }
            }
        } catch (e) {

        } 
        //this.mContext.restore();
        return this;
    }

    public measureText(text: string, limitWidth: number, isRight: boolean): IMeasureText {

        let ctx = this.mContext;
        /* 텍스트 너비 계산 하기 */
        let w = ctx.measureText(text).width;
        if (w < limitWidth) {
            return { "Text": text, "Cut": false, "Width": w };
        }
        let iw = ctx.measureText("W").width;
        let idx = parseInt((limitWidth / iw) + "");
        if (isRight == true) {
            // 우측 정렬 일 경우	
            w = ctx.measureText(text.substring(idx, text.length)).width;
            if (w < limitWidth) {
                w = ctx.measureText(text.substring(idx, text.length)).width;
                while (w < limitWidth) {
                    idx--;
                    w = ctx.measureText(text.substring(idx, text.length)).width;
                    if (idx < 0) break;
                }
                return { "Text": text.substring(++idx, text.length), "Cut": true, "Width": w };
            } else {
                w = ctx.measureText(text.substring(idx, text.length)).width;
                while (w > limitWidth) {
                    idx++;
                    w = ctx.measureText(text.substring(idx, text.length)).width
                    if (idx >= text.length) break;
                }
                return { "Text": text.substring(idx, text.length), "Cut": true, "Width": w };
            }
        } else {
            w = ctx.measureText(text.substring(0, idx)).width;
            if (w < limitWidth) {
                w = ctx.measureText(text.substring(0, idx)).width;
                while (w < limitWidth) {
                    idx++;
                    w = ctx.measureText(text.substring(0, idx)).width;
                    if (idx >= text.length) break;
                }
                return { "Text": text.substring(0, idx - 1), "Cut": true, "Width": w };
            } else {
                w = ctx.measureText(text.substring(0, idx)).width;
                while (w > limitWidth) {
                    idx--;
                    w = ctx.measureText(text.substring(0, idx)).width;
                    if (idx < 0) break;
                }
                return { "Text": text.substring(0, idx), "Cut": true, "Width": w };
            }
        }
    }
    /**
     * Font가 출력될 최대 사이즈
     * @param text 
     * @returns 
     */
    public getTextWidth(text: string, style?: IStyle): number {
        if (style) { style.UpdateFontStyle(this.mContext); }
        return this.mContext.measureText(text).width;
    }
    /**
      * 폰트 Height 구하기
      * @param ctx 
      * @param size 
      */
    public getFontHeight(pt: number): number {
        /* font height */
        //return Math.round(size * 1.13);
        //return Math.round(jt * 1.6); 
        //1 to 36

        const CODE_TABLE = [1.50, 1.50, 1.50, 1.50, 1.50, 1.50, 1.50, 1.50, 1.60, 1.60
            , 1.50, 1.52, 1.50, 1.52, 1.47, 1.46, 1.49, 1.51, 1.48, 1.48
            , 1.50, 1.49, 1.49, 1.48, 1.50, 1.50, 1.51, 1.51, 1.51, 1.50
            , 1.52, 1.48, 1.49, 1.51, 1.52, 1.5];

        if (pt <= 36 && pt > 0) {
            return Math.round(CODE_TABLE[pt - 1] * pt);
        } else if (pt == 48) {
            return Math.round(1.52 * pt);
        } else if (pt == 72) {
            return Math.round(1.53 * pt);
        }

        return Math.round(1.5 * pt);
    }
    /**
     * 폰트 너비 구하기
     * @param ctx 
     * @param text 
     */
    public getFontWidth(text: string): number {
        /* font width */
        return this.mContext.measureText(text).width;
    }
    /**
     * 선택 가능한 객체 목록 
     * @param select 
     * @returns 
     */
    public addSelectable(ctl: ISelectable): IDrawing {
        this.mSelectableList.push(ctl);
        return this;
    }
    /**
     * 화면에 그려진 선택 가능한 항목 리스트
     * @returns 
     */
    public getSelectableList(): Array<ISelectable> {
        return this.mSelectableList;
    }

    /**
     * 영역내에 있는 항목 점검
     * @param pt 
     * @returns 
     */
    public HitTest(pt: IPoint): IHitTestResult | undefined {
        let ctl: ISelectable;
        let offset: IPoint = { "X": pt.X + this.OffsetLeft, "Y": pt.Y + this.OffsetTop };
        for (let i = this.mSelectableList.length - 1; i >= 0; i--) {
            ctl = this.mSelectableList[i];
            if (RECT.InPoint(ctl, offset)) {
                return this.mView.Document.HitTest(ctl, offset);
            }
        }   
        return undefined;     
    }

    public HitTestEvent(pt: IPoint, evt:IMouseEventArgs): IHitTestResult | undefined {
        let ctl: ISelectable;
        let offset: IPoint = { "X": pt.X + this.OffsetLeft, "Y": pt.Y + this.OffsetTop };
        for (let i = this.mSelectableList.length - 1; i >= 0; i--) {
            ctl = this.mSelectableList[i];
            if (RECT.InPoint(ctl, offset)) {
                return this.mView.Document.HitTestEvent(ctl, offset, evt);
            }
        }
        // 빈공간 클릭
        return this.mView.Document.HitTestEvent(null, offset, evt);

    }
    public HitTestList(pt: IPoint): Array<IHitTestResult> {

        let items = new Array<IHitTestResult>();
        let ctl: ISelectable;
        let offset: IPoint = { "X": pt.X + this.OffsetLeft, "Y": pt.Y + this.OffsetTop };
        let result: IHitTestResult | undefined;
        for (let i = this.mSelectableList.length - 1; i >= 0; i--) {
            ctl = this.mSelectableList[i];
            if (RECT.InPoint(ctl, offset)) {
                result = this.mView.Document.HitTest(ctl, offset);
                if (result) {
                    items.push(result);
                }
            }
        }
        return items;
    }
    /**
     * 마우스로 리사이즈 하기위한 위치값을 찾습니다.
     * @param pt 
     * @returns 
     */
    public HitTestResizePointer(pt: IPoint): IHitTestResult | undefined {

        let ctl: ISelectable;
        let offset: IPoint = { "X": pt.X + this.OffsetLeft, "Y": pt.Y + this.OffsetTop };
        let result: IHitTestResult | undefined;

        for (let i = this.mSelectableList.length - 1; i >= 0; i--) {
            ctl = this.mSelectableList[i];
            if (RECT.InPoint(RECT.Wide(ctl, 5), offset)) {
                result = this.mView.Document.HitTest(ctl, offset);
                if (result && result.Resizable) {
                    result.ResizeCursor = RECT.getResizePoint(ctl, offset);
                    if (result.ResizeCursor) {
                        switch (result.ResizeCursor) {
                            case enResizeType.None:
                                return;
                            case enResizeType.Left:
                            case enResizeType.Right:
                                if (result.FixWidth === true) {
                                    return;
                                } else {
                                    return result;
                                }
                            case enResizeType.Top:
                            case enResizeType.Bottom:
                                if (result.FixHeight === true) {
                                    return;
                                } else {
                                    return result;
                                }
                            case enResizeType.LeftTop:
                            case enResizeType.RightTop:
                            case enResizeType.RightBottom:
                            case enResizeType.LeftBottom:
                                if (result.FixWidth === true || result.FixHeight === true) {
                                    return;
                                } else {
                                    return result;
                                }
                        }
                    }
                }
                return undefined;
            }
        }
        return undefined;
    }

    /**
     *  컨트롤 이동 및 사이즈 변경 시 자석처럼 붙는 위치를 찾기 위한 값을 탐색 합니다.
     * @param rect 
     * @param resize 
     * @returns 
     */
    public HitTestMagnetPointer(rect: IRectangle, resize: enResizeType): IMagnetPointer {

        let ctlRect: IRectangle;
        let allowMargin = 10; //마진
        let result: IMagnetPointer = { "X": 1000, "Y": 1000, "Left": -1, "Top": -1 };
        let xPos: number = 0;
        let yPos: number = 0;
        let beforePos: IPoint = { "X": 1000, "Y": 1000 };
        this.mSelectableList.forEach(ctl => {

            if (!ctl.IsSelected) {
                ctlRect = ctl;
                //get x position
                switch (resize) {
                    case enResizeType.Left: // 1,  
                        result.X = Math.min(result.X
                            , Math.abs(ctlRect.Left - rect.Left)
                            , Math.abs(RECT.Right(ctlRect) - rect.Left));
                        break;
                    case enResizeType.Top: // 2,                            
                        result.Y = Math.min(result.Y
                            , Math.abs(ctlRect.Top - rect.Top)
                            , Math.abs(RECT.Bottom(ctlRect) - rect.Top));
                        break;
                    case enResizeType.Right: // 3,
                        result.X = Math.min(result.X
                            , Math.abs(ctlRect.Left - RECT.Right(rect))
                            , Math.abs(RECT.Right(ctlRect) - RECT.Right(rect)));
                        break;
                    case enResizeType.Bottom: // 4,                            
                        result.Y = Math.min(result.Y
                            , Math.abs(ctlRect.Top - RECT.Bottom(rect))
                            , Math.abs(RECT.Bottom(ctlRect) - RECT.Bottom(rect)));
                        break;
                    case enResizeType.LeftTop: // 5,  
                        result.X = Math.min(result.X
                            , Math.abs(ctlRect.Left - rect.Left)
                            , Math.abs(RECT.Right(ctlRect) - rect.Left));
                        result.Y = Math.min(result.Y
                            , Math.abs(ctlRect.Top - rect.Top)
                            , Math.abs(RECT.Bottom(ctlRect) - rect.Top));
                        break;
                    case enResizeType.RightTop: // 6,    
                        result.X = Math.min(result.X
                            , Math.abs(ctlRect.Left - RECT.Right(rect))
                            , Math.abs(RECT.Right(ctlRect) - RECT.Right(rect)));
                        result.Y = Math.min(result.Y
                            , Math.abs(ctlRect.Top - rect.Top)
                            , Math.abs(RECT.Bottom(ctlRect) - rect.Top));
                        break;
                    case enResizeType.RightBottom: // 7,                      
                        result.X = Math.min(result.X
                            , Math.abs(ctlRect.Left - RECT.Right(rect))
                            , Math.abs(RECT.Right(ctlRect) - RECT.Right(rect)));

                        result.Y = Math.min(result.Y
                            , Math.abs(ctlRect.Top - RECT.Bottom(rect))
                            , Math.abs(RECT.Bottom(ctlRect) - RECT.Bottom(rect)));
                        break;

                    case enResizeType.LeftBottom: // 8,                          
                        result.X = Math.min(result.X
                            , Math.abs(ctlRect.Left - rect.Left)
                            , Math.abs(RECT.Right(ctlRect) - rect.Left));

                        result.Y = Math.min(result.Y
                            , Math.abs(ctlRect.Top - RECT.Bottom(rect))
                            , Math.abs(RECT.Bottom(ctlRect) - RECT.Bottom(rect)));
                        break;
                    case enResizeType.None: // move

                        //get x position
                        result.X = Math.min(result.X
                            , Math.abs(ctlRect.Left - rect.Left)
                            , Math.abs(RECT.Right(ctlRect) - rect.Left)
                            , Math.abs(ctlRect.Left - RECT.Right(rect))
                            , Math.abs(RECT.Right(ctlRect) - RECT.Right(rect)));
                        // get y position
                        result.Y = Math.min(result.Y
                            , Math.abs(ctlRect.Top - rect.Top)
                            , Math.abs(RECT.Bottom(ctlRect) - rect.Top)
                            , Math.abs(ctlRect.Top - RECT.Bottom(rect))
                            , Math.abs(RECT.Bottom(ctlRect) - RECT.Bottom(rect)));

                        break;
                }

                if (beforePos.X > result.X) {
                    if (Math.min(Math.abs(ctlRect.Left - rect.Left), Math.abs(ctlRect.Left - RECT.Right(rect)))
                        < Math.min(Math.abs(RECT.Right(ctlRect) - rect.Left), Math.abs(RECT.Right(ctlRect) - RECT.Right(rect)))) {
                        xPos = ctlRect.Left;
                    } else {
                        xPos = RECT.Right(ctlRect);
                    }
                    beforePos.X = result.X;
                }
                if (beforePos.Y > result.Y) {
                    if (Math.min(Math.abs(ctlRect.Top - rect.Top), Math.abs(ctlRect.Top - RECT.Bottom(rect)))
                        < Math.min(Math.abs(RECT.Bottom(ctlRect) - rect.Top), Math.abs(RECT.Bottom(ctlRect) - RECT.Bottom(rect)))) {
                        yPos = ctlRect.Top;
                    } else {
                        yPos = RECT.Bottom(ctlRect);
                    }
                    beforePos.Y = result.Y;
                }
            }
        });

        if (result.X >= 0 && result.X < allowMargin) {
            // left
            if (xPos < rect.Left) {
                result.X *= -1; //뒤로 이동                    
            }
            result.Left = xPos;
        } else {
            result.X = 0;
        }
        if (result.Y > 0 && result.Y < allowMargin) {
            // left
            if (yPos < rect.Top) {
                result.Y *= -1; //뒤로 이동                    
            }
            result.Top = yPos;

        } else {
            result.Y = 0;
        }
        return result;
    }



    /**
     * 영역 선택하기
     *   (영역은 복사/붙여 넣기시 순서를 위해 정순으로 검색합니다.)
     * @param rect 
     * @returns 
     */
    public HitTestRect(rect: IRectangle): Array<IHitTestResult> {
 
        let items = new Array<IHitTestResult>();
        let result: IHitTestResult | undefined;
        let interSect: IRectangle | undefined;
        let ctlRect: IRectangle;
        
        this.mSelectableList.forEach(ctl => {
            ctlRect = ctl;
            interSect = RECT.Intersect(rect, ctlRect);
            if (interSect && (interSect.Width > (ctlRect.Width * 0.2))
                && (interSect.Height > (ctlRect.Height * 0.2))) {
                result = this.mView.Document.HitTest(ctl);
                if (result) {
                    items.push(result);
                }
            }


        });
        return items;
    }
 
    public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): IDrawing {
        this.mContext.quadraticCurveTo(cpx, cpy, x, y);
        return this;
    }
} 
 
/**
 * 이미지 Repository
 */
export class ImageDrawingRepisitory implements IImageDrawingRepisitory, IDisposable{
    constructor(){
        this.mQueueList = {};
    }    
    private mQueueList : {[key: string]:IImageWaitList};

    public Dispose(){
        let _this = this;
        let item : IImageWaitList;
        for(let key in this.mQueueList){
            item = _this.mQueueList[key];
            (item.Image as unknown) = undefined;
            item.WaitList = [];
        }
        (_this.mQueueList as unknown) = undefined;        
    }
    /**
     * 이미지 로딩 하기
     * @param name 
     * @param url 
     * @param tag 
     * @param callback 
     */
    public LoadImage(name: string, url: string, tag: any, callback: IImageLoadEvent): void {
        let _this = this;
        let item : IImageWaitList;
        let waitList :  Array<IImageWaitItem>;
        if(_this.mQueueList.hasOwnProperty(name)){
            item = _this.mQueueList[name];
            if(item.Failed){ 
                //이미지 로딩 실패한 경우
                return;
            }
            if(item.Loaded){
                //이미지가 로딩된 경우 이미지 출력
                callback(tag, item.Image);
                return;
            }
            //wait 리스트에 등록
            item.WaitList.push({OnLoadImage:callback , Tag : tag});
        }else{
            waitList = new  Array<IImageWaitItem>();
            item =  { Image: document.createElement("img")
                    , Loaded : false
                    , Failed : false
                    , WaitList : waitList};

            item.Image.onload = function(){
                //이미지 로딩 시 하위 항목 모드 그리기
                item.Loaded = true;
                item.WaitList.forEach(wait => {
                    wait.OnLoadImage(wait.Tag, item.Image);
                });
                item.WaitList = [];
            };
            item.Image.onerror = function(){
                item.WaitList = [];
                item.Failed = true;
            };
            //wait 리스트에 등록
            waitList.push({OnLoadImage:callback , Tag : tag});

            item.Image.src  = url;
            _this.mQueueList[name] = item;
        }
        
        
    }
}