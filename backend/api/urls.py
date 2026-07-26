from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SermonViewSet,
    EventViewSet,
    PrayerRequestViewSet,
    BibleStudyViewSet,
    DonationViewSet,
    ProjectViewSet,
    LoginView
)

router = DefaultRouter()
router.register(r'sermons', SermonViewSet)
router.register(r'events', EventViewSet)
router.register(r'prayers', PrayerRequestViewSet)
router.register(r'bible-studies', BibleStudyViewSet)
router.register(r'donations', DonationViewSet)
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='api-login'),
    path('', include(router.urls)),
]
