const request     = require('./require');
const wallet      = request.wallet;
const web3        = request.web3;
const contract    = request.contract;
const ethereumTx  = request.ethereumTx;


// console.log( web3.toWei("0.000000000000000001", 'ether') );


// CREATE ERC20 ADDRESS WALLET
var Create = function(){
  const myWallet = wallet.generate();
  return {
    address: myWallet.getChecksumAddressString(),
    private: myWallet.getPrivateKeyString()
  }
};

// GET TOKEN BALANCE DETAILS FROM CONTRACT OBJECT
var Token = function(){
  return contract;
};

// GET ETH BALANCE
var EthBalance = function(address){
  var Eth_balance = web3.eth.getBalance(address).toNumber();
  return web3.fromWei(Eth_balance, 'ether');
};

// RETURN ALL TRASACTION DETAILS MATCHING THE TX-HASH
var TxHash = function(tx){
  // SYNCHRONOUS
  return web3.eth.getTransaction(tx);
};

var PushTransaction = function(data){
  const from         = data.from;
  const to           = data.to;
  const privateKey   = data.private_key;
  const count        = web3.eth.getTransactionCount(from);
  const amnt         = data.amount;
  const gasPrice     = 47;
  const gasLimit     = 3000000;
  const chainId      = 1;
  // set raw transactionn parameters
  var rawTransaction = {
    "from": from,
    "nonce": web3.toHex(count),
    "gasPrice": web3.toHex(gasPrice * 1e9),
    "gasLimit": web3.toHex(gasLimit),
    "to": process.env.CONTRACT_ADDRESS,
    "value": "0x0",
    "data": contract.transfer.getData(to, amnt),
    "chainId": chainId
  }
  var privKey = new Buffer(privateKey, 'hex');
  var tx = new ethereumTx(rawTransaction);
  tx.sign(privKey);
  var serializedTx = tx.serialize();
  var response = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
  return response;
};



module.exports = {
  create:             Create,
  token:              Token,
  ethBalance:         EthBalance,
  txHash:             TxHash,
  pushTransaction:    PushTransaction
}
