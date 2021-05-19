from django.http import JsonResponse
from http import HTTPStatus
from django.views import View;
from django_vue import settings
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

class Arm(View):

  def get(self, request, *args, **kwargs):
    size = 10
    count = 100
    page = 1
    page = int(request.GET.get("page"))
    data = []
    for i in range(size):
      data.append({
        "name": "name-" + str(page * size + i + 1),
        "serial_number": "sn-" + str(page * size + i + 1),
        "state_name": ("success" if i % 3 == 1 else "failure"),
        "type_name": ("type 1" if i % 3 == 0 else "type 2" if i % 3 == 1 else "type 3"),
        "customer_id": i % 3 + 1,
      })
    ret = {
      "code": HTTPStatus.OK,
      "data": {
        "results": data,
        "count": count,
        "page_size": page
      },
      "msg": "get page " + str(page + 1) + " data",
    }
    return JsonResponse(ret)

class DeviceStates(View):

  def get(self, request, *args, **kwargs):
    data = [
      ["All", "all"],
      ["Enabled", "enabled"],
      ["Disabled", "disabled"],
      ["Error", "error"]
    ]
    ret = {
      "code": HTTPStatus.OK,
      "data": data,
      "msg": "get device states"
    }
    return JsonResponse(ret)
