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
 *
 *  Clase que realiza la Eliminacion de un seguimiento y ademas presenta modales para la Inserción y Eliminación de seguimientos
 *.
 */
var ModrespuestaSeguimientoPage = /** @class */ (function () {
    function ModrespuestaSeguimientoPage(navCtrl, navParams, answerService, loadingCtrl, alertCtrl, modalCtrl, segservices, seguimientoservices) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.answerService = answerService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.segservices = segservices;
        this.seguimientoservices = seguimientoservices;
        //declaracion de variables
        this.answers = [];
        this.question = new Question();
        this.extraer = {};
        this.tramite = {};
        this.seguimientos = new Array();
        this.seg = new Array();
        this.actividad = new Array();
        this.segB = new Array();
        this.sol = new Array();
        this.solicitud = {};
        //recibiendo valores del navParams
        var seguimiento = navParams.get('seguimiento');
        //se le asigna el objeto completo a la variable "seguimiento"
        this.seguimiento = isPresent(seguimiento) ? seguimiento : '';
    }
    /**
     * createAmswerModal()
     * metodo para crear y presentar un modal
     *
     *  @return {Void}
     */
    ModrespuestaSeguimientoPage.prototype.createAnswerModal = function () {
        var _this = this;
        //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
        if (this.solicitud.id_status == 2) {
            //creando un objeto con sus respectivas propiedades
            var create_answer_data = {
                mode: 'Agregar',
                questionId: this.questionId
            };
            //creando modal
            var create_answer_modal = this.modalCtrl.create(RespuestaSeguimientoPage, { data: create_answer_data });
            create_answer_modal.onDidDismiss(function (data) {
                _this.getAnswers();
            });
            //presentando modal
            create_answer_modal.present();
        }
        else {
            this.showMensaje('No es posible generar comentario. El estatus del trámite es: ' + this.extraer.estatus);
        }
    };
    /**
     * editAnswerModal()
     * metodo para crear y presentar un modal
     *
     *  @param {Object} seguimiento
     *  @return {Void}
     */
    ModrespuestaSeguimientoPage.prototype.editAnswerModal = function (seguimiento) {
        var _this = this;
        //declarando variables e inicializando con los valores que recibimos en el objeto "seguimientos"
        var id_seguimiento = seguimiento.id_seguimiento;
        var observaciones = seguimiento.observaciones;
        var adjuntos = seguimiento.adjunto;
        var status = seguimiento.id_status;
        //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
        if (this.solicitud.id_status == 2) {
            //creando objeto con sus respectivas propiedades
            var edit_answer_data = {
                mode: 'Editar',
                answer: observaciones,
                questionId: id_seguimiento,
                adjuntos: adjuntos,
                status: status
            };
            //creando modal
            var edit_answer_modal = this.modalCtrl.create(EdicionSeguimientoPage, { data: edit_answer_data });
            edit_answer_modal.onDidDismiss(function (data) {
                _this.getAnswers();
            });
            //presentando modal
            edit_answer_modal.present();
        }
        else {
            this.showMensaje('No es posible editar el comentario. El estatus del trámite es: ' + this.extraer.estatus);
        }
    };
    ModrespuestaSeguimientoPage.prototype.ionViewWillEnter = function () {
        //recuperando valores del localstorage de currentUser
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //recuperando el id_usuario
        this.mid_usuario = this.currentUser[0].id;
        //se recuperan los valores del localstorage en el metodo de getAnswers
        this.getAnswers();
        //recuperando valores del localstorage de solicitud
        var solicitud = JSON.parse(localStorage.getItem('solicitud'));
        //for para recuperar el valor del estatus
        for (var s in solicitud) {
            this.solicitud = solicitud[s];
        }
        //recuperando del localstorage de tramites
        var tramite = JSON.parse(localStorage.getItem('tramite'));
        //for para recuperar el valor del estatus
        for (var t in tramite) {
            this.tramite = tramite[t];
        }
    };
    /**
     * getAnswers()
     * metodo en donde se buscan los seguimientos que estan guardados en el localStorage
     *
     *  @return {Void}
     */
    ModrespuestaSeguimientoPage.prototype.getAnswers = function () {
        //Preparando un LoadingCtrl
        var loading = this.loadingCtrl.create({
            content: 'Por favor espere...'
        });
        //Presentando el LoadingCtrl
        loading.present();
        //recuperando valores del localstorage de seguimiento
        this.seguimientos = JSON.parse(localStorage.getItem('seguimiento'));
        loading.dismiss();
    };
    /**
    * delete() metodo para eliminar un seguimiento
    *
    *  @param {Object} seguimiento
    *  @return {Void}
    */
    ModrespuestaSeguimientoPage.prototype.delete = function (seguimiento) {
        var _this = this;
        //recibiendo el objeto y asignandolo a las variables
        var id_seguimiento = seguimiento.id_seguimiento;
        var adjuntos = seguimiento.adjunto;
        //comparando si el estatus del tramite es "TRAMITE" para continuar la accion
        if (this.solicitud.id_status == 2) {
            //recuperamos los datos del local storage de seguimiento
            this.seg = JSON.parse(localStorage.getItem('seguimiento'));
            //obtenemos la id_solicitud
            for (var elemento in this.seg) {
                this.extraer.id_solicitud = this.seg[elemento].id_solicitud;
            }
            //comparando si este seguimiento tiene un archivo adjunto. Si lo tiene, no se puede borrar
            if (adjuntos) {
                this.showMensaje('No puede borrar este registro ya que cuenta con un archivo adjunto');
            }
            else {
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
                                    //se almacenan en el localstorage
                                    localStorage.setItem('seguimiento', JSON.stringify(_this.seguimientos));
                                });
                                //mostramos mensaje en pantalla
                                _this.showMensaje('Se elimino el registro con exito');
                                //llamamos al metodo para que recupere valores del localstorage
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
    /**
    * showMensaje() metodo para mostrar un mensaje en la pantalla cuando se requiera
    *
    *  @param {Object} msg
    *  @return {Void}
    */
    ModrespuestaSeguimientoPage.prototype.showMensaje = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Aviso',
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    ModrespuestaSeguimientoPage = __decorate([
        Component({
            selector: 'page-modrespuesta-seguimiento',
            templateUrl: 'modrespuesta-seguimiento.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AnswerService,
            LoadingController,
            AlertController,
            ModalController,
            SeguimientoService,
            SeguimientoService])
    ], ModrespuestaSeguimientoPage);
    return ModrespuestaSeguimientoPage;
}());
export { ModrespuestaSeguimientoPage };
//# sourceMappingURL=modrespuesta-seguimiento.js.map