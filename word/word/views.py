from django.shortcuts import render
from config.settings import PAGE_SIZE

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .models import KrWord, JpWord, CnWord
from . import serializers


class KrWordsList(APIView):
    def get(self, request):
        try: 
            page = request.query_params.get('page', 1)
            page = int(page)
        except ValueError:
            page = 1
        start = (page - 1) * PAGE_SIZE
        end = start + PAGE_SIZE
        all_krwords = KrWord.objects.all()[start:end]
        serializer = serializers.KrWordSerializer(all_krwords, many=True)
        return Response(serializer.data)
    

class JpWordList(APIView):
    def get(self, request):
        try:
            page = request.query_params.get('page', 1)
            page = int(page)
        except ValueError:
            page = 1
        start = (page - 1) * PAGE_SIZE
        end = start + PAGE_SIZE
        all_jpwords = JpWord.objects.all()[start:end]
        serializer = serializers.JpWordSerializer(all_jpwords, many=True)
        return Response(serializer.data)
    
    
class CnWordList(APIView):
    def get(self, request):
        try:
            page = request.query_params.get('page', 1)
            page = int(page)
        except ValueError:
            page = 1
        start = (page - 1) * PAGE_SIZE
        end = start + PAGE_SIZE
        all_cnwords = CnWord.objects.all()[start:end]
        serializer = serializers.CnWordSerializer(all_cnwords, many=True)
        return Response(serializer.data)



class KrWordMeaning(APIView):
    def get_object(self, numbering):
        try:
            return KrWord.objects.get(numbering=numbering)
        except KrWord.DoesNotExist:
            raise NotFound

    def get(self, requests, numbering):
        krword = self.get_object(numbering)
        serializer = serializers.KrCombinedMeaningSerializer(krword)
        return Response(serializer.data)
    

class KrWordExample(APIView):
    def get_object(self, numbering):
        try:
            return KrWord.objects.get(numbering=numbering)
        except KrWord.DoesNotExist:
            raise NotFound
        
    def get(self, requests, numbering):
        krword = self.get_object(numbering)
        serializer = serializers.KrWordExampleSerializer(krword)
        return Response(serializer.data)








