## A Flask Authentication Boilerplate.

#### _Blueprints + React + Typescript + MongoDB_

_spawned from_ [_Luke Peters work here_](https://github.com/LukePeters/flask-mongo-api-boilerplate)

#### _Setup:_

```shell
# clone:
git clone https://github.com/Jesssullivan/Flask-Mongo-Authenticate/ && cd Flask-Mongo-Authenticate

(Linux)
# venv:
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r ./api/requirements.txt

# if the packages are not added into PATH, execute:
export PATH="$HOME/.local/bin:$PATH"

# to set up pre-commit hooks
pre-commit install

# node(please use npm 10.2.3):
npm install --prefix ./frontend

# permiss:
sudo chmod +x setup run

# configure (default values are provided too):
# for Linux user, turn both setup and run script from "CRLF" to "LF"
./setup

# have at it:
./run
```

_Note:_

- stop frontend app:

```shell
npx kill-port 3000
```

#### _Setup for Windows user:_

0. install MongoDB from its website
1. add mongodb path to your environment variable path
   - the default path is C:\Program Files\MongoDB\Server\<VERSION-NUMBER>\bin
2. clone the project
3. create a virtual environment `python -m venv .venv`
4. get into the virtual environment `.venv/Scripts/activate`
5. install the dependencies `pip install -r requirements.txt`
6. setup the config for Flask API and Mongo DB `./setup.ps1`
7. run the service `./run.ps1`
8. done
   > to verify you are done
   > Flask: you should see {"status": "Online"} from http://127.0.0.1:5000
   > Mongo DB: you should see the login log from http://127.0.0.1:5000/mongo

---

### _Structure:_

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

---

_Notes:_

- Only tested on Ubuntu with GNU utilities, YMMV
- On Mac, please use GNU `sed`, see `./setup` for details

```
# MongoDB & gnu sed for Mac:
brew install gnu-sed
brew tap mongodb/brew
brew install mongodb-community@4.4
```

### Docker deploy

#### Docker setup for ubuntu

Install using the apt repository
Before you install Docker Engine for the first time on a new host machine, you need to set up the Docker repository. Afterward, you can install and update Docker from the repository.

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

2. Install the Docker packages.

```shell
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose
```

3. Add user to the Docker group(run docker command without the `sudo` prefix)

```shell
sudo usermod -aG docker ${USER}
```

#### Run docker service

##### to run docker service in background

```shell
docker-compose up -d --scale app=3
```

##### to clean everything related to this project
```shell
# this will remove docker network/containers
docker-compose down

# to see every images on your device
docker images

# remove the docker image, it can remove multiple images at once by adding more <image-id>
docker image remove <image-id-1>
```

##### common docker command

```shell
# to see the running docker container
docker ps

# to see the running / exited docker container
docker ps -a

# to see the docker images
docker images

# to remove the specific docker image
docker image rm <docker-image-id>

# to remove the specific docker container
docker container remove <docker-container-id>

# to rebuild a docker container if you modify something
docker-compose up --build <service-name-in-docker-compose.yml>
```

#### MongoDB

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

> Note that at the `ulimit Considerations` stage, remember to `open files` value to 64000

_Note:_

- enter db:

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
