---
title: Lazy Load & Code Split Angular Components
published: true
description: Introducing ngx-loadable-component.
tags: ["post", "angular", "npm", "lazy load", "package"]
slug: ngx-loadable-component
date: 2018-09-16
---

Ever had the problem of finding a neat solution to code split & lazy load components in Angular? I did.. so for a couple of projects I’ve used a framework piece which allows easy lazy loading of a component. Since I’ve found it pretty useful (and I haven’t been able to find an existing similar package), I decided to open source it and release an npm package; **ngx-loadable-component**.

> If you want to skip the niceties, [npm package is here](https://www.npmjs.com/package/ngx-loadable-component) and a [demo is here](https://ngx-loadable-component-app-chfnxlwwxx.now.sh/).

### Why an Angular loadable component package

Something Angular handles super well is the ability to code-split and lazy load routes. This is all fine and well when you have route/view centric code you want to chunk, but doesn’t (easily) support the same for individual components. The problem I had was importing shared components (often from external ‘js only’ libraries) and not having them included in any shared bundles.

Luckily, people smarter than I [figured out how to utilise the simple route lazy-load functionality of Angular at a component level](https://blog.angularindepth.com/dynamically-loading-components-with-angular-cli-92a3c69bcd28). Ingeniously, this method tricks the Angular compile into thinking **ngx-loadable-component** modules are actually routable modules. This is better than [some other cool alternatives](https://www.npmjs.com/package/ngx-build-plus) as it doesn’t require any build process changes and is fairly transparent. Additionally, it means an **ngx-loadable-component** can be fairly easily ejected and used as a ‘normal’ component module.

### Will Angular elements replace this

Simply put, quite possibly. But, as mentioned previously, this package requires no build changes or any other modifications to the ‘standard’ Angular CLI processes. It is quite possible that Angular Elements will be alot easier to combine and code split with Angular 7 (or 8 🤷‍)… but until then, this package can handle it. Also, if you decide there’s a better way to code split & lazy load, its fairly easy to eject the use of **ngx-loadable-component.**

### Get ngx-loadable-component

If your interested, check out the [package on npm](https://www.npmjs.com/package/ngx-loadable-component). Any feedback, issues .etc feel free to [raise a ticket on github](https://github.com/dan-harris/ngx-loadable-component), or contact me via twitter [@danharris_io](https://twitter.com/danharris_io).
