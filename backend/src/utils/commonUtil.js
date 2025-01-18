import { json } from "express";
import constants from "../constants.js";
import axios from 'axios';

const authCheck = (req,res,next) => {
    try {
        if (req.headers.authorization == "Bearer 12345") {
            next();
        } else {
            res.status(401).json({
                success: false,
                error_code: 'ec_auth_401',
                error_message: 'Unauthorized.'
                });
        }  
    } catch (error) {
        return res.status(500).json({
            success: false,
            error_code: 'ec_usr_500',
            error_message: 'Internal server error in auth check.'
        });
    }

  
}

async function coordinateData(zipCode){
    let url = constants.WEATHER_API_URL+`zip=${zipCode},us&appid=${constants.WEATHER_API_KEY}`
    const response = await axios.get(url)
    return response.data

}

export default {
    authCheck,
    coordinateData
}