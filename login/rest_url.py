from rest_framework import routers
from login import views
from django.urls import path

urlpatterns = [
  path("login/", views.Login.as_view(), name="login"),
]

router = routers.DefaultRouter()
router.urls.extend(urlpatterns)