# Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.

Cada paso de su configuración ya se ha realizado previamente en el curso, por lo que solo es necesario clonar el proyecto y comenzar a trabajar.


## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo



## NOTAS:

*La version antigua, sin inicializacion de rutas mediante metodo setRoutes, esta contenida en la rama 
"restfulApi-no-routes-initialization"

*La diferencia entre inicializar las rutas dentro de server.ts  o inicializarlas mediante el metodo .setROutes(), es que, la primera opcion inicializa las rutas al momento de instanciar Server o crear el server, esto dificulta el configurar cosas extra como __websockets. En la segund alternativa, las rutas se inicializan despues de haber instanciado Server


# Funcionamiento entre pantallas de new-ticket.js y desk.js

new-ticket envia una peticion a la api, para que genere un nuevo ticket y luego el server, le envia la cantidad de tickets pendientes actualizado
a desk.js mediante websockets