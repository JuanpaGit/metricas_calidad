import { ServerBoostrap } from './boostrap/server-boostrap';
import app from "./app"


console.log("Hola mundo");

const server = new ServerBoostrap(app);
server.init();