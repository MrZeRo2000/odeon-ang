CALL termsetup.bat
RMDIR /S /Q dist\odeon-ang
ng build --configuration production --base-href=/odeon-ang/
