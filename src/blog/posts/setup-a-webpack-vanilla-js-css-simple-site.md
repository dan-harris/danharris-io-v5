---
title: Setup a webpack-built vanilla JS/CSS simple static site
published: true
description: For when you just want to keep it simple and enjoy your vanilla.
tags: ["post", "vanilla", "webpack", "static", "js"]
slug: setup-a-webpack-vanilla-js-css-simple-site
date: 2019-01-06
---

> Congratulations, you’re reading this article 🎉…. as a heads up, there’s a partner to this article; [**Static sites — how vanilla is still a delicious flavour in its own right**.](/blog/how-vanilla-is-still-a-delicious-flavour) The related article is a bit of an exploration around the why this setup came about. This article runs through a brief overview of setting up a webpack config for a simple static site… but If you can’t be bothered with either the explanation here, or my other article at all (sad emoji _😥_), [here’s the webpack.config.js required](https://gist.github.com/dan-harris/03d05aa62dc3fdd9abd4ee31ecf63ba6) & [here’s the github repo of my example site](https://github.com/dan-harris/danharris-io-landing-v3).

Do you have a use case where you want to setup a simple site using vanilla js, vanilla CSS, all inlined (or internalised if you want to be PC) and on a single page? Well, then you’re on the right track 👍. The following is a webpack config I put together for [danharris.io](https://danharris.io). Admittedly the site is super simple at the moment, but (as always) its a work in progress 🤷‍♂️. So if, like me, you’ve spent hours mucking around with webpack configs, then I hope this setup helps.

This article is aimed at the beginner 👉 intermediate webpack user… so I’ll expect you have a passing knowledge of [what webpack is](https://webpack.js.org/), [how to install the cli](https://webpack.js.org/guides/getting-started/) & how to install the required npm modules .etc. I guess it could work for an intermediate 👉 advanced user, but they’ll probably be able to whip this setup out in their sleep 🤷‍♀️. I’ll also leave the wider project setup to your own whim, [with an example of how I’ve set it up here](https://github.com/dan-harris/danharris-io-landing-v3).

### 💅 Let’s get started… CSS munging™

So, after creating a base `webpack.config.js` (either manually [or some other way](https://generatewebpackconfig.netlify.com/)) you’ll have a simple config with at least an `entry` and `output`, looking something similar to the initial part of the config below. What we want to add is some plugins and loaders to help us minify, prefix and inline our CSS. We also want to use CSS custom properties, but have them rendered out at build time (since we’re not doing anything special with them, just using the variables for cleaner code).

Check out the code comments below, but essentially `postcss` is used for prefixes (e.g. browser compatibility) & rendering out our CSS properties (e.g. `color: var(--color-black)` becomes `color: #fff`). If we’re not running in dev mode, then we also use `MiniCssExtractPlugin` & `StyleExtHtmlWebpackPlugin` to extract our CSS, then inline it at the head of the page.

What this setup allows us to do is embed all the styles used within our page into the head. As we have a fairly small site, this avoids any FOUC or external stylesheet downloads…. which should make our [FP/FCP](https://medium.com/@zizzamia/first-contentful-paint-with-a-touch-of-perfume-js-cd11dfd2e18f) a little quicker (admittedly, a site our size probably doesn’t suffer from these problems much… but isn’t it nice to get those sub 300–400ms load times).

The other thing we’re doing is leveraging the [stock-standard CSS variable behaviour](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) for a better dev experience, then rendering them out for older browsers. I think variables are like 90% of what most people use a pre-processor like SASS for anyway 😄.

### 🍝 JS setup; in-lining, transpiling & minification

In contrast to our CSS setup, the JS config for webpack is pretty simple. We just use the default webpack settings and add a plugin to inline our scripts into the page head; `ScriptExtHtmlWebpackPlugin`.

Even though I’m trying to keep it simple, I find it really difficult to create any kind of site that (easily 🤫) works on non-evergreen browsers without some kind of transpilation. My poison of choice here is babel.

Regardless of only requiring some jQuery-like DOM methods (cheeky plug for [you might not need JQuery](http://youmightnotneedjquery.com/) 😱), transpiling down features (such as dynamic import) is super handy. If you don’t need require dynamic imports (👏 slow clap for that pun), or don’t want to use async/await syntax, you should be able to remove the entire plugins array from the babel config.

Honestly, I haven’t tried a project without transpilation in many yonks, and haven’t heard much about going vanilla without transpiling 🍨…. so keen to hear anyone’s thoughts on this… hit me up on [@danharris_io](https://twitter.com/danharris_io) or in the comments 👇.

### 🦄 fixing some HTML

Since I’m a bit pedantic, I like to splatter comments through my html (what can I say I have a comment problem 💬). This isn’t great when we want to ship a production piece, as the comments bloat the code + aren’t particularly useful to anyone reading the site. We can also gain a tiny bit of minification by removing spaces .etc. So we add the `HtmlWebpackPlugin` to remove my comment obsessions;

### 🚧 Finished product

After a couple of small final touches (namely asset copying via `CopyWebpackPlugin` & image optimisation via the webpack `image-webpack-loader`) we’ve got our completed config…. aren’t build tool configs fun 🤯?

_\* As always — constructive feedback, opinions, improvements and comments are all welcome. Comment here, or hit me up on twitter_ [_@danharris_io_](https://twitter.com/danharris_io)_. Thanks for reading!_

_\* original (unedited) title icon courtesy of_ [_Freepik_](http://www.freepik.com/) _from_ [_flaticon_](https://www.flaticon.com/)_. Fonts; the awesome_ [_lazer84_](https://sunrise-digital.net/) _and_ [_Open Sans_](https://fonts.google.com/specimen/Open+Sans?selection.family=Open+Sans)_._
