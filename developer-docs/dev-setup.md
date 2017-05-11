+++
date = "2017-01-19T15:47:28+07:00"
title = "dev setup"
section_weight = 4
page_weight = 1
+++

## Developer Setup

Pages in the developer guide are oriented towards developers and will contain high level overview of code and organizational structure.

If you want to develop a plugin or to extend Pupil for your project, this is the place to start.

These pages will not contain detailed documentation of code. We're working on code documentation, and when it's done we will put code documentation online at read the docs.

If you have questions, encounter any problems, or want to share progress -- write a post on the Pupil Google Group. We will try our best to help you out, and answer questions quickly.

### Running Pupil from Source
Pupil is a prototype and will continue to be in active development. If you plan to make changes to Pupil, want to see how it works, [make a fork][fork], install all dependencies and run Pupil source directly with Python.

### Installing Dependencies
* [Linux](#linux-dependencies) step-by-step instructions for Ubuntu 16.04 LTS +
* [MacOS](#macos-dependencies) step-by-step instructions for MacOS 10.8+
* [Windows](#windows-dependencies) step-by-step instructions for Windows 10

### Download and Run Pupil Source Code

Once you have all dependencies installed, you're 99% done. Now, all you have to do [fork][fork] the github repository.  Or, using the terminal you can clone the Pupil repository using `git`:

```
cd /the_folder_where_Pupil_will_live/
git clone https://github.com/pupil-labs/pupil.git
```

### Run Pupil Capture from Source

You're in development land now.  If you're running from the source, there will be no icon to click. So fire up the terminal, navigate to the cloned Pupil repository, and start Pupil using Python.

```
cd /the_folder_where_Pupil_lives/pupil_src/capture
python main.py
```

[release-page]: http://github.com/pupil-labs/pupil/releases
[fork]: https://github.com/pupil-labs/pupil/fork