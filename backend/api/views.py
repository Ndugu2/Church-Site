from rest_framework import viewsets
from .models import Sermon, Event, PrayerRequest, BibleStudy, Donation, Project
from .serializers import (
    SermonSerializer,
    EventSerializer,
    PrayerRequestSerializer,
    BibleStudySerializer,
    DonationSerializer,
    ProjectSerializer
)

class SermonViewSet(viewsets.ModelViewSet):
    queryset = Sermon.objects.all().order_by('-date')
    serializer_class = SermonSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer

class PrayerRequestViewSet(viewsets.ModelViewSet):
    queryset = PrayerRequest.objects.all().order_by('-created_at')
    serializer_class = PrayerRequestSerializer

class BibleStudyViewSet(viewsets.ModelViewSet):
    queryset = BibleStudy.objects.all().order_by('-created_at')
    serializer_class = BibleStudySerializer

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all().order_by('-created_at')
    serializer_class = DonationSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({
                "success": True,
                "username": user.username,
                "email": user.email
            }, status=status.HTTP_200_OK)
        return Response({
            "success": False,
            "error": "Invalid username or password"
        }, status=status.HTTP_400_BAD_REQUEST)
