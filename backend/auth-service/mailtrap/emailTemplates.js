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
`;

export const WELCOME_EMAIL_TEMPLATE = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Welcome to Company name, {username}!</h2>
    <p>
      We are thrilled to have you onboard. At Company name, we strive to make services accessible and convenient for everyone.
    </p>
    <p>
      Start exploring our services today and experience a new way of managing your needs.
    </p>
    <p>
      If you have any questions or need assistance, feel free to reach out to our support team.
    </p>
    <p>Best regards,</p>
    <p>The Company name Team</p>
  </div>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password. Click the button below to proceed:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="{resetURL}" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
    </div>
    <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
    <p>For security reasons, this link will expire in <strong>1 hour</strong>.</p>
    <p>Best regards,</p>
    <p><strong>Your Company Team</strong></p>
  </div>
`;


export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #333; text-align: center;">Password Reset Successful</h2>
    <p>Hello,</p>
    <p>Your password has been successfully reset. You can now log in using your new password.</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="{loginURL}" style="background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Login Now</a>
    </div>
    <p>If you did not perform this action, please contact our support team immediately.</p>
    <p>Best regards,</p>
    <p><strong>Your Company Team</strong></p>
  </div>
`;
