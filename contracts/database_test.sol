import 'dapple/test.sol';
import 'database.sol';

contract DappHubDBTest is Test {
  DappHubDB db;

  function setUp() {
    db = new DappHubDB();
  }

  function testSetPkg(  ) {
    db.setPackage("omg",1,0,0,"QmbNePoKULjaTEqS1Mr3ni3ET5aa5D4cJLWVEVruQvG3K3");
  }

  function testPkgUpdate(  ) {
    db.setPackage("omg",1,0,0,"QmbNePoKULjaTEqS1Mr3ni3ET5aa5D4cJLWVEVruQvG3K3");
    db.setPackage("omg",2,0,0,"QmbNePoKULjaTEqS1Mr3ni3ET5aa5D4cJLWVEVruQvG3K3");
  }

  function testMultiplePackages(  ) {
    db.setPackage("omg",1,0,0,"QmbNePoKULjaTEqS1Mr3ni3ET5aa5D4cJLWVEVruQvG3K3");
    db.setPackage("omgg",2,0,0,"QmbNePoKULjaTEqS1Mr3ni3ET5aa5D4cJLWVEVruQvG3K3");
  }

  function testLatestPkgGetter() {
    db.setPackage("omg",1,0,0,"QmbNePoKULjaTEqS1Mr3ni3ET5aa5D4cJLWVEVruQvG3K3");
    var (a,b,c) = db.getLastVersion("omg");
    assertTrue(a==1);
    assertTrue(b==0);
    assertTrue(c==0);
  }

}
