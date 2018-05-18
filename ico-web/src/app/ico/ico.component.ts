import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { EthereumService } from '../shared/ethereum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ico',
  templateUrl: './ico.component.html',
  styleUrls: ['./ico.component.css']
})
export class IcoComponent implements OnInit {
  crowdsaleBalance: number;
  currentAccount: string;
  currentRate: number;
  tokenBalance: number;
  isOwner: boolean;


  subscription: Subscription;
  intervalSubscription: Subscription;

  constructor(private ethereumService: EthereumService, private router: Router) { }

  ngOnInit() {
    if (this.ethereumService.loaded()) {
      this.loadIcoData();
    }

    this.intervalSubscription = interval(2000).subscribe(() => {
      if (this.ethereumService.loaded()) {
        this.loadIcoData();
      }
    });
  }

  loadIcoData() {
    this.ethereumService.getRate().then(rate => this.currentRate = rate);
    this.currentAccount = this.ethereumService.getCurrentAccount();
    this.ethereumService.getAcquiredTokenBalance(this.currentAccount).then(balance => this.tokenBalance = balance);
    this.ethereumService.isCrowdsaleOwner().then(
      isOwner => this.isOwner = isOwner
    );
  }

  buyTokens(amountInEther: number) {
    this.ethereumService.buyTokens(amountInEther);
  }

  backToHomePage() {
    this.router.navigate(['/']);
  }

}
