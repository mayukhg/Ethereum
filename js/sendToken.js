#!/usr/bin/nodejs

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:20000'));


function sendToken(contractAddress, fromAddress, toAddress, amount) {
    web3.personal.unlockAccount(fromAddress, "1234", 60 * 60 * 24, function(err, res) {
        if (err) {
            console.log("ERROR:", err);
        }
        web3.eth.defaultAccount = fromAddress;

        var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_delegate","type":"address"}],"name":"removeAuthorisation","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"allowOperation","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_allowOperation","type":"bool"}],"name":"setAllowOperation","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"int256"}],"name":"adjustOwnerBalance","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_delegate","type":"address"}],"name":"authorise","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"canTransferEx","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferEx","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"symbol_","type":"string"},{"name":"decimalUnits","type":"uint8"}],"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

        var token = web3.eth.contract(abi).at(contractAddress);

        token.transfer(toAddress, amount, function(err, res){
          if(err) {console.log('ERROR:', err)}
          console.log(res);
        });
    });
}


if (process.argv.length > 5) {
  sendToken(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
}
else {
  console.log("Usage: sendToken contract fromAddress toAddress amount");
}
