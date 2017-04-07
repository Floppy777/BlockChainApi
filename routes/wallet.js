var express = require('express');
var bodyParser = require('body-parser');
var walletEthereum = require('ethereumjs-wallet');
var keythereum = require("keythereum");
var elasticsearch = require('elasticsearch');
var fs = require('fs');
var router = express.Router();
router.use(bodyParser.json());

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log : 'trace'
});

router
	.get('/create/:password',function(req,res){	
		var password = req.params.password;
		var wallet = walletEthereum.generate(true);
		var v3File = wallet.toV3(password);
		var elasticKey = {};
		elasticKey.id = v3File.id;
		elasticKey.index = "ethereumwallets"
		elasticKey.type = "wallet"
		elasticKey.body = v3File;
		client.create(elasticKey,function(error,response){
			if(error){
				console.log(error);
			}
			console.log(response);
			keythereum.exportToFile(v3File); 
		});
		res.json(v3File);
	});

module.exports = router;

