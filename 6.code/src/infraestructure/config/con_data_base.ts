//GOLD SHIP
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import envs from "../config/environment-vars";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: envs.DB_HOST,
    port: Number(envs.DB_HOST),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: true,
    logging: true,
    entities:[UserEntity]
});

// Conectar a la base de datos

export const connectDB = async ()=>{
    try {
        await AppDataSource.initialize();
        console.log("Base de datos conectada, wuju!");
    } catch (error) {
        console.error("Ya valio la conexion con esa Base de datos, estamos perdidos");
        process.exit(1);
    }
}