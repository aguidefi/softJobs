import {pool} from '../config/db.js';
import bcrypt from 'bcrypt';

const addUser = async ({email, password, rol, lenguage}) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try{
    const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [email, hashedPassword, rol, lenguage];
    const result = await pool.query(query, values);
    if (result.rowCount > 0) {
      return result.rows
    };
  } catch (error) {
    console.log('Error', error.message);
  }
}

const getUserByEmail = async (email) => {
  try{
    const query = 'SELECT email FROM usuarios WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    if (result.rowCount > 0) {
      return result.rows
    };
  } catch (error) {
    console.log('Error', error.message);
  }
}

const getUser = async (email) => {
  try{
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    if (result.rowCount > 0) {
      return result.rows[0];
    };
  } catch (error) {
    console.log('Error', error.message);
  }
}

export const model = {
  addUser,
  getUserByEmail,
  getUser,
}