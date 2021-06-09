# Servidor notificaciones push web (NODEJS) #


[![Y|onathan](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/yonathan)

### Token ###

- Cada navegador genera un endpoint(ep) y se guardar por cada usuario que acepte las notificaciones.
- solo se genera un ep por cada navegador.
- se puede mandar notificacion aunque el navegador este cerrado.

```node
const pushSubscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/dr4CZJxORFM:APA91bG3i1TEITd8fpV_FL-LDFvh6CkVT7LQo2o8-aflr20dXdQ0GTDJNSUDJuOPK11nHNQm16XKIVvs6VDJYvq2trI5spEWtO2oHawndZYX-x0XLAY_wUgWNtzgVhO3DoO3DxX-GsT2',
        keys: {
            auth: 'p62P4uw9gcFtcg1yo27Zmg',
            p256dh: 'BN9qRd0HqbSnhB1x_4GVFkFpHCuspgd_AhuLvOzWOiQLaINhFF7tT1Pdecq0kXzJZy634Fp56UZyA6GwVkHqaEM'
        }
    };
```  
  - Para generar el endpoint del token se utiliza PWA en angular
  - API(Spring) para guardar el token relacionado con el usuario

# BD

```node  
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cmp-prueba',
    password: 'sipirili',
    port: 5432,
})
```  

## Instalación

```bash
"express": "^4.17.1",
"pg": "^8.6.0",
"pg-promise": "^10.10.2",
"socket.io": "^4.1.2",
"web-push": "^3.4.4"
```

## Uso

```nodejs
const webpush = require('web-push');
const express = require('express')
const db = require('./queries')

const app = express();
```
## Tecnología

El servidor utiliza varios proyectos de código abierto para funcionar correctamente:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [jQuery] - duh

## Installacion

El servidor requiere [Node.js](https://nodejs.org/) v10+ to run.

Instale las dependencias y devDependencies e inicie el servidor.

```sh
cd pushwebnotifications
npm i
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```


## Development
Comando para ejecutar:

```sh
npm start
```

O :

```sh
nodemon server.js
```



```sh
const PORT = process.env.PORT || 9000;
const httpServer = app.listen(PORT, () => {
    console.log("HTTP Server running at listening on port " + httpServer.address().port);
});
127.0.0.1:9000
```
## API

```
app.route('/api/enviar').post(enviarNotificacion);

curl --location --request POST 'http://localhost:9000/api/enviar'
```

## License

MIT
