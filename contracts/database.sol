import 'dappsys/auth.sol';

// Data store for dapphub registry: name, semver -> ipfs_hash
// Has simple-to-verify immutability (append-only).
// The notion of package "owners" and transferrability will be implemented
// by a business logic contract that will be granted ownership of this database.
// For now, it is simply manually curated.
contract DappHubDB is DSAuth {
    // name -> major -> minor -> patch -> package_hash
    mapping( bytes32=>mapping( uint8=>mapping( uint8=>mapping( uint8=> bytes )))) _packages;

    event PackageUpdate(bytes32 indexed name, uint8 major, uint8 minor, uint8 patch, bytes ipfs);

    function getPackageHash(bytes32 name, uint8 major, uint8 minor, uint8 patch)
             constant
             returns (bytes) 
    {
        return _packages[name]._hashes[major][minor][patch];
    }

    function setPackage(bytes32 name, uint8 major, uint8 minor, uint8 patch, bytes _hash)
             auth()
    {
        if( _packages[name][major][minor][patch].length != 0 ) {
            throw;
        }
        _packages[name][major][minor][patch] = _hash;
        PackageUpdate(name, major, minor, patch, _hash );
    }
}
