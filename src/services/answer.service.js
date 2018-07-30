var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AnswerApi, Answer } from '../../sdk';
import 'rxjs/add/operator/toPromise';
var AnswerService = /** @class */ (function () {
    function AnswerService(answerApi) {
        this.answerApi = answerApi;
    }
    AnswerService.prototype.getAnswers = function (questionId) {
        var query = {
            questionId: questionId
        };
        return this.answerApi.find({ where: query })
            .toPromise();
    };
    AnswerService.prototype.getAnswer = function (anserId) {
        var query = {
            id: anserId
        };
        return this.answerApi.find({ where: query })
            .toPromise();
    };
    AnswerService.prototype.deleteAnswer = function (answerId) {
        return this.answerApi.deleteById(answerId)
            .toPromise();
    };
    AnswerService.prototype.updateAnswer = function (values) {
        var data = new Answer();
        data.answer = values.answer;
        data.positiveVotes = values.positiveVotes;
        data.negativeVotes = values.negativeVotes;
        data.questionId = values.questionId;
        return this.answerApi.updateAttributes(values.id, data)
            .toPromise();
    };
    AnswerService.prototype.createAnswer = function (values) {
        var data = new Answer();
        data.answer = values.answer;
        data.questionId = values.questionId;
        return this.answerApi.create(data)
            .toPromise();
    };
    AnswerService.prototype.countAnswers = function (questionId) {
        var query = {
            questionId: questionId
        };
        return this.answerApi.count({ where: query })
            .toPromise();
    };
    AnswerService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AnswerApi])
    ], AnswerService);
    return AnswerService;
}());
export { AnswerService };
//# sourceMappingURL=answer.service.js.map