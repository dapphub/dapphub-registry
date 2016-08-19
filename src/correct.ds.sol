import "./initial_controller.sol";
import "dapple/script.sol";

contract Correct is Script {
  function Correct() {
    DappHubSimpleController c = DappHubSimpleController(0xc5ab3dabed7820c6612564f768a0d4f682379e0e);
    c.setUp();
  }
}
