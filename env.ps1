$env:Path = $env:Path.Replace(";$env:Programfiles\nodejs\", "")
$env:Path += ";$env:LOCALAPPDATA\Programs\node"
Write-Host $env:Path -ForegroundColor Cyan
