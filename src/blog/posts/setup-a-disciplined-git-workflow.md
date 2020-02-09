---
title: How to setup a disciplined git workflow
published: true
description:
  An example using git flow — you’ll be cutting code & closing PR’s like a pro
  in no time
tags: ["post"]
slug: setup-a-disciplined-git-workflow
date: 2018-06-14
---

> This article is intended for those at a junior developer level _🤓_, with a basic knowledge of git, looking to setup a disciplined development workflow. If you’re looking for some starter info on how git works, try checking out [this basic run through](http://rogerdudler.github.io/git-guide/) and muck around with [this interactive git cli](https://nic-hartley.github.io/git-gud/). I also won’t delve into how to setup the CI/CD part specifically… in that sense its fairly vendor independent, as you could swap out Azure DevOps for another provider if you wanted. Prod me on twitter*🐤* if there’s anything you feel is missing —[@danharris_io](https://twitter.com/danharris_io) . Oh, and full disclaimer; Head Full of Heart (mentioned below) is the sister business of my current employer.

_\* article updated 23/02/2019 with extra info + some slicker graphics 🎉_

I’m lucky enough to do a bunch of work with a local social enterprise, Head Full of Heart. At Head Full of Heart, a big part of what we do is mentoring and training graduates in technologies and approaches we’ve found successful while working out in ‘the big wild yonder’ of enterprise dev work.

Often, to explore these technologies, we run internal projects. Unsurprisingly, one of the first things on the task list when setting up a new grad is running through our development process. So instead of keeping our git workflow penned up in an internal doc of some kind 😥, I thought I’d share it with the world… or at least the other Medium lurkers like myself.

> I, by no means, claim to have invented the following workflow (git flow is pretty common, right??). In fact, I learnt it from more senior devs than I _🧐_. So in that sense, I guess i’m completing the circle…

So enough mucking around, lets get into how to setup our workflow;

### 😱 Ensure git flow is installed

First thing when working with git is to… have git installed. That’s a trick for young players. Depending on how you’ve installed git, you should hopefully also have the `git flow` command installed. If you type `git flow` into the command-line and it doesn't work, then go grab it from [here](https://github.com/nvie/gitflow/wiki/Installation).

Another trick is that you’ll need to run `git flow init` on the local repo you wish to use git flow in, before you’ll be able to use the git flow CLI features.

So why are we using `git flow`? Well it gives us an easy & repeatable way to enforce the **Branching Strategy** discussed below 👇.

### 👮‍♀️ Install Commitizen

When making commits on a project its pretty handy to have a uniform style everyone adheres to. [Commitizen](https://www.npmjs.com/package/commitizen) is a great tool that helps in this exact situation. It allows you to adopt a certain commit style and standardise on it. This leaves you with a beautiful commit history 👌.

> If your project is already setup with commitizen, you should be able to skip this step and use the commit task from your project… see the end of this section for more info _🖖_

```
bugfix(cat-face-ie2-rendering): fixed issue with ie2 cat face emoji.feat(added-extra-emojis): added cat face emojis to supported list.
```

As you can see above, it gives you pretty readable commits. Additionally it prompts to add work items & asks for breaking changes. Similarly to `git flow`, using commitizen helps enforce our commit strategy (by all means, you can also add git hooks to enforce the commit styles if you’d like). Sure, we could run without it, but then we’d have all kinds of commit messages & commit styles 🙅‍♀️. With our current strategy, its quite clear what each commit is for & whether its a feature, bugfix .etc… plus, consistency is always key!

To get going with commitizen in your repo, [go to their github readme, and follow the _making your repo commitizen-friendly_ instructions.](https://www.npmjs.com/package/commitizen#making-your-repo-commitizen-friendly) As a side note, we’re also going to use the commit style recommended as the default by commitizen (the angular conventional changelog).

Having installed commitizen, we should now be able to do `git cz` from within our git repo, which will provide a prompt that we can follow.

> as an aside, I often install commitizen & any other required commit related tools into my project as node dependencies. That way this process should be as simple as doing an `npm install` then running some kind of npm command when you want to commit, e.g. `npm run commit.`

### 🌳 Branching Strategy

As previously mentioned, we’re going to use a **git flow** approach to our git branch strategy. The basic premise of git flow is that we have a set of branches which represent our working sets, e.g. _master_ (which is production), _release_, _develop_. These branches are linked to our CI/CD, meaning that the _develop_ branch is built and deployed to our development environment, _release_ branch to our qa environment for testing and _master_ to our production environment.

When we need to write some code (e.g. a new feature or bugfix), we then create a new branch from develop. This means I can concurrently create and work on feature ‘_add cat emojis to platform’_ whilst someone else concurrently works on feature _‘replace all occurrences of the word polyglottal with mendacious’._ On finishing our feature, we then want to be able to merge it back to our main codebase. Its at this stage we perform something called a **Pull Request (PR)**. We’ll discuss pull requests in detail further down the page, but essentially this allows us to stage gate our code changes before they’re merged into the final codebase 🧐.

![](/blog-images/setup-a-disciplined-git-workflow__X9ZPIkPuHeW9L9lgDN36VQ.png)

The same merge and PR stage gate process then also applies between develop and creating a release. A full merge process from developing a feature branch to releasing code is shown in the above diagram.

> The [Atlassian](https://medium.com/u/5aa6b9976187) peeps _🙌_ have [a great tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) if you want a bit of a deeper explanation as to what the git flow strategy is.

### 🚧 Feature branch example flow

On first pass, the above mentioned strategy might sound a bit complex. So lets run through a quick example to show how easy it can be. We’ll use the scenario of performing a task for our fictitious company _Mendacious Cats .Inc_ 🐈*.*

Being keen developers at _Mendacious Cats .Inc,_ we’ve been assigned a task to create a new feature ‘_add cat emojis to platform’._ So we pick up the task from our backlog, then open our IDE of choice (i’m clearly in the [vscode](https://twitter.com/code) camp). Since we haven’t previously worked on the repo attached to this task, we’ll need to grab a copy of the code. To do this, let’s jump into our console and clone the repo;

git clone MendaciousCats.MobileApp

Then, we ensure we have a git flow enabled repo (following the default git flow setup — this should leave `develop` as the default branch for working with):

git flow init

At this point, we’re ready to start our feature branch. So lets use git flow to do the tricky stuff and create a branch based on develop;

git flow feature start add-cat-emojis

We now have a feature branch to work with locally (I like to publish this branch straight away, that way there’s always a copy in your remote repo).

⏳ _Some time later….._

After a bit of code cutting, we’ve completed our task and we’re ready to commit our work 🤘. To do this, we stage all our work, then use the commitzen tool we installed earlier;

git add .  
git cz (or our project specific command, e.g. 'npm run commit')

The `git cz` command will provide a nifty dialog which we can follow to create our beautiful commits;

```cli
\> git cz

? Select the type of change that you're committing: (Use arrow keys)
\> feat: A new feature
 fix: A bug fix
 docs: Documentation only changes
 style: Changes that do not affect the meaning of the code
 refactor: A code change that neither fixes a bug or adds a feat..
 perf: A code change that improves performance
 test: Adding missing tests or correcting existing tests
```

From the first dialog option, we select feature (as that’s what our current commit is; a feature 🤷‍♂️).

```cli
? Select the type of change that you're committing: feat: A new feature
? What is the scope of this change (e.g. component or file name)?
\> add-cat-emojis
? Write a short, imperative tense description of the change:
\> cat emojis now usable on platform through emoji component
```

We then give our commit a name in the second dialog (using kebab case 🍖) and a description in the next. Since we only have the single commit, we’re naming the commit after the feature. However, its common to have multiple commits for a feature branch. In that case, the commit type and name relates to the _changes made in that commit only_ (e.g. a _docs_ commits would have a name and description to match only those doc changes).

To finish off our commit, we provide a few extra options;

```cli
? Provide a longer description of the change: (press enter to skip)
? Are there any breaking changes? No
? Does this change affect any open issues? Yes
? Add issue references (e.g. "fix #123", "re #123".):
 #456
```

A key option being to link our commit to an issue (or task or bug .etc). That way our work is always linked to a task or work item in our backlog.

With our feature now finished and work committed, we push up our changes to the remote (using `git push` ). Next step is to merge our newly created code using a **Pull Request**.

### 🙏 The almighty PR

As a quick recap, we’ve created a feature branch, made some changes, and now we want to merge those changes back to our development branch. This is where a **Pull Request** (or **PR**) comes in.

![Pull Request](/blog-images/setup-a-disciplined-git-workflow__k3N89lnfZl9U4SWWHelJHw.png)

We’ll create a PR to merge _feature/add-cat-emojis_ to _develop._ Once that completes, our feature branch changes will now be part of the develop branch and we’ll delete _feature/add-cat-emojis_ 😻🙀😹*.*

To see how to create a PR in Azure Devops, [follow this link to the microsoft docs](https://docs.microsoft.com/en-us/azure/devops/repos/git/pull-requests?view=azure-devops&tabs=new-nav). If you’re using a different provider, see their docs (e.g. [github](https://help.github.com/articles/creating-a-pull-request/)).

What a PR allows us to do is stage gate our current feature (or bugfix 🐛 or hotfix 🔥 or whatever) before it becomes part of our shared, deployable code (i.e. develop branch). For our PR’s we require that the PR code changes are reviewed by a senior (or sometimes another developer) and that the PR branch builds & passes any unit/integration/e2e tests. If the PR is both approved (by review) and passes the build/tests, it is then able to be completed 👍 (i.e. merged with the target branch).

![Merge Pull Request](/blog-images/setup-a-disciplined-git-workflow__Enr931CEvrSb1NtrAMfgXw.png)

Using a flow like this insures that our code meets quality & style standards, the code being merged via PR can be built & that we have high confidence that no regressions occur (this would cause existing tests to fail).

### 😮 Oh noes, stale feature branch

Having completed the PR for our ‘_add cat emojis ’_ feature, we now have a problem. Another feature; _‘replace all occurrences of the word polyglottal with mendacious’_ is now based on a previous version of develop.

![Rebase Branch](/blog-images/setup-a-disciplined-git-workflow__wfs6PIGaTytV__gfa6xBQ8w.png)

To ensure we’ve handled any potential merge conflicts, we need to rebase our _feature/rename-polyglottal_ branch so that it is _based_ on the latest commit in develop. Again, git flow will come to the rescue with some handy CLI commands 🦸‍♀️.

Firstly we’ll jump into the terminal within our local repo and checkout develop, then pull the latest copy from our remote;

```cli
git checkout develop
git pull
```

Secondly, we’ll jump back into our _feature/rename-polyglottal_ branch and perform a git flow rebase;

```cli
git checkout feature/rename-polyglottal
git flow feature rebase
```

This will automagically ✨ perform a rebase on the current feature branch back to develop.

If you’re unlucky, you may get some merge conflicts. The CLI will notify you of a merge conflict in the rebase, allowing you to manually fix the changes (either open the file and make manual changes, or use a helper tool such as the vscode merge tool). Once you’ve fixed all the merge conflicts for the current commit, you can continue the rebase;

```cli
git rebase --continue
```

At the end of this process _feature/rename-polyglottal_ will now be up to date, and based on the latest commit from develop.

![Up-to-date Branch](/blog-images/setup-a-disciplined-git-workflow__RfdYVpmveLkUFzhWd8__Xjg.png)

### 🎉 Happy Days! Merged Code

We’ve successfully merged our code and we’re now all up to date. Congratulations! We’ve also explored a disciplined way to structure our development workflow. I hope you enjoyed the process!

_\* As always — constructive feedback, opinions and comments are all welcome. Comment here, or hit me up on twitter_ 🐤 [_@danharris_io_](https://twitter.com/danharris_io)_. Thanks for reading!_
