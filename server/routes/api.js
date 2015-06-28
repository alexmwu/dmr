var express = require('express');

// export the objects in the anon func (can be referenced when using require)
module.exports = (function() {
  'use strict';
  var router = express.Router();
  router.get(function(req,res) {
    
  });
  
  router.post(function(req,res) {
  });
  
  router.put(function(req,res) {
  });
  
  router.delete(function(req,res) {
  });

  return router;
})();
