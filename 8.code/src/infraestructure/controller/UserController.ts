import { Request, Response } from 'express';
import { UserApplication } from "../../application/UserApplication";
import {User} from "../../domain/User";
import {regex} from "../../util/validaciones";

export class UserController{
    private app: UserApplication;
    constructor(app: UserApplication){
        this.app = app;
    }

    async login(req: Request, res: Response): Promise<string | Response>{
        try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "Email y contraseña son requeridos" });
    
        // Validación de email
        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email))
            return res.status(400).json({ error: "Correo electrónico no válido" });
    
        // Validación de contraseña
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
            return res.status(400).json({
            message:
                "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
            });
    
        const token = await this.app.login(email, password);
        return res.status(200).json({ token });
        
        } catch (error) {
        return res.status(401).json({ error: "Credenciales inválidas" });
        }
    
    
    }
    
    
    async registerUser(request: Request, response: Response): Promise<Response>{
        const {name,email,password}= request.body;
        try {
            //validaciones con expresiones regulares o regex
            if(!regex.name.test(name.trim())){
                return response.status(400).json({message:"Nombre invalido"});
                
            }
            if (!regex.email.test(email))
                return response.status(400).json({ error: "Correo electrónico no válido" });
 
            if (!regex.password.test(password))
                return response.status(400).json({
                error:
                "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });
            const  status = 1;
            const user: Omit<User,"id">={name,email,password,status};
            const userId = await this.app.createUser(user);
        
            return response
            .status(201)
            .json({message:"Usuario registrado correctamente:", userId});
        } catch (error) {

            if(error instanceof Error){
                console.log(error);
                return response.status(500).json({message:"Error en el server."})
            }   
        }
        return response.status(400).json({message:"Error en la peticion."});
    }

    async searchUser(request: Request, response: Response): Promise<Response> {
        try {
            const { id, email } = request.query;

            if (id) {
                const userId = parseInt(id as string);
                if (isNaN(userId)) {
                    return response.status(400).json({ message: "ID invalido"});
                }
                const user = await this.app.getUserById(userId);
                if (!user) {
                    return response.status(404).json({ message: "Usuario no encontrado."});
                }
                return response.status(200).json(user);
            }

            if (email) {
                const userEmail = email as string;
                if (!regex.email.test(userEmail)) {
                    return response.status(400).json({ message: "Correo electrónico inválido" });
                }

                const user = await this.app.getUserByEmail(userEmail);
                if (!user) {
                    return response.status(404).json({ message: "Usuario inexistente" });
                }
                return response.status(200).json(user);
            }
            return response.status(400).json({ message: "Debe enviar un parámetro de búsqueda (id o email)" });
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ message: "Error en el server."});
            }
        }
        return response.status(400).json({ message: "Error en la petición." });
    }


    async searchUserById(request: Request,response: Response): Promise<Response> {
        try {
            const userId = parseInt(request.params.id);
            if (isNaN(userId))
                 return response.status(400).json({ message: "Error en el parametro." });
            const user = await this.app.getUserById(userId);
            if (!user) {
                 return response.status(404).json({ message: "Usuario no existe." });
            }
            return response.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                 return response.status(500).json({ message: "Error en el servidor" });
            }
        }
         return response.status(400).json({ message: "Error en la petición." });
    }

    async searchUserByEmail(request: Request,response: Response): Promise<Response> {
        try {
            const { email } = request.params;
            if (!regex.email.test(email))
                 return response.status(400).json({ message: "Correo electronico invalido" });
            const user = await this.app.getUserByEmail(email);
            if (!user) {
                 return response.status(404).json({ message: "El usuario no existe." });
            }
            return response.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({ message: "Error en el servidor." });
            }
        }
         return response.status(400).json({ message: "Error en la petición." });
    }


    async allUser(request:Request,response:Response):Promise<Response>{
        try {
            const users = await this.app.getAllUsers();
            return response.status(200).json(users);
        } catch (error) {
             if(error instanceof Error){
                return response.status(500).json({message:"Error en el server."})
            }   
        }
        return response.status(400).json({message:"Error en la peticion."});
    }
    
    async downdUser(request:Request,response:Response):Promise<Response>{
        try {

            const userId = parseInt(request.params.id);
            if(isNaN(userId))
                return response.status(400).json({message:"Error en el parametro"});

            const user = await this.app.deleteUser(userId);
            if(!user){
                return response.status(404).json({message:"Usuario no encontrado."});
            }
            return response.status(200).json({message:"usuario eliminado con exito exitoso"})
            
        } catch (error) {
            if(error instanceof Error){
                return response.status(500).json({message:"Error en el server."})
            }   
        }
        return response.status(400).json({message:"Error en la peticion."});
    }

    async updateUser(request:Request,response:Response):Promise<Response>{
        try {
            const userId = parseInt(request.params.id);
            if(isNaN(userId)) return response.status(400).json({message:"Error en el parametro"});
            
            let {name,email,password,status} = request.body;
             // Validaciones antes de actualizar
            if (name && !regex.name.test(name.trim()))
                return response.status(400).json({
                    message:
                    "El nombre debe tener al menos 3 caracteres y solo contener letras",
                });
 
            if (email && !regex.email.test(email.trim()))
                return response.status(400).json({ message: "Correo electrónico no válido" });
        
            if (password && !regex.password.test(password.trim()))
                return response
                .status(400)
                .json({
                    message:
                    "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número",
                });
 
            status = 1;
            const updated = await this.app.updateUser(userId,{
                name,
                email,
                password,
                status
            });
            if (!updated) return response.status(400).json({message:"Usuario no encontrado, cambios no aplicados"});

            return response.status(200).json({message:"Usuario actualizado con exito exitoso."})
        } catch (error) {
             if(error instanceof Error){
                return response.status(500).json({message:"Error en el server."})
            }   
        }  
                return response.status(400).json({message:"Error en la peticion."});      
    }
}
    