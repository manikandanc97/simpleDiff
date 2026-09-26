$publicFiles = Get-ChildItem -Path "public" -Recurse -File | Where-Object { $_.Extension -match '\.(png|jpg|jpeg|webp|svg|gif|ico)' }
$codeFiles = Get-ChildItem -Path "app", "components", "lib", "config", "types" -Recurse -File | Where-Object { $_.Extension -match '\.(tsx|ts|jsx|js|css|json|md)' }

$allCode = @()
foreach ($cf in $codeFiles) {
    $content = Get-Content -Path $cf.FullName -Raw -ErrorAction SilentlyContinue
    if ($content) {
        $allCode += $content
    }
}
$fullCodeString = $allCode -join " "

$results = foreach ($f in $publicFiles) {
    $name = $f.Name
    $subPath = $f.FullName.Substring((Get-Item "public").FullName.Length).Replace("\", "/")
    
    $isUsed = $fullCodeString.Contains($name) -or $fullCodeString.Contains($subPath)
    [PSCustomObject]@{
        Name = $name
        Path = $subPath
        SizeKB = [math]::Round($f.Length / 1KB, 1)
        Used = $isUsed
    }
}

$results | Format-Table -AutoSize
$results | Where-Object { -not $_.Used } | Format-Table -AutoSize
