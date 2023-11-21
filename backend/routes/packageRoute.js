import express from "express";
const packageRoute=express.Router();
import { Packages } from '../models/packages.js';

packageRoute.get('/', async(request,response)=>{
    try {
      
        const packages = await Packages.find({});
        return response.status(200).send(packages);
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
  })
packageRoute.post('/add', async(request,response)=>{
    try {
      
      if(!request.body.title ||
        !request.body.description ||
        !request.body.country ||
        !request.body.noOfDays||
        !request.body.images||
        !request.body.rate){
          return response.status(400).send({
            message: 'Send all required fields: title,description,country,noOfDays,images,rate,location(optional)',
          });
        }
      const newPackage = {
        title:request.body.title,
        description:request.body.description,
        country:request.body.country,
        noOfDays:request.body.noOfDays,
        images:request.body.images,
        rate:request.body.rate,
        location:request.body.location?request.body.location:'none',        
      };
     
        const tourPackage = await Packages.create(newPackage);
        return response.status(201).send(tourPackage);
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
  })
  packageRoute.get('/:id', async(request,response)=>{
    try {
      const {id}=request.params;
      const packages=await Packages.findById(id);
      
      
        return response.status(200).send(packages);
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
  })
  packageRoute.post('/edit/:id', async(request,response)=>{
    try {
      
      if(!request.body.title ||
        !request.body.description ||
        !request.body.country ||
        !request.body.noOfDays||
        !request.body.images||
        !request.body.rate){
          return response.status(400).send({
            message: 'Send all required fields: title,description,country,noOfDays,images,rate,location(optional)',
          });
        }

        const {id}=request.params;
      const result=await Packages.findByIdAndUpdate(id,request.body);
        if(!result){
          return response.status(404).send({'message':'Package not found'});
        }

        return response.status(201).send({'message':'Package updated successfully','status':0,result});
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
  })
  packageRoute.post('/delete/:id', async(request,response)=>{
    try {
      
      

        const {id}=request.params;
      const result=await Packages.findOneAndDelete(id);
        if(!result){
          return response.status(404).send({'message':'Package not found'});
        }

        return response.status(200).send({'message':'Package deleted successfully','status':0});
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
  })

  export default packageRoute;