import {Component, OnInit} from '@angular/core';
import {OauthService} from '../../../core/services/auth/oauth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private readonly oauthService: OauthService) { }

  ngOnInit() {
    this.oauthService.handleRedirectCallback();
  }

}
