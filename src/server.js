import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


//common JS = require
//ES/modules = import , porem o node nao suporta
//para diferenciar um modulo terceiro para um modulo interno se utiliza a sintaxe com node:
//stateful = sempre tem alguma inf guardada na memoria
//stateless = dsalva inf em dispositiovs externos , BD
//passar a array para JSON

//cabeçalhos = sao metadados - info adicionais e como esses dados podem ser interpretados pelo back ou frontend




const server  = http.createServer(async (request,response)=>{
    const { method,url} = request;
    // console.log(method,url)

    await json(request, response);

    console.log(fullBody.name);
    const route = routes.find(route=>{
        return route.method == method && route.path.test(url);
    })
    if(route){
        const routeParams = request.url.match(route.path);
        request.params = { ...routeParams.groups}
        
        return route.handler(request,response);
    }
    return response.writeHead(404).end();
})

server.listen(3333,()=>{console.log("server running")});