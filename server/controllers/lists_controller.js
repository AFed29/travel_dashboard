const express = require('express');
const listRouter = new express.Router();
const path = require('path')

const createListRouter = function(){
  listRouter.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'../../client/public', 'lists.html'))
  })
  return listRouter;
}


module.exports = createListRouter;
