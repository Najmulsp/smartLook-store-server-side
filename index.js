const express = require("express");
const  mongoose  = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
const authRouter = require("./routes/auth/auth-routes");

// connect with database, it can also do in another folder and import to use

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tgkhp.mongodb.net/`)
.then(()=>console.log("mongodb connected"))
.catch((error) =>console.log('error connecting mongodb =',error)) 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173/',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true,
    })
);
app.use("/api/auth", authRouter);


app.listen(PORT, ()=>{
    console.log(`smart look server is running on port ${PORT}`)
});
