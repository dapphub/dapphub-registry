import 'dappsys/auth.sol';

// Data store for dapphub registry: name, semver -> ipfs_hash
// Has simple-to-verify immutability (append-only).
// The notion of package "owners" and transferrability will be implemented
// by a business logic contract that will be granted ownership of this database.
// For now, it is simply manually curated.
contract DappHubDB is DSAuth {
    // name -> major -> minor -> patch -> package_hash
    mapping( bytes32=>mapping( uint8=>mapping( uint8=>mapping( uint8=> bytes )))) _packages;
    // name -> versions[] -- 0 - major, 1 - minor, 2 - patch
    mapping( bytes32=>uint8[3] ) _last;

    event PackageUpdate(bytes32 indexed name, uint8 major, uint8 minor, uint8 patch, bytes ipfs);

    function getPackageHash(bytes32 name, uint8 major, uint8 minor, uint8 patch)
             constant
             returns (bytes)
    {
        return _packages[name][major][minor][patch];
    }

    function getLastVersion(bytes32 name) returns (uint8 major, uint8 minor, uint8 patch) {
      return (_last[name][0], _last[name][1], _last[name][2]);
    }

    function setPackage(bytes32 name, uint8 major, uint8 minor, uint8 patch, bytes _hash)
             auth()
    {
        if( _packages[name][major][minor][patch].length != 0 ) {
            throw;
        }
        if( _last[name][0] < major
          || (_last[name][0] == major && _last[name][1] < minor)
          || (_last[name][0] == major && ((_last[name][1] == minor) && (_last[name][2] < patch)))) {
          _last[name][0] = major;
          _last[name][1] = minor;
          _last[name][2] = patch;
        }
        _packages[name][major][minor][patch] = _hash;
        PackageUpdate(name, major, minor, patch, _hash );
    }
}
