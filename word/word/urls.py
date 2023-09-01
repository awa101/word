from django.urls import path
from . import views

urlpatterns = [
    path("kr", views.KrWordsList.as_view()),
    path("jp", views.JpWordList.as_view()),
    path("cn", views.CnWordList.as_view()),
    path("kr/<str:numbering>", views.KrWordMeaning.as_view()),
    path("kr/<str:numbering>/ex", views.KrWordExample.as_view())
]
