<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Order Confirmation</title>
    <meta name="robots" content="noindex,nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0;" />
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
        body { margin: 0; padding: 0; background: #e1e1e1; }
        div, p, a, li, td { -webkit-text-size-adjust: none; }
        .ReadMsgBody { width: 100%; background-color: #ffffff; }
        .ExternalClass { width: 100%; background-color: #ffffff; }
        body { width: 100%; height: 100%; background-color: #e1e1e1; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        html { width: 100%; }
        p { padding: 0 !important; margin: 0 !important; }
        table { border-collapse: collapse; }
        a { color: #ff0000; text-decoration: none; }

        .fullTable { width: 100%; max-width: 600px; background-color: #ffffff; margin: 0 auto; }
        .fullPadding { width: 100%; padding: 20px; }
        .col { width: 50%; display: inline-block; vertical-align: top; }

        @media only screen and (max-width: 600px) {
            .fullTable { width: 100% !important; }
            .fullPadding { width: 90% !important; padding: 10px !important; }
            .col { width: 100% !important; display: block !important; text-align: center !important; }
            .hiddenMobile { display: none !important; }
            .visibleMobile { display: block !important; }
        }

        @media only screen and (max-width: 480px) {
            .visibleMobile td { height: 15px !important; }
            .fullPadding { padding: 5px !important; }
            .fullTable { width: 100% !important; }
        }
    </style>
</head>
<body>
<!-- Header -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#e1e1e1">
    <tr>
        <td height="20"></td>
    </tr>
    <tr>
        <td>
            <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" style="border-radius: 10px 10px 0 0;">
                <tr class="hiddenMobile">
                    <td height="40"></td>
                </tr>
                <tr class="visibleMobile">
                    <td height="30"></td>
                </tr>
                <tr>
                    <td>
                        <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                            <tbody>
                                <tr>
                                    <td align="left" class="col"> 
                                        <img src="{{url('/asset/frontend/images/new-logo.jpg')}}" width="150" height="50" alt="logo" border="0" />
                                        <p style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left; margin-top: 10px;">
                                            Hello, {{ $data['recipient']['name'] }}.<br>
                                            Thank you for shopping from our store and for your order.
                                        </p>
                                    </td>
                                    <td align="right" class="col">
                                        <p style="font-size: 21px; color: #ff0000; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                                            Invoice
                                        </p>
                                        <p style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                                            <small>ORDER</small> {{ $data['id'] }}<br />
                                            <small>{{ date('Y-m-d', $data['created']) }}</small>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- /Header -->

<!-- Order Details -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#e1e1e1">
    <tbody>
        <tr>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                                    <tbody>
                                        <tr>
                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding-bottom: 7px;" align="left">
                                                Item
                                            </th>
                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding-bottom: 7px;" align="center">
                                                Quantity
                                            </th>
                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding-bottom: 7px;" align="right">
                                                Subtotal
                                            </th>
                                        </tr>
                                        @foreach($data['items'] as $item)
                                        <tr>
                                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: left; padding-bottom: 7px;">
                                                {{ $item['name'] }}
                                            </td>
                                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1.6; vertical-align: top; text-align: center; padding-bottom: 7px;">
                                                {{ $item['quantity'] }}
                                            </td>
                                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: right; padding-bottom: 7px;">
                                                ${{ number_format($item['retail_price'], 2) }}
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr class="hiddenMobile">
                            <td height="30"></td>
                        </tr>
                        <tr class="visibleMobile">
                            <td height="20"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- /Order Details -->

<!-- Total -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#e1e1e1">
    <tbody>
        <tr>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table width="100%" border="0" cellpadding="0" cellspacing="0" align="left">
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-size: 12px; color: #1e2b33; font-family: 'Open Sans', sans-serif; font-weight: 700; line-height: 1.6; vertical-align: top; text-align: left;">
                                                                Subtotal: ${{ number_format($data['retail_costs']['subtotal'], 2) }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; color: #1e2b33; font-family: 'Open Sans', sans-serif; font-weight: 700; line-height: 1.6; vertical-align: top; text-align: left;">
                                                                Tax: ${{ number_format($data['retail_costs']['tax'], 2) }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; color: #1e2b33; font-family: 'Open Sans', sans-serif; font-weight: 700; line-height: 1.6; vertical-align: top; text-align: left;">
                                                                Shipping: ${{ number_format($data['retail_costs']['shipping'], 2) }}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 12px; color: #1e2b33; font-family: 'Open Sans', sans-serif; font-weight: 700; line-height: 1.6; vertical-align: top; text-align: left;">
                                                                Total: ${{ number_format($data['retail_costs']['total'], 2) }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="30"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- /Total -->

<!-- Billing and Shipping Information -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#e1e1e1">
  <tbody>
    <tr>
      <td>
        <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable">
          <tbody>
            <tr class="hiddenMobile">
              <td height="60"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="40"></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td class="col">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top;">
                                <strong>BILLING INFORMATION</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top;">
                                {{$data['recipient']['name']}}<br>
                                {{$data['recipient']['address1']}}, {{$data['recipient']['city']}}<br>
                                {{$data['recipient']['country_name']}}<br>
                                {{$data['recipient']['zip']}}<br>
                                T: {{$data['recipient']['phone']}}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>

                      <td class="col">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top;">
                                <strong>PAYMENT METHOD</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top;">
                                Stripe Transaction ID: <a href="#" style="color: #ff0000; text-decoration:underline;">{{$payment->payment_intent_id}}</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td class="col">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr class="hiddenMobile">
                              <td height="35"></td>
                            </tr>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top;">
                                <strong>SHIPPING INFORMATION</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top;">
                                {{$data['recipient']['name']}}<br>
                                {{$data['recipient']['address1']}}, {{$data['recipient']['city']}}<br>
                                {{$data['recipient']['country_name']}}<br>
                                {{$data['recipient']['zip']}}<br>
                                T: {{$data['recipient']['phone']}}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>

                      <td class="col">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr class="hiddenMobile">
                              <td height="35"></td>
                            </tr>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top;">
                                <strong>SHIPPING METHOD</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top;">
                                {{$data['shipping']}}: {{$data['shipping_service_name']}}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr class="hiddenMobile">
              <td height="60"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="30"></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

<!-- Design Details -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#e1e1e1">
    <tbody>
        <tr>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable">
                    <tbody>
                        <tr class="hiddenMobile">
                            <td height="60"></td>
                        </tr>
                        <tr class="visibleMobile">
                            <td height="40"></td>
                        </tr>
                        <tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                                    <tbody>
                                        <tr>
                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding-bottom: 7px;" align="left">
                                                Design Images
                                            </th>
                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding-bottom: 7px;" align="left">
                                                Type
                                            </th>
                                        </tr>
                                        @foreach($data['items'] as $item)
                                            @foreach($item['files'] as $file)
                                                <tr>
                                                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: left; padding-bottom: 7px;">
                                                    <img src="{{ $file['url'] }}" alt="Design Image" style="width: 100px; height: auto;">
                                                    </td>
                                                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: left; padding-bottom: 7px;">
                                                    {{ $file['type'] }}
                                                    </td>
                                                </tr>
                                            @endforeach
                                        @endforeach
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr class="hiddenMobile">
                            <td height="30"></td>
                        </tr>
                        <tr class="visibleMobile">
                            <td height="20"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<!-- /Design Details -->

<!-- Footer -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#e1e1e1">
  <tr>
    <td>
      <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" style="border-radius: 0 0 10px 10px;">
        <tr>
          <td>
            <table border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                    Have a nice day.
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr class="spacer">
          <td height="50"></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td height="20"></td>
  </tr>
</table>
<!-- /Footer -->

</body>
</html>
