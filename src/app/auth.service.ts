import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) { }

  doLoginGoogle() {
    let nombre, foto, token, email;
    const db = firebase.firestore();

    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(
      (success) => {
        nombre = success.user.displayName;
        foto   = success.user.photoURL;
        token  = success.user.uid;
        email  = success.user.email;
        this.sendToken(token);

        db.collection('users').doc(token).set({
          name: nombre,
          email: email,
          photo: foto,
          uid: token
        }).then(function() {
          console.log('Document successfully written!');
      })
      .catch(function(error) {
          console.error('Error writing document: ', error);
      });
        console.log('exito: ', success);
        this.ngZone.run(() => this.router.navigate(['/user']));
      }).catch(
        (err) => {
          console.log('fracaso: ', err);
        // this.error = err;
      });
  }

  logout() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      localStorage.removeItem('LoggedInUser');
      this.ngZone.run(() => this.router.navigate(['/']));
      console.log('Log out exitoso');
    }).catch(function(error) {
      // An error happened.
    });
  }

  sendToken(token: string) {
    localStorage.setItem('LoggedInUser', token);
  }
  getToken() {
    return localStorage.getItem('LoggedInUser');
  }


  isLoggednIn() {
    return this.getToken() !== null;
  }
}
