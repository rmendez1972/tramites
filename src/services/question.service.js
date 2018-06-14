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
import { QuestionApi, Question } from '../../sdk';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http'; //igh
import { ServiceUrl } from '../serviceUrl'; //igh
var QuestionService = /** @class */ (function () {
    function QuestionService(http, questionApi, url) {
        this.http = http;
        this.questionApi = questionApi;
        this.url = url;
        this.pushcomentarioUrl = String(this.url.getUrlpushComentario());
    }
    QuestionService.prototype.getQuestions = function () {
        var filter = {
            "include": {
                "relation": "answers"
            }
        };
        return this.questionApi.find(filter)
            .toPromise();
    };
    QuestionService.prototype.getQuestion = function (questionId) {
        var query = {
            id: questionId
        };
        return this.questionApi.find({ where: query })
            .toPromise();
    };
    QuestionService.prototype.getQuestionsBySlug = function (slug) {
        var filter = {
            "include": {
                "relation": "answers"
            },
            "where": {
                "questionSlug": slug
            }
        };
        return this.questionApi.find(filter)
            .toPromise();
    };
    QuestionService.prototype.deleteQuestion = function (questionId) {
        return this.questionApi.deleteById(questionId)
            .toPromise();
    };
    QuestionService.prototype.updateQuestion = function (values) {
        var data = new Question();
        data.question = values.question;
        data.positiveVotes = values.positiveVotes;
        data.negativeVotes = values.negativeVotes;
        data.questionSlug = values.questionSlug;
        return this.questionApi.updateAttributes(values.id, data)
            .toPromise();
    };
    QuestionService.prototype.createQuestion = function (values) {
        var data = new Question();
        data.question = values.question;
        data.questionSlug = values.questionSlug;
        return this.questionApi.create(data)
            .toPromise();
    };
    //igh
    QuestionService.prototype.pushComentario = function (values, id_usuario, id_solicitud, id_status) {
        return this.http.get(this.pushcomentarioUrl + values + "&id_usuario=" + id_usuario + "&id_solicitud=" + id_solicitud + "&id_status=" + id_status)
            .map(function (res) { return res.json(); });
    };
    QuestionService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            QuestionApi,
            ServiceUrl])
    ], QuestionService);
    return QuestionService;
}());
export { QuestionService };
//# sourceMappingURL=question.service.js.map