var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { LearnDetailsPage } from '../learn-details/learn-details';
import { SeguimientoService } from '../../services/seguimiento.service';
var SeguimientoFeedPage = /** @class */ (function () {
    function SeguimientoFeedPage(navCtrl, navParams, seguimientoService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.seguimientoService = seguimientoService;
        this.alertCtrl = alertCtrl;
        this._query = 'all';
        this.data = new Array();
        this.solicitud = new Array();
        this.tramite = new Array();
        this.seguimientos = new Array();
        this.id_solicitud = 0;
        this.id_solicitante = 0;
        var query_param = navParams.get('query');
        this._query = isPresent(query_param) ? query_param : 'all';
    }
    SeguimientoFeedPage.prototype.getDatos = function () {
        this.seguimiento = [];
        this.seguimiento = JSON.parse(localStorage.getItem('seguimiento'));
        for (var i = 0; i < 1; i++) {
            this.id_solicitud = this.seguimiento[i].id_seguimiento;
            this.id_solicitante = this.seguimiento[i].id_solicitud;
        }
    };
    SeguimientoFeedPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log();
        this.seguimientoService.getData(this.id_solicitud, this.id_solicitante)
            .subscribe(function (data) {
            _this.data = data.data;
            localStorage.setItem('data', JSON.stringify(_this.data));
        });
        /*
        this.seguimientoService.getSolicitudes(id_solicitud,id_solicitante)
        .subscribe(
          (solicitud) => {this.solicitud = solicitud.solicitud;
          localStorage.setItem('solicitud',JSON.stringify(this.solicitud));},
    
          );
        this.seguimientoService.getTramite(id_solicitud,id_solicitante)
        .subscribe(
          (tramite)=> {this.tramite =tramite.tramite;
            localStorage.setItem('tramite',JSON.stringify(this.tramite));},
          );
        this.seguimientoService.getSeguimientos(id_solicitud,id_solicitante)
        .subscribe(
          (seguimientos)=>{this.seguimientos = seguimientos.seguimientos;
          localStorage.setItem('seguimiento',JSON.stringify(this.seguimientos));
        }
          )
          */
    };
    SeguimientoFeedPage.prototype.openDetails = function (params) {
        this.navCtrl.push(LearnDetailsPage, params);
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    SeguimientoFeedPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de nuestra aplicación web en la dirección (url) <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a> desde tu laptop o computadora de escritorio',
            buttons: ['Ok']
        });
        alert.present();
    };
    SeguimientoFeedPage = __decorate([
        Component({
            selector: 'learn-feed-page',
            templateUrl: 'seguimiento-feed.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            SeguimientoService,
            AlertController])
    ], SeguimientoFeedPage);
    return SeguimientoFeedPage;
}());
export { SeguimientoFeedPage };
//# sourceMappingURL=seguimiento-feed.js.map