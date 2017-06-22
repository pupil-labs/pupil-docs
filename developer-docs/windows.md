+++
date = "2017-06-22T16:56:14+07:00"
title = "windows"
section_weight = 4
page_weight = 1.3
+++

## Windows Dependencies

### System Requirements

We develop the Windows version of Pupil using **64 bit** **Windows 10**. 

Therefore we can only debug and support issues for **Windows 10**. 

### Notes Before Starting

- Work directory - We will make a directory called `work` at `C:\work` and will use this directory for all build processes and setup scripts. Whenever we refer to the `work` directory, it will refer to `C:\work`. You can change this to whatever is convenient for you, but note that all instructions and setup files refer to `C:\work`
- Command Prompt - We will **always** be using `x64 Native Tools Command Prompt for VS 2017 Preview` as our command prompt. Make sure to only use this command prompt. Unlike unix systems, windows has many possible "terminals" or "cmd prompts". We are targeting `x64` systems and require the `x64` command prompt. You can access this cmd prompt from the Visual Studio 2017 shortcut in your Start menu.
- 64bit - You should be using a 64 bit system and therefore all downloads, builds, and libraries should be for `x64` unless otherwise specified. 
- Windows paths and Python - path separators in windows are a forward slash `\`. In Python, this is a special "escape" character. When specifying Windows paths in a Python string you must use `\\` instead of `\`. 
- Help - For discussion or questions on Windows installation head over to the [Pupil Google Group][google-group]. If you run into trouble please raise an issue!

### Install Visual Studio

Download Visual Studio 2017 Preview version 15.3 from [visualstudio.com](https://www.visualstudio.com/vs/preview/)

- Run the Visual Studio bootstrapper `.exe`.
- Navigate to the `Workloads` tab
- In the `Workloads` tab, choose `Desktop Development with C++`. This will install all runtimes and components we need for development. Here is a list of what you should see `checked` in the `Desktop development with C++` in the `Summary` view:
    - VC++ 2017 v141 toolset (x86,x64)
    - C++ profiling tools
    - Windows 10 SDK (10.0.15063.0) for Desktop C++ x86 and x64
    - Visual C++ tools for CMAKE
    - Visual C++ ATL support
    - MFC and ATL support (x86, x64)
    - Standard Library Modules
    - VC++ 2015.3 v140 toolset for desktop (x86, x64)
- Navigate to the `Individual Components` tab
- In the `Individual Components` tab check `Git`. This will install `git` on your system. In the Summary Panel for `Individual Components` you should see:
  - `Git for Windows`
- Click `Install`

<aside class="notice">Note - You can always re-run the Visual Studio bootstrapper to modify your Visual Studio installation.</aside>

### Install 7-Zip
Install [7-zip](http://www.7-zip.org/download.html) to extract files.

### Install Python

- [Download Python x64](https://www.python.org/downloads/release/python-361/)
- Run the Python installer.
- Check the box `Add Python to PATH`. This will add Python to your System PATH Environment Variable.
- Check the box `Install for all users`. This will install Python to `C:\Program Files\Python36`. 

<aside class="notice"> Note - some build scripts may fail to start Python due to spaces in the path name. So, you may want to consider installing Python to `C:\Python36`.</aside>

### System Environment Variables
To access your System Environment Variables:

- Right click on the Windows icon in the system tray.
- Select `System`. 
- Click on `Advanced system settings`. 
- Click on `Environment Variables...`.
- Click on `Path` in `System Variables` and click `Edit`.

### Python Wheels
Most Python extensions can be installed via **pip**. We recommend to download and install the pre-built wheel (*.whl) packages maintained by [Christoph Gohlke](http://www.lfd.uci.edu/~gohlke/pythonlibs/). (@Gohlke Thanks for creating and sharing these packages!)

<aside class="notice">Note - you are using Python3.6 and a Windows 64 bit system. Therefore download wheels with `cp36‑cp36m‑win_amd64.whl` in the file name. `cp36` means C Python v3.6 and `amd64` signifies 64 bit architecture.</aside>

Download the most recent version of the following wheels Python3.6 x64 systems.

- [numpy](http://www.lfd.uci.edu/~gohlke/pythonlibs/#numpy)
- [scipy](http://www.lfd.uci.edu/~gohlke/pythonlibs/#scipy)
- [boost.python](http://www.lfd.uci.edu/~gohlke/pythonlibs/#boost.python)
- [cython](http://www.lfd.uci.edu/~gohlke/pythonlibs/#cython)
- [opencv](http://www.lfd.uci.edu/~gohlke/pythonlibs/#opencv)
- [pyopengl](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyopengl) (do not download pyopengl-accelerate)
- [psutil](http://www.lfd.uci.edu/~gohlke/pythonlibs/#psutil)
- [pyaudio](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio)
- [pyzmq](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyzmq)

Open your command prompt and `Run as administrator` in the directory where the wheels are downloaded.

- Install `numpy` and `scipy` before all other wheels.
- Install all wheels with `pip install X` (where X is the name of the `.whl` file) 
- You can check that libs are installed with `python import X` statements in the command prompt where `X` is the name of the lib.

### Python Libs
Open your command prompt and install the following libs:

- `pip install msgpack_python`
- `pip install win_inet_pton`
- `pip install git+https://github.com/zeromq/pyre.git`

### Pupil Labs Python Wheels
Download the following Python wheels from Pupil Labs github repos.

- [pyglui](https://github.com/pupil-labs/pyglui/releases/latest)
- [pyav](https://github.com/pupil-labs/pyav/releases/latest)
- [pyndsi](https://github.com/pupil-labs/pyndsi/releases/latest)
- [pyuvc](https://github.com/pupil-labs/pyuvc/releases/latest)

<aside class="notice">Note - if you're looking to build Pupil Labs Python libs from source, go <a href="#">here</a></aside>

### Ceres for Windows
Navigate to your work directory

- `git clone --recursive https://github.com/tbennun/ceres-windows.git`
- Download [Eigen 3.3.3](https://bitbucket.org/eigen/eigen/downloads/?tab=tags)
- Unzip Eigen and rename the contained `eigen` directory to `Eigen` 
- Copy the `Eigen` directory into `ceres-windows`
- Open `ceres-2015.sln` and with Visual Studio 2017 Preview and agree to update to 2017.
- Set configurations to `Release` and `x64`
- Right click on `libglog_static` and `Build`
- Right click on `ceres_static` and `Build`

### Boost
Download and install the latest boost version for Windows x64 with version number matching your Visual Studio 2017 MSVC version. 

- For VS 2017 preview the MSVC version is 14.1
- Download boost from [sourceforge](https://sourceforge.net/projects/boost/files/boost-binaries/1.64.0/boost_1_64_0-msvc-14.1-64.exe/download)
- Extract boost to work directory and name the boost dir `boost`
- Open `boost\python\detail\config.hpp` with Visual Studio 2017 Preview
- Change **L108** from `define BOOST_LIB_NAME boost_python` to `define BOOST_LIB_NAME boost_python3`
- Save the file and close Visual Studio

The prebuilt boost.python depends on `python27.dll`. The files from package boost.python are built with Visual Studio 2015. One solution to this issue is to build boost from source.

- Open your command prompt
- cd to `C:\work\boost`
- Run `boostrap.bat`. This will generate `b2.exe`.

Change user config before compiling boost.

- Copy `boost\tools\build\example\user-config.jam` to `boost\tools\build\src\user-config.jam`. 
- Uncomment and edit following lines in the `user-config.jam` file according your msvc and python version:
    - `using msvc : 14.1 ;` in section `MSVC configuration`
    - `using python : 3.6 : C:\\Python36 : C:\\Python36\\include : C:\\Python36\\libs ;` in section `Python configuration`

Build boost.python

- Open your command prompt and navigate to your work dir
- `b2 --with-python link=shared address-model=64`
- The generated DLL and Lib files are in `C:\work\boost\stage`.

Add Boost libs to your system path

- Add `C:\work\boost\stage\lib` to your system PATH in your System Environment Variables

### Clone the Pupil Repo

- Open a command prompt in your work dir
- `git clone https://pupil-labs/pupil.git`

### Setup pupil_external dependencies
Dynamic libs are required to be stored in `pupil\pupil_external` so that you do not have to add further modifications to your system PATH.  

### GLEW to pupil_external

- Download GLEW Windows binaries from [sourceforge](http://glew.sourceforge.net/)
- Unzip GLEW in your work dir
- Copy `glew32.dll` to `pupil_external` 

### GLFW to pupil_external

- Download GLFW Windows binaries from [glfw.org](http://www.glfw.org/download.html)
- Unzip GLFW to your work dir
- Copy `glfw3.dll` to `pupil_external`

### FFMPEG to pupil_external

- Download FFMPEG Windows shared binaries from [ffmpeg](http://ffmpeg.zeranoe.com/builds/)
- Unzip ffmpeg-shared to your work dir
- Copy the following 8 `.dll` files to `pupil_external`
    - `avcodec-57.dll`
    - `avdevice-57.dll`
    - `avfilter-6.dll`
    - `avformat-57.dll`
    - `avutil-55.dll`
    - `postproc-54.dll`
    - `swresample-2.dll`
    - `swscale-4.dll`

### OpenCV to pupil_external

- Download opencv 3.2 exe installer from [sourceforge](https://downloads.sourceforge.net/project/opencvlibrary/opencv-win/2.3.0/opencv-3.2.0-vc14.exe)
- Unzip OpenCV to your work dir and rename dir to `opencv`
- Copy `opencv\build\x64\vc14\bin\opencv_world320.dll` to `pupil_external`

### Modify pupil_detectors setup.py

- Open `pupil\pupil_src\capture\pupil_detectors\setup.py`
- Go to the `if platform.system() == 'Windows'` block
- Check that paths for `opencv`, `Eigen`, `ceres-windows` and `boost` are correctly specified. The installed opencv lib is `opencv_world320.lib`.
- Edit paths if necessary
- Edit `C:\\work\\boost\\stage\\lib` if necessary
- Save and close setup.py

<aside class="faq">When starting run_capture.bat, it will build module pupil_detectors. However, if you are debugging, you may want to try building explicitly. From within `pupil/pupil_src/capture/pupil_detectors` run `python setup.py build` to build the pupil_detectors.</aside>

### Modify optimization_calibration setup.py

- Open `pupil\pupil_src\shared_modules\calibration_routines\optimization_calibration\setup.py`
- Go to the `if platform.system() == 'Windows'` block
- Check that paths for `opencv`, `Eigen`, `ceres-windows` and `boost` are correctly specified. The installed opencv lib is `opencv_world320.lib`.
- Edit paths if necessary
- Edit `C:\\work\\boost\\stage\\lib` if necessary
- Save and close setup.py

<aside class="faq">When starting run_capture.bat, it will build module pupil_detectors. However, if you are debugging, you may want to try building explicitly. From within `pupil/pupil_src/capture/pupil_detectors` run `python setup.py build` to build the pupil_detectors.</aside>

### Start Pupil Capture with run_capture.bat
You can double click `run_capture.bat` but the cmd prompt will close after executing the `.bat` file. It is better for development to run the `.bat` file from an already open cmd prompt. 

- Open your cmd prompt
- Go to `pupil/pupil_src/capture`
- run_capture.bat

### Start Pupil Player with run_player.bat
You can double click `run_player.bat` but the cmd prompt will close after executing the `.bat` file. It is better for development to run the `.bat` file from an already open cmd prompt. 

- Open your cmd prompt
- Go to `pupil/pupil_src/player`
- run_player.bat