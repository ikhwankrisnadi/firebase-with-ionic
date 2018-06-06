import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import firebase from 'firebase'; // versi lama
import firebase from 'firebase/app';  // wajib karena core
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from './credentials';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    // menginisialisasi firebase
    firebase.initializeApp(firebaseConfig);

    // cek apakah user sudah terauthentikasi atau belum
    const unsubscribe = firebase.auth()
      .onAuthStateChanged(user => {
        if (!user) {    // belum terauthentikasi
          this.rootPage = 'LoginPage';
          unsubscribe();
        } else {        // sudah terauthentikasi
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
  }
}

