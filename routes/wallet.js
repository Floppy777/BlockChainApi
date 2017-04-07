var express = require('express');
var bodyParser = require('body-parser');
var walletEthereum = require('ethereumjs-wallet');
var keythereum = require("keythereum");
var fs = require('fs');
var router = express.Router();
router.use(bodyParser.json());

router
	.get('/create/:password',function(req,res){	
		var password = req.params.password;
		var wallet = walletEthereum.generate(true);
		var v3File = wallet.toV3(password);
		/*fs.writeFile("/tmp/test",v3File,function(err) {
    	if(err) {
        	return console.log(err);
    	}
		});*/
		keythereum.exportToFile(v3File); 
		res.json(v3File);
	});

module.exports = router;

