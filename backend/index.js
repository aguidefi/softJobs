import express from 'express';
import routes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/',routes);

app.listen(PORT, () => console.log(`Servidor corriendo http://localhost:${PORT}`))