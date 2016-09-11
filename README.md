# aurelia-chartist

Aurelia plugin to use [Chartist](https://gionkunz.github.io/chartist-js/index.html)


Example usage:
```html
<chartist 
    data.bind="data" 
    type="Line" 
    options.bind="options" 
    responsive-options.bind="responsiveOptions"
    chartist-events="draw.call: animation(data); foobar.call: foobar(data)" />
```

| attribute          | description                                      | on update                   |
| ------------------ | ------------------------------------------------ | --------------------------- |
| data               | the data property used by chartist               | uses chartist update method |
| type               | type of chart, can be "Line", 'Bar", or "Pie"    | creates new chartist object |
| options            | the options property used by chartist            | uses chartist update method |
| responsive-options | the responsive-options property used by chartist | nothing *                   |
| chartist-events    | custom element used to attach to emitted events  | nothing                     |

\* currently not sure what to do when this changes or if it is supposed to change.

The custom attribute ```chartist-events``` allows you to handle any event fired by the eventemitter of chartist.

As seen in the above example, the ```draw``` event (a chartist event) will call the method animation and provide it with the data supplied by chartist.

If you installed a plugin for chartist which fires the ```foobar``` event, just add it in the same way and it will just work :-)



