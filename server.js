const webpush = require('web-push');
const express = require('express')
const db = require('./queries')

const app = express();
const bodyparser = require('body-parser');

/*assuming an express app is declared here*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
/**
 * Settings VAPID
 */



const vapidKeys = {
    "publicKey": "BMtQTXeTAMb6dirLG0o2oMENske28eSfSRJkK6VEdXH9lcH3mwfEU7cza8hNhEnJOOyacb95QOeIFaTpPdFn8Xw",
    "privateKey": "eOLnIMyvDEhCWvwTOFax9MGbV0W8c_WTjZ_KCW1CREY"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {

    //console.log(db.getTokent); 
    const pushSubscription = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/dr4CZJxORFM:APA91bG3i1TEITd8fpV_FL-LDFvh6CkVT7LQo2o8-aflr20dXdQ0GTDJNSUDJuOPK11nHNQm16XKIVvs6VDJYvq2trI5spEWtO2oHawndZYX-x0XLAY_wUgWNtzgVhO3DoO3DxX-GsT2',
        keys: {
            auth: 'p62P4uw9gcFtcg1yo27Zmg',
            p256dh: 'BN9qRd0HqbSnhB1x_4GVFkFpHCuspgd_AhuLvOzWOiQLaINhFF7tT1Pdecq0kXzJZy634Fp56UZyA6GwVkHqaEM'
        }
    };

    const payload = {
        "notification": {
            "title": "😄😄 Saludos",
            "body": "Hola a todos",
            "vibrate": [100, 50, 100],
            "image": "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png",
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se envio notification!!' })

}

app.route('/api/enviar').post(enviarNotificacion);
app.get('/api/users', db.getUsers)
app.post('/api/llamada', db.createLlamada)
app.get('/api/llamadas', db.getLlamadas)
app.get('/api/llamada/:email', db.getLLamadaByCorreo)
app.delete('/api/llamada/:id', db.deleteLLamada)
app.delete('/api/llamada/correo/:email', db.deleteLLamadaByCorreo)

const PORT = process.env.PORT || 9000;
const httpServer = app.listen(PORT, () => {
    console.log("HTTP Server running at listening on port " + httpServer.address().port);
});
