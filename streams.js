//STREAMS
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //Solution 1 This will overload the memory due to the size of the data. Only works on small amounts of data
    // fs.readFile("test-file.txt", (err, data) => {
    //     //Error handling
    //     if (err) console.log(err);
        
    //     res.end(data);

    // });

    //Solution 2 Using Streams - consumes large amounts of data and sends it to the user piece by piece. Similar to streaming services where the whole file isn't downloaded. It's presented but shown as needed
    // const readable = fs.createReadStream('test-file.txt');


    // readable.on('data', chunk => {
    //     res.write(chunk);
    // });

    // //When the data is finished. No more data to stream so the loop can end
    // readable.on('end', () => {
    //     res.end();
    // });

    // //Error handling and server error code is 500
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not found!');
    // });

    //Solution 3: Pipe Operator - fixes the back pressure and the overwhelming of the response stream. Back pressure happens when response cannot send the data as fast as its receiving the response from the file. Like streaming but with the back pressure

    const readable = fs.createReadStream('test-file.txt');
    //readableSource.pipe(writeableDest);
    readable.pipe(res);
});
//Start the server with listen()
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening.....');
});