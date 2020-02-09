---
title: Setting up your Node environment using nvm for windows
published: true
description: Never be off by a node version again 😲…. setup node version manager for Windows.
tags: ["post", "nvm", "windows", "node", "beginners"]
slug: setup-nvm-for-windows
date: 2019-03-12
---

One of the great things about where I work is our commitment to giving juniors a go (for our sister social enterprise, [Head Full of Heart](https://twitter.com/teamHFoH), its actually the core mission 👍).
As most of our code repo's incorporate some kind of node build or run, a question that is commonly asked is how to setup your environment to actually run node.

Well... have no fear 😱, that's where this _short_ article comes in.

_\* Just a reminder, this article shows the setup in windows... but setup in Mac or Linux is pretty similar 👍._

### why bother managing node versions

Well I'm glad you asked! When working on a project (especially within a team), its ideal to have as similar an environment as possible to both your peers, but more importantly, your build server.
Strange issues 👻 can arise when using mismatched versions of node (and by extension npm)... e.g. dependencies failing to build, hard to debug runtime errors .etc.

So... when you're working across a single project at any time, that's fairly easy. You simply install a matching version of node & off you go. The trick comes when you need to jump across multiple projects (which may have multiple node requirements).

By managing our node version, we're able to quickly switch our global node context. Hazah! Problems gone 🦸‍♀️.

### install nvm-for-windows

To manage our node version and flip between various node versions, we're going to use an awesome tool called [nvm-for-windows](https://github.com/coreybutler/nvm-windows).

Installing nvm-for-windows is as simple as heading on over to
[github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases) and downloading the latest release 👉 `nvm-setup.zip`. The setup zip bundle will include an installer... and away you go.

A couple of recommendations when running through the installer;

- install _nvm-for-windows_ into a directory other than the default (e.g. `c:\my-workspace\apps\nvm`). This will fix a couple of strange issues that sometimes occur with spaces in the directory path (`Program Files\nvm`). It also allows you to segregate your global node installs and any other node_modules.
- after installing, sometimes you may have to restart your computer for the path variables to be picked up (e.g. if you get the error `'nvm' is not recognized as an internal or external command`)

After installing, you should be able to use the `nvm` command on the commandline. Next up, let's set a node version to use.

### use a node version

Setting our node version is now as simple as installing the right version using nvm 👉 `nvm install 8.9`. We then need to 'use' that version (which is how we change node versions using nvm - unless you've got a slicker setup using a `.nvmrc` or similar)... 👉 `nvm use 8.9`.

_\* I'd run the above commands - or at least the install command - using an elevated commandline, sometime odd things happen 🤷‍♂️._

### well that wasn't hard

Hopefully the above was pretty easy... but sometimes odd things occur. Let me know in the comments if you get a strange error or some other heeby-jeeby.

---

_\* As always - constructive feedback, opinions, improvements and comments are all welcome. Comment here, or hit me up on twitter @danharris_io . Thanks for reading!_
_\* original (unedited) title icon courtesy of Freepik from flaticon._
