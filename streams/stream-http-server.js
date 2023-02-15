import http, { request } from 'node:http';
import {Transform } from 'node:stream';

class ConvertNumberStream extends Transform {
    _transform(chunk, encoding,callback){
        const trasnf = Number(chunk.toString()) * -1;
        callback(null,Buffer.from(String(trasnf)));
    }

}
// request = readable stream
//response = writable stream

const server = http.createServer(async (request,response)=>{
    const buffers = [];
    for await (const chunk of request){
        buffers.push(chunk)
    }

    const fullBody = Buffer.concat(buffers).toString();
    return response.end(fullBody);
    // return request
    // .pipe(new ConvertNumberStream())
    // .pipe(response)
})

server.listen(3334)