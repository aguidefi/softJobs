import { model } from "../models/userModel.js"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import cookieParser from 'cookie-parser'

const home = (req,res) => {
  res.send ('Bienvenido')
}

const register = async (req,res) => {
  const {email, password, rol, lenguage} = req.body
  try{
    if (!email ||!password ||!rol ||!lenguage) {
      return res.status(400).send('Missing required fields')
    }
    const user = await model.getUserByEmail(email)
    if (user) {
      return res.status(409).send('Email already in use')
    }
    const newUser = await model.addUser({email, password, rol, lenguage})
    res.send('User created')
  } catch (error) { 
    console.log('Error',error.message)
  }
}  

const login = async (req,res) => {
  const {email} = req.body
  try{
    const user = await model.getUser(email)
    if (!user) {
      return res.status(400).send("User not found")
    } else {
      const token = jwt.sign({email},process.env.JWT_SECRET)
      res
        .status(200)
        .cookie('token', token)
        .send('User logged in')
    }
  } catch (error) {
    return res.status(500).send(err.message)
  }
}

const verifyToken = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).send('Access denied')
  } else {
    console.log("Token is valid", token)
  }
  try{
    const data = jwt.verify(token,process.env.JWT_SECRET)
    console.log("Data", data)
  } catch (error) {
    res.send('Error verifying token')
  }
}

const getUser = async (req, res) => {
  const {email} = req.body
  try{
    const user = await model.getUser(email)
    if (!user) {
      return res.status(400).send("User not found")
    } else {
      console.log('User:', user);
      res.status(200).json([user]);
    }
  } catch (error) {
    console.log('Error',error.message)
  }
}

const notFound = (req,res) => {
  res.send ('404- Page not found')
}

export const controller = {
  home,
  notFound,
  register,
  login,
  getUser,
  verifyToken
}