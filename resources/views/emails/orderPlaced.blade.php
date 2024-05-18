<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Placed</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
        }
        p {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Dear {{ $user->name }},</h1>
        <p>Thank you for your order!</p>
        <p>Order ID: {{ $order->id }}</p>
        <p>Amount: ${{ number_format($order->amount, 2) }}</p>
        <!-- Add more order details as needed -->
        <p>We appreciate your business and look forward to serving you again.</p>
        <p>Best regards,</p>
        <p>{{ env('APP_NAME') }}</p>
    </div>
</body>
</html>
