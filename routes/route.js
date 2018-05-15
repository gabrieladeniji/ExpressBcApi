const express = require('express');
const app = express();
const router = express.Router();
const chain = require('../blockchain/chain');
const middle = require('../middleware/middle');
const bodyParser = require('body-parser');
bodyParserJson = bodyParser.json();


// INDEX PAGE
router.get('/v1/erc20', function(req, res, next){
  res.send({Tigereum_API: "Welcome to Tigereum BlockChain API version 1.0"});
});

// CREATE A ERC20 DIGITAL WALLET
router.get('/v1/erc20/create/wallet/:key', middle.token_ware, function(req, res, next){
  var adrs = chain.create().address;
  var prvt = chain.create().private;
  res.send({address: adrs, private: prvt});
});

// GET TOKEN BALANCE ON A ADDRESS
router.get('/v1/erc20/token/balance/:address/:key', [middle.token_ware, middle.address_ware], function(req, res, next){
  var result = chain.token().balanceOf(req.params.address);
  res.send({token_balance: result.c[0], token_name: chain.token().name(), symbol: chain.token().symbol()});
});

// GET ETH BALANCE ON A ADDRESS
router.get('/v1/erc20/eth/balance/:address/:key', [middle.token_ware, middle.address_ware], function(req, res, next){
  var balance = chain.ethBalance(req.params.address);
  res.send({eth_balance: balance});
});

// CHECK IF AN ADDRESS IS VALID
router.get('/v1/erc20/address/validator/:address/:key', [middle.token_ware, middle.address_ware], function(req, res, next){
  res.send({message: 'address valid'});
});

// GET TRANSACTION HASH DETAILS
router.get('/v1/erc20/check/tx/:tx/:key', middle.token_ware, function(req, res, next){
  var data = chain.txHash(req.params.tx);
  res.send(data);
});

// PUSH TRANSACTION TO ETHEREUM NETWORK.
router.post('/v1/erc20/token/send/fund/:key', [middle.token_ware, bodyParserJson], function(req, res, next){
  var data = req.body;
  var txHashed = chain.pushTransaction(data);
  res.send({ok: txHashed});
});







// EXPORTS TO app.js
module.exports = router;
