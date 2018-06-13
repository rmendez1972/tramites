import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

import { SeguimientoFeedPage } from '../seguimiento-feed/seguimiento-feed';
import { User } from './user';
import { AuthenticationService } from '../../services/authentication.service';

import { TramiteFeedPage } from '../tramites-feed/tramites-feed';

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
    private authenticationService: AuthenticationService,
    private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    //this.authenticationService.logout();
  }

  login(){


    this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {

                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

                    if (JSON.stringify(this.currentUser).length > 10) {

                        this.showAlert('Autenticado Exitosamente');
                        if (this.currentUser[0].id_grupo==2 || this.currentUser[0].id_grupo==1){
                          this.navCtrl.push(TramiteFeedPage);
                          console.log('grupo  '+this.currentUser[0].id_grupo);
                        }
                        if (this.currentUser[0].id_grupo==3){
                          let sol={
                            id_solicitud: this.currentUser[0].id_solicitud,
                            id_solicitante: this.currentUser[0].id_solicitante
                          }
                          this.navCtrl.push(SeguimientoFeedPage, {sol: sol});
                          console.log('grupo  '+this.currentUser[0].id_grupo);
                        }

                    }else{


                        this.showAlert('usuario y/o contraseña equivocados, intneta de nuevo');
                        //this.loading = false;
                    }
                },
                error => {
                    //this.alertService.error(error);
                    //this.loading = false;
                    //this.router.navigate(['/']);
                });


  }




  // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert(msg) {

    const alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: msg ,
      buttons: ['Ok']
    });
    alert.present();
  }
}
