## How to start

Copy the `.env.example` to `.env` and change the values if needed.

Run `npm install` to install the dependencies.

Run `npm run start` to start the server and the client.


## Implementation

Client and server implementation is done.

This distributed exchange app is a client and server to update the orderbook on itself and other clients.

On the index.js there is a server startup and a client startup.
There is also example on how we could send to the network some orders.
At the end of the file there is a function that will print the local orderbook which should be in sync with the other clients.


## Issues
I couldn't do a final test because at the end of this journey I started to get the **ERR_GRAPE_LOOKUP_EMPTY** error (it was working until 85% of the development time).
I tried to fix it but I couldn't find the problem. I think it is something related to reconnections or timeouts.
My Grapes servers are running on the same machine, so I used 127.0.0.1 as the address.


## Improvements
Add integration tests.
A distributed locking mechanism for the order.
We could add market orders / stop limit orders.
A web interface to interact with the exchange.
Multiple orderbooks for different markets.
