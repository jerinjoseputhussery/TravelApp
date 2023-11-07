import express from "express";
const userRoute=express.Router();
import { Users } from '../models/users.js';
import { saltRounds} from '../config.js';
import bcrypt from 'bcrypt';

userRoute.post('/', async(request,response)=>{
    try {
      if(await Users.findOne({userName:request.body.userName})){
        return response.status(200).send({'message':'user already exist','status':1001});
      }
      if(!request.body.userName ||
        !request.body.firstName ||
        !request.body.lastName ||
        !request.body.password){
          return response.status(400).send({
            message: 'Send all required fields: userName,firstName,lastName and password',
          });
        }
       
      const newUser = {
        userName:request.body.userName,
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        password: await bcrypt.hash(request.body.password, saltRounds),
      };
     
        const user = await Users.create(newUser);
        return response.status(201).send({'message':'Signup successfull','status':0});
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
  })
  
  

  export default userRoute;