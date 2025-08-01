import express,{Request, Response} from "express";

class App{
    private app!: express.Application;
    constructor(){
        this.app = express();
        this.routes();
    }

    private routes():void{
        console.log("Proceso al 1% |____");

        //Crear instancia de Express
      
        console.log("Proceso al 20% ||||____");
        //gestionar rutas - endPoints
        this.app.get("/",(request: Request, response: Response)=>{
            response.send("Good morning world");
        });
        console.log("Proceso al 80% |||||||_");
        this.app.get("/check",(request: Request, response: Response)=>{
            response.send("A darle <3");
        });

        console.log("Proceso al 100% ||||||||");
    }
    getApp(){
        return this.app;
    }
}

export default new App().getApp();