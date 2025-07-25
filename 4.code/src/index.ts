import { ServerBoostrap } from './boostrap/server-boostrap';
import app from "./app"


console.log("Hola mundo");

/*
    async - await
*/
const server = new ServerBoostrap(app);

const start = async ()=>{
    try{
        const instances =[server.init()];
        await Promise.all(instances);
    }catch(error){
        console.error("Error arrancando el server:", error)
    }
}

start();