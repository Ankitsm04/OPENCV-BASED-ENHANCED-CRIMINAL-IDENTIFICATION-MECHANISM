from django.urls import path
from .views import upload_dataset, train, predict

urlpatterns = [
    path("upload-dataset/", upload_dataset),
    path("train/", train),
    path("predict/", predict),
]