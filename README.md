# dapphub-registry

Dapphub on-chain registry definition and npm abstraction for dapphub.io package manager.

Dapphub is designed as an upgradeable system, which is currently manually curated by Nexus but will be moved to an open name distribution and ownership system without needing to migrate existing data.

## usage

```js
// Import dapphub into your project:
import dapphub from 'dapphub';

// pass your web3 connector and recieve your dapphub contract instance
var dapphub = dapphub.init (web3);

// initialize ipfs:
dapphub.initIpfs(ipfsApi);

// Now you are free to require any package from dapphub:
var dappsysPkg = dh.require('dappsys','0.1.1');




```
