import { port,mongoURL,saltRounds} from './config.js';
import mongoose from 'mongoose';
import express, { response } from 'express';
import { Users } from './models/users.js';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import bodyParser from 'body-parser';
const MongoDBSession = connectMongoDBSession(session)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const store = new MongoDBSession({
  uri:mongoURL,
  collection:'mySessions',
});

app.use(session({
  secret: "This_is_a_secret_Key",
  resave: false,
  saveUninitialized: false,
  store:store,
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.post('/user', async(request,response)=>{
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
      if(!user)
        return response.status(200).send({'message':'User doesnot exist','status':1005});
      if(bcrypt.compareSync(request.body.password, user.password)){
        request.session.isAuth = true;
        return response.status(200).send({'message':'login successfull','status':0});
      }
      else
        return response.status(200).send({'message':'login failed','status':1002});
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message});
  }
});

app.post('/logout', (req,res)=>{
  req.session.destroy((err)=>{
    if(err)
    return res.status(200).send({'message':'logout failed','status':1002});
  })
 
  return res.status(200).send({'message':'logout successful','status':0});
})

mongoose.connect(mongoURL).then(()=>{
  console.log('DATABASE CONNECTED');
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  });
}).catch((error)=>{
  console.log(error);
});


const isAuth = (req,res,next) => {
  if(req.session.isAuth){
    next()
  }else{
    return res.status(401).send({'message':'session invalid','status':1004});
  }
}

app.post('/booking',isAuth, async(request,response)=>{
 response.send('CONFIDENTIAL');
});

