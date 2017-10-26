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

If you have questions, encounter any problems, or want to share progress -- join us on [Discord][discord]. We will try our best to help you out, and answer questions quickly.

### Running Pupil from Source
Pupil is a prototype and will continue to be in active development. If you plan to make changes to Pupil, want to see how it works, [make a fork][fork], install all dependencies and run Pupil source directly with Python.

<aside class="faq">
When is it recommended to run from source? For a lot of applications it is sufficient
to use <a href="https://docs.pupil-labs.com/#interprocess-and-network-communication">our network api</a>.
<a href="https://docs.pupil-labs.com/#plugins-basics">In some cases it is justified to write custom plugins</a>. Loading custom plugins
during runtime is supported for the bundled applications as well. Be aware that the bundled
applications only allow access to libraries that are already included in the bundle.
Therefore, it is recommended to run from source if you develop a plugin or you
make changes to the Pupil source code itself. This will also give you the advantage
of receiving features and bug fixes as soon as they hit the Github repository.
</aside>

### Installing Dependencies
* [Linux](#linux-dependencies) step-by-step instructions for Ubuntu 16.04 LTS +
* [MacOS](#macos-dependencies) step-by-step instructions for MacOS 10.8+
* [Windows](#windows-dependencies) step-by-step instructions for Windows 10
* [Intel RealSense 3D](#realSense-dependencies) instructions if you want to use an Intel RealSense R200 as scene camera.

### Download and Run Pupil Source Code

Once you have all dependencies installed, you're 99% done. Now, all you have to do [fork][fork] the github repository.  Or, using the terminal you can clone the Pupil repository using `git`:

```
cd /the_folder_where_Pupil_will_live/
git clone https://github.com/pupil-labs/pupil.git
```

### Run Pupil Capture from Source

You're in development land now.  If you're running from the source, there will be no icon to click. So fire up the terminal, navigate to the cloned Pupil repository, and start Pupil using Python.

```
cd /the_folder_where_Pupil_lives/pupil_src
python3 main.py
```

[release-page]: http://github.com/pupil-labs/pupil/releases
[fork]: https://github.com/pupil-labs/pupil/fork
[discord]: http://pupil-labs.com/chat
