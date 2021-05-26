const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { Client } = require('pg')

const app = express();
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
            "body": "Subscribete a mi canal de YOUTUBE",
            "vibrate": [100, 50, 100],
            "image": "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
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

    res.send({ data: 'Se envio subscribete!!' })

}

app.route('/api/enviar').post(enviarNotificacion);


const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});
