const mongoose = require('mongoose'),
      Snip = require('./../models/snip');

module.exports = {
  index    :  function(req, res, next){
              Snip.find({}, 'title code language tags', (err, snip) => {
                   req.snips = snip;
                   return next();
              });
  },

  create   :  function(req, res, next){
              new Snip({
                    title     : req.body.title,
                    code      : req.body.code,
                    notes     : req.body.notes,
                    language  : req.body.language,
                    tags      : req.body.tags,
                }).save((err, snip) => {
                   console.log('New snip added');
                   return next();
                });
  },

  edit      :  function(req, res, next){
               Snip.findByIdAndUpdate(req.params.id, {$set: {
                    title     : req.body.title,
                    body      : req.body.textarea,
                    notes     : req.body.notes,
                    language  : req.body.language,
                    tags      : req.body.tags
               }}, (err, snip) => next());
  },

  destroy   :  function(req, res, next){
               Snip.findById(req.params.id, function(err, snip){
               snip.remove((err, snip) => next())
               });
  },

}
