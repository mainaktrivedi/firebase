import axios from 'axios';
import commonUtil
 from '../utils/commonUtil.js';

import userModel from '../models/userModel.js';

async function createUser(req,res,next){
    try {
        // due to firebase create seems to work same as update, so no need to check if user already exists
        let {id,name,zipCode} = req.body;
        let coordinateData = await commonUtil.coordinateData(zipCode);
        let {lat, lon} = coordinateData.coord;
        let timezone = coordinateData.timezone;
        console.log(JSON.stringify(coordinateData))
        // Save user can be called conditionally however for now it is called always
        // as firebase will update the data if already exists 
        let user = await userModel.saveUser(id,name,zipCode,lon,lat,timezone);
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error_code: 'ec_usr_500',
            error_message: 'Internal server error in create user.'
        });
    }
}
async function getUser(req,res,next){
    try {
        let {id} = req.params;
        let user = await userModel.getUser(id);
        if (user) {
            return res.status(200).json({
                success: true,
                data: user
            });
        } else{
            return res.status(200).json({
                success: false,
                error_code: 'ec_usr_404',
                error_message: 'No user found with the given ID.'
                });
        }    
    } catch (error) {
        return res.status(500).json({
            success: false,
            error_code: 'ec_usr_500',
            error_message: 'Internal server error in create user.'
        });
    }
}
async function updateUser(req,res,next){
    try {
        let id = req.params.id; 
        let {name,zipCode} = req.body;
        console.log('Update user for id: ' + id);
        let user = userModel.getUser(id);
        if (user.zipCode !== zipCode) {
            let coordinateData = await commonUtil.coordinateData(zipCode);
            let {lat, lon} = coordinateData.coord;
            let timezone = coordinateData.timezone;
            let status = await userModel.updateUser(id,name,zipCode,lon,lat,timezone);
            res.send('Update user for id: ' + id + " => " + status);
        }
        res.send('No Update user for id: ' + id);
    } catch (error) {
        return res.status(500).json({
            success: false,
            error_code: 'ec_usr_500',
            error_message: 'Internal server error in update user.'
        });
    }
}
async function deleteUser(req,res,next){
    try {
        let {id} = req.params;
        let user = userModel.deleteUser(id);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error_code: 'ec_usr_500',
            error_message: 'Internal server error in delete user.'
        });
    }
}

async function validateParams(req,res,next){
    let {id,name,zipCode} = req.body;
    if (!id || !name || !zipCode) {
        return res.status(400).json({
            success: false,
            error_code: 'ec_usr_400',
            error_message: 'Bad request. Please provide all required fields. Id, name and zipCode.'
        });
    }
    next();
}

export default {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    validateParams
}
