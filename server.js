import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bookRoute from './route/book.route.js'
import userRoute from "./route/user.route.js"
import cors from 'cors'

const app = express()
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



dotenv.config()
const database_url= process.env.MONGODB_URI
const port = process.env.PORT || 4000;

const connectDB = async () => {
    try {
    
      const conn = await mongoose.connect(database_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log(`You are Connected with Database`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };

  connectDB();


app.use("/",bookRoute)
app.use("/books",bookRoute)
app.use('/',userRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})