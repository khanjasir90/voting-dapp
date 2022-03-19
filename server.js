const express = require('express');
const app = express();
const cors = require('cors');
const Web3 = require('web3');
const contract = require('@truffle/contract');
const artifacts = require('./build/contracts/Voting.json');
const Contract = new require('./Contract');
const Provider = new require('./Provider');

const contractt = new Contract();
const provider = new Provider();
const web3 = provider.web3;
const instance = contractt.initContract();


app.set('views','./views')
app.set('view engine','ejs')

app.use(cors());
app.use(express.json());


app.get('/',async (req,res) => {
    const accounts = await web3.eth.getAccounts();
    const candidatesCount = await instance.methods.candidatesCount().call();
    const alreadyVoted = await instance.methods.voters(accounts[0]).call();
    console.log(alreadyVoted);
    var candidateObject = [];
    for(var i=1;i<=candidatesCount;i++) {
        const temp = await instance.methods.candidates(i).call();
        candidateObject.push({...temp});
    }
    console.log(candidateObject);
    res.render('index', {
        data:candidateObject,
        address:accounts[0],
        alreadyVoted: alreadyVoted
    })
})

app.get('/vote/:id', async(req,res) => {
    const id = req.params.id;
    try {
        const accounts = await web3.eth.getAccounts();
        await instance.methods.vote(id).send({from: accounts[0], gas:300000})
        res.redirect('/');
    } catch(err) {
        console.log(err);
    }

})

app.post('/addCandidate',async(req,res) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await instance.methods.addCandidate('Abdullah',21).send({from: accounts[0],gas: 300000});
        res.redirect('/')
    } catch (err) {
        console.log(err);
    }
})

app.listen(3000,() => console.log('Server Running on port 3000'));
