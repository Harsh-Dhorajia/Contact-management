# Bitespeed 

The simplest possible example of using Node.js and Docker.

## Setup

You need Node.js and Docker installed.

First change to the directory and install dependencies:

```bash
npm install
```

## Directly run

The example Node.js application is just "Hello world", you run it directly like this:

```bash
npm start
```

## Build and run using Docker

To build the Docker image:

```bash
npm run docker:build
```

To run the Docker image:

```bash
npm run docker:run
```

To see what Docker images you have locally:

```bash
npm run docker:ls
```

To see what Docker containers you have running:

```bash
npm run docker:ps
```

To stop the container:

```bash
npm run docker:stop
```