from rest_framework import routers
from django_vue import views
from django.urls import path

urlpatterns = [
  path("captcha/", views.CaptchaAPIView.as_view(), name="captcha"),
  path("customer/", views.Customer.as_view(), name="customer"),
]

router = routers.DefaultRouter()
router.urls.extend(urlpatterns)