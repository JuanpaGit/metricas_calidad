### **Explicación de cada sección**
 
1. **Primer Proyecto en Node.js con Express**:
   - Primer Proyecto paso a paso para la generación de los archivos e instalación de Framework Express
   
 
2. **Tabla de Contenidos**:
 
   - Facilita la navegación dentro del archivo README.
 
3. **Instalación de dependencias y generación de archivos**:
 
    - npm init -y
    - npm i -g typescript // Esto tiene inferencia global
    - npm install --save-dev typescript // esto tiene inferencia local en el proyecto
    - Verificar quedo instalada tsc -v
    - tsc --init
 
4. **Configuración de Archivo tsconfig**:
 
   - Descomentar rootDir, sourceMap, outDir
   - incorporar:
    "include": ["src/**/*", "src/index.ts"],
    "exclude": ["node_modules", "dist"]
 
5. Instalación de Express
    - npm i express
    - npm i -g --save-dev @types/express
    - npm install -g ts-node
    - para ejecutar los ts por consola y se ejecuta con el comando ts-node index.ts

    ### **Explicación de cada sección**
 
- Ahora mejoramos el código colocando las rutas en un archivo, es decir aquí estamos modularizando
 
### **Configuramos Nodemon que nos permite mantener el servidor arriba así hagamos cambios**
- se realiza la instalación de Nodemon como dependencia de desarrollo
- npm i -D nodemon o npm i --save-dev nodemon
- crear en la raíz del proyecto un archivo llamado nodemon.json
{
    "watch": ["src"],
    "ext": "ts json",
    "ignore": ["src/**/*.spec.ts","node_modules"],
    "execMap": {
        "ts":"ts-node"
    },
    "verbose": true,
   "restartable": "rs"
   
}
 
### Configurar el scripts en el pagkage.json
"scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts"
  }