const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/create",async(req,res,next) => {
    try{
        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date

        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month

        let month = ("0" + date_ob.getMonth() + 1).slice(-2);

        // current year

        let year = date_ob.getFullYear();

        // current hours

        let hours = date_ob.getHours();

        // current minutes

        let minutes = date_ob.getMinutes();

        // current seconds

        let seconds = date_ob.getSeconds();

        var fileName = date + "-" + month + "-" + year + "-" + hours + minutes + seconds; 
        var ws = fs.createWriteStream(`files/${fileName}.txt`,{
            "flags": 'w',
            "encoding": 'utf8',
            "mode": 0666,
        });

        const timeStamp = date_ob.getTime();
        var data = "Current TimeStamp is:" +timeStamp;
        ws.write(data, function(){
            // Now the file has been written
        });
        res.send("The File is created on "+fileName);
    }
    catch(err){
        res.status(500).send(err);
    }
});

router.get("/get",async(req,res,next) => {
    try{
        const folder = './files/';
        let fileNames = [];
        fs.readdirSync(folder).forEach(file => {
            fileNames.push(file);
        });
        res.send(fileNames);
    }
    catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;