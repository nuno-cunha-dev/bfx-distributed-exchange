'use strict'

import ExchangeClient from "./exchangeClient.js";
import ExchangeServer from "./exchangeServer.js";
import OrderController from "./controllers/orderController.js";
import 'dotenv/config';
import Order from "./entities/order.js";
import Exchange from "./services/exchange.js";
import exchange from "./services/exchange.js";

async function main() {
    console.log('Starting server');
    const server = new ExchangeServer();
    server.onEvent("submit_order", OrderController.submitOrder);
    server.listen(process.env.PORT || 1337);

    console.log('Submitting orders');
    await ExchangeClient.getInstance().sendEvent("submit_order", {
        side: Order.SIDE_OPTIONS.BUY,
        price: "100",
        size: "1"
    });
    await ExchangeClient.getInstance().sendEvent("submit_order", {
        side: Order.SIDE_OPTIONS.BUY,
        price: "101",
        size: "2"
    });
    await ExchangeClient.getInstance().sendEvent("submit_order", {
        side: Order.SIDE_OPTIONS.BUY,
        price: "101",
        size: "4"
    });
    await ExchangeClient.getInstance().sendEvent("submit_order", {
        side: Order.SIDE_OPTIONS.BUY,
        price: "103",
        size: "1"
    });
    await ExchangeClient.getInstance().sendEvent("submit_order", {
        side: Order.SIDE_OPTIONS.SELL,
        price: "104",
        size: "4"
    });
    await ExchangeClient.getInstance().sendEvent("submit_order", {
        side: Order.SIDE_OPTIONS.SELL,
        price: "101",
        size: "3"
    });

    console.log('Order book');
    console.log(exchange.listOrders());
}

main();