---
title: Frontend dev — how vanilla is still a delicious flavour in its own right.
published: true
description: Did you go full framework? You never go full framework.
date: 2019-01-06
tags: ["post", "vanilla", "opinion", "js", "frameworks"]
slug: how-vanilla-is-still-a-delicious-flavour
---

> Congratulations, you’re reading this article 🎉…. as a heads up, there’s a partner to this article; [**_Setup a webpack built vanilla JS/CSS static site._**](/blog/setup-a-webpack-vanilla-js-css-simple-site) The partner article has an example of the setup discussed here (both a quick ‘walkthrough’ of the config + example code).

### 🍨 **What’s the best js flavour?**

If you’re like me, then embarking on a new side project is often a case of _‘should I use framework special-wings-batman_ 🦇*, or framework flappy-birds-magic* 🐥🎩*…. ohhh, maybe I should try that new framework, double-unicorns-fantastimal.js* 🦄🌈🎉*’.* And whilst I think there’s nothing wrong with framework’s as a whole (they generally let you do some **_cool shit™_**), lately I’ve been thinking that a more _‘library-centric’_ approach is probably a better suit for a bunch of use-cases.

> [Seems that frameworks vs libraries is a touchy topic _😱_](https://dev.to/gypsydave5/todo-mvp-or-why-you-shouldnt-use-a-web-framework---the-revenge-261l)

Now, there’s a blurry line of distinction between a framework and library. As an example, React is often touted as a UI library… but I find, in combination with the ecosystem & build tools like `create-react-app` it becomes very framework like. Not discounting React as a perfectly viable UI library, It’s just the way I’ve used it (and seen most people use it) it ends up being a framework. Regardless, the definition of what is and isn’t a framework is entirely arbitrary…. so I’m going to dodge that bullet and just say 🤷. For the purpose of this article, I’ll count React, Angular, Vue .etc as frameworks.

The other point is that frameworks especially are generally geared towards fixing a certain set of problems by doing **_cool shit™._** Libraries, perhaps similarly, solve a set of problems. But rather than solve an entire use case, libraries are more of a point solution. So… I don’t advocate against using a framework (Most of my professional life is spent developing Angular solutions) to solve a problem, but I want to make sure that a framework isn’t my default go to for _every_ solution. Oh, and **_cool shit™_**… just wanted to say that again.

### 📚 Cobble some libraries together

So I’ve ditched my usual _framework-x-cli_ and _framework-x project_ setup… what do i do now? Spend a couple of hours playing with webpack configs of course 😬. This means we can glue our frontend together in any way we want, using our own JS methods for initialisation .etc. _Simples_.

> Jokes aside, although a bunch of frameworks let you modify webpack config, there’s always that gleeful joy in having full control of how your frontend is being bundled, minified .etc.

This is where the vanilla JS part comes in, instead of using a particular _framework_ to orchestrate our app, we’re using [**_the framework_**](http://vanilla-js.com/) (JS) purely to orchestrate our various libraries. Admittedly, the distinction between our approach using vanilla JS and using a _framework_ as your starter can be fairly slim 🤷‍♂️. I mean, technically, all frontend frameworks are using vanilla JS to orchestrate their functionality… so have I misled you with this article? … I don’t know… but too bad, I’ve already written the title, so we’re on the ride 🎢. The main point is, that instead of leaning on a preset framework setup and architecture, we’re going to create our own.

### 👶 A simple site was born

Keeping the above in mind, let’s take a step back to my previous personal landing page ([danharris.io](https://danharris.io)). This page is nothing more than a mugshot, my name and some links to my various socials. At the time I built it, I decided that I’d be super cool and build it all in React ⚛. Now I totally understand (and did so at the time) that a landing page is probably a little overkill for React… however, to mitigate some of this, I statically rendered the page using [react-snap](https://github.com/stereobooster/react-snap). So I had an essentially static page — all hunky dory 👍.

As you can see, I’d succumbed to the allure of **_cool shit™._** Nothing wrong with that I suppose, considering my landing page is intended to build out as a developer portfolio. Apparently React is what the cool kids use anyway 🤷‍ (Preact being what the super hipsters use I guess? 🤫).

Segue to the setup I talk about in the [related article](/blog/setup-a-webpack-vanilla-js-css-simple-site)… it was again time to redo the _super-complex_ one pager that is [danharris.io](https://danharris.io). Instead of using a framework , I decided it best to go the _el naturale_ (see; vanilla) route… well, as discussed, not totally _el naturale_ as I’d be using some kind of build process via webpack.

### 🌈 A happy place

So, having mucked around with various webpack configs & some slight experimentation with project layout, file setup .etc, I’d created a pretty slim (but flexible… for a static site use case) vanilla js setup. After spending quite some time over the last few years building UI using various frameworks, having full control of exactly how various js functionality is orchestrated was damn refreshing (admittedly, the use case for my simple vanilla js setup is way less complex).

The benefits (at least for a simple site) to a vanilla js setup were 👍 (x5). As an example, where previously my best initial js bundle was ~30kb (React, with prerendered componentry), through the power of dynamic imports, I could now bring my initial bundles down to ~2kb. Let alone the control I now had over exactly which feature’s were loaded when.

I guess you could say it was liberating to step away from frameworks & their cli-of-choice. No longer was I hamstrung by a particular UI package’s view of the world…. I was FREE 😲. It was also great to be using stock standard vanilla API’s for most things, even if just to boost my own ego about thinking I know how to write code (use [the platform](http://vanilla-js.com/) and all that).

Now, all the above is probably a hurr-durr; no-brainer for alot of people, I’m sure 🙃. I mean my use case is very simple. But I guess that’s some of the point, instead of grabbing a framework off the shelf, I was probably using a solution more suited to my use case. And that’s what I wanted, to make sure vanilla js was something I thought about when crafting a solution to my (tech) problems.

> If any-one has a way to use vanilla js to solve my personal problems… I’m all 👂s

### ❗ End rant

So what’s the point? Well, vanilla (pray to the es6 gods 🙏) is still a great flavour… and with the richness of libraries available within the js ecosystem, it’s quite easy to orchestrate your required functionality.

The thing is though, does this kind of approach scale to complex frontends? Maybe, or maybe there are frameworks that are a better fit….. That’s kinda the point though, a _‘library-centric’_ approach using vanilla js should really be a **contender** for your specific use-case.

So when it comes to my next project, you can be sure that a library-centric approach using vanilla JS (or TS if I’m building anything beyond a static site) will be an option I definitely consider 🖖.

_\* As always — constructive feedback, opinions and comments are all welcome. Comment here, or hit me up on twitter_ [_@danharris_io_](https://twitter.com/danharris_io)_. Thanks for reading!_

_\* Original (unedited) title icon courtesy of_ [_Freepik_](http://www.freepik.com/) _from_ [_flaticon_](https://www.flaticon.com/)_. Fonts; the awesome_ [_lazer84_](https://sunrise-digital.net/) _and_ [_Open Sans_](https://fonts.google.com/specimen/Open+Sans?selection.family=Open+Sans)_._
