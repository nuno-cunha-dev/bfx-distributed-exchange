'use strict'

import Decimal from "decimal.js";

export default class Order {
    static SIDE_OPTIONS = {
        BUY: 'buy',
        SELL: 'sell',
    }

    /**
     * @param {Date} createdAt
     * @param {SIDE_OPTIONS} side - one of {'buy', 'sell'}
     * @param {string} price
     * @param {string} size
     */
    constructor(side, price, size) {
        this.createdAt = (new Date()).getTime();
        this.side = side;
        this.price = new Decimal(price);
        this.size = new Decimal(size);
        this.filled = new Decimal(0);
    }

    fill(size) {
        this.filled = this.filled.plus(size);
    }

    isFilled() {
        return this.filled.equals(this.size);
    }

    notFilledValue() {
        return this.size.minus(this.filled);
    }
}