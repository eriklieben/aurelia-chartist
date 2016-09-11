System.register(["aurelia-framework", "chartist"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_framework_1, chartist;
    var ChartistElement;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (chartist_1) {
                chartist = chartist_1;
            }],
        execute: function() {
            ChartistElement = (function () {
                function ChartistElement() {
                    this.eventsToAttachOnAttached = [];
                    this.allowedTypes = ["Bar", "Line", "Pie"];
                }
                ChartistElement.prototype.attached = function () {
                    this.renderChart();
                    for (var _i = 0, _a = this.eventsToAttachOnAttached; _i < _a.length; _i++) {
                        var item = _a[_i];
                        this.chart.on(item.name, item.value);
                    }
                };
                ChartistElement.prototype.detached = function () {
                    if (this.chart) {
                        this.chart.detach();
                    }
                };
                ChartistElement.prototype.dataChanged = function (newValue, oldValue) {
                    if (this.chart) {
                        this.chart.update(this.data, this.options);
                    }
                    else {
                        this.renderChart();
                    }
                };
                ChartistElement.prototype.optionsChanged = function (newValue, oldValue) {
                    if (this.chart) {
                        this.chart.update(this.data, this.options);
                    }
                };
                ChartistElement.prototype.typeChanged = function (newValue, oldValue) {
                    this.renderChart();
                };
                ChartistElement.prototype.renderChart = function () {
                    if (!this.data) {
                        console.warn("Chartist data is not set on element");
                        return;
                    }
                    if (this.type === undefined || this.type === null) {
                        throw new Error("Chartist type attribute must be set");
                    }
                    if (this.allowedTypes.indexOf(this.type) === -1) {
                        throw new Error("Chartist type must be one of the following values: " + this.allowedTypes.join(", "));
                    }
                    if (this.element) {
                        this.chart = chartist[this.type](this.element, this.data, this.options, this.responsiveOptions);
                    }
                };
                __decorate([
                    aurelia_framework_1.bindable(), 
                    __metadata('design:type', String)
                ], ChartistElement.prototype, "type", void 0);
                __decorate([
                    aurelia_framework_1.bindable(), 
                    __metadata('design:type', Object)
                ], ChartistElement.prototype, "data", void 0);
                __decorate([
                    aurelia_framework_1.bindable(), 
                    __metadata('design:type', Object)
                ], ChartistElement.prototype, "options", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ bindingMode: aurelia_framework_1.bindingMode.oneTime }), 
                    __metadata('design:type', Array)
                ], ChartistElement.prototype, "responsiveOptions", void 0);
                ChartistElement = __decorate([
                    aurelia_framework_1.customElement("chartist"), 
                    __metadata('design:paramtypes', [])
                ], ChartistElement);
                return ChartistElement;
            }());
            exports_1("ChartistElement", ChartistElement);
        }
    }
});

//# sourceMappingURL=chartist.js.map
