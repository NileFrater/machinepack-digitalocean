module.exports = {

  friendlyName: 'Get Droplet Snapshots',
  description: 'Return a list of Snapshots for a specific Droplet',
  extendedDescription: 'You can find documentation for this API here: https://developers.digitalocean.com/documentation/v2/ and raise issues here: Github.com/NileFrater/machinepack-digitalocean.',

  inputs: {
    token: {
      example: 'FFDFdf8f8d',
      description: 'Your DigitalOcean API token.',
      required: true
    },
    dropletID: {
      example: '7564837494',
      description: 'Droplet ID - This will let you return details on a specific droplet.',
      required: true
    }   
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'An unexpected error occurred.',
      statuscode: '500',
      response: 'No response'
    },
    notFound: {
      description: 'Could not find specified ID',
      statuscode: '500',
      response: 'No response'
    },
    success: {
      description: 'An unexpected error occurred.',
      statuscode: '200',
      response: 'Response from API v2'
    }
  },

  fn: function (inputs, exits) {

    // Set up our parent-wrapper
     var Dropkit = require("dropkit");
    // And add our token found in the API section of the Digital Ocean Control panel. 
     var v2 = new Dropkit(inputs.token);

     // Specify our arguments in JSON format. 
     v2.droplet.snapshots(inputs.dropletID).then(function(droplet) {
          return exits.success(droplet);
     }).error(function(error) {
        return exits.notFound({
            description: "Not found.",
            statuscode: error.statuscode,
            response: error.res
        });
     }); 

  }  

};
