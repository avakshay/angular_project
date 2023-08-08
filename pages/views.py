from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from pages.scrapper import script


def home_page_view(request):
    script.main("create")
    return HttpResponse("Hello, World!")