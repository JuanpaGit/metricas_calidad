import { ServerBoostrap } from "./infraestructure/boostrap/server-boostrap";
import app from "./infraestructure/web/app";
import { connectDB } from "./infraestructure/config/con_data_base";

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
    await connectDB();
    const instances = [server.init()];
    await Promise.all(instances);
  } catch (error) {
    console.error("Error arrancando el server:", error);
  }
})();
