import { DataSet } from "@AUD_CLIENT/data/DataSet";

(function (global: any) {
    'use strict';

    interface ColorStop {
        offset: number;
        color: string;
    }

    const COLOR_SCHEMES: Record<string, ColorStop[]> = {
        'green-red': [
            { offset: 0,   color: '#4caf50' },
            { offset: 0.5, color: '#ffeb3b' },
            { offset: 1,   color: '#f44336' }
        ],
        'blue': [
            { offset: 0,   color: '#e3f2fd' },
            { offset: 0.5, color: '#42a5f5' },
            { offset: 1,   color: '#0d47a1' }
        ],
        'rainbow': [
            { offset: 0,    color: '#2196f3' },
            { offset: 0.25, color: '#4caf50' },
            { offset: 0.5,  color: '#ffeb3b' },
            { offset: 0.75, color: '#ff9800' },
            { offset: 1,    color: '#f44336' }
        ],
        'monochrome': [
            { offset: 0,   color: '#e0e0e0' },
            { offset: 0.5, color: '#757575' },
            { offset: 1,   color: '#212121' }
        ]
    };

    const SVG_NS = 'http://www.w3.org/2000/svg';

    class GaugeComponent implements IComponentBridge {
        private container: HTMLDivElement | null = null;
        private config: any = {};
        private svgEl: SVGSVGElement | null = null;
        private arcPath: SVGPathElement | null = null;
        private valuePath: SVGPathElement | null = null;
        private valueText: SVGTextElement | null = null;
        private titleText: SVGTextElement | null = null;
        private currentValue: number = 0;
        private animationId: number | null = null;
        private _totalLength: number = 0;

        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            const minVal: number = this.config.MinValue != null ? this.config.MinValue : 0;
            const maxVal: number = this.config.MaxValue != null ? this.config.MaxValue : 100;
            this.config.MinValue = minVal;
            this.config.MaxValue = maxVal;
            this._buildSVG();
        }

        Resize(width: number, height: number): void {
            if (this.svgEl) {
                this.svgEl.setAttribute('width', String(width));
                this.svgEl.setAttribute('height', String(height));
            }
        }

        Dispose(): void {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            if (this.container) {
                this.container.innerHTML = '';
            }
            this.container = null;
            this.svgEl = null;
            this.arcPath = null;
            this.valuePath = null;
            this.valueText = null;
            this.titleText = null;
        }

        ApplyDataSource(ds:DataSet):void{
            
        }
        SetData(data: any): void {
            if (!data) return;
            let val: number | null = null;
            if (data.value != null) {
                val = Number(data.value);
            } else if (data.rows && data.rows.length > 0) {
                const rows: any[] = data.rows || data.Rows || [];
                const row = rows[0];
                val = Number(Array.isArray(row) ? row[0] : row[Object.keys(row)[0]]);
            }
            if (val != null && !isNaN(val)) {
                this._animateTo(val);
            }
        }

        GetValue(): string[] {
            return [String(this.currentValue)];
        }

        SetValue(values: string[]): void {
            if (values && values.length > 0) {
                const v: number = Number(values[0]);
                if (!isNaN(v)) {
                    this._animateTo(v);
                }
            }
        }

        Serialize(target: any): void {
            target.currentValue = this.currentValue;
        }

        Deserialize(source: any): void {
            if (source && source.currentValue != null) {
                this.currentValue = source.currentValue;
                this._drawValue(this.currentValue);
            }
        }

        setValue(val: number | string): void {
            this._animateTo(Number(val));
        }

        setTitle(title: string): void {
            this.config.Title = title;
            if (this.titleText) {
                this.titleText.textContent = title || '';
            }
        }

        setColorScheme(scheme: string): void {
            this.config.ColorScheme = scheme;
            this._updateGradient();
            this._drawValue(this.currentValue);
        }

        getValue(): number {
            return this.currentValue;
        }

        private _buildSVG(): void {
            const size = 200;
            const cx: number = size / 2;
            const cy: number = size / 2;
            const radius: number = size * 0.38;
            const trackWidth: number = size * 0.08;

            const svg: SVGSVGElement = document.createElementNS(SVG_NS, 'svg');
            // 정사각형 viewBox: 값 텍스트(cy=100)가 정중앙에 오도록 배치
            // 아크 상단(y=16)에서 위로 84, 아래로 84 → y: 16~184
            svg.setAttribute('viewBox', '16 16 168 168');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('class', 'gauge-svg');

            const defs: SVGDefsElement = document.createElementNS(SVG_NS, 'defs');
            const grad: SVGLinearGradientElement = document.createElementNS(SVG_NS, 'linearGradient') as SVGLinearGradientElement;
            grad.setAttribute('id', 'gaugeGrad');
            grad.setAttribute('x1', '0%');
            grad.setAttribute('y1', '0%');
            grad.setAttribute('x2', '100%');
            grad.setAttribute('y2', '0%');
            this._appendGradientStops(grad);
            defs.appendChild(grad);
            svg.appendChild(defs);

            const startAngle: number = this.config.StartAngle != null ? this.config.StartAngle : 220;
            const endAngle: number = this.config.EndAngle != null ? this.config.EndAngle : -40;
            const trackPath: string = this._describeArc(cx, cy, radius, startAngle, endAngle);

            const bgArc: SVGPathElement = document.createElementNS(SVG_NS, 'path');
            bgArc.setAttribute('d', trackPath);
            bgArc.setAttribute('fill', 'none');
            bgArc.setAttribute('stroke', '#d0d0d0');
            bgArc.setAttribute('stroke-width', String(trackWidth));
            bgArc.setAttribute('stroke-linecap', 'round');
            bgArc.setAttribute('class', 'gauge-track');
            svg.appendChild(bgArc);

            const valArc: SVGPathElement = document.createElementNS(SVG_NS, 'path');
            valArc.setAttribute('d', trackPath);
            valArc.setAttribute('fill', 'none');
            valArc.setAttribute('stroke', 'url(#gaugeGrad)');
            valArc.setAttribute('stroke-width', String(trackWidth));
            valArc.setAttribute('stroke-linecap', 'round');
            valArc.setAttribute('class', 'gauge-value');

            const totalLen: number = this._arcLength(radius, startAngle, endAngle);
            valArc.setAttribute('stroke-dasharray', '0 ' + totalLen);
            svg.appendChild(valArc);
            this.valuePath = valArc;
            this._totalLength = totalLen;

            if (this.config.ShowValue !== false) {
                const vText: SVGTextElement = document.createElementNS(SVG_NS, 'text') as SVGTextElement;
                vText.setAttribute('x', String(cx));
                vText.setAttribute('y', String(cy));
                vText.setAttribute('text-anchor', 'middle');
                vText.setAttribute('dominant-baseline', 'central');
                vText.setAttribute('class', 'gauge-value-text');
                vText.textContent = '0' + (this.config.Unit || '%');
                svg.appendChild(vText);
                this.valueText = vText;
            }

            const tText: SVGTextElement = document.createElementNS(SVG_NS, 'text') as SVGTextElement;
            tText.setAttribute('x', String(cx));
            tText.setAttribute('y', String(cy + radius * 0.55));
            tText.setAttribute('text-anchor', 'middle');
            tText.setAttribute('class', 'gauge-title-text');
            tText.textContent = this.config.Title || '';
            svg.appendChild(tText);
            this.titleText = tText;

            this.svgEl = svg;
            this.container!.appendChild(svg);
        }

        private _appendGradientStops(grad: Element): void {
            const scheme: ColorStop[] = COLOR_SCHEMES[this.config.ColorScheme] || COLOR_SCHEMES['green-red'];
            while (grad.firstChild) { grad.removeChild(grad.firstChild); }
            for (let i = 0; i < scheme.length; i++) {
                const stop: SVGStopElement = document.createElementNS(SVG_NS, 'stop') as SVGStopElement;
                stop.setAttribute('offset', String(scheme[i].offset * 100) + '%');
                stop.setAttribute('stop-color', scheme[i].color);
                grad.appendChild(stop);
            }
        }

        private _updateGradient(): void {
            if (!this.svgEl) return;
            const grad: Element | null = this.svgEl.querySelector('#gaugeGrad');
            if (grad) {
                this._appendGradientStops(grad);
            }
        }

        private _animateTo(targetValue: number): void {
            const self = this;
            const startValue: number = this.currentValue;
            const duration: number = this.config.AnimationDuration || 800;
            let startTime: number | null = null;

            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }

            function step(timestamp: number): void {
                if (!startTime) startTime = timestamp;
                const progress: number = Math.min((timestamp - startTime) / duration, 1);
                const ease: number = 1 - Math.pow(1 - progress, 3);
                const current: number = startValue + (targetValue - startValue) * ease;
                self._drawValue(current);
                if (progress < 1) {
                    self.animationId = requestAnimationFrame(step);
                } else {
                    self.currentValue = targetValue;
                    self.animationId = null;
                }
            }

            this.animationId = requestAnimationFrame(step);
        }

        private _drawValue(value: number): void {
            this.currentValue = value;
            const min: number = this.config.MinValue;
            const max: number = this.config.MaxValue;
            const ratio: number = Math.max(0, Math.min(1, (value - min) / (max - min)));
            const filled: number = this._totalLength * ratio;

            if (this.valuePath) {
                this.valuePath.setAttribute('stroke-dasharray', filled + ' ' + this._totalLength);
            }
            if (this.valueText) {
                const display: string = (value % 1 === 0) ? String(Math.round(value)) : value.toFixed(1);
                this.valueText.textContent = display + (this.config.Unit || '%');
            }
        }

        private _describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
            const startRad: number = (Math.PI / 180) * startAngle;
            const endRad: number = (Math.PI / 180) * endAngle;
            const x1: number = cx + r * Math.cos(startRad);
            const y1: number = cy - r * Math.sin(startRad);
            const x2: number = cx + r * Math.cos(endRad);
            const y2: number = cy - r * Math.sin(endRad);
            let diff: number = startAngle - endAngle;
            if (diff < 0) diff += 360;
            const largeArc: number = diff > 180 ? 1 : 0;
            return 'M ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 1 ' + x2 + ' ' + y2;
        }

        private _arcLength(r: number, startAngle: number, endAngle: number): number {
            let diff: number = startAngle - endAngle;
            if (diff < 0) diff += 360;
            return (Math.PI / 180) * diff * r;
        }
    }

    global.AUD = global.AUD || {};
    global.AUD.GaugeComponent = GaugeComponent;

})(window);