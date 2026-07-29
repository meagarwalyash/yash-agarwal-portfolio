# PowerShell Native HTTP Local Server with Razorpay API Integration
$port = 8085
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "🚀 Local Server running at http://localhost:$port/"
} catch {
    Write-Host "Server already listening or port occupied."
}

# Load credentials from environment variables or .env
$envPath = Join-Path $PSScriptRoot ".env"
$keyId = if ($env:RAZORPAY_KEY_ID) { $env:RAZORPAY_KEY_ID } else { "rzp_live_TIcwck5n2wddpM" }
$keySecret = $env:RAZORPAY_KEY_SECRET

if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
        if ($_ -match "^\s*([^#=]+)=(.*)$") {
            $k = $matches[1].Trim()
            $v = $matches[2].Trim()
            if ($k -eq "RAZORPAY_KEY_ID") { $keyId = $v }
            if ($k -eq "RAZORPAY_KEY_SECRET") { $keySecret = $v }
        }
    }
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath

        # CORS Headers
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.Close()
            continue
        }
        # Auth API Endpoint: Register (POST /api/auth/register)
        if ($localPath -eq "/api/auth/register" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $json = ConvertFrom-Json $bodyText

            $userObj = @{
                id = "usr_" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
                name = [string]$json.name
                email = [string]$json.email
                phone = [string]$json.phone
                gst = [string]$json.gst
                memberTier = "Pro Growth Executive"
                status = "Active"
                purchasedCourses = @()
                purchasedProducts = @()
                orders = @()
                createdAt = (Get-Date).ToString("o")
            }

            $resObj = @{ status = "success"; user = $userObj } | ConvertTo-Json
            $response.StatusCode = 200
            $response.ContentType = "application/json"
            $resBytes = [System.Text.Encoding]::UTF8.GetBytes($resObj)
            $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            $response.Close()
            continue
        }

        # Auth API Endpoint: Login (POST /api/auth/login)
        if ($localPath -eq "/api/auth/login" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $json = ConvertFrom-Json $bodyText

            $userObj = @{
                id = "usr_" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
                name = ([string]$json.email).Split('@')[0]
                email = [string]$json.email
                phone = ""
                gst = ""
                memberTier = "Pro Growth Executive"
                status = "Active"
                purchasedCourses = @()
                purchasedProducts = @()
                orders = @()
                createdAt = (Get-Date).ToString("o")
            }

            $resObj = @{ status = "success"; user = $userObj } | ConvertTo-Json
            $response.StatusCode = 200
            $response.ContentType = "application/json"
            $resBytes = [System.Text.Encoding]::UTF8.GetBytes($resObj)
            $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            $response.Close()
            continue
        }
        if ($localPath -eq "/api/create-order" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $json = ConvertFrom-Json $bodyText
            
            $amount = [int]$json.amount
            if ($amount -lt 100) {
                $response.StatusCode = 400
                $response.ContentType = "application/json"
                $errObj = @{ status = "error"; message = "Amount must be at least 100 paise (1 INR)" } | ConvertTo-Json
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errObj)
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                $response.Close()
                continue
            }
            
            $receipt = "rcpt_1001"
            if ($json.receipt) { $receipt = [string]$json.receipt }
            
            $currency = "INR"
            if ($json.currency) { $currency = [string]$json.currency }
            
            $authStr = $keyId + ":" + $keySecret
            $authHeader = [Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($authStr))
            $headers = @{
                "Authorization" = "Basic " + $authHeader
                "Content-Type" = "application/json"
            }
            
            $orderPayloadObj = @{
                amount = $amount
                currency = $currency
                receipt = $receipt
            }
            $orderPayloadJson = $orderPayloadObj | ConvertTo-Json
            
            try {
                $rzpRes = Invoke-RestMethod -Uri "https://api.razorpay.com/v1/orders" -Method Post -Headers $headers -Body $orderPayloadJson
                $resObj = @{
                    order_id = $rzpRes.id
                    amount = $rzpRes.amount
                    currency = $rzpRes.currency
                    key_id = $keyId
                }
                $resJson = $resObj | ConvertTo-Json
                
                $response.StatusCode = 200
                $response.ContentType = "application/json"
                $resBytes = [System.Text.Encoding]::UTF8.GetBytes($resJson)
                $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            } catch {
                $response.StatusCode = 500
                $response.ContentType = "application/json"
                $errObj = @{ status = "error"; message = $_.Exception.Message } | ConvertTo-Json
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errObj)
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
            $response.Close()
            continue
        }
        
        # 2. API Endpoint: Verify Payment Signature (POST /api/verify-payment)
        if ($localPath -eq "/api/verify-payment" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $json = ConvertFrom-Json $bodyText
            
            $paymentId = $json.razorpay_payment_id
            $orderId = $json.razorpay_order_id
            $signature = $json.razorpay_signature
            
            if (-not $paymentId -or -not $orderId -or -not $signature) {
                $response.StatusCode = 400
                $response.ContentType = "application/json"
                $errObj = @{ status = "error"; message = "Missing required parameters: razorpay_payment_id, razorpay_order_id, and razorpay_signature are required" } | ConvertTo-Json
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errObj)
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                $response.Close()
                continue
            }
            
            # HMAC-SHA256 Signature Verification
            $hmac = New-Object System.Security.Cryptography.HMACSHA256
            $hmac.Key = [System.Text.Encoding]::UTF8.GetBytes($keySecret)
            $sigData = $orderId + "|" + $paymentId
            $bytesToHash = [System.Text.Encoding]::UTF8.GetBytes($sigData)
            $hashBytes = $hmac.ComputeHash($bytesToHash)
            $generatedSignature = ([BitConverter]::ToString($hashBytes)).Replace("-", "").ToLower()
            
            if ($generatedSignature -eq $signature.ToString().ToLower()) {
                $response.StatusCode = 200
                $response.ContentType = "application/json"
                $resObj = @{
                    status = "success"
                    message = "Payment verified successfully"
                    order_id = $orderId
                    payment_id = $paymentId
                }
                $resJson = $resObj | ConvertTo-Json
                $resBytes = [System.Text.Encoding]::UTF8.GetBytes($resJson)
                $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            } else {
                $response.StatusCode = 400
                $response.ContentType = "application/json"
                $errObj = @{ status = "error"; message = "Invalid payment signature. Verification failed." } | ConvertTo-Json
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errObj)
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
            $response.Close()
            continue
        }

        # API Endpoint: Capture Download/Store Lead (POST /api/leads/capture)
        if ($localPath -eq "/api/leads/capture" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $json = ConvertFrom-Json $bodyText

            $dbPath = Join-Path $PSScriptRoot "database.json"
            $db = Get-Content $dbPath -Raw | ConvertFrom-Json
            if (-not $db.leads) { $db | Add-Member -NotePropertyName "leads" -NotePropertyValue @() }
            if (-not $db.users) { $db | Add-Member -NotePropertyName "users" -NotePropertyValue @() }

            $leadEntry = @{
                id = "lead_" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
                name = [string]$json.name
                email = [string]$json.email
                phone = [string]$json.phone
                productId = [string]$json.productId
                productName = [string]$json.productName
                source = "Gated Download Form"
                createdAt = [DateTime]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
                status = "Active Lead"
            }

            $db.leads = @($leadEntry) + $db.leads

            $userEntry = @{
                id = "usr_" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
                name = [string]$json.name
                email = [string]$json.email
                phone = [string]$json.phone
                memberTier = "Registered Lead"
                status = "Active"
                createdAt = [DateTime]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
            }
            $existingUser = $db.users | Where-Object { $_.email -eq $json.email }
            if (-not $existingUser) {
                $db.users = @($userEntry) + $db.users
            }

            $db | ConvertTo-Json -Depth 10 | Set-Content $dbPath -Encoding UTF8

            $response.StatusCode = 200
            $response.ContentType = "application/json"
            $resObj = @{ status = "success"; message = "Lead captured successfully"; lead = $leadEntry } | ConvertTo-Json
            $resBytes = [System.Text.Encoding]::UTF8.GetBytes($resObj)
            $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            $response.Close()
            continue
        }

        # 3. API Endpoint: Join Launch Waitlist (POST /api/waitlist/join)
        if ($localPath -eq "/api/waitlist/join" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $json = ConvertFrom-Json $bodyText
            
            $dbPath = Join-Path $PSScriptRoot "database.json"
            $db = Get-Content $dbPath -Raw | ConvertFrom-Json
            if (-not $db.productWaitlist) { $db | Add-Member -NotePropertyName "productWaitlist" -NotePropertyValue @() }
            
            $normalizedEmail = $json.email.ToString().ToLower().Trim()
            $existing = $db.productWaitlist | Where-Object { $_.productId -eq $json.productId -and $_.customerEmail -eq $normalizedEmail }
            
            if ($existing) {
                $response.StatusCode = 200
                $response.ContentType = "application/json"
                $resObj = @{ status = "info"; message = "You are already registered on the VIP launch waitlist for this product!" } | ConvertTo-Json
                $resBytes = [System.Text.Encoding]::UTF8.GetBytes($resObj)
                $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            } else {
                $waitlistEntry = @{
                    id = "wl_" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
                    productId = $json.productId
                    productName = if ($json.productName) { $json.productName } else { "Digital Product" }
                    customerName = if ($json.customerName) { $json.customerName } else { $normalizedEmail.Split('@')[0] }
                    customerEmail = $normalizedEmail
                    createdAt = [DateTime]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
                    status = "Pending"
                }
                $db.productWaitlist = @($waitlistEntry) + $db.productWaitlist
                $db | ConvertTo-Json -Depth 10 | Set-Content $dbPath -Encoding UTF8
                
                $response.StatusCode = 200
                $response.ContentType = "application/json"
                $resObj = @{ status = "success"; message = "Successfully joined the VIP launch waitlist!"; entry = $waitlistEntry } | ConvertTo-Json
                $resBytes = [System.Text.Encoding]::UTF8.GetBytes($resObj)
                $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            }
            $response.Close()
            continue
        }

        # 4. API Endpoint: Get Waitlist (GET /api/admin/waitlist)
        if ($localPath -eq "/api/admin/waitlist" -and $request.HttpMethod -eq "GET") {
            $dbPath = Join-Path $PSScriptRoot "database.json"
            $db = Get-Content $dbPath -Raw | ConvertFrom-Json
            $waitlist = if ($db.productWaitlist) { $db.productWaitlist } else { @() }
            $resObj = @{ status = "success"; waitlist = $waitlist } | ConvertTo-Json -Depth 10
            $resBytes = [System.Text.Encoding]::UTF8.GetBytes($resObj)
            $response.StatusCode = 200
            $response.ContentType = "application/json"
            $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
            $response.Close()
            continue
        }

        # 5. API Endpoint: Download PDF (/api/download/...)
        if ($localPath.StartsWith("/api/download/")) {
            $pdfPath = Join-Path $PSScriptRoot "EBOOKS\MeAgarwalYash_Zero_Budget_PR_Audit_Checklist_Ebook.pdf"
            if (Test-Path $pdfPath) {
                $bytes = [System.IO.File]::ReadAllBytes($pdfPath)
                $response.ContentType = "application/pdf"
                if ($request.QueryString["preview"] -eq "true") {
                    $response.AddHeader("Content-Disposition", "inline; filename=`"MeAgarwalYash_Zero_Budget_PR_Audit_Checklist_Ebook.pdf`"")
                } else {
                    $response.AddHeader("Content-Disposition", "attachment; filename=`"MeAgarwalYash_Zero_Budget_PR_Audit_Checklist_Ebook.pdf`"")
                }
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.Close()
                continue
            }
        }

        # Static File Serving
        if ($localPath -eq "/") { $localPath = "/index.html" }
        $filePath = Join-Path $PSScriptRoot $localPath.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            
            if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($filePath.EndsWith(".svg")) { $response.ContentType = "image/svg+xml" }
            elseif ($filePath.EndsWith(".json")) { $response.ContentType = "application/json" }
            
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # Continue loop on client disconnect
    }
}
