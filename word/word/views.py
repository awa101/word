from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import KrWord, JpWord, CnWord
from . import serializers


class KrWordsList(APIView):
    def get(self, request):
        all_krwords = KrWord.objects.all()
        serializer = serializers.KrWordSerializer(all_krwords, many=True)
        return Response(serializer.data)
    

class JpWordList(APIView):
    def get(self, request):
        all_jpwords = JpWord.objects.all()
        serializer = serializers.JpWordSerializer(all_jpwords, many=True)
        return Response(serializer.data)
    
class CnWordList(APIView):
    def get(self, request):
        all_cnwords = CnWord.objects.all()
        serializer = serializers.CnWordSerializer(all_cnwords, many=True)
        return Response(serializer.data)



class KrWordMeaning(APIView):
    def get(self, requests, numbering):
        krword = KrWord.objects.get(numbering=numbering)
        # serializer = serializers.KrWordMeaningSerializer(krword)
        serializer = serializers.KrCombinedMeaningSerializer(krword)
        return Response(serializer.data)
    

class KrWordExample(APIView):
    def get(self, requests, numbering):
        krword = KrWord.objects.get(numbering=numbering)
        serializer = serializers.KrWordExampleSerializer(krword)
        return Response(serializer.data)
    







