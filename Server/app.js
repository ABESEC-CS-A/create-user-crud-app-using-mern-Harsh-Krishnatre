const dbConnect = require('./Config/db.js');
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const userroute = require('./Router/userRoutes.js');
dotenv.config();
const port = process.env.PORT || 3000;
app.use(cors());
dbConnect();

app.use(express.json());
app.use("/",userroute)

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})
