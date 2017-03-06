+++
date = "2017-01-19T16:40:20+07:00"
title = "linux"
weight = 25
+++

<div class="header-border-top"></div>
<div class="content-container">
  <div class="header-link">
    <a href="#dependencies-install">
      <h2 id="dependencies-install">Dependecies Installation</h2>
    </a>
  </div>
</div>

<div class="content-container">
  <div class="header-link">
    <a href="#linux">
      <h3 id="linux">Linux</h3>
    </a>
  </div>
</div>
<div class="header-border-bottom"></div>

These installation instructions are tested using **Ubuntu 16.04 or higher** running on many machines. Do not run Pupil on a VM unless you know what you are doing.

<div class="content-container">
  <div class="header-link">
    <a href="#linux-install-dependencies">
      <h4 id="linux-install-dependencies">Install Dependencies</h4>
    </a>
  </div>
</div>

Let's get started! Its time for `apt-get`.  Just copy paste into the terminal and listen to your machine purr.

```
sudo apt install -y pkg-config git cmake build-essential nasm wget python-setuptools libusb-1.0-0-dev python-zmq python-dev python-pip python-opengl python-opencv python-scipy libavformat-dev libavcodec-dev libavdevice-dev libavutil-dev libswscale-dev libavresample-dev ffmpeg  libglew-dev libglfw3-dev  libopencv-dev
```

> OpenCV

```
git clone https://github.com/itseez/opencv
cd opencv
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE ..
make -j2
sudo make install
sudo ldconfig
```

> Turbojpeg

```
wget -O libjpeg-turbo.tar.gz http://sourceforge.net/projects/libjpeg-turbo/files/1.4.2/libjpeg-turbo-1.4.2.tar.gz/download
tar xvzf libjpeg-turbo.tar.gz
cd libjpeg-turbo-1.4.2
./configure --with-pic
sudo make install
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
sudo pip install numexpr
sudo pip install cython
sudo pip install psutil
sudo pip install pyzmq
sudo pip install msgpack_python
sudo pip install git+https://github.com/zeromq/pyre
sudo pip install git+https://github.com/pupil-labs/PyAV
sudo pip install git+https://github.com/pupil-labs/pyuvc
sudo pip install git+https://github.com/pupil-labs/pyndsi
sudo pip install git+https://github.com/pupil-labs/pyglui
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