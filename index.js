"use strict";
// var web3 = require('web3');
var ipfsApi = require('ipfs-api');
var ipfs = require('ipfs-js');
var readYaml = require('read-yaml');
var fs = require('fs');
var dappfile = read.sync('dappfile');

// load dappfile
var DappHubDB = JSON.parse(fs.readFileSync('build/classes.json')).DappHubDB;

// get the registry object
var registryObject = dappfile.environments.morden.objects.dapphubdb;

// instantiate contract
var dapphub;

var ipfsApi;
// TODO - verry dirty code - cleanup on release
module.exports = {
  init: function ( web3 ) {
    ipfsApi = _ipfsApi;
    dapphub = web3.eth.contract( JSON.parse( DappHubDB.interface ) ).at( registryObject.address );
    return dapphub;
  },
  initIpfs: function (ipfsApi) {
    // do something with it
  },
  require: function( name, version ) {
    var v = version.split('.');
    var ipfsHash = dapphub.getPackageHash(name, v[0], v[1], v[2]):
  }
};
