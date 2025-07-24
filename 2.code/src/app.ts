import express,{Request, Response} from "express";


console.log("Proceso al 1% |____");

//Crear instancia de Express
const app = express();
console.log("Proceso al 20% ||||____");
//gestionar rutas - endPoints
app.get("/",(request: Request, response: Response)=>{
    response.send("Good morning world");
});
console.log("Proceso al 80% |||||||_");
app.get("/check",(request: Request, response: Response)=>{
    response.send("A darle <3");
});

console.log("Proceso al 100% ||||||||");
export default app;