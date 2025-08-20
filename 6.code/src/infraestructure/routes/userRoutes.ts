import { Router, Request, request } from 'express';
import { UserAdapter } from "../adapter/UserAdapter";
import { UserApplication } from "../../application/UserApplication";
import { UserController } from "../controller/UserController";

//Express
const router = Router();

//Inicializar capas
const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);

//Definicion de rutas -> endPoints -> Especificacion de URL

router.post("/users",async (request,response)=>{
    try {
        await userController.registerUser(request,response);
    } catch (error) {
        console.error("Error en el usuario:",error);
        response.status(400).json({message: "Error en la creacion del usuario, la matrix fallo"});
    }
});

router.get("/users",async (request,response)=>{try {
        await userController.allUser(request,response);
    } catch (error) {
        console.error("Error en usuarios:",error);
        response.status(400).json({message: "Error en los usuarios,ya valio queso"});
    }
});

router.put("/users/:id",async(request,response)=>{
    try {
        

        await userController.updateUser(request,response);
    } catch (error) {
        console.error("Error en actualizar usuario:",error);
        response.status(400).json({message: "Error en el usuario,ya valio queso"});
    }
});

router.get("/users/searchUser",async (request,response)=>{try {
        await userController.searchUser(request,response);
    } catch (error) {
        console.error("Error en usuario:",error);
        response.status(400).json({message: "Error en el usuario"});
    }
});

router.delete("/users/:id",async(request,response)=>{
    try {
    
        await userController.downdUser(request,response);
    } catch (error) {
        console.error("Error en actualizar usuario:",error);
        response.status(400).json({message: "Error en el usuario,ya valio queso"});
    }
});



export default router;