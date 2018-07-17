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
import { NavParams, ViewController, AlertController, NavController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';
import { Answer } from '../../../sdk';
import { SeguimientoService } from '../../services/seguimiento.service';
/**
 *
 *  Clase que realiza la Inserción de un seguimiento.
 *
 */
var RespuestaSeguimientoPage = /** @class */ (function () {
    function RespuestaSeguimientoPage(navCtrl, navParams, viewCtrl, answerService, alertCtrl, seguimientoservices) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.answerService = answerService;
        this.alertCtrl = alertCtrl;
        this.seguimientoservices = seguimientoservices;
        this.answer = new Answer();
        this.data = new Array();
        this.seguimientos = new Array();
        this.user = new Array();
        this.sol = new Array();
        this.status = new Array();
        this.extraer = {};
        this.solicitud = new Array();
        var data = navParams.get('data');
        this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
    }
    RespuestaSeguimientoPage.prototype.ionViewWillLoad = function () {
        var data = this.navParams.get('data');
        //recuperar datos del localstorage de status
        this.status = JSON.parse(localStorage.getItem('status'));
        //condicion para verificar si en el "textArea" existe un valor
        if (data.answer) {
            this.answer = data.answer;
        }
        //de lo contrario se crea un formulario de la clase FORMGROUP
        this.answerForm = new FormGroup({
            answer: new FormControl(this.answer.answer, Validators.required),
            valstatus: new FormControl('', Validators.required)
        });
    };
    RespuestaSeguimientoPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    /**
    * onSubmit() metodo para insertar de un seguimiento
    *
    *  @param {Object} value
    *  @return {Void}
    */
    RespuestaSeguimientoPage.prototype.onSubmit = function (value) {
        var _this = this;
        //se recupera el valor del Formulario
        var data = value;
        //recuperando valores del localstorage de usuario
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        for (var u in this.user) {
            this.extraer.id_usuario = this.user[u].id;
        }
        //recuperando valores del localstorage de solicitud
        this.sol = JSON.parse(localStorage.getItem('solicitud'));
        for (var s in this.sol) {
            this.extraer.id_solicitud = this.sol[s].id_solicitud;
        }
        this.seguimientoservices.pushSeguimiento(data.answer, this.extraer.id_usuario, this.extraer.id_solicitud, data.valstatus)
            .subscribe(function (seguimiento) {
            _this.seguimientos = seguimiento.seguimiento;
            _this.solicitud = seguimiento.sol;
            //los valores que recibimos del service los guardamos en el localStorage
            localStorage.setItem('seguimiento', JSON.stringify(_this.seguimientos));
            localStorage.setItem('solicitud', JSON.stringify(_this.solicitud));
        });
        this.showMensaje('Se inserto el registro con exito');
        this.dismiss();
    };
    /**
   * showMensaje() metodo para mostrar un mensaje en la pantalla cuando se requiera
   *
   *  @param {Object} msg
   *  @return {Void}
   */
    RespuestaSeguimientoPage.prototype.showMensaje = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Aviso',
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    RespuestaSeguimientoPage = __decorate([
        Component({
            selector: 'page-respuesta-seguimiento',
            templateUrl: 'respuesta-seguimiento.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            AnswerService,
            AlertController,
            SeguimientoService])
    ], RespuestaSeguimientoPage);
    return RespuestaSeguimientoPage;
}());
export { RespuestaSeguimientoPage };
//# sourceMappingURL=respuesta-seguimiento.js.map