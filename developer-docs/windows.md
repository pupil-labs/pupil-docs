+++
date = "2017-01-19T16:56:14+07:00"
title = "windows"
section_weight = 4
page_weight = 1.3
+++

## Windows Dependencies

### System Requirements

We develop the Windows version of Pupil using **Windows 10**. 

Therefore we can only debug and support issues for **Windows 10**. 

### Install Windows Dependencies

Running Pupil from source includes the installation of several dependencies. Please follow the instructions below. 

For discussion or questions on Windows installation head over to the [Pupil Google Group][google-group]. If you find any problems please raise an issue!

### Utils

* Install [7-zip](http://www.7-zip.org/download.html) for extraction purposes.

**Visual C++ Runtime**

* Install Visual Studio 2015 Community Update 3

**Python (64-bit)**

* Download and install version 3.5.2: [Windows Executable installer](https://www.python.org/download/releases/3.5.2/)
* During installation, select the tick box to add your Python installation path to the PATH environment variable

### Python Wheels

Python extensions can be installed via **pip**. We recommend to download and install the pre-built wheel (*.whl) packages by [Christoph Gohlke](http://www.lfd.uci.edu/~gohlke/pythonlibs/). Thanks for creating and sharing these packages!
To install an extension open command line with admin rights and run `python -m pip install [PACKAGE_NAME.whl]`

* [SciPy](http://www.lfd.uci.edu/~gohlke/pythonlibs/#scipy): scipy-0.18.1-cp35-cp35m-win_amd64.whl
* [PyOpenGL](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyopengl): PyOpenGL-3.1.1-cp35-cp35m-win_amd64.whl
* [Numpy](http://www.lfd.uci.edu/~gohlke/pythonlibs/#numpy): numpy-1.11.2+mkl-cp35-cp35m-win_amd64.whl
* [OpenCV](http://www.lfd.uci.edu/~gohlke/pythonlibs/#opencv): opencv_python-3.1.0-cp35-cp35m-win_amd64.whl
* [PyZMQ](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyzmq): pyzmq-15.4.0-cp35-cp35m-win_amd64.whl
* [Cython](http://www.lfd.uci.edu/~gohlke/pythonlibs/#cython): Cython‑0.24.1‑cp35*.whl
* [psutil](http://www.lfd.uci.edu/~gohlke/pythonlibs/#psutil): psutil-5.0.0-cp35-cp35m-win_amd64.whl
* [PyAudio](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio): PyAudio-0.2.9-cp35-none-win_amd64.whl
* [boost_python](http://www.lfd.uci.edu/~gohlke/pythonlibs/#boost.python): boost_python-1.59-cp35-none-win_amd64.whl

For networking install:

* `python -m pip install https://github.com/zeromq/pyre/archive/master.zip`
* `python -m pip install win_inet_pton`

You also need to install Python libraries that are specific to Pupil. Download the `.whl` file and install with `pip`.

* [PyAV](https://github.com/pupil-labs/PyAV/releases/latest)
* [pyglui](https://github.com/pupil-labs/pyglui/releases/latest) 
* [pyndsi](https://github.com/pupil-labs/pyndsi/releases/latest) 
* [pyuvc](https://github.com/pupil-labs/pyuvc/releases/latest)

### Setup GLFW
* Download [64-bit Windows binaries](http://www.glfw.org/download.html).
* Unzip and search folder `vs-2015` or `lib-vs2015` containing `glfw3.dll`.
* Copy glfw3.dll to `pupil\pupil_external\`.

### Install Git

* Download and install [Git](http://git-scm.com/download/win). This enables you to download and update the Pupil source code and further extensions it needs.
* Add the `/bin` path of Git to the PATH environment variable, e.g. `C:/Program Files (x86)/Git/bin`.

### Clone Pupil source code
* Open the Git Bash and navigate to the directory you chose for pupil.
* Run `git clone http://github.com/pupil-labs/pupil` (creates a sub-directory for pupil)

### Download Eigen 3.2
* Download and unzip [Eigen 3.2](http://bitbucket.org/eigen/eigen/get/3.2.10.zip)

### Install ceres-windows
* git clone --recursive https://github.com/tbennun/ceres-windows.git
* Copy the Eigen directory to ceres-windows 
* Copy ceres-windows\ceres-solver\config\ceres\internal\config.h to ceres-windows\ceres-solver\include\ceres\internal\
* Open `glog\src\windows\port.cc` and comment out [L58-64](https://github.com/tbennun/glog/blob/7553b4193d856b4ba4e74cf064a5a70eb6a87cdd/src/windows/port.cc#L58-L64)
* Open the vs2012 sln file using VS2015. Agree to upgrade the compiler and libraries
* Build the static library versions of libglog and ceres-solver

### Install OpenCV for Windows
[opencv-3.1.0](https://sourceforge.net/projects/opencvlibrary/files/opencv-win/3.1.0/opencv-3.1.0.exe/download)

* Copy opencv3.1.0\build\x64\vc14\bin\opencv_world310.dll to the pupil\pupil_external\ directory

### Install Boost
* Download and install [Boost-1.59](https://sourceforge.net/projects/boost/files/boost-binaries/1.59.0/boost_1_59_0-msvc-14.0-64.exe/download)
* Open boost_1_59_0\boost\python\detail\config.hpp
* Change the macro definition "#define BOOST_LIB_NAME boost_python" to "#define BOOST_LIB_NAME boost_python3" and save the file

#### Edit the Pupil detectors and calibration cython setup files

* Edit pupil\pupil_src\capture\pupil_detectors\setup.py . In the windows section, update the paths for OpenCV, Eigen, Boost, Ceres, Glog according to your installation locations
* Edit pupil\pupil_src\shared_modules\calibration_routines\optimization_calibration\setup.py , in the same manner as above.

### Install Drivers 
In order to support isochronous USB transfer on Windows, you will need to install drivers for the cameras in your Pupil headset. Follow setup steps in the Windows Driver Setup section [below](#windows-driver-setup).

#### Run Pupil!
> Capture

```bash
cd your_pupil_path\pupil\pupil_src\capture
run_capture.bat
```

> Player

```bash
cd your_pupil_path\pupil\pupil_src\player
run_player.bat path_to_recording
```

### Setup PyAV for wheel creation
* Clone PyAV to your system `git clone https://github.com/pupil-labs/PyAV.git`
* Download and extract [ffmpeg-3.2-dev](http://ffmpeg.zeranoe.com/builds/win64/dev/ffmpeg-3.2-win64-dev.zip) 
* Download and extract [ffmpeg-3.2-shared](http://ffmpeg.zeranoe.com/builds/win64/shared/ffmpeg-3.2-win64-shared.zip)
* Copy the dlls from the ffmpeg-3.2-win64-shared\bin directory to the pupil\pupil_external\ directory
* Open "Developer command prompt for VS2015" and cd to PyAV directory
* Run `python setup.py clean --all build_ext --inplace --ffmpeg-dir=path\to\ffmpeg-3.2-dev -c msvc`
* `pip wheel .`
* `pip install .`


[google-group]: http://groups.google.com/group/pupil-discuss