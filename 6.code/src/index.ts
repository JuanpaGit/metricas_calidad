import { ServerBoostrap } from "./infraestructure/boostrap/server-boostrap";
import app from "./app";

console.log("Hola mundo");

const server = new ServerBoostrap(app);
/*
    async - await



const start = async ()=>{
    try{
        const instances =[server.init()];
        await Promise.all(instances);
    }catch(error){
        console.error("Error arrancando el server:", error)
    }
}

start();
*/

(async () => {
  try {
    const instances = [server.init()];
    await Promise.all(instances);
  } catch (error) {
    console.error("Error arrancando el server:", error);
  }
})();
