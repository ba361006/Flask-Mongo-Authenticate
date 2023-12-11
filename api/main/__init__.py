from flask import Flask, request, render_template, send_file
from flask_cors import CORS
from pymongo import MongoClient
from .tools.tools import JsonResp
import os

# Import Routes
from .user.routes import user_blueprint


def create_app():
    # Flask Config
    app = Flask(__name__)
    app.config.from_pyfile("config/config.cfg")
    cors = CORS(app, resources={r"/*": {"origins": app.config["FRONTEND_DOMAIN"]}})
    app.template_folder = '.'
    # Misc Config
    os.environ["TZ"] = app.config["TIMEZONE"]

    # Database Config
    if app.config["ENVIRONMENT"] == "development":
        mongo = MongoClient(app.config["MONGO_HOSTNAME"], app.config["MONGO_PORT"])
        app.db = mongo[app.config["MONGO_APP_DATABASE"]]
    else:
        mongo = MongoClient("localhost")
        mongo[app.config["MONGO_AUTH_DATABASE"]].authenticate(app.config["MONGO_AUTH_USERNAME"],
                                                            app.config["MONGO_AUTH_PASSWORD"])
        app.db = mongo[app.config["MONGO_APP_DATABASE"]]

    # Register Blueprints
    app.register_blueprint(user_blueprint, url_prefix="/user")

    # Index Routes
    @app.route("/")
    def index():
        return JsonResp({"status": "Online"}, 200)

    return app
