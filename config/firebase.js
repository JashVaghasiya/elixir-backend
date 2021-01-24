import admin from 'firebase-admin'
import serviceAccount from '../config/elixir-fbae4-firebase-adminsdk-fl3gg-ac5eadc2cc.json'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
