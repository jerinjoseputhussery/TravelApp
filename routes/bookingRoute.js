import express from "express";
const bookingRoute=express.Router();
bookingRoute.post('/', async(request,response)=>{
    response.send('CONFIDENTIAL');

  })
  
  

  export default bookingRoute;