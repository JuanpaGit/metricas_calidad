import { UserPort } from '../domain/UserPort';
import { User } from "../domain/User";
import bcrypt from "bcryptjs";
import { AuthApplication } from './AuthApplication';

export class UserApplication{
    private port: UserPort;

    constructor(port: UserPort){
        this.port = port;
    }

    async login(email:string,password:string):Promise<string>{
        const existingUser = await this.port.getUserByEmail(email);
        if(!existingUser){
            throw new Error("Credenciales Inválidas");
        }
        const passwordmatch = await bcrypt.compare(password,existingUser.password);
        if(!passwordmatch){
            throw new Error("Credenciales Inválidas");
        }
        const token = AuthApplication.generateToken({
            id:existingUser.id,
            email:existingUser.email
        });
        return token;
    }

    async createUser(user:Omit<User,"id">):Promise<number>{
        const existingUser = await this.port.getUserByEmail(user.email);
        if(!existingUser){
            return await this.port.createUser(user);
        }
        throw new Error ("El usuario ya existe bro ._. .")
    }

    async updateUser(id:number,user:Partial<User>):Promise<boolean>{
        const existingUser = await this.port.getUserById(id);
        if(!existingUser){
            throw new Error ("Ese usuario no existe mas en este mundo, se fue con la huesuda")
        }
        if(user.email){
            const emailTaken = await this.port.getUserByEmail(user.email);
            if(emailTaken && emailTaken.id !== id){
                throw new Error ("Ese email no puede ser dominado por tu expansion de dominio :<");
            }
        }

        return await this.port.updateUser(id,user)
    }
    async deleteUser(id:number): Promise<boolean>{
        const existingUser = await this.port.getUserById(id);
        if(!existingUser){
            throw new Error("Ese usuario esta cosechando patata en otro server")
        }
        return await this.port.deleteUser(id);
    }
    async getUserById(id:number):Promise<User | null>{
        return await this.port.getUserById(id);
    }
    async getUserByEmail(email:string):Promise<User|null>{
        return await this.port.getUserByEmail(email)
    }
    async getAllUsers(): Promise<User[]>{
        return await this.port.getAllUsers();
    }
}