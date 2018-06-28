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

  private currentUser:any[];


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
    this.currentUser =[];

    let id_usuario=0;
    let id_grupo=0;
    let id_unidadadministrativa=0;
    let id_direccion=0;

    this.currentUser =JSON.parse(localStorage.getItem('currentUser'));


    for (var i = 0; i < 1 ; i++) {

      id_usuario=this.currentUser[i].id;
      id_grupo=this.currentUser[i].id_grupo;
      id_unidadadministrativa=this.currentUser[i].id_unidadadministrativa;
      id_direccion=this.currentUser[i].id_direccion;
    }

    let solicitudFinal ={
      id_usuario:id_usuario,
      id_grupo:id_grupo,
      id_unidadadministrativa:id_unidadadministrativa,
      id_direccion:id_direccion
    };


    this.tramiteService.getSolicitudes(solicitudFinal.id_usuario,solicitudFinal.id_grupo,solicitudFinal.id_unidadadministrativa,solicitudFinal.id_direccion)
    .subscribe(
      (solicitudes) => {
        this.solicitudes = solicitudes.solicitudes;
        localStorage.setItem('solicitudes',JSON.stringify(this.solicitudes));
      },
    );
    this.tramiteService.getUnidadAdministrativa(solicitudFinal.id_usuario,solicitudFinal.id_grupo,solicitudFinal.id_unidadadministrativa,solicitudFinal.id_direccion)
    .subscribe(
      (unidadadministrativa)=>{
        this.unidadAdministrativa = unidadadministrativa.unidadadministrativa;
        localStorage.setItem('unidadadministrativa',JSON.stringify(this.unidadAdministrativa));
      },
    );
    this.tramiteService.getDireccion(solicitudFinal.id_usuario,solicitudFinal.id_grupo,solicitudFinal.id_unidadadministrativa,solicitudFinal.id_direccion)
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
  showAlert(subtitle:string='En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>') {

    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }

}
