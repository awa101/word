from django.urls import path
from . import views

urlpatterns = [
    path("kr", views.KrWordsList.as_view()),
    path("jp", views.JpWordList.as_view()),
    path("cn", views.CnWordList.as_view()),
    path('search', views.WordSearch.as_view()),
    path("<str:numbering>", views.WordMeaningCombine.as_view()),
    path("<str:wnum>/ex/<str:mnum>", views.ExampleDetail.as_view()),
]
