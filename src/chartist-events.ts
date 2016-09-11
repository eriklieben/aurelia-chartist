import { customAttribute, dynamicOptions, inject } from "aurelia-framework";
import { ChartistElement } from "./chartist";

@dynamicOptions()
@inject(Element)
@customAttribute("chartist-events")
export class ChartistEventsAttribute {

  private isCustomElement = false;
  private elementVM: ChartistElement;

  constructor (private element) {
    this.isCustomElement = typeof(element.au.controller) === "object" && typeof(element.au.controller.viewModel) === "object";
    if (this.isCustomElement) {
      this.elementVM = element.au.controller.viewModel;
    }
  }

  public propertyChanged(name, value) {

    if (!this.isCustomElement) {
      return;
    }

    if (this.elementVM.chart) {
      this.elementVM.chart.on(name, data => value({ sdata: data }));
    } else {
      this.elementVM.eventsToAttachOnAttached.push( { name: name, value: data => value({ data: data }) });
    }
  }
}
