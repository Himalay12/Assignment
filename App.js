const express = require('express');
const fs = require('fs');

const App = express();

App.get('/getEnvironment/:process', (req, res) => {
    let temp;
    
    if(req.params.process == 'PROCESS1'){
        temp = (require('dotenv').config({path: `${__dirname}/Process1/.env`}).parsed);
    }
    else if(req.params.process == 'PROCESS2'){
        temp = (require('dotenv').config({path: `${__dirname}/Process2/.env`}).parsed);
    }

    res.send(temp);
})

App.get('/setEnvironment/:process/:key/:value', (req, res) => {
    let temp;
    
    if(req.params.process == 'PROCESS1'){
        temp = require('dotenv').config({path: `${__dirname}/Process1/.env`}).parsed;
        if(!temp[req.params.key]){
            fs.appendFileSync(`${__dirname}/Process1/.env`, `\n${req.params.key}=${req.params.value}`);
        }
        else{
            temp[req.params.key] = req.params.value;
            fs.writeFileSync(`${__dirname}/Process1/.env`, ``);
            Object.keys(temp).forEach(element => {
                fs.appendFileSync(`${__dirname}/Process1/.env`, `\n${element}=${temp[element]}`);
            });
        }
        temp = require('dotenv').config({path: `${__dirname}/Process1/.env`}).parsed;
    }
    else if(req.params.process == 'PROCESS2'){
        temp = require('dotenv').config({path: `${__dirname}/Process2/.env`}).parsed;
        if(!temp[req.params.key]){
            fs.appendFileSync(`${__dirname}/Process2/.env`, `\n${req.params.key}=${req.params.value}`);
        }
        else{
            temp[req.params.key] = req.params.value;
            fs.writeFileSync(`${__dirname}/Process2/.env`, ``);
            Object.keys(temp).forEach(element => {
                fs.appendFileSync(`${__dirname}/Process2/.env`, `\n${element}=${temp[element]}`);
            });
        }
        temp = require('dotenv').config({path: `${__dirname}/Process2/.env`}).parsed;
    }

    res.send((temp));
})


App.listen(3000, (req, res)=>{
    console.log('listening to port 3000');
});