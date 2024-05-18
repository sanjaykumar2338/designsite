<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Thank you for contacting us</title>
</head>
<body>
    <h1>Dear {{ $contact->first_name }} {{ $contact->last_name }},</h1>
    <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
    <p><strong>Your Message:</strong></p>
    <p>{{ $contact->message }}</p>
    <p>Best regards,</p>
    <p>{{ env('APP_NAME') }}</p>
</body>
</html>
