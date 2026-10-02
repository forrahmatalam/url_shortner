import express from 'express';
import generateCode from '../utils/generateCode.js';
import urlModel from '../models/url.model.js';

const router = express.Router();


router.post("/",async(req,res)=>{

    const { url, customCode } = req.body;

    if(!url){
        return res.status(400).json({message:"Url is required"});
    }
    if(!url.startsWith("http://") && !url.startsWith("https://")){
        return res.status(400).json({message:"Invalid url"});
    }

if(url.length>2048){
    return res.status(400).json({message:"Url is too long"});
}

if (customCode && !/^[A-Za-z0-9_-]{1,32}$/.test(customCode)) {
    return res.status(400).json({message:"Custom code must be 1–32 letters, numbers, hyphens, or underscores"});
}

const code = customCode || generateCode();
const existingUrl = await urlModel.findOne({ shortCode: code });
if (existingUrl) {
    return res.status(409).json({message:"That custom short URL is already in use"});
}

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

router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    const url = await urlModel.findById(id);

    if (!url) {
        return res.status(404).json({
            message: "Url not found"
        });
    }

    await urlModel.findByIdAndDelete(id);

    return res.status(200).json({
        message: "Url deleted successfully"
    });
});

export default router;
