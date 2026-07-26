#!/bin/bash
# Quick Start Script for Church Site Project

echo "================================================"
echo "Church Site - Complete Feature Implementation"
echo "================================================"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

# Install dependencies if needed
echo "✓ Installing Python dependencies..."
python -m pip install -r requirements.txt -q

# Run migrations
echo "✓ Applying database migrations..."
python manage.py migrate --noinput

# Create superuser prompt
echo ""
echo "🔑 To create an admin account, run:"
echo "   python manage.py createsuperuser"
echo ""

# Start backend server
echo "🚀 Starting Django development server..."
echo "Backend will run on: http://127.0.0.1:8000"
echo "Admin panel: http://127.0.0.1:8000/admin"
echo ""

# Start Django in background or foreground
python manage.py runserver &
BACKEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo ""

# Frontend Setup
cd ../frontend

echo "📦 Setting up Frontend..."
echo "✓ Installing Node dependencies..."
npm install -q

echo "🚀 Starting React development server..."
echo "Frontend will run on: http://localhost:5173"
echo ""

npm run dev

# Cleanup
trap "kill $BACKEND_PID" EXIT
