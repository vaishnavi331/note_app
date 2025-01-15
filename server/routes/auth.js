const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/middleware.js');
const router=express.Router();


router.post('/signup', async (req, res) => {
  try {
    console.log('Incoming request body:', req.body); // Debug the input
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ success: false, message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });

    await newUser.save();
    return res.status(200).json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    console.error('Error in register route:', error); // Log the exact error
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.post('/login',async(req,res)=>{
    try{
      const{email,password}=req.body;
      const user=await User.findOne({email})
      if(!user){
          return res.status(401).json({success: false,message:"User Not exist"})
      }
      const checkPassword=await bcrypt.compare(password,user.password)
      if(!checkPassword){
        return res.status(401).json({success: false,message:"Wrong Credentials"})
      }

      const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"5h"})

      return res.status(200).json({success:true, token,user:{name: user.name } ,message:"Login Successfully"})
    }
    catch(error){
      return res.status(500).json({success:false,message:"Error in Login Server"})
    }
});


router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return res.status(401).json({ success: false, message: 'No token provided or malformed header' });
}

const token = authHeader.split(' ')[1];
if (!token) {
  return res.status(401).json({ success: false, message: 'Token not found in header' });
}


    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: { id: user._id, name: user.name } });
  } catch (error) {
    console.error('Error in /verify route:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports=router;
