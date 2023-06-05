import express from 'express';
import { userRoutes } from './routes/user.routes';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes());

app.listen(process.env.PORT, ()=>{
    console.log('API is running on port: ' + process.env.PORT)
});

