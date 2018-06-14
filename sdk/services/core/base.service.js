var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import { JSONSearchParams } from './search.params';
import { ErrorHandler } from './error.service';
import { LoopBackAuth } from './auth.service';
import { LoopBackConfig } from '../../lb.config';
import { SDKModels } from '../custom/SDKModels';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
/**
* @module BaseLoopBackApi
* @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @license MIT
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
var BaseLoopBackApi = /** @class */ (function () {
    function BaseLoopBackApi(http, models, auth, searchParams, errorHandler) {
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
        this.model = this.models.get(this.getModelName());
    }
    /**
     * @method request
     * @param {string}  method      Request method (GET, POST, PUT)
     * @param {string}  url         Request url (my-host/my-url/:id)
     * @param {any}     routeParams Values of url parameters
     * @param {any}     urlParams   Parameters for building url (filter and other)
     * @param {any}     postBody    Request postBody
     * @return {Observable<any>}
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    BaseLoopBackApi.prototype.request = function (method, url, routeParams, urlParams, postBody) {
        var _this = this;
        if (routeParams === void 0) { routeParams = {}; }
        if (urlParams === void 0) { urlParams = {}; }
        if (postBody === void 0) { postBody = {}; }
        // Headers to be sent
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // Authenticate request
        this.authenticate(url, headers);
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach(function (key) {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        // Body fix for built in remote methods using "data", "options" or "credentials
        // that are the actual body, Custom remote method properties are different and need
        // to be wrapped into a body object
        var body;
        var postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
        if (postBodyKeys.length === 1) {
            body = postBody[postBodyKeys.shift()];
        }
        else {
            body = postBody;
        }
        // Separate filter object from url params and add to search query
        if (urlParams.filter) {
            headers.append('filter', JSON.stringify(urlParams.filter));
            delete urlParams.filter;
        }
        // Separate where object from url params and add to search query
        /**
        CODE BELOW WILL GENERATE THE FOLLOWING ISSUES:
        - https://github.com/mean-expert-official/loopback-sdk-builder/issues/356
        - https://github.com/mean-expert-official/loopback-sdk-builder/issues/328
        if (urlParams.where) {
          headers.append('where', JSON.stringify(urlParams.where));
          delete urlParams.where;
        }
        **/
        this.searchParams.setJSON(urlParams);
        var request = new Request(new RequestOptions({
            headers: headers,
            method: method,
            url: url,
            search: Object.keys(urlParams).length > 0
                ? this.searchParams.getURLSearchParams() : null,
            body: body ? JSON.stringify(body) : undefined
        }));
        return this.http.request(request)
            .map(function (res) { return (res.text() != "" ? res.json() : {}); })
            .catch(function (e) { return _this.errorHandler.handleError(e); });
    };
    /**
     * @method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {string} url Server URL
     * @param {Headers} headers HTTP Headers
     * @return {void}
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    BaseLoopBackApi.prototype.authenticate = function (url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers.append('Authorization', LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
        }
    };
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic create method
     */
    BaseLoopBackApi.prototype.create = function (data) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural
        ].join('/'), undefined, undefined, { data: data }).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    BaseLoopBackApi.prototype.createMany = function (data) {
        var _this = this;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural
        ].join('/'), undefined, undefined, { data: data })
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {any} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic findById method
     */
    BaseLoopBackApi.prototype.findById = function (id, filter) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        var _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id'
        ].join('/'), { id: id }, _urlParams, undefined).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[+>}
     * @description
     * Generic find method
     */
    BaseLoopBackApi.prototype.find = function (filter) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural
        ].join('/'), undefined, { filter: filter }, undefined)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic exists method
     */
    BaseLoopBackApi.prototype.exists = function (id) {
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id/exists'
        ].join('/'), { id: id }, undefined, undefined);
    };
    /**
     * @method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic findOne method
     */
    BaseLoopBackApi.prototype.findOne = function (filter) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'findOne'
        ].join('/'), undefined, { filter: filter }, undefined).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic updateAll method
     */
    BaseLoopBackApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'update'
        ].join('/'), undefined, _urlParams, { data: data });
    };
    /**
     * @method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic deleteById method
     */
    BaseLoopBackApi.prototype.deleteById = function (id) {
        var _this = this;
        return this.request('DELETE', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id'
        ].join('/'), { id: id }, undefined, undefined).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<{ count: number }>}
     * @description
     * Generic count method
     */
    BaseLoopBackApi.prototype.count = function (where) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'count'
        ].join('/'), undefined, _urlParams, undefined);
    };
    /**
     * @method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic updateAttributes method
     */
    BaseLoopBackApi.prototype.updateAttributes = function (id, data) {
        var _this = this;
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id'
        ].join('/'), { id: id }, undefined, { data: data }).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method
     */
    BaseLoopBackApi.prototype.upsert = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PUT', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
        ].join('/'), undefined, undefined, { data: data }).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method using patch http method
     */
    BaseLoopBackApi.prototype.upsertPatch = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PATCH', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
        ].join('/'), undefined, undefined, { data: data }).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsertWithWhere method
     */
    BaseLoopBackApi.prototype.upsertWithWhere = function (where, data) {
        var _this = this;
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data: data }).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceOrCreate method
     */
    BaseLoopBackApi.prototype.replaceOrCreate = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data: data }).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceById method
     */
    BaseLoopBackApi.prototype.replaceById = function (id, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id', 'replace'
        ].join('/'), { id: id }, undefined, { data: data }).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<any>}
     * @description
     * Generic createChangeStream method
     */
    BaseLoopBackApi.prototype.createChangeStream = function () {
        var subject = new Subject();
        if (typeof EventSource !== 'undefined') {
            var emit = function (msg) { return subject.next(JSON.parse(msg.data)); };
            var source = new EventSource([
                LoopBackConfig.getPath(),
                LoopBackConfig.getApiVersion(),
                this.model.getModelDefinition().plural,
                'change-stream'
            ].join('/'));
            source.addEventListener('data', emit);
            source.onerror = emit;
        }
        else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    };
    BaseLoopBackApi = __decorate([
        Injectable(),
        __param(0, Inject(Http)),
        __param(1, Inject(SDKModels)),
        __param(2, Inject(LoopBackAuth)),
        __param(3, Inject(JSONSearchParams)),
        __param(4, Optional()), __param(4, Inject(ErrorHandler)),
        __metadata("design:paramtypes", [Http,
            SDKModels,
            LoopBackAuth,
            JSONSearchParams,
            ErrorHandler])
    ], BaseLoopBackApi);
    return BaseLoopBackApi;
}());
export { BaseLoopBackApi };
//# sourceMappingURL=base.service.js.map