module.exports = {

  friendlyName: 'Get Droplet Info',
  description: 'Return information for a specific Droplet',
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
      example: {
  "droplet": {
    "id": 3164494,
    "name": "example.com",
    "memory": 512,
    "vcpus": 1,
    "disk": 20,
    "locked": false,
    "status": "active",
    "kernel": {
      "id": 2233,
      "name": "Ubuntu 14.04 x64 vmlinuz-3.13.0-37-generic",
      "version": "3.13.0-37-generic"
    },
    "created_at": "2014-11-14T16:36:31Z",
    "features": [
      "ipv6",
      "virtio"
    ],
    "backup_ids": [

    ],
    "snapshot_ids": [
      7938206
    ],
    "image": {
      "id": 6918990,
      "name": "14.04 x64",
      "distribution": "Ubuntu",
      "slug": "ubuntu-14-04-x64",
      "public": true,
      "regions": [
        "nyc1",
        "ams1",
        "sfo1",
        "nyc2",
        "ams2",
        "sgp1",
        "lon1",
        "nyc3",
        "ams3",
        "nyc3"
      ],
      "created_at": "2014-10-17T20:24:33Z",
      "type": "snapshot",
      "min_disk_size": 20
    },
    "size": {
    },
    "size_slug": "512mb",
    "networks": {
      "v4": [
        {
          "ip_address": "104.131.186.241",
          "netmask": "255.255.240.0",
          "gateway": "104.131.176.1",
          "type": "public"
        }
      ],
      "v6": [
        {
          "ip_address": "2604:A880:0800:0010:0000:0000:031D:2001",
          "netmask": 64,
          "gateway": "2604:A880:0800:0010:0000:0000:0000:0001",
          "type": "public"
        }
      ]
    },
    "region": {
      "name": "New York 3",
      "slug": "nyc3",
      "sizes": [
        "32gb",
        "16gb",
        "2gb",
        "1gb",
        "4gb",
        "8gb",
        "512mb",
        "64gb",
        "48gb"
      ],
      "features": [
        "virtio",
        "private_networking",
        "backups",
        "ipv6",
        "metadata"
      ],
      "available": true
    }
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
     v2.droplets(inputs.dropletID).then(function(droplet) {
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
