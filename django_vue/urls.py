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
from django.urls import path

from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('global/', views.parent, name='global'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('home/', views.ListView.as_view(), name='home', kwargs={"name": "test"}),
    path('robot/list_arm/', views.ListView.as_view(), name='arm'),
    path('robot/list_box', views.ListView.as_view(), name='box'),
    path('robot/list_teaches', views.ListView.as_view(), name='teaches'),

    path('test/', views.test, name='test'),
]
