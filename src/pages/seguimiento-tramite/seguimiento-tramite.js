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
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
//import { SeguimientoService} from '../services/seguimiento.service'
//import { QuestionService } from '../../services/question.service';
//import { AnswerService } from '../../services/answer.service';
//import { QuestionDetailsPage } from '../question-details/question-details';
import { PreguntaSeguimientoPage } from '../pregunta-seguimiento/pregunta-seguimiento';
//import { ManageQuestionPage } from '../manage-question/manage-question';
import { ModrespuestaSeguimientoPage } from '../modrespuesta-seguimiento/modrespuesta-seguimiento';
import { AdjuntosSeguimientoPage } from '../adjuntos-seguimiento/adjuntos-seguimiento';
var SeguimientoTramitePage = /** @class */ (function () {
    function SeguimientoTramitePage(navCtrl, navParams, loadingCtrl, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.questions = [];
        var solicitud_param = navParams.get('solicitud');
        var tramite_param = navParams.get('tramite');
        var seguimientos_param = navParams.get('seg');
        //localStorage.setItem('solicitud',JSON.stringify(solicitud_param));
        this.solicitud = isPresent(solicitud_param) ? solicitud_param : null;
        this.tramite = isPresent(tramite_param) ? tramite_param : null;
        this.seguimiento = isPresent(seguimientos_param) ? seguimientos_param : null;
    }
    //Método para crear una pregunta/comentario por parte del ciudadano
    SeguimientoTramitePage.prototype.createQuestionModal = function () {
        var _this = this;
        console.log('Creando comentario..');
        if (this.solicitud[0].status == 'TRAMITE') { //Se va apoder crear siempre cuandor el estatus sea TRAMITE
            //let create_question_modal = this.modalCtrl.create(PreguntaSeguimientoPage, { data: this.solicitud[0].observaciones });
            var create_question_modal = this.modalCtrl.create(PreguntaSeguimientoPage);
            create_question_modal.onDidDismiss(function (data) {
                _this.getQuestions();
            });
            create_question_modal.present();
        }
        else { //Si el estatus no es trámite alertar al usuario de que no es posible crear un comentario
            var subtitle = 'No es posible generar comentario. El estatus de su trámite es: ' + this.solicitud[0].status;
            this.showAlert(subtitle);
        }
    };
    SeguimientoTramitePage.prototype.ionViewWillEnter = function () {
        this.seguimientos = []; //igh
        this.seguimientos = JSON.parse(localStorage.getItem('seguimiento')); //igh
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')); //igh
        this.id_grupo = this.currentUser[0].id_grupo;
    };
    SeguimientoTramitePage.prototype.getQuestions = function () {
        var loading = this.loadingCtrl.create({
            content: 'Recuperando Datos del Servidor de SEDETUS...'
        });
        loading.present();
        this.seguimientos = JSON.parse(localStorage.getItem('seguimiento'));
        loading.dismiss();
    };
    SeguimientoTramitePage.prototype.listarParaEdicion = function (seguimiento) {
        this.navCtrl.push(ModrespuestaSeguimientoPage, { seguimiento: seguimiento });
    };
    SeguimientoTramitePage.prototype.verAdjuntos = function (seguimiento, tramite, solicitud) {
        var params = {
            seguimientoObservaciones: seguimiento.observaciones,
            seguimientoId_seguimiento: seguimiento.id_seguimiento,
            tramite: tramite,
            solicitud: solicitud
        };
        this.navCtrl.push(AdjuntosSeguimientoPage, { data: params });
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    SeguimientoTramitePage.prototype.showAlert = function (subtitle) {
        if (subtitle === void 0) { subtitle = 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de tu laptop o computadora de escritorio desde nuestra pagina <a href="http://qroo.gob.mx/sedetus">http://qroo.gob.mx/sedetus</a>'; }
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: subtitle,
            buttons: ['Ok']
        });
        alert.present();
    };
    SeguimientoTramitePage = __decorate([
        Component({
            selector: 'seguimiento-tramite-page',
            templateUrl: 'seguimiento-tramite.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            AlertController,
            ModalController])
    ], SeguimientoTramitePage);
    return SeguimientoTramitePage;
}());
export { SeguimientoTramitePage };
//# sourceMappingURL=seguimiento-tramite.js.map