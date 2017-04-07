var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());

var Ethereum = require('../lib/ethereum');
var ethereum = new Ethereum();

/* GET transaction listing. */
router
    .get('/',function(req, res) {
    	var acc = ethereum.getAccounts();
    	res.json({accounts : acc});
    })

    .get('/pending',function(req,res){
        var pendingTransactions = ethereum.getPendingTransaction();
        res.json(pendingTransactions);
    })

    .get('/block/:block',function(req,res){
        var blockNumber = req.params.block;
        var block = ethereum.getBlockInformations(blockNumber);
        res.json(block);
    })

    .get('/address/:address',function(req,res){
    	var address = req.params.address;
        var transaction = ethereum.getTransactionInformations(address);
        console.log("La ? " + transaction);
        res.json(transaction);
    })

    .get('/account/:accountAddress',function(req,res){
        var address = req.params.accountAddress;
        console.log(address);
        var transactions = ethereum.getTransactionByAccount(address);
        res.json(transactions);
    })

    .post('/',function(req,res){
    	var transaction = req.body;
    	var returnAddress = ethereum.sendTransaction(transaction);
        console.log(returnAddress);
    	res.json({address : returnAddress});
    })

module.exports = router;

