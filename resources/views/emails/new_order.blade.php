<!DOCTYPE html>
<html>
<head>
    <title>New Order Placed</title>
</head>
<body>
    <h1>Admin Notification New Order Details</h1>
    <p>Thank you for placing an order!</p>

    <h3>Order Details:</h3>
    <ul>
        <li>Order ID: {{ $order->id }}</li>
        <li>Order Date: {{ $order->date }}</li>
        <li>Customer Email: {{ $order->email }}</li>
        <li>Total Amount: ${{ $order->total_amount }}</li>
    </ul>

    <p>If you have any questions, feel free to contact us.</p>
</body>
</html>
