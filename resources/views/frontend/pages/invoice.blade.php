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
        .visibleMobile { display: none; }
        .hiddenMobile { display: block; }

		table td, table th {
				box-sizing: border-box;
			}
        @media only screen and (max-width: 600px) {
			table td, table th {
				text-align: left !important;
			}
			.tptable td {
				display: block;
				text-align: left !important;
				width: 100% !important;
			}
			.mdtable, .mdbtable {
				padding-top: 20px !important;
			}
			.mdtable td {
				display: block;
				text-align: left !important;
				width: 100% !important;
			}
        }

    </style>
</head>
<body>
<!-- Header -->
<div class="table-wrapper" style="background-color:#e1e1e1;">
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" style="max-width:600px; margin-left:auto; margin-right:auto; border-radius:10px; background-color:#fff; padding: 30px 0px;">
	<tr>
		<td>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="tptable" style="max-width:480px; margin-left:auto; margin-right:auto; ">
				<tr>
					<td style="width:50%; text-align:left; padding:10px 15px;"> <img src="{{url('/asset/frontend/images/new-logo.jpg')}}" width="150" height="50" alt="logo" border="0" /></td>
					<td style="padding:10px 15px; font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right; width:50%;">
						Invoice
					</td>
					
				</tr>
				<tr>
					<td style="width:50%; font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;     padding: 20px 15px;">
					Hello, {{ $data['recipient']['name'] }}.
					<br> Thank you for shopping from our store and for your order.
					</td>
					<td style="width:50%; font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;     padding: 20px 15px;">
						<small>ORDER</small> {{ $data['id'] }}<br />
						<small>{{ date('Y-m-d',$data['created']) }}</small>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" style="max-width:480px; margin-left:auto; margin-right:auto; ;">
				<tr>
					<th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 15px 7px 15px; width:50%;" align="left">
						Item
					</th>
					
					<th style="width:25%; font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 15px 7px;" align="center">
						Quantity
					</th>
					<th style="width:25%; font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 15px 7px;" align="right">
						Subtotal
					</th>
				</tr>
				@foreach($data['items'] as $item)
				<tr>
					<td style="width:50%; font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: left; padding: 0 15px 7px 15px;">
						{{ $item['name'] }}
					</td>
					
					<td style="width:25%; font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1.6; vertical-align: top; text-align: center; padding: 0 15px 7px;">
						{{ $item['quantity'] }}
					</td>
					<td style="width:25%; font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: right; padding: 0 15px 7px;">
						${{ number_format($item['retail_price'], 2) }}
					</td>
				</tr>
				@endforeach
			</table>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" style="max-width:480px; margin-left:auto; margin-right:auto; padding-top:50px;">
				<tr>
					<td style="padding-left: 15px; padding-right: 15px; font-size: 12px; color: #1e2b33; font-family: 'Open Sans', sans-serif; font-weight: 700; line-height: 1.6; vertical-align: top; text-align: left;">
						Subtotal: ${{ number_format($data['retail_costs']['subtotal'], 2) }}
					</td>
				</tr>
				<tr>
					<td style="padding-left: 15px; padding-right: 15px; font-size: 12px; color: #1e2b33; font-family: 'Open Sans', sans-serif; font-weight: 700; line-height: 1.6; vertical-align: top; text-align: left;">
						Tax: ${{ number_format($data['retail_costs']['tax'], 2) }}
					</td>
				</tr>
				<tr>
					<td style="padding-left: 15px; padding-right: 15px; font-size: 12px; color: #1e2b33; font-family: 'Open Sans', sans-serif; font-weight: 700; line-height: 1.6; vertical-align: top; text-align: left;">
						Shipping: ${{ number_format($data['costs']['shipping'], 2) }}
					</td>
				</tr>
				<tr>
					<td style="padding-left: 15px; padding-right: 15px; font-size: 12px; color: #1e2b33; font-family: 'Open Sans', sans-serif; font-weight: 700; line-height: 1.6; vertical-align: top; text-align: left;">
						Total: ${{ number_format($payment->amount, 2) }}
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="mdtable" style="max-width:480px; margin-left:auto; margin-right:auto; padding-top:50px;">
				<tr>
					  <td style="width:50%; font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; padding-left: 15px; padding-right: 15px;">
						<strong>BILLING INFORMATION</strong>
						<p style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; margin-top:10px; ">
					  {{$data['recipient']['name']}}<br> {{$data['recipient']['address1']}}, {{$data['recipient']['city']}}<br> {{$data['recipient']['country_name']}}<br> {{$data['recipient']['zip']}}<br> T: {{$data['recipient']['phone']}}
						</p>
					  </td>
					  
					  <td style="width:50%; font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top;padding-left: 15px; padding-right: 15px; ">
						<strong>PAYMENT METHOD</strong>
						<p style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top;margin-top:10px; ">
                                Stripe Transaction ID: <a href="#" style="color: #ff0000; text-decoration:underline;">{{$payment->payment_intent_id}}</a>
						</p>
					  </td>
				</tr>
			</table>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="mdtable" style="max-width:480px; margin-left:auto; margin-right:auto; padding-top:50px;">
				<tr>
					  <td style="width:50%; font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top;padding-left: 15px; padding-right: 15px; ">
						<strong>SHIPPING INFORMATION</strong>
						<p style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; margin-top:10px;">
							{{$data['recipient']['name']}}<br> {{$data['recipient']['address1']}}, {{$data['recipient']['city']}}<br> {{$data['recipient']['country_name']}}<br> {{$data['recipient']['zip']}}<br> T: {{$data['recipient']['phone']}}
						  </p>
					  </td>
					  <td style="width:50%; font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; padding-left: 15px; padding-right: 15px;">
						<strong>SHIPPING METHOD</strong>
						<p style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; margin-top:10px; ">
						{{$data['shipping']}}: {{$data['shipping_service_name']}}
						</p>
					  </td>

				</tr>
			</table>
			
			<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="mdbtable" style="max-width:480px; margin-left:auto; margin-right:auto; padding-top:50px; ">
					<tr>
						<th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 15px 7px 15px; width:50%;" align="left">
							Design Images
						</th>

						<th style="width:50%; font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 15px 7px 15px;" align="left">
							Type
						</th>
					</tr>
					@foreach($data['items'] as $item)
						@foreach($item['files'] as $file)
							<tr>
								<td style="width:50%; font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: left; padding: 0 15px 7px 15px;">
								<img src="{{ $file['url'] }}" alt="Design Image" style="width: 100px; height: auto;">
								</td>

								<td style="width:50%; font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 700; line-height: 1.4; vertical-align: top; text-align: left; padding: 0 15px 7px 15px;">
								{{ $file['type'] }}
								</td>
							</tr>
						  
						@endforeach
					@endforeach
				</tbody>
			</table>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" style="max-width:480px; margin-left:auto; margin-right:auto;">
				<tr>
			
					<td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left; padding-left: 15px; padding-right: 15px;">
                    Have a nice day.
					</td>
				</tr>
		</td>
	</tr>
</table>
</div>
</body>
</html>
