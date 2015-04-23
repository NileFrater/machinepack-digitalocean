module.exports = {

  friendlyName: 'Create a Droplet',
  description: 'Create a DigitalOcean droplet.',
  extendedDescription: 'You can find documentation for this API here: https://developers.digitalocean.com/documentation/v2/ and raise issues here: github.com/NileFrater/machinepack-digitalocean.',

  inputs: {
    token: {
      example: 'FFDFdf8f8d',
      description: 'Your DigitalOcean API token.',
      required: true
    },
    name: {
      example: 'My-New-Droplet',
      description: 'The hostname you wish to assign your new droplet.',
      required: true
    },
    region: {
      example: 'NYC2',
      description: 'The region name where you wish to spin up your new droplet.',
      required: true
    }, 
    size: {
      example: '512mb',
      description: 'The droplet size you wish to spin up (E.G 512mb.)',
      required: true
    },
    image: {
      example: 434348,
      description: 'The ID of the private image you wish to use as the base for your new droplet.',
      required: true
    }, 
    sshkeys: {
      example: '10, 11, 12',
      description: 'The ID of the SSH keys you wish to apply to your droplet. These must be saved to your digitalocean account. Separate with a command to add multiple.',
      required: false
    },
    backups: {
      example: false,
      description: 'A true/false indicating whether or not you wish to add auto-backups to your droplet',
      required: false
    },
    ipv6: {
      example: 'false',
      description: 'A true/false indicating whether or not you wish to add IPV6 to your droplet',
      required: false
    },
    private_networking: {
      example: 'false',
      description: 'A true/false indicating whether or not you wish to add private networking to your droplet',
      required: false
    },
    user_data: {
      example: 'MetadataInfoHere',
      description: 'The userdata you wish to include with your droplet.',
      required: false
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
        example: {
            "droplet": {
              "id": 3164494,
              "name": "example.com",
              "memory": 512,
              "vcpus": 1,
              "disk": 20,
              "locked": true,
              "status": "new",
              "kernel": {
                "id": 2233,
                "name": "Ubuntu 14.04 x64 vmlinuz-3.13.0-37-generic",
                "version": "3.13.0-37-generic"
              },
              "created_at": "2014-11-14T16:36:31Z",
              "features": [
                "virtio"
              ],
              "backup_ids": [

              ],
              "snapshot_ids": [

              ],
              "image": {
              },
              "size": {
              },
              "size_slug": "512mb",
              "networks": {
              },
              "region": {
              }
            },
            "links": {
              "actions": [
                {
                  "id": 36805096,
                  "rel": "create",
                  "href": "https://api.digitalocean.com/v2/actions/36805096"
                }
              ]
            }
          }
        }
  },

  fn: function (inputs, exits) {

    // Set up our parent-wrapper
     var Dropkit = require("dropkit");
    // And add our token found in the API section of the Digital Ocean Control panel. 
     var v2 = new Dropkit(inputs.token);

     // Specify our arguments in JSON format. 
     v2.droplet.create({"name": inputs.name, "region": inputs.region, "size": inputs.size, "image": inputs.image, "ssh_keys": inputs.ssh_keys, "backups": inputs.backups, "ipv6": inputs.ipv6, "private_networking": inputs.private_networking, "user_data": inputs.user_data}).then(function(droplet) {
        console.log(droplet)
        return exits.success(droplet);

     }).error(function(error) {
        // I will re-visit this soon.
        // Digital Ocean sends out an error response without anything actually going wrong, but this route appears to give a successful creation. 
        console.log(error.statusCode);
        console.log(error.res);
        // DO API v2 returns both a status code and a response in JSON format.
        return exits.success(error.res);
      });



  }

};
