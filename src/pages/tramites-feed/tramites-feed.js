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
import { SeguimientoFeedPage } from '../seguimiento-feed/seguimiento-feed';
import { TramiteService } from '../../services/tramites.service';
var TramiteFeedPage = /** @class */ (function () {
    function TramiteFeedPage(navCtrl, navParams, tramiteService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tramiteService = tramiteService;
        this.alertCtrl = alertCtrl;
        this._query = 'all';
        this.solicitudes = [];
        this.unidadAdministrativa = [];
        this.direccion = [];
        var query_param = navParams.get('query');
        this._query = isPresent(query_param) ? query_param : 'all';
    }
    TramiteFeedPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var id_usuario = 53;
        var id_grupo = 2;
        var id_unidadadministrativa = 6;
        var id_direccion = 24;
        this.tramiteService.getSolicitudes(id_usuario, id_grupo, id_unidadadministrativa, id_direccion)
            .subscribe(function (solicitudes) {
            _this.solicitudes = solicitudes.solicitudes;
            localStorage.setItem('solicitudes', JSON.stringify(_this.solicitudes));
        });
        this.tramiteService.getUnidadAdministrativa(id_usuario, id_grupo, id_unidadadministrativa, id_direccion)
            .subscribe(function (unidadadministrativa) {
            _this.unidadAdministrativa = unidadadministrativa.unidadadministrativa;
            localStorage.setItem('unidadadministrativa', JSON.stringify(_this.unidadAdministrativa));
        });
        this.tramiteService.getDireccion(id_usuario, id_grupo, id_unidadadministrativa, id_direccion)
            .subscribe(function (direccion) {
            _this.direccion = direccion.direccion;
            localStorage.setItem('direccion', JSON.stringify(_this.direccion));
        });
    };
    TramiteFeedPage.prototype.openDetails = function (params) {
        this.navCtrl.push(SeguimientoFeedPage, params);
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    TramiteFeedPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de nuestra aplicación web en la dirección (url) <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a> desde tu laptop o computadora de escritorio',
            buttons: ['Ok']
        });
        alert.present();
    };
    TramiteFeedPage = __decorate([
        Component({
            selector: 'learn-feed-page',
            templateUrl: 'tramites-feed.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            TramiteService,
            AlertController])
    ], TramiteFeedPage);
    return TramiteFeedPage;
}());
export { TramiteFeedPage };
//# sourceMappingURL=tramites-feed.js.map