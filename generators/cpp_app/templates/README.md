![Mikudos Service](https://img.shields.io/badge/MIKUDOS-GRPC--server-lightgrey?style=for-the-badge&logo=appveyor)

# mikudos-service-c++

mikudos-service-c++

# Satisfy the precondition

You need to install some software and dependencies for your software building.

## Build with Makefile

please install protobuf and grpc with grpc_cpp_plugin for generate code with the Makefile

## Build with CMake

If you want to use CMake to generate your Makefile for your project. please use cmake to install the protobuf package and the grpc package. You can follow the steps:

1. clone the gRPC package from GitHub `git clone https://github.com/grpc/grpc.git && cd grpc`
2. update all the submodule for gRPC package `git submodule update --init`
3. Change to the Protobuf Version you want, I used 3.10 to compatable with brew install version `cd third_party/protobuf && git checkout 3.10.x`
4. Load all submodule `git submodule update --init --recursive`
5. Build Protobuf using CMake `cd cmake && cmake . && make && make install`
6. Build gRPC
    - cd to gRPC directory `cd ....`
    - `mkdir build_grpc && cd build_grpc`
    - Config your gRPC as a submodule and use CMake to generate Makefile to build your own gRPC package `cmake ..` (default gRPC use the boringssl as ssl module, I got error wenn i use openssl instead of the default. so just use the default =;) )
    - `make && make install`
7. Congratulations! you can use CMake to build your project now!

# Build with cmake

-   make a directory for your build `mkdir build`
-   generate build files with cmake `cmake ..`
-   build `make`
