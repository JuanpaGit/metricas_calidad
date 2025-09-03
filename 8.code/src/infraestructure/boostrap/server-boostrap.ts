import express from "express";
import http from "http";
import envs from "../config/environment-vars";

export class ServerBoostrap{
    //Atributos - propiedades - caracteristicas
    private app!: express.Application;
    
    //Constructor
    constructor(app:express.Application){
        this.app = app;
    }

    init(): Promise<boolean>{
        return new Promise((resolve, reject)=>{
            const server = http.createServer(this.app);
            const PORT = envs.PORT || 4100;

            server.listen(PORT)
            .on("listening",()=>{
                console.log(`El server esta a toda maquina en el puerto: ${PORT}`);
                resolve(true);
            })
            .on("error", (err)=>{
                console.error(`Error iniciando el server en el puerto: ${PORT}`);
                reject(false);
            });
        });
        
    }

}

