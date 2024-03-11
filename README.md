# A Flask Authentication Boilerplate.
- Development:
  - React + Typescript + MongoDB

- Production:
  - React + Typescript + MongoDB + Docker

## Overview
- [APP versions](#app-versions)
- [Structure](#structure)
- [Development Setup](#development-setup)
- [Docker setup for production on Ubuntu](#docker-setup-for-production-on-ubuntu)
- [Common Docker command](#common-docker-command)
- [Common MongoDB command](#common-mongodb-command)

_spawned from_ [_Luke Peters work here_](https://github.com/LukePeters/flask-mongo-api-boilerplate)

## APP Versions
| App Name | Version |
|----|----|
|Ubuntu|20.04.6 LTS|
|Docker|24.0.7|
|Python|3.12.1|
|Node|20.11.0|
|Npm|10.2.4|
|Nvm|0.35.3|
|Nginx|1.24.0|
|MongoDB|7.0.5|
|Mongosh|2.1.1|

## Structure
```console
├── api
  ├── main
    ├── auth
      └── token authentication methods
    ├── config
      └── the ./setup script populates a new config.cfg file for Flask,
          using the ##FIELDS## provided in config.cfg.sample
    ├── tools
      └── utilities for date/time, expression matching, the like
    └── user
      └── models.py defines the User() class
      └── routes.py implements User() methods api/routes as a blueprint
          (registered at /user/)
├── public
  └── all hot reloading and whatnot is done from react-scripts at index.html
└── src
  └── insert client-side source here, hack away  xD
      the thinking is one deal with compiling & serving production code elsewhere
```

## Development Setup
> This project works on Ubuntu 20.04.6 LTS. For Windows users, please run this project on WSL. You may use this command `wsl --install -d Ubuntu-20.04` on your PowerShell to install the Ubuntu 20.04.6 LTS

- clone the project
  - `git clone https://github.com/jack20951948/Flask-Mongo-Authenticate.git`
- move to project directory
  - `cd Flask-Mongo-Authenticate`
- install Python 3.12.1, this step depends on OS you may find any resoucre on the internet achieve this
- create python virtual environment
  - `python3.12 -m venv .venv`
- get into the virtual environment
  - `source ./.venv/bin/activate`
- install the dependencies
  - `pip3 install -r ./api/requirements.txt`
- add packages to PATH
  - `export PATH="$HOME/.local/bin:$PATH"`
- install pre-commit
  - `pre-commit install`
- install nvm 0.35.3
  - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
- reopen your terminal
- install node 20.11.0 via nvm
  - `nvm install 20.11.0`
- take 20.11.0 as node version
  - `nvm use 20.11.0`
- install frontend dependencies
  - `cd frontend`
  - `npm install`
- give permission for setup / run script
  - `cd ..`
  - `sudo chmod +x setup run`
- modify end of line sequence style for both **run** and **setup** script
  - select **LF**
- install MongoDB 7.0.5 and Mongosh 2.1.1
  - note that at the **Install the MongoDB packages** stage, you may select the version specificly to **MongoDB 7.0.5** and **Mongosh 2.1.1**
  - note that at the  **ulimit Considerations** stage, you may assign `open files` value to 64000
  - ref [here](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
- run **setup** script, it only needs to run once while getting started
  - `./setup`
- run **run** script to start developing
  - `./run`
- confirm frontend is working
  - go to [localhost:3000](http://localhost:3000/) and you should see the login page
- confirm backend is working
  - go to [localhost:5000](http://localhost:5000/) and you should see the json response
- confirm mongoDB is working
  - go to [localhost:5000/mongo](http://localhost:5000/mongo) and you should see the login message from your mongoDB


## Docker setup for production on Ubuntu
1. Set up Docker's apt repository.
    ```shell
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    ```

2. Install the Docker version 24.0.7
    ```shell
    sudo apt-get install docker-ce=5:24.0.7-1~ubuntu.20.04~focal docker-ce-cli=5:24.0.7-1~ubuntu.20.04~focal containerd.io docker-buildx-plugin docker-compose-plugin docker-compose
    ```

3. Add user to the Docker group(run docker command without the `sudo` prefix)
    ```shell
    sudo usermod -aG docker ${USER}
    ```

---


## Common Docker command
- run docker containers in background
    ```shell
    # execute this command at the same directory as docker-compose.yml
    docker-compose up -d --scale backend=3
    ```

- remove docker images / containers / networks / volume from this project
    ```shell
    # execute this command at the same directory as docker-compose.yml
    docker-compose down --rmi all -v
    ```

- remove docker containers / networks
    ```shell
    # execute this command at the same directory as docker-compose.yml
    docker-compose down
    ```

- list every image on your device
    ```shell
    docker images
    ```

- remove the docker image, it can remove multiple images at once by adding more `<image-id>`
    ```shell
    docker image remove <image-id>
    ```

- remove the specific docker container, it can remove multiple images at once by adding more `<docker-container-id>`
    ```shell
    docker container remove <docker-container-id>
    ```

- list the running docker container
    ```shell
    docker ps
    ```

- list the running / exited docker container
    ```shell
    docker ps -a
    ```

## Common MongoDB command
- enter db in terminal:
    ```shell
    mongosh
    ```

- switch db (ex: new-app)
    ```shell
    use new-app
    ```

- switch find documents from collection (ex: users collection)
    ```shell
    db.users.find()
    ```

- empty collection (ex: users collection)
    ```shell
    db.users.deleteMany({})
    ```