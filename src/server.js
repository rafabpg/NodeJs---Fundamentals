import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
//common JS = require
//ES/modules = import , porem o node nao suporta
//para diferenciar um modulo terceiro para um modulo interno se utiliza a sintaxe com node:
//stateful = sempre tem alguma inf guardada na memoria
//stateless = dsalva inf em dispositiovs externos , BD
//passar a array para JSON

//cabeçalhos = sao metadados - info adicionais e como esses dados podem ser interpretados pelo back ou frontend



const database = new Database()
const server  = http.createServer(async (request,response)=>{
    const { method,url} = request;
    // console.log(method,url)

    await json(request, response);

    console.log(fullBody.name);

    if(method === 'GET' && url === '/users'){
        const users = database.select('users');
        return response.end(JSON.stringify(users));
    } 
    if(method === 'POST' && url === '/users') {
        const { name,email} = request.body;
        const user = {
            id:randomUUID(),
            name,
            email
        }
        database.insert('users',user);
        return response.writeHead(201).end()
    }
    return response.writeHead(404).end()

})

server.listen(3333,()=>{console.log("server running")});