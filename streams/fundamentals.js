// process.stdin
//     .pipe(process.stdout) //pipe forma de encaminhar
import {Readable ,  Writable, Transform} from 'node:stream';

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
// new OneToHundreadStreams().pipe(process.stdout)

class MultipleByTenStream extends Writable{
    _write(chunk,encoding,callback){
        //chunk  = pedço que leu na srteam dae leitura
        //encoding = como a inf esta codificada
        //callback = é a função que sera chamada quando a stream terminou oque tinha q fazer com aquela inf
        //stream de escrita apenas processa o dado nunca retorna nada
        console.log(Number(chunk.toString())*10)
        callback()
    }
}
//streams de tranformação servem para tranformar um dado me outro ou seja um chunk em outro]

class ConvertNumberStream extends Transform {
    _transform(chunk, encoding,callback){
        const trasnf = Number(chunk.toString()) * -1;
        callback(null,Buffer.from(String(trasnf)));
    }

}
//Buffer = forma de transicionar dados entre streams(forma de tipo de dado)
new OneToHundreadStreams() //so consegue ler dados dela 
.pipe(new ConvertNumberStream()) // le dados de um lugar e escrever dados para outro lugar 
.pipe(new MultipleByTenStream()) //escrever dados para ela 
