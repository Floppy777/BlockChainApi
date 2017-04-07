var method = Ethereum.prototype;
var Web3 = require('web3')
var web3 = new Web3();

var config = require("../config/config");

/**
 * EthApi Ethereum class
 */
function Ethereum() {
	method.getNode();
}

method.apiVersion = function(){
	return web3.version.api;
}

method.nodeVersion = function(){
	return web3.version.node;
}

method.getLastBlock = function(){
    return web3.eth.blockNumber;
}

method.isConnectedToNode = function() {
	if(!web3.isConnected()) {
  		console.log("Not Connected");
  		return false;
	}else {
		console.log("Connected To node");
		return true;
 	}
}

method.isSync = function(){

}

method.getBalance = function(address){
    return web3.eth.getBalance(address);
}

method.getAccounts = function(){
    return web3.eth.accounts;
}

method.getDefaultAccount = function(){
    return web3.eth.defaultAccount;
}

method.getBlockNumber = function(number){
    return web3.eth.getBlock(number);
}

method.getNode = function() {
    for(var k in config.ethereum.nodes) {
        var node = config.ethereum.nodes[k];
        if(!web3.isConnected()) {
            web3.setProvider(new web3.providers.HttpProvider(node));
            console.log("info", 'Connected to node : ' + node);
            try {
                var listening = web3.net.listening;
                return true;
            }
            catch(err) {
                console.log("error", 'Node is not listening', { node: node });
            }
        }
        return true; 
    }
    var error = "No node are listening";
    console.log("No node are listening");
    return new Error(error);
}

method.getTransactionInformations = function(address){
    web3.eth.getTransaction(address, function(err, transaction) {
        console.log("transaction : " + transaction);
        return transaction;    
    });
}

method.getPendingTransaction = function(){
    return web3.eth.getBlock("pending");
}

method.sendTransaction = function(transactionObject){
    var transaction = web3.eth.sendTransaction(transactionObject);
    return transaction;
}

method.getBlockInformations = function(blockNumber){
    var block = web3.eth.getBlock(blockNumber);
    console.log("Get informations from Block " + blockNumber);
    return block;
}

method.getTransactionByAccount = function(accountAddress,startBlock,endBlock){
    if(endBlock == null){
        endBlock = web3.eth.blockNumber;
    }

    if(startBlock == null){
        startBlock =  1;
    }
    var transactions = [];
    for(var i = startBlock ; i < endBlock ; i++){
        var block = web3.eth.getBlock(i,true);
        if (block != null && block.transactions != null) {
            block.transactions.forEach(function(e){
            if(accountAddress == e.from){
                transactions.push(e);
            }
            });
        }
    }
    return transactions;
}

module.exports = Ethereum;