from django.http import JsonResponse
from http import HTTPStatus
from django.views import View;

class Login(View):
  def post(self, request, *args, **kwargs):
    username = request.POST["username"]
    password = request.POST["password"]
    ret = {}
    if username == "yubin.fu" and password == "111111":
      ret = {
        "code": HTTPStatus.OK,
        "data": True,
      }
    else:
      ret = {
        "code": HTTPStatus.UNAUTHORIZED,
        "data": None,
      }
    return JsonResponse(ret)