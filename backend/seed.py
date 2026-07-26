import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'church_backend.settings')
django.setup()

from api.models import Sermon, Event
from datetime import date

def seed_data():
    print("Seeding database...")
    # Add initial sermons
    if Sermon.objects.count() == 0:
        Sermon.objects.create(
            title="The Sanctuary & The Sanctuary Guard",
            speaker="Pastor John Mwangi",
            date=date(2026, 7, 11),
            passage="Hebrews 8:1-5",
            category="Sabbath Sermons"
        )
        Sermon.objects.create(
            title="Finding Rest in a Restless Campus",
            speaker="Pastor Sarah Namubiru",
            date=date(2026, 7, 4),
            passage="Matthew 11:28-30",
            category="Sabbath Sermons"
        )
        Sermon.objects.create(
            title="Unshakable Faith in Prophetic Times",
            speaker="Elder Caleb Ndikumana",
            date=date(2026, 6, 20),
            passage="Daniel 2:44",
            category="Week of Prayer"
        )
        Sermon.objects.create(
            title="Stepping into the Waters of Covenant",
            speaker="Pastor John Mwangi",
            date=date(2026, 6, 13),
            passage="Romans 6:3-4",
            category="Bible Studies"
        )
        print("Sermons seeded successfully.")
    else:
        print("Sermons already exist.")

    # Add initial events
    if Event.objects.count() == 0:
        Event.objects.create(
            title="Bugema University Camp Meeting",
            date=date(2026, 8, 15),
            location="Main Assembly Pavilion",
            desc="A week-long spiritual feast under the theme 'Behold, He Comes!' featuring international speakers, choirs, and community services."
        )
        Event.objects.create(
            title="Youth Week of Devotion",
            date=date(2026, 9, 5),
            location="SIC Chapel",
            desc="Interactive evenings centered on student mental wellness, career integrity, and spiritual stewardship."
        )
        Event.objects.create(
            title="Choir Grand Concert",
            date=date(2026, 9, 26),
            location="University Auditorium",
            desc="A praise celebration representing choral music from 10 different countries."
        )
        print("Events seeded successfully.")
    else:
        print("Events already exist.")

if __name__ == '__main__':
    seed_data()
