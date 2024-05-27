<!DOCTYPE html>
<html>
<head>
    <title>Donation Successful</title>
</head>
<body>
    <h1>Thank you for your donation!</h1>
    <p>Your donation of ${{ number_format($amount / 100, 2) }} has been successfully sent to {{ $country }}.</p>
    <p>Thank you for supporting {{ $country }} through {{ $nonprofit }}.</p>
    <p>We appreciate your generosity and support.</p>
</body>
</html>