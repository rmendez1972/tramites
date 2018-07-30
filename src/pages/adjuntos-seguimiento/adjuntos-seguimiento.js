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
import { NavController, LoadingController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { Question } from '../../../sdk';
import { AnswerService } from '../../services/answer.service';
import { RespuestaSeguimientoPage } from '../respuesta-seguimiento/respuesta-seguimiento';
import { SeguimientoService } from '../../services/seguimiento.service';
import { EdicionSeguimientoPage } from '../edicion-seguimiento/edicion-seguimiento';
import { isPresent } from 'ionic-angular/util/util';
/**
 * Generated class for the ModrespuestaSeguimientoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AdjuntosSeguimientoPage = /** @class */ (function () {
    function AdjuntosSeguimientoPage(navCtrl, navParams, answerService, loadingCtrl, alertCtrl, modalCtrl, segservices, seguimientoservices) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.answerService = answerService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.segservices = segservices;
        this.seguimientoservices = seguimientoservices;
        this.answers = [];
        this.question = new Question();
        //private seguimiento: CategoryModel;
        this.extraer = {};
        //private modelseguimiento:any={};
        this.seguimientos = new Array();
        this.seg = new Array();
        this.actividad = new Array();
        this.segB = new Array();
        this.sol = new Array();
        this.muestrabot = false;
        var data = navParams.get('data');
        this.seguimientoObservaciones = isPresent(data) && isPresent(data.seguimientoObservaciones) ? data.seguimientoObservaciones : '';
        this.seguimientoId_seguimiento = isPresent(data) && isPresent(data.seguimientoId_seguimiento) ? data.seguimientoId_seguimiento : '';
        this.tramite = isPresent(data) && isPresent(data.tramite) ? data.tramite : '';
        this.solicitud = isPresent(data) && isPresent(data.solicitud) ? data.solicitud : '';
    }
    AdjuntosSeguimientoPage.prototype.obtenerAdjuntos = function (id_seguimiento) {
        var _this = this;
        this.seguimientoservices.getAdjuntos(id_seguimiento)
            .subscribe(function (adjuntos) {
            _this.adjuntos = adjuntos.data;
            localStorage.setItem('adjuntos', JSON.stringify(_this.adjuntos));
            if (_this.adjuntos.length == 0) {
                var subtitle = 'No hay archivos adjuntos que mostrar para este seguimientos.';
                _this.showAlert(subtitle);
            }
        });
    };
    //metodo para insertar
    AdjuntosSeguimientoPage.prototype.createAnswerModal = function () {
        var _this = this;
        //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
        if (this.extraer.estatus == 'TRAMITE') {
            //creando modal para insertar
            var create_answer_data = {
                mode: 'Agregar',
                questionId: this.questionId
            };
            var create_answer_modal = this.modalCtrl.create(RespuestaSeguimientoPage, { data: create_answer_data });
            create_answer_modal.onDidDismiss(function (data) {
                _this.getAnswers();
            });
            create_answer_modal.present();
        }
        else {
            this.showMensaje('No es posible generar comentario. El estatus del trámite es: ' + this.extraer.estatus);
        }
    };
    //metodo para editar
    AdjuntosSeguimientoPage.prototype.editAnswerModal = function (id_seguimiento, observaciones, adjuntos, status) {
        var _this = this;
        //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
        if (this.extraer.estatus == 'TRAMITE') {
            //creando modal para editar
            var edit_answer_data = {
                mode: 'Editar',
                answer: observaciones,
                questionId: id_seguimiento,
                adjuntos: adjuntos,
                status: status
            };
            var edit_answer_modal = this.modalCtrl.create(EdicionSeguimientoPage, { data: edit_answer_data });
            edit_answer_modal.onDidDismiss(function (data) {
                _this.getAnswers();
            });
            edit_answer_modal.present();
        }
        else {
            this.showMensaje('No es posible editar el comentario. El estatus del trámite es: ' + this.extraer.estatus);
        }
    };
    AdjuntosSeguimientoPage.prototype.ionViewWillEnter = function () {
        this.obtenerAdjuntos(this.seguimientoId_seguimiento);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.mid_usuario = this.currentUser[0].id;
        //se recuperan los valores del localstorage en el metodo de getAnswers
        //recuperando valores del localstorage de solicitud
        this.sol = JSON.parse(localStorage.getItem('solicitud'));
        //for para recuperar el valor del estatus
        for (var s in this.sol) {
            this.extraer.estatus = this.sol[s].status;
        }
        console.log(this.sol);
        console.log("status del tramite" + this.extraer.estatus);
    };
    AdjuntosSeguimientoPage.prototype.ionViewDidEnter = function () {
    };
    //metodo en donde se buscan los seguimientos y la solicitud que estan guardados en el localStorage
    AdjuntosSeguimientoPage.prototype.getAnswers = function () {
        var loading = this.loadingCtrl.create({
            content: 'Por favor espere...'
        });
        loading.present();
        //recuperando valores del localstorage de seguimiento
        this.seguimientos = JSON.parse(localStorage.getItem('seguimiento'));
        loading.dismiss();
    };
    //metodo para eliminar
    AdjuntosSeguimientoPage.prototype.delete = function (id_seguimiento, adjuntos) {
        var _this = this;
        //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
        if (this.extraer.estatus == 'TRAMITE') {
            //recuperamos los datos del local storage de seguimiento
            this.seg = JSON.parse(localStorage.getItem('seguimiento'));
            //obtenemos la id_solicitud
            for (var elemento in this.seg) {
                this.extraer.id_solicitud = this.seg[elemento].id_solicitud;
            }
            //comparando si este seguimiento tiene un archivo adjunto. Si lo tiene, no se puede borrar
            if (adjuntos) {
                console.log("mostrando mensaje que no se puede borrar");
                this.showMensaje('No puede borrar este registro ya que cuenta con un archivo adjunto');
            }
            else {
                console.log("entrando confirm para borrar");
                //confirm que se presenta para confirmar la eliminacion
                var confirm_1 = this.alertCtrl.create({
                    title: 'Borrar Respuesta',
                    message: '¿Seguro que quiere borrar este comentario?',
                    buttons: [
                        {
                            text: 'No',
                            handler: function () {
                                console.log('No clicked');
                            }
                        },
                        {
                            text: 'Si',
                            handler: function () {
                                _this.segservices.deleteSeguimiento(id_seguimiento, _this.extraer.id_solicitud).subscribe(
                                //obtenemos la lista con los valores actualizados de la lista de seguimientos
                                function (seguimiento) {
                                    _this.seguimientos = seguimiento.seguimiento;
                                    console.log(_this.seguimientos);
                                    //se almacenan en el localstorage
                                    localStorage.setItem('seguimiento', JSON.stringify(_this.seguimientos));
                                });
                                _this.showMensaje('Se elimino el registro con exito');
                                _this.getAnswers();
                            }
                        }
                    ]
                });
                confirm_1.present();
                //fin else del la comparacion del adjunto
            }
        }
        else {
            this.showMensaje('No es posible borraar el comentario. El estatus del trámite es: ' + this.extraer.estatus);
        }
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    AdjuntosSeguimientoPage.prototype.showAlert = function (subtitle) {
        if (subtitle === void 0) { subtitle = 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>'; }
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: subtitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    AdjuntosSeguimientoPage.prototype.showMensaje = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Aviso',
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    AdjuntosSeguimientoPage = __decorate([
        Component({
            selector: 'adjuntos-seguimiento',
            templateUrl: 'adjuntos-seguimiento.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AnswerService,
            LoadingController,
            AlertController,
            ModalController,
            SeguimientoService,
            SeguimientoService])
    ], AdjuntosSeguimientoPage);
    return AdjuntosSeguimientoPage;
}());
export { AdjuntosSeguimientoPage };
//# sourceMappingURL=adjuntos-seguimiento.js.map