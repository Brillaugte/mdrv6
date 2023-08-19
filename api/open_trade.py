from http.server import BaseHTTPRequestHandler
import json
from initialize_ccxt import initialize_ccxt

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        post_data = json.loads(post_data)

        symbol = post_data['symbol']
        side = post_data['side']
        amount = float(post_data['amount'])
        price = float(post_data['price'])

        exchange = initialize_ccxt()

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
