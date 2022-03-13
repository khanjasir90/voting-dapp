const express = require('express');
const app = express();


app.post('/vote/:id',(req,res) => {
    const candidateId = req.params.id;
    console.log(candidateId);
})


app.listen(3000,() => console.log('Server Running on port 3000'));
