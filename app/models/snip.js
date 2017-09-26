// NOTE: Modules
const mongoose = require('mongoose');

// NOTE: Define User schema
const snipSchema = mongoose.Schema({
      title          : {
            type     : String,
            required : true
      },
      code           : {
            type     : String,
      },
      notes          : {
            present  : Boolean,
            content  : String
      },
      language       : {
            type     : String,
            default  : "Plain text"
      },
      tags           : {
            type     : [String],
      },
      createdAt      : {
            type     : Date,
            default  : Date.now
      },
      updatedAt      : {
            type     : Date,
            default  : Date.now
      }

});



// NOTE: Define Snip methods


// NOTE: Expose model
module.exports = mongoose.model('Snip', snipSchema);
