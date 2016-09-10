import { bindable, bindingMode } from "aurelia-framework";
import * as chartist from "chartist";

export class Chartist {

  public element: HTMLElement;

  @bindable()
  public type: string;

  @bindable()
  public data: chartist.IChartistData;

  @bindable()
  public options: chartist.IChartOptions;

  @bindable({ bindingMode: bindingMode.oneTime })
  public responsiveOptions: Array<chartist.IResponsiveOptionTuple<any>>;

  @bindable({ attribute: "draw"})
  public drawCall: (data) => void;

  @bindable({ attribute: "options-changed"})
  public optionsChangedCall: (data) => void;

  @bindable({ attribute: "animation-beging"})
  public animationBeginCall: (data) => void;

  @bindable({ attribute: "animation-end"})
  public animationEndCall: (data) => void;

  @bindable({ attribute: "data-changed"})
  public dataChangedCall: (data) => void;

  @bindable({ attribute: "created"})
  public createdCall: (data) => void;

  private chart;
  private readonly allowedTypes = ["Bar", "Line", "Pie"];

  public attached() {
    this.renderChart();
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

  public drawCallChanged(newValue, oldValue) {
    this.callChanged("draw", newValue, oldValue);
  }

  public optionsChangedCallChanged(newValue, oldValue) {
    this.callChanged("optionsChanged", newValue, oldValue);
  }

  public animationBeginCallChanged(newValue, oldValue) {
    this.callChanged("animationBegin", newValue, oldValue);
  }

  public animationEndCallChanged(newValue, oldValue) {
    this.callChanged("animationEnd", newValue, oldValue);
  }

  public dataCallChanged(newValue, oldValue) {
    this.callChanged("data", newValue, oldValue);
  }

  public createdCallChanged(newValue, oldValue) {
    this.callChanged("created", newValue, oldValue);
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

  private callChanged(event: string, newValue, oldValue) {

    if (!this.element || !this.chart) {
      return;
    }

    if (newValue === undefined && oldValue) {
      this.chart.off(event, oldValue);
    } else if (newValue) {
      this.chart.on(event, newValue);
      if (oldValue) {
        this.chart.off(event, oldValue);
      }
    }
  }
}
