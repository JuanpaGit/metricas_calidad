import express from "express";
import http from "http";
import app from "./app";

console.log("Hola mundo");



const server = http.createServer(app);
const PORT = process.env.PORT || 4100;


server.listen(PORT, () =>{
    console.log(`Server on http://localhost:${PORT}`);
});