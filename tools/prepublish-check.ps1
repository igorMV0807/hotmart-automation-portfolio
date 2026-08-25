[CmdletBinding()]
param(
    [string]$RepositoryRoot
)

$ErrorActionPreference = 'Stop'
$findings = [System.Collections.Generic.List[string]]::new()

if ([string]::IsNullOrWhiteSpace($RepositoryRoot)) {
    $RepositoryRoot = Split-Path -Parent $PSScriptRoot
}

$resolvedRoot = (Resolve-Path -LiteralPath $RepositoryRoot).Path
$rootPrefix = $resolvedRoot.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
$hasGitMetadata = Test-Path -LiteralPath (Join-Path $resolvedRoot '.git')
if (-not $hasGitMetadata) {
    Write-Host 'Warning: Git metadata was not found; scanning the working tree instead of tracked files.' -ForegroundColor Yellow
}

$excludedDirectoryNames = @('.git', '.next', 'node_modules', 'coverage', 'private', 'production-export', 'real-data')
$textExtensions = @('.md', '.json', '.js', '.ts', '.py', '.ps1', '.sql', '.yaml', '.yml', '.toml', '.xml', '.html', '.htm', '.txt', '.env', '.example', '.csv')

if ($hasGitMetadata) {
    $relativeFiles = & git -C $resolvedRoot ls-files --cached --others --exclude-standard
    if ($LASTEXITCODE -ne 0) {
        throw 'Unable to enumerate publishable files with Git.'
    }
    $files = $relativeFiles | ForEach-Object {
        $candidate = Join-Path $resolvedRoot $_
        if (Test-Path -LiteralPath $candidate -PathType Leaf) {
            Get-Item -LiteralPath $candidate -Force
        }
    }
} else {
    $files = Get-ChildItem -LiteralPath $resolvedRoot -Recurse -Force -File | Where-Object {
        $relativePath = $_.FullName.Substring($rootPrefix.Length)
        $segments = $relativePath -split '[\\/]'
        -not ($segments | Where-Object { $_ -in $excludedDirectoryNames })
    }
}

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($rootPrefix.Length)
    $normalizedPath = $relativePath -replace '\\', '/'
    $name = $file.Name

    if (($name -eq '.env' -or $name -like '.env.*') -and $name -ne '.env.example') {
        $findings.Add("Forbidden environment file: $normalizedPath")
    }

    if ($name -match '(?i)(credential|service-account).*\.json$' -or $file.Extension -match '(?i)^\.(pem|key|p12|pfx)$') {
        $findings.Add("Possible credential file: $normalizedPath")
    }

    if ($textExtensions -notcontains $file.Extension.ToLowerInvariant() -and $name -ne '.env.example' -and $name -ne '.gitignore') {
        continue
    }

    # Do not scan this checker against its own detection signatures.
    if ($normalizedPath -eq 'tools/prepublish-check.ps1') {
        continue
    }

    $content = Get-Content -LiteralPath $file.FullName -Raw -ErrorAction Stop
    $checks = @(
        @{ Name = 'private key'; Pattern = '-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----' },
        @{ Name = 'JWT-like token'; Pattern = 'eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}' },
        @{ Name = 'Supabase service-role key assignment'; Pattern = '(?im)^\s*SUPABASE_SERVICE_ROLE_KEY[ \t]*=[ \t]*(?!$|replace-|your-|example|COLE_)[^\r\n#<\[]+' },
        @{ Name = 'database URL with embedded credentials'; Pattern = '(?i)(postgres|postgresql)://[^\s/:]+:[^\s/@]+@' },
        @{ Name = 'authorization bearer value'; Pattern = '(?i)Authorization\s*[:=]\s*Bearer\s+[A-Za-z0-9._-]{16,}' },
        @{ Name = 'generic secret assignment'; Pattern = '(?i)(api[_-]?key|secret|token|password)\s*[:=]\s*["'']?(?!replace-|your-|example)[A-Za-z0-9_./+=-]{20,}["'']?' }
    )

    foreach ($check in $checks) {
        if ($content -match $check.Pattern) {
            $findings.Add("Possible $($check.Name): $normalizedPath")
        }
    }
}

if ($findings.Count -gt 0) {
    Write-Host 'Pre-publication check FAILED:' -ForegroundColor Red
    $findings | Sort-Object -Unique | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
    Write-Host 'Treat findings as review prompts. Remove/rotate exposed values and inspect Git history before publishing.' -ForegroundColor Yellow
    exit 1
}

Write-Host 'Pre-publication check passed: no configured working-tree patterns were detected.' -ForegroundColor Green
Write-Host 'This check does not replace manual review, credential rotation, PII review, or Git-history scanning.' -ForegroundColor Yellow
