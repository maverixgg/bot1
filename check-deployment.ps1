# Pre-Deployment Verification Script
# Run this before deploying to Vercel to check everything is ready

Write-Host ""
Write-Host "🔍 Nexaur Deployment Readiness Check" -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor Cyan

$allGood = $true

# Check 1: Verify critical files exist
Write-Host ""
Write-Host "✅ Checking critical files..." -ForegroundColor Yellow
$criticalFiles = @(
    "vercel.json",
    "api\index.py",
    "api\requirements.txt",
    "frontend\package.json",
    "frontend\src\config\api.js",
    "backend\main.py"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file exists" -ForegroundColor Green
    }
    else {
        Write-Host "  ✗ $file is missing!" -ForegroundColor Red
        $allGood = $false
    }
}

# Check 2: Verify frontend builds
Write-Host ""
Write-Host "🏗️  Testing frontend build..." -ForegroundColor Yellow
Push-Location frontend
$buildOutput = npm run build 2>&1
Pop-Location

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Frontend build successful!" -ForegroundColor Green
}
else {
    Write-Host "  ✗ Frontend build failed!" -ForegroundColor Red
    $allGood = $false
}

# Check 3: Verify .env setup
Write-Host ""
Write-Host "🔑 Checking environment variables..." -ForegroundColor Yellow
if (Test-Path "backend\.env") {
    Write-Host "  ✓ backend\.env exists" -ForegroundColor Green
    $envContent = Get-Content "backend\.env" -Raw
    if ($envContent -match "GEMINI_API_KEY") {
        Write-Host "  ✓ GEMINI_API_KEY found in .env" -ForegroundColor Green
    }
    else {
        Write-Host "  ⚠ GEMINI_API_KEY not found in .env" -ForegroundColor Yellow
        Write-Host "    Remember to add it in Vercel dashboard!" -ForegroundColor Yellow
    }
}
else {
    Write-Host "  ⚠ backend\.env not found (OK if using Vercel env vars)" -ForegroundColor Yellow
    Write-Host "    Remember to set GEMINI_API_KEY in Vercel dashboard!" -ForegroundColor Yellow
}

# Check 4: Verify Git status
Write-Host ""
Write-Host "📦 Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain 2>&1
if ($LASTEXITCODE -eq 0) {
    if ([string]::IsNullOrWhiteSpace($gitStatus)) {
        Write-Host "  ✓ No uncommitted changes" -ForegroundColor Green
    }
    else {
        Write-Host "  ⚠ You have uncommitted changes" -ForegroundColor Yellow
        Write-Host "    Remember to commit and push before deploying!" -ForegroundColor Yellow
    }
}
else {
    Write-Host "  ⚠ Not a Git repository or Git not installed" -ForegroundColor Yellow
}

# Check 5: Verify API config
Write-Host ""
Write-Host "🌐 Checking API configuration..." -ForegroundColor Yellow
$apiConfig = Get-Content "frontend\src\config\api.js" -Raw
if ($apiConfig -match "API_BASE_URL") {
    Write-Host "  ✓ API config file properly set up" -ForegroundColor Green
}
else {
    Write-Host "  ✗ API config issue found!" -ForegroundColor Red
    $allGood = $false
}

# Final Summary
Write-Host ""
Write-Host ("=" * 50) -ForegroundColor Cyan
if ($allGood) {
    Write-Host "🎉 All checks passed! Ready to deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. git add ." -ForegroundColor White
    Write-Host "  2. git commit -m 'Ready for deployment'" -ForegroundColor White
    Write-Host "  3. git push origin main" -ForegroundColor White
    Write-Host "  4. Deploy on Vercel: https://vercel.com/new" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 Check DEPLOY-CHECKLIST.md for full guide" -ForegroundColor Cyan
}
else {
    Write-Host "⚠️  Some issues found. Please fix them before deploying." -ForegroundColor Yellow
}
Write-Host ""
