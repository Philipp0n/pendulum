# Pendulum simulation project

## Install
First of all, make sure Node.js is installed on your computer by running the following command:

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