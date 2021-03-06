import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

import { CharityService } from '../../services/charity.service';
import { Charity } from 'src/app/model/charity';
import { Account  } from '../../model/account';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.css']
})
export class CharityDetailsComponent implements OnInit {

  account: Account;
  charity: Charity;
  selectedAmount: number = null;
  charityName: string;
  donationTiers: number[] = [5, 10, 25, 50, 100, 250, 500, 1000];
  cardNumber: number;
  donated = false;
  response: any;

  constructor(public authenticationService: AuthenticationService,
              private charityService: CharityService,
              private route: ActivatedRoute,
              private http: HttpClient) {
    this.charityService.ready.subscribe(() => {
      this.charity = this.charityService.getCharity(this.charityName);
    });

    this.authenticationService.ready.subscribe(() => {
      if (this.authenticationService.currentUser != null) {
        this.authenticationService.getUser().subscribe((val: any) => {
          this.account = new Account(val.first_name,
                                    val.last_name,
                                    val.interests,
                                    val.donation_history,
                                    val.profile_image,
                                    val.total_amount_donated,
                                    val.email_address,
                                    val.user_ID,
                                    val.payment_methods);
          if (this.account.payment != undefined) {
            this.cardNumber = parseInt(this.account.payment[0].card_number.replace(/ /g,''));
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.charityName = params.get('charity_name');
      this.charity = this.charityService.getCharity(this.charityName);
    });
    this.authenticationService.getUser().subscribe((val: any) => {
      this.account = new Account(val.first_name,
                                val.last_name,
                                val.interests,
                                val.donation_history,
                                val.profile_image,
                                val.total_amount_donated,
                                val.email_address,
                                val.user_ID,
                                val.payment_methods);
      if (this.account.payment != undefined) {
        this.cardNumber = parseInt(this.account.payment[0].card_number.replace(/ /g,''));
      }
    });
  }

  onClick(amount) {
    if (amount === this.selectedAmount) {
      this.addDonation();
      const payment = {
          'amount': '25',
          'senderEmail': 'test',
          'recipientEmail': 'test'
      };
      this.onCreateTransaction(JSON.stringify(payment));
    } else {
      this.selectedAmount = amount;
    }
  }

  onCreateTransaction(postData: string) {
    this.http.post('http://visa-gives.herokuapp.com/donate/', postData).subscribe((postdata) => {
      this.response = postdata;
      console.log(this.response);
    });
  }

  addDonation() {
    const numDonations =
    ((this.account.donationHistory === undefined) ? 0 :
    this.account.donationHistory.length);

    this.authenticationService.addDonation(
      this.charityName,
      this.selectedAmount,
      formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      numDonations);

    this.donated = !this.donated;
  }

  cancelDonation() {
    this.selectedAmount = null;
  }
}
