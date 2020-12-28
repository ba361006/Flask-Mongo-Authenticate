## A Flask Authentication Boilerplate.
#### *Blueprints + React + Typescript + MongoDB*

*spawned from* [*Luke Peters work here*](https://github.com/LukePeters/flask-mongo-api-boilerplate)

#### *Setup:*

```
# clone:
git clone https://github.com/Jesssullivan/Flask-Mongo-Authenticate/ && cd Flask-Mongo-Authenticate

# venv:
python3 -m venv api_venv
source api_venv/bin/activate
pip3 install -r requirements.txt

# node:
npm install

# permiss:
sudo chmod +x setup run

# configure (default values are provided too):
./setup

# have at it:
./run
```



- - -



### *Structure:*



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


- - -

*Notes:*

- Only tested on Ubuntu with GNU utilities, YMMV
- On Mac, please use GNU `sed`, see `./setup` for details

```
# MongoDB & gnu sed for Mac:
brew install gnu-sed
brew tap mongodb/brew
brew install mongodb-community@4.4
```
