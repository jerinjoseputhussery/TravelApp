import { port,mongoURL} from './config.js';
import mongoose from 'mongoose';
import express, { response } from 'express';
import { Users } from './models/users.js';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import packageRoute from './routes/packageRoute.js';
import { Packages } from './models/packages.js';

import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import { default as connectMongoDBSession} from 'connect-mongodb-session';
const MongoDBSession = connectMongoDBSession(session);

const app = express();
const store = new MongoDBSession({
    uri:mongoURL,
    collection:'mySessions',
  });
  
  app.use(session({
    secret: "This_is_a_secret_Key",
    resave: false,
    saveUninitialized: false,
    store:store,
    maxAge:   60 * 1000,
  }));

  const isAuth = (req,res,next) => {
    if(req.session.isAuth){
      next()
    }else{
      return res.status(401).send({'message':'session invalid','status':1004});
    }
  }
app.use(cors());
// app.use(helmet.frameguard())
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user',userRoute);
app.use('/booking',isAuth,bookingRoute);
app.use('/packages',isAuth,packageRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
});


mongoose.connect(mongoURL).then(()=>{
  console.log('DATABASE CONNECTED');
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  });
}).catch((error)=>{
  console.log(error);
});

app.get('/getPackages', async(request,response)=>{
  try {
    
      const packages = await Packages.find({});
      return response.status(200).send(packages);
    
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



// app.post('/booking',isAuth, async(request,response)=>{
//  response.send('CONFIDENTIAL');
// });

