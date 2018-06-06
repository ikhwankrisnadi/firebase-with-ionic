import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfileProvider}
  from '../../providers/profile/profile';
import {AuthProvider}
  from '../../providers/auth/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //global variable
  public userProfile: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    //cek firebase
    this.profileProvider.getUserProfile()
      .on('value', userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.val()
      });
  }

  //proses logout
  logout(): void{
    this.authProvider.logoutUser()
      .then(() => {
        this.navCtrl.setRoot('LoginPage');
      });
  }
}
