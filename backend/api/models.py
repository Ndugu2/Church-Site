from django.db import models

class Sermon(models.Model):
    title = models.CharField(max_length=255)
    speaker = models.CharField(max_length=255)
    date = models.DateField()
    passage = models.CharField(max_length=255)
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Event(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    location = models.CharField(max_length=255)
    desc = models.TextField()

    def __str__(self):
        return self.title

class PrayerRequest(models.Model):
    name = models.CharField(max_length=255, blank=True, default="Anonymous")
    content = models.TextField()
    confidential = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prayer from {self.name}"

class BibleStudy(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    course = models.CharField(max_length=255)
    status = models.CharField(max_length=100, default="Pending Guide Assignment")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.course}"

class Donation(models.Model):
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    fund = models.CharField(max_length=100)
    method = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default="Completed Stewardship")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.amount} UGX for {self.fund}"

class Project(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    desc = models.TextField()
    goal_amount = models.DecimalField(max_digits=12, decimal_places=2)
    raised_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    image_url = models.CharField(max_length=500, blank=True)
    status = models.CharField(max_length=100, default="Active")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
