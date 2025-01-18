const admin = require("firebase-admin");

const serviceAccount = require("./mainak-trivedi-firebase-adminsdk-rwmkl-92ccbfac65.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mainak-trivedi-default-rtdb.firebaseio.com" 
});

const db = admin.database();

// Example: Write data to the database
const dbUsers = db.ref("users");
dbUsers.set({
    user1: {
        name: "Alice",
        age: 30,
        city: "New York"
    },
    user2: {
        name: "Bob",
        age: 25,
        city: "Los Angeles"
    }
}).then(() => {
  console.log("Data written successfully!");
}).catch((error) => {
  console.error("Error writing data:", error);
});

dbUsers.once("value", (snapshot) => {
  console.log("Database data:", snapshot.val());
}).catch((error) => {
  console.error("Error reading data:", error);
});
