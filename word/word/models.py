from django.db import models

# KR
class KrWord(models.Model):
    word = models.CharField(max_length=200)
    hangeul = models.CharField(max_length=200)
    sound =  models.CharField(max_length=200)
    numbering = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.hangeul


class KrMeaning(models.Model):
    word = models.ForeignKey(KrWord, on_delete=models.CASCADE, to_field='numbering')
    meaning = models.CharField(max_length=500)
    order = models.CharField(max_length=200)
    numbering = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.meaning
    


class KrExample(models.Model):
    word = models.ForeignKey(KrWord, on_delete=models.CASCADE, to_field='numbering')
    meaning = models.ForeignKey(KrMeaning, on_delete=models.CASCADE, to_field='numbering')
    example = models.CharField(max_length=500)
    order = models.CharField(max_length=200)
    numbering = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.example




# JP
class JpWord(models.Model):
    word = models.CharField(max_length=200)
    kana = models.CharField(max_length=200)
    sound =  models.CharField(max_length=200)
    numbering = models.CharField(max_length=200, unique=True)
    
    def __str__(self):
        return self.word
    


class JpMeaning(models.Model):
    word = models.ForeignKey(JpWord, on_delete=models.CASCADE, to_field='numbering')
    meaning = models.CharField(max_length=500)
    order = models.CharField(max_length=200)
    numbering = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.meaning
    


class JpExample(models.Model):
    word = models.ForeignKey(JpWord, on_delete=models.CASCADE, to_field='numbering')
    meaning = models.ForeignKey(JpMeaning, on_delete=models.CASCADE, to_field='numbering')
    example = models.CharField(max_length=500)
    order = models.CharField(max_length=200)
    numbering = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.example




# CN
class CnWord(models.Model):
    word = models.CharField(max_length=200)
    sound =  models.CharField(max_length=200)
    numbering = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.word
    


class CnMeaning(models.Model):
    word = models.ForeignKey(CnWord, on_delete=models.CASCADE, to_field='numbering')
    meaning = models.CharField(max_length=500)
    order = models.CharField(max_length=200)
    numbering = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.meaning
    


class CnExample(models.Model):
    word = models.ForeignKey(CnWord, on_delete=models.CASCADE, to_field='numbering')
    meaning = models.ForeignKey(CnMeaning, on_delete=models.CASCADE, to_field='numbering')
    example = models.CharField(max_length=500)
    order = models.CharField(max_length=200)
    numbering = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.example
