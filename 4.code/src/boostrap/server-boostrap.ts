import express from "express";
import http from "http";


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
            const PORT = process.env.PORT || 4130;

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

