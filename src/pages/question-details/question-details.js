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
import { QuestionService } from '../../services/question.service';
// import { QuestionPage } from '../question/question'
// import { LearnDetailsPage } from '../learn-details/learn-details'
import { ManageAnswerPage } from '../manage-answer/manage-answer';
import { RespuestaSeguimientoPage } from '../respuesta-seguimiento/respuesta-seguimiento';
var QuestionDetailsPage = /** @class */ (function () {
    function QuestionDetailsPage(navCtrl, navParams, questionService, answerService, loadingCtrl, alertCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.questionService = questionService;
        this.answerService = answerService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.answers = [];
        this.question = new Question();
    }
    QuestionDetailsPage.prototype.createAnswerModal = function () {
        var _this = this;
        var create_answer_data = {
            mode: 'Create',
            questionId: this.questionId
        };
        var create_answer_modal = this.modalCtrl.create(RespuestaSeguimientoPage, { data: create_answer_data });
        create_answer_modal.onDidDismiss(function (data) {
            _this.getAnswers();
        });
        create_answer_modal.present();
    };
    QuestionDetailsPage.prototype.editAnswerModal = function (answer) {
        var _this = this;
        console.log('Entrando a editAnswerModal');
        var edit_answer_data = {
            mode: 'Edit',
            answer: answer,
            questionId: this.questionId
        };
        var edit_answer_modal = this.modalCtrl.create(ManageAnswerPage, { data: edit_answer_data });
        edit_answer_modal.onDidDismiss(function (data) {
            _this.getAnswers();
        });
        edit_answer_modal.present();
    };
    QuestionDetailsPage.prototype.ionViewWillEnter = function () {
        this.questionId = this.navParams.get('id');
        this.getQuestion();
        this.getAnswers();
    };
    QuestionDetailsPage.prototype.getQuestion = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.questionService.getQuestion(this.questionId)
            .then(function (res) {
            _this.question = res[0];
            loading.dismiss();
        });
    };
    QuestionDetailsPage.prototype.getAnswers = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.answerService.getAnswers(this.questionId)
            .then(function (res) {
            _this.answers = res;
            loading.dismiss();
        });
    };
    QuestionDetailsPage.prototype.delete = function (answerId) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete answer',
            message: 'Are you sure you want to delete this answer?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('No clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.answerService.deleteAnswer(answerId)
                            .then(function (res) { return _this.getAnswers(); });
                    }
                }
            ]
        });
        confirm.present();
    };
    QuestionDetailsPage.prototype.upVoteQuestion = function () {
        this.question.positiveVotes += 1;
        this.questionService.updateQuestion(this.question)
            .then(function (res) { return console.log(res); });
    };
    QuestionDetailsPage.prototype.downVoteQuestion = function () {
        this.question.negativeVotes += 1;
        this.questionService.updateQuestion(this.question)
            .then(function (res) { return console.log(res); });
    };
    QuestionDetailsPage.prototype.addPositiveVote = function (answer) {
        var _this = this;
        answer.positiveVotes += 1;
        this.answerService.updateAnswer(answer)
            .then(function (res) { return _this.getAnswers(); });
    };
    QuestionDetailsPage.prototype.addNegativeVote = function (answer) {
        var _this = this;
        answer.negativeVotes += 1;
        this.answerService.updateAnswer(answer)
            .then(function (res) { return _this.getAnswers(); });
    };
    // muestro el mensaje de alerta invitando a usar la aplicación web en caso de requerir adjuntar archivos
    QuestionDetailsPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Atento Aviso!',
            subTitle: 'En caso de requerir adjuntar algún archivo a tu trámite, te invitamos a hacerlo a través de nuestra aplicación web en la dirección (url) http://qroo.gob.mx/sedetus desde tu laptop o computadora de escritorio',
            buttons: ['Ok']
        });
        alert.present();
    };
    QuestionDetailsPage = __decorate([
        Component({
            selector: 'question-details-page',
            templateUrl: 'question-details.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            QuestionService,
            AnswerService,
            LoadingController,
            AlertController,
            ModalController])
    ], QuestionDetailsPage);
    return QuestionDetailsPage;
}());
export { QuestionDetailsPage };
//# sourceMappingURL=question-details.js.map