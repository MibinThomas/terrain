@echo off
echo Cleaning up old Vite project files...
rmdir /s /q src
rmdir /s /q public
del /q index.html
del /q vite.config.ts
del /q eslint.config.js
echo Cleanup complete. You can now run "npm install" followed by "npm run dev" to start the Next.js app.
pause
