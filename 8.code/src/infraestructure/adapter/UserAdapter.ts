import { Repository } from "typeorm";
import { User } from "../../domain/User";
import { UserPort } from "../../domain/UserPort";
import { UserEntity } from "../entities/UserEntity";
import { AppDataSource } from "../config/con_data_base";
import { object } from "joi";

export class UserAdapter implements UserPort{
    private userRepository: Repository<UserEntity>;

    constructor(){
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }
    private toDomain(user: UserEntity): User{
        return{
            id: user.id_user,
            name: user.name_user,
            email: user.email_user,
            password : user.password_user,
            status: user.status_user
        }

    }
    private toEntity(user: Omit<User,"id">):UserEntity {
        const userEntity= new UserEntity();
        userEntity.name_user = user.name;
        userEntity.email_user =user.email;
        userEntity.password_user = user.password;
        userEntity.status_user  = user.status;
        return userEntity;
    }
    async createUser(user: Omit<User, "id">): Promise<number> {
        try {
            const newUser= this.toEntity(user);
            const savedUser = await this.userRepository.save(newUser);
            return savedUser.id_user;
        } catch (error) {
            console.error("Error creando usuario. OnO", error);
            throw new Error("Error creando usuario. OnO")
        }
    }
    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id_user:id}});
            if(!existingUser){
                throw new Error("Usuario no encontrado o.o");
            }
            //actializar los atributos-Propiedades enviadas
            Object.assign(existingUser,{
                name_user: user.name ?? existingUser.name_user,
                email_user: user.email ?? existingUser.email_user,
                password_user: user.password ?? existingUser.password_user,
                status_user: 1
            }
            );
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error actualizando al ususario :|", error);
            throw new Error("Error actualizando al usuario :|")
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id_user:id}});
            if(!existingUser){
                throw new Error("Usuario no encontrado o.o");
            }
            Object.assign(existingUser,{
                status_user:0
            });
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error Borrando al ususario :<", error);
            throw new Error("Error Borrando al usuario :<")
            
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.find();
            return users.map(this.toDomain);
        } catch (error) {
            console.error("Error buscando usuarios. OnO", error);
            throw new Error("Error buscando usuarios. OnO")
        }
    }
    async getUserById(id: number): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({where:{id_user:id}});
            return user ? this.toDomain(user):null;
        } catch (error) {
            console.error("Error buscando usuario por id:. OnO", error);
            throw new Error("Error buscando usuario por id. OnO")
        }
    }
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({where:{email_user:email}});
            return user ? this.toDomain(user):null;
        } catch (error) {
            console.error("Error buscando usuario por email:. OnO", error);
            throw new Error("Error buscando usuario por email. OnO")
        }
    }

}