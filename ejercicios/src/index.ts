//Archivo de aplicacion de ejercicios de la declaracion de tipos de datos vistos en la sesion
let edad: number = 25;
let precio: number = 30.23;
let binario: number = 0b101010;
let hexadecimal: number = 0x1f;
let octal: number = 0o744;
let nombre: string = "Anita";
let nulo: null = null;
let indefinido: undefined = undefined;

/*
number = Puede almacenar cualquier tipo de numero, sea int, double u otras variaciones de numeros de sistemas como binario o Hexadecimal
null = Representa un valor nullo, osea invalido mas no 0
undefined = Representa un valor no definido, es decir, se desconoce que valor representa
*/

//Especiales

let dato: any = 12;
dato = "Soy un dato tipo Any"
dato = false;

let desconocido: unknown = "Soy el dato desconocido";

if (typeof desconocido === "string"){
    console.log(desconocido.toUpperCase());
}

function saludar(): void {
    console.log("Good morning world");
}

//Lanzar un error que nunca termina
function generarError(mnesaje: string):never {  
    throw new Error(mnesaje);
}

//Cuanto entra en un bucle infinito
function bucleInfinito(): never{
    while (true) {
        console.log("Esto no tiene un final")
    }
}

//En validacion exhaustiva de tipos (switch, if)
type Forma = "triangulo" | "cuadrilatero";

function procesarForma(forma: Forma){
    switch(forma){
        case "cuadrilatero":
            console.log("Es un cuadrilatero");
            break;
        case "triangulo":
            console.log("Es un triangulo");
            break;
        default:
            const _exhaustivo: never = forma;
            break;   
    }
}

//Datos compuestos

let numeros: number[] = [1,2,3,4,5,6,7,8,9];
let frutas: string[] = ["banana","mangostino","lychee","mora"];
let booleanos: boolean[] = [true,false,false,true];
let numeros2: Array<number> = [1,3,4,6,7,8,0];

type Producto = {nombre: string; precio: number};

let catalogo: Producto[] = [
    {nombre: "Chaqueta", precio: 100},
    {nombre: "Short", precio: 35}
];

//Acceder a un valor
let primero = frutas[0];

//Actualizar valor
numeros[1] = Math.pow(2,5);

//Agregar un valor
frutas.push("melon");
numeros.push(5);

//Iterar

for (let f of frutas){
    console.log(f);
}

for (let i =0; i< numeros.length; i++) {
    console.log(numeros[i]);
}

/*
    Otros metodos utiles para manipular Arrays
    push() Agregar un elemento al final
    pop() Eliminar el ultimo elemento
    shift() Eliminar el primer elemento
    unshift() Agregar elemento al inicio
    map() Transforma cada elemento
    filter() Filtra elementos segun la condicion
    find() Devueleve el primer elemento que coincida
    forEach() Ejecuta una funcion por cada elemento
*/

//Tuplas

let persona : [string,number,boolean] = ["Fabian", 20 , true];
let coordenada: [number, number] = [13.435, -234.654];

//Retornar multiples valores

function dividir(a: number, b: number): [number,number]{
    return [Math.floor(a/b), a%b]; //Cociente y residuo
}

//Enumeraciones

enum Color{
    Amarillo,
    Azul,
    Rojo
}

let c: Color = Color.Azul;

enum Estado{
    Activo = "ACTIVO",
    Inactivo = "INACTIVO"
}

console.log(Estado.Activo); // "ACTIVO"

//Objeto literal

let usuario:
{
    nombre: string;
    edad: number
} = {
    nombre: "Juanita",
    edad: 45
}

//Alias

type Usuario ={
    nombre: string;
    edad: number;
    activo: boolean;
}

let user1: Usuario ={
    nombre: "Mariana",
    edad: 60,
    activo: true,
};

//Con un primitivo

type ID = number;
let userid: ID = 113;

//Uniones
type Resultado = "ok" |  "error"  | "pendiente";
let estado: Resultado = "ok";

//Tuplas
type Coordenada = [x: number, y: number];
let punto: Coordenada = [100, 500];

//Funciones
type Sumar = (a:number, b:number) => number;
const suma: Sumar = (x,y) => x + y;

//Interfaces

interface Product {
    readonly id: number;
    nombre: string;
    precio: number;
    descuento?: number;
    comprar: (cantidad: number) => number;
    baja: () => void;
    actualizar(): boolean;
}
 
//Uniones y literales

//Uniones
let id: number | string;

id = 14;
id = "Hola, soy una variable de Type Script .0.";

//Literales

let direccion: "izquierda" | "derecha";
direccion="izquierda";

/*
    function = definir tipo de funciones
    record<K,T> = Crear objetos con claves especificas
    readonly<T> = Hacer propiedades inmutables
    partial<T> = Volver propiedades opcionales
    required<T> = Volver propiedades obligatorias
    pick<T,K> = seleccionar propiedades especificas
    omit<T,K> = excluir una propiedad
    exclude<T,U> = eliminar tipos de una union
    nonNullable<T> = quitar null y undefined
    typeof / keyof = reflejar tipos de variables y claves de objetos
    asserts = verifivavion de tipo personalizadas
*/