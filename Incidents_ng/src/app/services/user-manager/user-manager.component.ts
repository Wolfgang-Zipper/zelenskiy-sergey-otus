import { Component } from '@angular/core';
import { UserManager } from 'oidc-client';

@Component({
  selector: 'user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent {
  userManager = new UserManager({
    authority: 'https://login.yandex.ru',
    client_id: '2e3cdeda7a6747398d79d11a6245e891',
    redirect_uri: 'http://localhost:4200/callback',
    response_type: 'id_token token',
    scope: 'openid profile email',
  });

  signIn() {
    this.userManager.signinRedirect();
  }
}
