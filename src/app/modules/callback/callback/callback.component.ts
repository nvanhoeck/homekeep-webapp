import {Component, OnInit} from '@angular/core';
import {OauthService} from '../../../core/services/auth/oauth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private readonly oauthService: OauthService, private readonly router: Router) { }

  ngOnInit() {
    this.oauthService.handleRedirectCallback();
    this.router.navigate(['rooms']);
  }

}
