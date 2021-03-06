import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  Alert, AlertController,
  Loading, LoadingController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // global variable
  public loading: Loading;
  public signupForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder) {

    // perintah untuk validasi form
    this.signupForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  // fungsi untuk proses signup user
  signupUser() {
    // cek email dan password sudah valid atau belum
    if (!this.signupForm.valid) { // belum valid
      console.log(`Form belum valid: ${this.signupForm.value}`);
    } else {    // sudah valid
      // baca formControlName dahulu
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      // cek firebase dari AuthProvider
      this.authProvider.signupUser(email, password)
        .then(    // resolve
          authData => {
            this.loading.dismiss().then(() => {
              this.navCtrl.setRoot(HomePage);
            });
          },      // reject
          error => {
            this.loading.dismiss().then(() => {
              const myAlert: Alert = this.alertCtrl.create({
                message: error.message,
                buttons: [{ text: 'OK', role: 'cancel' }]
              });
              myAlert.present();
            });
          }
        );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
