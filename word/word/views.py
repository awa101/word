from django.shortcuts import render
from config.settings import PAGE_SIZE

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .models import KrWord, KrMeaning, KrExample, JpWord, JpExample, JpMeaning, CnWord, CnMeaning, CnExample
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

    

class WordMeaningCombine(APIView):
    def get(self, request, numbering):
        print(numbering)

        krword = KrWord.objects.get(numbering=numbering)
        jpword = JpWord.objects.get(numbering=numbering)
        cnword = CnWord.objects.get(numbering=numbering)

        krmeaning = KrMeaning.objects.filter(word=numbering)
        jpmeaning = JpMeaning.objects.filter(word=numbering)
        cnmeaning = CnMeaning.objects.filter(word=numbering)

        m_numbering = []
        for kr in krmeaning:
            m_numbering.append(kr.numbering)

        serializer = serializers.ComSerializer({
            'krword': krword,
            'jpword': jpword,
            'cnword': cnword,
            'krmeaning': krmeaning,
            'jpmeaning': jpmeaning,
            'cnmeaning': cnmeaning,
        })
        return Response(serializer.data)
    

class ExampleDetail(APIView):
    def get(self, request, wnum, mnum):

        krexample = KrExample.objects.filter(meaning=mnum)
        jpexample = JpExample.objects.filter(meaning=mnum)
        cnexample = CnExample.objects.filter(meaning=mnum)


        serializer = serializers.ComExSerializer({
            'krexample': krexample,
            'jpexample': jpexample,
            'cnexample': cnexample,
        })
        return Response(serializer.data)




class WordSearch(APIView):

    def search_and_serialize(self, model, field_name, query, serializer, is_icontains=False, seen_word_ids=set()):
        if is_icontains:
            field_name += "__icontains"
        objs = model.objects.filter(**{field_name: query})
        serialized_data = []
        if objs.exists():
            for obj in objs:
                if model in [KrMeaning, KrExample]:
                    word = obj.word
                    if word.id not in seen_word_ids:
                        serialized_data.append(serializer(word).data)
                        seen_word_ids.add(word.id)
                else:
                    if obj.id not in seen_word_ids:
                        serialized_data.append(serializer(obj).data)
                        seen_word_ids.add(obj.id)
        return serialized_data

    def get(self, request):
        query = request.GET.get('query', '')
        results = []
        seen_word_ids = set()  # 중복방지, id 저장 set

        # KrWord 
        results.extend(self.search_and_serialize(KrWord, "hangeul", query, serializers.KrWordSerializer, seen_word_ids=seen_word_ids))
        # KrMeaning 
        results.extend(self.search_and_serialize(KrMeaning, "meaning", query, serializers.KrWordSerializer, True, seen_word_ids=seen_word_ids))
        # KrExample 
        results.extend(self.search_and_serialize(KrExample, "example", query, serializers.KrWordSerializer, True, seen_word_ids=seen_word_ids))
        # JpWord (kana)
        results.extend(self.search_and_serialize(JpWord, "kana", query, serializers.JpWordSerializer, seen_word_ids=seen_word_ids))
        # JpWord (word)
        results.extend(self.search_and_serialize(JpWord, "word", query, serializers.JpWordSerializer, seen_word_ids=seen_word_ids))
        # CnWord 
        results.extend(self.search_and_serialize(CnWord, "word", query, serializers.CnWordSerializer, seen_word_ids=seen_word_ids))

        results = sorted(results, key=lambda x: int(x['numbering']))
        print(results)
        return Response(results)

        


'''
class KrWordMeaning(APIView):
    def get_object(self, numbering):
        try:
            return KrWord.objects.get(numbering=numbering)
        except KrWord.DoesNotExist:
            raise NotFound

    def get(self, request, numbering):
        krword = self.get_object(numbering)
        serializer = serializers.KrCombinedMeaningSerializer(krword)
        return Response(serializer.data)
    

class KrWordExample(APIView):
    def get_object(self, numbering):
        try:
            return KrWord.objects.get(numbering=numbering)
        except KrWord.DoesNotExist:
            raise NotFound
        
    def get(self, request, numbering):
        krword = self.get_object(numbering)
        serializer = serializers.KrWordExampleSerializer(krword)
        return Response(serializer.data)
 '''
