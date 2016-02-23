import 'dappsys/auth.sol';

// Data store for dapphub registry: name, semver -> ipfs_hash
// Enforces semantic versioning and has simple-to-verify immutability (append-only).
// The notion of package "owners" and transferrability will be implemented
// by a business logic contract that will be granted ownership of this database.
// For now, it is simply manually curated.
contract DappHubDB is DSAuth {
    struct package_descriptor {
        // semver logic used in set
        uint8 latest_major_version;
        uint8 latest_minor_version;
        uint8 latest_patch_version;
        mapping( uint8 => mapping( uint8 => mapping( uint8 => bytes ) ) ) _hashes;
    }
    mapping( bytes32 => package_descriptor ) _packages;

    event PackageUpdate(bytes32 indexed name, uint8 major, uint8 minor, uint8 patch, bytes ipfs);
    function getPackageHash(bytes32 name, uint8 major, uint8 minor, uint8 patch)
          returns (bytes) {
        return _packages[name]._hashes[major][minor][patch];
    }

    function getPackageLatest( bytes32 name )
        returns (uint8 major, uint8 minor, uint8 patch) {
      var pkg = _packages[name];
      major = pkg.latest_major_version;
      minor = pkg.latest_minor_version;
      patch = pkg.latest_patch_version;
    }

    function setPackage(bytes32 name, uint8 major, uint8 minor, uint8 patch, bytes _hash)
             auth()
    {
        var package = _packages[name];
        if( major < package.latest_major_version ) {
            throw;
        } else if( major == package.latest_major_version ) {
            if( minor < package.latest_minor_version ) {
                throw;
            } else if( minor == package.latest_minor_version ) {
                if( patch <= package.latest_patch_version ) {
                    throw;
                }
            } else { // minor > latest.minor
                if( patch != 0 ) {
                    throw;
                }
            }
        } else { // major > latest.major
            if( minor != 0 ) {
                throw;
            }
            if( patch != 0 ) {
                throw;
            }
        }
        package._hashes[major][minor][patch] = _hash;
        package.latest_major_version = major;
        package.latest_minor_version = minor;
        package.latest_patch_version = patch;
        _packages[name] = package;
        PackageUpdate(name, major, minor, patch, _hash );
    }
}
