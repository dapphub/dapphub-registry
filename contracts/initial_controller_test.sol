import 'dapple/test.sol';
import 'database.sol';
import 'dappsys/auth.sol';
import 'initial_controller.sol';

contract DappHubSimpleControllerTest is Test, DSAuthModesEnum {
  DappHubNameOwnerDB names;
  DappHubDB packages;
  DappHubSimpleController controller;

  function setUp() {
    names = new DappHubNameOwnerDB();
    packages = new DappHubDB();
    controller = new DappHubSimpleController();
    controller.setNameDB(names);
    controller.setPackageDB(packages);
    packages.updateAuthority(address(controller), DSAuthModes.Owner);
  }

  // Should not be able to update a package not owned by us
  function testErrorUnauthorizedSetPackage() {
    controller.setPackage("foo", 1, 0, 0, "bar");
  }

  // Should be able to update a package owned by us
  function testAuthorizedSetPackage() {
    names.setNameOwner("foo", address(me));
    controller.setPackage("foo", 1, 0, 0, "bar");
  }

  // Should not be able to transfer a package not owned by us
  function testErrorUnauthorizedTransfer() {
    controller.transferName("foo", address(0x123));
  }

  // Should be able to transfer a package owned by us
  function testAuthorizedTransfer() {
    names.setNameOwner("foo", address(me));
    names.updateAuthority(address(controller), DSAuthModes.Owner);
    controller.transferName("foo", address(0x123));
  }

  // Should not be able to update a package after transferring it
  function testErrorUnauthorizedAfterTransfer() {
    names.setNameOwner("foo", address(me));
    names.updateAuthority(address(controller), DSAuthModes.Owner);
    controller.transferName("foo", address(0x123));
    controller.setPackage("foo", 1, 0, 0, "bar");
  }
}
