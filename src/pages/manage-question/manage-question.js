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
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { isPresent } from 'ionic-angular/util/util';
import { QuestionService } from '../../services/question.service';
var ManageQuestionPage = /** @class */ (function () {
    function ManageQuestionPage(navParams, viewCtrl, questionService) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.questionService = questionService;
        this.questionSlug = navParams.get('slug');
        this._detail_slug = isPresent(this.questionSlug) ? this.questionSlug : '';
    }
    ManageQuestionPage.prototype.ionViewWillLoad = function () {
        this.questionForm = new FormGroup({
            question: new FormControl('', Validators.required)
        });
    };
    ManageQuestionPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    ManageQuestionPage.prototype.onSubmit = function (value) {
        var _this = this;
        console.log(this._detail_slug);
        var data = value;
        data.questionSlug = this.questionSlug;
        this.questionService.createQuestion(value)
            .then(function (res) { return _this.dismiss(); });
    };
    ManageQuestionPage = __decorate([
        Component({
            selector: 'manage-question-page',
            templateUrl: 'manage-question.html'
        }),
        __metadata("design:paramtypes", [NavParams,
            ViewController,
            QuestionService])
    ], ManageQuestionPage);
    return ManageQuestionPage;
}());
export { ManageQuestionPage };
//# sourceMappingURL=manage-question.js.map