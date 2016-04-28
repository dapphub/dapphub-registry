import 'dapple/test.sol';
import 'database.sol';
import 'dappsys/auth.sol';
import 'initial_controller.sol';

contract DappHubSimpleControllerTest is Test, DSAuthModesEnum {
  DappHubNameOwnerDB names;
  DappHubDB packages;
  DappHubSimpleController controller;
  Tester T1; address t1;
  Tester T2; address t2;

  function setUp() {
    names = new DappHubNameOwnerDB();
    packages = new DappHubDB();
    controller = new DappHubSimpleController();
    controller.setNameDB(names);
    controller.setPackageDB(packages);
    packages.updateAuthority(address(controller), DSAuthModes.Owner);
    names.updateAuthority(address(controller), DSAuthModes.Owner);
    T1 = new Tester(); t1 = address(T1);
    T1._target( controller );
    T2 = new Tester(); t2 = address(T2);
    T2._target( controller );
  }

  // Should be able to update the name db by us
  function testUpdateNameDb() {
    var _names = new DappHubNameOwnerDB();
    controller.setNameDB(_names);
  }

  // Should be able to update the package db by us
  function testUpdatePackageDb() {
    var _packages = new DappHubDB();
    controller.setPackageDB(_packages);
  }

  // Should be able to update a package at the root namespace
  function testAuthorizedSetPackage() {
    controller.setPackage("foo", 1, 0, 0, "bar");
  }
  // Unauthorized user should not be able to register names at the global namespace
  function testErrorUnauthorizedSetPackage() {
    DappHubSimpleController(t1).setPackage("foo", 1, 0, 0, "bar");
  }
  // Unauthorized user should be able to register names prefixed with 'beta/'
  function testUnauthorizedSetBetaPackage() {
    DappHubSimpleController(t1).setPackage("beta/foo", 1, 0, 0, "bar");
  }
  // Registered package not owned by root authorety should not be changable
  function testErrorRootAuthorityChangeUnownedPackage() {
    DappHubSimpleController(t1).setPackage("beta/foo", 1, 0, 0, "bar");
    controller.setPackage("beta/foo", 1, 0, 0, "baz");
  }

  // Should not be able to transfer a package not owned by us
  function testErrorUnauthorizedTransfer() {
    controller.transferName("foo", address(0x123));
  }

  function testSimpleNameRegister() {
    controller.setNameOwner('foo', address(this));
    DappHubSimpleController(t1).setNameOwner("beta/foo", t1);
  }

  function testErrorUnauthorizedNameRegister() {
    DappHubSimpleController(t1).setNameOwner("foo", t1);
  }

  function testErrorUnauthorizedNameRegister2() {
    DappHubSimpleController(t1).setNameOwner("beta/foo", t1);
    controller.setNameOwner('beta/foo', address(this));
  }

  // Should be able to transfer a package owned by us
  function testAuthorizedTransfer() {
    controller.setNameOwner('foo', address(this));
    controller.transferName("foo", t1);
    // DappHubSimpleController(t1).setPackage("foo", 1, 0, 0, "bar");
  }

  // Should not be able to update a package after transferring it
  function testErrorUnauthorizedAfterTransfer() {
    controller.setNameOwner('foo', address(this));
    controller.transferName("foo", address(t1));
    controller.setPackage("foo", 1, 0, 0, "bar");
  }

  function testUserCanIncreaseVersionNumber() {
    DappHubSimpleController(t1).setPackage("beta/foo", 1, 0, 0, "bar");
    DappHubSimpleController(t1).setPackage("beta/foo", 1, 0, 1, "baz");
  }

  function testSetUp() {
    DappHubSimpleController controller2 = new DappHubSimpleController();
    controller2.setUp();
    Tester T3; address t3;
    T3 = new Tester(); t3 = address(T3);
    T3._target( controller2 );
    DappHubSimpleController(t3).setPackage('beta/dapphub_registry', 0, 1, 2, 'QmQPzdfmHRRwvFkL9jJPUQAWz7i5RCn5pKkU2J3rEBBePF');
  }

}
