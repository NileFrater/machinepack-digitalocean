module.exports = {

  friendlyName: 'List Droplet Info',
  description: 'List information on all droplets in your DigitalOcean account.',
  extendedDescription: 'You can find documentation for this API here: https://developers.digitalocean.com/documentation/v2/ and raise issues here: Github.com/NileFrater/machinepack-digitalocean.',

  inputs: {
    token: {
      example: 'FFDFdf8f8d',
      description: 'Your DigitalOcean API token.',
      required: true
    }
 
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'An unexpected error occurred.',
      statuscode: '302',
      response: 'Response from API v2'
    },
    success: {
      description: 'An unexpected error occurred.',
      statuscode: '302',
      response: 'Response from API v2'
    }
  },

  fn: function (inputs, exits) {

    // Set up our parent-wrapper
     var Dropkit = require("dropkit");
    // And add our token found in the API section of the Digital Ocean Control panel. 
     var v2 = new Dropkit(inputs.token);

     // Specify our arguments in JSON format. 
     v2.droplets().then(function(droplet) {
          return exits.success(droplet);
     });     

  }  

};
