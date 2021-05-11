from rest_framework import routers
from robot import views
from django.urls import path

arm_actions = views.Arm.as_view(actions = {
  "get": "list",
})

urlpatterns = [
  path("arm/", arm_actions, name="arm"),
]

router = routers.DefaultRouter()
router.urls.extend(urlpatterns)