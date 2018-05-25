import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthService, fb: FormBuilder) {
      this.loginForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let data = this.loginForm.value;
    if(!data.email){
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };

    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => this.loginError = error.message
      );
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

}
