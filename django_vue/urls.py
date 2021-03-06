"""django_vue URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
  https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
  1. Add an import:  from my_app import views
  2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
  1. Add an import:  from other_app.views import Home
  2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
  1. Import the include() function: from django.urls import include, path
  2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.conf.urls import url
from django.urls import (path, include, )

from login import rest_url as rest_url_login
from robot import rest_url as rest_url_robot
import django_vue.rest_url as rest_url_common
from django_vue import views

urlpatterns = [
  # path('admin/', admin.site.urls),
  path('global/', views.parent, name='global'),
  path('login/', views.login, name='login'),
  path('logout/', views.logout, name='logout'),
  path('home/', views.HomeView.as_view(), name='home'),
  path('robot/arm/', views.ArmView.as_view(), name='arm'),
  path('robot/joint/', views.HomeView.as_view(), name='box'),
  path('robot/teach/', views.HomeView.as_view(), name='teaches'),

  path('test/', views.test, name='test'),

  # rest api
  path("api/v1/", include(rest_url_common), name="common"),
  path('api/v1/', include(rest_url_login), name="login"),
  path('api/v1/robot/', include(rest_url_robot), name="robot"),
]
