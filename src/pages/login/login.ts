import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TramiteFeedPage } from '../tramites-feed/tramites-feed';
import { SeguimientoFeedPage } from '../seguimiento-feed/seguimiento-feed'
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
    //Api connections
    this.navCtrl.push(TramiteFeedPage);
    }

}
