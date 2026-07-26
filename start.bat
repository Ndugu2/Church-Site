@echo off
REM Quick Start Script for Church Site Project (Windows)

echo.
echo ================================================
echo Church Site - Complete Feature Implementation
echo ================================================
echo.

REM Backend Setup
echo Setting up Backend...
cd backend

echo Installing Python dependencies...
python -m pip install -r requirements.txt --quiet

echo Applying database migrations...
python manage.py migrate --noinput

echo.
echo To create an admin account, run:
echo    python manage.py createsuperuser
echo.

echo Starting Django development server...
echo Backend will run on: http://127.0.0.1:8000
echo Admin panel: http://127.0.0.1:8000/admin
echo.

REM Start Django in new window
start cmd /k "cd backend && python manage.py runserver"

timeout /t 3 /nobreak

REM Frontend Setup
cd ..\frontend

echo Setting up Frontend...
echo Installing Node dependencies...
call npm install --silent

echo.
echo Starting React development server...
echo Frontend will run on: http://localhost:5173
echo.

call npm run dev

pause
