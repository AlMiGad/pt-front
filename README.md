## Antes de Empezar
Debes realizar la instalación de todos los paquetes de NODE, puedes ejecutar:
#### `npm install`
Si te da algun error con la sentencia 'concurrently', prueba a ejecutar:
#### `npm i concurrently`

## Scripts Disponibles

Dentro del proyecto puedes lanzar los siguientes comandos

### `npm start`

Ejecuta la applicación en modo desarrollo. Gracias a la sentencia "concurrently", al lanzar la instrucción se generarán
dos servidores:
 - Uno en [http://localhost:3000](http://localhost:3000) para ejecutar la aplicación.
 - Otro en [http://localhost:8000](http://localhost:8000) para ejecutar la API REST (json-server).

## Docker
Este proyecto está disponible para ejecutar en Docker, puedes clonarlo en tu dispositivo en el siguiente enlace: 

[https://hub.docker.com/r/almigad/ptfront](https://hub.docker.com/r/almigad/ptfront)

O puedes ejecutar este comando para clonarlo directamente:

#### `docker pull almigad/ptfront`

A la hora de poner en marcha el Docker sera necesario abrir los puertos correspondientes a los dos servidores que se ejecutarán:
 - 3000:3000 y 8000:8000

La sentencia qudaría de la siguiente manera:
#### `docker run -d -p 3000:3000 -p 8000:8000 almigad/ptfront`

## API REST
Se puede configurar el host de la API REST en el fichero "src\api\api-config.js".

## Posibles Mejoras
Quedaría pendiente en la Aplicación añadir soporte en varios idiomas y la implementación de pruebas unitarias.


