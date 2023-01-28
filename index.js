const express = require("express");
const cors = require("cors");
const app =  express();
const fileupload = require("express-fileupload");
const post = require("./models/Schema");
const mongoose = require("mongoose");
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(fileupload())
const port = 8080;

//mongodb connection
mongoose.set('strictQuery', true)
mongoose.connect(`mongodb+srv://Meet:Meet@cluster0.xrw2ela.mongodb.net/?retryWrites=true&w=majority`, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected successfully")
    }
})

app.post('/api', (req, res)=>{
    // console.log(req.body, req.files.file.name)
    const date = new Date();
    let date_obj = date + "";
    date_obj = date_obj.split(" ");
    const new_date_obj = date_obj[2] + " " + date_obj[1] + " " + date_obj[3]
    const {name, address, desc} = req.body
    console.log({name, address, desc})
    const {file} = req.files
    console.log(req.body, req.files);
    // res.send("data received successfully");
    file.mv("./uploads/" + file.name, async (err)=>{
        if(err){
            res.json({message: err.message})
        }else{
            try{
                const post_obj = post({
                    ...{name, address, desc},
                    file: file.name,
                    likes : 0,
                    date : new_date_obj
                })
                const post_data = await post_obj.save()
                res.json({
                    message:"success",
                    post_data
                })
            }catch(err){
                res.json({
                    message:err.message
                })
            }           
        }
    })
})

app.get('/all', async (req, res)=>{
    res.json({result : await post.find().sort({createdAt : -1})})
})

app.get('/images/:fileName', async (req, res)=>{
    res.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
})

app.listen(port, ()=>console.log(`App listening to ${port}`))