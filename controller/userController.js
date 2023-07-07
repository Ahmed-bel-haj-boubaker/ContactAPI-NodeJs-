const asyncHandler = require('express-async-handler');
const User = require ('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req,res)=>{
    const data = req.body;
    if(!data){
        res.status(400);
        throw new Error("Please provide all required fields");
    }
    const email = data.email;
    const username = data.username;
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('this user is already have account !');
    }
    const password = req.body.password;
    const hashedPass = await bcrypt.hash(password , 10)
    console.log(hashedPass);
   const user= await User.create({
    email,
    username,
    password: hashedPass,
});

   if(!user){
    res.status(400);
    throw new Error ("Invalid details")
   }else{
    return res.status(201).json ({_id : user.id , email : user.email})
   }
    
 
});


const LoginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error ('Please provide all fields')
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        //generate token and send it back to client side
    //    const salt = bcrypt.genSaltSync(1)
    
     
         const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
           
         },
         process.env.ACCESS_TOKEN ,
          {expiresIn:'1h'}
          );
        res.status(200).json({accessToken})
      
    }else{

        res.status(401).json({message:'mot de passe incorrect'})
    }
   
});

 
// @access is private
const CurrentUser = asyncHandler(async (req,res)=>{
    res.json(req.user)
});













module.exports = {registerUser,LoginUser,CurrentUser}