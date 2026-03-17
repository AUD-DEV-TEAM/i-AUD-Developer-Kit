(function () {
    const global = (typeof window !== 'undefined' ? window : {}) as any;
    const echarts = global.echarts;

    class HeatmapComponent {
        private container: HTMLDivElement | null = null;
        private chart: any = null;
        private config: any = {};
        private grid: any = null;
        private lastDataSet: any = null;

        // Events
        OnCellClick: ((args: { row: string; col: string; value: number }) => void) | null = null;

        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            this.chart = echarts.init(container);

            var _this = this;
            this.chart.on('click', function (params: any) {
                if (!_this.OnCellClick || !params.data) return;
                var d = params.data;
                _this.OnCellClick({ row: d[1] || '', col: d[0] || '', value: d[2] || 0 });
            });
        }

        Resize(width: number, height: number): void {
            if (this.chart) this.chart.resize({ width: width, height: height });
        }

        Dispose(): void {
            if (this.chart) {
                this.chart.dispose();
                this.chart = null;
            }
            this.container = null;
            this.grid = null;
            this.lastDataSet = null;
        }

        GetValue(): any { return null; }
        SetValue(value: any): void { }
        Serialize(): string { return JSON.stringify(this.config); }
        Deserialize(data: string): void {
            try { this.config = JSON.parse(data); } catch (e) { }
        }

        // --- DataSet binding ---
        ApplyDataSource(ds: any): void {
            if (!ds) return;
            this.lastDataSet = ds;
            this._loadFromDataTable(ds);
        }

        // --- DataGrid binding ---
        setGrid(grid: any): void {
            this.grid = grid;
            var _this = this;
            var origHandler = grid.OnDataChanged;
            grid.OnDataChanged = function (sender: any, args: any) {
                if (origHandler) origHandler(sender, args);
                if (!_this.grid || sender.Name !== _this.grid.Name) return;
                _this._loadFromGrid();
            };
            // load immediately if grid already has data
            var ds = grid.GetDataSet ? grid.GetDataSet() : null;
            if (ds) {
                var dt = ds.GetTable(0);
                if (dt && dt.GetRowCount() > 0) this._loadFromGrid();
            }
        }

        setConfig(overrides: any): void {
            for (var k in overrides) {
                if (overrides.hasOwnProperty(k)) this.config[k] = overrides[k];
            }
        }

        getConfig(): any { return this.config; }

        Update(): void {
            if (this.grid) {
                this._loadFromGrid();
            } else if (this.lastDataSet) {
                this._loadFromDataTable(this.lastDataSet);
            }
        }

        getEChartsInstance(): any { return this.chart; }

        exportImage(): void {
            if (!this.chart) return;
            var url = this.chart.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#fff' });
            var win = window.open('', '_blank');
            if (win) {
                win.document.write('<img src="' + url + '" style="max-width:100%"/>');
                win.document.title = 'Heatmap Export';
            }
        }

        // --- private ---
        private _loadFromGrid(): void {
            if (!this.grid) return;
            var ds = this.grid.GetDataSet ? this.grid.GetDataSet() : null;
            if (!ds) return;
            var dt = ds.GetTable(0);
            if (!dt || dt.GetRowCount() === 0) return;

            var rowField = this.config.RowField || 'ROW_NAME';
            var colField = this.config.ColField || 'COL_NAME';
            var valueField = this.config.ValueField || 'VALUE';

            var rowCategories: string[] = [];
            var colCategories: string[] = [];
            var rowMap: Record<string, number> = {};
            var colMap: Record<string, number> = {};
            var data: number[][] = [];

            var rowCount = dt.GetRowCount();
            for (var r = 0; r < rowCount; r++) {
                var rowVal = String(dt.getData(r, rowField) || '');
                var colVal = String(dt.getData(r, colField) || '');
                var numVal = Number(dt.getData(r, valueField)) || 0;

                if (rowMap[rowVal] === undefined) {
                    rowMap[rowVal] = rowCategories.length;
                    rowCategories.push(rowVal);
                }
                if (colMap[colVal] === undefined) {
                    colMap[colVal] = colCategories.length;
                    colCategories.push(colVal);
                }
                data.push([colMap[colVal], rowMap[rowVal], numVal]);
            }

            this._renderChart(rowCategories, colCategories, data);
        }

        private _loadFromDataTable(ds: any): void {
            if (!ds) return;
            var dt = ds.GetTable ? ds.GetTable(0) : null;
            if (!dt || dt.GetRowCount() === 0) return;

            var rowField = this.config.RowField || 'ROW_NAME';
            var colField = this.config.ColField || 'COL_NAME';
            var valueField = this.config.ValueField || 'VALUE';

            var rowCategories: string[] = [];
            var colCategories: string[] = [];
            var rowMap: Record<string, number> = {};
            var colMap: Record<string, number> = {};
            var data: number[][] = [];

            var rowCount = dt.GetRowCount();
            for (var r = 0; r < rowCount; r++) {
                var rowVal = String(dt.getData(r, rowField) || '');
                var colVal = String(dt.getData(r, colField) || '');
                var numVal = Number(dt.getData(r, valueField)) || 0;

                if (rowMap[rowVal] === undefined) {
                    rowMap[rowVal] = rowCategories.length;
                    rowCategories.push(rowVal);
                }
                if (colMap[colVal] === undefined) {
                    colMap[colVal] = colCategories.length;
                    colCategories.push(colVal);
                }
                data.push([colMap[colVal], rowMap[rowVal], numVal]);
            }

            this._renderChart(rowCategories, colCategories, data);
        }

        private _renderChart(rowCategories: string[], colCategories: string[], data: number[][]): void {
            if (!this.chart) return;

            var title = this.config.Title || '';
            var minColor = this.config.MinColor || '#ffffff';
            var maxColor = this.config.MaxColor || '#304ffe';
            var showLabel = this.config.ShowLabel !== false;
            var fontSize = Number(this.config.FontSize) || 12;
            var borderWidth = Number(this.config.BorderWidth) || 1;
            var borderColor = this.config.BorderColor || '#ffffff';

            // calculate min/max values
            var minVal = Infinity;
            var maxVal = -Infinity;
            for (var i = 0; i < data.length; i++) {
                var v = data[i][2];
                if (v < minVal) minVal = v;
                if (v > maxVal) maxVal = v;
            }
            if (minVal === Infinity) { minVal = 0; maxVal = 100; }

            var option: any = {
                title: title ? {
                    text: title,
                    left: 'center',
                    top: 8,
                    textStyle: { fontSize: 16, fontWeight: 'bold' }
                } : undefined,
                tooltip: {
                    position: 'top',
                    formatter: function (params: any) {
                        var d = params.data;
                        return colCategories[d[0]] + ' / ' + rowCategories[d[1]] + ': <b>' + d[2] + '</b>';
                    }
                },
                grid: {
                    top: title ? 50 : 20,
                    left: 80,
                    right: 60,
                    bottom: 60,
                    containLabel: false
                },
                xAxis: {
                    type: 'category',
                    data: colCategories,
                    position: 'bottom',
                    splitArea: { show: true },
                    axisLabel: { fontSize: fontSize, rotate: colCategories.length > 8 ? 30 : 0 }
                },
                yAxis: {
                    type: 'category',
                    data: rowCategories,
                    splitArea: { show: true },
                    axisLabel: { fontSize: fontSize }
                },
                visualMap: {
                    min: minVal,
                    max: maxVal,
                    calculable: true,
                    orient: 'vertical',
                    right: 5,
                    top: 'center',
                    inRange: {
                        color: [minColor, maxColor]
                    }
                },
                series: [{
                    type: 'heatmap',
                    data: data,
                    label: {
                        show: showLabel,
                        fontSize: fontSize
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    },
                    itemStyle: {
                        borderWidth: borderWidth,
                        borderColor: borderColor
                    }
                }]
            };

            this.chart.setOption(option, true);
        }
    }

    // register globally
    if (!global.AUD) global.AUD = {};
    global.AUD.HeatmapComponent = HeatmapComponent;
})();
