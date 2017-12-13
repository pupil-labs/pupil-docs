+++
date = "2017-01-19T16:40:20+07:00"
title = "linux"
section_weight = 4
page_weight = 1.1
+++

## Linux Dependencies

These installation instructions are tested using **Ubuntu 16.04 or higher** running on many machines. Do not run Pupil on a VM unless you know what you are doing.

### Install Linux Dependencies

Let's get started! Its time for `apt`!  Just copy paste into the terminal and listen to your machine purr.

```
sudo apt install -y pkg-config git cmake build-essential nasm wget python3-setuptools libusb-1.0-0-dev  python3-dev python3-pip python3-numpy python3-scipy libglew-dev libglfw3-dev libtbb-dev
```

> ffmpeg >= 3.2

```
sudo add-apt-repository ppa:jonathonf/ffmpeg-3
sudo apt-get update
sudo apt install libavformat-dev libavcodec-dev libavdevice-dev libavutil-dev libswscale-dev libavresample-dev ffmpeg libav-tools x264 x265
```

> OpenCV

The requisites for opencv to build python3 cv2.so library are:
1. python3 interpreter found
1. libpython***.so shared lib found (make sure to install python3-dev)
1. numpy for python3 installed.

```
git clone https://github.com/opencv/opencv
cd opencv
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=RELEASE -DWITH_TBB=ON -DWITH_CUDA=OFF -DBUILD_opencv_python2=OFF -DBUILD_opencv_python3=ON ..
make -j2
sudo make install
sudo ldconfig
```

<aside class="notice">
OpenCV is not able to build Python 2 and Python 3 modules at the same time.
OpenCV will build the Python 2 module by default if requirements for both
versions are met. Setting the Python 2 Numpy include directory to an empty
string effectively disables the Python 2 module build.
</aside>

<aside class="faq">
Do *not* install `opencv-python` via pip if you see `ImportError: No module named 'cv2'`.
The error appears if the above requisites were not met.
Delete the build folder, recheck the requisites and try again.
</aside>

<aside class="faq">
The `ImportError: */detector_2d.*.so: undefined symbol: *ellipse*InputOutputArray*RotatedRect*Scalar*`
appears if opencv has been installed previously via `apt-get`.

1. Remove all opencv installations that were installed via `apt-get`.
1. Delete the `*.so` files as well as the `build` dirctory within the `pupil_detectors` directory.
1. Start Pupil Capture. This should trigger a recompilation of the detector modules.
</aside>

> Turbojpeg

```
wget -O libjpeg-turbo.tar.gz https://sourceforge.net/projects/libjpeg-turbo/files/1.5.1/libjpeg-turbo-1.5.1.tar.gz/download
tar xvzf libjpeg-turbo.tar.gz
cd libjpeg-turbo-1.5.1
./configure --enable-static=no --prefix=/usr/local
sudo make install
sudo ldconfig
```

> custom version of libusb 
Required for 17.10 and with 200hz cameras only. Otherwise IGNORE!)

1. Download binary from here https://github.com/pupil-labs/libusb/releases/tag/v1.0.21-rc6-fixes
1. Replace system libusb-1.0.so.0 with this binary

```
sudo cp '~/path to your fixed binary/libusb-1.0.so.0' '/lib/x86_64-linux-gnu/libusb-1.0.so.0'
```

> libuvc

```
git clone https://github.com/pupil-labs/libuvc
cd libuvc
mkdir build
cd build
cmake ..
make && sudo make install
```

> udev rules for running libuvc as normal user

```
echo 'SUBSYSTEM=="usb",  ENV{DEVTYPE}=="usb_device", GROUP="plugdev", MODE="0664"' | sudo tee /etc/udev/rules.d/10-libuvc.rules > /dev/null
sudo udevadm trigger
```

> Install packages with `pip`

```
sudo pip3 install numexpr
sudo pip3 install cython
sudo pip3 install psutil
sudo pip3 install pyzmq
sudo pip3 install msgpack_python
sudo pip3 install pyopengl
sudo pip3 install git+https://github.com/zeromq/pyre
sudo pip3 install git+https://github.com/pupil-labs/PyAV
sudo pip3 install git+https://github.com/pupil-labs/pyuvc
sudo pip3 install git+https://github.com/pupil-labs/pyndsi
sudo pip3 install git+https://github.com/pupil-labs/pyglui
```

> Finally, we install 3D eye model dependencies

```bash
sudo apt-get install libboost-dev
sudo apt-get install libboost-python-dev
sudo apt-get install libgoogle-glog-dev libatlas-base-dev libeigen3-dev
# sudo apt-get install software-properties-common if add-apt-repository is not found
sudo add-apt-repository ppa:bzindovic/suitesparse-bugfix-1319687
sudo apt-get update
sudo apt-get install libsuitesparse-dev
# install ceres-solver
git clone https://ceres-solver.googlesource.com/ceres-solver
cd ceres-solver
mkdir build && cd build
cmake .. -DBUILD_SHARED_LIBS=ON
make -j3
make test
sudo make install
sudo sh -c 'echo "/usr/local/lib" > /etc/ld.so.conf.d/ceres.conf'
sudo ldconfig
```
