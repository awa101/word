from django.contrib import admin
from . import models

# KR
@admin.register(models.KrWord)
class KrWordAdmin(admin.ModelAdmin):
    list_display = ["word", "hangeul", "numbering"]
    ordering = ["id"]

@admin.register(models.KrMeaning)
class KrMeaningAdmin(admin.ModelAdmin):
    list_display = ["meaning", "word", "order"]
    ordering = ["word", "order"]

@admin.register(models.KrExample)
class KrExampleAdmin(admin.ModelAdmin):
    list_display = ["example", "word", "meaning", "order"]
    ordering = ["word", "meaning", "order"]


# JP
@admin.register(models.JpWord)
class JpWordAdmin(admin.ModelAdmin):
    list_display = ["word", "kana", "numbering"]
    ordering = ["id"]

@admin.register(models.JpMeaning)
class JpMeaningAdmin(admin.ModelAdmin):
    list_display = ["meaning", "word", "order"]
    ordering = ["word", "order"]

@admin.register(models.JpExample)
class JpExampleAdmin(admin.ModelAdmin):
    list_display = ["example", "word", "meaning", "order"]
    ordering = ["word", "meaning", "order"]



# CN
@admin.register(models.CnWord)
class CnWordAdmin(admin.ModelAdmin):
    list_display = ["word", "sound", "numbering"]
    ordering = ["id"]

@admin.register(models.CnMeaning)
class CnMeaningAdmin(admin.ModelAdmin):
    list_display = ["meaning", "word", "order"]
    ordering = ["word", "order"]

@admin.register(models.CnExample)
class CnExampleAdmin(admin.ModelAdmin):
    list_display = ["example", "word", "meaning", "order"]
    ordering = ["word", "meaning", "order"]
