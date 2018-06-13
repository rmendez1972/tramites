import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SeguimientoFeedPage } from '../seguimiento-feed/seguimiento-feed';
import { User } from './user';
import { AuthenticationService } from '../../services/authentication.service';
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
  model: any = {};
  currentUser: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authenticationService: AuthenticationService,) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    this.authenticationService.logout();
  }

  login(){

    this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {

                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

                    if (JSON.stringify(this.currentUser).length > 10) {
                        this.navCtrl.push(SeguimientoFeedPage);
                        //this.alertService.success("Autenticado exitosamente...");

                    }else{

                        this.authenticationService.logout();
                        //this.alertService.error("email y/o password erroneos, intenta de nuevo...",true);
                        //this.loading = false;
                    }




                },
                error => {
                    //this.alertService.error(error);
                    //this.loading = false;
                    //this.router.navigate(['/']);
                });


  }

}
