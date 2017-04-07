var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());

var Ethereum = require('../lib/ethereum');
var ethereum = new Ethereum();

/* GET accounts listing. */
router
    .get('/all',function(req, res) {
    	var acc = ethereum.getAccounts();
    	res.json({accounts : acc});
    })

    .get('/default',function(req,res){
    	var defaultAccount = ethereum.getDefaultAccount();
    	console.log("defaultAccount : " + defaultAccount);
    	res.json({account : defaultAccount});
    })

	.get('/currency/all',function(req,res){
        var jsonList = [];
		var accounts = ethereum.getAccounts();
		for(var k in accounts){
            var singleObj = {}
            singleObj['address'] = accounts[k];
            singleObj['currency'] = ethereum.getBalance(accounts[k]);
            jsonList.push(singleObj);
		}

		res.json(jsonList);
	})

module.exports = router;

