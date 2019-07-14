const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
   'village author point best ocean swallow weird brown ability misery mercy young',
   'rinkeby.infura.io/v3/01183f6b6e8d4aaf8aa97136aded1264'
);
