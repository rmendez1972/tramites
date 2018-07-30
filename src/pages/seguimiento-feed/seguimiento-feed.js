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
import { SeguimientoTramitePage } from '../seguimiento-tramite/seguimiento-tramite';
import { SeguimientoService } from '../../services/seguimiento.service';
var SeguimientoFeedPage = /** @class */ (function () {
    function SeguimientoFeedPage(navCtrl, navParams, seguimientoService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.seguimientoService = seguimientoService;
        this.alertCtrl = alertCtrl;
        /**
        * Variables locales
        */
        this._query = 'all';
        this.data = new Array();
        this.solicitud = new Array();
        this.tramite = new Array();
        this.seguimientos = [];
        this.todoslosSeguimientos = [];
        this.muestraToggle = false;
        this.ocultaBack = false;
        var query_param = navParams.get('query');
        this._query = isPresent(query_param) ? query_param : 'todos';
        var page = navParams.get('page');
        //console.log ('valor PAGE '+page);
        this.metodo = isPresent(page) ? page.params.metodo : 'todosSeg';
        //console.log ('valor de metodo '+this.metodo);
        var solicitud_param = navParams.get('sol');
        //console.log('valor de SOL '+solicitud_param);
        this.id_solicitud = solicitud_param.id_solicitud;
        this.id_solicitante = solicitud_param.id_solicitante;
    }
    SeguimientoFeedPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.verificaSiciudadano();
        this.seguimientoService.getData(this.id_solicitud, this.id_solicitante)
            .subscribe(function (data) {
            _this.data = data.data;
            localStorage.setItem('data', JSON.stringify(_this.data));
        });
        this.seguimientoService.getSolicitudes(this.id_solicitud, this.id_solicitante)
            .subscribe(function (solicitud) {
            _this.solicitud = solicitud.solicitud;
            localStorage.setItem('solicitud', JSON.stringify(_this.solicitud));
        });
        this.seguimientoService.getTramite(this.id_solicitud, this.id_solicitante)
            .subscribe(function (tramite) {
            _this.tramite = tramite.tramite;
            localStorage.setItem('tramite', JSON.stringify(_this.tramite));
        });
        this.seguimientoService.getSeguimientos(this.id_solicitud, this.id_solicitante)
            .subscribe(function (seguimientos) {
            _this.seguimientos = seguimientos.seguimientos;
            _this.todoslosSeguimientos = seguimientos.seguimientos;
            localStorage.setItem('seguimiento', JSON.stringify(_this.seguimientos));
            if (_this.seguimientos.length == 0) {
                var subtitle = 'No hay seguimientos que mostrar hasta este momento.';
                _this.showAlert(subtitle);
            }
        });
        this.seguimientoService.getStatus()
            .subscribe(function (status) {
            _this.status = status.status;
            localStorage.setItem('status', JSON.stringify(_this.status));
        });
    };
    ;
    SeguimientoFeedPage.prototype.ionViewDidEnter = function () {
        if (this.metodo == 'todosSeg') {
            this.todosSeg();
        }
        else {
            this.ultimoSeg();
        }
    };
    ;
    SeguimientoFeedPage.prototype.ultimoSeg = function () {
        this.seguimientos = [];
        this.todoslosSeguimientos = JSON.parse(localStorage.getItem('seguimiento'));
        console.log('el ultimo seguimiento es ' + this.todoslosSeguimientos[0]);
        this.seguimientos.push(this.todoslosSeguimientos[0]);
        console.log('estoy en el ultimo seguimiento y la longitud es' + this.seguimientos.length);
    };
    ;
    SeguimientoFeedPage.prototype.todosSeg = function () {
        this.seguimientos = [];
        this.todoslosSeguimientos = JSON.parse(localStorage.getItem('seguimiento'));
        this.seguimientos = this.todoslosSeguimientos;
        console.log('todos los seguimiento');
    };
    ;
    /** Este Metodo es para enviar datos a la card SeguimientoTramitePage
    * @author: Angel Lara
    * @param {any } params
    * @param {push} SeguimientoTramitePage, params
    * @return {void}
    */
    SeguimientoFeedPage.prototype.openDetails = function (params) {
        this.navCtrl.push(SeguimientoTramitePage, params);
    };
    ;
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    SeguimientoFeedPage.prototype.showAlert = function (subtitle) {
        if (subtitle === void 0) { subtitle = 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>'; }
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: subtitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    ;
    SeguimientoFeedPage.prototype.verificaSiciudadano = function () {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser[0].id_grupo == 3) {
            this.muestraToggle = false;
            this.ocultaBack = true;
        }
        if (this.currentUser[0].id_grupo == 1 || this.currentUser[0].id_grupo == 2) {
            this.muestraToggle = true;
            this.ocultaBack = false;
        }
    };
    ;
    SeguimientoFeedPage = __decorate([
        Component({
            selector: 'learn-feed-page',
            templateUrl: 'seguimiento-feed.html',
        })
        /**
        * class SeguimientoFeedPage()
        * Esta clase se usa para Obtener y almacenar en el local storage los datos.
        * @author: Angel Lara
        * @return {export} export class
        */
        ,
        __metadata("design:paramtypes", [NavController,
            NavParams,
            SeguimientoService,
            AlertController])
    ], SeguimientoFeedPage);
    return SeguimientoFeedPage;
}());
export { SeguimientoFeedPage };
//# sourceMappingURL=seguimiento-feed.js.map