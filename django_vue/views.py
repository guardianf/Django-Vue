from django.http import HttpResponse;
from django.shortcuts import render
from django.views import View
from django_vue.captcha import CaptchaUtil
from django_vue import settings

def parent(request):
  return render(request, 'global.html')

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

class ListView(View):
  def get(self, request, *args, **kwargs):
    print(args)
    return render(request, "home.html")

class CaptchaAPIView(View):
  def get(self, request, *args, **kwargs):
    captcha = CaptchaUtil()
    image_buffer, random_codes = captcha.get_captcha_image_buffer()
    request.session[settings.SESSION_CAPTCHA] = random_codes
    print(random_codes, request.session.get(settings.SESSION_CAPTCHA))
    return HttpResponse(image_buffer.getvalue(), content_type="image/png")
