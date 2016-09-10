"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var chartist = require("chartist");
var Chartist = (function () {
    function Chartist() {
        this.allowedTypes = ["Bar", "Line", "Pie"];
    }
    Chartist.prototype.attached = function () {
        this.renderChart();
    };
    Chartist.prototype.detached = function () {
        if (this.chart) {
            this.chart.detach();
        }
    };
    Chartist.prototype.dataChanged = function (newValue, oldValue) {
        if (this.chart) {
            this.chart.update(this.data, this.options);
        }
        else {
            this.renderChart();
        }
    };
    Chartist.prototype.optionsChanged = function (newValue, oldValue) {
        if (this.chart) {
            this.chart.update(this.data, this.options);
        }
    };
    Chartist.prototype.typeChanged = function (newValue, oldValue) {
        this.renderChart();
    };
    Chartist.prototype.drawCallChanged = function (newValue, oldValue) {
        this.callChanged("draw", newValue, oldValue);
    };
    Chartist.prototype.optionsChangedCallChanged = function (newValue, oldValue) {
        this.callChanged("optionsChanged", newValue, oldValue);
    };
    Chartist.prototype.animationBeginCallChanged = function (newValue, oldValue) {
        this.callChanged("animationBegin", newValue, oldValue);
    };
    Chartist.prototype.animationEndCallChanged = function (newValue, oldValue) {
        this.callChanged("animationEnd", newValue, oldValue);
    };
    Chartist.prototype.dataCallChanged = function (newValue, oldValue) {
        this.callChanged("data", newValue, oldValue);
    };
    Chartist.prototype.createdCallChanged = function (newValue, oldValue) {
        this.callChanged("created", newValue, oldValue);
    };
    Chartist.prototype.renderChart = function () {
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
    Chartist.prototype.callChanged = function (event, newValue, oldValue) {
        if (!this.element || !this.chart) {
            return;
        }
        if (newValue === undefined && oldValue) {
            this.chart.off(event, oldValue);
        }
        else if (newValue) {
            this.chart.on(event, newValue);
            if (oldValue) {
                this.chart.off(event, oldValue);
            }
        }
    };
    __decorate([
        aurelia_framework_1.bindable(), 
        __metadata('design:type', String)
    ], Chartist.prototype, "type", void 0);
    __decorate([
        aurelia_framework_1.bindable(), 
        __metadata('design:type', Object)
    ], Chartist.prototype, "data", void 0);
    __decorate([
        aurelia_framework_1.bindable(), 
        __metadata('design:type', Object)
    ], Chartist.prototype, "options", void 0);
    __decorate([
        aurelia_framework_1.bindable({ bindingMode: aurelia_framework_1.bindingMode.oneTime }), 
        __metadata('design:type', Array)
    ], Chartist.prototype, "responsiveOptions", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: "draw" }), 
        __metadata('design:type', Function)
    ], Chartist.prototype, "drawCall", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: "options-changed" }), 
        __metadata('design:type', Function)
    ], Chartist.prototype, "optionsChangedCall", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: "animation-beging" }), 
        __metadata('design:type', Function)
    ], Chartist.prototype, "animationBeginCall", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: "animation-end" }), 
        __metadata('design:type', Function)
    ], Chartist.prototype, "animationEndCall", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: "data-changed" }), 
        __metadata('design:type', Function)
    ], Chartist.prototype, "dataChangedCall", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: "created" }), 
        __metadata('design:type', Function)
    ], Chartist.prototype, "createdCall", void 0);
    return Chartist;
}());
exports.Chartist = Chartist;

//# sourceMappingURL=chartist.js.map
