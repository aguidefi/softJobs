import { model } from "../models/userModel.js"

const home = (req,res) => {
  res.send ('Bienvenido')
}

const register = async (req,res) => {
  const {email, password, rol, lenguage} = req.body
  const newUser = await model.addUser({email, password, rol, lenguage})
  res.send('User created')
}  

const notFound = (req,res) => {
  res.send ('404- Page not found')
}

export const controller = {
  home,
  notFound,
  register,
}