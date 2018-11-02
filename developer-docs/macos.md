+++
date = "2017-01-19T16:33:08+07:00"
section_weight = 4
page_weight = 1.2
+++

## MacOS Dependencies

These instructions have been tested for MacOS 10.8, 10.9, 10.10, 10.11, and 10.12. Use the linked websites and Terminal to execute the instructions.

### Install Apple Dev Tools
Trigger the install of the Command Line Tools (CLT) by typing this in your terminal and letting MacOS install the tools required:

```bash
git
```

### Install Homebrew
[Homebrew][brew] describes itself as "the missing package manager for OSX."  It makes development on MacOS much easier, [plus it's open source][brew-github].  Install with the ruby script.

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

> Install Homebrew `Python >=3.6`

```
brew install python3
```

Add Homebrew installed executables and Python scripts to your path.  Add the following two lines to your ~/.bash_profile. (you can open textedit from the terminal like so: `open ~/.bash_profile`)

    export PATH=/usr/local/bin:/usr/local/sbin:$PATH
    export PYTHONPATH=/usr/local/lib/python3.6/site-packages:$PYTHONPATH

<aside class="notice">
Note - You might need to change the Python path above depending on your installed version. `brew info python3 | grep site-packages` prints the corresponding site-packages folder.
</aside>

### Dependencies with `brew`

Let's get started! Its time to put `brew` to work! Just copy paste commands into your terminal and listen to your machine purr.

```
brew install pkg-config
brew install scipy
brew install libjpeg-turbo
brew install libusb
brew install portaudio
# opencv will install ffmpeg, numpy, and opencv-contributions automatically
# tbb is included by default with https://github.com/Homebrew/homebrew-core/pull/20101
brew install opencv
brew install glew
brew install glfw3
# dependencies for 2d_3d c++ detector
brew install boost
brew install boost-python3
brew install ceres-solver
```

### Install `libuvc`
```
git clone https://github.com/pupil-labs/libuvc
cd libuvc
mkdir build
cd build
cmake ..
make && make install
```

### Python Packages with `pip`

PyOpenGL, ZMQ, ...

```
pip3 install PyOpenGL
pip3 install pyzmq
pip3 install numexpr
pip3 install cython
pip3 install psutil
pip3 install msgpack
pip3 install pyaudio
pip3 install cysignals
pip3 install git+https://github.com/zeromq/pyre
pip3 install git+https://github.com/pupil-labs/PyAV
pip3 install git+https://github.com/pupil-labs/pyuvc
pip3 install git+https://github.com/pupil-labs/pyndsi
pip3 install git+https://github.com/pupil-labs/pyglui
```


**That's it -- you're Done!**

[brew]: http://brew.sh/
[brew-github]: https://github.com/Homebrew/homebrew
