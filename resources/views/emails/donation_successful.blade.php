<!DOCTYPE html>
<html>
<head>
    <title>Donation Confirmation</title>
</head>
<body>
    <h1>Thank You for Your Donation!</h1>

    <p>Your donation of ${{ number_format($amount / 100, 2) }} has been successfully sent to a nonprofit that supports {{ $country }}.</p>

    <p>Thank you for supporting Israel through "{{ $nonprofit }}".</p>

    <p>A receipt from "{{ $nonprofit }}" will be sent to your email within 30 days.</p>

    <p>Your support is appreciated!</p>

    <p>Cause Stand LLC</p>

    <p>Supply Love, Demand Peace.</p>
</body>
</html>
