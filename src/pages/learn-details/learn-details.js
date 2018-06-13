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
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';
import { QuestionDetailsPage } from '../question-details/question-details';
import { ManageQuestionPage } from '../manage-question/manage-question';
//import { ManageAnswerPage } from '../manage-answer/manage-answer';//igh
var LearnDetailsPage = /** @class */ (function () {
    function LearnDetailsPage(navCtrl, navParams, questionService, answerService, loadingCtrl, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.questionService = questionService;
        this.answerService = answerService;
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
    LearnDetailsPage.prototype.createQuestionModal = function () {
        var _this = this;
        var create_question_modal = this.modalCtrl.create(ManageQuestionPage, { slug: this.solicitud.slug });
        create_question_modal.onDidDismiss(function (data) {
            _this.getQuestions();
        });
        create_question_modal.present();
    };
    LearnDetailsPage.prototype.editQuestionModal = function (question) {
        var _this = this;
        console.log('aqui estoy');
        var edit_question_data = {
            mode: 'Edit',
            question: question,
            questionId: this.questionId
        };
        var edit_question_modal = this.modalCtrl.create(ManageQuestionPage, { data: edit_question_data });
        edit_question_modal.onDidDismiss(function (data) {
            _this.getQuestions();
        });
        edit_question_modal.present();
    };
    LearnDetailsPage.prototype.ionViewWillEnter = function () {
        this.getQuestions();
    };
    LearnDetailsPage.prototype.getQuestions = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Recuperando Datos del Servidor de SEDETUS...'
        });
        loading.present();
        this.questionService.getQuestionsBySlug(this.solicitud.slug)
            .then(function (res) {
            _this.questions = res;
            loading.dismiss();
        });
    };
    LearnDetailsPage.prototype.delete = function (questionId) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Eliminar comentario',
            message: 'Seguro de eliminar tu comentario a este seguimiento?',
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
                        _this.questionService.deleteQuestion(questionId)
                            .then(function (res) { return _this.getQuestions(); });
                        _this.answerService.getAnswers(questionId)
                            .then(function (answers) {
                            for (var _i = 0, answers_1 = answers; _i < answers_1.length; _i++) {
                                var answer = answers_1[_i];
                                _this.answerService.deleteAnswer(answer.id);
                            }
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    LearnDetailsPage.prototype.addPositiveVote = function (question) {
        var _this = this;
        var data = question;
        data.positiveVotes += 1;
        data.questionSlug = this.solicitud.slug;
        this.questionService.updateQuestion(data)
            .then(function (res) { return _this.getQuestions(); });
    };
    LearnDetailsPage.prototype.addNegativeVote = function (question) {
        var _this = this;
        var data = question;
        data.negativeVotes += 1;
        data.questionSlug = this.solicitud.slug;
        this.questionService.updateQuestion(data)
            .then(function (res) { return _this.getQuestions(); });
    };
    LearnDetailsPage.prototype.countAnswers = function (questionId) {
        return this.answerService.countAnswers(questionId)
            .then(function (res) { return console.log(res); });
    };
    LearnDetailsPage.prototype.openAnswers = function (question) {
        this.navCtrl.push(QuestionDetailsPage, {
            id: question.id
        });
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    LearnDetailsPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de nuestra aplicación web en la dirección (url) http://qroo.gob.mx/sedetus desde tu laptop o computadora de escritorio',
            buttons: ['Ok']
        });
        alert.present();
    };
    LearnDetailsPage = __decorate([
        Component({
            selector: 'learn-details-page',
            templateUrl: 'learn-details.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            QuestionService,
            AnswerService,
            LoadingController,
            AlertController,
            ModalController])
    ], LearnDetailsPage);
    return LearnDetailsPage;
}());
export { LearnDetailsPage };
//# sourceMappingURL=learn-details.js.map