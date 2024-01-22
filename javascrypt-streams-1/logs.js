const EventEmitter = require('events').EventEmitter


const emitter = new EventEmitter();

const log = (msg) => {
    console.log(msg);
}

emitter.emit('message', { text: "Hello, world!", name: "Сергей" });

module.exports = log;