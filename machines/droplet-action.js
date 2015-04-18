module.exports = {

  friendlyName: 'Execute Action',
  description: 'Actions include: disable_backups, reboot, shutdown, power_on, restore, password_reset etc',
  extendedDescription: 'Find a list of actions here: https://developers.digitalocean.com/documentation/v2/#droplet-actions',

  inputs: {
    token: {
      example: 'FFDFdf8f8d',
      description: 'Your DigitalOcean API token.',
      required: true
    },
    dropletID: {
      example: 7564837494,
      description: 'Droplet ID - The droplet specified will be deleted.',
      required: true
    },
    action: {
      example: 'reboot',
      description: 'All actions can be found here: https://developers.digitalocean.com/documentation/v2/#droplet-actions',
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
     v2.droplet.action(inputs.dropletID, inputs.action).then(function(droplet) {
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
