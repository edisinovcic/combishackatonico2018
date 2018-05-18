import ether from './helpers/ether';

const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Crowdsale = artifacts.require('CombisCrowdsale');
const SimpleToken = artifacts.require('CombisToken');

contract('Crowdsale', function ([_, investor, wallet, purchaser]) {
    const value = ether(1);
    const expectedTokenAmount = value.mul(1000);

    beforeEach(async function () {
        this.token = await SimpleToken.new();
        this.crowdsale = await Crowdsale.new(this.token.address, wallet);
        await this.token.transferOwnership(this.crowdsale.address);
    });

    describe('accepting payments', function () {
        it('should accept payments', async function () {
            await this.crowdsale.send(value).should.be.fulfilled;
            await this.crowdsale.buyTokens(investor, { value: value, from: purchaser }).should.be.fulfilled;
        });
    });

    describe('high-level purchase', function () {
        it('should log purchase', async function () {
            const { logs } = await this.crowdsale.sendTransaction({ value: value, from: investor });
            const event = logs.find(e => e.event === 'TokenPurchase');
            should.exist(event);
            event.args.purchaser.should.equal(investor);
            event.args.beneficiary.should.equal(investor);
            event.args.value.should.be.bignumber.equal(value);
            event.args.amount.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should assign tokens to sender', async function () {
            await this.crowdsale.sendTransaction({ value: value, from: investor });
            let balance = await this.token.balanceOf(investor);
            balance.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should forward funds to wallet', async function () {
            const pre = web3.eth.getBalance(wallet);
            await this.crowdsale.sendTransaction({ value, from: investor });
            const post = web3.eth.getBalance(wallet);
            post.minus(pre).should.be.bignumber.equal(value);
        });
    });

    describe('low-level purchase', function () {
        it('should log purchase', async function () {
            const { logs } = await this.crowdsale.buyTokens(investor, { value: value, from: purchaser });
            const event = logs.find(e => e.event === 'TokenPurchase');
            should.exist(event);
            event.args.purchaser.should.equal(purchaser);
            event.args.beneficiary.should.equal(investor);
            event.args.value.should.be.bignumber.equal(value);
            event.args.amount.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should assign tokens to beneficiary', async function () {
            await this.crowdsale.buyTokens(investor, { value, from: purchaser });
            const balance = await this.token.balanceOf(investor);
            balance.should.be.bignumber.equal(expectedTokenAmount);
        });

        it('should forward funds to wallet', async function () {
            const pre = web3.eth.getBalance(wallet);
            await this.crowdsale.buyTokens(investor, { value, from: purchaser });
            const post = web3.eth.getBalance(wallet);
            post.minus(pre).should.be.bignumber.equal(value);
        });
    });
});