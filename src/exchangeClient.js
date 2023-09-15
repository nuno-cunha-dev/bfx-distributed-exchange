'use strict'

import {PeerRPCClient} from 'grenache-nodejs-http';
import Link from 'grenache-nodejs-link';

export default class ExchangeClient {
    static instance;

    constructor() {
        const grape = process.env.GRAPE || '';
        if (!grape) {
            throw new Error('Missing grape url');
        }

        const link = new Link({grape});
        link.start();

        this.peer = new PeerRPCClient(link, {});
        this.peer.init();
    }

    static getInstance() {
        if (!ExchangeClient.instance) {
            ExchangeClient.instance = new ExchangeClient();
        }

        return ExchangeClient.instance;
    }

    async sendEvent(action, payload) {
        return new Promise((resolve, reject) => {
            console.log('sending payload');
            this.peer.request("rpc_exchange", {action, payload}, {timeout: 100000}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}