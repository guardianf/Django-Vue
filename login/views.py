from django.http import JsonResponse
from http import HTTPStatus
from django.views import View;
from django_vue import settings

class Login(View):
  def post(self, request, *args, **kwargs):
    username = request.POST["username"]
    password = request.POST["password"]
    captcha = request.POST["captcha"]
    session_captcha = request.session.get(settings.SESSION_CAPTCHA)
    print(captcha, session_captcha)
    ret = {}
    if username == "yubin" and password == "1" and captcha == session_captcha:
      ret = {
        "code": HTTPStatus.OK,
        "data": True,
      }
    elif captcha != session_captcha:
      ret = {
        "code": HTTPStatus.FORBIDDEN,
        "data": False,
        "msg": "captcha error",
      }
    elif username != "yubin" or password != "1":
      ret = {
        "code": HTTPStatus.UNAUTHORIZED,
        "data": False,
        "msg": "username or password error"
      }
    else:
      ret = {
        "code": HTTPStatus.BAD_REQUEST,
        "data": None,
        "msg": "not authorized"
      }
    return JsonResponse(ret)