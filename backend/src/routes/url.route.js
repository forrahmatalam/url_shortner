import express from 'express';
import generateCode from '../utils/generateCode.js';
import urlModel from '../models/url.model.js';

const router = express.Router();


router.post("/",async(req,res)=>{

    const {url} =req.body;

    if(!url){
        return res.status(400).json({message:"Url is required"});
    }
    if(!url.startsWith("http://") && !url.startsWith("https://")){
        return res.status(400).json({message:"Invalid url"});
    }

if(url.length>2048){
    return res.status(400).json({message:"Url is too long"});
}

const code = generateCode();

const newUrl = new urlModel({
    originalUrl:url,
    shortCode:code
});

await newUrl.save();

return res.status(201).json({
    message:"Url shortened successfully",
    data:{
        originalUrl:newUrl.originalUrl,
        shortUrl:newUrl.shortCode
    }
});


    });


router.get("/",async(req,res)=>{

    const urls = await urlModel.find();
    
    return res.status(200).json({
        message:"Urls fetched successfully",
        data:urls   


    })
});



export default router;

