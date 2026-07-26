from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class PermissionHardeningTests(APITestCase):
	def setUp(self):
		self.user = User.objects.create_user(username='member1', password='Pass12345!')
		self.token = Token.objects.create(user=self.user)
		self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

	def test_non_staff_cannot_create_sermon(self):
		res = self.client.post('/api/sermons/', {
			'title': 'Test Sermon',
			'speaker': 'Speaker',
			'date': '2026-07-21',
			'passage': 'John 3:16',
			'category': 'Sabbath Sermons',
		}, format='json')
		self.assertEqual(res.status_code, 403)

	def test_non_staff_cannot_create_event(self):
		res = self.client.post('/api/events/', {
			'title': 'Test Event',
			'date': '2026-07-22',
			'location': 'Main Hall',
			'desc': 'Event details',
		}, format='json')
		self.assertEqual(res.status_code, 403)

	def test_non_staff_cannot_create_forum_category(self):
		res = self.client.post('/api/forum-categories/', {
			'name': 'New Category',
			'description': 'Should be staff-only',
		}, format='json')
		self.assertEqual(res.status_code, 403)

	def test_non_staff_cannot_create_hymn_book(self):
		res = self.client.post('/api/hymn-books/', {
			'title': 'Managed Hymnal',
			'abbreviation': 'MH',
			'publisher': 'Church',
			'year': 2026,
			'description': 'Desc',
			'hymn_count': 1,
			'is_featured': False,
		}, format='json')
		self.assertEqual(res.status_code, 403)
