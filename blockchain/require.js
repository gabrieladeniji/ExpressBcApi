require('dotenv').config();
const Web3         = require('web3');
const ABI          = require('human-standard-token-abi');
// // set provider for web3
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/${process.env.TOKEN}`));
const contract = web3.eth.contract(ABI).at(process.env.CONTRACT_ADDRESS);

module.exports = {
  wallet:     require('ethereumjs-wallet'),
  web3:       web3,
  contract:   contract,
  ethereumTx: require('ethereumjs-tx')
};
