---
title: How to setup Angular e2e tests on VSTS CI Builds using Puppeteer
published: true
description: Keep that pipeline going with automated end-to-end test runs
tags: ["post", "angular", "e2e", "vsts", "ci"]
slug: how-to-setup-angular-e2e-tests-on-vsts-ci
date: 2018-02-25
---

I’ve recently been working on an Angular 4 project, using Visual Studio Team Services to manage our sprints, builds and deployments. Compared to other solutions (e.g. Atlassian Suite .etc), I think VSTS brings a bunch of functionality to the table.

As mentioned, we’re able to manage our sprints, git repos, test plans, tests, continuous integration & deployment all through the one service. This is pretty nifty, and works great. Before I sound even more like a covert advertisement for VSTS, it has its downsides; unless you’re operating directly in the land of something like .NET, information on setup for CI/CD processes can be a little hard to come by. I did find [a couple](https://blogs.msdn.microsoft.com/premier_developer/2017/05/17/integrating-angular-4-unit-tests-with-visual-studio-team-services-vsts/) of [great articles](https://medium.com/@flu.lund/automated-angular-unit-testing-on-visual-studio-team-services-22c03497265c) on unit test setup, but not much on protractor e2e tests. That’s why I decided I’d share my setup for running Angular e2e tests on VSTS CI…. See where I went with that rambling segue?

### Get on with it… (otherwise known as ‘setup protractor.conf.js’)

I’ll presume that you’re familiar with a [standard Angular cli project](https://github.com/angular/angular-cli/wiki/new). That being the case, jump in to your Angular project and whip up a command line.

```bash
npm i -D jasmine-reporters puppeteer protractor-console-plugin
```

What we need to do first is (using the command above) install the required packages; for reporting we’ll need [jasmine-reporters](https://www.npmjs.com/package/jasmine-reporters), [puppeteer](https://www.npmjs.com/package/puppeteer) (because, well, it’s in the article name) and the bonus package, [protractor-console-plugin](https://www.npmjs.com/package/protractor-console-plugin). The last package, [protractor-console-plugin](https://www.npmjs.com/package/protractor-console-plugin), isnt acutally a requirement… but it can be useful having tests flag when a console error occurs on the client.

Once you’ve got the packages installed, we then need to throw a couple of new lines into the file _protractor.conf.js_ (found in the project root directory).

_\* if you want less mucking around… the full protractor.conf.js.file containing the below changes is_ [_available here._](https://github.com/dan-harris/angular-e2e-vsts-ci-example/blob/master/protractor.conf.js)

First up, add the new reporter + the path to the puppeteer chrome executable to the import declarations at the top of the file:

Then, within the _exports.config_ object, add a new property (chromeOptions) to the chrome capability that defines a binary path for chrome:

still within *exports.config* — in the _onPrepare()_ function — add the junit xml reporter from _jasmine-reporters:_

And for the final bonus round… you can (optionally) add the handy console plugin as an additive to the _exports.config_:

Having done all that hard work, now lets run our super exhaustive test suite.

```bash
npm run e2e
```

and we should have the below pop up on the commandline:

```bash
angular-e2e-vsts-ci-example App
 √ should display welcome message

Executed 1 of 1 spec SUCCESS in 1 sec.
```

Excelsior! we now have our Angular e2e tests using puppeteer. You should also notice the output of an xml file:

```bash
e2e/results/e2e-results-junit.xml
```

VSTS will use this xml file in its build task to grab the test results.

### Setup VSTS Build

With our Angular project now running e2e puppeteer tests, lets setup our build definition.

![VSTS Build UI](/blog-images/how-to-setup-angular-e2e-tests-on-vsts-ci__Ey4uv1MSyvO8CFo9UL9r9w.png)

Jump in to whichever build definition you want to use the tests in, and add a task to run the e2e tests. Following the e2e test run, add a _Publish Test Results_ task. This task will use the JUnit xml file produced from the protractor reporter to inform VSTS of the e2e test results.

With the new test tasks in place, run the build. You should now see e2e tests appear in the build results:

![VSTS Test Success UI](/blog-images/how-to-setup-angular-e2e-tests-on-vsts-ci__NcVfWyyyzDC__bY6i0n2VzQ.png)

Voila! We now have VSTS CI builds integrated with our Angular e2e tests. Happy testing times!

_\* If you want an in-depth look at the code for this project, it can be found on_ [github.com/dan-harris/angular-e2e-vsts-ci-example](https://github.com/dan-harris/angular-e2e-vsts-ci-example)

_\* As always - constructive feedback, opinions and comments are all welcome. Thanks for reading!_
