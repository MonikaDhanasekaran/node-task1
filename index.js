const fs = require("fs");
const express = require("express");
const router = require("./router");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req,res) =>
  res.send(`Server is Running`)
);

app.use('/',(req,res,next) => {
    var auth = {
        authorised: true,
    };
    if(auth.authorised){
        next();
    }else{
        res.send({
            'msg': "Not authorised",
        });
    }
});

app.use("/filesystem",router);

app.listen(process.env.PORT);