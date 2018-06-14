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
import { NavParams, ViewController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';
import { Answer } from '../../../sdk';
import { SeguimientoService } from '../../services/seguimiento.service';
/**
 * Generated class for the RespuestaSeguimientoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RespuestaSeguimientoPage = /** @class */ (function () {
    function RespuestaSeguimientoPage(navParams, viewCtrl, answerService, seguimientoservices) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.answerService = answerService;
        this.seguimientoservices = seguimientoservices;
        this.answer = new Answer();
        this.data = new Array();
        var data = navParams.get('data');
        this._mode = isPresent(data) && isPresent(data.mode) ? data.mode : '';
        this._question_id = isPresent(data) && isPresent(data.questionId) ? data.questionId : '';
        this._answer_id = isPresent(data) && isPresent(data.answerId) ? data.answerId : '';
    }
    RespuestaSeguimientoPage.prototype.ionViewWillLoad = function () {
        var data = this.navParams.get('data');
        if (data.answer) {
            this.answer = data.answer;
        }
        this.answerForm = new FormGroup({
            answer: new FormControl(this.answer.answer, Validators.required)
        });
    };
    RespuestaSeguimientoPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    //metodo para la insersion de la respuesta del enlace
    RespuestaSeguimientoPage.prototype.onSubmit = function (value) {
        var _this = this;
        console.log("estoy en el submit de respuesta seguimiento");
        var data = value;
        console.log(data.answer);
        //valores de los parametros del metodo 
        //pushSeguimiento(valor del text area, id_usuario, id_solicitud, id_status)
        this.seguimientoservices.pushSeguimiento(data.answer, 53, 70, 2)
            .subscribe(function (data) { _this.data = data.data; });
        this.dismiss();
    };
    RespuestaSeguimientoPage = __decorate([
        Component({
            selector: 'page-respuesta-seguimiento',
            templateUrl: 'respuesta-seguimiento.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            ViewController,
            AnswerService,
            SeguimientoService])
    ], RespuestaSeguimientoPage);
    return RespuestaSeguimientoPage;
}());
export { RespuestaSeguimientoPage };
//# sourceMappingURL=respuesta-seguimiento.js.map