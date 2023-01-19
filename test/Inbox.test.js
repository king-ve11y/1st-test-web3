const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3'); //construction function of web3
const web3 = new Web3(ganache.provider()); //instance that will connect local test network 
const {interface, bytecode} = require('../compile');
 let accounts;
 let inbox;
 
beforeEach(async ( )=>{
    //get list of all acounts
   accounts= await web3.eth.getAccounts()
        
    //use 1 acc to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,arguments:['Hello World!']})
    .send({from: accounts[0], gas:'1000000'})
});

describe('Inbox',()=>{
    it('deploy contract',()=>{
        assert.ok(inbox.options.address);
    });
//testing the message in the inbox.sol
    it('has a default message', async()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello World!');
    });
//testing the setmessage function in inbox.sol and modifying data in the network, also returns the hash
    it('can change the message',async()=>{
        await inbox.methods.setMessage('bye').send({ from: accounts[0] })
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    })
}) 