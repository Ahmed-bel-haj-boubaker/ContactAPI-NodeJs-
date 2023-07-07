 const express = require ('express');
 const dotenv = require('dotenv').config();
 const ContactRoute = require('./routes/contactRoutes');
 const UserRoute = require('./routes/userRoute');

 const errorHandler = require('./middleware/errorHandler');
 const app = express();
 app.use(errorHandler);
 app.use(express.json());
 require('./config/connectDB');
 app.use('/api/contacts',ContactRoute);
 app.use('/api/users',UserRoute);


 const port = process.env.PORT || 5000;

 app.listen(port,()=>{
    console.log(`Server running on ${port}`)});