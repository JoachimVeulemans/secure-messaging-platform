[![Docker Build Status](https://img.shields.io/docker/cloud/build/joachimveulemans/secure-messaging-platform)](https://hub.docker.com/r/joachimveulemans/secure-messaging-platform/builds)
[![Docker Automated Status](https://img.shields.io/docker/cloud/automated/joachimveulemans/secure-messaging-platform)](https://hub.docker.com/r/joachimveulemans/secure-messaging-platform)

# Secure Messaging Platform

## Introduction

This repository contains 2 dockers (frontend & backend) to send and receive messages in a secure way.

## Running the project locally

If you want to run the project locally on your own computer, you can do so in two ways. You can run it like in production and start the Docker containers or run it like you would when developing.

### Production-like

Here is assumed that you have [Docker](https://www.docker.com/get-started) installed correctly.

Start of by building the images: `.\00_build_images.cmd` or `./00_build_images.sh`. Alternatively, you can also pull the images that are already build by: `.\00b_pull_images.cmd` or `./00b_pull_images.sh`.

#### Frontend

Start frontend by: `.\01_start_frontend.cmd` or `./01_start_frontend.sh`. You can now go to this address in your browser: [localhost:4200](http://localhost:4200).

#### Backend

Start backend by: `.\02_start_backend.cmd` or `./02_start_backend.sh`. You can now go to this address in your browser: [localhost:5000](http://localhost:5000).

### Development

There is assumed that you have [NPM](https://www.npmjs.com/) and [Python 3](https://www.python.org/downloads/) installed correctly.

#### Frontend

1. Go the the frontend directory by: `cd frontend`.
2. Install dependencies by: `npm install`.
3. Run the project by: `npm run start`.
4. You can now go to this address in your browser: [localhost:4200](http://localhost:4200).

#### Backend

1. Go the the backend directory by: `cd backend`.
2. Install dependencies by: `pip install -r requirements.txt`.
3. Run the project by: `python3 application.py`.
4. You can now go to this address in your browser: [localhost:5000](http://localhost:5000).
