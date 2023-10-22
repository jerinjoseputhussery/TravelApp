import { port,mongoURL,saltRounds} from './config.js';
import mongoose from 'mongoose';
import express, { response } from 'express';
import { Users } from './models/users.js';
import bcrypt from 'bcrypt';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.post('/user', async(request,response)=>{
  try {
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
      return response.status(201).send(user);
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
  }
})
app.post('/login', async(request,response)=>{
  try {
    if(!request.body.userName ||      
      !request.body.password){
        return response.status(400).send({
          message: 'Send all required fields: userName and password',
        });
      }
     
    
      const user = await Users.findOne({userName:request.body.userName});
      console.log(request.body.password);
      console.log(user.password);
      if(bcrypt.compareSync(request.body.password, user.password))
        return response.status(200).send({'message':'login successfull','status':0});
      else
        return response.status(200).send({'message':'login failed','status':1});
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
  }
})
mongoose.connect(mongoURL).then(()=>{
  console.log('DATABASE CONNECTED');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}).catch((error)=>{
  console.log(error);
});

