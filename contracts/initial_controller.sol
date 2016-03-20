import 'dappsys/auth.sol';
import 'dappsys/data/nullmap';
import 'database.sol'; // dapphubDB - packages

// maybe deriving from DSNullMap is overkill, but it shows of dappsys
contract DappHubNameOwnerDB is DSAuth
                             , DSNullMap
{
    function setNameOwner(bytes32 name, address owner) auth() {
        set(name, bytes32(owner));
    }
    // Throws if was never set.
    function getNameOwner(bytes32 name) constant returns (address) {
        return address(get(name));
    }
    function tryGetNameOwner(bytes32 name) 
             constant
             returns (address owner, bool ok)
    {
        var (_owner, _ok) = tryGet(name);
        return (address(_owner), ok);
    }
}

contract DappHubSimpleController is DSAuth {
    DappHubNameOwnerDB _name_db;
    DappHubDB _package_db;
    function setNameDB( DappHubNameOwnerDB name_db )
             auth()
    {
        _name_db = name_db;
    }
    function setPackageDB( DappHubDB package_db )
             auth()
    {
        _package_db = package_db;
    }
    function setPackage( bytes32 name
                       , uint8 major
                       , uint8 minor
                       , uint8 patch
                       , bytes package_hash )
    {
        var owner = _name_db.getNameOwner(name);
        if( msg.sender != owner ) {
            throw;
        }
        _package_db.setPackage(name, major, minor, patch, package_hash);
    }
    function transferName( bytes32 name, address new_owner ) {
        if( msg.sender != _name_db.getNameOwner(name) ) {
            throw;
        }
        _name_db.setNameOwner(name, new_owner);
    }
}
