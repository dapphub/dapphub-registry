import 'dapple/test.sol';
import 'database.sol';
import 'dappsys/auth.sol';
import 'initial_controller.sol';

contract DappHubSimpleControllerTest is Test, DSAuthModesEnum {
  DappHubNameOwnerDB names;
  DappHubBetaNameOwnerDB betanames;
  DappHubDB packages;
  DappHubSimpleController controller;
  Tester T1; address t1;
  Tester T2; address t2;

  function setUp() {
    names = new DappHubNameOwnerDB();
    betanames = new DappHubBetaNameOwnerDB();
    packages = new DappHubDB();
    controller = new DappHubSimpleController();
    controller.setNameDB(names);
    controller.setBetaNameDB(betanames);
    controller.setPackageDB(packages);
    packages.updateAuthority(address(controller), DSAuthModes.Owner);
    T1 = new Tester(); t1 = address(T1);
    T2 = new Tester(); t2 = address(T2);
    T1._target( betanames );
    T2._target( names );
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

  // Should not be able to update a package not owned by us
  function testErrorUnauthorizedSetPackage() {
    controller.setPackage("foo", 1, 0, 0, "bar");
  }

  // Should be able to update a package owned by us
  function testAuthorizedSetPackage() {
    names.setNameOwner("foo", address(me));
    controller.setPackage("foo", 1, 0, 0, "bar");
  }

  function testErrorClaimGlobalNamespace() {
    DappHubNameOwnerDB(t1).setNameOwner("foo", address(t1));
    assertTrue(names.getNameOwner("foo") == t1);
  }

  // Should allow anybody to claim names under beta/ namespace
  function testClaimBetaNamespace() {
   DappHubBetaNameOwnerDB(t1).setNameOwner("beta/foo", address(t1));
   // assertTrue(names.getNameOwner("beta/foo") == t1);
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
