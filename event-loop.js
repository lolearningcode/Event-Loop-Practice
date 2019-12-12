//async non-blocking of event loops
const fs = require('fs');
//using cryptography
const crypto = require('crypto');

const start = Date.now();
//created a thread pool that keeps loops grouped together
process.env.UV_THREADPOOL_SIZE = 3

setTimeout(() => console.log('Timer 1 is finished'), 0);
setImmediate(() => console.log('Immediate 1 is finished'));

fs.readFile('test-file.txt', () => {
    console.log('I/O has finished');
    console.log('-------------');

    setTimeout(() => console.log('💥Timer 2 is finished'), 0);
    setTimeout(() => console.log('😎Timer 3 is finished'), 3000);
    setImmediate(() => console.log('👍🏿Immediate 2 is finished'));

    //next tick is part of the loop that gets executed after each phase in the microtest
    //nextTick happens before the next loop phase
    process.nextTick(() => console.log('Process.nextTick'));

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
});

console.log('Hello from the top-level code');