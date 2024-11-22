const admin = require("firebase-admin");
const path = require("path");

// Initialize Firebase Admin SDK
const serviceAccount = require("../blogwebsite-8464f-firebase-adminsdk-zxy5q-da7e769978.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "blogwebsite-8464f.appspot.com", // Replace with your Firebase project ID
});

// Get a reference to the Firebase Storage bucket
const bucket = admin.storage().bucket();
module.exports = {bucket};