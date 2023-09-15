'use strict'

import OrderBook from "./orderBook.js";
import Order from "../entities/order.js";

const orderBook = new OrderBook();

export default {
    submitLimitOrder(side, price, size) {
        const order = new Order(side, price, size);
        console.log(`Submitting order: ${JSON.stringify(order)}`)

        if (order.side === Order.SIDE_OPTIONS.BUY) {
            const bestAsk = orderBook.getBestAsk();
            if (bestAsk && order.price.greaterThanOrEqualTo(bestAsk.price)) {
                orderBook.fillAsk(order);
            }

            if (order.isFilled()) {
                return;
            }

            orderBook.addBid(order);
        } else {
            const bestBid = orderBook.getBestBid();
            if (bestBid && order.price.lessThanOrEqualTo(bestBid.price)) {
                orderBook.fillBid(order);
            }

            if (order.isFilled()) {
                return;
            }

            orderBook.addAsk(order);
        }
    },

    listOrders() {
        return orderBook.getAsks().concat(orderBook.getBids());
    }
}