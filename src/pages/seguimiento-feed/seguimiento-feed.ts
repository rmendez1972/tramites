import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { LearnDetailsPage } from '../learn-details/learn-details';
import { SeguimientoService } from '../../services/seguimiento.service';
import { CategoryModel } from '../../services/seguimiento.model';

@Component({
  selector: 'learn-feed-page',
  templateUrl: 'seguimiento-feed.html',
})
export class SeguimientoFeedPage {
  _query : string = 'all';
  data : Array<CategoryModel> = new Array<CategoryModel>();
  solicitud:Array<CategoryModel> = new Array<CategoryModel>();
  tramite:Array<CategoryModel> = new Array<CategoryModel>();
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public seguimientoService: SeguimientoService,
    public alertCtrl: AlertController
  ) {
    let query_param = navParams.get('query');
    this._query = isPresent(query_param) ? query_param : 'all';
  }

  ionViewWillEnter() {
    this.seguimientoService.getFeedCategories(69,69)
    .subscribe(
      (data) => {
        this.data = data.data;
        console.log('datos recuperados '+this.data);
      },
    );
    this.seguimientoService.getSolicitudes(69,69)
    .subscribe(
      (solicitud) => {this.solicitud = solicitud.solicitud;},
      );
    this.seguimientoService.getTramite(69,69)
    .subscribe(
      (tramite)=> {this.tramite =tramite.tramite;},
      );
    this.seguimientoService.getSeguimientos(69,69)
    .subscribe(
      (seguimientos)=>{this.seguimientos = seguimientos.seguimientos;}
      )
  }

  openDetails(params) {
    this.navCtrl.push(LearnDetailsPage, params);
  }

  // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
  showAlert() {

    const alert = this.alertCtrl.create({
      title: 'Atento Aviso!',
      subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a> ',
      buttons: ['Ok']
    });
    alert.present();
  }

}
