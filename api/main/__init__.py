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
    cors = CORS(app, resources={r"/*": {"origins": app.config["FRONTEND_DOMAIN"]}})

    app.template_folder = "."
    # Misc Config
    os.environ["TZ"] = app.config["TIMEZONE"]

    # Database Config
    if app.config["ENVIRONMENT"] == "development":
        mongo_client_host = "mongodb://{hostname}:{port}/{database}".format(
            hostname=app.config["MONGO_HOSTNAME"],
            port=app.config["MONGO_PORT"],
            database=app.config["MONGO_APP_DATABASE"],
        )
        mongo = MongoClient(mongo_client_host)
        app.db = mongo[app.config["MONGO_APP_DATABASE"]]
    else:
        mongo_client_host = (
            "mongodb://{username}:{password}@{hostname}:{port}/{database}".format(
                username=app.config["MONGO_AUTH_USERNAME"],
                password=app.config["MONGO_AUTH_PASSWORD"],
                hostname=app.config["MONGO_HOSTNAME"],
                port=app.config["MONGO_PORT"],
                database=app.config["MONGO_APP_DATABASE"],
            )
        )
        mongo = MongoClient(mongo_client_host)
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
