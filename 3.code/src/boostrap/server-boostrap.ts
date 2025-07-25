import express from "express";
import http from "http";


export class ServerBoostrap{
    //Atributos - propiedades - caracteristicas
    private app!: express.Application;
    
    //Constructor
    constructor(app:express.Application){
        this.app = app;
    }

    init(){
        const server = http.createServer(this.app);
        const PORT = process.env.PORT || 4130;

        server.listen(PORT,()=>{
            console.log(`Server on http://localhost:${PORT}`);
        })
    }

}

