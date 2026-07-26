from django.contrib import admin
from .models import Sermon, Event, PrayerRequest, BibleStudy, Donation


@admin.register(Sermon)
class SermonAdmin(admin.ModelAdmin):
    list_display = ('title', 'speaker', 'date', 'category')
    list_filter = ('category',)
    search_fields = ('title', 'speaker', 'passage')
    ordering = ('-date',)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location')
    search_fields = ('title', 'location')
    ordering = ('date',)


@admin.register(PrayerRequest)
class PrayerRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'confidential', 'created_at')
    list_filter = ('confidential',)
    search_fields = ('name', 'content')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)


@admin.register(BibleStudy)
class BibleStudyAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'country', 'course', 'status', 'created_at')
    list_filter = ('status', 'course')
    search_fields = ('name', 'email', 'country')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('amount', 'fund', 'method', 'status', 'created_at')
    list_filter = ('fund', 'method')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
