const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 8
}
const web3 = new Web3(ganache.provider(), null, OPTIONS);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const initalString = 'Hey man!';

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //use one of those accounts to deploy the contracts
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [initalString] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('contract has default msg', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initalString);
    });

    it('msg modified', async () => {
        await inbox.methods.setMessage('Alrighty').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Alrighty');
    });

});

/*class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car;
beforeEach(() => {
    car = new Car();
});

describe('Cars', () => {
    it('can Park', () => {
        assert.equal(car.park(), 'stopped');
    });
    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    })
});*/