import express from "express";
import http from "http";

console.log("Hola mundo");

//Crear instancia de Express

const app = express();

/*
*iniciar un servidor por el puerto 4100
*/

const server = http.createServer(app);
/*server.listen(4100/*Primer parametro = puerto,/*Funcion anonima function(){


});*/

server.listen(4100/*Primer parametro = puerto*/,/*Funcion anonima*/ () =>{
    console.log(`Server on http://localhost:4100`);
});

