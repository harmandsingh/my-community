import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize firebase admin
admin.initializeApp();
// Get the database
const db = admin.firestore();

// Adds the user data to "users" collection in firestore when a new user is created
export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    db.collection("users")
      .doc(user.uid) // Stores users using their uid
      .set(JSON.parse(JSON.stringify(user)));
  });
