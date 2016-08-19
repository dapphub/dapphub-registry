import 'dappsys/auth.sol';
import 'dappsys/data/nullmap.sol';
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
        return (address(_owner), _ok);
    }
}

contract DappHubSimpleController is DSAuth {
    DappHubNameOwnerDB _name_db;
    DappHubDB public _package_db;

    function setUp () {
      _name_db = new DappHubNameOwnerDB();
      _package_db = new DappHubDB();
      setNameDB(_name_db);
      setPackageDB(_package_db);
      updateAuthority(msg.sender, DSAuthModes.Owner);
    }

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
    function transfearDBOwner(address owner)
             auth()
    {
      _name_db.updateAuthority(owner, DSAuthModes.Owner);
      _package_db.updateAuthority(owner, DSAuthModes.Owner);
    }
    // TODO - export this to modifiers
    function setPackage( bytes32 name
                       , uint8 major
                       , uint8 minor
                       , uint8 patch
                       , bytes package_hash )
    {
        var (owner, ok) = _name_db.tryGetNameOwner(name);
        // caller has to be owner
        if (ok && msg.sender != owner) {
            throw;
        }
        // if the name is not taken yet, assign it to the sender if he is
        // the authority or the name has a `beta/` prefix
        if(!ok) {
          if(isAuthorized() || isBeta(name)) {
            _name_db.setNameOwner(name, msg.sender);
          } else {
            throw;
          }
        }
        _package_db.setPackage(name, major, minor, patch, package_hash);
    }
    function setNameOwner (bytes32 name, address new_owner) {
      var (owner, ok) = _name_db.tryGetNameOwner(name);
      if (ok || !(isAuthorized() || isBeta(name))) throw;
        _name_db.setNameOwner(name, new_owner);
    }
    function transferName( bytes32 name, address new_owner ) {
        if( msg.sender != _name_db.getNameOwner(name) ) {
            throw;
        }
        _name_db.setNameOwner(name, new_owner);
    }
    ///@dev checks if `name` is has a 'beta/' prefix
    function isBeta(bytes32 name) internal returns(bool) {
      return name.length > 5 &&
        byte(name[0]) == byte(0x62) &&
        byte(name[1]) == byte(0x65) &&
        byte(name[2]) == byte(0x74) &&
        byte(name[3]) == byte(0x61) &&
        byte(name[4]) == byte(0x2f);
    }

}
