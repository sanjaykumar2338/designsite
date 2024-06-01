<!DOCTYPE html>
<html>
<head>
    <title>Donation Confirmation</title>
</head>
<body>
    <h1>Thank You for Your Donation!</h1>

    <p>This donation was made to {{ $nonprofit }} via Our Change Foundation 501(c)(3) (EIN: 86-3353394). No goods or services were provided in exchange for this donation.</p>

    <p>Your donation of ${{ number_format($amount / 100, 2) }} has been successfully sent to a nonprofit that supports {{ $country }}.</p>

    <p>Thank you for supporting Israel through "{{ $nonprofit }}".</p>

    <p>Your support is appreciated!</p>

    <p>Cause Stand LLC</p>

    <p>Supply Love, Demand Peace.</p>
</body>
</html>
