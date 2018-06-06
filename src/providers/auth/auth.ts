import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  // function untuk login user
  loginUser(email: string,
    password: string): Promise<any> {
      return firebase.auth()
        .signInWithEmailAndPassword(email, password);
  }

  // function untuk signup user
  signupUser(email: string, 
    password: string): Promise<any> {
      return firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(newUserCredential => {
          // resolve
          firebase.database()
            .ref(`/userProfile/${newUserCredential.user.uid}/email`)
            .set(email)
        })
        .catch(error => {
          console.error(error);
          throw new Error(error);
        });
  }

  // function untuk reset password
  resetPassword(email: string): Promise<any> {
    return firebase.auth()
      .sendPasswordResetEmail(email);
  }

  // function untuk logout user
  logoutUser(): Promise<any> {
    const userId: string = firebase.auth()
      .currentUser.uid;
    firebase.database()
      .ref(`/userProfile/${userId}`)
      .off();
      
    return firebase.auth().signOut();
  }

}
