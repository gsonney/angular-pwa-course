import {USER_SUBSCRIPTIONS} from "./in-memory-db";

const webpush = require('web-push');


export function sendNewsletter(req, res) {

    console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);
    console.log('All Newsletter subscriptions', JSON.stringify(USER_SUBSCRIPTIONS));

    const notificationPayload = {
        notification: {
            title: "Angular News",
            body: 'Newsletter Available!',
            icon: 'assets/main-page-logo-small-hat.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '-push-notification'
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Go to the site'
                },
                {
                    action: 'close',
                    title: 'Close the notification'
                },
            ]
        }
    };

    Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(sub, JSON.stringify(notificationPayload))))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });


}

