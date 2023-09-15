'use strict'

import {PeerRPCServer} from "grenache-nodejs-http";
import Link from "grenache-nodejs-link";

export default class ExchangeServer {
    /**
     * @param {string} action
     * @param {function} callback
     */
    onEvent(action, callback) {
        if (!this.events) {
            this.events = {};
        }

        this.events[action] = callback;
    }

    /**
     * @param {number} port
     */
    /**
     * @returns {string}
     * @returns {*}
     */
    listen(port) {
        const grape = process.env.GRAPE || '';
        if (!grape) {
            throw new Error('Missing grape url');
        }

        if (!port) {
            throw new Error('Missing port');
        }

        const link = new Link({grape});
        link.start();

        const peer = new PeerRPCServer(link, {timeout: 300000});
        peer.init();

        const service = peer.transport("server");
        service.listen(port);

        link.startAnnouncing("rpc_exchange", service.port, { interval: 1000, lan: true});

        service.on("request", (rid, key, payload, handler) => {
            console.log('payload received');
            if (this.events && this.events[payload.action]) {
                this.events[payload.action](rid, key, payload, handler);
            } else {
                handler.reply(null, 'No handler');
            }
        });
    }
}