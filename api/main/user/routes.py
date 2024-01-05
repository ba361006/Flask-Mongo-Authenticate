# -*- coding: utf-8 -*-
from flask import Blueprint

from ..auth.auth import token_required
from .models import User


user_blueprint = Blueprint("user", __name__)


@user_blueprint.route("/", methods=["GET"])
@token_required
def get():
    return User().get()


@user_blueprint.route("/auth/", methods=["GET"])
def get_auth():
    return User().get_auth()


@user_blueprint.route("/login/", methods=["POST"])
def login():
    return User().login()


@user_blueprint.route("/logout/", methods=["GET"])
def logout():
    return User().logout()


@user_blueprint.route("/", methods=["POST"])
def add():
    return User().add()
