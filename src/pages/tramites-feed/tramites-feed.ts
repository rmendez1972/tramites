import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { SeguimientoFeedPage } from '../seguimiento-feed/seguimiento-feed';
import { TramiteService } from '../../services/tramites.service';


@Component({
  selector: 'learn-feed-page',
  templateUrl: 'tramites-feed.html',
})
export class TramiteFeedPage {
  _query : string = 'all';
  solicitudes= [];
  unidadAdministrativa= [];
  direccion = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tramiteService: TramiteService,
    public alertCtrl: AlertController
  ) {
    let query_param = navParams.get('query');
    this._query = isPresent(query_param) ? query_param : 'all';
  }

  ionViewWillEnter() {

    var id_usuario=2;
    var id_grupo=1;

    var id_unidadadministrativa=3;
    var id_direccion=20;
    this.tramiteService.getSolicitudes(id_usuario,id_grupo,id_unidadadministrativa,id_direccion)
    .subscribe(
      (solicitudes) => {
        this.solicitudes = solicitudes.solicitudes;
        localStorage.setItem('solicitudes',JSON.stringify(this.solicitudes));
      },
    );
    this.tramiteService.getUnidadAdministrativa(id_usuario,id_grupo,id_unidadadministrativa,id_direccion)
    .subscribe(
      (unidadadministrativa)=>{
        this.unidadAdministrativa = unidadadministrativa.unidadadministrativa;
        localStorage.setItem('unidadadministrativa',JSON.stringify(this.unidadAdministrativa));
      },
    );
    this.tramiteService.getDireccion(id_usuario,id_grupo,id_unidadadministrativa,id_direccion)
    .subscribe(
      (direccion)=>{
        this.direccion= direccion.direccion;
        localStorage.setItem('direccion',JSON.stringify(this.direccion));
      },
    );
  }

  openDetails(params) {
    this.navCtrl.push(SeguimientoFeedPage, params);
  }

  // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert() {

    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de nuestra aplicación web en la dirección (url) <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a> desde tu laptop o computadora de escritorio',
      buttons: ['Ok']
    });
    alert.present();
  }

}
