const request   = require('../blockchain/require');
const web3      = request.web3;



// CHECK IF TOKEN IS CORRECT | middleware
const Token_ware = function(req, res, next){
  if(req.params.key == 'xxxxxx'){
    next();
  } else {
    res.status(404).send({error: 'Key is invalid'});
  }
};

// CHECK IF ADDRESS IS CORRECT | middleware
const Address_ware = function(req, res, next){
  if(web3.isAddress(req.params.address) == false){
    res.status(404).send({error: 'address is invalid'});
  } else {
    next();
  }
};



module.exports = {
  token_ware:    Token_ware,
  address_ware:  Address_ware
}
