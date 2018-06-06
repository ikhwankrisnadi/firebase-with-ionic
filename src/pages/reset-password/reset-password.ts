import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Alert, AlertController} from 'ionic-angular';
import { error } from '@firebase/database/dist/src/core/util/util';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  //global variable
  public resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
  
      //cek validasi form
      this.resetPasswordForm = formBuilder.group({
        email: [
          '',
          Validators.compose([Validators.required])
        ]
      });
  }

  //proses reset password
  resetPassword(): void {
    //cek form sudah valid atau belum
    if (!this.resetPasswordForm.valid){
      console.log(`Form belum valid: ${this.resetPasswordForm.value}`);
    }else{
      const email:string = this.resetPasswordForm.value.email;

      //baca dari firebase
      this.authProvider.resetPassword(email)
        .then(user => { //resolve
          const myAlert : Alert = this.alertCtrl.create ({
            message: 'Cek email untuk reset password!',
            buttons:[{
              text: 'Yes',
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
          });
          myAlert.present();
        },
        error => { //reject
          const errorAlert : Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{
              text: 'OK',
              role: 'cancel'
            }]
          });
          errorAlert.present();
        }
      )
    }
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
