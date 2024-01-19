# -*- coding: utf-8 -*-
import os
import socket

from flask import Flask
from flask import render_template
from flask import request
from flask import send_file
from flask_cors import CORS
from pymongo import MongoClient

from .tools.tools import JsonResp
from .user.routes import user_blueprint

# Import Routes


def create_app():
    # Flask Config
    app = Flask(__name__)
    app.config.from_pyfile("config/config.cfg")
    # cors = CORS(
    #     app, resources={r"/*": {"origins": "http://localhost:3000"}}
    # )  # TODO: for prod
    cors = CORS(
        app, resources={r"/*": {"origins": app.config["FRONTEND_DOMAIN"]}}
    )  # TODO: for dev
    app.template_folder = "."
    # Misc Config
    os.environ["TZ"] = app.config["TIMEZONE"]

    # Database Config
    if app.config["ENVIRONMENT"] == "development":
        # mongo = MongoClient("host.docker.internal", 27017) # TODO: for prod
        mongo = MongoClient(
            app.config["MONGO_HOSTNAME"], app.config["MONGO_PORT"]
        )  # TODO: for dev
        app.db = mongo[app.config["MONGO_APP_DATABASE"]]
    else:
        mongo = MongoClient("localhost")
        mongo[app.config["MONGO_AUTH_DATABASE"]].authenticate(
            app.config["MONGO_AUTH_USERNAME"], app.config["MONGO_AUTH_PASSWORD"]
        )
        app.db = mongo[app.config["MONGO_APP_DATABASE"]]

    # Register Blueprints
    app.register_blueprint(user_blueprint, url_prefix="/user")

    # Index Routes
    @app.route("/")
    def index():
        return JsonResp({"status": "Online", "Container ID": socket.gethostname()}, 200)

    # MongoDB connection check
    @app.route("/mongo")
    def verfiy_mongo_connection():
        db = mongo["local"]
        collection = db["startup_log"]
        return JsonResp({"status": collection.find_one()}, 200)

    return app
