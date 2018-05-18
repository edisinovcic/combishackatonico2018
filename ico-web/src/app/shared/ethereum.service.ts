import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { AppConfig } from './app-config.service';
import { AlertService } from './alert.service';

declare let require: any;
declare let window: any;

const Web3 = require('../../assets/scripts/web3.min.js');

@Injectable()
export class EthereumService {
  private account: string = null;
  public web3: any;

  private crowdsaleContract: any;
  private tokenContract: any;

  private crowdsaleContractAddress = AppConfig.config.crowdsaleContractAddress;
  private tokenContractAddress = AppConfig.config.tokenContractAddress;

  constructor(private alertService: AlertService) {
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);

      this.web3.eth.getAccounts(function (error, accounts) {
        return accounts[0];
      }).then(a => this.account = a[0]);

      interval(2000).subscribe(() => {
        this.web3.eth.getAccounts(function (error, accounts) {
          return accounts[0];
        }).then(a => this.account = a[0]);
      });

    } else {
      console.warn(
        'Please use a dapp browser like mist or MetaMask plugin for Chrome'
      );
      this.alertService.danger('Please use a DAPP browser like Mist or MetaMask plugin for Chrome or Firefox');
    }

    this.crowdsaleContract = new this.web3.eth.Contract(AppConfig.config.crowdsaleContractAbi, this.crowdsaleContractAddress);
    this.tokenContract = new this.web3.eth.Contract(AppConfig.config.tokenContractAbi, this.tokenContractAddress);
  }

  loaded(): boolean {
    return this.crowdsaleContract && this.tokenContract;
  }

  isCrowdsaleOwner(): Promise<boolean> {
    return this.crowdsaleContract.methods.owner().call()
      .then(owner => owner === this.account);
  }

  getRate(): Promise<any> {
    return this.crowdsaleContract.methods.RATE().call();
  }

  getCurrentAccount(): string {
    return this.account;
  }

  getAcquiredTokenBalance(account: string): Promise<any> {
    return this.tokenContract.methods.balanceOf(account).call()
      .then(balance => this.web3.utils.fromWei(balance, 'ether'));
  }

  buyTokens(etherAmount: number): void {
    const weiAmount = this.web3.utils.toWei(etherAmount, 'ether');
    this.crowdsaleContract.methods.buyTokens(this.account).send({
      from: this.account,
      value: weiAmount
    });
  }
}
