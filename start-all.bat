@echo off
echo Starting Startup India Incubation Platform...

REM Start backend server
echo Starting backend server...
cd backend
start "Backend Server" cmd /c "npm run dev"
cd ..

REM Start web frontend
echo Starting web frontend...
cd apps\web
start "Web Frontend" cmd /c "npm run dev"
cd ..\..

echo All services started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause