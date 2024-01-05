# -*- coding: utf-8 -*-
import datetime
import secrets
import uuid

from pytz import timezone
from pytz import UTC


def nowDatetimeUserTimezone(user_timezone):
    tzone = timezone(user_timezone)
    return datetime.datetime.now(tzone)


def nowDatetimeUTC():
    tzone = UTC
    now = datetime.datetime.now(tzone)
    return now


def JsonResp(data, status):
    from flask import Response
    from bson import json_util
    import json

    return Response(
        json.dumps(data, default=json_util.default),
        mimetype="application/json",
        status=status,
    )


def randID():
    randId = uuid.uuid4().hex
    return randId


def randString(length):
    randString = ""
    for _ in range(length):
        randString += secrets.choice(
            "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890"
        )

    return randString


def randStringCaps(length):
    randString = ""
    for _ in range(length):
        randString += secrets.choice("ABCDEFGHJKLMNPQRSTUVWXYZ23456789")

    return randString


def randStringNumbersOnly(length):
    randString = ""
    for _ in range(length):
        randString += secrets.choice("23456789")

    return randString


def validEmail(email):
    import re

    if (
        re.match(
            "^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$", email
        )
        != None
    ):
        return True
    else:
        return False
