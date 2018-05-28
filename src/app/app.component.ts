import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../providers/auth/auth';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  // pages:any;
  
  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen,
    private auth: AuthService, private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // this.pages = [
      //   { title: 'Home', component: HomePage, icon: 'home' }
      // ];
    });

    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if(!user){
        this.rootPage = 'login';
        unsubscribe();
      } else {
        this.rootPage = HomePage
        unsubscribe();
      }
    });
  }

  // initializeApp(){
  //   this.platform.ready().then(
  //     () => {
  //       this.statusBar.styleDefault();
  //     }
  //   );

    // this.auth.afAuth.authState.subscribe(
    //   user => {
    //     if(user) {
    //       this.rootPage = HomePage;
    //     } else {
    //       this.rootPage = LoginPage;
    //     }
    //   },
    //   () => {
    //     this.rootPage = LoginPage;
    //   }
    // );
  // }

  // login(){
  //   this.menu.close();
  //   this.auth.signOut();
  //   this.nav.setRoot(LoginPage);
  // }

  // logout() {
  //   this.menu.close();
  //   this.auth.signOut();
  //   this.nav.setRoot(HomePage);
  // }
}

