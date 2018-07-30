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
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { SeguimientoService } from '../../services/seguimiento.service'; //igh
import { Question } from '../../../sdk'; //igh
var PreguntaSeguimientoPage = /** @class */ (function () {
    function PreguntaSeguimientoPage(navParams, viewCtrl, alertCtrl, seguimientoservices) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.seguimientoservices = seguimientoservices;
        this.question = new Question();
        this.seguimientos = new Array();
        this.seguimientos = JSON.parse(localStorage.getItem('seguimiento'));
        this.id_usuario = 30; //El id 3 es fijo y pertenece al usuario "Ciudadano", revisar el modelo
        this.id_solicitud = this.seguimientos[0].id_solicitud;
        this.id_status = this.seguimientos[0].id_status;
    }
    PreguntaSeguimientoPage.prototype.ionViewWillLoad = function () {
        this.questionForm = new FormGroup({
            question: new FormControl('', Validators.required)
        });
    };
    PreguntaSeguimientoPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    //Método para la insersión de un comentario del ciudadano
    PreguntaSeguimientoPage.prototype.onSubmit = function (value) {
        var _this = this;
        var data = value; //se recupera el valor del text area
        console.log('Text area: ' + data.question + ' ' + this.id_usuario, this.id_solicitud, this.id_status);
        this.seguimientoservices.pushComentario(data.question, this.id_usuario, this.id_solicitud, this.id_status)
            .subscribe(function (seguimiento) {
            _this.seguimientos = seguimiento.seguimiento;
            console.log('IMPRIMIENDO SEGUIMIENTOS' + _this.seguimientos);
            localStorage.setItem('seguimiento', JSON.stringify(_this.seguimientos));
        });
        this.showMensaje('Se inserto el registro con exito');
        this.dismiss();
    };
    PreguntaSeguimientoPage.prototype.showMensaje = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Aviso',
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    PreguntaSeguimientoPage = __decorate([
        Component({
            selector: 'pregunta-seguimiento-page',
            templateUrl: 'pregunta-seguimiento.html'
        }),
        __metadata("design:paramtypes", [NavParams,
            ViewController,
            AlertController,
            SeguimientoService])
    ], PreguntaSeguimientoPage);
    return PreguntaSeguimientoPage;
}());
export { PreguntaSeguimientoPage };
//# sourceMappingURL=pregunta-seguimiento.js.map