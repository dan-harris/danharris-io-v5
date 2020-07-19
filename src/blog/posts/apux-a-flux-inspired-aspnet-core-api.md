---
title: "Apux — A Flux inspired, Aspnet core API pattern"
published: true
description: "Or otherwise known as, I cant believe its not JSON RPC.."
tags: ["post", "dotnet", "flux", "api", "pattern"]
slug: apux-a-flux-inspired-aspnet-core-api
date: 2018-04-09
---

_\* Wanna skip the niceties? Example code of this pattern_ [_is on github here_](https://github.com/dan-harris/dotnet-core-apux-example)

Recently I was looking into building an API for an internal company system. The API only had to communicate with a front-end, plus be able to fire of a couple of integration processes. The thought crossing my mind was, since we’re in full control of the stack, surely there’s a better way to communicate than to encode all our info into REST URL endpoints then decode them at the recipient end.

Now, I’ve built REST endpoints with generic payloads & generic returns before, but that’s only the first step. What I was looking for is basically a JSON RPC-like pattern. Then, BAM, [this article](https://hackernoon.com/o-api-an-alternative-to-rest-apis-e9a2ed53b93c) comes along. If you haven't read the article, basically its a discussion around using a Redux-inspired JSON RPC pattern, dubbed OAPI, for your API’s (with examples given using Node). Since we’re using a Flux-inspired state management library for our front-end, this made perfect sense to me.

I guess the Redux-inspired OAPI inspired me to create a Flux-inspired API inspired by JSON-RPC. Make sense? Cool, be inspired.

_\* I can’t go much further without crediting a lot of the following API pattern to_ [_the previously mentioned article_](https://hackernoon.com/o-api-an-alternative-to-rest-apis-e9a2ed53b93c) _and_ [_David Gilbertson_](https://medium.com/u/f735d3b0f2f3)_. I disagree with him on the name though.._

_\* If you’re a little unsure about Flux and why I’ve used it semi-interchangeably with Redux… well the TL;DR is that Flux is a state management pattern for front-ends (for further explanation, have a look at_ [_the flux docs_](https://github.com/facebook/flux/tree/master/examples/flux-concepts)_). Redux is merely one implementation of this pattern._

### What the Flux

The general gist of Flux is that its a unidirectional data flow. Now that’s something I’m completely disregarding for our use case. I suppose that makes it very loosely Flux-inspired… but hey what are we as devs without cool sounding patterns?

![The basic Flux flow](/blog-images/apux-a-flux-inspired-aspnet-core-api__3Xt2mb6MtPBh__euWZo6Q.png)
The basic Flux flow

Anyway, the next couple of ideas from Flux are definitely helpful for our pattern (did I mention I called our implementation Apux? API + aspnet + Flux? See, as I said, we need those cool sounding names). Flux has the idea of an _‘action’ —\_which, as you can guess, is exactly as it sounds. Its an action we want to perform, with any data we need to do it. If we want to perform an \_action_, we _dispatch_ it… via, you guessed it, the _dispatcher_. Again this is exactly as it sounds, it _dispatches_ actions to the appropriate spot.

### A-pux for your Flux

So how do we modify this MVC-based data flow pattern for an API? Well lets see what sense we can make from the diagram below.

![Our slightly bastardized Flux flow for an API (Apux)](/blog-images/apux-a-flux-inspired-aspnet-core-api____lFEcjxQ4yPLcN__v7PVV0Q.png)
Our slightly bastardized Flux flow for an API (Apux)

We receive an _action_ (via a http call), throw this _action_ straight to our _dispatcher,_ so it can _dispatch_ it to… the appropriate _handler_. This is where we slightly differ from Flux. Instead of a global data store, what we actually want is to do _something_. Now this could be an update to a data-store (e.g. SQL DB), or it could be a request to send an email. Regardless, we want to _handle_ the _action_. So, ta-da, we’ve got a _handler_ which handles whatever that action is intended to do.

The cool thing we have is that the _handler_ can return either just the _action_ result (which we would return as the http call response) or it could return another _action._ This allows us to chain action functionality fairly easily.

### Show me the Action

So what does an _action_ actually look like in our aspnet API? Well first up we have the interface:

Pretty simple, no? We have a string to identify the action _type_ and a _base payload_ of JSON data. Why a ‘_base payload’_ you ask? Well that allows us to always have a base type from which we can serialize/deserialize — abusing the Newtonsoft Library to do our heavy lifting. The actual payload will hang off the instantiated object;

This allows us to have a ‘properly’ typed _action_ but still gives us the flexibility of passing around an essentially dynamic object.

### Action D-D-Dispatch

Okay, so we can now form a JSON _action_ that looks like something like this:

Then shoot it off to our API. From there we grab the _action_ from a controller and _dispatch_ it:

The _root_ _dispatcher_ is a special _dispatcher_ that allows us to split the _actions_ via a namespace. This helps us scale the number of actions within the API, whilst keeping the code manageable. So what does the _root dispatcher_ do? well it dispatches actions to the appropriate dispatcher. Dispatchception!

So following our example action JSON, because the action type is **PRODUCT_GET_BY_ID** we’d end up passing the action to the _product_ _action dispatcher_.

### Can you handle that

The _product dispatcher_ then finally hands the action to the appropriate _action handler_ for that _action._ The _action_ _handler_ does some work, calling for example some business logic, or data access, then returns an _action result._

An Apux _action result_ looks very similar to an Apux action, with a couple of minor extensions:

The _action result_ always has a JToken _Payload_ and it additionally has an array of any errors that occurred whilst executing the action. There is also a _Dispatch_ flag which tells the root dispatcher to dispatch this result as a new action (this is what allows us to chain the actions together).

### Finally, we have a result

Once we have the final _action result,_ we return it as a JSON payload that looks something like this:

Our front-end can then deal with this in the same manner it deals with other _actions_ (or if you set it up correctly, can simply slot this in as a new ‘success’ _action_.)

#### Still awake

Awesome, well then you at least found this mildly interesting.. on a serious note, whilst I really like this pattern, it does have its place. I think its a great replacement for building REST API’s that solely support a single app. As mentioned in [the article](https://hackernoon.com/o-api-an-alternative-to-rest-apis-e9a2ed53b93c) that inspired this work, I think if you’re exposing a generic API to the world, then REST is still your best bet.

Some other benefits of the Apux implementation:

- We can wrap a transaction scope for db calls around an entire set of _actions_
- The frontend can share the string constant definitions of the _actions_ within the API
- We’ve stopped boxing/unboxing values into URLs/routes and query params between the backend and frontend
- We can create small, _modular, atomic actions,_ then chain them together when needed
- API Versioning can be easily done at an action level

Some of the downsides I’ve found:

- We’re acting outside the usual aspnet MVC controller pattern, meaning its sometimes difficult to use some of the great baked-in controller features.
- Because of the above, things like endpoint/_action_ authorisation & authentication become a manual process
- A slight overhead is added to each call with all the action switching logic

If you have any other thoughts on the Apux implementation, let me know!

_\* A full working example for Apux can be_ [_found at_](https://github.com/dan-harris/dotnet-core-apux-example) [_github.com/dan-harris/dotnet-core-apux-example_](https://github.com/dan-harris/dotnet-core-apux-example)

_\* As always — constructive feedback, opinions and comments are all welcome. Thanks for reading!_
