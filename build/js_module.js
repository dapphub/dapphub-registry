'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapple['dapphub_registry'] = (function builder () {
  var environments = {
      'master': {},
      'morden': {
        'simplecontroller': {
          'value': '0x64c4fd795df4abee314711a548d0cbe8b0259d21',
          'type': 'DappHubSimpleController'
        },
        'packagedb': {
          'value': '0xe43a2c0c3fc706d64745cfbcf4f52892e06fc4f7',
          'type': 'DappHubDB'
        },
        'dapphubdb': {
          'value': '0xe43a2c0c3fc706d64745cfbcf4f52892e06fc4f7',
          'type': 'DappHubDB'
        }
      },
      'omfg': {},
      'omfg2': {},
      'omfg3': {},
      'omg5': {}
    };

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  var passthroughs = ['at', 'new'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
      'objects': {
        'simplecontroller': {
          'value': '0x64c4fd795df4abee314711a548d0cbe8b0259d21',
          'type': 'DappHubSimpleController'
        },
        'packagedb': {
          'value': '0xe43a2c0c3fc706d64745cfbcf4f52892e06fc4f7',
          'type': 'DappHubDB'
        },
        'dapphubdb': {
          'value': '0xe43a2c0c3fc706d64745cfbcf4f52892e06fc4f7',
          'type': 'DappHubDB'
        }
      },
      'type': 'MORDEN'
    };
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = environments[env];
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'Correct': {
        'interface': [
          {
            'inputs': [],
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b60005b7364c4fd795df4abee314711a548d0cbe8b0259d21600360005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7600360005060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7600360005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055507364c4fd795df4abee314711a548d0cbe8b0259d21601260005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7601260005060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7601260005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b73c5ab3dabed7820c6612564f768a0d4f682379e0e90508073ffffffffffffffffffffffffffffffffffffffff16630a9254e4604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506000604051808303816000876161da5a03f115610002575050505b50600a8061022e6000396000f360606040526008565b00'
      },
      'DappHubDB': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              }
            ],
            'name': 'getLastVersion',
            'outputs': [
              {
                'name': 'major',
                'type': 'uint8'
              },
              {
                'name': 'minor',
                'type': 'uint8'
              },
              {
                'name': 'patch',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'major',
                'type': 'uint8'
              },
              {
                'name': 'minor',
                'type': 'uint8'
              },
              {
                'name': 'patch',
                'type': 'uint8'
              }
            ],
            'name': 'getPackageHash',
            'outputs': [
              {
                'name': '',
                'type': 'bytes'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'major',
                'type': 'uint8'
              },
              {
                'name': 'minor',
                'type': 'uint8'
              },
              {
                'name': 'patch',
                'type': 'uint8'
              },
              {
                'name': '_hash',
                'type': 'bytes'
              }
            ],
            'name': 'setPackage',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'major',
                'type': 'uint8'
              },
              {
                'indexed': false,
                'name': 'minor',
                'type': 'uint8'
              },
              {
                'indexed': false,
                'name': 'patch',
                'type': 'uint8'
              },
              {
                'indexed': false,
                'name': 'ipfs',
                'type': 'bytes'
              }
            ],
            'name': 'PackageUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b33600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600060006101000a81548160ff0219169083021790555060003373ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a35b610bf4806100a06000396000f360606040523615610074576000357c0100000000000000000000000000000000000000000000000000000000900480637e1db2a114610076578063842f93ea14610097578063c2205ee1146100da578063d153be5d14610113578063d551f601146101b2578063f32fe086146101d557610074565b005b610095600480803590602001909190803590602001909190505061024f565b005b6100ad60048080359060200190919050506102f5565b604051808460ff1681526020018360ff1681526020018260ff168152602001935050505060405180910390f35b6100e760048050506103d0565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61014460048080359060200190919080359060200190919080359060200190919080359060200190919050506103f6565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101a45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101bf6004805050610514565b6040518082815260200191505060405180910390f35b61024d6004808035906020019091908035906020019091908035906020019091908035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610527565b005b610257610a47565b156102eb5781600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600060006101000a81548160ff02191690830217905550808273ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a36102f0565b610002565b5b5050565b600060006000600260005060008560001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b9054906101000a900460ff16600260005060008660001916815260200190815260200160002060005060016003811015610002579090602091828204019190065b9054906101000a900460ff16600260005060008760001916815260200190815260200160002060005060026003811015610002579090602091828204019190065b9054906101000a900460ff169250925092506103c9565b9193909250565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6020604051908101604052806000815260200150600160005060008660001916815260200190815260200160002060005060008560ff16815260200190815260200160002060005060008460ff16815260200190815260200160002060005060008360ff1681526020019081526020016000206000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105005780601f106104d557610100808354040283529160200191610500565b820191906000526020600020905b8154815290600101906020018083116104e357829003601f168201915b5050505050905061050c565b949350505050565b600060009054906101000a900460ff1681565b61052f610a47565b15610a3a576000600160005060008760001916815260200190815260200160002060005060008660ff16815260200190815260200160002060005060008560ff16815260200190815260200160002060005060008460ff1681526020019081526020016000206000508054600181600116156101000203166002900490501415156105b957610002565b8360ff16600260005060008760001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b9054906101000a900460ff1660ff1610806106a357508360ff16600260005060008760001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b9054906101000a900460ff1660ff161480156106a257508260ff16600260005060008760001916815260200190815260200160002060005060016003811015610002579090602091828204019190065b9054906101000a900460ff1660ff16105b5b8061079557508360ff16600260005060008760001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b9054906101000a900460ff1660ff1614801561079457508260ff16600260005060008760001916815260200190815260200160002060005060016003811015610002579090602091828204019190065b9054906101000a900460ff1660ff1614801561079357508160ff16600260005060008760001916815260200190815260200160002060005060026003811015610002579090602091828204019190065b9054906101000a900460ff1660ff16105b5b5b156108765783600260005060008760001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b6101000a81548160ff0219169083021790555082600260005060008760001916815260200190815260200160002060005060016003811015610002579090602091828204019190065b6101000a81548160ff0219169083021790555081600260005060008760001916815260200190815260200160002060005060026003811015610002579090602091828204019190065b6101000a81548160ff021916908302179055505b80600160005060008760001916815260200190815260200160002060005060008660ff16815260200190815260200160002060005060008560ff16815260200190815260200160002060005060008460ff1681526020019081526020016000206000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061092257805160ff1916838001178555610953565b82800160010185558215610953579182015b82811115610952578251826000505591602001919060010190610934565b5b50905061097e9190610960565b8082111561097a5760008181506000905550600101610960565b5090565b505084600019167f05f13d4b64c8b14233e8c66983765ec3206a9ddec1f9304a20f688069d35641185858585604051808560ff1681526020018460ff1681526020018360ff168152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610a255780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a2610a3f565b610002565b5b5050505050565b60006000600060009054906101000a900460ff161415610ab957600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16149050610bf1565b6001600060009054906101000a900460ff161415610bec57600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200193505050506020604051808303816000876161da5a03f11561000257505050604051805190602001509050610bf1565b610002565b9056'
      },
      'DappHubNameOwnerDB': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              }
            ],
            'name': 'tryGetNameOwner',
            'outputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              }
            ],
            'name': 'getNameOwner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'get',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'unset',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'setNameOwner',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              }
            ],
            'name': 'tryGet',
            'outputs': [
              {
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'name': 'value',
                'type': 'bytes32'
              }
            ],
            'name': 'set',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'value',
                'type': 'bytes32'
              },
              {
                'indexed': true,
                'name': 'is_set',
                'type': 'bool'
              }
            ],
            'name': 'SetNullable',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b33600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600060006101000a81548160ff0219169083021790555060003373ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a35b6107c5806100a06000396000f3606060405236156100a0576000357c01000000000000000000000000000000000000000000000000000000009004806301ed1b3b146100a25780635e6ef7b6146100ed5780637e1db2a11461012f5780638eaa6ac0146101505780639141d6f914610180578063b04acec614610198578063c2205ee1146101b9578063d551f601146101f2578063dc09a8a714610215578063f71f7a251461024e576100a0565b005b6100b8600480803590602001909190505061026f565b604051808373ffffffffffffffffffffffffffffffffffffffff16815260200182151581526020019250505060405180910390f35b610103600480803590602001909190505061029a565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61014e60048080359060200190919080359060200190919050506102b5565b005b610166600480803590602001909190505061035b565b604051808260001916815260200191505060405180910390f35b61019660048080359060200190919050506103b4565b005b6101b76004808035906020019091908035906020019091905050610475565b005b6101c660048050506104b4565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101ff60048050506104da565b6040518082815260200191505060405180910390f35b61022b60048080359060200190919050506104ed565b604051808360001916815260200182151581526020019250505060405180910390f35b61026d600480803590602001909190803590602001909190505061055a565b005b6000600060006000610280856104ed565b9150915081600190048193509350610293565b5050915091565b60006102a58261035b565b6001900490506102b0565b919050565b6102bd610618565b156103515781600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600060006101000a81548160ff02191690830217905550808273ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a3610356565b610002565b5b5050565b60006000600160005060008460001916815260200190815260200160002060005090508060010160009054906101000a900460ff16156103a857806000016000505491506103ae566103ad565b610002565b5b50919050565b6103bc610618565b1561046c5760406040519081016040528060006001028152602001600081526020015060016000506000836000191681526020019081526020016000206000506000820151816000016000505560208201518160010160006101000a81548160ff0219169083021790555090505060001515600060010282600019167fe25c96d1e657058634d6be7aa3c57a335f583db088f1e4436eabc6030ca121f960405180905060405180910390a4610471565b610002565b5b50565b61047d610618565b156104aa576104a5828273ffffffffffffffffffffffffffffffffffffffff1660010261055a565b6104af565b610002565b5b5050565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900460ff1681565b600060006000600160005060008560001916815260200190815260200160002060005090508060010160009054906101000a900460ff161561054057806000016000505460019250925061055456610553565b6000600081600102915092509250610554565b5b50915091565b610562610618565b1561060e57604060405190810160405280828152602001600181526020015060016000506000846000191681526020019081526020016000206000506000820151816000016000505560208201518160010160006101000a81548160ff0219169083021790555090505060011515816000191683600019167fe25c96d1e657058634d6be7aa3c57a335f583db088f1e4436eabc6030ca121f960405180905060405180910390a4610613565b610002565b5b5050565b60006000600060009054906101000a900460ff16141561068a57600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161490506107c2565b6001600060009054906101000a900460ff1614156107bd57600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200193505050506020604051808303816000876161da5a03f115610002575050506040518051906020015090506107c2565b610002565b9056'
      },
      'DappHubSimpleController': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': '_package_db',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'transfearDBOwner',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'setUp',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'package_db',
                'type': 'address'
              }
            ],
            'name': 'setPackageDB',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'new_authority',
                'type': 'address'
              },
              {
                'name': 'mode',
                'type': 'uint8'
              }
            ],
            'name': 'updateAuthority',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'new_owner',
                'type': 'address'
              }
            ],
            'name': 'setNameOwner',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name_db',
                'type': 'address'
              }
            ],
            'name': 'setNameDB',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'new_owner',
                'type': 'address'
              }
            ],
            'name': 'transferName',
            'outputs': [],
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': '_auth_mode',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'major',
                'type': 'uint8'
              },
              {
                'name': 'minor',
                'type': 'uint8'
              },
              {
                'name': 'patch',
                'type': 'uint8'
              },
              {
                'name': 'package_hash',
                'type': 'bytes'
              }
            ],
            'name': 'setPackage',
            'outputs': [],
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'auth',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'mode',
                'type': 'DSAuthModesEnum.DSAuthModes'
              }
            ],
            'name': 'DSAuthUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b33600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600060006101000a81548160ff0219169083021790555060003373ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a35b61262a806100a06000396000f3606060405236156100ab576000357c0100000000000000000000000000000000000000000000000000000000900480630173faa9146100ad57806303da8902146100e65780630a9254e4146100fe57806342a925ce1461010d5780637e1db2a114610125578063b04acec614610146578063c2205ee114610167578063c2394315146101a0578063cad484bb146101b8578063d551f601146101d9578063f32fe086146101fc576100ab565b005b6100ba6004805050610276565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100fc600480803590602001909190505061029c565b005b61010b600480505061040b565b005b61012360048080359060200190919050506104f7565b005b610144600480803590602001909190803590602001909190505061053d565b005b61016560048080359060200190919080359060200190919050506105e3565b005b6101746004805050610769565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101b6600480803590602001909190505061078f565b005b6101d760048080359060200190919080359060200190919050506107d5565b005b6101e66004805050610959565b6040518082815260200191505060405180910390f35b6102746004808035906020019091908035906020019091908035906020019091908035906020019091908035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505090909190505061096c565b005b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6102a4610c4c565b1561040257600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637e1db2a1826000604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16637e1db2a1826000604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001925050506000604051808303816000876161da5a03f11561000257505050610407565b610002565b5b50565b60405161086580611131833901809050604051809103906000f0600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550604051610c9480611996833901809050604051809103906000f0600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506104be600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661078f565b6104e9600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166104f7565b6104f433600061053d565b5b565b6104ff610c4c565b156105345780600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550610539565b610002565b5b50565b610545610c4c565b156105d95781600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600060006101000a81548160ff02191690830217905550808273ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a36105de565b610002565b5b5050565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166301ed1b3b85604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506040604051808303816000876161da5a03f11561000257505050604051805190602001805190602001509150915080806106ab5750610699610c4c565b806106a957506106a884610df9565b5b155b156106b557610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b04acec68585604051837c010000000000000000000000000000000000000000000000000000000002815260040180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001925050506000604051808303816000876161da5a03f115610002575050505b50505050565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610797610c4c565b156107cc5780600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506107d1565b610002565b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635e6ef7b683604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506020604051808303816000876161da5a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108a757610002565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b04acec68383604051837c010000000000000000000000000000000000000000000000000000000002815260040180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001925050506000604051808303816000876161da5a03f115610002575050505b5050565b600060009054906101000a900460ff1681565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166301ed1b3b88604051827c010000000000000000000000000000000000000000000000000000000002815260040180826000191681526020019150506040604051808303816000876161da5a03f115610002575050506040518051906020018051906020015091509150808015610a4c57508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610a5657610002565b801515610b3257610a65610c4c565b80610a755750610a7487610df9565b5b15610b2c57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b04acec68833604051837c010000000000000000000000000000000000000000000000000000000002815260040180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001925050506000604051808303816000876161da5a03f11561000257505050610b31565b610002565b5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f32fe0868888888888604051867c010000000000000000000000000000000000000000000000000000000002815260040180866000191681526020018560ff1681526020018460ff1681526020018360ff168152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610c1f5780820380516001836020036101000a031916815260200191505b5096505050505050506000604051808303816000876161da5a03f115610002575050505b50505050505050565b60006000600060009054906101000a900460ff161415610cbe57600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16149050610df6565b6001600060009054906101000a900460ff161415610df157600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200193505050506020604051808303816000876161da5a03f11561000257505050604051805190602001509050610df6565b610002565b90565b600060058250602060ff16118015610ea5575060627f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168260006020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8015610f45575060657f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168260016020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8015610fe5575060747f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168260026020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8015611085575060617f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168260036020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80156111255750602f7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168260046020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b905061112c565b9190505660606040525b33600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600060006101000a81548160ff0219169083021790555060003373ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a35b6107c5806100a06000396000f3606060405236156100a0576000357c01000000000000000000000000000000000000000000000000000000009004806301ed1b3b146100a25780635e6ef7b6146100ed5780637e1db2a11461012f5780638eaa6ac0146101505780639141d6f914610180578063b04acec614610198578063c2205ee1146101b9578063d551f601146101f2578063dc09a8a714610215578063f71f7a251461024e576100a0565b005b6100b8600480803590602001909190505061026f565b604051808373ffffffffffffffffffffffffffffffffffffffff16815260200182151581526020019250505060405180910390f35b610103600480803590602001909190505061029a565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61014e60048080359060200190919080359060200190919050506102b5565b005b610166600480803590602001909190505061035b565b604051808260001916815260200191505060405180910390f35b61019660048080359060200190919050506103b4565b005b6101b76004808035906020019091908035906020019091905050610475565b005b6101c660048050506104b4565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101ff60048050506104da565b6040518082815260200191505060405180910390f35b61022b60048080359060200190919050506104ed565b604051808360001916815260200182151581526020019250505060405180910390f35b61026d600480803590602001909190803590602001909190505061055a565b005b6000600060006000610280856104ed565b9150915081600190048193509350610293565b5050915091565b60006102a58261035b565b6001900490506102b0565b919050565b6102bd610618565b156103515781600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600060006101000a81548160ff02191690830217905550808273ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a3610356565b610002565b5b5050565b60006000600160005060008460001916815260200190815260200160002060005090508060010160009054906101000a900460ff16156103a857806000016000505491506103ae566103ad565b610002565b5b50919050565b6103bc610618565b1561046c5760406040519081016040528060006001028152602001600081526020015060016000506000836000191681526020019081526020016000206000506000820151816000016000505560208201518160010160006101000a81548160ff0219169083021790555090505060001515600060010282600019167fe25c96d1e657058634d6be7aa3c57a335f583db088f1e4436eabc6030ca121f960405180905060405180910390a4610471565b610002565b5b50565b61047d610618565b156104aa576104a5828273ffffffffffffffffffffffffffffffffffffffff1660010261055a565b6104af565b610002565b5b5050565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060009054906101000a900460ff1681565b600060006000600160005060008560001916815260200190815260200160002060005090508060010160009054906101000a900460ff161561054057806000016000505460019250925061055456610553565b6000600081600102915092509250610554565b5b50915091565b610562610618565b1561060e57604060405190810160405280828152602001600181526020015060016000506000846000191681526020019081526020016000206000506000820151816000016000505560208201518160010160006101000a81548160ff0219169083021790555090505060011515816000191683600019167fe25c96d1e657058634d6be7aa3c57a335f583db088f1e4436eabc6030ca121f960405180905060405180910390a4610613565b610002565b5b5050565b60006000600060009054906101000a900460ff16141561068a57600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161490506107c2565b6001600060009054906101000a900460ff1614156107bd57600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200193505050506020604051808303816000876161da5a03f115610002575050506040518051906020015090506107c2565b610002565b905660606040525b33600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600060006101000a81548160ff0219169083021790555060003373ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a35b610bf4806100a06000396000f360606040523615610074576000357c0100000000000000000000000000000000000000000000000000000000900480637e1db2a114610076578063842f93ea14610097578063c2205ee1146100da578063d153be5d14610113578063d551f601146101b2578063f32fe086146101d557610074565b005b610095600480803590602001909190803590602001909190505061024f565b005b6100ad60048080359060200190919050506102f5565b604051808460ff1681526020018360ff1681526020018260ff168152602001935050505060405180910390f35b6100e760048050506103d0565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61014460048080359060200190919080359060200190919080359060200190919080359060200190919050506103f6565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101a45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101bf6004805050610514565b6040518082815260200191505060405180910390f35b61024d6004808035906020019091908035906020019091908035906020019091908035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610527565b005b610257610a47565b156102eb5781600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600060006101000a81548160ff02191690830217905550808273ffffffffffffffffffffffffffffffffffffffff167fb96a5204da93e5d7ddd5b0c2616fd5f76322b9c383c5010b94fdc3df11b7be5260405180905060405180910390a36102f0565b610002565b5b5050565b600060006000600260005060008560001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b9054906101000a900460ff16600260005060008660001916815260200190815260200160002060005060016003811015610002579090602091828204019190065b9054906101000a900460ff16600260005060008760001916815260200190815260200160002060005060026003811015610002579090602091828204019190065b9054906101000a900460ff169250925092506103c9565b9193909250565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6020604051908101604052806000815260200150600160005060008660001916815260200190815260200160002060005060008560ff16815260200190815260200160002060005060008460ff16815260200190815260200160002060005060008360ff1681526020019081526020016000206000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105005780601f106104d557610100808354040283529160200191610500565b820191906000526020600020905b8154815290600101906020018083116104e357829003601f168201915b5050505050905061050c565b949350505050565b600060009054906101000a900460ff1681565b61052f610a47565b15610a3a576000600160005060008760001916815260200190815260200160002060005060008660ff16815260200190815260200160002060005060008560ff16815260200190815260200160002060005060008460ff1681526020019081526020016000206000508054600181600116156101000203166002900490501415156105b957610002565b8360ff16600260005060008760001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b9054906101000a900460ff1660ff1610806106a357508360ff16600260005060008760001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b9054906101000a900460ff1660ff161480156106a257508260ff16600260005060008760001916815260200190815260200160002060005060016003811015610002579090602091828204019190065b9054906101000a900460ff1660ff16105b5b8061079557508360ff16600260005060008760001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b9054906101000a900460ff1660ff1614801561079457508260ff16600260005060008760001916815260200190815260200160002060005060016003811015610002579090602091828204019190065b9054906101000a900460ff1660ff1614801561079357508160ff16600260005060008760001916815260200190815260200160002060005060026003811015610002579090602091828204019190065b9054906101000a900460ff1660ff16105b5b5b156108765783600260005060008760001916815260200190815260200160002060005060006003811015610002579090602091828204019190065b6101000a81548160ff0219169083021790555082600260005060008760001916815260200190815260200160002060005060016003811015610002579090602091828204019190065b6101000a81548160ff0219169083021790555081600260005060008760001916815260200190815260200160002060005060026003811015610002579090602091828204019190065b6101000a81548160ff021916908302179055505b80600160005060008760001916815260200190815260200160002060005060008660ff16815260200190815260200160002060005060008560ff16815260200190815260200160002060005060008460ff1681526020019081526020016000206000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061092257805160ff1916838001178555610953565b82800160010185558215610953579182015b82811115610952578251826000505591602001919060010190610934565b5b50905061097e9190610960565b8082111561097a5760008181506000905550600101610960565b5090565b505084600019167f05f13d4b64c8b14233e8c66983765ec3206a9ddec1f9304a20f688069d35641185858585604051808560ff1681526020018460ff1681526020018360ff168152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610a255780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a2610a3f565b610002565b5b5050505050565b60006000600060009054906101000a900460ff161415610ab957600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16149050610bf1565b6001600060009054906101000a900460ff161415610bec57600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200193505050506020604051808303816000876161da5a03f11561000257505050604051805190602001509050610bf1565b610002565b9056'
      },
      'DappleEnvironment': {
        'interface': [
          {
            'inputs': [],
            'type': 'constructor'
          }
        ],
        'bytecode': '60606040525b7364c4fd795df4abee314711a548d0cbe8b0259d21600360005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7600360005060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7600360005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055507364c4fd795df4abee314711a548d0cbe8b0259d21601260005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7601260005060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7601260005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b600a806101b16000396000f360606040526008565b00'
      },
      'DappleLogger': {
        'interface': [],
        'bytecode': '6060604052600a8060106000396000f360606040526008565b00'
      },
      'Deploy': {
        'interface': [
          {
            'inputs': [],
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b60005b7364c4fd795df4abee314711a548d0cbe8b0259d21600360005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7600360005060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7600360005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055507364c4fd795df4abee314711a548d0cbe8b0259d21601260005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7601260005060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7601260005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b601260005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630173faa9604051817c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303816000876161da5a03f115610002575050506040518051906020015090507fdd8de1c55c6d3d7d4d291002863a4088eadaa37e4e5680befd89825ca6a7093a8160405180806020018373ffffffffffffffffffffffffffffffffffffffff168152602001828103825260098152602001807f64617070687562646200000000000000000000000000000000000000000000008152602001506020019250505060405180910390a15b50600a806102d46000396000f360606040526008565b00'
      },
      'Script': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b7364c4fd795df4abee314711a548d0cbe8b0259d21600360005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7600360005060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7600360005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055507364c4fd795df4abee314711a548d0cbe8b0259d21601260005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7601260005060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555073e43a2c0c3fc706d64745cfbcf4f52892e06fc4f7601260005060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b600a806101b16000396000f360606040526008565b00'
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      this.objects[i] = this.classes[obj['type']].at(obj.value);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapple['dapphub_registry'];
}
