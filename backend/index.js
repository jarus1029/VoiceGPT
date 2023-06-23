const dotenv=require('dotenv');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
dotenv.config();

//configuration of openAI api
const {Configuration,OpenAIApi}=require("openai");

const config=new Configuration({
    apiKey:process.env.SECRET_KEY
})
const openai=new OpenAIApi(config);

//setup server
const app=express();
app.use(bodyParser.json());
app.use(cors())

//endpoint for openai
app.post("/chat",async(req,res)=>{
    const {prompt}=req.body;

    const completion=await openai.createCompletion({
        model:"text-davinci-003",
        max_tokens:512,
        temperature:0,
        prompt:prompt,
    });

    res.send(completion.data.choices[0].text);
})

//setting up the port 
const port=8000;
app.listen(port,()=>{
    console.log(`Server listening on port: ${port}`);
});