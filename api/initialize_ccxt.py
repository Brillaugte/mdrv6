import ccxt
import os

def initialize_ccxt():
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
    return exchange
