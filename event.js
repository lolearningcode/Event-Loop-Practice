const EventEmitter = require('events');
const http = require('http');

//class inheritance
//sales inherits from EventEmitter
class Sales extends EventEmitter {
    //similar to init in Swift
    constructor() {
        //super gets access to all of the methods in the parent class
        super();
    }

}

const myEmitter = new Sales();

//.on means the code is listening for an event
myEmitter.on("newSale", () => {
    console.log("There was a sale!");
});

myEmitter.on("newSale", () => {
    console.log("Customer named: Capo!");
});

myEmitter.on("newSale", stock => {
    console.log(`There are ${stock} left in inventory`)
});

myEmitter.emit("newSale", 9);

///////////////////////
//Server
//server can only send one request
const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request received');
    console.log(req.url);
    res.end('Request received');
});

server.on('request', (req, res) => {
    console.log('Another Request received');
});

server.on('close', () => {
    console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests....');
});