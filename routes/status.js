var express = require('express');
var bodyParser = require('body-parser');
var Ethereum = require('../lib/ethereum');
var router = express.Router();
router.use(bodyParser.json());

var ethereum = new Ethereum();


/* GET accounts listing. */
router
    .get('/isConnected',function(req, res) {
    	ethereum.isConnectedToNode();
        res.sendStatus(200);
    })

    .get('/isSync',function(req,res){
    	res.sendStatus(200);
    })

    .get('/apiVersion',function(req,res){
    	var apiVersion = ethereum.apiVersion();
    	console.log("Version de l'api : " + apiVersion);
    	res.json({version : apiVersion});
    })

    .get('/nodeVersion',function(req,res){
    	var nodeVersion = ethereum.nodeVersion();
    	console.log("Version du noeud ethereum : " + nodeVersion);
    	res.json({version : nodeVersion});
    })

    .get('/getLastBlock',function(req,res){
    	var lastBlock = ethereum.getLastBlock();
    	console.log("Dernier block de la chaine : " + lastBlock)
    	res.json({blockNumber : lastBlock});
    })

    .get('/getBlockNumber/:blockNumber',function(req,res){
    	var number = req.params.blockNumber;
    	console.log("Block number : " + number);
    	var blockInfo = ethereum.getBlockNumber(number);
    	res.json(blockInfo);
    })

module.exports = router;



