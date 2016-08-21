import "./initial_controller.sol";
import "dapple/script.sol";

contract Deploy is Script {
  function Deploy() {
    // var simplecontroller = new DappHubSimpleController();
    // simplecontroller.setUp();
    // exportObject("simplecontroller", simplecontroller);
    DappHubDB packagedb = env.simplecontroller._package_db();
    exportObject("dapphubdb", packagedb);
  }
}
