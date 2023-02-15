import { Database } from "./database"
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build_route_path";

const database = new Database()
export const routes =  [
    {
        method:'GET',
        path:buildRoutePath('/users'),
        handler: (request,response) => {
            const users = database.select('users');
            return response.end(JSON.stringify(users));
        }
    },
    {
        method:'POST',
        path:buildRoutePath('/users'),
        handler: (request,response) => {
            const { name,email } = request.body;
            const user = {
                id:randomUUID(),
                name,
                email
            }
            database.insert('users',user);
            return response.writeHead(201).end()
        }
    },
    {
        method:'DELETE',
        path:buildRoutePath('/users/:id'),
        handler: (request,response) => {
            const { id } = request.params;
            database.delete('users',id);
            response.writeHead(204).end();
        }
    }
]