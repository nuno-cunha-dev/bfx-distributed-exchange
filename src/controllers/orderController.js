'use strict'

import exchange from '../services/exchange.js';

export default {
    async submitOrder(rid, key, payload, handler) {
        if (!payload.side || !payload.price || !payload.size) {
            handler.reply(null, 'Invalid payload');
            return;
        }

        console.log('Order received');
        exchange.submitLimitOrder(payload.side, payload.price, payload.size);
        handler.reply(null, 'Order submited');
    }
}