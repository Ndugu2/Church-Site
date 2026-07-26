from rest_framework import viewsets
from .models import Sermon, Event, PrayerRequest, BibleStudy, Donation
from .serializers import (
    SermonSerializer,
    EventSerializer,
    PrayerRequestSerializer,
    BibleStudySerializer,
    DonationSerializer
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
