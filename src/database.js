import fs from 'node:fs/promises';

const databaseURL  = new URL('../db.json',import.meta.url);

export class Database{
    #database = {};

    constructor(){
        fs.readFile(databaseURL,'utf-8').then(data=>{
            this.#database = JSON.parse(data);
        })
        .catch(()=>{
            this.#persist();
        })
    }

    #persist(){
        fs.writeFile(databaseURL,JSON.stringify(this.#database));
    }

    select(table,search){
        let data = this.#database[table] ?? [];

        if(search) {
            data = data.filter(row =>{
                return Object.entries(search).some(([key,value]) => {
                    return row[key].includes(value)
                })
            })

        }
        return data;
    };

    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data);
        }else{
            this.#database[table] = [data]
        }
        this.#persist();

        return data;
    };
    
    delete(table,id){
        const index = this.#database[table].findIndex(row => row.id == id);
        if(index > -1){
            this.#database[table].splice(index,1);
            this.#persist();
        }

    }
    update(table,id,data){
        const index = this.#database[table].findIndex(row => row.id == id);
        if(index > -1){
            this.#database[table][index] = {id, ...data};
            this.#persist();
        }
    }

}