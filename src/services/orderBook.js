'use strict'

export default class OrderBook {
    constructor() {
        /** @type {Order[]} */
        this.asks = [];
        /** @type {Order[]} */
        this.bids = [];
    }

    /**
     * Adds a bid to the order book
     * @param {Order} order
     */
    addBid(order) {
        let i;
        for (i = 0; i < this.bids.length; i++) {
            if (order.price.greaterThan(this.bids[i].price)) {
                break;
            }

            if (order.price.equals(this.bids[i].price) && order.createdAt < this.bids[i].createdAt) {
                break;
            }
        }

        this.bids.splice(i, 0, order);
    }

    /**
     * Adds an ask to the order book
     * @param {Order} order
     */
    addAsk(order) {
        let i;
        for (i = 0; i < this.asks.length; i++) {
            if (order.price.lessThan(this.asks[i].price)) {
                break;
            }

            if (order.price.equals(this.asks[i].price) && order.createdAt < this.asks[i].createdAt) {
                break;
            }
        }

        this.asks.splice(i, 0, order);
    }

    getBestBid() {
        return this.bids[0];
    }

    getBestAsk() {
        return this.asks[0];
    }

    getBids() {
        return this.bids;
    }

    getAsks() {
        return this.asks;
    }

    /**
     * @param order
     */
    fillAsk(order) {
        let i;
        for (i = 0; i < this.asks.length; i++) {
            if (order.price.lessThan(this.asks[i].price)) {
                break;
            }

            if (order.price.equals(this.asks[i].price) && order.createdAt < this.asks[i].createdAt) {
                break;
            }

            if (order.filled.greaterThanOrEqualTo(order.size)) {
                break;
            }

            if (order.size.greaterThan(this.asks[i].size.minus(this.asks[i].filled))) {
                order.fill(this.asks[i].size.minus(this.asks[i].filled));
                this.asks[i].fill(this.asks[i].size.minus(this.asks[i].filled));
            } else {
                order.fill(order.size);
                this.asks[i].fill(order.size);
            }
        }

        this.asks = this.asks.filter(ask => ask.filled.lessThan(ask.size));
    }

    /**
     * @param order
     */
    fillBid(order) {
        let i;
        for (i = 0; i < this.bids.length; i++) {
            if (order.price.greaterThan(this.bids[i].price)) {
                break;
            }

            if (order.price.equals(this.bids[i].price) && order.createdAt < this.bids[i].createdAt) {
                break;
            }

            if (order.isFilled()) {
                break;
            }

            if (order.notFilledValue().greaterThan(this.bids[i].notFilledValue())) {
                const matchedSize = this.bids[i].notFilledValue();
                order.fill(matchedSize);
                this.bids[i].fill(matchedSize);
            } else {
                const matchedSize = order.notFilledValue();
                order.fill(matchedSize);
                this.bids[i].fill(matchedSize);
            }
        }

        this.bids = this.bids.filter(bid => !bid.isFilled());
    }
}