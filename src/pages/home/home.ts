import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfileProvider}
  from '../../providers/profile/profile';
import {AuthProvider}
  from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //global variable
  public userProfile: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    //cek firebase
    this.profileProvider.getUserProfile()
      .on('value', userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.val()
      });
  }

  //untuk buka halaman profile
  goToProfile() : void {
    this.navCtrl.push('ProfilePage');
  }

}
