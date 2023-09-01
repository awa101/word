from rest_framework import serializers
from .models import KrWord, KrMeaning, KrExample, JpWord, JpExample, JpMeaning, CnWord, CnMeaning, CnExample


# simple serializers 
# KR
class KrWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = KrWord
        fields = '__all__'


class KrMeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = KrMeaning
        fields = ['meaning', 'order', 'numbering']


class KrExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = KrExample
        fields = ['example', 'order', 'numbering']


# JP
class JpWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = JpWord
        fields = '__all__'

class JpMeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = JpMeaning
        fields = ['meaning', 'order', 'numbering']


class JpExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JpExample
        fields = ['example', 'order', 'numbering']

# CN
class CnWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CnWord
        fields = '__all__'

class CnMeaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = CnMeaning
        fields = ['meaning', 'order', 'numbering']


class CnExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CnExample
        fields = ['example', 'order', 'numbering']




# word + meanings
class KrWordMeaningSerializer(serializers.ModelSerializer):
    krmeanings = serializers.SerializerMethodField()
    jpmeanings = serializers.SerializerMethodField()
    cnmeanings = serializers.SerializerMethodField()

    class Meta:
        model = KrWord
        fields = ['word', 'hangeul', 'sound', 'numbering', 'krmeanings', 'jpmeanings', 'cnmeanings']

    def get_krmeanings(self, obj):
        num = obj.numbering
        krword = KrWord.objects.get(numbering=num)
        krmeaning = krword.krmeaning_set.all()
        serialier = KrMeaningSerializer(krmeaning, many=True)
        return serialier.data
    
    def get_jpmeanings(self, obj):
        num = obj.numbering
        jpword = JpWord.objects.get(numbering=num)
        jpmeaning = jpword.jpmeaning_set.all()
        serializer = JpMeaningSerializer(jpmeaning, many=True)
        return serializer.data
    
    def get_cnmeanings(self, obj):
        num = obj.numbering
        cnword = CnWord.objects.get(numbering=num)
        cnmeaning = cnword.cnmeaning_set.all()
        serializer = CnMeaningSerializer(cnmeaning, many=True)
        return serializer.data
    

# just tried word + mixed meanings
class KrCombinedMeaningSerializer(serializers.ModelSerializer):
    combined_meanings = serializers.SerializerMethodField()

    class Meta:
        model = KrWord
        fields = ['word', 'hangeul', 'sound', 'numbering', 'combined_meanings']

    def get_combined_meanings(self, obj):
        num = obj.numbering

        krword = KrWord.objects.get(numbering=num)
        krmeaning = krword.krmeaning_set.all()
        krserializer = KrMeaningSerializer(krmeaning, many=True)

        jpword = JpWord.objects.get(numbering=num)
        jpmeaning = jpword.jpmeaning_set.all()
        jpserializer = JpMeaningSerializer(jpmeaning, many=True)

        cnword = CnWord.objects.get(numbering=num)
        cnmeaning = cnword.cnmeaning_set.all()
        cnserializer = CnMeaningSerializer(cnmeaning, many=True)

        combined = []
        for i in range(len(krmeaning)):
            combined.append(krserializer.data[i])
            combined.append(jpserializer.data[i])
            combined.append(cnserializer.data[i])
            
        return combined


# word + meanings + examples
class KrWordExampleSerializer(serializers.ModelSerializer):
    meanings = serializers.SerializerMethodField()

    class Meta:
        model = KrWord
        fields = ['word', 'hangeul', 'sound', 'numbering', 'meanings']

    def get_meanings(self, obj): # 포함할 때
        meanings = KrMeaning.objects.filter(word=obj)
        return KrMeaningExampleSerializer(meanings, many=True).data


# meanings + examples for KrWordExampleSerializer
class KrMeaningExampleSerializer(serializers.ModelSerializer):
    examples = serializers.SerializerMethodField()

    class Meta:
        model = KrMeaning
        fields = ['word', 'meaning', 'meaning_numbering', 'numbering', 'examples']

    def get_examples(self, obj):
        examples = KrExample.objects.filter(meaning=obj)
        return KrExampleSerializer(examples, many=True).data







