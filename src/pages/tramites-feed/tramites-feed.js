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
        /**
        * Variables locales de TramiteFeedPage
        */
        this._query = 'all';
        this.solicitudes = [];
        this.todoslosSolicitudes = [];
        this.unidadAdministrativa = [];
        this.direccion = [];
        this.status = [];
        var query_param = navParams.get('query');
        this._query = isPresent(query_param) ? query_param : 'all';
    }
    TramiteFeedPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        /**
        * Variables locales
        */
        this.currentUser = [];
        var id_usuario = 0;
        var id_grupo = 0;
        var id_unidadadministrativa = 0;
        var id_direccion = 0;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        for (var i = 0; i < 1; i++) {
            id_usuario = this.currentUser[i].id;
            id_grupo = this.currentUser[i].id_grupo;
            id_unidadadministrativa = this.currentUser[i].id_unidadadministrativa;
            id_direccion = this.currentUser[i].id_direccion;
        }
        var solicitudFinal = {
            id_usuario: id_usuario,
            id_grupo: id_grupo,
            id_unidadadministrativa: id_unidadadministrativa,
            id_direccion: id_direccion
        };
        this.tramiteService.getSolicitudes(solicitudFinal.id_usuario, solicitudFinal.id_grupo, solicitudFinal.id_unidadadministrativa, solicitudFinal.id_direccion)
            .subscribe(function (solicitudes) {
            _this.solicitudes = solicitudes.solicitudes;
            _this.todoslosSolicitudes = solicitudes.solicitudes;
            localStorage.setItem('solicitudes', JSON.stringify(_this.solicitudes));
        });
        this.tramiteService.getUnidadAdministrativa(solicitudFinal.id_usuario, solicitudFinal.id_grupo, solicitudFinal.id_unidadadministrativa, solicitudFinal.id_direccion)
            .subscribe(function (unidadadministrativa) {
            _this.unidadAdministrativa = unidadadministrativa.unidadadministrativa;
            localStorage.setItem('unidadadministrativa', JSON.stringify(_this.unidadAdministrativa));
        });
        this.tramiteService.getDireccion(solicitudFinal.id_usuario, solicitudFinal.id_grupo, solicitudFinal.id_unidadadministrativa, solicitudFinal.id_direccion)
            .subscribe(function (direccion) {
            _this.direccion = direccion.direccion;
            localStorage.setItem('direccion', JSON.stringify(_this.direccion));
        });
        this.tramiteService.getStatus()
            .subscribe(function (status) {
            _this.status = status.status;
            localStorage.setItem('status', JSON.stringify(_this.status));
        });
    };
    TramiteFeedPage.prototype.ultimoSol = function () {
        this.solicitudes = [];
        this.todoslosSolicitudes = JSON.parse(localStorage.getItem('solicitudes'));
        //console.log('el ultimo seguimiento es '+this.todoslosSolicitudes[0]);
        this.solicitudes.push(this.todoslosSolicitudes[0]);
        //console.log('estoy en el ultimo solicitud y la longitud es'+this.solicitudes.length);
    };
    TramiteFeedPage.prototype.todosSol = function () {
        this.solicitudes = [];
        this.todoslosSolicitudes = JSON.parse(localStorage.getItem('solicitudes'));
        this.solicitudes = this.todoslosSolicitudes;
        //console.log('todos los solicitudes');
    };
    /**
    * openDetails()
    * Enviando datos a SeguimientoFeedPage
    * @author: Angel Lara
    * @param {any } params
    * @param {push} SeguimientoFeedPage, params
    * @return {void}
    */
    TramiteFeedPage.prototype.openDetails = function (params) {
        this.navCtrl.push(SeguimientoFeedPage, params);
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    TramiteFeedPage.prototype.showAlert = function (subtitle) {
        if (subtitle === void 0) { subtitle = 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>'; }
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: subtitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    TramiteFeedPage = __decorate([
        Component({
            selector: 'learn-feed-page',
            templateUrl: 'tramites-feed.html',
        })
        /**
        * class TramiteFeedPage()
        * @author: Angel Lara
        * @return {export} export class
        */
        ,
        __metadata("design:paramtypes", [NavController,
            NavParams,
            TramiteService,
            AlertController])
    ], TramiteFeedPage);
    return TramiteFeedPage;
}());
export { TramiteFeedPage };
//# sourceMappingURL=tramites-feed.js.map