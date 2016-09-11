import { bindable, bindingMode, customElement, inlineView } from "aurelia-framework";
import * as chartist from "chartist";

@customElement("chartist")
@inlineView(`<template><require from="chartist/chartist.min.css" /><div class="chart" ref="element"></div></template>`)
export class ChartistElement {

  public element: HTMLElement;
  public chart;

  @bindable()
  public type: string;

  @bindable()
  public data: chartist.IChartistData;

  @bindable()
  public options: chartist.IChartOptions;

  @bindable({ bindingMode: bindingMode.oneTime })
  public responsiveOptions: Array<chartist.IResponsiveOptionTuple<any>>;

  public eventsToAttachOnAttached = [];

  private readonly allowedTypes = ["Bar", "Line", "Pie"];

  public attached() {
    this.renderChart();

    // events that we tried to add before the object was created
    for (let item of this.eventsToAttachOnAttached) {
      this.chart.on(item.name, item.value);
    }
  }

  public detached() {
    if (this.chart) {
      this.chart.detach();
    }
  }

  public dataChanged(newValue, oldValue) {
    if (this.chart) {
      this.chart.update(this.data, this.options);
    } else {
      this.renderChart();
    }
  }

  public optionsChanged(newValue, oldValue) {
    if (this.chart) {
      this.chart.update(this.data, this.options);
    }
  }

  public typeChanged(newValue, oldValue) {
    this.renderChart();
  }

  private renderChart() {
    if (!this.data) {
      console.warn("Chartist data is not set on element");
      return;
    }

    if (this.type === undefined || this.type === null) {
      throw new Error("Chartist type attribute must be set");
    }

    if (this.allowedTypes.indexOf(this.type) === -1) {
      throw new Error(`Chartist type must be one of the following values: ${this.allowedTypes.join(", ")}`);
    }

    if (this.element) {
      this.chart = chartist[this.type](this.element, this.data, this.options, this.responsiveOptions);
    }
  }
}
