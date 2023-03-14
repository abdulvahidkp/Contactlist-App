const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api',(req,res)=>{
    res.send({message:'hello world'})
})

app.listen(3000,()=>console.log('Port connected'))