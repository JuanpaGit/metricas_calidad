//GOLD SHIP
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_HOST),
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
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