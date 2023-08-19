from http.server import BaseHTTPRequestHandler
import ccxt
import os
import json

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        post_data = json.loads(post_data)

        symbol = post_data['symbol']
        side = post_data['side']  # BUY or SELL
        amount = float(post_data['amount'])
        price = float(post_data['price'])

        exchange = ccxt.binance({
            'apiKey': "cd7c7de7b3068e692c46194d62f2b58031fa7961456edbd65f5e9bacb2eb7f33",
            'secret': "85db7398d30172cad2d2cf0c44ee43e846e00747bb75eea2bf3c16ca4186b50c",
            'enableRateLimit': True,
            'options': {
                'defaultType': 'future',
            },
        })
        exchange.set_sandbox_mode(True)
        exchange.verbose = True

        order = exchange.create_order(symbol=symbol,
                                      side=side,
                                      type='limit',
                                      amount=amount,
                                      price=price)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(order).encode())
        return
