var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var ChartistEventsAttribute = (function () {
        function ChartistEventsAttribute(element) {
            this.element = element;
            this.isCustomElement = false;
            this.isCustomElement = typeof (element.au.controller) === "object" && typeof (element.au.controller.viewModel) === "object";
            if (this.isCustomElement) {
                this.elementVM = element.au.controller.viewModel;
            }
        }
        ChartistEventsAttribute.prototype.propertyChanged = function (name, value) {
            if (!this.isCustomElement) {
                return;
            }
            if (this.elementVM.chart) {
                this.elementVM.chart.on(name, function (data) { return value({ sdata: data }); });
            }
            else {
                this.elementVM.eventsToAttachOnAttached.push({ name: name, value: function (data) { return value({ data: data }); } });
            }
        };
        ChartistEventsAttribute = __decorate([
            aurelia_framework_1.dynamicOptions(),
            aurelia_framework_1.inject(Element),
            aurelia_framework_1.customAttribute("chartist-events"), 
            __metadata('design:paramtypes', [Object])
        ], ChartistEventsAttribute);
        return ChartistEventsAttribute;
    }());
    exports.ChartistEventsAttribute = ChartistEventsAttribute;
});

//# sourceMappingURL=chartist-events.js.map
