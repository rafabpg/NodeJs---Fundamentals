import { response } from 'express';
import {Readable } from 'node:stream';

class OneToHundreadStreams extends Readable{
    index = 1;
    _read(){
        const i = this.index++;
        
        if(i>100){
            this.push(null);        
        }else{
            const buf = Buffer.from(String(i))
            this.push(buf);
        }
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundreadStreams(),
    duplex: 'half' // adicione essa linha
}).then(
    response => {return response.text()}
).then(data => console.log(data))