const express = require('express');
const app = express();
const cors = require('cors');
const Web3 = require('web3');
const contract = require('@truffle/contract');
const artifacts = require('./build/contracts/Voting.json');
const CONTACT_ABI = require('./config');
const CONTACT_ADDRESS = require('./config');

app.use(cors());
app.use(express.json());

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider); 
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}


app.get('/',async (req,res) => {   
    const votingContractObj = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI,CONTACT_ADDRESS.CONTACT_ADDRESS);
    const candidatesData = await votingContractObj.methods.candidates(1).call({from: '0x08b27fC6122d79FE1833ceC7Aa90e517d200CEd5'});
    console.log(candidatesData);
})

app.post('/addCandidate', async(req,res) => {
    const votingContractObj = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI,CONTACT_ADDRESS.CONTACT_ADDRESS);
    const ifAdded = await votingContractObj.methods.addCandidate('Jasir',20).send({from: '0x08b27fC6122d79FE1833ceC7Aa90e517d200CEd5', gas:3000000});
    console.log(ifAdded);
})

app.post('/vote',async(req,res) => {
    const votingContractObj = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI,CONTACT_ADDRESS.CONTACT_ADDRESS);
    const ifAdded = await votingContractObj.methods.vote(1).send({from: '0x0408f48B82f71d2CCE0765159e97DFa088e579C8',gas: 300000})
    console.log(ifAdded);
})


app.listen(3000,() => console.log('Server Running on port 3000'));
