<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Order Confirmation</title>
    <meta name="robots" content="noindex,nofollow" />
    <meta name="viewport" content="width=device-width; initial-scale=1.0;" />
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
        body { margin: 0; padding: 0; background: #e1e1e1; }
        div, p, a, li, td { -webkit-text-size-adjust: none; }
        .ReadMsgBody { width: 100%; background-color: #ffffff; }
        .ExternalClass { width: 100%; background-color: #ffffff; }
        body { width: 100%; height: 100%; background-color: #e1e1e1; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        html { width: 100%; }
        p { padding: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; margin-left: 0 !important; }
        .visibleMobile { display: none; }
        .hiddenMobile { display: block; }

        @media only screen and (max-width: 600px) {
        body { width: auto !important; }
        table[class=fullTable] { width: 96% !important; clear: both; }
        table[class=fullPadding] { width: 85% !important; clear: both; }
        table[class=col] { width: 45% !important; }
        .erase { display: none; }
        }

        @media only screen and (max-width: 420px) {
        table[class=fullTable] { width: 100% !important; clear: both; }
        table[class=fullPadding] { width: 85% !important; clear: both; }
        table[class=col] { width: 100% !important; clear: both; }
        table[class=col] td { text-align: left !important; }
        .erase { display: none; font-size: 0; max-height: 0; line-height: 0; padding: 0; }
        .visibleMobile { display: block !important; }
        .hiddenMobile { display: none !important; }
        }

        @media only screen and (max-width:480px){
          .visibleMobile td {
              height: 15px;
          }
        }
    </style>
</head>
<body>
<!-- Header -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tr>
        <td height="20"></td>
    </tr>
    <tr>
        <td>
            <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
                <tr class="hiddenMobile">
                    <td height="40"></td>
                </tr>
                <tr class="visibleMobile">
                    <td height="30"></td>
                </tr>

                <tr>
                    <td>
                        <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                            <tbody>
                                <tr>
                                    <td>
                                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                                            <tbody>
                                                <tr>
                                                    <td align="left"> <img src="{{url('/asset/frontend/images/new-logo.jpg')}}" width="150" height="50" alt="logo" border="0" /></td>
                                                </tr>
                                                <tr class="hiddenMobile">
                                                    <td height="40"></td>
                                                </tr>
                                                <tr class="visibleMobile">
                                                    <td height="20"></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                                                        Hello, {{ $data['recipient']['name'] }}.
                                                        <br> Thank you for shopping from our store and for your order.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                                            <tbody>
                                                <tr class="visibleMobile">
                                                    <td height="20"></td>
                                                </tr>
                                                <tr>
                                                    <td height="5"></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                                                        Invoice
                                                    </td>
                                                </tr>
                                                <tr>
                                                <tr class="hiddenMobile">
                                                    <td height="50"></td>
                                                </tr>
                                                <tr class="visibleMobile">
                                                    <td height="20"></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                                                        <small>ORDER</small> {{ $data['id'] }}<br />
                                                        <small>{{ date('Y-m-d',$data['created']) }}</small>
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
            </table>
        </td>
    </tr>
</table>
<!-- /Header -->

<!-- Order Details -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
        <tr>
            <td>
                <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
                    <tbody>
                        <tr>
                        <tr class="hiddenMobile">
                            <td height="60"></td>
                        </tr>
                        <tr class="visibleMobile">
                            <td height="40"></td>
                        </tr>
                        <tr>
                            <td>
                                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                                    <tbody>
                                        <tr>
                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                                                Item
                                            </th>
                                            
                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
                                                Quantity
                                            </th>
                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                                                Subtotal
                                            </th>
                                        </tr>
                                        @foreach($data['items'] as $item)
                                        <tr>
                                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: left; padding: 0 10px 7px 0;">
                                                {{ $item['name'] }}
                                            </td>
                                            
                                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1.6; vertical-align: top; text-align: center; padding: 0 0 7px;">
                                                {{ $item['quantity'] }}
                                            </td>
                                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: right; padding: 0 0 7px;">
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
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
        <tr>
            <td>
                <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
                    <tbody>
                        <tr>
                            <td>
                                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table width="100%" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
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

<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tbody>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
          <tbody>
            <tr>
            <tr class="hiddenMobile">
              <td height="60"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="40"></td>
            </tr>
            <tr>
              <td>
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td>
                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">

                          <tbody>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>BILLING INFORMATION</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                              {{$data['recipient']['name']}}<br> {{$data['recipient']['address1']}}, {{$data['recipient']['city']}}<br> {{$data['recipient']['country_name']}}<br> {{$data['recipient']['zip']}}<br> T: {{$data['recipient']['phone']}}
                              </td>
                            </tr>
                          </tbody>
                        </table>


                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                          <tbody>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>PAYMENT METHOD</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
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
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td>
                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                          <tbody>
                            <tr class="hiddenMobile">
                              <td height="35"></td>
                            </tr>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>SHIPPING INFORMATION</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                {{$data['recipient']['name']}}<br> {{$data['recipient']['address1']}}, {{$data['recipient']['city']}}<br> {{$data['recipient']['country_name']}}<br> {{$data['recipient']['zip']}}<br> T: {{$data['recipient']['phone']}}
                              </td>
                            </tr>
                          </tbody>
                        </table>


                        <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                          <tbody>
                            <tr class="hiddenMobile">
                              <td height="35"></td>
                            </tr>
                            <tr class="visibleMobile">
                              <td height="20"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                <strong>SHIPPING METHOD</strong>
                              </td>
                            </tr>
                            <tr>
                              <td width="100%" height="10"></td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
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
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
        <tr>
            <td>
                <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
                    <tbody>
                        <tr>
                        <tr class="hiddenMobile">
                            <td height="60"></td>
                        </tr>
                        <tr class="visibleMobile">
                            <td height="40"></td>
                        </tr>
                        <tr>
                            <td>
                                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                                    <tbody>
                                        <tr>
                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                                                Design Images
                                            </th>

                                            <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                                                Type
                                            </th>
                                            
                                            
                                        </tr>
                                        @foreach($data['items'] as $item)
                                            @foreach($item['files'] as $file)
                                                <tr>
                                                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: left; padding: 0 10px 7px 0;">
                                                    <img src="{{ $file['url'] }}" alt="Design Image" style="width: 100px; height: auto;">
                                                    </td>

                                                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: left; padding: 0 10px 7px 0;">
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
<!-- /Information -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">

  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 0 0 10px 10px;">
        <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
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
</body>
</html>
