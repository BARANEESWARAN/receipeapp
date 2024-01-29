const userModel = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const express = require("express");

exports.userRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (user) {
      return res.status(502).json({
        success: false,
        message: "username already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "User Registered Successfully!" });
  } catch (err) {
    console.log(`Error : ${err}`);
    res.status(500).json("internal server error");
  }
};
exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(502).json({
        success: false,
        message: "username is not exists",
      });
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(502).json({
            success: false,
            message: "username or password is incorrect",
          });
    }
  const token=jwt.sign({id:user._id},"secret")
    res.status(200).json({ 
        success:true,
        token,
        userId:user._id
        
        });
  } catch (err) {
    console.log(`Error : ${err}`);
    res.status(500).json("internal server error");
  }
};
