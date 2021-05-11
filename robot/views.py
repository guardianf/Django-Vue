from django.http import JsonResponse
from http import HTTPStatus
from django.views import View;
from django_vue import settings
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

class Arm(View):

  def get(self, request, *args, **kwargs):
    size = 10
    page = 1
    page = int(request.GET.get("page"))
    data = []
    for i in range(size):
      data.append({
        "name": "name-" + str(page * size + i),
        "serial_number": "sn-" + str(page * size + i),
        "state": ("success" if i / 3 == 1 else "failure"),
      })
    ret = {
      "code": HTTPStatus.OK,
      "data": data,
      "msg": "get page " + str(page) + " data",
    }
    return JsonResponse(ret)