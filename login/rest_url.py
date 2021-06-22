from rest_framework import routers
from login import views
from django.urls import path

urlpatterns = [
  path("login/", views.Login.as_view(), name="login"),
  path("user/info/", views.Info.as_view(), name="user-info"),
]

router = routers.DefaultRouter()
router.urls.extend(urlpatterns)