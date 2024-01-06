# Get into the virtualenv for Flask
./.venv/Scripts/activate

# Define directories and file paths
$SRV = '.\srv'
$MONGODIR = Join-Path $SRV 'mongodb'
$MONGOLOGS = Join-Path $SRV 'mongo_logs.txt'
# $FLASKLOGS = 'api\flask_logs.txt'

# Function to ensure MongoDB and Flask are terminated upon script exit
function OnExit {
    Get-Process | Where-Object { $_.ProcessName -eq "mongod" } | Stop-Process
    Get-Job | Stop-Job
    Get-Job | Remove-Job
}
trap { OnExit }

# Create directories if they don't exist
if (-not (Test-Path $SRV)) {
    New-Item -ItemType Directory -Path $SRV
}

if (-not (Test-Path $MONGODIR)) {
    New-Item -ItemType Directory -Path $MONGODIR
    New-Item -ItemType File -Path "${SRV}\README.md"
    New-Item -ItemType File -Path $MONGOLOGS
    "running MongoDB from here, @ '$MONGODIR'" | Out-File "${MONGODIR}\README.md"
}

# Start MongoDB using Start-Process
Write-Host "starting MongoDB..."
Start-Process -FilePath "mongod" -ArgumentList "--dbpath $MONGODIR --port 27017" -NoNewWindow -RedirectStandardOutput $MONGOLOGS

# Start React scripts
Write-Host "starting react-scripts..."
Start-Job -ScriptBlock {
    & npm start
}

# Start Flask
Write-Host "starting Flask..."
# New-Item -ItemType File -Path $FLASKLOGS -Force | Out-Null
Start-Process "python" -ArgumentList "api\run.py" -NoNewWindow

# Wait for the user to press a key to terminate the script and close all jobs
Read-Host -Prompt "Press Enter to exit"
OnExit
