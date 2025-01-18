import axios from 'axios';
import commonUtil
 from '../utils/commonUtil.js';
 import admin from "firebase-admin";

 import serviceAccount from '../../mainak-trivedi-firebase-adminsdk-rwmkl-92ccbfac65.json' assert { type: "json" };


 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://mainak-trivedi-default-rtdb.firebaseio.com" 
 });

 const db = admin.database();
 const dbUsers = db.ref("users");

 
async function saveUser(id, name, zipCode, lon, lat, timezone){
    let user = await dbUsers.child(id).set({
        name: name,
        zipCode: zipCode,
        lon: lon,
        lat: lat,
        timezone: timezone
    });
    return user;
}
async function getUser(id){
    let user = await dbUsers.child(id.toString()).once("value");
    if (user.exists()) {
        console.log(user.val()); // User data
        return user.val();
    } else {
        console.log("No user found with the given ID.");
        return null;
    }
}
async function updateUser(id,name, zipCode, lon, lat, timezone){
    const user = dbUsers.child(id.toString());
    await user.update({
        name: name,
        zipCode: zipCode,
        lon: lon,
        lat: lat,
        timezone: timezone
    });
    console.log(`User with ID ${id} has been updated successfully.`);
}
async function deleteUser(id){
    const user = dbUsers.child(id.toString());
    // Delete the user data
    await user.remove();
    console.log(`User with ID ${id} has been deleted successfully.`);
}

export default {
    saveUser,
    getUser,
    updateUser,
    deleteUser
}