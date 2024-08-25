# compressor/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('compress/', views.compress_pdf, name='compress_pdf'),
    path('compressJava/', views.compress_JAVA),
    path('compressJavapopup/', views.compress_javapopup),
]
