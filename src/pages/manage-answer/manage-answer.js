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
var ManageAnswerPage = /** @class */ (function () {
    function ManageAnswerPage(navParams, viewCtrl, answerService, seguimientoservices) {
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
    ManageAnswerPage.prototype.ionViewWillLoad = function () {
        var data = this.navParams.get('data');
        if (data.answer) {
            this.answer = data.answer;
        }
        this.answerForm = new FormGroup({
            answer: new FormControl(this.answer.answer, Validators.required)
        });
    };
    ManageAnswerPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    ManageAnswerPage.prototype.onSubmit = function (value) {
        var _this = this;
        var data = value;
        data.questionId = this._question_id;
        if (this.answer.answer) {
            data.id = this.answer.id;
            data.positiveVotes = this.answer.positiveVotes;
            data.negativeVotes = this.answer.negativeVotes;
            this.answerService.updateAnswer(data)
                .then(function (res) { return _this.dismiss(); });
        }
        else {
            this.answerService.createAnswer(value)
                .then(function (res) { return _this.dismiss(); });
        }
    };
    ManageAnswerPage = __decorate([
        Component({
            selector: 'manage-answer-page',
            templateUrl: 'manage-answer.html'
        }),
        __metadata("design:paramtypes", [NavParams,
            ViewController,
            AnswerService,
            SeguimientoService])
    ], ManageAnswerPage);
    return ManageAnswerPage;
}());
export { ManageAnswerPage };
//# sourceMappingURL=manage-answer.js.map