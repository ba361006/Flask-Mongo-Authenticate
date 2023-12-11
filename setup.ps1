# PowerShell Setup Script

# PowerShell does not use color codes like Bash. Instead, it uses -ForegroundColor parameter.

# Function to display ASCII Art
function Show-AsciiArt {
@"
    ___  ___          _ _        ___ _____
    |  \/  |         | (_)      / _ |_   _|
    | .  . | ___ _ __| |_ _ __ / /_\ \| |
    | |\/| |/ _ | '__| | | '_ \|  _  || |
    | |  | |  __| |  | | | | | | | | _| |_
    \_|  |_/\___|_|  |_|_|_| |_\_| |_\___/
"@
}

Show-AsciiArt

# FLASK SETUP

Write-Host "CONFIGURATION:" -ForegroundColor Blue

# Generating a 24-byte random key and converting it to Base64
$bytes = New-Object byte[] 24
$rng = New-Object System.Security.Cryptography.RNGCryptoServiceProvider
$rng.GetBytes($bytes)
$SECRET_KEY = [Convert]::ToBase64String($bytes)

# Defaults
$FLASK_PORT_DEFAULT = 5000
$FLASK_DIRECTORY_DEFAULT = "$(Get-Location)/api/"
$MONGO_HOSTNAME_DEFAULT = "localhost"
$FRONTEND_DOMAIN_DEFAULT = "http://localhost"
$MONGO_APP_DATABASE__DEFAULT = "new-app"

# Read user input with default values
$FLASK_DIRECTORY = Read-Host "Flask API Directory [$FLASK_DIRECTORY_DEFAULT]"
if ([string]::IsNullOrWhiteSpace($FLASK_DIRECTORY)) { $FLASK_DIRECTORY = $FLASK_DIRECTORY_DEFAULT }

$FLASK_PORT = Read-Host "Flask App Port [$FLASK_PORT_DEFAULT]"
if ([string]::IsNullOrWhiteSpace($FLASK_PORT)) { $FLASK_PORT = $FLASK_PORT_DEFAULT }

$FRONTEND_DOMAIN = Read-Host "Front-End Domain [$FRONTEND_DOMAIN_DEFAULT]"
if ([string]::IsNullOrWhiteSpace($FRONTEND_DOMAIN)) { $FRONTEND_DOMAIN = $FRONTEND_DOMAIN_DEFAULT }

$MONGO_HOSTNAME = Read-Host "Mongo Hostname [$MONGO_HOSTNAME_DEFAULT]"
if ([string]::IsNullOrWhiteSpace($MONGO_HOSTNAME)) { $MONGO_HOSTNAME = $MONGO_HOSTNAME_DEFAULT }

$MONGO_APP_DATABASE = Read-Host "Mongo App Database Name [$MONGO_APP_DATABASE__DEFAULT]"
if ([string]::IsNullOrWhiteSpace($MONGO_APP_DATABASE)) { $MONGO_APP_DATABASE = $MONGO_APP_DATABASE__DEFAULT }

# Rename config.cfg.sample to config.cfg
$CONFIG_EXAMPLE_FILE = "./api/main/config/config.cfg.sample"
$CONFIG_FILE = "./api/main/config/config.cfg"
Copy-Item -Path $CONFIG_EXAMPLE_FILE -Destination $CONFIG_FILE

# Save configuration values to config.cfg with UTF-8 encoding
(Get-Content $CONFIG_FILE) -replace '##SECRET_KEY##', $SECRET_KEY |
    Out-File -FilePath $CONFIG_FILE -Encoding UTF8
(Get-Content $CONFIG_FILE) -replace '##FLASK_PORT##', $FLASK_PORT |
    Out-File -FilePath $CONFIG_FILE -Encoding UTF8
(Get-Content $CONFIG_FILE) -replace '##FRONTEND_DOMAIN##', $FRONTEND_DOMAIN |
    Out-File -FilePath $CONFIG_FILE -Encoding UTF8
(Get-Content $CONFIG_FILE) -replace '##FLASK_DOMAIN##', $FRONTEND_DOMAIN |
    Out-File -FilePath $CONFIG_FILE -Encoding UTF8
(Get-Content $CONFIG_FILE) -replace '##FLASK_DIRECTORY##', $FLASK_DIRECTORY |
    Out-File -FilePath $CONFIG_FILE -Encoding UTF8
(Get-Content $CONFIG_FILE) -replace '##MONGO_HOSTNAME##', $MONGO_HOSTNAME |
    Out-File -FilePath $CONFIG_FILE -Encoding UTF8
(Get-Content $CONFIG_FILE) -replace '##MONGO_APP_DATABASE##', $MONGO_APP_DATABASE |
    Out-File -FilePath $CONFIG_FILE -Encoding UTF8


Write-Host "Flask configuration saved!" -ForegroundColor Green

Write-Host "Launch the App with: `n`n./run`n"
