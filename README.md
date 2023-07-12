# Pendulum simulation project

This project is an implementation of a simple pendulum running in a web browser. Each pendulum's current position is calculated by a dedicated server that runs the physics simulation continuously. A separate UI process displays the pendulum in the web browser after the pendulum's configuration is set in the start menu. Simulation controls are also available in the UI to start, pause or stop the pendulum.

## Install

First, make sure Node.js is installed on your computer by running the following command:

    node -v
    npm -v

If node is not installed, install it before moving on to the following steps.

Clone the repository and navigate to the root directory of the project:

    git clone https://github.com/Philipp0n/pendulum.git
    cd pendulum

Install the project dependencies in both the `pendulum-ui` and the `pendulum-simulation` subdirectories:

    cd pendulum-ui
    npm ci
    cd ../pendulum-simulation
    npm ci

## Run the app

### Servers

On five seperate terminals run the following commands

    cd pendulum-simulation
    node index.js --port <number>

Port numbers must match those defined in the ui application's start menu

### UI

    cd pendulum-ui
    node index.js

Now open your browser and navigate to the url : http://localhost:3000/

# REST API

## Get the pendulum's latest coordinates

### Request

`GET /coordinates/`

    curl -i -H 'Accept: application/json' http://localhost:<port>/coordinates/

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: http://localhost:3000
    Vary: Origin
    Content-Type: application/json; charset=utf-8
    Content-Length: 19
    ETag: W/"13-wK4yjKYQRZYu+D6GDMD6CekcSEU"
    Date: Wed, 12 Jul 2023 15:43:23 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"bobX":0,"bobY":0}

## Initialize the simulation

### Request

`POST /initialization/`

    curl -i -H 'Accept: application/json' -d '{"angle": 0, "mass": 1, "stringLength": 1, "pivotX": 0, "pivotY": 0}' http://localhost:<port>/initialization/

### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Access-Control-Allow-Origin: http://localhost:3000
    Vary: Origin
    ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
    Date: Wed, 12 Jul 2023 15:54:39 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

## Start/pause the simulation

### Request

`POST /control/`

    curl -i -H 'Accept: application/json' -d '{"value": false}' http://localhost:<port>/control/

### Response

    HTTP/1.1 204 No Content
    X-Powered-By: Express
    Access-Control-Allow-Origin: http://localhost:3000
    Vary: Origin
    ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
    Date: Wed, 12 Jul 2023 16:03:18 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5