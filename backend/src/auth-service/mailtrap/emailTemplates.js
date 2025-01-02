export const VERIFICATION_EMAIL_TEMPLATE = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4caf50;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
        }
        .verification-code {
            display: inline-block;
            margin: 20px auto;
            padding: 10px 20px;
            font-size: 20px;
            font-weight: bold;
            color: #ffffff;
            background-color: #4caf50;
            border-radius: 4px;
            text-decoration: none;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            padding: 10px;
            border-top: 1px solid #dddddd;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <p>Thank you for registering with us!</p>
            <p>Your verification code is:</p>
            <p class="verification-code">{verificationCode}</p>
            <p>Please use this code to complete your email verification. If you didn’t request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Your Company. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
`
