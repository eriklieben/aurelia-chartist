# aurelia-chartist

Aurelia plugin to use [Chartist](https://gionkunz.github.io/chartist-js/index.html)

# Installation

## JSPM
Install the package:

```
jspm i aurelia-chartist
```
Add the following line to ```src/main.js``` or ```src/main.ts```:
```diff
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
+    .plugin('aurelia-chartist');
}
```


## Aurelia-CLI
Install the package(s):
```
npm i aurelia-chartist chartist --save
```

Open up the file ```aurelia_project/aurelia.json``` and add the following in the bundles, vender-bundle.js dependencies section:
```diff
"aurelia-templating-binding",
+{
+    "name": "chartist",
+    "path": "../node_modules/chartist/dist",
+    "main": "chartist",
+    "resources": [
+        "./chartist.min.css"
+    ]
+},          
+{
+    "name": "aurelia-chartist",
+    "path": "../node_modules/aurelia-chartist/dist/amd",
+    "main": "index"
+},          
{
  "name": "text",
  "path": "../scripts/text"
},
```
Add the following line to ```src/main.js``` or ```src/main.ts```:
```diff
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
+    .plugin('aurelia-chartist');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }
```

# Usage:
```html
<chartist 
    data.bind="data" 
    type="Line" 
    options.bind="options" 
    responsive-options.bind="responsiveOptions"
    chartist-events="draw.call: animation(data); foobar.call: foobar(data)" />
```

```typescript
export class App {
  public message = 'Hello World!';
   
  public data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    series: [
      [1, 5, 2, 5, 4, 3],
      [2, 3, 4, 8, 1, 2],
      [5, 4, 3, 2, 1, 0.5]
    ]
  };
  
  public options = {
      low: 0,
      showArea: true,
      showPoint: false,
      fullWidth: true,
      width: 800,
      height: 400
  };

  public responsiveOptions ={};

  public animation(data) {
    if(data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 2000 * data.index,
          dur: 2000,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
      }});
      }
  }

  public foobar(data) {
    console.log("foobar", data);
  }
}
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



