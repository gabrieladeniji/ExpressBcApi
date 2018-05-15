const express = require('express');
const app = express();


// route middleware
app.use('/bc', require('./routes/route'));

// CHECK FOR INBUILT ERRORS
app.use(function(err, req, res, next){
  if(err){
    res.status(404).send({error: err.message});
  }
});


app.listen(process.env.port || 3000, function(){
  console.log('listen to port '+ this.address().port);
});
