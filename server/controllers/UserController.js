const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

console.log("Register controller loaded");

exports.registerUser =  async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "The user already exists" });
    }

    const salt = await bcrypt.genSalt(10);   
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({                 
      message: "User registered Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }
    });

  } catch (error) {
    console.error(error);  
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


exports.LoginUser = async(req,res) =>{
   try {
    const {email,password} = req.body
    
    const user =  await User.findOne({email});
    if(!user){
      return res.status(400).json({message : "Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(400).json({message : "Invalid password"})
    }

    const token = jwt.sign(
      {id : user._id, email : user.email},
      process.env.JWT_SECRET,
      {expiresIn : "1d"}
    )

    res.status(200).json({
      message :"Login Succesfull",
      token,
      user :{
        id : user._id,
        name : user.name,
        email : user.email,
        profileImage : user.profileImage
      }
    })
   } catch (error) {
    console.error('error while login :',error)
    return res.status(500).json({
      message : "Server Error",
      error : error.message
    })
   }
}