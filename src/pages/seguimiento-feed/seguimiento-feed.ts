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
    this.seguimientoService.getFeedCategories(70,70)
    .subscribe(
      (data) => {
        this.data = data.data;
        console.log('datos recuperados '+this.data);
      },
    );
    this.seguimientoService.getSolicitudes(70,70)
    .subscribe(
      (solicitud) => {this.solicitud = solicitud.solicitud;},
      );
    this.seguimientoService.getTramite(70,70)
    .subscribe(
      (tramite)=> {this.tramite =tramite.tramite;},
      );
    this.seguimientoService.getSeguimientos(70,70)
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
      subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de nuestra aplicación web en la dirección (url) <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a> desde tu laptop o computadora de escritorio',
      buttons: ['Ok']
    });
    alert.present();
  }

}
