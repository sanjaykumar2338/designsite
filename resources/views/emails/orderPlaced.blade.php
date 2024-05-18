<!DOCTYPE html>
<html>
<head>
    <title>Order Placed</title>
</head>
<body>
    <h1>Thank you for your order!</h1>
    <p>Order ID: {{ $order->id }}</p>
    <p>Amount: ${{ number_format($order->amount, 2) }}</p>
    <!-- Add more order details as needed -->
</body>
</html>
