+++
date = "2017-01-20T11:37:57+07:00"
title = "win driver setup"
section_weight = 4
page_weight = 1.5
+++

## Windows Pupil Labs Python libs from Source

This section is for Pupil core develpers who want to build `pyav`, `pyndsi`, `pyglui`, and `pyuvc` from source and create Python wheels. 

If you just want to run Pupil from source, go back to the [Windows Dependencies](#windows-dependencies) section and install the prebuilt wheels. 

This section assumes that you have a Windows development environment set up and all dependencies installed as specified in the [Windows Dependencies](#windows-dependencies) section. 

Please also see the [Notes Before Starting](#notes-before-starting) section for a clarification of terms. 

### Clone Pupil Labs Python libs

Go to your work dir and open a cmd prompt and clone the following repos

```
git clone --recursive https://github.com/pupil-labs/pyav.git
git clone --recursive https://github.com/pupil-labs/pyglui.git
git clone --recursive https://github.com/pupil-labs/pyndsi.git
git clone --recursive https://github.com/pupil-labs/pyuvc.git
git clone https://github.com/pupil-labs/libusb.git
git clone https://github.com/pupil-labs/libuvc.git
```

<aside class="notice">Note - `libusb` and `libuvc` are dependencies of pyuvc and must be built prior to building pyuvc</aside>

### Install wheel

In order to create wheels, you will need to install the `wheel` lib.

`pip install wheel`


### Download FFMPEG Dev

You will need both `.dll` files as well as FFMPG libs in order to build `pyav`. You should have already downloaded FFMPEG shared binaries in the [FFMPEG to pupil_external](#ffmpeg-to-pupil_external) step above. 

- Download FFMPEG Windows Dev - `ffmpeg-3.3.1-win64-dev` - from [ffmpeg](http://ffmpeg.zeranoe.com/builds/) 
- Unzip ffmpeg-dev to your work dir

### Download libjpeg-turbo

- Download libjpeg-turbo v1.5.1 from [sourceforge](https://sourceforge.net/projects/libjpeg-turbo/files/1.5.1/libjpeg-turbo-1.5.1-vc64.exe/download)
- Open the `.exe` file for setup and navigate to where you want install in your work dir as `libjpeg-turbo64`
- Add `C:\work\libjpeg-turbo\bin` to your system `PATH`

### Build pyav

- Copy the following `ffmpeg` shared libs from `ffmpeg-shared\bin` to `pyav/av`
    - avcodec
    - avdevice
    - avfilter
    - avformat
    - avutil
    - postproc
    - swresample
    - swscale
- Open a cmd prompt
- `python setup.py clean --all build_ext --inplace --ffmpeg-dir=C:\work\ffmpeg-3.3.1-dev -c msvc`
  - replace the ffmpeg-dir with the location of your ffmpeg-dev dir
- You can create a wheel from within this directory with `pip wheel .`

### pyglui from source

- Open a cmd prompt
- `python setup.py install`
- You can create a wheel from within this directory with `pip wheel .`

### pyndsi from source

- Open a cmd prompt
- make sure paths to ffmpeg and libjpeg-turbo are correctly specified in setup.py
- `python setup.py install` 
- You can create a wheel from within this directory with `pip wheel .`

### libusb

- Clone the `libuvc` repo
- `git clone https://github.com/pupil-labs/libusb.git`
- open libusb_2017.sln with MSVC 2017
- Set to `Release` and `x64` (libusb-1.0 (static))
- Build solution

### libuvc

- Make a dir in `libuvc` titled `bin`
- Download CMAKE from [cmake.org](https://cmake.org/download/)
- Install CMAKE. Make sure to check the box to add CMAKE to your PATH
- Download POSIX Threads for Windows from [sourceforge](https://sourceforge.net/projects/pthreads4w/) **Note** this is a 32 bit lib, but that is OK! Move PThreads to your work dir.
- Download Microsoft Visual C++ 2010 Redistributable from [microsoft](https://www.microsoft.com/en-us/download/details.aspx?id=14632). The `pthreadVC2` lib depends on `msvcr100.dll`. 
- Open CMAKE GUI
- Set source code directory to libuvc repo
- Set binary directory to `libuvc/bin`
- Click `Configure`
- Select `Visual Studio 15 2017 x64` as generator for the project
- Select `Use default native compilers`
- Fix paths in the config. Set to the following
    - `LIBUSB_INCLUDE_DIR` = `C:\work\libusb\libusb`
    - `LIBUSB_LIBRARY_NAMES` = `C:\work\libusb\x64\Release\dll\libusb-1.0.lib`
    - `PTHREAD_INCLUDE_DIR` = `C:\work\pthreads-w32-2-9-1-release\Pre-built.2\include`
    - `PTHREAD_LIBRARY_NAMES` = `C:\work\pthreads-w32-2-9-1-release\Pre-built.2\lib\x64\pthreadVC2.lib`
- Click `Configure` again and resolve any path issues
- Click `Generate`
- Open `libuvc/bin/libuvc.sln` - this will open the project in Visual Studio 2017 Preview
- Select `ALL_BUILD` and set to `Release` and `x64` and `Build Solution` from the `Build` menu.
- Add `C:\work\libuvc\bin\Release` to your system PATH


### pyuvc

- in `pyuvc/setup.py` make sure the paths to `libuvc`, `libjpeg-turbo`, and `libusb` are correctly specified
- `python setup.py install`
- You can create a wheel from within this directory with `pip wheel .`
