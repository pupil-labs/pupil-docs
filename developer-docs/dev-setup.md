+++
date = "2017-01-19T15:47:28+07:00"
title = "dev setup"
weight = 12
+++

<div class="header-border-top"></div>
<div class="content-container">
  <div class="header-link">
    <a href="#dev-setup">
      <h2 id="dev-setup">Developer Setup</h2>
    </a>
  </div>
</div>

Pages in the developer guide are oriented towards developers and will contain high level overview of code and organizational structure.

If you want to develop a plugin or to extend Pupil for your project, this is the place to start.

These pages will not contain detailed documentation of code. We're working on code documentation, and when it's done we will put code documentation online at read the docs.

If you have questions, encounter any problems, or want to share progress -- write a post on the Pupil Google Group. We will try our best to help you out, and answer questions quickly.

<div class="content-container">
  <div class="header-link">
    <a href="#run-pupil-source">
      <h3 id="run-pupil-source">Running Pupil from Source</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

Pupil is a prototype and will continue to be in active development. If you plan to make changes to Pupil, want to see how it works, [make a fork][fork], install all dependencies and run Pupil source directly with Python.

<div class="content-container">
  <div class="header-link">
    <a href="#install-dependecies">
      <h4 id="install-dependecies">Installing Dependencies</h4>
    </a>
  </div>
</div>

* Linux [step-by-step instructions](#linux) or third party [docker container](https://github.com/UCL-CATL/docker-pupil).
* [MacOS](#macos) step-by-step instructions for MacOS 10.8+
* [Windows](#windows) step-by-step instructions for Windows

<div class="content-container">
  <div class="header-link">
    <a href="#download-run-source">
      <h4 id="download-run-source">Download and Run Pupil Source Code</h4>
    </a>
  </div>
</div>

Once you have all dependencies installed, you're 99% done. Now, all you have to do [fork][fork] the github repository.  Or, using the terminal you can clone the Pupil repository using `git`:

	cd /the_folder_where_Pupil_will_live/
	git clone https://github.com/pupil-labs/pupil.git

<div class="content-container">
  <div class="header-link">
    <a href="#run-capture-source">
      <h4 id="run-capture-source">Run Pupil Capture from Source</h4>
    </a>
  </div>
</div>

You're in development land now.  If you're running from the source, there will be no icon to click. So fire up the terminal, navigate to the cloned Pupil repository, and start Pupil using Python.

	cd /the_folder_where_Pupil_lives/pupil_src/capture
	python main.py

[release-page]: http://github.com/pupil-labs/pupil/releases
[fork]: https://github.com/pupil-labs/pupil/fork