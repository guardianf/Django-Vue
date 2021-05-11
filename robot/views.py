from django.http import JsonResponse
from http import HTTPStatus
from django.views import View;
from django_vue import settings
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

class Arm(ModelViewSet):

  def getQuerySet():
    ret = []
    for i in range(1000):
      ret.append({
        "name": "name-" + str(i + 1)
      })
    return ret

  queryset = getQuerySet()
  serializer_class = None
  search_fields = ("name", )

  @action(methods=["get"], detail="list")
  def get(self, request, *args, **kwargs):
    size = 10
    page = request.get("page")
    data = []
    for i in range(size):
      data.append({
        "name": "name-" + str(page * size + i)
      })
    ret = {
      "code": HTTPStatus.OK,
      "data": data,
      "msg": "get page " + page + " data",
    }
    return JsonResponse(ret)