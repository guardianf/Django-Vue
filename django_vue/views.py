from django.http import HttpResponse;
from django.shortcuts import render
from django.views import View

def parent(request):
    return render(request, 'global.html');

def login(request):
    return render(request, 'login.html')

def home(request):
    return render(request, 'home.html')

def arm(request):
    return render(request, 'home.html')

def password_reset(request):
    return render(request, 'home.html')

def logout(request):
    return render(request, 'login.html')

def test(request):
    return render(request, 'test.html')

def index(request):
    return render(request, 'index.html')

class ListView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "home.html")
